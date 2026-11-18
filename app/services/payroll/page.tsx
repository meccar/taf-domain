import { getLocale, getTranslations } from "next-intl/server";
import { ServiceDetailTemplate } from "@/components/services/service-detail-template";

export async function generateMetadata() {
  const locale = await getLocale();
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
      locale: locale === "en" ? "en_US" : "vi_VN",
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
  return <ServiceDetailTemplate namespace="payroll" categoryId="payroll" />;
}
