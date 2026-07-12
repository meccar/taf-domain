import { createClient } from "@/lib/supabase/server";

export type PostCategory = "Thuế" | "Kế toán" | "Doanh nghiệp" | "Quy định mới";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: PostCategory;
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

export async function getPublishedPosts(
  locale: string = "vi",
): Promise<BlogPost[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `id, category, featured, created_at,
       post_translations!inner (slug, title, excerpt, content, author, locale)`,
    )
    .eq("status", "published")
    .eq("post_translations.locale", locale)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((post: any) => {
    const t = post.post_translations[0];
    return {
      id: post.id,
      slug: t.slug,
      title: t.title,
      excerpt: t.excerpt,
      content: t.content,
      category: post.category,
      author: t.author,
      featured: post.featured,
      date: new Date(post.created_at).toLocaleDateString(
        locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : "en-US",
      ),
      readTime: estimateReadTime(t.content),
    };
  });
}

function estimateReadTime(html: string) {
  const text = (html ?? "").replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} phút đọc`;
}
