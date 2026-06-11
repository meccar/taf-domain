import * as React from "react";
import { Tag } from "primereact/tag";

type PrimeTagProps = React.ComponentPropsWithoutRef<typeof Tag>;

export interface BadgeProps extends Omit<PrimeTagProps, "value" | "severity"> {
  variant?: "default" | "secondary" | "destructive" | "outline";
  children?: React.ReactNode;
}

function Badge({
  children,
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const severity: PrimeTagProps["severity"] =
    variant === "destructive"
      ? "danger"
      : variant === "secondary"
        ? "info"
        : undefined;

  return (
    <Tag
      value={String(children ?? "")}
      severity={severity}
      className={className}
      {...(props as PrimeTagProps)}
    />
  );
}

export { Badge };
