"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "primereact/menu";
import type { Menu as MenuType } from "primereact/menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { MenuItem } from "primereact/menuitem";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const menu = useRef<MenuType | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync PrimeReact theme with next-themes
  useEffect(() => {
    if (!mounted) return;

    const primeThemeId = "primereact-theme-link";
    const existingLink = document.getElementById(
      primeThemeId,
    ) as HTMLLinkElement;

    const themePath =
      resolvedTheme === "dark"
        ? "/themes/lara-dark-blue/theme.css"
        : "/themes/lara-light-blue/theme.css";

    if (existingLink) {
      existingLink.href = themePath;
    } else {
      const link = document.createElement("link");
      link.id = primeThemeId;
      link.rel = "stylesheet";
      link.href = themePath;
      document.head.appendChild(link);
    }
  }, [resolvedTheme, mounted]);

  if (!mounted) return null;

  const ICON_SIZE = 16;

  const items: MenuItem[] = [
    { label: "Light", icon: "pi pi-sun", command: () => setTheme("light") },
    { label: "Dark", icon: "pi pi-moon", command: () => setTheme("dark") },
    {
      label: "System",
      icon: "pi pi-desktop",
      command: () => setTheme("system"),
    },
  ];

  const icon =
    theme === "light" ? (
      <Sun size={ICON_SIZE} className="text-muted-foreground" />
    ) : theme === "dark" ? (
      <Moon size={ICON_SIZE} className="text-muted-foreground" />
    ) : (
      <Laptop size={ICON_SIZE} className="text-muted-foreground" />
    );

  return (
    <div>
      <Menu model={items} popup ref={menu} />
      <Button
        variant="ghost"
        size="small"
        onClick={(e) => menu.current?.toggle(e)}
      >
        {icon}
      </Button>
    </div>
  );
};

export { ThemeSwitcher };
