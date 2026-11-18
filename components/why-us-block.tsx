"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionSection } from "./motion-section";

export function WhyUsBlock() {
  const t = useTranslations("WhyUsBlock");
  const points = t.raw("points") as string[];

  return (
    <MotionSection id="why-us" className="scroll-mt-24">
      <div className="rounded-xl border border-border bg-card p-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.06em] text-royal-blue">
              {t("badge")}
            </p>
            <h2 className="mt-2.5 font-display text-2xl font-bold leading-snug tracking-[-0.025em] text-foreground sm:text-3xl [text-wrap:balance]">
              {t("title")}
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.7] text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <ul className="divide-y divide-border border-t border-border lg:col-span-7 lg:border-t-0 lg:border-l lg:pl-12">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3.5 py-4 first:pt-2 last:pb-2"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-subtle text-emerald-accent">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-foreground">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MotionSection>
  );
}
