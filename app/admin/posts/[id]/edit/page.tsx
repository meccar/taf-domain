import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { EditPostForm } from "./edit-post-form";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `id, category, status, featured,
       post_translations (locale, title, excerpt, content, author)`,
    )
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>Chỉnh sửa bài viết</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<EditPostSkeleton />}>
          <EditPostContent paramsPromise={params} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

async function EditPostContent({
  paramsPromise,
}: {
  paramsPromise: Promise<{ id: string }>;
}) {
  const { id } = await paramsPromise;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `id, category, status, featured,
       post_translations (locale, title, excerpt, content, author)`,
    )
    .eq("id", id)
    .single();

  if (error || !post) {
    notFound();
  }

  return <EditPostForm post={post} />;
}

function EditPostSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-9 rounded-md bg-muted" />
      <div className="h-9 rounded-md bg-muted" />
      <div className="h-64 rounded-md bg-muted" />
    </div>
  );
}
