import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

export function WhyUsBlock() {
  const t = useTranslations("WhyUsBlock");
  const points = t.raw("points") as string[];

  return (
    <div className="border rounded-xl p-8 flex flex-col md:flex-row gap-10">
      <div className="flex-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
          {t("badge")}
        </p>
        <h2 className="text-2xl font-medium mb-4">{t("title")}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("description")}
        </p>
      </div>
      <ul className="flex flex-col gap-3 justify-center">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-3 text-sm">
            <Check size={15} className="text-green-600 shrink-0" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
