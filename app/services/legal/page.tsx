import {
  Scale,
  Building2,
  FileCheck,
  Landmark,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";
import { ServiceLanePage } from "@/components/service-lane-page";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ServicePages.legal");
  const title = `${t("title")} | TAF Việt`;
  const description = `${t("description")} TAF Việt hỗ trợ doanh nghiệp rà soát tuân thủ, tối ưu tài chính và xây dựng phương án pháp lý an toàn, phù hợp với quy định hiện hành.`;

  return {
    title,
    description,
    alternates: {
      canonical: "/services/legal",
    },
    openGraph: {
      title,
      description,
      url: "https://taf.asia/services/legal",
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
      "pháp lý doanh nghiệp",
      "tuân thủ thuế",
      "tư vấn tài chính",
      "rủi ro pháp lý",
      "TAF Việt",
    ],
  };
}

export default async function LegalPage() {
  const t = await getTranslations("ServicePages.legal");
  const valuePoints = t.raw("valuePoints") as Array<{
    title: string;
    description: string;
  }>;
  const steps = t.raw("steps") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <ServiceLanePage
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("description")}
      valuePoints={valuePoints.map((item, index) => ({
        ...item,
        icon: [
          Scale,
          Building2,
          FileCheck,
          Landmark,
          BriefcaseBusiness,
          ShieldCheck,
        ][index],
      }))}
      steps={steps}
      ctaTitle={t("ctaTitle")}
      ctaDescription={t("ctaDescription")}
      contactFormTitle={t("contactFormTitle")}
      source={t("source")}
    />
  );
}
