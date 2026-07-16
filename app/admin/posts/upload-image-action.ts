"use server";

import { checkRateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

export async function uploadImageAction(formData: FormData) {
  const rateLimitError = await checkRateLimit("upload");
  if (rateLimitError) return rateLimitError;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Chưa đăng nhập" };

  const file = formData.get("file") as File;
  if (!file) return { error: "Không có tệp nào được chọn" };

  if (!ALLOWED_TYPES.includes(file.type))
    return { error: "Định dạng tệp không được hỗ trợ" };
  if (file.size > MAX_SIZE) return { error: "Kích thước tệp vượt quá 5MB" };

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${user.id}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, file);

  if (uploadError) return { error: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("post-images").getPublicUrl(filePath);

  return { success: true, url: publicUrl };
}
