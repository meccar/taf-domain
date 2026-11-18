import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  categoryIcons,
  getCategoryId,
  type ServiceCategory,
} from "@/lib/service-category";

/**
 * Shown near the end of each service page: the other service groups, plus a
 * way back to the home-page "who are you" finder for people who landed here
 * from search and are not sure this is their group.
 */
export async function RelatedServices({ currentId }: { currentId: string }) {
  const t = await getTranslations("ServicePageLayout");
  const overview = await getTranslations("ServicesOverview");

  // Map first so each category keeps its own icon, then drop the current one.
  const others = (overview.raw("categories") as ServiceCategory[])
    .map((category, i) => ({
      ...category,
      Icon: categoryIcons[i % categoryIcons.length],
    }))
    .filter((category) => getCategoryId(category.href) !== currentId);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl [text-wrap:balance]">
            {t("relatedTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("relatedDescription")}
          </p>
        </div>
        <Link
          href="/#who-are-you"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-royal-blue transition-colors hover:text-brand-navy"
        >
          <span>{t("backToFinder")}</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {others.map(({ name, description, href, Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition-colors hover:border-royal-blue/40 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-foreground transition-colors group-hover:bg-brand-navy group-hover:text-white">
              <Icon className="h-5 w-5" />
            </div>
            <p className="font-display text-base font-semibold leading-snug text-foreground">
              {name}
            </p>
            <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
