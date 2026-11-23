import { ORG_ID, WEBSITE_ID, SITE_URL } from "@/lib/seo";

export const absUrl = (p: string) =>
  p.startsWith("http") ? p : `${SITE_URL}${p === "/" ? "" : p}`;

export const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function breadcrumbNode(
  path: string,
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absUrl(path)}#breadcrumb`,
    itemListElement: items.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: absUrl(b.path),
    })),
  };
}

export function buildWebPageJsonLd(opts: {
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  locale: string;
  path: string;
  name: string;
  description: string;
  breadcrumbs: { name: string; path: string }[];
  about?: object; // e.g. { "@id": ORG_ID }
  extraNodes?: object[]; // Person, ItemList, FAQPage...
  faq?: { question: string; answer: string }[];
}) {
  const url = absUrl(opts.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": opts.type,
        "@id": `${url}#webpage`,
        url,
        name: opts.name,
        description: opts.description,
        inLanguage: opts.locale,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...(opts.about && { about: opts.about, mainEntity: opts.about }),
      },
      breadcrumbNode(opts.path, opts.breadcrumbs),
      ...(opts.extraNodes ?? []),
      ...(opts.faq?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: opts.faq.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ]
        : []),
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
