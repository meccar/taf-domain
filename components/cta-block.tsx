"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendContactEmail } from "@/app/contact/actions";
import { MotionSection } from "./motion-section";
import { CalendarDays, CheckCircle2 } from "lucide-react";

export function CtaBlock() {
  const t = useTranslations("CtaBlock");

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>();
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [confirmedDate, setConfirmedDate] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !date) {
      setError(t("validation.required"));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formattedDate = date.toLocaleDateString("vi-VN");
    const response = await sendContactEmail({
      name: name.trim(),
      phone: phone.trim(),
      email: "",
      message: `Requested consultation date: ${formattedDate}`,
      source: "home-cta-block",
    });

    setIsSubmitting(false);

    if (!response.success) {
      setError(response.error ?? "Unable to submit your request.");
      return;
    }

    setConfirmedDate(formattedDate);
    setName("");
    setPhone("");
    setDate(undefined);
    setOpen(false);
  };

  return (
    <MotionSection id="consultation" className="scroll-mt-24">
      <div className="rounded-xl border border-border bg-muted/50 p-8 sm:p-10 lg:p-12">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold tracking-[-0.025em] text-foreground sm:text-3xl [text-wrap:balance]">
              {t("title")}
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-[1.7] text-muted-foreground">
              {t("description")}
            </p>
            {confirmedDate && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-subtle px-3.5 py-2 text-xs font-medium text-emerald-accent">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>
                  {t("successTitle")} ({confirmedDate}) —{" "}
                  {t("successDescription")}
                </span>
              </div>
            )}
          </div>

          <div className="shrink-0">
            <Button
              size="lg"
              onClick={() => {
                setError(null);
                setOpen(true);
              }}
            >
              <CalendarDays className="h-4 w-4" />
              <span>{t("cta")}</span>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />

        <DialogContent className="w-full overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("dialog.title")}</DialogTitle>
            <DialogDescription>{t("dialog.description")}</DialogDescription>
          </DialogHeader>

          <div className="mt-5 grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="cta-name">{t("fields.name.label")}</Label>
              <Input
                id="cta-name"
                placeholder={t("fields.name.placeholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="cta-phone">{t("fields.phone.label")}</Label>
              <Input
                id="cta-phone"
                type="tel"
                placeholder={t("fields.phone.placeholder")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="grid gap-1.5">
              <Label>{t("fields.date.label")}</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                className="mx-auto"
              />
            </div>

            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!name || !phone || !date || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? t("submitting") : t("confirm")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MotionSection>
  );
}
