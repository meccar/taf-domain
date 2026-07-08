"use client";

import { useState } from "react";
import { deleteUserAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteUserButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Bạn có chắc muốn xoá người dùng này?")) return;
    setIsLoading(true);
    await deleteUserAction(userId);
    setIsLoading(false);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4 text-red-500" />
      )}
    </Button>
  );
}
