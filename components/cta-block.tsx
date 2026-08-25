"use client";

import { useState } from "react";
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

export function CtaBlock() {
  const t = useTranslations("CtaBlock");

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <div className="rounded-xl bg-secondary p-10 text-center">
      <h2 className="mb-2 text-2xl font-medium">{t("title")}</h2>

      <p className="mb-6 text-sm text-muted-foreground">{t("description")}</p>

      <Button size="lg" onClick={() => setOpen(true)}>
        {t("cta")}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />

        <DialogContent className="w-full overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("dialog.title")}</DialogTitle>

            <DialogDescription>{t("dialog.description")}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-1.5">
              <Label htmlFor="name">{t("fields.name.label")}</Label>

              <Input
                id="name"
                placeholder={t("fields.name.placeholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="phone">{t("fields.phone.label")}</Label>

              <Input
                id="phone"
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
                className="mx-auto w-fit rounded-md border"
              />
            </div>

            <Button onClick={handleSubmit} disabled={!name || !phone || !date}>
              {t("confirm")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
