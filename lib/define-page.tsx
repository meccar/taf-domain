import { getLocale, getTranslations } from "next-intl/server";
import { buildWebPageJsonLd, JsonLd } from "@/components/json-ld";
import { buildPageMetadata, ORG_ID } from "@/lib/seo";

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";

export function definePage({
  ns,
  path,
  type = "WebPage",
  noindex = false,
  absoluteTitle = false,
}: {
  ns: string;
  path: string;
  type?: PageType;
  noindex?: boolean;
  absoluteTitle?: boolean;
}) {
  async function PageJsonLd({ extraNodes }: { extraNodes?: object[] }) {
    if (noindex) return null;

    const locale = await getLocale();
    const t = await getTranslations(ns);
    const meta = await getTranslations("Metadata");
    const first = (keys: string[]) => keys.find((k) => t.has(k))!;

    const name = t(first(["metaTitle", "title", "heroTitle"]));
    const description = t(
      first(["metaDescription", "description", "heroDescription"]),
    );

    // Breadcrumbs derived from the URL: "/services/business/payroll"
    // -> Home > Services > Business > <this page>.
    // Intermediate segments need a Metadata.breadcrumbs.<segment> label,
    // and are skipped if missing (so you never link to a non-existent page).
    const segments = path.split("/").filter(Boolean);
    const crumbs = [{ name: meta("breadcrumbs.home"), path: "/" }];
    segments.forEach((seg, i) => {
      const isLeaf = i === segments.length - 1;
      const key = `breadcrumbs.${seg}`;
      const label = isLeaf
        ? t.has("breadcrumb")
          ? t("breadcrumb")
          : name
        : meta.has(key)
          ? meta(key)
          : null;
      if (label)
        crumbs.push({
          name: label,
          path: "/" + segments.slice(0, i + 1).join("/"),
        });
    });

    return (
      <JsonLd
        data={buildWebPageJsonLd({
          type,
          locale,
          path,
          name,
          description,
          about: { "@id": ORG_ID },
          breadcrumbs: crumbs,
          extraNodes,
          faq: t.has("faqs")
            ? (t.raw("faqs") as { question: string; answer: string }[])
            : undefined,
        })}
      />
    );
  }

  return {
    generateMetadata: () =>
      buildPageMetadata({ namespace: ns, path, noindex, absoluteTitle }),
    PageJsonLd,
  };
}
