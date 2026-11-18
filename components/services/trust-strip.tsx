import { ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

type Stat = { value: string; label: string };

/**
 * Proof right under the hero: the visitor is about to hand over invoices,
 * bank statements and payroll, so trust has to come before features.
 * Numbers are site-wide, so they live in ServicePageLayout.trust.
 */
export async function TrustStrip() {
  const t = await getTranslations("ServicePageLayout");
  const stats = (t.raw("trust") as Stat[]) ?? [];
  if (stats.length === 0) return null;

  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 flex items-center justify-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground md:justify-start">
          <ShieldCheck className="h-4 w-4 shrink-0 text-royal-blue" />
          <span>{t("trustLicense")}</span>
        </p>
      </div>
    </section>
  );
}
