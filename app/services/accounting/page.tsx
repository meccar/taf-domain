import {
  BookOpen,
  FileBarChart,
  Wallet,
  Landmark,
  ClipboardCheck,
  RefreshCw,
} from "lucide-react";
import { ServicePageLayout } from "@/components/service-page-layout";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
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
      locale: "vi_VN",
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
  const included = t.raw("included") as Array<{
    title: string;
    description: string;
  }>;
  const steps = t.raw("steps") as Array<{
    title: string;
    description: string;
  }>;
  const plans = t.raw("plans") as Array<{
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    highlighted?: boolean;
  }>;
  const faqs = t.raw("faqs") as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <ServicePageLayout
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      included={included.map((item, index) => ({
        ...item,
        icon: [
          BookOpen,
          FileBarChart,
          Wallet,
          Landmark,
          ClipboardCheck,
          RefreshCw,
        ][index],
      }))}
      steps={steps}
      plans={plans}
      faqs={faqs.map((item) => ({ q: item.question, a: item.answer }))}
      ctaTitle={t("ctaTitle")}
      ctaDescription={t("ctaDescription")}
      contactFormTitle={t("contactFormTitle")}
      source={t("source")}
    />
  );
}
