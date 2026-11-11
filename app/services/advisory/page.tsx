import {
  Lightbulb,
  TrendingUp,
  Building2,
  Scale,
  FileSearch,
  Target,
} from "lucide-react";
import { ServicePageLayout } from "@/components/service-page-layout";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ServicePages.advisory");
  const title = `${t("title")} | TAF Việt`;
  const description = `${t("description")} TAF Việt tư vấn chiến lược tài chính, thuế và doanh nghiệp để hỗ trợ quyết định dài hạn của ban lãnh đạo.`;

  return {
    title,
    description,
    alternates: {
      canonical: "/services/advisory",
    },
    openGraph: {
      title,
      description,
      url: "https://taf.asia/services/advisory",
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
      "tư vấn tài chính",
      "tư vấn thuế",
      "chiến lược doanh nghiệp",
      "TAF Việt",
      "cố vấn tài chính",
    ],
  };
}

export default async function AdvisoryPage() {
  const t = await getTranslations("ServicePages.advisory");
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
        icon: [Lightbulb, Building2, TrendingUp, Scale, FileSearch, Target][
          index
        ],
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
