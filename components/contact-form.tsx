// components/contact-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const schema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

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
  ) => Promise<{ error?: string; success?: boolean } | void>;
}

export function ContactForm({
  variant = "card",
  compact = false,
  title,
  description,
  submitLabel = "Gửi yêu cầu tư vấn",
  source,
  className,
  onSuccess,
  onSubmitAction,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", message: "" },
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
        <p className="font-medium text-lg">Đã gửi thành công!</p>
        <p className="text-sm text-muted-foreground">
          Đội ngũ TAF Việt sẽ liên hệ với bạn sớm nhất.
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
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input placeholder="Nguyễn Văn Mười" {...field} />
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
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="0901 234 567" {...field} />
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
                Email{" "}
                <span className="text-muted-foreground font-normal">
                  (tùy chọn)
                </span>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@congty.com" {...field} />
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
                  Nhu cầu{" "}
                  <span className="text-muted-foreground font-normal">
                    (tùy chọn)
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mô tả ngắn về nhu cầu kế toán / thuế..."
                    rows={4}
                    className="flex-1 resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {submitError && <p className="text-sm text-red-500">{submitError}</p>}
        <Button
          type="submit"
          size="lg"
          className="w-full mt-auto"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Đang gửi..." : submitLabel}
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
