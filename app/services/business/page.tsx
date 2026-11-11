import {
  Scale,
  Building2,
  FileCheck,
  Landmark,
  BriefcaseBusiness,
  ShieldCheck,
  CircleDollarSign,
  Users,
  BadgeCheck,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import {
  ServiceHeroSection,
  AudienceSection,
  ProblemsSection,
  SolutionsSection,
  ProcessSection,
  PricingSection,
  ChecklistSection,
  DeliverablesSection,
  FAQSection,
  ContactCTASection,
} from "@/components/services";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations("ServicePages.business");
  const title = `${t("title")} | TAF Việt`;
  const description = `${t("description")} TAF Việt hỗ trợ doanh nghiệp rà soát tuân thủ, tối ưu tài chính và xây dựng phương án pháp lý an toàn, phù hợp với quy định hiện hành.`;

  return {
    title,
    description,
    alternates: {
      canonical: "/services/business",
    },
    openGraph: {
      title,
      description,
      url: "https://taf.asia/services/business",
      siteName: "TAF Việt",
      locale: locale === "en" ? "en_US" : "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    keywords: [
      "pháp lý doanh nghiệp",
      "tuân thủ thuế",
      "tư vấn tài chính",
      "rủi ro pháp lý",
      "TAF Việt",
    ],
  };
}

export default async function BusinessPage() {
  const t = await getTranslations("ServicePages.business");
  const layoutT = await getTranslations("ServicePageLayout");
  const audiences =
    (t.raw("audiences") as Array<{ title: string; description: string }>) ?? [];
  const problems =
    (t.raw("problems") as Array<{ title: string; description: string }>) ?? [];
  const solutions =
    (t.raw("solutions") as Array<{
      title: string;
      description: string;
      href: string;
    }>) ?? [];
  const steps =
    (t.raw("steps") as Array<{ title: string; description: string }>) ?? [];
  const plans =
    (t.raw("plans") as Array<{
      name: string;
      price: string;
      period?: string;
      description: string;
      features: string[];
      highlighted?: boolean;
    }>) ?? [];
  const documents = (t.raw("documents") as string[]) ?? [];
  const deliverables = (t.raw("deliverables") as string[]) ?? [];
  const faqs =
    (t.raw("faqs") as Array<{ question: string; answer: string }>) ?? [];

  const audienceIcons = [BriefcaseBusiness, Building2, Users, Scale];
  const problemIcons = [CircleDollarSign, FileCheck, BadgeCheck, Landmark];
  const solutionIcons = [
    Briefcase,
    TrendingUp,
    ShieldCheck,
    Landmark,
    Scale,
    BriefcaseBusiness,
  ];

  return (
    <main className="w-full">
      <ServiceHeroSection
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        primaryLabel={layoutT("freeConsultation")}
        secondaryLabel={layoutT("viewPricing")}
        secondaryHref="#pricing"
      />
      <AudienceSection
        eyebrow={t("audiencesTitle")}
        title={t("audiencesTitle")}
        items={audiences.map((item, index) => ({
          ...item,
          icon: audienceIcons[index % audienceIcons.length],
        }))}
      />
      <ProblemsSection
        eyebrow={t("problemsTitle")}
        title={t("problemsTitle")}
        items={problems.map((item, index) => ({
          ...item,
          icon: problemIcons[index % problemIcons.length],
        }))}
      />
      <SolutionsSection
        eyebrow={t("solutionsTitle")}
        title={t("solutionsTitle")}
        items={solutions.map((item, index) => ({
          ...item,
          icon: solutionIcons[index % solutionIcons.length],
        }))}
      />
      <ProcessSection
        eyebrow={layoutT("process")}
        title={layoutT("processTitle", { count: steps.length })}
        steps={steps}
      />
      <PricingSection
        eyebrow={layoutT("pricing")}
        title={layoutT("pricingTitle")}
        plans={plans}
        primaryLabel={layoutT("contactButton")}
      />
      <ChecklistSection
        eyebrow={t("documentsTitle")}
        title={t("documentsTitle")}
        items={documents}
      />
      <DeliverablesSection
        eyebrow={t("deliverablesTitle")}
        title={t("deliverablesTitle")}
        items={deliverables}
      />
      <FAQSection
        eyebrow={layoutT("faq")}
        title={layoutT("faqTitle")}
        items={faqs}
      />
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
