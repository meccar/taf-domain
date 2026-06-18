"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

const THEME_ID = "primereact-theme-link";

const themeMap: Record<string, string> = {
  light: "/themes/viva-light/theme.css",
  dark: "/themes/viva-dark/theme.css",
};

export default function PrimeThemeSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const href = themeMap[resolvedTheme ?? "light"];
    let link = document.getElementById(THEME_ID) as HTMLLinkElement | null;

    if (link) {
      link.href = href;
    } else {
      link = document.createElement("link");
      link.id = THEME_ID;
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }, [resolvedTheme]);

  return null;
}
