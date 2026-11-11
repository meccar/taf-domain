import {
  Users,
  Wallet,
  ShieldCheck,
  Landmark,
  FileSpreadsheet,
  BellRing,
} from "lucide-react";
import { ServicePageLayout } from "@/components/service-page-layout";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ServicePages.payroll");
  const title = `${t("title")} | TAF Việt`;
  const description = `${t("description")} TAF Việt tính lương, quản lý bảo hiểm và thuế TNCN chuẩn xác, đúng thời hạn cho doanh nghiệp Việt Nam.`;

  return {
    title,
    description,
    alternates: {
      canonical: "/services/payroll",
    },
    openGraph: {
      title,
      description,
      url: "https://taf.asia/services/payroll",
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
      "dịch vụ tính lương",
      "bảng lương doanh nghiệp",
      "bảo hiểm xã hội",
      "thuế TNCN",
      "TAF Việt",
    ],
  };
}

export default async function PayrollPage() {
  const t = await getTranslations("ServicePages.payroll");
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
        icon: [Wallet, ShieldCheck, Users, FileSpreadsheet, Landmark, BellRing][
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
