"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { deletePostAction } from "./actions";

export function DeletePostItem({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      className="text-red-600 focus:text-red-600"
      disabled={isPending}
      onSelect={(e) => {
        e.preventDefault();
        if (!confirm("Xoá bài viết này?")) return;
        startTransition(async () => {
          await deletePostAction(postId);
        });
      }}
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="mr-2 h-4 w-4 text-red-600" />
      )}
      Xoá
    </DropdownMenuItem>
  );
}
