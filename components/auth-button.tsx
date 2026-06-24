"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "./logout-button";
import { useEffect, useState } from "react";

export function AuthButton() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const supabase = createClient();

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setUser(data?.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      mounted = false;
      try {
        listener?.subscription?.unsubscribe();
      } catch {
        // ignore
      }
    };
  }, []);

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" asChild>
        <Link href="/auth/login">Đăng nhập</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/auth/sign-up">Đăng ký</Link>
      </Button>
    </div>
  );
}
