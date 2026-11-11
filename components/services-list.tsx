import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { FileText, Calculator, ShieldCheck, BarChart3 } from "lucide-react";

export function ServicesList() {
  const t = useTranslations("ServicesList");
  const services = [
    {
      icon: FileText,
      title: t("services.0.title"),
      desc: t("services.0.description"),
      badge: t("services.0.badge"),
    },
    {
      icon: Calculator,
      title: t("services.1.title"),
      desc: t("services.1.description"),
      badge: null,
    },
    {
      icon: ShieldCheck,
      title: t("services.2.title"),
      desc: t("services.2.description"),
      badge: null,
    },
    {
      icon: BarChart3,
      title: t("services.3.title"),
      desc: t("services.3.description"),
      badge: null,
    },
  ];

  return (
    <div className="flex flex-col">
      {services.map(({ icon: Icon, title, desc, badge }, i) => (
        <div key={title}>
          <div className="flex items-start gap-4 py-4">
            <div className="mt-0.5 p-2 rounded-md bg-muted shrink-0">
              <Icon size={16} className="text-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">{title}</p>
                {badge && <Badge variant="secondary">{badge}</Badge>}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
            </div>
          </div>
          {i < services.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
