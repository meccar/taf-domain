import { getLocale, getTranslations } from "next-intl/server";
import { ServiceDetailTemplate } from "@/components/services/service-detail-template";
import { JsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/lib/seo";
import { buildServiceJsonLd } from "@/lib/seo-jsonld";

export function createServicePage({
  key,
  path,
  categoryId,
}: {
  key: string;
  path: string;
  categoryId: string;
}) {
  const NS = `ServicePages.${key}`;

  async function Page() {
    const locale = await getLocale();
    const t = await getTranslations(NS);
    const meta = await getTranslations("Metadata");
    const raw = (k: string) => (t.has(k) ? t.raw(k) : undefined);

    return (
      <>
        <JsonLd
          data={buildServiceJsonLd({
            locale,
            path,
            name: t("eyebrow"),
            description: t.has("metaDescription")
              ? t("metaDescription")
              : t("description"),
            serviceType: t.has("serviceType") ? t("serviceType") : t("eyebrow"),
            breadcrumbs: [
              { name: meta("breadcrumbs.home"), path: "/" },
              { name: meta("breadcrumbs.services"), path: "/services" },
              { name: t("eyebrow"), path },
            ],
            plans: raw("plans"),
            faq: raw("faqs"),
          })}
        />
        <ServiceDetailTemplate namespace={key} categoryId={categoryId} />
      </>
    );
  }

  return {
    generateMetadata: () => buildPageMetadata({ namespace: NS, path }),
    Page,
  };
}
