import { getLocale, getTranslations } from "next-intl/server";
import { ServiceDetailTemplate } from "@/components/services/service-detail-template";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations("ServicePages.householdBusiness");
  const title = `${t("title")} | TAF Việt`;
  const description = `${t("description")} TAF Việt hỗ trợ hộ kinh doanh và người bán online ổn định sổ sách, doanh thu và nghĩa vụ thuế theo thực tế hoạt động.`;

  return {
    title,
    description,
    alternates: {
      canonical: "/services/household-business",
    },
    openGraph: {
      title,
      description,
      url: "https://taf.asia/services/household-business",
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
      "hộ kinh doanh",
      "người bán online",
      "kế toán hộ kinh doanh",
      "thuế hộ kinh doanh",
      "TAF Việt",
    ],
  };
}

export default async function HouseholdBusinessPage() {
  return (
    <ServiceDetailTemplate
      namespace="householdBusiness"
      categoryId="householdBusiness"
    />
  );
}
