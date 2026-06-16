import * as React from "react";
import { Button as PrimeButton } from "primereact/button";
import { SeverityConfig } from "../../const/severity.const";
import {
  ButtonSizeType,
  ButtonVariantType,
  mapToPrimeSize,
} from "../../const/button.const";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantType;
  size?: ButtonSizeType | undefined;
}

const Button = React.forwardRef<
  React.ComponentRef<typeof PrimeButton>,
  ButtonProps
>(
  (
    { children, variant = "default", size = undefined, className, ...props },
    ref,
  ) => {
    const severity =
      variant === "destructive"
        ? "danger"
        : variant === "secondary"
          ? "secondary"
          : undefined;

    const typedSeverity =
      (severity as SeverityConfig[keyof SeverityConfig]) || undefined;

    const primereactSize = mapToPrimeSize(size as ButtonSizeType);

    return (
      <PrimeButton
        ref={ref}
        className={className}
        size={primereactSize}
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
