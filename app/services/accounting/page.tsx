import { ServiceDetailTemplate } from "@/components/services/service-detail-template";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations("ServicePages.accounting");
  const title = `${t("title")} | TAF Việt`;
  const description = `${t("description")} TAF Việt cung cấp dịch vụ kế toán doanh nghiệp, báo cáo tài chính và hỗ trợ thuế cho doanh nghiệp tại Việt Nam.`;

  return {
    title,
    description,
    alternates: {
      canonical: "/services/accounting",
    },
    openGraph: {
      title,
      description,
      url: "https://taf.asia/services/accounting",
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
      "dịch vụ kế toán",
      "kế toán doanh nghiệp",
      "báo cáo tài chính",
      "TAF Việt",
      "công ty kế toán",
    ],
  };
}

export default function AccountingPage() {
  return (
    <ServiceDetailTemplate namespace="accounting" categoryId="accounting" />
  );
}
