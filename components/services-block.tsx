"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Landmark,
  UserRound,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionCard, MotionSection } from "./motion-section";

const icons = [BriefcaseBusiness, UserRound, Building2, Landmark];

type ServiceCategory = {
  name: string;
  description: string;
  href: string;
  services: string[];
};

export function ServicesBlock() {
  const t = useTranslations("ServicesBlock");
  const overview = useTranslations("ServicesOverview");
  const categories = overview.raw("categories") as ServiceCategory[];

  const services = categories.map((category, i) => ({
    index: String(i + 1).padStart(2, "0"),
    icon: icons[i % icons.length],
    title: category.name,
    desc: category.description,
    href: category.href,
  }));

  return (
    <MotionSection id="services" className="scroll-mt-24">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-royal-blue">
            {t("eyebrow")}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.025em] text-foreground sm:text-3xl [text-wrap:balance]">
            {t("sectionTitle")}
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {t("sectionDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map(({ index, icon: Icon, title, desc, href }, i) => (
          <MotionCard key={title} index={i} className="h-full">
            <Link
              href={href}
              className="group flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:border-royal-blue/40 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-foreground transition-colors group-hover:bg-brand-navy group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground tabular-nums">
                    {index}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.015em] text-foreground">
                  {title}
                </h3>

                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-muted-foreground">
                  {desc}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 border-t border-border pt-4 text-sm font-medium text-foreground transition-colors group-hover:text-royal-blue">
                <span>{t("serviceCta")}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </MotionCard>
        ))}
      </div>
    </MotionSection>
  );
}
