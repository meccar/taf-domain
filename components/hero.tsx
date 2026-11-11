"use client";

import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ContactForm } from "./contact-form";
import { ServicesList } from "./services-list";
import { sendContactEmail } from "@/app/contact/actions";

export function Hero() {
  const t = useTranslations("Hero");
  const [contactOpen, setContactOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center text-center px-6 py-20 max-w-3xl mx-auto">
        {/* Badge */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground border rounded-full px-4 py-1.5 mb-8">
          <ShieldCheck size={14} />
          <span>{t("badge")}</span>
        </div>

        <h1 className="text-4xl lg:text-5xl font-medium leading-tight mb-5">
          {t("titleLineOne")}
          <br />
          {t("titleLineTwo")}
        </h1>

        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed mb-10">
          {t("description")}
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Button size="lg" onClick={() => setContactOpen(true)}>
            {t("primaryButton")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setServicesOpen(true)}
          >
            {t("secondaryButton")}
          </Button>
        </div>

        <div className="grid grid-cols-3 divide-x border rounded-xl mt-16 w-full">
          <div className="py-6 px-4">
            <p className="text-2xl font-medium">
              {t("stats.experience.value")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("stats.experience.label")}
            </p>
          </div>
          <div className="py-6 px-4">
            <p className="text-2xl font-medium">{t("stats.clients.value")}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("stats.clients.label")}
            </p>
          </div>
          <div className="py-6 px-4">
            <p className="text-2xl font-medium">
              {t("stats.compliance.value")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("stats.compliance.label")}
            </p>
          </div>
        </div>
      </div>

      {/* Contact — Sheet slides in from the right */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="w-full sm:max-w-lg overflow-y-auto ">
          <DialogHeader className="mb-6">
            <DialogTitle>{t("dialog.contactTitle")}</DialogTitle>
            <DialogDescription>
              {t("dialog.contactDescription")}
            </DialogDescription>
          </DialogHeader>
          <ContactForm
            variant="card"
            compact
            title={t("contactForm.title")}
            description={t("contactForm.description")}
            submitLabel={t("contactForm.submitLabel")}
            source="home-cta"
            onSubmitAction={sendContactEmail}
          />
        </DialogContent>
      </Dialog>

      {/* Services — Dialog pops up centered */}
      <Dialog open={servicesOpen} onOpenChange={setServicesOpen}>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="w-full sm:max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("dialog.servicesTitle")}</DialogTitle>
            <DialogDescription>
              {t("dialog.servicesDescription")}
            </DialogDescription>
          </DialogHeader>
          <ServicesList />
        </DialogContent>
      </Dialog>
    </>
  );
}
