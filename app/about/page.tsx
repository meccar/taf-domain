import Link from "next/link";
import { CheckCircle2, Target, Users, Award } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function About() {
  const t = await getTranslations("AboutPage");
  const stats = [
    { label: t("stats.experience.label"), value: t("stats.experience.value") },
    { label: t("stats.clients.label"), value: t("stats.clients.value") },
    { label: t("stats.compliance.label"), value: t("stats.compliance.value") },
    { label: t("stats.response.label"), value: t("stats.response.value") },
  ];

  const values = [
    {
      icon: Target,
      title: t("values.accuracy.title"),
      desc: t("values.accuracy.description"),
    },
    {
      icon: Users,
      title: t("values.care.title"),
      desc: t("values.care.description"),
    },
    {
      icon: Award,
      title: t("values.professionalism.title"),
      desc: t("values.professionalism.description"),
    },
  ];

  const highlights = t.raw("highlights") as string[];

  const team = t.raw("team.members") as Array<{
    name: string;
    title: string;
    image: string;
    summary: string;
    specialties: string[];
    credentials: string[];
  }>;

  const partners = t.raw("partners") as string[];
  const caseStudies = t.raw("caseStudies") as Array<{
    company: string;
    industry: string;
    result: string;
    quote: string;
  }>;

  return (
    <main className="w-full">
      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center flex flex-col items-center gap-4">
          <Badge variant="outline" className="uppercase tracking-widest">
            {t("badge")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            {t("heroTitle")}
            <br className="hidden sm:block" /> {t("heroTitleLineBreak")}
          </h1>
          <CardDescription className="max-w-2xl text-base leading-relaxed">
            {t("heroDescription")}
          </CardDescription>
        </div>
      </div>

      <Separator />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map(({ label, value }) => (
            <Card key={label} className="border-none shadow-none text-center">
              <CardHeader className="gap-1 pb-0">
                <CardTitle className="text-3xl sm:text-4xl font-semibold">
                  {value}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{label}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-4">
            <Badge
              variant="outline"
              className="uppercase tracking-widest w-fit"
            >
              {t("missionBadge")}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {t("missionTitle")}
            </h2>
            <CardDescription className="text-base leading-relaxed">
              {t("missionDescription")}
            </CardDescription>
          </div>
          <ul className="flex flex-col gap-4">
            {highlights.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <CardDescription className="text-sm">{text}</CardDescription>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center flex flex-col items-center gap-3 mb-12">
          <Badge variant="outline" className="uppercase tracking-widest">
            {t("valuesBadge")}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {t("valuesTitle")}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="hover:shadow-sm transition-shadow">
              <CardHeader className="gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base font-medium">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {desc}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center flex flex-col items-center gap-3 mb-12">
            <Badge variant="outline" className="uppercase tracking-widest">
              {t("teamBadge")}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {t("teamTitle")}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {team.map(
              ({ name, title, image, summary, specialties, credentials }) => (
                <Card
                  key={name}
                  className="flex h-full min-h-[760px] flex-col overflow-hidden border border-border/60 bg-background shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="h-[420px] overflow-hidden bg-muted sm:h-[470px] lg:h-[520px]">
                    <img
                      src={image}
                      alt={name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <CardHeader className="items-start pb-3 pt-5">
                      <div>
                        <CardTitle className="text-base font-medium text-left">
                          {name}
                        </CardTitle>
                        <CardDescription className="text-xs text-left">
                          {title}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col space-y-4 px-5 pb-5">
                      <p className="min-h-[88px] text-sm leading-relaxed text-muted-foreground text-left">
                        {summary}
                      </p>
                      <div className="flex min-h-[36px] flex-wrap gap-2">
                        {specialties.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[10px] uppercase tracking-wide text-muted-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto space-y-1 border-t border-border pt-3">
                        {credentials.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center flex flex-col items-center gap-3 mb-10">
          <Badge variant="outline" className="uppercase tracking-widest">
            {t("partnersBadge")}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {t("partnersTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex h-20 items-center justify-center rounded-xl border border-border bg-background text-sm font-semibold tracking-wide text-muted-foreground shadow-sm"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center flex flex-col items-center gap-3 mb-10">
          <Badge variant="outline" className="uppercase tracking-widest">
            {t("caseStudiesBadge")}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {t("caseStudiesTitle")}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {caseStudies.map((study) => (
            <Card
              key={study.company}
              className="flex h-full flex-col justify-between"
            >
              <CardHeader className="gap-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-lg font-semibold">{study.company}</span>
                  <Badge variant="secondary">{study.industry}</Badge>
                </div>
                <div className="text-xl font-semibold text-primary">
                  {study.result}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <blockquote className="border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-muted-foreground">
                  “{study.quote}”
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {t("ctaTitle")}
        </h2>
        <CardDescription className="max-w-xl text-base">
          {t("ctaDescription")}
        </CardDescription>
        <Button asChild size="lg">
          <Link href="/contact">{t("ctaButton")}</Link>
        </Button>
      </div>
    </main>
  );
}
