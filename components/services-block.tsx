"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionCard, MotionSection } from "./motion-section";
import {
  ServiceCategory,
  getCategoryId,
  categoryIcons,
} from "@/lib/service-category";

export function ServicesBlock({
  selectedId = null,
  onClear,
}: {
  selectedId?: string | null;
  onClear?: () => void;
}) {
  const t = useTranslations("ServicesBlock");
  const finder = useTranslations("ProblemFinder");
  const overview = useTranslations("ServicesOverview");
  const categories = overview.raw("categories") as ServiceCategory[];

  const selected = categories.find((c) => getCategoryId(c.href) === selectedId);

  return (
    <MotionSection id="services">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-royal-blue">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.025em] text-foreground sm:text-3xl [text-wrap:balance]">
            {selected
              ? finder("servicesFor", { name: selected.name })
              : t("sectionTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {selected ? selected.description : t("sectionDescription")}
          </p>
        </div>
      </div>

      {selected ? (
        // A category is chosen: show the services TAF provides for it.
        <div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {selected.services.map((service) => (
              <li
                key={service}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-royal-blue/10 text-royal-blue">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm leading-relaxed text-foreground">
                  {service}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={selected.href}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-navy px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <span>{finder("viewDetail")}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span>{finder("viewAll")}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        // Nothing chosen yet: all categories, each linking to its page.
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, i) => {
            const Icon = categoryIcons[i % categoryIcons.length];
            return (
              <MotionCard key={category.name} index={i} className="h-full">
                <Link
                  href={category.href}
                  className="group flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:border-royal-blue/40 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-foreground transition-colors group-hover:bg-brand-navy group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-medium tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.015em] text-foreground">
                      {category.name}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-[1.65] text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 border-t border-border pt-4 text-sm font-medium text-foreground transition-colors group-hover:text-royal-blue">
                    <span>{t("serviceCta")}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </MotionCard>
            );
          })}
        </div>
      )}
    </MotionSection>
  );
}
