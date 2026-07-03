"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

export type Props = {
  children: React.ReactNode;
};

export default function NextThemeProvider({ children }: Props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
