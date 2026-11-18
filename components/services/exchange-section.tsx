import { Check, FileText } from "lucide-react";

/**
 * Replaces ChecklistSection + DeliverablesSection with one two-column block:
 * "what you prepare" next to "what you get back", so the customer sees the
 * whole exchange at a glance.
 */
export function ExchangeSection({
  provideTitle,
  provideItems,
  receiveTitle,
  receiveItems,
}: {
  provideTitle: string;
  provideItems: string[];
  receiveTitle: string;
  receiveItems: string[];
}) {
  if (provideItems.length === 0 && receiveItems.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-6 md:grid-cols-2">
        <Column
          title={provideTitle}
          items={provideItems}
          icon={<FileText className="h-3.5 w-3.5" />}
          className="bg-muted/30"
        />
        <Column
          title={receiveTitle}
          items={receiveItems}
          icon={<Check className="h-3.5 w-3.5" />}
          className="border border-border bg-card"
        />
      </div>
    </section>
  );
}

function Column({
  title,
  items,
  icon,
  className,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
  className: string;
}) {
  return (
    <div className={`rounded-lg p-6 sm:p-8 ${className}`}>
      <h2 className="font-display text-xl font-semibold tracking-[-0.015em] text-foreground sm:text-2xl">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-royal-blue/10 text-royal-blue">
              {icon}
            </span>
            <span className="text-sm leading-relaxed text-foreground">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
