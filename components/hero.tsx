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
import * as React from "react";
import { useTranslations } from "next-intl";
import { ContactForm } from "./contact-form";
import { ServicesList } from "./services-list";
import { sendContactEmail } from "@/app/contact/actions";

export function Hero({
  externalContactOpen,
  onExternalContactClose,
}: {
  externalContactOpen?: boolean;
  onExternalContactClose?: () => void;
}) {
  const t = useTranslations("Hero");
  const tServices = useTranslations("ServicesBlock");

  const [contactOpen, setContactOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [prefilledMessage, setPrefilledMessage] = React.useState("");

  React.useEffect(() => {
    if (externalContactOpen) {
      setPrefilledMessage("");
      setContactOpen(true);
    }
  }, [externalContactOpen]);

  const handleContactOpenChange = (nextOpen: boolean) => {
    setContactOpen(nextOpen);
    if (!nextOpen) {
      onExternalContactClose?.();
    }
  };

  const handleSelectServiceFromDialog = (serviceTitle: string) => {
    setServicesOpen(false);
    setPrefilledMessage(`${tServices("prefillPrefix")} ${serviceTitle}`);
    setContactOpen(true);
  };

  const stats = [
    {
      value: t("stats.experience.value"),
      label: t("stats.experience.label"),
    },
    {
      value: t("stats.clients.value"),
      label: t("stats.clients.label"),
    },
    {
      value: t("stats.compliance.value"),
      label: t("stats.compliance.label"),
    },
  ];

  return (
    <>
      <section className="pt-10 pb-6 sm:pt-14 sm:pb-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Clean unboxed compliance eyebrow */}
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-accent" />
            <span>{t("badge")}</span>
          </div>

          <h1 className="font-display text-[clamp(2.25rem,4.2vw,3.5rem)] font-bold leading-[1.12] tracking-[-0.03em] text-foreground [text-wrap:balance]">
            {t("titleLineOne")}
            <br />
            {t("titleLineTwo")}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground sm:text-lg">
            {t("description")}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => {
                setPrefilledMessage("");
                setContactOpen(true);
              }}
            >
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
        </div>

        {/* 3-Column Executive KPI Metric Strip */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card px-6 py-6 text-center shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] sm:px-8 sm:text-left"
            >
              <p className="font-display text-3xl font-bold leading-tight tracking-[-0.03em] text-foreground tabular-nums sm:text-[2.5rem]">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Dialog */}
      <Dialog open={contactOpen} onOpenChange={handleContactOpenChange}>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="w-full overflow-y-auto sm:max-w-lg">
          <DialogHeader className="mb-5">
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

      {/* Services Overview Dialog */}
      <Dialog open={servicesOpen} onOpenChange={setServicesOpen}>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="w-full overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("dialog.servicesTitle")}</DialogTitle>
            <DialogDescription>
              {t("dialog.servicesDescription")}
            </DialogDescription>
          </DialogHeader>
          <ServicesList onSelectService={handleSelectServiceFromDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}
