"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Mail, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const createSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("invalidEmail")),
  });

type FormValues = {
  email: string;
};

export function NewsletterForm({
  variant = "stacked",
  source,
  className,
  onSubmitAction,
}: {
  variant?: "stacked" | "inline";
  source?: string;
  className?: string;
  onSubmitAction?: (
    values: FormValues & { source?: string },
  ) => Promise<void> | void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("NewsletterForm");
  const form = useForm<FormValues>({
    resolver: zodResolver(createSchema(t)),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: FormValues) {
    if (onSubmitAction) await onSubmitAction({ ...values, source });
    setSubmitted(true);
    form.reset();
  }

  if (submitted) {
    return (
      <div className={cn("flex items-center gap-2 text-sm", className)}>
        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
        <span>{t("success")}</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          variant === "inline" ? "flex gap-2" : "flex flex-col gap-3",
          className,
        )}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("placeholder")}
                    className="pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className={variant === "stacked" ? "w-full" : ""}
        >
          {form.formState.isSubmitting ? t("buttonSubmitting") : t("button")}
        </Button>
      </form>
    </Form>
  );
}
