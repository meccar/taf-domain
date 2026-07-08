"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function assertRootAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, error: "Chưa đăng nhập" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "root_admin") {
    return {
      ok: false as const,
      error: "Bạn không có quyền thực hiện thao tác này",
    };
  }
  return { ok: true as const };
}

export async function createAdminUserAction(formData: FormData) {
  const check = await assertRootAdmin();
  if (!check.ok) return { error: check.error };

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteUserAction(userId: string) {
  const check = await assertRootAdmin();
  if (!check.ok) return { error: check.error };

  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.deleteUser(userId);
  if (error) return { error: error.message };

  revalidatePath("/admin/users");
  return { success: true };
}
