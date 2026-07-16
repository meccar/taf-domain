"use server";

import { checkRateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import { ActionResult } from "@/types/action-result";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024;

export async function uploadImageAction(
  formData: FormData,
): Promise<ActionResult<string>> {
  const rateLimitError = await checkRateLimit("upload");
  if (rateLimitError) return rateLimitError;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Chưa đăng nhập", data: null };

  const file = formData.get("file") as File;
  if (!file)
    return { success: false, error: "Không có tệp nào được chọn", data: null };

  if (!ALLOWED_TYPES.includes(file.type))
    return {
      success: false,
      error: "Định dạng tệp không được hỗ trợ",
      data: null,
    };
  if (file.size > MAX_SIZE)
    return { success: false, error: "Kích thước tệp vượt quá 5MB", data: null };

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${user.id}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, file);

  if (uploadError)
    return { success: false, error: uploadError.message, data: null };

  const {
    data: { publicUrl },
  } = supabase.storage.from("post-images").getPublicUrl(filePath);

  return { success: true, error: null, data: publicUrl };
}
