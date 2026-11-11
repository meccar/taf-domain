"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { deleteUserAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteUserButton({ userId }: { userId: string }) {
  const t = useTranslations("AdminUsers");
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(t("confirmDelete"))) return;
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
