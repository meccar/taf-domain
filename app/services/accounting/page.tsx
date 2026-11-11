import {
  BookOpen,
  FileBarChart,
  Wallet,
  Landmark,
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
  const t = await getTranslations("ServicePages.accounting");
  const title = `${t("title")} | TAF Việt`;
  const description = `${t("description")} TAF Việt cung cấp dịch vụ kế toán doanh nghiệp, báo cáo tài chính và hỗ trợ thuế cho doanh nghiệp tại Việt Nam.`;

  return {
    title,
    description,
    alternates: {
      canonical: "/services/accounting",
    },
    openGraph: {
      title,
      description,
      url: "https://taf.asia/services/accounting",
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
      "dịch vụ kế toán",
      "kế toán doanh nghiệp",
      "báo cáo tài chính",
      "TAF Việt",
      "công ty kế toán",
    ],
  };
}

export default async function AccountingPage() {
  const t = await getTranslations("ServicePages.accounting");
  const layoutT = await getTranslations("ServicePageLayout");
  const included =
    (t.raw("included") as Array<{ title: string; description: string }>) ?? [];
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
  const faqs =
    (t.raw("faqs") as Array<{ question: string; answer: string }>) ?? [];
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
  const documents = (t.raw("documents") as string[]) ?? [];
  const deliverables = (t.raw("deliverables") as string[]) ?? [];

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
      <AudienceSection
        eyebrow={t("audiencesTitle")}
        title={t("audiencesTitle")}
        items={audiences.map((item, index) => ({
          ...item,
          icon: [Briefcase, FileText, ShieldCheck, Clock3][index % 4],
        }))}
      />
      <ProblemsSection
        eyebrow={t("problemsTitle")}
        title={t("problemsTitle")}
        items={problems.map((item, index) => ({
          ...item,
          icon: [BookOpen, FileBarChart, Wallet, Landmark][index % 4],
        }))}
      />
      <SolutionsSection
        eyebrow={t("solutionsTitle")}
        title={t("solutionsTitle")}
        items={solutions.map((item, index) => ({
          ...item,
          icon: [BookOpen, ClipboardCheck, RefreshCw][index % 3],
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
