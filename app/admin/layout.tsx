import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AdminLoadingFallback />}>
      <AdminAuthGate>{children}</AdminAuthGate>
    </Suspense>
  );
}

async function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "root_admin") redirect("/protected");

  return (
    <SidebarProvider>
      <AdminSidebar userEmail={user.email ?? ""} />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
        </header>
        <main className="flex-1 bg-muted/30 p-6 md:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function AdminLoadingFallback() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <p className="text-sm text-muted-foreground">
        Đang kiểm tra quyền truy cập...
      </p>
    </div>
  );
}
