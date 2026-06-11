"use client";

import React from "react";
import { PrimeReactProvider } from "primereact/api";

type Props = {
  children: React.ReactNode;
};

export default function PrimeProvider({ children }: Props) {
  const value = {
    ripple: true,
    inputStyle: "outlined" as const,
  };

  return <PrimeReactProvider value={value}>{children}</PrimeReactProvider>;
}
