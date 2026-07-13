export function formatVND(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

// 2026 monthly PIT brackets for employment income (illustrative — verify against current law before publishing)
const PIT_BRACKETS = [
  { limit: 10_000_000, rate: 0.05 },
  { limit: 30_000_000, rate: 0.1 },
  { limit: 60_000_000, rate: 0.2 },
  { limit: 10_000_0000, rate: 0.3 },
  { limit: Infinity, rate: 0.35 },
];

const SELF_DEDUCTION = 15_500_000;
const DEPENDENT_DEDUCTION = 6_200_000;
const INSURANCE_RATE = 0.105;

export function progressiveTax(taxableIncome: number) {
  let tax = 0;
  let prevLimit = 0;
  for (const bracket of PIT_BRACKETS) {
    if (taxableIncome <= prevLimit) break;
    const amountInBracket = Math.min(taxableIncome, bracket.limit) - prevLimit;
    tax += amountInBracket * bracket.rate;
    prevLimit = bracket.limit;
  }
  return tax;
}

export function grossToNet(gross: number, dependents: number) {
  const insurance = gross * INSURANCE_RATE;
  const taxableIncome = Math.max(
    0,
    gross - insurance - SELF_DEDUCTION - dependents * DEPENDENT_DEDUCTION,
  );
  const tax = progressiveTax(taxableIncome);
  const net = gross - insurance - tax;
  return { insurance, taxableIncome, tax, net };
}

// Net -> Gross has no closed form (tax depends on gross), so solve by binary search.
export function netToGross(targetNet: number, dependents: number) {
  let low = targetNet;
  let high = targetNet * 2 + 50_000_000;
  for (let i = 0; i < 60; i++) {
    const mid = (low + high) / 2;
    const { net } = grossToNet(mid, dependents);
    if (net > targetNet) high = mid;
    else low = mid;
  }
  const gross = (low + high) / 2;
  return { gross, ...grossToNet(gross, dependents) };
}

export function calculateVAT(
  amount: number,
  ratePercent: number,
  amountIncludesVAT: boolean,
) {
  const rate = ratePercent / 100;
  if (amountIncludesVAT) {
    const preTax = amount / (1 + rate);
    return { preTax, vat: amount - preTax, total: amount };
  }
  const vat = amount * rate;
  return { preTax: amount, vat, total: amount + vat };
}

export interface PresumptiveTaxResult {
  annualRevenue: number;
  isExempt: boolean;
  vatRate: number;
  pitRate: number;
  vatAmount: number;
  pitAmount: number;
  totalTax: number;
  netIncome: number;
}

const ANNUAL_EXEMPTION_THRESHOLD = 1_000_000_000;

export function calculatePresumptiveTax(
  revenue: number,
  period: "monthly" | "annual",
  vatRate: number,
  pitRate: number,
): PresumptiveTaxResult {
  const annualRevenue = period === "monthly" ? revenue * 12 : revenue;
  const isExempt = annualRevenue <= ANNUAL_EXEMPTION_THRESHOLD;

  const vatAmount = isExempt ? 0 : Math.round(revenue * (vatRate / 100));
  const pitAmount = isExempt ? 0 : Math.round(revenue * (pitRate / 100));
  const totalTax = vatAmount + pitAmount;

  return {
    annualRevenue,
    isExempt,
    vatRate,
    pitRate,
    vatAmount,
    pitAmount,
    totalTax,
    netIncome: revenue - totalTax,
  };
}
