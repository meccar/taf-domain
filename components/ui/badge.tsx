import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
  children?: React.ReactNode;
}

function Badge({
  children,
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full";
  const variantCls =
    variant === "destructive"
      ? "bg-red-100 text-red-800"
      : variant === "secondary"
        ? "bg-blue-100 text-blue-800"
        : variant === "outline"
          ? "border border-slate-200 text-slate-700 bg-transparent"
          : "bg-slate-100 text-slate-900";

  return (
    <span className={cn(base, variantCls, className)} {...props}>
      {children}
    </span>
  );
}

export { Badge };
