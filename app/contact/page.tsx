import Link from "next/link";
import { Mail, Phone, MapPin, Clock, FileText } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ContactForm } from "@/components/contact-form";
import { MotionSection } from "@/components/motion-section";
import { SectionHeader } from "@/components/section-header";
import { definePage } from "@/lib/define-page";
import { SITE } from "@/lib/site";

const NS = "ContactPage";

const page = definePage({
  ns: NS,
  path: "/contact",
  type: NS,
});
export const generateMetadata = page.generateMetadata;

export default async function Contact() {
  const t = await getTranslations(NS);

  const contactInfo = [
    {
      icon: Mail,
      label: t("contactInfo.email"),
      value: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    {
      icon: Phone,
      label: t("contactInfo.phone"),
      value: SITE.phoneDisplay,
      href: `tel:${SITE.phone}`,
    },
    {
      icon: MapPin,
      label: t("contactInfo.address"),
      value: t("addressValue"),
      href: SITE.mapsUrl,
    },
    { icon: Clock, label: t("contactInfo.hours"), value: t("hoursValue") },
    { icon: FileText, label: t("contactInfo.taxId"), value: t("taxIdValue") },
  ];

  return (
    <>
      <page.PageJsonLd />
      <main className="w-full">
        <MotionSection tone="muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center flex flex-col items-center gap-4">
            <SectionHeader
              eyebrow={t("badge")}
              title={t("heroTitle")}
              className="mb-0"
            />
            <CardDescription className="max-w-2xl text-base leading-relaxed">
              {t("heroDescription")}
            </CardDescription>
          </div>
        </MotionSection>

        <Separator />

        <MotionSection className="mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12">
            <div className="flex flex-col gap-6">
              {contactInfo.map(({ icon: Icon, label, value, href }) => {
                const body = (
                  <>
                    <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardHeader className="p-0 gap-1">
                      <CardDescription className="text-xs uppercase tracking-widest">
                        {label}
                      </CardDescription>
                      <CardTitle className="text-sm font-medium">
                        {value}
                      </CardTitle>
                    </CardHeader>
                  </>
                );
                return (
                  <Card key={label} className="border-none shadow-none">
                    {href ? (
                      <Link
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                        className="flex items-start gap-4 p-2 hover:bg-accent/50 transition-colors"
                      >
                        {body}
                      </Link>
                    ) : (
                      <div className="flex items-start gap-4 p-2">{body}</div>
                    )}
                  </Card>
                );
              })}

              <Card className="overflow-hidden p-0 h-56">
                <iframe
                  title={t("mapTitle")}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.473517454371!2d105.9015746!3d21.0722143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x63016f31bdb57aa1%3A0x8bdbca09555253bf!2zVEFGIFZJ4buEMiAtIEPhg5pOIFRZIFROSFIGxkqhuqJJIEzDqSBUSFAgVEFGIFZJ4buEMg!5e0!3m2!1svn!2svn!4v1700000000000!5m2!1svn!2svn"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Card>
            </div>

            <ContactForm variant="card" source="contact-page" />
          </div>
        </MotionSection>
      </main>
    </>
  );
}
