"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FreelancerTaxCalculator } from "@/components/freelancer-tax-calculator";
import { VatCalculator } from "./calculators/vat-calculator";

export function TaxCalculatorTabs() {
  return (
    <Tabs defaultValue="vat" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-grid">
        <TabsTrigger value="vat">Thuế GTGT thông thường</TabsTrigger>
        <TabsTrigger value="freelancer">
          Freelancer / KOL / KOC / Affiliate
        </TabsTrigger>
      </TabsList>

      <TabsContent value="vat" className="pt-6">
        <VatCalculator />
      </TabsContent>

      <TabsContent value="freelancer" className="pt-6">
        <FreelancerTaxCalculator />
      </TabsContent>
    </Tabs>
  );
}
