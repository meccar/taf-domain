"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { calculatePresumptiveTax, formatVND } from "@/lib/tax-utils";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface IncomeTypeConfig {
  value: string;
  label: string;
  vatRate: number;
  pitRate: number;
  description: string;
}

export function FreelancerTaxCalculator() {
  const t = useTranslations("FreelancerTaxCalculator");
  const incomeTypes: IncomeTypeConfig[] = [
    {
      value: "freelancer",
      label: t("incomeTypes.freelancer.label"),
      vatRate: 5,
      pitRate: 2,
      description: t("incomeTypes.freelancer.description"),
    },
    {
      value: "kol",
      label: t("incomeTypes.kol.label"),
      vatRate: 5,
      pitRate: 2,
      description: t("incomeTypes.kol.description"),
    },
    {
      value: "koc",
      label: t("incomeTypes.koc.label"),
      vatRate: 5,
      pitRate: 2,
      description: t("incomeTypes.koc.description"),
    },
    {
      value: "affiliate",
      label: t("incomeTypes.affiliate.label"),
      vatRate: 5,
      pitRate: 2,
      description: t("incomeTypes.affiliate.description"),
    },
  ];

  const [incomeType, setIncomeType] = useState<string>("freelancer");
  const [amount, setAmount] = useState("15000000");
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly");

  const selectedType = incomeTypes.find((item) => item.value === incomeType)!;

  const result = useMemo(() => {
    const value = Number(amount.replace(/[^\d]/g, "")) || 0;
    return calculatePresumptiveTax(
      value,
      period,
      selectedType.vatRate,
      selectedType.pitRate,
    );
  }, [amount, period, selectedType]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label>{t("incomeTypeLabel")}</Label>
          <Select value={incomeType} onValueChange={setIncomeType}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {incomeTypes.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground flex items-start gap-1.5 pt-1">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            {selectedType.description}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="freelancer-amount">{t("revenueLabel")}</Label>
          <Input
            id="freelancer-amount"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>{t("periodLabel")}</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant={period === "monthly" ? "default" : "outline"}
              onClick={() => setPeriod("monthly")}
            >
              {t("period.monthly")}
            </Button>
            <Button
              type="button"
              size="sm"
              variant={period === "annual" ? "default" : "outline"}
              onClick={() => setPeriod("annual")}
            >
              {t("period.annual")}
            </Button>
          </div>
        </div>

        <div className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground leading-relaxed">
          {t("info")}
        </div>
      </div>

      <div className="rounded-lg border bg-muted/30 p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-1">
          <span className="text-sm text-muted-foreground">
            {t("status.label")}
          </span>
          <Badge variant={result.isExempt ? "secondary" : "default"}>
            {result.isExempt ? t("status.exempt") : t("status.taxable")}
          </Badge>
        </div>

        <Separator />

        <Row
          label={t("rows.annualRevenue")}
          value={formatVND(result.annualRevenue)}
        />
        <Row
          label={t("rows.vat", { rate: result.vatRate })}
          value={result.isExempt ? "—" : formatVND(result.vatAmount)}
        />
        <Row
          label={t("rows.pit", { rate: result.pitRate })}
          value={result.isExempt ? "—" : formatVND(result.pitAmount)}
        />
        <Separator className="my-1" />
        <Row label={t("rows.totalTax")} value={formatVND(result.totalTax)} />
        <Row
          label={t("rows.netIncome")}
          value={formatVND(result.netIncome)}
          highlight
        />
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={cn(
          "text-sm",
          highlight ? "font-medium" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "text-sm tabular-nums",
          highlight && "text-lg font-semibold",
        )}
      >
        {value}
      </span>
    </div>
  );
}
