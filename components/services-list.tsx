import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Landmark,
  UserRound,
} from "lucide-react";

const icons = [BriefcaseBusiness, UserRound, Building2, Landmark];

type ServiceCategory = {
  name: string;
  description: string;
  href: string;
  services: string[];
};

export function ServicesList({
  onSelectService,
}: {
  onSelectService?: (serviceTitle: string) => void;
}) {
  const t = useTranslations("ServicesBlock");
  const overview = useTranslations("ServicesOverview");
  const categories = overview.raw("categories") as ServiceCategory[];

  return (
    <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-card">
      {categories.map((category, i) => {
        const Icon = icons[i % icons.length];
        const index = String(i + 1).padStart(2, "0");

        return (
          <div
            key={category.name}
            className="flex items-start gap-4 p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-sm font-semibold text-foreground">
                  {index}. {category.name}
                </p>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {category.description}
              </p>
              {onSelectService && (
                <button
                  type="button"
                  onClick={() => onSelectService(category.name)}
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-royal-blue transition-colors hover:text-brand-navy cursor-pointer"
                >
                  <span>{t("serviceCta")}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
