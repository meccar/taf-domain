import { useTranslations } from "next-intl";
import { MotionSection } from "./motion-section";

export function ExecutiveKPI() {
  const t = useTranslations("Hero");

  const stats = [
    {
      value: t("stats.experience.value"),
      label: t("stats.experience.label"),
    },
    {
      value: t("stats.clients.value"),
      label: t("stats.clients.label"),
    },
    {
      value: t("stats.compliance.value"),
      label: t("stats.compliance.label"),
    },
  ];
  return (
    <MotionSection
      id="executive-kpi"
      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-border bg-card px-6 py-6 text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] sm:px-8 sm:text-left"
        >
          <p className="font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-foreground tabular-nums sm:text-[2.5rem]">
            {stat.value}
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </MotionSection>
  );
}
