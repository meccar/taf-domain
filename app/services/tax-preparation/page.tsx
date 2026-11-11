import {
  Receipt,
  Calculator,
  Users,
  ShieldCheck,
  FileCheck,
  Clock,
} from "lucide-react";
import { ServicePageLayout } from "@/components/service-page-layout";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ServicePages.taxPreparation");
  const title = `${t("title")} | TAF Việt`;
  const description = `${t("description")} TAF Việt hỗ trợ kê khai thuế GTGT, TNDN, TNCN và đại diện làm việc với cơ quan thuế đúng hạn.`;

  return {
    title,
    description,
    alternates: {
      canonical: "/services/tax-preparation",
    },
    openGraph: {
      title,
      description,
      url: "https://taf.asia/services/tax-preparation",
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
      "dịch vụ thuế",
      "kê khai thuế",
      "quyết toán thuế",
      "TAF Việt",
      "đại lý thuế",
    ],
  };
}

export default async function TaxPreparationPage() {
  const t = await getTranslations("ServicePages.taxPreparation");
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
        icon: [Receipt, Calculator, Users, ShieldCheck, FileCheck, Clock][
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
