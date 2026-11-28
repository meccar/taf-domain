import type { Metadata, Viewport } from "next";
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
import { ORG_ID, SITE_URL, WEBSITE_ID } from "@/lib/seo";
import { LOCALES } from "./admin/posts/const";
import { JsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Metadata");
  const ogImage = {
    url: "/og-default.png",
    width: 1200,
    height: 630,
    alt: t("ogImageAlt"),
  };

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: t("siteName"),
    title: { default: t("defaultTitle"), template: t("titleTemplate") },
    description: t("defaultDescription"),
    keywords: t.raw("keywords"),
    authors: [{ name: t("companyName"), url: SITE_URL }],
    creator: t("companyName"),
    publisher: t("companyName"),
    category: "business",
    formatDetection: { telephone: true, email: true, address: true },
    openGraph: {
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      url: SITE_URL,
      siteName: t("siteName"),
      locale: locale === "en" ? "en_US" : "vi_VN",
      alternateLocale: locale === "en" ? ["vi_VN"] : ["en_US"],
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/taf-favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/taf-favicon-96.png", sizes: "96x96", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
      other: process.env.NEXT_PUBLIC_BING_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
        : undefined,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "AccountingService"],
        "@id": ORG_ID,
        name: t("companyName"),
        legalName: "CÔNG TY TNHH ĐẠI LÝ THUẾ TAF VIỆT", // legal name stays Vietnamese
        alternateName: ["TAF Việt", "TAF Viet", "TAF Tax Agent"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/taf-logo-512.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/og-default.png`,
        description: t("companyDescription"),
        email: SITE.email,
        telephone: SITE.phone,
        taxID: SITE.taxId,
        vatID: SITE.taxId,
        priceRange: t("priceRange"),
        areaServed: { "@type": "Country", name: "Vietnam" },
        knowsAbout: t.raw("knowsAbout"),
        knowsLanguage: [...LOCALES],
        address: {
          "@type": "PostalAddress",
          streetAddress: t("address.streetAddress"),
          addressLocality: t("address.locality"),
          addressRegion: t("address.region"),
          postalCode: t("address.postalCode"),
          addressCountry: "VN",
        },
        geo: { "@type": "GeoCoordinates", ...SITE.geo },
        hasMap: SITE.mapsUrl,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [...SITE.hours.days],
            opens: SITE.hours.opens,
            closes: SITE.hours.closes,
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: SITE.phone,
            email: SITE.email,
            availableLanguage: ["Vietnamese", "English"],
          },
        ],
        sameAs: [...SITE.sameAs],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: t("siteName"),
        inLanguage: [...LOCALES],
        publisher: { "@id": ORG_ID },
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <NextThemeProvider>
          <Suspense fallback={<Loading />}>
            <IntlProvider>
              <ClientLayout>
                {children}
                <Analytics />
              </ClientLayout>
            </IntlProvider>
          </Suspense>
          <SpeedInsights />
        </NextThemeProvider>

        <JsonLd data={jsonLd} />

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
