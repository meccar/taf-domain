"use client";

import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { MegaMenu } from "primereact/megamenu";

const menuItems = [
  {
    label: "Products",
    icon: "pi pi-th-large",
    items: [
      [
        {
          label: "UI Kit",
          items: [
            {
              label: "Dashboard",
              icon: "pi pi-chart-line",
              command: () => (window.location.href = "/dashboard"),
            },
            {
              label: "Analytics",
              icon: "pi pi-chart-bar",
              command: () => (window.location.href = "/analytics"),
            },
          ],
        },
      ],
    ],
  },
  {
    label: "Products",
    icon: "pi pi-th-large",
    items: [
      [
        {
          label: "UI Kit",
          items: [
            {
              label: "Dashboard",
              icon: "pi pi-chart-line",
              command: () => (window.location.href = "/dashboard"),
            },
            {
              label: "Analytics",
              icon: "pi pi-chart-bar",
              command: () => (window.location.href = "/analytics"),
            },
          ],
        },
      ],
    ],
  },
  {
    label: "Products",
    icon: "pi pi-th-large",
    items: [
      [
        {
          label: "UI Kit",
          items: [
            {
              label: "Dashboard",
              icon: "pi pi-chart-line",
              command: () => (window.location.href = "/dashboard"),
            },
            {
              label: "Analytics",
              icon: "pi pi-chart-bar",
              command: () => (window.location.href = "/analytics"),
            },
          ],
        },
      ],
    ],
  },
  {
    label: "Docs",
    icon: "pi pi-book",
    items: [
      [
        {
          label: "Resources",
          items: [
            {
              label: "Getting Started",
              icon: "pi pi-play",
              command: () => (window.location.href = "/docs"),
            },
            {
              label: "API Reference",
              icon: "pi pi-code",
              command: () => (window.location.href = "/api"),
            },
            {
              label: "Changelog",
              icon: "pi pi-list",
              command: () => (window.location.href = "/changelog"),
            },
          ],
        },
      ],
    ],
  },
];

export default function Header() {
  const start = (
    <Link href="/" className="flex items-center gap-4 mr-6 no-underline">
      <span className="text-lg font-semibold text-color">Acme Corp</span>
    </Link>
  );

  const end = (
    <div className="flex items-center gap-4">
      <ThemeSwitcher />
      <Suspense>
        <AuthButton />
      </Suspense>
    </div>
  );

  return (
    <div className="w-full px-4 py-3">
      <div className="flex items-center">
        {start}

        <div className="flex-1 flex justify-center">
          <MegaMenu
            model={menuItems}
            className="p-2 surface-0 shadow-2 inline-block"
            style={{ borderRadius: "3rem" }}
          />
        </div>

        {end}
      </div>
    </div>
  );
}
