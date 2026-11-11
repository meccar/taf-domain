import Link from "next/link";
import {
  Calculator,
  FileText,
  BookOpen,
  ScrollText,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NewsletterForm } from "@/components/newsletter-form";

export async function generateMetadata() {
  const t = await getTranslations("ResourcesPage");
  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

export default async function ResourcesPage() {
  const t = await getTranslations("ResourcesPage");

  const categories = [
    {
      icon: Calculator,
      title: t("categories.taxCalculator.title"),
      description: t("categories.taxCalculator.description"),
      href: "/resources/calculators",
    },
    {
      icon: BookOpen,
      title: t("categories.blog.title"),
      description: t("categories.blog.description"),
      href: "/blog",
    },
  ];

  const downloads = (t.raw("downloads") as string[]).map((title, index) => ({
    title,
    file: [
      "/downloads/mau-de-nghi-hoan-thue-gtgt.docx",
      "/downloads/bang-ke-chi-phi.xlsx",
      "/downloads/checklist-quyet-toan-tndn.pdf",
      "/downloads/mau-hop-dong-lao-dong.docx",
    ][index],
  }));

  const legalDocs = t.raw("legalDocs") as string[];
  const faqs = (
    t.raw("faqs") as Array<{ question: string; answer: string }>
  ).map((item) => ({ q: item.question, a: item.answer }));

  return (
    <main className="w-full">
      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center flex flex-col items-center gap-4">
          <Badge variant="outline" className="uppercase tracking-widest">
            {t("badge")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            {t("heroTitle")}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
            {t("heroDescription")}
          </p>
        </div>
      </div>

      <Separator />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map(({ icon: Icon, title, description, href }) => (
            <Link key={title} href={href} className="group">
              <Card className="h-full transition-colors hover:border-foreground/20">
                <CardHeader className="gap-3">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="flex items-center gap-1.5 text-base">
                    {title}
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Separator />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl mb-10">
          <Badge variant="outline" className="uppercase tracking-widest mb-4">
            {t("downloadsBadge")}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {t("downloadsTitle")}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {downloads.map((d) => (
            <Link key={d.title} href={d.file} download>
              <Card className="flex-row items-center gap-3 p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{d.title}</span>
                <Download className="h-4 w-4 text-muted-foreground ml-auto shrink-0" />
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Separator />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 flex flex-col gap-16">
            <div>
              <Badge
                variant="outline"
                className="uppercase tracking-widest mb-4"
              >
                {t("legalBadge")}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
                {t("legalTitle")}
              </h2>
              <div className="flex flex-col divide-y border rounded-lg">
                <Card>
                  <CardContent className="p-0">
                    {legalDocs.map((doc, i) => (
                      <div key={doc}>
                        <div className="flex items-center gap-3 p-4">
                          <ScrollText className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm">{doc}</span>
                        </div>
                        {i < legalDocs.length - 1 && <Separator />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <Badge
                variant="outline"
                className="uppercase tracking-widest mb-4"
              >
                {t("faqBadge")}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
                {t("faqTitle")}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((item, i) => (
                  <AccordionItem key={item.q} value={`item-${i}`}>
                    <AccordionTrigger className="text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader className="gap-2">
                <CardTitle className="text-base">
                  {t("newsletterTitle")}
                </CardTitle>
                <CardDescription>{t("newsletterDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <NewsletterForm source="resources-page" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
