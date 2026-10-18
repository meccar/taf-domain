import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server"; // use your real import
import { LOCALES } from "../const";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*, post_translations(*)")
    .eq("id", id)
    .single();

  if (!post) notFound();

  const translations = LOCALES.map((l) => ({
    ...l,
    t: post.post_translations.find((t: any) => t.locale === l.code),
  }));
  const defaultTab = translations.find((x) => x.t)?.code ?? LOCALES[0].code;

  return (
    <div className="flex max-w-4xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/posts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/admin/posts/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chi tiết bài viết</CardTitle>
          <div className="flex flex-wrap items-center gap-2 pt-2 text-sm text-muted-foreground">
            <Badge variant="outline">{post.category}</Badge>
            <Badge
              variant={post.status === "published" ? "default" : "secondary"}
            >
              {post.status === "published" ? "Đã đăng" : "Bản nháp"}
            </Badge>
            {post.featured && <Badge>Nổi bật</Badge>}
            <span>
              Tạo ngày {new Date(post.created_at).toLocaleDateString("vi-VN")}
            </span>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue={defaultTab}>
            <TabsList>
              {translations.map((x) => (
                <TabsTrigger key={x.code} value={x.code}>
                  {x.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {translations.map(({ code, label, t }) => (
              <TabsContent
                key={code}
                value={code}
                className="flex flex-col gap-4 pt-4"
              >
                {t ? (
                  <>
                    <h2 className="text-xl font-semibold">{t.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {t.author} · /{t.slug}
                    </p>
                    {t.excerpt && <p className="italic">{t.excerpt}</p>}
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: t.content }}
                    />
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Chưa có bản dịch {label}.
                  </p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
