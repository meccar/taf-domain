import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="relative flex min-h-[calc(100vh-8rem)] items-center justify-center overflow-hidden px-6">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full border bg-muted shadow-sm">
          <FileQuestion className="h-12 w-12 text-primary" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          {t("error")}
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {t("title")}
        </h1>

        <p className="mt-5 text-lg text-muted-foreground">{t("description")}</p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backHome")}
            </Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/contact">{t("contactUs")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
