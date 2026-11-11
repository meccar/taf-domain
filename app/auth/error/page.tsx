import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const t = await getTranslations("AuthError");

  return (
    <p className="text-sm text-muted-foreground">
      {params?.error
        ? t("errorCode", { code: params.error })
        : t("unknownError")}
    </p>
  );
}

async function ErrorContentFallback() {
  const t = await getTranslations("AuthError");
  return <p className="text-sm text-muted-foreground">{t("loadingError")}</p>;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const t = await getTranslations("AuthError");

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <CardTitle className="text-2xl">{t("title")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Suspense fallback={<ErrorContentFallback />}>
                <ErrorContent searchParams={searchParams} />
              </Suspense>
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth/login">{t("backToLogin")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
