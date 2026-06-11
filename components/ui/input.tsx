import * as React from "react";
import { InputText } from "primereact/inputtext";

type PrimeInputProps = React.ComponentPropsWithoutRef<typeof InputText>;

const Input = React.forwardRef<
  React.ComponentRef<typeof InputText>,
  PrimeInputProps
>(({ className, type = "text", ...props }, ref) => {
  return (
    <InputText
      ref={ref as any}
      type={type}
      className={className}
      {...(props as PrimeInputProps)}
    />
  );
});
Input.displayName = "Input";

export { Input };
