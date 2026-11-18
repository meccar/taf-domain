import { getLocale, getTranslations } from "next-intl/server";
import { ServiceDetailTemplate } from "@/components/services/service-detail-template";

export async function generateMetadata() {
  const locale = await getLocale();
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
      locale: locale === "en" ? "en_US" : "vi_VN",
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
  return (
    <ServiceDetailTemplate
      namespace="taxPreparation"
      categoryId="taxPreparation"
    />
  );
}
