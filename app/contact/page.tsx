import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ContactForm } from "@/components/contact-form";

export async function generateMetadata() {
  const t = await getTranslations("ContactPage");
  return {
    title: `${t("badge")} | TAF Việt`,
  };
}

export default async function Contact() {
  const t = await getTranslations("ContactPage");

  const contactInfo = [
    {
      icon: Mail,
      label: t("contactInfo.email"),
      value: "admin@taf.asia",
      href: "mailto:admin@taf.asia",
    },
    {
      icon: Phone,
      label: t("contactInfo.phone"),
      value: "+84 936 378 955",
      href: "tel:0936378955",
    },
    {
      icon: MapPin,
      label: t("contactInfo.address"),
      value: t("addressValue"),
      href: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.473517454371!2d105.9015746!3d21.0722143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x63016f31bdb57aa1%3A0x8bdbca09555253bf!2zVEFGIFZJ4buEMiAtIEPhg5pOIFRZIFROSFIGxkqhuqJJIEzDqSBUSFAgVEFGIFZJ4buEMg!5e0!3m2!1svn!2svn!4v1700000000000!5m2!1svn!2svn",
    },
    {
      icon: MapPin,
      label: t("contactInfo.taxId"),
      value: t("taxIdValue"),
      href: "#",
    },
  ];

  return (
    <main className="w-full">
      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center flex flex-col items-center gap-4">
          <Badge variant="outline" className="uppercase tracking-widest">
            {t("badge")}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            {t("heroTitle")}
          </h1>
          <CardDescription className="max-w-2xl text-base leading-relaxed">
            {t("heroDescription")}
          </CardDescription>
        </div>
      </div>

      <Separator />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12">
          <div className="flex flex-col gap-6">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <Card
                key={label}
                className="border-none shadow-none hover:bg-accent/50 transition-colors"
              >
                <Link
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex items-start gap-4 p-2"
                >
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
                </Link>
              </Card>
            ))}

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
      </div>
    </main>
  );
}
