import { getLocale, getTranslations } from "next-intl/server";
import { ServiceDetailTemplate } from "@/components/services/service-detail-template";

export async function generateMetadata() {
  const locale = await getLocale();
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
      locale: locale === "en" ? "en_US" : "vi_VN",
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
  return <ServiceDetailTemplate namespace="advisory" categoryId="advisory" />;
}
