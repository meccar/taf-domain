import {
  UserRound,
  BriefcaseBusiness,
  Calculator,
  BadgeCheck,
  Wallet,
  ShieldCheck,
} from "lucide-react";
import { ServiceLanePage } from "@/components/service-lane-page";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("ServicePages.personal");
  const title = `${t("title")} | TAF Việt`;
  const description = `${t("description")} TAF Việt hỗ trợ cá nhân, hộ kinh doanh và freelancer kiểm soát thuế, hồ sơ và kế toán với quy trình rõ ràng và đáng tin cậy.`;

  return {
    title,
    description,
    alternates: {
      canonical: "/services/personal",
    },
    openGraph: {
      title,
      description,
      url: "https://taf.asia/services/personal",
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
      "dịch vụ cá nhân",
      "hộ kinh doanh",
      "freelancer",
      "thuế cá nhân",
      "TAF Việt",
    ],
  };
}

export default async function PersonalPage() {
  const t = await getTranslations("ServicePages.personal");
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
          UserRound,
          BriefcaseBusiness,
          Calculator,
          BadgeCheck,
          Wallet,
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
