"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { ActionResult } from "@/types/action-result";

export async function createAdminAction(
  formData: FormData,
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Chưa đăng nhập", data: null };

  const { data: callerProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (callerProfile?.role !== "root_admin") {
    return {
      success: false,
      error: "Chỉ root admin mới có quyền tạo tài khoản",
      data: null,
    };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const adminClient = createAdminClient();
  const { data, error } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) return { success: false, error: error.message, data: null };

  return { success: true, error: null, data: { userId: data.user.id } };
}
