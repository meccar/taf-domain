import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ClientLayout from "./client-layout";
import NextThemeProvider from "@/components/theme-provider";
import { GoogleTagManager } from "@next/third-parties/google";
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
                  name: t("companyName"),
                  alternateName: [
                    "TAF Viet Tax Agent Co., Ltd.",
                    t("siteName"),
                  ],
                  legalName: t("companyName"),
                  url: defaultUrl,
                  email: "admin@taf.asia",
                  telephone: "+84 936 378 955",
                  description: t("companyDescription"),
                  areaServed: "Việt Nam",
                  knowsAbout: t.raw("knowsAbout"),
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: t("address.streetAddress"),
                    addressLocality: t("address.locality"),
                    addressCountry: "VN",
                    postalCode: t("address.postalCode"),
                  },
                },
                {
                  "@type": "LocalBusiness",
                  name: t("siteName"),
                  legalName: t("companyName"),
                  image: `${defaultUrl}/favicon.ico`,
                  url: defaultUrl,
                  telephone: "+84 936 378 955",
                  email: "admin@taf.asia",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: t("address.streetAddress"),
                    addressLocality: t("address.locality"),
                    addressCountry: "VN",
                    postalCode: t("address.postalCode"),
                  },
                  areaServed: "Việt Nam",
                  priceRange: "$$",
                  description: t("companyDescription"),
                  openingHours: "Mo,Tu,We,Th,Fr 08:30-18:00",
                  sameAs: [
                    "https://www.facebook.com",
                    "https://www.linkedin.com",
                  ],
                },
              ],
            }),
          }}
        />

        {process.env.NODE_ENV === "production" &&
          process.env.NEXT_PUBLIC_GTM_ID && (
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          )}
      </body>
    </html>
  );
}
