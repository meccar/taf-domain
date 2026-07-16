"use server";

import { checkRateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import { ActionResult } from "@/types/action-result";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const translationSchema = z.object({
  locale: z.string().min(2).max(5),
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().optional(),
  author: z.string().default("TAF Việt"),
});

const postSchema = z.object({
  category: z.enum(["Thuế", "Kế toán", "Doanh nghiệp", "Quy định mới"]),
  status: z.enum(["draft", "published"]),
  featured: z.boolean().default(false),
  translations: z.array(translationSchema).min(1),
});

async function assertLoggedIn() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, error: "Chưa đăng nhập" };
  return { ok: true as const, user };
}

export async function createPostAction(payload: z.infer<typeof postSchema>) {
  const rateLimitError = await checkRateLimit("admin");
  if (rateLimitError) return rateLimitError;

  const check = await assertLoggedIn();
  if (!check.ok) return { error: check.error };

  const parsed = postSchema.safeParse(payload);
  if (!parsed.success) {
    return { error: "Dữ liệu không hợp lệ: " + parsed.error.issues[0].message };
  }

  const { category, status, featured, translations } = parsed.data;
  const supabase = await createClient();

  const { data: post, error: postError } = await supabase
    .from("posts")
    .insert({ category, status, featured, author_id: check.user.id })
    .select("id")
    .single();

  if (postError || !post) {
    return { error: postError?.message ?? "Không thể tạo bài viết" };
  }

  const rows = translations.map((t) => ({
    post_id: post.id,
    locale: t.locale,
    slug: slugify(t.title),
    title: t.title,
    excerpt: t.excerpt,
    content: t.content ?? "",
    author: t.author,
  }));

  const { error: translationError } = await supabase
    .from("post_translations")
    .insert(rows);

  if (translationError) {
    await supabase.from("posts").delete().eq("id", post.id);
    if (translationError.code === "23505") {
      return { error: "Trùng slug trong một ngôn ngữ, vui lòng đổi tiêu đề" };
    }
    return { error: translationError.message };
  }

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePostAction(
  postId: string,
  payload: z.infer<typeof postSchema>,
): Promise<ActionResult | void> {
  const rateLimitError = await checkRateLimit("admin");
  if (rateLimitError) return rateLimitError;

  const check = await assertLoggedIn();
  if (!check.ok) return { success: false, error: check.error, data: null };

  const parsed = postSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: "Dữ liệu không hợp lệ: " + parsed.error.issues[0].message,
      data: null,
    };
  }

  const { category, status, featured, translations } = parsed.data;
  const supabase = await createClient();

  const { error: postError } = await supabase
    .from("posts")
    .update({
      category,
      status,
      featured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", postId);

  if (postError)
    return { success: false, error: postError.message, data: null };

  const rows = translations.map((t) => ({
    post_id: postId,
    locale: t.locale,
    slug: slugify(t.title),
    title: t.title,
    excerpt: t.excerpt,
    content: t.content ?? "",
    author: t.author,
    updated_at: new Date().toISOString(),
  }));

  const { error: translationError } = await supabase
    .from("post_translations")
    .upsert(rows, { onConflict: "post_id,locale" });

  if (translationError) {
    if (translationError.code === "23505") {
      return {
        success: false,
        error: "Trùng slug trong một ngôn ngữ, vui lòng đổi tiêu đề",
        data: null,
      };
    }
    return { success: false, error: translationError.message, data: null };
  }

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${postId}/edit`);
  redirect("/admin/posts");
}

export async function deletePostAction(postId: string): Promise<ActionResult> {
  const rateLimitError = await checkRateLimit("admin");
  if (rateLimitError) return rateLimitError;

  const check = await assertLoggedIn();
  if (!check.ok) return { success: false, error: check.error, data: null };

  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) return { success: false, error: error.message, data: null };

  revalidatePath("/admin/posts");
  return { success: true, error: null, data: null };
}
