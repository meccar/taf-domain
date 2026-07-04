import Link from "next/link";
import {
  Receipt,
  Calculator,
  Building2,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/lib/blog-data";

const categoryIcon = {
  Thuế: Receipt,
  "Kế toán": Calculator,
  "Doanh nghiệp": Building2,
  "Quy định mới": FileText,
} as const;

export function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const Icon = categoryIcon[post.category];

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="h-full flex flex-col overflow-hidden transition-colors hover:border-foreground/20">
        <div
          className={cn(
            "flex items-center justify-center bg-primary/5 border-b",
            featured ? "h-56 sm:h-64" : "h-40",
          )}
        >
          <Icon
            className={
              featured ? "h-12 w-12 text-primary/40" : "h-9 w-9 text-primary/40"
            }
            strokeWidth={1.5}
          />
        </div>
        <CardHeader className="gap-2 flex-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs font-normal">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>
          <CardTitle
            className={cn(
              "leading-snug",
              featured ? "text-xl sm:text-2xl" : "text-base",
            )}
          >
            {post.title}
          </CardTitle>
          <CardDescription
            className={featured ? "text-sm" : "text-sm line-clamp-2"}
          >
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.readTime}</span>
          <span className="inline-flex items-center gap-1 text-foreground group-hover:gap-1.5 transition-all">
            Đọc tiếp <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
