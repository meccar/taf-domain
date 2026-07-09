import { createClient } from "@/lib/supabase/server";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Thuế" | "Kế toán" | "Doanh nghiệp" | "Quy định mới";
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
}

export const categories = [
  "Tất cả",
  "Thuế",
  "Kế toán",
  "Doanh nghiệp",
  "Quy định mới",
] as const;

function estimateReadTime(html: string | null) {
  const text = (html ?? "").replace(/<[^>]*>/g, " ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return `${minutes} phút đọc`;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "slug, title, excerpt, category, author, featured, content, created_at",
    )
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category as BlogPost["category"],
    date: new Date(post.created_at).toLocaleDateString("vi-VN"),
    readTime: estimateReadTime(post.content),
    author: post.author,
    featured: post.featured,
  }));
}
