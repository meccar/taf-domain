import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalaryCalculator } from "@/components/calculators/salary-calculator";
import { TaxCalculatorTabs } from "@/components/tax-calculator-tabs";

export async function generateMetadata() {
  const t = await getTranslations("CalculatorsPage");
  return {
    title: t("metadataTitle"),
    description: t("metadataDescription"),
  };
}

export default async function CalculatorsPage() {
  const t = await getTranslations("CalculatorsPage");

  return (
    <main className="w-full">
      <div className="bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center flex flex-col items-center gap-4">
          <Badge variant="outline" className="uppercase tracking-widest">
            {t("badge")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            {t("heroTitle")}
          </h1>
          <p className="max-w-xl text-base text-muted-foreground leading-relaxed">
            {t("heroDescription")}
          </p>
        </div>
      </div>

      <Separator />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("toolSelectorTitle")}</CardTitle>
            <CardDescription>{t("toolSelectorDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="salary" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="salary">{t("tabs.salary")}</TabsTrigger>
                <TabsTrigger value="vat">{t("tabs.vat")}</TabsTrigger>
              </TabsList>
              <TabsContent value="salary">
                <SalaryCalculator />
              </TabsContent>
              <TabsContent value="vat">
                <TaxCalculatorTabs />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
