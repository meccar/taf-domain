import { getLocale, getTranslations } from "next-intl/server";
import { ServiceDetailTemplate } from "@/components/services/service-detail-template";

export async function generateMetadata() {
  const locale = await getLocale();
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
      locale: locale === "en" ? "en_US" : "vi_VN",
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
  return <ServiceDetailTemplate namespace="personal" categoryId="personal" />;
}
