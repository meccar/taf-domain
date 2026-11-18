import {
  BookOpen,
  ClipboardCheck,
  RefreshCw,
  Briefcase,
  ShieldCheck,
  FileText,
  Clock3,
} from "lucide-react";
import {
  ServiceHeroSection,
  AudienceSection,
  SolutionsSection,
  ProcessSection,
  PricingSection,
  FAQSection,
  ContactCTASection,
} from "@/components/services";
import { ExchangeSection } from "@/components/services/exchange-section";
import { RelatedServices } from "@/components/services/related-services";
import { getTranslations } from "next-intl/server";
import { visibleItems } from "@/lib/draft-content";
import { ContactChannels } from "./contact-channels";
import { OnboardingSection } from "./onboarding-section";
import { TrustStrip } from "./trust-strip";

type TitleDesc = { title: string; description: string };

/**
 * One layout for all four service pages. Each page passes its messages
 * namespace (ServicePages.<namespace>) and its category id.
 *
 * Reading order = the questions a customer asks before reaching out:
 * Can I trust you? -> What will you do for me? -> Is it for me? ->
 * What happens after I contact you? -> How does it run? -> What does it
 * cost and what is covered? -> What do I prepare / receive? -> Doubts? ->
 * How do I reach you?
 */
export async function ServiceDetailTemplate({
  namespace,
  categoryId,
}: {
  namespace: string;
  categoryId: string;
}) {
  // Dynamic namespace: the cast keeps next-intl's typed messages happy.
  const t = await getTranslations(
    `ServicePages.${namespace}` as "ServicePages.accounting",
  );
  const layoutT = await getTranslations("ServicePageLayout");

  const steps = (t.raw("steps") as TitleDesc[]) ?? [];
  const onboarding = (t.raw("onboarding") as TitleDesc[] | undefined) ?? [];
  const plans =
    (t.raw("plans") as Array<{
      name: string;
      price: string;
      period?: string;
      description: string;
      features: string[];
      highlighted?: boolean;
    }>) ?? [];
  const faqs = visibleItems(
    (t.raw("faqs") as Array<{ question: string; answer: string }>) ?? [],
    (faq) => faq.answer,
  );
  const audiences = (t.raw("audiences") as TitleDesc[]) ?? [];
  const solutions =
    (t.raw("solutions") as Array<TitleDesc & { href: string }>) ?? [];
  const documents = (t.raw("documents") as string[]) ?? [];
  const deliverables = (t.raw("deliverables") as string[]) ?? [];

  const audienceIcons = [Briefcase, FileText, ShieldCheck, Clock3];
  const solutionIcons = [BookOpen, ClipboardCheck, RefreshCw];

  return (
    <main className="w-full">
      <ServiceHeroSection
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        primaryLabel={layoutT("freeConsultation")}
        primaryHref="/contact"
        secondaryLabel={layoutT("viewPricing")}
        secondaryHref="#pricing"
      />

      {/* What will you do for me? */}
      <SolutionsSection
        eyebrow={t("solutionsTitle")}
        title={t("solutionsTitle")}
        items={solutions.map((item, index) => ({
          ...item,
          icon: solutionIcons[index % solutionIcons.length],
        }))}
      />

      {/* Is it for me? */}
      <AudienceSection
        eyebrow={t("audiencesTitle")}
        title={t("audiencesTitle")}
        items={audiences.map((item, index) => ({
          ...item,
          icon: audienceIcons[index % audienceIcons.length],
        }))}
      />

      {/* What happens after I contact you? */}
      <OnboardingSection
        title={layoutT("onboardingTitle")}
        description={layoutT("onboardingDescription")}
        steps={onboarding}
      />

      {/* How does it run every period? */}
      <ProcessSection
        eyebrow={layoutT("process")}
        title={layoutT("processTitle", { count: steps.length })}
        steps={steps}
      />

      {/* What does it cost, and what is covered? */}
      <PricingSection
        eyebrow={layoutT("pricing")}
        title={layoutT("pricingTitle")}
        plans={plans}
        primaryLabel={layoutT("contactButton")}
      />

      {/* What do I prepare / what do I get? */}
      <ExchangeSection
        provideTitle={t("documentsTitle")}
        provideItems={documents}
        receiveTitle={t("deliverablesTitle")}
        receiveItems={deliverables}
      />

      {/* Remaining doubts */}
      <FAQSection
        eyebrow={layoutT("faq")}
        title={layoutT("faqTitle")}
        items={faqs}
      />

      {/* How do I reach you? */}
      <ContactChannels />
      <ContactCTASection
        title={t("ctaTitle")}
        description={t("ctaDescription")}
        source={t("source")}
        contactFormTitle={t("contactFormTitle")}
        primaryLabel={layoutT("contactButton")}
      />
    </main>
  );
}
