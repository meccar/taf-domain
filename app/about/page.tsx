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
    summary: string;
    specialties: string[];
    credentials: string[];
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
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {team.map(({ name, title, summary, specialties, credentials }) => (
              <Card
                key={name}
                className="border border-border/60 bg-background shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader className="items-start pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                      {name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <CardTitle className="text-base font-medium text-left">
                        {name}
                      </CardTitle>
                      <CardDescription className="text-xs text-left">
                        {title}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-muted-foreground text-left">
                    {summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[10px] uppercase tracking-wide text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-1 border-t border-border pt-3">
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
              </Card>
            ))}
          </div>
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
