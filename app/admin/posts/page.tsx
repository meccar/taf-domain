import Link from "next/link";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PostsTable } from "./posts-table";

export default function PostsPage() {
  const t = useTranslations("AdminPosts");

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            {t("newPost")}
          </Link>
        </Button>
      </div>

      <div className="min-w-0 overflow-x-auto rounded-md border bg-background">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[320px]">{t("columns.title")}</TableHead>
              <TableHead className="w-[140px]">
                {t("columns.language")}
              </TableHead>
              <TableHead className="w-[140px]">
                {t("columns.category")}
              </TableHead>
              <TableHead className="w-[120px]">{t("columns.status")}</TableHead>
              <TableHead className="w-[120px]">
                {t("columns.createdAt")}
              </TableHead>
              <TableHead className="w-[80px] text-right">
                {t("columns.actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<PostsTableSkeleton />}>
            <PostsTable />
          </Suspense>
        </Table>
      </div>
    </div>
  );
}

function PostsTableSkeleton() {
  return (
    <tbody>
      {Array.from({ length: 6 }).map((_, i) => (
        <tr key={i} className="border-b">
          <td className="p-4">
            <div className="h-4 w-52 animate-pulse rounded bg-muted" />
          </td>
          <td className="p-4">
            <div className="h-5 w-12 animate-pulse rounded-full bg-muted" />
          </td>
          <td className="p-4">
            <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
          </td>
          <td className="p-4">
            <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
          </td>
          <td className="p-4">
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </td>
          <td className="p-4" />
        </tr>
      ))}
    </tbody>
  );
}
