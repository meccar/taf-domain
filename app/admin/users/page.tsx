import { Suspense } from "react";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreateUserDialog } from "./create-user-dialog";
import { UsersTable } from "./users-table";

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Người dùng</h1>
        <CreateUserDialog />
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<UsersTableSkeleton />}>
            <UsersTable />
          </Suspense>
        </Table>
      </div>
    </div>
  );
}

function UsersTableSkeleton() {
  return (
    <tbody>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b">
          <td className="p-4">
            <div className="h-4 w-40 animate-pulse rounded bg-muted" />
          </td>
          <td className="p-4">
            <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
          </td>
          <td className="p-4">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          </td>
          <td className="p-4" />
        </tr>
      ))}
    </tbody>
  );
}
