import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NewsletterForm } from "@/components/newsletter-form";
import { BlogCard } from "@/components/blog-card";
import { getPublishedPosts, getPostBySlug } from "@/lib/blog";

type PageProps = { params: Promise<{ slug: string }> };

// Pre-render every published post at build time; new posts render on demand
// and are picked up when the "posts:vi" cache tag is revalidated.
export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));

  if (!post) {
    return { title: "Không tìm thấy bài viết | TAF Việt" };
  }

  return {
    title: `${post.title} | TAF Việt`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(decodeURIComponent(slug));

  if (!post) notFound();

  const all = await getPublishedPosts();
  const related = all
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <main className="w-full">
      {/* Header */}
      <div className="bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pb-16 flex flex-col gap-6">
          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Tất cả bài viết
          </Link>

          <div className="flex flex-col gap-4">
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="w-fit"
            >
              <Badge variant="secondary" className="font-normal">
                {post.category}
              </Badge>
            </Link>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-balance">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Article body — HTML from the database.
          Requires @tailwindcss/typography for the `prose` classes. */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div
          className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Separator />

      {/* Newsletter + related */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col gap-12">
        <Card>
          <CardHeader className="gap-2">
            <CardTitle className="text-base">Đăng ký bản tin</CardTitle>
            <CardDescription>
              Nhận cập nhật quy định thuế & kế toán mới nhất mỗi tháng, miễn
              phí.
            </CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <NewsletterForm source="blog-post" />
          </div>
        </Card>

        {related.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Bài viết liên quan
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        <Button asChild variant="outline" className="w-fit">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4" />
            Quay lại Blog
          </Link>
        </Button>
      </div>
    </main>
  );
}
