import { Suspense } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/newsletter-form";
import { BlogCard } from "@/components/blog-card";
import { getPublishedPosts, categories } from "@/lib/blog";
import { cn } from "@/lib/utils";
import { FileQuestion } from "lucide-react";

export const metadata = {
  title: "Blog & Tin tức | TAF Việt",
  description:
    "Cập nhật quy định thuế, kế toán và kiến thức vận hành doanh nghiệp từ TAF Việt.",
};

const PAGE_SIZE = 6;

export default function Blog({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  return (
    <main className="w-full">
      {/* Hero — fully static, renders instantly */}
      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center flex flex-col items-center gap-4">
          <Badge variant="outline" className="uppercase tracking-widest">
            Blog & Tin tức
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Kiến thức thuế & kế toán cập nhật mỗi tuần
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
            Quy định mới, hướng dẫn thực hành và góc nhìn chuyên môn từ đội ngũ
            TAF Việt.
          </p>
        </div>
      </div>

      <Separator />

      {/* Everything depending on searchParams + DB data lives here, streamed in */}
      <Suspense fallback={<BlogSkeleton />}>
        <BlogContent searchParamsPromise={searchParams} />
      </Suspense>
    </main>
  );
}

async function BlogContent({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParamsPromise;
  const activeCategory = params.category ?? "Tất cả";
  const page = Math.max(1, Number(params.page) || 1);

  const posts = await getPublishedPosts();

  // No posts in the database at all — show a dedicated empty state, no filters/sidebar
  if (posts.length === 0) {
    return <EmptyBlogState />;
  }

  const filtered =
    activeCategory === "Tất cả"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const showFeatured = page === 1 && activeCategory === "Tất cả";
  const featured = showFeatured ? filtered.find((p) => p.featured) : undefined;
  const rest = filtered.filter((p) => p.slug !== featured?.slug);

  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const pageItems = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const recent = [...posts].slice(0, 4);
  const allTags = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <>
      {/* Category filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-12">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={
                cat === "Tất cả"
                  ? "/blog"
                  : `/blog?category=${encodeURIComponent(cat)}`
              }
              scroll={false}
            >
              <Badge
                variant={activeCategory === cat ? "default" : "outline"}
                className="cursor-pointer px-3 py-1.5 font-normal"
              >
                {cat}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Main column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {featured && <BlogCard post={featured} featured />}

            {pageItems.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {pageItems.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground py-12 text-center">
                Chưa có bài viết nào trong chuyên mục này.
              </p>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (n) => (
                    <Link
                      key={n}
                      href={`/blog?category=${encodeURIComponent(activeCategory)}&page=${n}`}
                      scroll={false}
                    >
                      <Button
                        variant={n === page ? "default" : "outline"}
                        size="icon"
                        className="h-9 w-9"
                      >
                        {n}
                      </Button>
                    </Link>
                  ),
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="gap-2">
                <CardTitle className="text-base">Đăng ký bản tin</CardTitle>
                <CardDescription>
                  Nhận cập nhật quy định thuế & kế toán mới nhất mỗi tháng, miễn
                  phí.
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-6">
                <NewsletterForm source="blog-sidebar" />
              </div>
            </Card>

            <Card>
              <CardHeader className="gap-3">
                <CardTitle className="text-base">Bài viết gần đây</CardTitle>
                <div className="flex flex-col gap-4 pt-1">
                  {recent.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col gap-1"
                    >
                      <span className="text-sm font-medium leading-snug group-hover:underline">
                        {post.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {post.date}
                      </span>
                    </Link>
                  ))}
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="gap-3">
                <CardTitle className="text-base">Chuyên mục</CardTitle>
                <div className="flex flex-wrap gap-2 pt-1">
                  {allTags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?category=${encodeURIComponent(tag)}`}
                      scroll={false}
                    >
                      <Badge
                        variant={
                          activeCategory === tag ? "default" : "secondary"
                        }
                        className={cn(
                          "font-normal",
                          activeCategory !== tag && "hover:bg-secondary/80",
                        )}
                      >
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function EmptyBlogState() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
      <div className="flex flex-col items-center gap-4 text-center max-w-md mx-auto">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="h-7 w-7 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">Không có bài viết nào</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Hiện chưa có bài viết nào được đăng. Vui lòng quay lại sau để xem
          những cập nhật mới nhất từ TAF Việt.
        </p>
      </div>
    </div>
  );
}

function BlogSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 animate-pulse">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="h-64 rounded-lg bg-muted" />
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="h-56 rounded-lg bg-muted" />
            <div className="h-56 rounded-lg bg-muted" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="h-40 rounded-lg bg-muted" />
          <div className="h-40 rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}
