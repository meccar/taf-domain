// components/contact-form.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionResult } from "@/types/action-result";
import { useTranslations } from "next-intl";

const createSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t("validation.name")),
    phone: z.string().min(9, t("validation.phone")),
    email: z.string().email(t("validation.email")).optional().or(z.literal("")),
    message: z.string().optional(),
    consent: z.boolean().refine((value) => value === true, {
      message: t("validation.consent"),
    }),
  });

type FormValues = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  consent: boolean;
};
export interface ContactFormProps {
  variant?: "card" | "plain";
  compact?: boolean;
  title?: string;
  description?: string;
  submitLabel?: string;
  source?: string;
  className?: string;
  onSuccess?: () => void;
  onSubmitAction?: (
    values: FormValues & { source?: string },
  ) => Promise<ActionResult | void>;
}

export function ContactForm({
  variant = "card",
  compact = false,
  title,
  description,
  submitLabel,
  source,
  className,
  onSuccess,
  onSubmitAction,
}: ContactFormProps) {
  const t = useTranslations("ContactForm");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = createSchema(t);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      consent: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitError(null);
    if (onSubmitAction) {
      const result = await onSubmitAction({ ...values, source });
      if (result && "error" in result && result.error) {
        setSubmitError(result.error);
        return;
      }
    } else {
      console.log({ ...values, source });
    }
    setSubmitted(true);
    setTimeout(() => onSuccess?.(), 1500);
  }

  if (submitted) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-3 py-16 text-center",
          className,
        )}
      >
        <CheckCircle2 className="text-green-500" size={40} />
        <p className="text-lg font-medium">{t("success.title")}</p>
        <p className="text-sm text-muted-foreground">
          {t("success.description")}
        </p>
      </div>
    );
  }

  const fields = (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col flex-1 space-y-4"
      >
        <div
          className={cn(compact ? "grid gap-4" : "grid sm:grid-cols-2 gap-4")}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.name.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("fields.name.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.phone.label")}</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder={t("fields.phone.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("fields.email.label")}{" "}
                <span className="font-normal text-muted-foreground">
                  ({t("optional")})
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("fields.email.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!compact && (
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1 flex flex-col">
                <FormLabel>
                  {t("fields.message.label")}{" "}
                  <span className="font-normal text-muted-foreground">
                    ({t("optional")})
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("fields.message.placeholder")}
                    rows={4}
                    className="min-h-[100px] flex-1 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 rounded-md border p-3 text-left sm:p-3.5">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label={t("consent.label")}
                  className="mt-0.5 shrink-0"
                />
              </FormControl>

              <div className="min-w-0 flex-1">
                <FormLabel className="block text-xs leading-relaxed text-foreground sm:text-sm">
                  <span className="inline-flex flex-wrap items-center gap-1 text-left">
                    <span>{t("consent.prefix")}</span>
                    <Link
                      href="/chinh-sach-bao-mat"
                      className="font-medium underline underline-offset-4 decoration-2"
                    >
                      {t("consent.privacy")}
                    </Link>
                    <span>{t("consent.and")}</span>
                    <Link
                      href="/dieu-khoan-su-dung"
                      className="font-medium underline underline-offset-4 decoration-2"
                    >
                      {t("consent.terms")}
                    </Link>
                    <span>{t("consent.suffix")}</span>
                  </span>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {submitError && <p className="text-sm text-red-500">{submitError}</p>}
        <Button
          type="submit"
          size="lg"
          className="w-full mt-auto"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? t("submitting")
            : (submitLabel ?? t("submit"))}{" "}
        </Button>
      </form>
    </Form>
  );

  if (variant === "plain") {
    return <div className={className}>{fields}</div>;
  }

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent
        className={cn(
          "flex-1 flex flex-col",
          title || description ? "" : "pt-6",
        )}
      >
        {fields}
      </CardContent>
    </Card>
  );
}
