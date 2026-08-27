import { createClient } from "@/lib/supabase/server";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { DeletePostButton } from "./delete-post-button";

export async function PostsTable() {
  const supabase = await createClient();

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
    <TableBody>
      {posts?.map((post) => {
        const translations = post.post_translations ?? [];
        const primary =
          translations.find((t) => t.locale === "vi") ?? translations[0];

        return (
          <TableRow key={post.id}>
            <TableCell className="max-w-0">
              <div className="flex min-w-0 items-center gap-2">
                {post.featured && (
                  <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-400 text-yellow-400" />
                )}
                <span className="truncate" title={primary?.title ?? undefined}>
                  {primary?.title ?? (
                    <span className="text-muted-foreground italic">
                      Chưa có tiêu đề
                    </span>
                  )}
                </span>
              </div>
            </TableCell>
            <TableCell className="max-w-0">
              <div className="flex flex-wrap gap-1">
                {translations.map((t) => (
                  <Badge key={t.locale} variant="outline" className="uppercase">
                    {t.locale}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell className="max-w-0">
              <Badge variant="outline" className="max-w-full truncate">
                {post.category}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={post.status === "published" ? "default" : "secondary"}
              >
                {post.status === "published" ? "Đã đăng" : "Bản nháp"}
              </Badge>
            </TableCell>
            <TableCell className="whitespace-nowrap">
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
          <TableCell colSpan={6} className="text-center text-muted-foreground">
            Chưa có bài viết nào
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
