"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "primereact/menu";
import type { Menu as MenuType } from "primereact/menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const menu = useRef<MenuType | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const ICON_SIZE = 16;

  const items = [
    {
      label: "Light",
      icon: "pi pi-sun",
      command: () => setTheme("light"),
    },
    {
      label: "Dark",
      icon: "pi pi-moon",
      command: () => setTheme("dark"),
    },
    {
      label: "System",
      icon: "pi pi-desktop",
      command: () => setTheme("system"),
    },
  ];

  const icon =
    theme === "light" ? (
      <Sun size={ICON_SIZE} className={"text-muted-foreground"} />
    ) : theme === "dark" ? (
      <Moon size={ICON_SIZE} className={"text-muted-foreground"} />
    ) : (
      <Laptop size={ICON_SIZE} className={"text-muted-foreground"} />
    );

  return (
    <div>
      <Menu model={items} popup ref={menu} />
      <Button
        variant="ghost"
        size={"small"}
        onClick={(e) => menu.current?.toggle(e)}
      >
        {icon}
      </Button>
    </div>
  );
};

export { ThemeSwitcher };
