"use client";

import React from "react";
import { ThemeProvider } from "next-themes";

export default function NextThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) {
  const scriptProps =
    typeof window === "undefined"
      ? undefined
      : ({ type: "application/json" } as const);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
      scriptProps={scriptProps}
    >
      {children}
    </ThemeProvider>
  );
}
