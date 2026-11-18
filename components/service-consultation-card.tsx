"use client";

import { sendContactEmail } from "@/app/contact/actions";
import { useTranslations } from "next-intl";
import * as React from "react";
import { ContactForm } from "./contact-form";
import {
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "./ui/dialog";

interface ServiceConsultationWrapperProps {
  serviceTitle: string;
  children: React.ReactNode;
}

export function ServiceConsultationCard({
  serviceTitle,
  children,
}: ServiceConsultationWrapperProps) {
  const [open, setOpen] = React.useState(false);
  const tServices = useTranslations("ServicesBlock");
  const tHero = useTranslations("Hero");

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex h-full w-full flex-col justify-between rounded-lg border border-border bg-card p-7 text-left shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
      >
        {children}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="w-full overflow-y-auto sm:max-w-lg">
          <DialogHeader className="mb-5">
            <DialogTitle>{tServices("dialogTitle")}</DialogTitle>
            <DialogDescription>
              {tServices("dialogDescription")}
            </DialogDescription>
          </DialogHeader>
          <ContactForm
            variant="card"
            compact
            title={serviceTitle}
            description={tHero("contactForm.description")}
            submitLabel={tHero("contactForm.submitLabel")}
            source="home-services-block"
            onSubmitAction={sendContactEmail}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
