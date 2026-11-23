"use client";

import * as React from "react";
import { Hero } from "@/components/hero";
import { ServicesBlock } from "@/components/services-block";
import { WhyUsBlock } from "@/components/why-us-block";
import { CtaBlock } from "@/components/cta-block";
import { ProblemFinder } from "@/components/problem-finder";
import { ExecutiveKPI } from "@/components/executive-kpi";

export default function Home() {
  const [navContactOpen, setNavContactOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  return (
    <main className="flex-1">
      <Hero
        externalContactOpen={navContactOpen}
        onExternalContactClose={() => setNavContactOpen(false)}
      />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 pb-20 pt-20 sm:px-8 lg:gap-12 lg:px-12 lg:pb-24">
        {/* <ProblemFinder selectedId={selectedId} onSelect={setSelectedId} /> */}
        <ServicesBlock
          selectedId={selectedId}
          onClear={() => setSelectedId(null)}
        />
        <WhyUsBlock />
        <CtaBlock />
        <ExecutiveKPI />
      </div>
    </main>
  );
}
