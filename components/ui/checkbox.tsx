"use client";

import * as React from "react";
import { Checkbox as PrimeCheckbox } from "primereact/checkbox";

type PrimeCheckboxProps = React.ComponentPropsWithoutRef<typeof PrimeCheckbox>;

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof PrimeCheckbox>,
  Partial<PrimeCheckboxProps>
>(({ className, ...props }, ref) => {
  return (
    <PrimeCheckbox
      ref={ref as any}
      className={className}
      {...(props as PrimeCheckboxProps)}
    />
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
