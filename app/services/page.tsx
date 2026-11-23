import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Landmark,
  UserRound,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
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
import { buildPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { buildServiceJsonLd } from "@/lib/seo-jsonld";

const PATH = "/services";
const NS = "ServicesOverview";

export async function generateMetadata() {
  return buildPageMetadata({ namespace: NS, path: PATH });
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = await getTranslations(NS);
  const meta = await getTranslations("Metadata");
  const categories = t.raw("categories") as Array<{
    name: string;
    description: string;
    href: string;
    services: string[];
  }>;
  const icons = [BriefcaseBusiness, UserRound, Building2, Landmark];

  return (
    <>
      <JsonLd
        data={buildServiceJsonLd({
          locale,
          path: PATH,
          name: t("title"),
          description: t("description"),
          serviceType: t("serviceType"),
          breadcrumbs: [
            { name: meta("breadcrumbs.home"), path: "/" },
            { name: meta("breadcrumbs.services"), path: "/services" },
          ],
          faq: t.has("faqs")
            ? (t.raw("faqs") as { question: string; answer: string }[])
            : undefined,
        })}
      />
      <main className="w-full">
        <div className="bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.06em] text-royal-blue">
                {t("badge")}
              </p>
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
              <p className="mt-3 text-muted-foreground">
                {t("ctaDescription")}
              </p>
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
    </>
  );
}
