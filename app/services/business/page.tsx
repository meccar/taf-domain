import { getLocale, getTranslations } from "next-intl/server";
import { ServiceDetailTemplate } from "@/components/services/service-detail-template";

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
  return <ServiceDetailTemplate namespace="business" categoryId="business" />;
}
