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
import Image from "next/image";
import { ContactForm } from "./contact-form";
import { ServicesList } from "./services-list";
import { sendContactEmail } from "@/app/contact/actions";
import { MotionSection } from "./motion-section";

const HERO_IMAGE =
  "https://images.pexels.com/photos/6929004/pexels-photo-6929004.jpeg?auto=compress&cs=tinysrgb&w=2400";

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

  return (
    <>
      <MotionSection className="max-w-full relative isolate flex min-h-[calc(100svh-3.5rem)] flex-col justify-center overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/90 via-background/80 to-background/95" />

        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-accent" />
              <span>{t("badge")}</span>
            </div>

            <h1 className="font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground [text-wrap:balance]">
              {t("titleLineOne")}
              <br />
              {t("titleLineTwo")}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground">
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
                className="bg-background/60 backdrop-blur-sm"
                onClick={() => setServicesOpen(true)}
              >
                {t("secondaryButton")}
              </Button>
            </div>
          </div>
        </div>
      </MotionSection>

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
