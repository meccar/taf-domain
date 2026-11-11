import { ContactSubmissionsTableWrapper } from "@/components/admin/contact-submissions-table-wrapper";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata() {
  const t = await getTranslations("AdminContactSubmissions");
  return {
    title: `${t("pageTitle")} | Admin`,
  };
}

export default async function ContactSubmissionsPage() {
  const t = await getTranslations("AdminContactSubmissions");

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("pageTitle")}
        </h1>
      </div>

      <Suspense fallback={<ContactSubmissionsSkeleton />}>
        <ContactSubmissionsTableWrapper />
      </Suspense>
    </div>
  );
}

function ContactSubmissionsSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-14 w-full animate-pulse rounded-md border bg-muted/40"
        />
      ))}
    </div>
  );
}
