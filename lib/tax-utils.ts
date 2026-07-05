export function formatVND(value: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

// 2026 monthly PIT brackets for employment income (illustrative — verify against current law before publishing)
const PIT_BRACKETS = [
  { limit: 5_000_000, rate: 0.05 },
  { limit: 10_000_000, rate: 0.1 },
  { limit: 18_000_000, rate: 0.15 },
  { limit: 32_000_000, rate: 0.2 },
  { limit: 52_000_000, rate: 0.25 },
  { limit: 80_000_000, rate: 0.3 },
  { limit: Infinity, rate: 0.35 },
];

const SELF_DEDUCTION = 11_000_000;
const DEPENDENT_DEDUCTION = 4_400_000;
const INSURANCE_RATE = 0.105; // BHXH 8% + BHYT 1.5% + BHTN 1%, employee side (simplified, no regional cap applied)

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
