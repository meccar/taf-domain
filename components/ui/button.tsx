import * as React from "react";
import { Button as PrimeButton } from "primereact/button";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<
  React.ComponentRef<typeof PrimeButton>,
  ButtonProps
>(
  (
    {
      children,
      variant = "default",
      size = "default",
      asChild,
      className,
      ...props
    },
    ref,
  ) => {
    const severity =
      variant === "destructive"
        ? "danger"
        : variant === "secondary"
          ? "secondary"
          : undefined;

    const typedSeverity: "success" | "info" | "warning" | "danger" | undefined =
      severity as "success" | "info" | "warning" | "danger" | undefined;

    return (
      <PrimeButton
        ref={ref as any}
        className={className}
        severity={typedSeverity}
        {...props}
      >
        {children}
      </PrimeButton>
    );
  },
);

Button.displayName = "Button";

export { Button };
