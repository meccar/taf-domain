import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
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
  const t = await getTranslations("AdminPosts");
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
            {t("back")}
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/admin/posts/${id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            {t("edit")}
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("detailsTitle")}</CardTitle>
          <div className="flex flex-wrap items-center gap-2 pt-2 text-sm text-muted-foreground">
            <Badge variant="outline">{post.category}</Badge>
            <Badge
              variant={post.status === "published" ? "default" : "secondary"}
            >
              {post.status === "published"
                ? t("status.published")
                : t("status.draft")}
            </Badge>
            {post.featured && <Badge>{t("featuredBadge")}</Badge>}
            <span>
              {t("createdAtLabel", {
                date: new Date(post.created_at).toLocaleDateString("vi-VN"),
              })}
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
                    {t("missingTranslation", { locale: label })}
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
