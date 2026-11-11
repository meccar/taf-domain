import Link from "next/link";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContactForm } from "@/components/contact-form";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <Badge variant="outline" className="mb-4 uppercase tracking-widest">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export interface HeroSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function ServiceHeroSection({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
}: HeroSectionProps) {
  return (
    <div className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-4 uppercase tracking-widest">
            {eyebrow}
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button size="lg" variant="outline" asChild>
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface AudienceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface AudienceSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: AudienceItem[];
}

export function AudienceSection({
  eyebrow,
  title,
  description,
  items,
}: AudienceSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="border-none bg-muted/30">
            <CardHeader className="gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

export interface ProblemItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ProblemsSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: ProblemItem[];
}

export function ProblemsSection({
  eyebrow,
  title,
  description,
  items,
}: ProblemsSectionProps) {
  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="h-full border border-border/70 bg-background"
            >
              <CardHeader className="gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface SolutionItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface SolutionsSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: SolutionItem[];
}

export function SolutionsSection({
  eyebrow,
  title,
  description,
  items,
}: SolutionsSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map(({ icon: Icon, title, description }) => (
          <Card
            key={title}
            className="h-full border border-border/70 bg-muted/30"
          >
            <CardHeader className="gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ProcessSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  steps: ProcessStep[];
}

export function ProcessSection({
  eyebrow,
  title,
  description,
  steps,
}: ProcessSectionProps) {
  return (
    <section id="process" className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="flex flex-col">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-background text-sm font-medium">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="mt-2 h-full w-px bg-border" />
                )}
              </div>
              <div
                className={cn("pb-10", index === steps.length - 1 && "pb-0")}
              >
                <h3 className="mb-1 font-medium">{step.title}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface PricingSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  plans: PricingPlan[];
  primaryLabel?: string;
  primaryHref?: string;
}

export function PricingSection({
  eyebrow = "Pricing",
  title,
  description,
  plans,
  primaryLabel = "Contact us",
  primaryHref = "/contact",
}: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mb-10 max-w-2xl text-center mx-auto">
        <Badge variant="outline" className="mb-4 uppercase tracking-widest">
          {eyebrow}
        </Badge>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "flex h-full flex-col",
              plan.highlighted && "border-foreground shadow-md relative",
            )}
          >
            {plan.highlighted && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Most popular
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
            <CardContent className="flex flex-1 flex-col gap-4">
              <ul className="flex flex-1 flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlighted ? "default" : "outline"}
                className="w-full"
                asChild
              >
                <Link href={primaryHref}>{primaryLabel}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export interface ChecklistSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: string[];
}

export function ChecklistSection({
  eyebrow,
  title,
  description,
  items,
}: ChecklistSectionProps) {
  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <Card
              key={item}
              className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/30 p-4"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="text-sm leading-relaxed text-muted-foreground">
                {item}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface DeliverablesSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: string[];
}

export function DeliverablesSection({
  eyebrow,
  title,
  description,
  items,
}: DeliverablesSectionProps) {
  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Card
              key={item}
              className="h-full rounded-xl border border-border/70 bg-muted/30"
            >
              <CardHeader>
                <CardTitle className="text-base">{item}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FAQItem[];
}

export function FAQSection({
  eyebrow,
  title,
  description,
  items,
}: FAQSectionProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="left"
      />
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export interface ContactCTASectionProps {
  title: string;
  description: string;
  source: string;
  contactFormTitle: string;
  primaryLabel?: string;
}

export function ContactCTASection({
  title,
  description,
  source,
  contactFormTitle,
  primaryLabel = "Contact us",
}: ContactCTASectionProps) {
  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <ContactForm
          variant="card"
          compact
          title={contactFormTitle}
          submitLabel={primaryLabel}
          source={source}
        />
      </div>
    </section>
  );
}

export interface MarketplaceFlowStep {
  label: string;
}

export interface MarketplaceFlowSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  steps: MarketplaceFlowStep[];
}

export function MarketplaceFlowSection({
  eyebrow,
  title,
  description,
  steps,
}: MarketplaceFlowSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-4">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center gap-3">
            <div className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground shadow-sm">
              {step.label}
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export { Check };
