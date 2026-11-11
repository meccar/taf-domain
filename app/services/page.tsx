import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Landmark,
  UserRound,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations("ServicesOverview");
  const title = `${t("title")} | TAF Việt`;
  const description = t("description");

  return {
    title,
    description,
    alternates: {
      canonical: "/services",
    },
    openGraph: {
      title,
      description,
      url: "https://taf.asia/services",
      siteName: "TAF Việt",
      locale: locale === "en" ? "en_US" : "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    keywords: [
      "TAF Việt",
      "dịch vụ kế toán",
      "kê khai thuế",
      "tư vấn tài chính",
      "doanh nghiệp Việt Nam",
    ],
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("ServicesOverview");
  const categories = t.raw("categories") as Array<{
    name: string;
    description: string;
    href: string;
    services: string[];
  }>;

  const icons = [BriefcaseBusiness, UserRound, Building2, Landmark];

  return (
    <main className="w-full">
      <div className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-4 uppercase tracking-widest">
              {t("badge")}
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("description")}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">{t("explore")}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">{t("ctaTitle")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("badge")}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Card
                key={category.name}
                className="h-full border-none bg-muted/30"
              >
                <CardHeader className="gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {category.services.map((service) => (
                      <li key={service} className="flex items-start gap-2">
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-3">
                  <Button
                    variant="outline"
                    asChild
                    className="w-full sm:w-auto"
                  >
                    <Link href={category.href}>
                      {t("explore")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground">{t("ctaDescription")}</p>
          </div>

          <ContactForm
            variant="card"
            compact
            title={t("contactFormTitle")}
            submitLabel={t("explore")}
            source={t("source")}
          />
        </div>
      </div>
    </main>
  );
}
