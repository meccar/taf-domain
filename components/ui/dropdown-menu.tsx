"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// A lightweight, typed dropdown menu primitive to replace Radix usage.

type DropdownMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function DropdownMenuTrigger({ children, ...props }, ref) {
  return (
    <button type="button" ref={ref} {...props}>
      {children}
    </button>
  );
});

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DropdownMenuContent({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

const DropdownMenuItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function DropdownMenuItem({ children, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn("w-full text-left px-2 py-1.5 text-sm", className)}
      {...props}
    >
      {children}
    </button>
  );
});

// Checkbox item: controlled via checked prop and calls onChange with next state
interface DropdownMenuCheckboxItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
}

const DropdownMenuCheckboxItem = React.forwardRef<
  HTMLInputElement,
  DropdownMenuCheckboxItemProps
>(function DropdownMenuCheckboxItem(
  { checked = false, children, className, ...props },
  ref,
) {
  return (
    <label
      className={cn("flex items-center gap-2 px-2 py-1.5 text-sm", className)}
    >
      <input ref={ref} type="checkbox" checked={checked} {...props} />
      <span>{children}</span>
    </label>
  );
});

// Radio group using context
type RadioGroupContextType = {
  value?: string;
  onChange?: (value: string) => void;
};

const RadioGroupContext = React.createContext<
  RadioGroupContextType | undefined
>(undefined);

const DropdownMenuRadioGroup: React.FC<{
  value?: string;
  onValueChange?: (v: string) => void;
  children?: React.ReactNode;
}> = ({ value, onValueChange, children }) => {
  return (
    <RadioGroupContext.Provider value={{ value, onChange: onValueChange }}>
      {children}
    </RadioGroupContext.Provider>
  );
};

const DropdownMenuRadioItem = React.forwardRef<
  HTMLButtonElement,
  { value: string } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function DropdownMenuRadioItem(
  { value, children, className, ...props },
  ref,
) {
  const ctx = React.useContext(RadioGroupContext);
  const checked = ctx?.value === value;
  return (
    <button
      ref={ref}
      type="button"
      aria-checked={checked}
      role="menuitemradio"
      className={cn("flex items-center gap-2 px-2 py-1.5 text-sm", className)}
      onClick={() => ctx?.onChange?.(value)}
      {...props}
    >
      <span className="w-4 inline-block">{checked ? "●" : "○"}</span>
      <span>{children}</span>
    </button>
  );
});

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function DropdownMenuLabel({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("px-2 py-1.5 text-sm font-semibold", className)}
      {...props}
    >
      {children}
    </div>
  );
});

const DropdownMenuSeparator = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return (
    <hr
      ref={ref as React.Ref<HTMLHRElement>}
      className={cn("my-1 border-muted", className)}
      {...props}
    />
  );
});

const DropdownMenuShortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  children,
  className,
  ...props
}) => (
  <span
    className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
    {...props}
  >
    {children}
  </span>
);

// Exports for compatibility
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuRadioGroup,
};
