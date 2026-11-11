import Link from "next/link";
import { Check, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export interface ServiceLaneFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ServiceLaneStep {
  title: string;
  description: string;
}

export interface ServiceLanePageProps {
  eyebrow: string;
  title: string;
  description: string;
  valuePoints: ServiceLaneFeature[];
  steps: ServiceLaneStep[];
  ctaTitle: string;
  ctaDescription: string;
  contactFormTitle: string;
  source: string;
}

export async function ServiceLanePage({
  eyebrow,
  title,
  description,
  valuePoints,
  steps,
  ctaTitle,
  ctaDescription,
  contactFormTitle,
  source,
}: ServiceLanePageProps) {
  const t = await getTranslations("ServicePageLayout");

  return (
    <main className="w-full">
      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center text-center gap-5">
          <Badge variant="outline" className="uppercase tracking-widest">
            {eyebrow}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" asChild>
              <Link href="/contact">{t("freeConsultation")}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#process">{t("viewPricing")}</Link>
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl mb-12">
          <Badge variant="outline" className="uppercase tracking-widest mb-4">
            {t("serviceScope")}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {t("serviceScopeTitle")}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {valuePoints.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-none shadow-none bg-muted/30">
              <CardHeader className="gap-3">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div id="process" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl mb-12">
          <Badge variant="outline" className="uppercase tracking-widest mb-4">
            {t("process")}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {t("processTitle", { count: steps.length })}
          </h2>
        </div>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full border flex items-center justify-center text-sm font-medium shrink-0">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-border" />
                )}
              </div>
              <div className={cn("pb-10", i === steps.length - 1 && "pb-0")}>
                <h3 className="font-medium mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
              {ctaTitle}
            </h2>
            <p className="text-muted-foreground">{ctaDescription}</p>
          </div>

          <ContactForm
            variant="card"
            compact
            title={contactFormTitle}
            submitLabel={t("contactButton")}
            source={source}
          />
        </div>
      </div>
    </main>
  );
}
