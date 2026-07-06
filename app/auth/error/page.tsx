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

  return (
    <p className="text-sm text-muted-foreground">
      {params?.error
        ? `Mã lỗi: ${params.error}`
        : "Đã xảy ra lỗi không xác định."}
    </p>
  );
}

function ErrorContentFallback() {
  return (
    <p className="text-sm text-muted-foreground">Đang tải thông tin lỗi...</p>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <CardTitle className="text-2xl">
                  Rất tiếc, đã có lỗi xảy ra
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Suspense fallback={<ErrorContentFallback />}>
                <ErrorContent searchParams={searchParams} />
              </Suspense>
              <Button asChild variant="outline" className="w-full">
                <Link href="/auth/login">Quay lại trang đăng nhập</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
