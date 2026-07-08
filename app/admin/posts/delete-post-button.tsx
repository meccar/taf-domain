"use client";

import { useState } from "react";
import { deletePostAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

export function DeletePostButton({ postId }: { postId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Xoá bài viết này?")) return;
    setIsLoading(true);
    await deletePostAction(postId);
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
