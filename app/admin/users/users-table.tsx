import { createClient } from "@/lib/supabase/server";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DeleteUserButton } from "./delete-user-button";

export async function UsersTable() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, role, created_at")
    .order("created_at", { ascending: false });

  return (
    <TableBody>
      {profiles?.map((profile) => (
        <TableRow key={profile.id}>
          <TableCell>{profile.email}</TableCell>
          <TableCell>
            <Badge
              variant={profile.role === "root_admin" ? "default" : "secondary"}
            >
              {profile.role === "root_admin" ? "Root Admin" : "Admin"}
            </Badge>
          </TableCell>
          <TableCell>
            {new Date(profile.created_at).toLocaleDateString("vi-VN")}
          </TableCell>
          <TableCell className="text-right">
            {profile.role !== "root_admin" && (
              <DeleteUserButton userId={profile.id} />
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
