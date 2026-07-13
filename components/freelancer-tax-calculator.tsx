"use client";

import { useMemo, useState } from "react";
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

const incomeTypes: IncomeTypeConfig[] = [
  {
    value: "freelancer",
    label: "Freelancer (dịch vụ tự do)",
    vatRate: 5,
    pitRate: 2,
    description: "Thiết kế, viết lách, lập trình, tư vấn độc lập...",
  },
  {
    value: "kol",
    label: "KOL (Người ảnh hưởng)",
    vatRate: 5,
    pitRate: 2,
    description: "Thu nhập từ quảng cáo, hợp tác thương hiệu có hợp đồng",
  },
  {
    value: "koc",
    label: "KOC (Người tiêu dùng chủ chốt)",
    vatRate: 5,
    pitRate: 2,
    description: "Thu nhập từ review, giới thiệu sản phẩm",
  },
  {
    value: "affiliate",
    label: "Affiliate Shopee / TikTok Shop",
    vatRate: 5,
    pitRate: 2,
    description:
      "Hoa hồng từ tiếp thị liên kết (affiliate marketing). Lưu ý: nếu bạn hoạt động như đại lý bán hàng đúng giá hưởng hoa hồng (không phải tiếp thị nội dung), mức thuế có thể là 1% GTGT / 0,5% TNCN thay vì 5%/2% — vui lòng xác nhận với cơ quan thuế nếu không chắc chắn.",
  },
];

export function FreelancerTaxCalculator() {
  const [incomeType, setIncomeType] = useState<string>("freelancer");
  const [amount, setAmount] = useState("15000000");
  const [period, setPeriod] = useState<"monthly" | "annual">("monthly");

  const selectedType = incomeTypes.find((t) => t.value === incomeType)!;

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
          <Label>Loại thu nhập</Label>
          <Select value={incomeType} onValueChange={setIncomeType}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {incomeTypes.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
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
          <Label htmlFor="freelancer-amount">Doanh thu</Label>
          <Input
            id="freelancer-amount"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Chu kỳ doanh thu</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant={period === "monthly" ? "default" : "outline"}
              onClick={() => setPeriod("monthly")}
            >
              Theo tháng
            </Button>
            <Button
              type="button"
              size="sm"
              variant={period === "annual" ? "default" : "outline"}
              onClick={() => setPeriod("annual")}
            >
              Theo năm
            </Button>
          </div>
        </div>

        <div className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground leading-relaxed">
          Cá nhân kinh doanh và freelancer có tổng doanh thu từ 1 tỷ VNĐ/năm trở
          xuống được miễn toàn bộ thuế GTGT và thuế TNCN. Nếu doanh thu vượt 1
          tỷ VNĐ/năm, mức thuế áp dụng là cố định theo tỷ lệ % trên doanh thu và
          phải đăng ký sử dụng hóa đơn điện tử theo Nghị định 141/2026/NĐ-CP.
        </div>
      </div>

      <div className="rounded-lg border bg-muted/30 p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between pb-1">
          <span className="text-sm text-muted-foreground">Trạng thái</span>
          <Badge variant={result.isExempt ? "secondary" : "default"}>
            {result.isExempt ? "Miễn thuế" : "Phải nộp thuế"}
          </Badge>
        </div>

        <Separator />

        <Row
          label="Doanh thu quy đổi theo năm"
          value={formatVND(result.annualRevenue)}
        />
        <Row
          label={`Thuế GTGT (${result.vatRate}%)`}
          value={result.isExempt ? "—" : formatVND(result.vatAmount)}
        />
        <Row
          label={`Thuế TNCN (${result.pitRate}%)`}
          value={result.isExempt ? "—" : formatVND(result.pitAmount)}
        />
        <Separator className="my-1" />
        <Row label="Tổng thuế phải nộp" value={formatVND(result.totalTax)} />
        <Row
          label="Thu nhập thực nhận"
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
