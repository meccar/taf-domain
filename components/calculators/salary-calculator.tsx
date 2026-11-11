"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { grossToNet, netToGross, formatVND } from "@/lib/tax-utils";
import { cn } from "@/lib/utils";

export function SalaryCalculator() {
  const t = useTranslations("SalaryCalculator");
  const [direction, setDirection] = useState<"gross-to-net" | "net-to-gross">(
    "gross-to-net",
  );
  const [amount, setAmount] = useState("30000000");
  const [dependents, setDependents] = useState("0");

  const result = useMemo(() => {
    const value = Number(amount.replace(/[^\d]/g, "")) || 0;
    const dep = Math.max(0, Number(dependents) || 0);
    if (direction === "gross-to-net") {
      const r = grossToNet(value, dep);
      return { gross: value, ...r };
    }
    const r = netToGross(value, dep);
    return r;
  }, [amount, dependents, direction]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <Button
            type="button"
            variant={direction === "gross-to-net" ? "default" : "outline"}
            size="sm"
            onClick={() => setDirection("gross-to-net")}
          >
            {t("direction.grossToNet")}
          </Button>
          <Button
            type="button"
            variant={direction === "net-to-gross" ? "default" : "outline"}
            size="sm"
            onClick={() => setDirection("net-to-gross")}
          >
            {t("direction.netToGross")}
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="amount">
            {direction === "gross-to-net" ? t("grossSalary") : t("netDesired")}
          </Label>
          <Input
            id="amount"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="30000000"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="dependents">{t("dependents")}</Label>
          <Input
            id="dependents"
            type="number"
            min={0}
            value={dependents}
            onChange={(e) => setDependents(e.target.value)}
          />
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {t("note")}
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 p-6 flex flex-col gap-3">
        <Row label={t("rows.gross")} value={formatVND(result.gross)} />
        <Row
          label={t("rows.insurance")}
          value={`- ${formatVND(result.insurance)}`}
        />
        <Row
          label={t("rows.taxableIncome")}
          value={formatVND(result.taxableIncome)}
        />
        <Row label={t("rows.tax")} value={`- ${formatVND(result.tax)}`} />
        <Separator className="my-1" />
        <Row label={t("rows.net")} value={formatVND(result.net)} highlight />
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
