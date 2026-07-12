import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";
import { DeletePostButton } from "./delete-post-button";

export default async function PostsPage() {
  const supabase = await createClient();

  // Log the error so failures like this are visible instead of silently rendering empty
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `id, category, status, featured, created_at,
       post_translations (locale, title)`,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load posts:", error);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Bài viết</h1>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Bài viết mới
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Ngôn ngữ</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts?.map((post) => {
              // Prefer Vietnamese title for the admin list, fall back to whatever exists
              const translations = post.post_translations ?? [];
              const primary =
                translations.find((t) => t.locale === "vi") ?? translations[0];

              return (
                <TableRow key={post.id}>
                  <TableCell className="flex items-center gap-2">
                    {post.featured && (
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    )}
                    {primary?.title ?? (
                      <span className="text-muted-foreground italic">
                        Chưa có tiêu đề
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {translations.map((t) => (
                        <Badge
                          key={t.locale}
                          variant="outline"
                          className="uppercase"
                        >
                          {t.locale}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{post.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post.status === "published" ? "default" : "secondary"
                      }
                    >
                      {post.status === "published" ? "Đã đăng" : "Bản nháp"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(post.created_at).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DeletePostButton postId={post.id} />
                  </TableCell>
                </TableRow>
              );
            })}
            {posts?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  Chưa có bài viết nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
