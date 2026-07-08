"use client";

import { createPostAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

export default function NewPostPage() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    formData.set("content", content);
    const result = await createPostAction(formData);
    setIsLoading(false);
    if (result?.error) setError(result.error);
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Bài viết mới</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input
              id="title"
              name="title"
              required
              placeholder="Nhập tiêu đề bài viết"
            />
          </div>

          <div className="grid gap-2">
            <Label>Nội dung</Label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          <div className="grid gap-2 max-w-xs">
            <Label htmlFor="status">Trạng thái</Label>
            <select
              id="status"
              name="status"
              className="h-9 rounded-md border px-3 text-sm"
              defaultValue="draft"
            >
              <option value="draft">Bản nháp</option>
              <option value="published">Đăng ngay</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" disabled={isLoading} className="w-fit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Lưu bài viết
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
