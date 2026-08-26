import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Mail, MailWarning } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const [
    { count: userCount },
    { count: postCount },
    { count: contactCount },
    { count: newContactCount },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  const stats = [
    {
      label: "Tổng số người dùng",
      value: userCount ?? 0,
      icon: Users,
    },
    {
      label: "Tổng số bài viết",
      value: postCount ?? 0,
      icon: FileText,
    },
    {
      label: "Liên hệ mới",
      value: newContactCount ?? 0,
      icon: MailWarning,
      highlight: (newContactCount ?? 0) > 0,
    },
    {
      label: "Tổng số liên hệ",
      value: contactCount ?? 0,
      icon: Mail,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Tổng quan</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, highlight }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon
                className={`h-4 w-4 ${
                  highlight ? "text-orange-500" : "text-muted-foreground"
                }`}
              />
            </CardHeader>
            <CardContent>
              <p
                className={`text-2xl font-bold ${
                  highlight ? "text-orange-500" : ""
                }`}
              >
                {value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
