
import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { calculateVAT, formatVND } from "@/lib/tax-utils";
import { cn } from "@/lib/utils";

const rates = [0, 5, 8, 10];

export function VatCalculator() {
  const [amount, setAmount] = useState("10000000");
  const [rate, setRate] = useState(10);
  const [includesVAT, setIncludesVAT] = useState(false);

  const result = useMemo(() => {
    const value = Number(amount.replace(/[^\d]/g, "")) || 0;
    return calculateVAT(value, rate, includesVAT);
  }, [amount, rate, includesVAT]);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="vat-amount">Số tiền (VNĐ)</Label>
          <Input
            id="vat-amount"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Thuế suất GTGT</Label>
          <div className="flex gap-2 flex-wrap">
            {rates.map((r) => (
              <Button
                key={r}
                type="button"
                size="sm"
                variant={rate === r ? "default" : "outline"}
                onClick={() => setRate(r)}
              >
                {r}%
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Số tiền nhập ở trên</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant={!includesVAT ? "default" : "outline"}
              onClick={() => setIncludesVAT(false)}
            >
              Chưa gồm VAT
            </Button>
            <Button
              type="button"
              size="sm"
              variant={includesVAT ? "default" : "outline"}
              onClick={() => setIncludesVAT(true)}
            >
              Đã gồm VAT
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/30 p-6 flex flex-col gap-3">
        <Row label="Giá trước thuế" value={formatVND(result.preTax)} />
        <Row label={`Thuế GTGT (${rate}%)`} value={formatVND(result.vat)} />
        <Separator className="my-1" />
        <Row
          label="Tổng thanh toán"
          value={formatVND(result.total)}
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
