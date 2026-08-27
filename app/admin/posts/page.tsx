import Link from "next/link";
import { Suspense } from "react";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PostsTable } from "./posts-table";

export default function PostsPage() {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Bài viết</h1>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            Bài viết mới
          </Link>
        </Button>
      </div>

      <div className="min-w-0 overflow-x-auto rounded-md border bg-background">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[320px]">Tiêu đề</TableHead>
              <TableHead className="w-[140px]">Ngôn ngữ</TableHead>
              <TableHead className="w-[140px]">Danh mục</TableHead>
              <TableHead className="w-[120px]">Trạng thái</TableHead>
              <TableHead className="w-[120px]">Ngày tạo</TableHead>
              <TableHead className="w-[80px] text-right">Hành động</TableHead>
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
