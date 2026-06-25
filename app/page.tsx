import { Hero } from "@/components/hero";
import { ServicesBlock } from "@/components/services-block";
import { WhyUsBlock } from "@/components/why-us-block";
import { CtaBlock } from "@/components/cta-block";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 max-w-5xl w-full mx-auto px-5 flex flex-col gap-16 py-10">
        <Hero />
        <ServicesBlock />
        <WhyUsBlock />
        <CtaBlock />
      </div>
      <Footer />
    </main>
  );
}
