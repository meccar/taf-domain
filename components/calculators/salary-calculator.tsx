"use client";

import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { grossToNet, netToGross, formatVND } from "@/lib/tax-utils";
import { cn } from "@/lib/utils";

export function SalaryCalculator() {
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
            Gross → Net
          </Button>
          <Button
            type="button"
            variant={direction === "net-to-gross" ? "default" : "outline"}
            size="sm"
            onClick={() => setDirection("net-to-gross")}
          >
            Net → Gross
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="amount">
            {direction === "gross-to-net"
              ? "Lương Gross (VNĐ / tháng)"
              : "Lương Net mong muốn (VNĐ / tháng)"}
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
          <Label htmlFor="dependents">Số người phụ thuộc</Label>
          <Input
            id="dependents"
            type="number"
            min={0}
            value={dependents}
            onChange={(e) => setDependents(e.target.value)}
          />
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Kết quả chỉ mang tính tham khảo, tính theo mức giảm trừ gia cảnh và
          biểu thuế lũy tiến hiện hành, chưa áp trần đóng bảo hiểm theo vùng.
          Liên hệ TAF Việt để được tính chính xác theo trường hợp cụ thể.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 p-6 flex flex-col gap-3">
        <Row label="Lương Gross" value={formatVND(result.gross)} />
        <Row
          label="Bảo hiểm (10.5%)"
          value={`- ${formatVND(result.insurance)}`}
        />
        <Row
          label="Thu nhập chịu thuế"
          value={formatVND(result.taxableIncome)}
        />
        <Row label="Thuế TNCN" value={`- ${formatVND(result.tax)}`} />
        <Separator className="my-1" />
        <Row label="Lương Net" value={formatVND(result.net)} highlight />
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
