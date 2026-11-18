"use client";

import * as React from "react";
import { Hero } from "@/components/hero";
import { ServicesBlock } from "@/components/services-block";
import { WhyUsBlock } from "@/components/why-us-block";
import { CtaBlock } from "@/components/cta-block";

export default function Home() {
  const [navContactOpen, setNavContactOpen] = React.useState(false);

  return (
    <main className="flex-1">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 pb-20 pt-6 sm:px-8 lg:gap-24 lg:px-12 lg:pb-24">
        <Hero
          externalContactOpen={navContactOpen}
          onExternalContactClose={() => setNavContactOpen(false)}
        />
        <ServicesBlock />
        <WhyUsBlock />
        <CtaBlock />
      </div>
    </main>
  );
}
