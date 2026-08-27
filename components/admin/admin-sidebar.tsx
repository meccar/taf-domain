"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  ExternalLink,
  Mail,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavIcon } from "../nav-icon";

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const t = useTranslations("AdminSidebar");
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      href: "/admin",
      label: t("overview"),
      icon: LayoutDashboard,
      exact: true,
    },
    { href: "/admin/users", label: t("users"), icon: Users },
    { href: "/admin/posts", label: t("posts"), icon: FileText },
    {
      href: "/admin/contacts",
      label: t("contactSubmissions"),
      icon: Mail,
    },
  ];

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-4 py-4 group-data-[collapsible=icon]:px-2">
        <p className="truncate text-lg font-semibold group-data-[collapsible=icon]:hidden">
          {t("title")}
        </p>
        <p className="truncate text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          {userEmail}
        </p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <NavIcon icon={item.icon} />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={t("viewSite")}>
              <Link href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                <span>{t("viewSite")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip={t("logout")}>
              <LogOut />
              <span>{t("logout")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
