"use client";

import { useState } from "react";
import { emptyDraft, LocaleCode, LOCALES, TranslationDraft } from "../const";
import { updatePostAction } from "../actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { TabsList, TabsTrigger, TabsContent, Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/lib/blog-data";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type EditPostPageProps = {
  postId: string;
  initialData: {
    category: string;
    status: "draft" | "published";
    featured: boolean;
    translations: Array<{ locale: LocaleCode } & TranslationDraft>;
  };
};

export default function EditPostPage({
  postId,
  initialData,
}: EditPostPageProps) {
  const [drafts, setDrafts] = useState<Record<LocaleCode, TranslationDraft>>(
    () => {
      const base = Object.fromEntries(
        LOCALES.map((l) => [l.code, { ...emptyDraft }]),
      ) as Record<LocaleCode, TranslationDraft>;

      for (const t of initialData.translations) {
        base[t.locale] = {
          title: t.title ?? "",
          excerpt: t.excerpt ?? "",
          content: t.content ?? "",
          author: t.author ?? "",
        };
      }
      return base;
    },
  );
  const [category, setCategory] = useState(initialData.category);
  const [status, setStatus] = useState<string>(initialData.status);
  const [featured, setFeatured] = useState(initialData.featured);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateDraft(
    locale: LocaleCode,
    field: keyof TranslationDraft,
    value: string,
  ) {
    setDrafts((prev) => ({
      ...prev,
      [locale]: { ...prev[locale], [field]: value },
    }));
  }

  async function handleSubmit() {
    setIsLoading(true);
    setError(null);

    const translations = LOCALES.filter(
      (l) => drafts[l.code].title.trim() !== "",
    ).map((l) => ({ locale: l.code, ...drafts[l.code] }));

    if (translations.length === 0) {
      setError("Vui lòng nhập nội dung cho ít nhất một ngôn ngữ");
      setIsLoading(false);
      return;
    }
    if (!category) {
      setError("Vui lòng chọn danh mục");
      setIsLoading(false);
      return;
    }

    const result = await updatePostAction(postId, {
      category: category as any,
      status: status as "draft" | "published",
      featured,
      translations,
    });

    setIsLoading(false);
    if (result?.error) setError(result.error);
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Bài viết mới</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Language-agnostic fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Danh mục</Label>
            <select
              className="h-9 rounded-md border px-3 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Chọn danh mục
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label>Trạng thái</Label>
            <select
              className="h-9 rounded-md border px-3 text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Bản nháp</option>
              <option value="published">Đăng ngay</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="featured"
            checked={featured}
            onCheckedChange={(v) => setFeatured(v === true)}
          />
          <Label htmlFor="featured" className="font-normal">
            Đánh dấu là bài viết nổi bật
          </Label>
        </div>

        {/* Per-language content, tabbed */}
        <Tabs defaultValue="vi" className="w-full">
          <TabsList>
            {LOCALES.map((l) => (
              <TabsTrigger key={l.code} value={l.code}>
                {l.label}
                {drafts[l.code].title && (
                  <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {LOCALES.map((l) => (
            <TabsContent
              key={l.code}
              value={l.code}
              className="flex flex-col gap-4 pt-4"
            >
              <div className="grid gap-2">
                <Label>Tiêu đề ({l.label})</Label>
                <Input
                  value={drafts[l.code].title}
                  onChange={(e) => updateDraft(l.code, "title", e.target.value)}
                  placeholder="Nhập tiêu đề bài viết"
                />
              </div>
              <div className="grid gap-2">
                <Label>Mô tả ngắn ({l.label})</Label>
                <Textarea
                  rows={2}
                  value={drafts[l.code].excerpt}
                  onChange={(e) =>
                    updateDraft(l.code, "excerpt", e.target.value)
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Nội dung ({l.label})</Label>
                <RichTextEditor
                  content={drafts[l.code].content}
                  onChange={(html) => updateDraft(l.code, "content", html)}
                />
              </div>
              <div className="grid gap-2 max-w-xs">
                <Label>Tác giả</Label>
                <Input
                  value={drafts[l.code].author}
                  onChange={(e) =>
                    updateDraft(l.code, "author", e.target.value)
                  }
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-fit"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Lưu bài viết
        </Button>
      </CardContent>
    </Card>
  );
}
