import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { Geist } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ClientLayout from "./client-layout";
import NextThemeProvider from "@/components/theme-provider";
import { Loading } from "@/components/ui/loading";
import { IntlProvider } from "./intl-provider";
import { getLocale, getTranslations } from "next-intl/server";

const defaultUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://taf.asia");

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Metadata");

  return {
    metadataBase: new URL(defaultUrl),
    title: {
      default: t("defaultTitle"),
      template: t("titleTemplate"),
    },
    description: t("defaultDescription"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      url: defaultUrl,
      siteName: t("siteName"),
      locale: locale === "en" ? "en_US" : "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    },
    icons: {
      icon: [{ url: "/favicon.ico" }],
      shortcut: "/favicon.ico",
    },
  };
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const t = await getTranslations("Metadata");
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <NextThemeProvider>
          <Suspense fallback={<Loading />}>
            <IntlProvider>
              <ClientLayout>{children}</ClientLayout>
            </IntlProvider>
          </Suspense>
          <SpeedInsights />
        </NextThemeProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "CÔNG TY TNHH ĐẠI LÝ THUẾ TAF VIỆT",
                  legalName: "CÔNG TY TNHH ĐẠI LÝ THUẾ TAF VIỆT",
                  alternateName: ["TAF Việt", "TAF Tax Agent"],
                  url: defaultUrl,
                  email: "admin@taf.asia",
                  telephone: "+84 936 378 955",
                  taxID: "0105367171",
                  vatID: "0105367171",
                  description:
                    "TAF Việt cung cấp dịch vụ kế toán, kê khai thuế, tư vấn tài chính và hỗ trợ doanh nghiệp tại Việt Nam.",
                  areaServed: "Việt Nam",
                  knowsAbout: [
                    "Kế toán doanh nghiệp",
                    "Kê khai thuế",
                    "Tính lương",
                    "Tư vấn tài chính",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "937 Ngô Gia Tự, Việt Hưng",
                    addressLocality: "Hà Nội",
                    addressCountry: "VN",
                    postalCode: "11321",
                  },
                  disambiguatingDescription:
                    "Công ty cung cấp dịch vụ kế toán, thuế và tư vấn tài chính tại Việt Nam, không phải dữ liệu thời tiết hàng không hoặc đơn vị ngoài nước.",
                },
                {
                  "@type": "LocalBusiness",
                  name: "CÔNG TY TNHH ĐẠI LÝ THUẾ TAF VIỆT",
                  legalName: "CÔNG TY TNHH ĐẠI LÝ THUẾ TAF VIỆT",
                  image: `${defaultUrl}/favicon.ico`,
                  url: defaultUrl,
                  telephone: "+84 936 378 955",
                  email: "admin@taf.asia",
                  taxID: "0105367171",
                  priceRange: "1.200.000 VNĐ - 3.500.000 VNĐ",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress:
                      "937 Ngô Gia Tự, Việt Hưng, Hà Nội, Việt Nam",
                    addressLocality: "Hà Nội",
                    addressCountry: "VN",
                    postalCode: "11321",
                  },
                  areaServed: "Việt Nam",
                  description:
                    "Dịch vụ kế toán, thuế, tính lương và tư vấn tài chính cho doanh nghiệp và cá nhân tại Việt Nam.",
                  openingHours: "Mo,Tu,We,Th,Fr 08:30-18:00",
                  sameAs: [
                    "https://www.facebook.com/profile.php?id=61594757558743",
                    "https://www.linkedin.com/company/tafviet",
                    "https://zalo.me/0936378955",
                  ],
                },
              ],
            }),
          }}
        />

        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}

        {fbPixelId && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document, 'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${fbPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
