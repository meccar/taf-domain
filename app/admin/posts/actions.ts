"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip Vietnamese diacritics
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createPostAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Chưa đăng nhập" };

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const status = formData.get("status") as string;

  if (!title) return { error: "Vui lòng nhập tiêu đề" };

  const { error } = await supabase.from("posts").insert({
    title,
    slug: slugify(title),
    content,
    status,
    author_id: user.id,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePostAction(postId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) return { error: error.message };

  revalidatePath("/admin/posts");
  return { success: true };
}
