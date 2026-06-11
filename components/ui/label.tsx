"use client";

import * as React from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string;
};

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => (
    <label ref={ref} className={className} {...props}>
      {children}
    </label>
  ),
);

Label.displayName = "Label";

export { Label };
