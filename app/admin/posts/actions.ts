"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip Vietnamese diacritics
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Rough estimate: ~200 words per minute reading speed
function estimateReadTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ");
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return `${minutes} phút đọc`;
}

async function assertLoggedIn() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, error: "Chưa đăng nhập" };
  return { ok: true as const, user };
}

export async function createPostAction(formData: FormData) {
  const check = await assertLoggedIn();
  if (!check.ok) return { error: check.error };

  const supabase = await createClient();

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const author = (formData.get("author") as string) || "TAF Việt";
  const status = formData.get("status") as string;
  const featured = formData.get("featured") === "on";

  if (!title) return { error: "Vui lòng nhập tiêu đề" };
  if (!excerpt) return { error: "Vui lòng nhập mô tả ngắn" };
  if (!category) return { error: "Vui lòng chọn danh mục" };

  const slug = slugify(title);
  const readTime = estimateReadTime(content ?? "");

  const { error } = await supabase.from("posts").insert({
    slug,
    title,
    excerpt,
    content,
    category,
    author,
    featured,
    status,
    author_id: check.user.id,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "Đã tồn tại bài viết với tiêu đề tương tự (trùng slug)" };
    }
    return { error: error.message };
  }

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePostAction(postId: string) {
  const check = await assertLoggedIn();
  if (!check.ok) return { error: check.error };

  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) return { error: error.message };

  revalidatePath("/admin/posts");
  return { success: true };
}
