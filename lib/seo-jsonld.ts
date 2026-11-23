import { ORG_ID, SITE_URL } from "@/lib/seo";

type Faq = { question: string; answer: string };
type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
};

export function buildServiceJsonLd(opts: {
  locale: string;
  path: string;
  name: string;
  description: string;
  serviceType?: string;
  breadcrumbs: { name: string; path: string }[];
  faq?: Faq[];
  plans?: Plan[];
}) {
  const url = `${SITE_URL}${opts.path === "/" ? "" : opts.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: opts.name,
        description: opts.description,
        serviceType: opts.serviceType,
        url,
        inLanguage: opts.locale,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "Vietnam" },
        offers: plansToOffers(opts.plans, url),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: opts.breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: `${SITE_URL}${b.path === "/" ? "" : b.path}`,
        })),
      },
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

function plansToOffers(plans: Plan[] | undefined, url: string) {
  return (plans ?? [])
    .map((p) => {
      const price = Number(p.price.replace(/\D/g, "")); // "2.000.000đ" and "2,000,000đ" both work
      if (!price) return null; // "Contact" / "Liên hệ" is skipped
      return {
        "@type": "Offer",
        name: p.name,
        description: p.description,
        url,
        priceCurrency: "VND",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price,
          priceCurrency: "VND",
          unitText: p.period.replace("/", "").trim(),
        },
      };
    })
    .filter(Boolean);
}
