type Step = { title: string; description: string };

/**
 * "What happens after I contact you" (not the recurring monthly process).
 * Renders nothing if the service page has no `onboarding` messages yet, so
 * the other service pages keep working until their copy is written.
 */
export function OnboardingSection({
  title,
  description,
  steps,
}: {
  title: string;
  description: string;
  steps: Step[];
}) {
  if (steps.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl [text-wrap:balance]">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>

      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="rounded-lg border border-border bg-card p-6"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
              {i + 1}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
