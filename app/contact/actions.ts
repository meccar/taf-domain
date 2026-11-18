"use server";

import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import { ActionResult } from "@/types/action-result";
import { stripHtml, sanitizeText } from "@/lib/security/sanitize";

// Vietnamese letters, spaces and common name punctuation. No < > & etc.
const NAME_RE = /^[\p{L}\p{M}\s.'’-]{2,100}$/u;
// 0912345678, +84 912 345 678, 024.3xxx.xxxx ...
const PHONE_RE = /^(?:\+?84|0)\d{8,10}$/;

const contactSchema = z.object({
  name: z
    .string()
    .transform((v) => stripHtml(sanitizeText(v, 100)))
    .refine((v) => NAME_RE.test(v), "Invalid name"),
  phone: z
    .string()
    .transform((v) => v.replace(/[\s.\-()]/g, ""))
    .refine((v) => PHONE_RE.test(v), "Invalid phone number"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254)
    .email()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  message: z
    .string()
    .transform((v) => stripHtml(sanitizeText(v, 500)))
    .optional(),
  source: z
    .string()
    .transform((v) => stripHtml(sanitizeText(v, 100)))
    .optional(),
});

export async function sendContactEmail(
  values: z.infer<typeof contactSchema>,
): Promise<ActionResult> {
  const t = await getTranslations("ContactPage");
  const rateLimit = await checkRateLimit("public");
  if (!rateLimit.success) return rateLimit;

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: t("invalidData"), data: null };
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
        error: t("submitError"),
        data: null,
      };
    }

    return { success: true, error: null, data: null };
  } catch (err) {
    console.error("Failed to save contact submission:", err);
    return {
      success: false,
      error: t("submitError"),
      data: null,
    };
  }
}
