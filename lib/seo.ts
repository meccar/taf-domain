import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://taf.asia")
).replace(/\/$/, "");

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const OG_LOCALE: Record<string, string> = { vi: "vi_VN", en: "en_US" };

export async function buildPageMetadata({
  namespace,
  path,
  type = "website",
  noindex = false,
  absoluteTitle = false,
}: {
  namespace: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  absoluteTitle?: boolean;
}): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations(namespace);
  const meta = await getTranslations("Metadata");

  const pick = (keys: string[]) => keys.find((k) => t.has(k));

  const title = t(pick(["metaTitle", "title", "heroTitle"])!);
  const description = t(
    pick(["metaDescription", "description", "heroDescription"])!,
  );

  const ogImage = {
    url: "/og-default.png",
    width: 1200,
    height: 630,
    alt: meta("ogImageAlt"),
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: t.has("keywords")
      ? (t.raw("keywords") as string[])
      : meta.raw("keywords"),
    alternates: { canonical: path }, // same URL for every language, no hreflang
    openGraph: {
      title,
      description,
      url: path,
      siteName: meta("siteName"),
      locale: OG_LOCALE[locale] ?? "vi_VN",
      type,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
    ...(noindex && { robots: { index: false, follow: false } }),
  };
}
