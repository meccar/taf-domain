"use server";

import { Resend } from "resend";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().optional(),
  source: z.string().optional(),
});

export async function sendContactEmail(values: z.infer<typeof contactSchema>) {
  const rateLimitError = await checkRateLimit("public");
  if (rateLimitError) return rateLimitError;

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Dữ liệu không hợp lệ" };
  }

  const { name, phone, email, message, source } = parsed.data;

  try {
    const { error } = await resend.emails.send({
      from: "TAF Việt Website <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL_TO ?? "tt@tt.com",
      replyTo: email || undefined,
      subject: `Yêu cầu tư vấn mới từ ${name}`,
      html: `
        <h2>Yêu cầu tư vấn mới</h2>
        <p><strong>Họ tên:</strong> ${escapeHtml(name)}</p>
        <p><strong>Số điện thoại:</strong> ${escapeHtml(phone)}</p>
        ${email ? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` : ""}
        ${message ? `<p><strong>Nhu cầu:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>` : ""}
        ${source ? `<p style="color:#888;font-size:12px;">Nguồn: ${escapeHtml(source)}</p>` : ""}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { error: "Không thể gửi email, vui lòng thử lại sau." };
    }

    return { success: true };
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return { error: "Không thể gửi email, vui lòng thử lại sau." };
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
