"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { Loader2, MailCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("AuthForms");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError(t("forgotPassword.errors.missingEmail"));
      return;
    }

    const supabase = createClient();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? t("forgotPassword.errors.emailNotSent")
          : t("forgotPassword.errors.generic"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
        <Card>
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <MailCheck className="h-6 w-6 text-green-600" />
              <CardTitle className="text-2xl">
                {t("forgotPassword.successTitle")}
              </CardTitle>
            </div>
            <CardDescription>
              {t("forgotPassword.successDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t("forgotPassword.helpText")}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {t("forgotPassword.title")}
            </CardTitle>
            <CardDescription>{t("forgotPassword.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} noValidate>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t("forgotPassword.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                    required
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && (
                  <p role="alert" className="text-sm text-red-500">
                    {error}
                  </p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("forgotPassword.submitting")}
                    </>
                  ) : (
                    t("forgotPassword.submit")
                  )}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                {t("forgotPassword.alreadyHaveAccount")}{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  {t("forgotPassword.login")}
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
