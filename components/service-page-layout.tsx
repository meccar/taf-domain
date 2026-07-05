import Link from "next/link";
import { Check, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContactForm } from "@/components/contact-form";
import { cn } from "@/lib/utils";

export interface ServiceFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServicePlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServicePageLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  included: ServiceFeature[];
  steps: ServiceStep[];
  plans: ServicePlan[];
  faqs: ServiceFaq[];
  ctaTitle: string;
  ctaDescription: string;
  contactFormTitle: string;
  source: string;
}

export function ServicePageLayout({
  eyebrow,
  title,
  description,
  included,
  steps,
  plans,
  faqs,
  ctaTitle,
  ctaDescription,
  contactFormTitle,
  source,
}: ServicePageLayoutProps) {
  return (
    <main className="w-full">
      {/* Hero */}
      <div className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center text-center gap-5">
          <Badge variant="outline" className="uppercase tracking-widest">
            {eyebrow}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" asChild>
              <Link href="/contact">Nhận tư vấn miễn phí</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#pricing">Xem bảng giá</Link>
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* What's included */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl mb-12">
          <Badge variant="outline" className="uppercase tracking-widest mb-4">
            Phạm vi dịch vụ
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Những gì TAF Việt xử lý cho bạn
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {included.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="border-none shadow-none bg-muted/30">
              <CardHeader className="gap-3">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Process */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl mb-12">
          <Badge variant="outline" className="uppercase tracking-widest mb-4">
            Quy trình
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {steps.length} bước xử lý mỗi kỳ
          </h2>
        </div>
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full border flex items-center justify-center text-sm font-medium shrink-0">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-border" />
                )}
              </div>
              <div className={cn("pb-10", i === steps.length - 1 && "pb-0")}>
                <h3 className="font-medium mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Pricing */}
      <div
        id="pricing"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 scroll-mt-20"
      >
        <div className="max-w-2xl mb-12 mx-auto text-center">
          <Badge variant="outline" className="uppercase tracking-widest mb-4">
            Bảng giá
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Chọn gói phù hợp với doanh nghiệp
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col",
                plan.highlighted && "border-foreground shadow-md relative",
              )}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Phổ biến nhất
                </Badge>
              )}
              <CardHeader className="gap-2">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 gap-4">
                <ul className="flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link href="/contact">Liên hệ tư vấn</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* FAQ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="mb-10">
          <Badge variant="outline" className="uppercase tracking-widest mb-4">
            Câu hỏi thường gặp
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Giải đáp trước khi bắt đầu
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Separator />

      {/* CTA */}
      <div className="bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
              {ctaTitle}
            </h2>
            <p className="text-muted-foreground">{ctaDescription}</p>
          </div>
          <ContactForm
            variant="card"
            compact
            title={contactFormTitle}
            submitLabel="Gửi yêu cầu tư vấn"
            source={source}
          />
        </div>
      </div>
    </main>
  );
}
