import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Target,
  Users,
  Award,
  Building2,
  BadgeCheck,
  Briefcase,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section-header";
import { MotionSection } from "@/components/motion-section";
import { ExecutiveKPI } from "@/components/executive-kpi";
import { getTranslations } from "next-intl/server";
import { Separator } from "@/components/ui/separator";
import { definePage } from "@/lib/define-page";

const PATH = "/about";
const NS = "AboutPage";

const page = definePage({
  ns: NS,
  path: "/about",
  type: NS,
});
export const generateMetadata = page.generateMetadata;

export default async function About() {
  const t = await getTranslations(NS);

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
    quote: string;
    stats: { value: string; label: string }[];
    specialties: string[];
    credentials: string[];
    background: string[];
  }>;

  const partners = t.raw("partners") as Array<{
    name: string;
    logo: string;
  }>;

  const caseStudies = t.raw("caseStudies") as Array<{
    company: string;
    industry: string;
    result: string;
    quote: string;
    logo?: string;
    metric?: string;
  }>;

  return (
    <>
      <page.PageJsonLd />

      <main className="flex-1 gap-20 lg:gap-12">
        <MotionSection
          tone="muted"
          className="flex flex-col items-center gap-4 text-center sm:py-24"
        >
          <SectionHeader
            eyebrow={t("badge")}
            title={t("heroTitle")}
            className="mb-0"
          />
          <CardDescription className="max-w-2xl text-base leading-relaxed">
            {t("heroDescription")}
          </CardDescription>
        </MotionSection>

        <Separator />

        <ExecutiveKPI />

        <Separator />

        <MotionSection
          tone="muted"
          className="grid items-center gap-10 md:grid-cols-2"
        >
          <div className="flex flex-col gap-4">
            <SectionHeader
              eyebrow={t("missionBadge")}
              title={t("missionTitle")}
              align="left"
              className="mb-0"
            />

            <CardDescription className="text-base leading-relaxed">
              {t("missionDescription")}
            </CardDescription>
          </div>
          <ul className="flex flex-col gap-4">
            {highlights.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <CardDescription className="text-sm">{text}</CardDescription>
              </li>
            ))}
          </ul>
        </MotionSection>

        <Separator />

        <MotionSection>
          <SectionHeader eyebrow={t("valuesBadge")} title={t("valuesTitle")} />
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {values.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="transition-shadow hover:shadow-sm">
                <CardHeader className="gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base font-medium">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </MotionSection>

        <Separator />

        <MotionSection tone="muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <SectionHeader eyebrow={t("teamBadge")} title={t("teamTitle")} />
            <div className="grid gap-8">
              {team.map((m) => (
                <Card
                  key={m.name}
                  className="gap-0 overflow-hidden border border-border/60 bg-background py-0 shadow-sm transition-shadow hover:shadow-md md:grid md:grid-cols-[300px_1fr] lg:grid-cols-[380px_1fr]"
                >
                  {/* Photo */}
                  <div className="relative h-80 bg-muted md:h-full md:min-h-[480px]">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 300px, 100vw"
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-6 p-6 sm:p-8">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">
                        {m.name}
                      </h3>
                      <p className="text-sm font-medium text-royal-blue">
                        {m.title}
                      </p>
                    </div>

                    {/* Proof numbers */}
                    <div className="grid grid-cols-3 gap-4 border-y border-border py-4">
                      {m.stats.map(({ value, label }) => (
                        <div key={label}>
                          <div className="text-2xl font-semibold text-primary sm:text-3xl">
                            {value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {m.summary}
                    </p>

                    <blockquote className="flex gap-3 rounded-lg bg-muted/50 p-4">
                      <Quote className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <p className="text-sm italic leading-relaxed">
                        {m.quote}
                      </p>
                    </blockquote>

                    {/* Credentials + Background */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em]">
                          <BadgeCheck className="h-4 w-4 text-primary" />
                          {t("team.credentialsLabel")}
                        </p>
                        <ul className="space-y-1.5">
                          {m.credentials.map((c) => (
                            <li
                              key={c}
                              className="text-xs leading-snug text-muted-foreground"
                            >
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em]">
                          <Briefcase className="h-4 w-4 text-primary" />
                          {t("team.experienceLabel")}
                        </p>
                        <ul className="space-y-1.5">
                          {m.background.map((b) => (
                            <li
                              key={b}
                              className="text-xs leading-snug text-muted-foreground"
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mt-auto flex flex-wrap gap-2">
                      {m.specialties.map((s) => (
                        <Badge
                          key={s}
                          variant="secondary"
                          className="text-[10px] uppercase tracking-[0.1em]"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </MotionSection>

        <Separator />

        <MotionSection>
          <SectionHeader
            eyebrow={t("partnersBadge")}
            title={t("partnersTitle")}
          />
          <div className="group/partners grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map(({ name, logo }) => (
              <div
                key={name}
                className="relative flex h-20 items-center justify-center rounded-xl bg-white p-4 shadow-sm
           transition-all duration-300 ease-out
           hover:scale-105 hover:shadow-md
           group-hover/partners:[&:not(:hover)]:grayscale
           group-hover/partners:[&:not(:hover)]:opacity-60"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={logo}
                    alt={name}
                    fill
                    sizes="(min-width: 1024px) 150px, (min-width: 640px) 30vw, 45vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </MotionSection>

        <Separator />

        <MotionSection tone="muted">
          <SectionHeader
            eyebrow={t("caseStudiesBadge")}
            title={t("caseStudiesTitle")}
          />

          <div className="group/cases grid gap-6 md:grid-cols-3">
            {caseStudies.map((study) => (
              <Card
                key={study.company}
                className="
                case-card flex h-full flex-col gap-0 overflow-hidden py-0
                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/40 hover:shadow-lg
                group-has-[.case-card:hover]/cases:[&:not(:hover)]:scale-[0.98]
                group-has-[.case-card:hover]/cases:[&:not(:hover)]:opacity-50
                group-has-[.case-card:hover]/cases:[&:not(:hover)]:blur-[1px]
                motion-reduce:transform-none motion-reduce:transition-none
              "
              >
                <CardHeader className="gap-3 px-6 pt-6 pb-4">
                  <Badge variant="secondary" className="w-fit">
                    {study.industry}
                  </Badge>

                  {study.metric && (
                    <div className="text-4xl font-semibold tracking-tight text-primary">
                      {study.metric}
                    </div>
                  )}

                  <CardTitle className="text-lg font-semibold leading-snug">
                    {study.result}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-5 px-6 pb-6">
                  <blockquote className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                    “{study.quote}”
                  </blockquote>

                  <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
                    {study.logo ? (
                      <div className="relative h-9 w-9 shrink-0">
                        <Image
                          src={study.logo}
                          alt=""
                          fill
                          sizes="36px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <span
                      title={study.company}
                      className="line-clamp-2 text-sm font-medium leading-snug"
                    >
                      {study.company}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </MotionSection>

        <Separator />

        <MotionSection className="sm:py-20 flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {t("ctaTitle")}
          </h2>
          <CardDescription className="max-w-xl text-base">
            {t("ctaDescription")}
          </CardDescription>
          <Button asChild size="lg">
            <Link href="/contact">{t("ctaButton")}</Link>
          </Button>
        </MotionSection>
      </main>
    </>
  );
}
