"use client";

import { Calculator, FileText, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function ServicesBlock() {
  const t = useTranslations("ServicesBlock");
  const services = [
    {
      icon: Calculator,
      title: t("services.0.title"),
      desc: t("services.0.description"),
    },
    {
      icon: FileText,
      title: t("services.1.title"),
      desc: t("services.1.description"),
    },
    {
      icon: Building2,
      title: t("services.2.title"),
      desc: t("services.2.description"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x border rounded-xl">
      {services.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="p-6">
          <Icon size={22} className="text-primary mb-3" />
          <p className="font-medium mb-1">{title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {desc}
          </p>
        </div>
      ))}
    </div>
  );
}
