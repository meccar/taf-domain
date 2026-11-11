import type { Metadata } from "next";
import Link from "next/link";
import { Scale, FileText, ShieldAlert, BriefcaseBusiness } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("LegalPages.termsOfUse");
  return {
    title: `${t("eyebrow")} | TAF Việt`,
    description: t("description"),
  } satisfies Metadata;
}

export default async function Page() {
  const t = await getTranslations("LegalPages.termsOfUse");
  const sections = t.raw("sections") as Array<{
    title: string;
    body: string;
  }>;

  const sectionIcons = [FileText, BriefcaseBusiness, Scale, ShieldAlert];

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-4 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto max-w-3xl text-base text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="space-y-6">
        {sections.map(({ title, body }, index) => {
          const Icon = sectionIcons[index] ?? FileText;
          return (
            <section
              key={title}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <h2 className="text-xl font-semibold">{title}</h2>
              </div>
              <p className="leading-7 text-muted-foreground">{body}</p>
            </section>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border bg-muted/50 p-6">
        <h2 className="mb-3 text-xl font-semibold">{t("supportTitle")}</h2>
        <p className="leading-7 text-muted-foreground">{t("supportBody")}</p>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          {t("cta")}
        </Link>
      </div>
    </main>
  );
}
