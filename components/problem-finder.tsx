"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { MotionSection } from "./motion-section";
import {
  ServiceCategory,
  getCategoryId,
  categoryIcons,
} from "@/lib/service-category";

type Problem = { question: string; answer: string };

export function ProblemFinder({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const t = useTranslations("ProblemFinder");
  const overview = useTranslations("ServicesOverview");
  const categories = overview.raw("categories") as ServiceCategory[];
  const panelRef = React.useRef<HTMLDivElement>(null);

  const selected = categories.find((c) => getCategoryId(c.href) === selectedId);

  // On small screens the panel sits below the tiles: bring it into view.
  React.useEffect(() => {
    if (selectedId && window.matchMedia("(max-width: 1023px)").matches) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedId]);

  return (
    <MotionSection id="who-are-you" className="scroll-mt-24">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-royal-blue">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.025em] text-foreground sm:text-3xl [text-wrap:balance]">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("description")}
        </p>
      </div>

      <div
        role="group"
        aria-label={t("title")}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {categories.map((category, i) => {
          const id = getCategoryId(category.href);
          const Icon = categoryIcons[i % categoryIcons.length];
          const active = id === selectedId;

          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              aria-controls="problem-panel"
              onClick={() => onSelect(active ? null : id)}
              className={`group flex h-full cursor-pointer flex-col gap-3 rounded-lg border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                active
                  ? "border-royal-blue bg-royal-blue/5"
                  : "border-border bg-card hover:border-royal-blue/40 hover:bg-muted/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
                    active
                      ? "bg-brand-navy text-white"
                      : "bg-muted text-foreground group-hover:bg-brand-navy group-hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    active ? "rotate-180" : ""
                  }`}
                />
              </div>
              <div>
                <p className="font-display text-base font-semibold leading-snug text-foreground">
                  {category.name}
                </p>
                <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div
        id="problem-panel"
        ref={panelRef}
        aria-live="polite"
        className="scroll-mt-24"
      >
        {selected && selectedId && (
          <ProblemPanel
            // key resets the open accordion item when the category changes
            key={selectedId}
            categoryId={selectedId}
            categoryName={selected.name}
          />
        )}
      </div>
    </MotionSection>
  );
}

function ProblemPanel({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) {
  const t = useTranslations("ProblemFinder");
  const problems = (t.raw(`problems.${categoryId}`) ?? []) as Problem[];
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4 sm:p-6">
      <h3 className="font-display text-lg font-semibold tracking-[-0.015em] text-foreground">
        {t("problemsTitle", { name: categoryName })}
      </h3>

      <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-card">
        {problems.map((problem, i) => {
          const open = openIndex === i;
          const panelId = `problem-${categoryId}-${i}`;

          return (
            <div key={problem.question}>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full cursor-pointer items-start gap-3 p-4 text-left transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <span className="mt-0.5 text-xs font-medium tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-sm font-medium leading-snug text-foreground">
                  {problem.question}
                </span>
                <ChevronDown
                  className={`mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open && (
                <div id={panelId} className="px-4 pb-4 pl-11">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {problem.answer}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-royal-blue transition-colors hover:text-brand-navy"
                  >
                    <span>{t("askTaf")}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-xs leading-relaxed text-muted-foreground">
          {t("disclaimer")}
        </p>
        <a
          href="#services"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-royal-blue"
        >
          <span>{t("seeServices")}</span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
