import "server-only";

import { unstable_cache } from "next/cache";
import { createPublicClient } from "./supabase/public";

export type PostCategory = "Thuế" | "Kế toán" | "Doanh nghiệp" | "Quy định mới";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
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

async function fetchPublishedPosts(locale: string): Promise<BlogPost[]> {
  const supabase = await createPublicClient();

  const { data, error } = await supabase
    .from("posts")
    .select(
      `id, category, featured, created_at,
       post_translations!inner (
         slug,
         title,
         excerpt,
         content,
         author,
         locale
       )`,
    )
    .eq("status", "published")
    .eq("post_translations.locale", locale)
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Failed to fetch published posts:", error);
    return [];
  }

  return data.map((post) => {
    const translation = post.post_translations[0];

    return {
      id: post.id,
      slug: translation.slug,
      title: translation.title,
      excerpt: translation.excerpt,
      content: translation.content,
      category: post.category as PostCategory,
      author: translation.author,
      featured: post.featured,
      date: new Date(post.created_at).toLocaleDateString(
        locale === "vi" ? "vi-VN" : locale === "zh" ? "zh-CN" : "en-US",
      ),
      readTime: estimateReadTime(translation.content),
    };
  });
}

export function getPublishedPosts(locale = "vi") {
  return unstable_cache(
    () => fetchPublishedPosts(locale),
    ["published-posts", locale],
    {
      revalidate: 300,
      tags: [`posts:${locale}`],
    },
  )();
}

function estimateReadTime(html: string) {
  const text = (html ?? "").replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return `${Math.max(1, Math.round(words / 200))} phút đọc`;
}
