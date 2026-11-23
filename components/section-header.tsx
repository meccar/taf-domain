import { cn } from "@/lib/utils";

const headerAlign = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
} as const;

export function SectionHeader({
  eyebrow,
  title,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  align?: keyof typeof headerAlign;
  className?: string;
}) {
  return (
    <div
      className={cn("mb-12 flex flex-col gap-3", headerAlign[align], className)}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.06em] text-royal-blue">
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl font-bold tracking-[-0.025em] text-foreground sm:text-3xl [text-wrap:balance]">
        {title}
      </h2>
    </div>
  );
}
