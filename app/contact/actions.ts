"use server";

import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import { ActionResult } from "@/types/action-result";

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().optional(),
  source: z.string().optional(),
});

export async function sendContactEmail(
  values: z.infer<typeof contactSchema>,
): Promise<ActionResult> {
  const rateLimitError = await checkRateLimit("public");
  if (rateLimitError) return rateLimitError;

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Dữ liệu không hợp lệ", data: null };
  }

  const { name, phone, email, message, source } = parsed.data;

  try {
    const supabase = await createClient();

    const { error } = await supabase.from("contact_submissions").insert({
      name,
      phone,
      email: email || null,
      message: message || null,
      source: source || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return {
        success: false,
        error: "Không thể gửi yêu cầu, vui lòng thử lại sau.",
        data: null,
      };
    }

    return { success: true, error: null, data: null };
  } catch (err) {
    console.error("Failed to save contact submission:", err);
    return {
      success: false,
      error: "Không thể gửi yêu cầu, vui lòng thử lại sau.",
      data: null,
    };
  }
}
