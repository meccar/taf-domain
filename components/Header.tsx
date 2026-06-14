"use client";

import Link from "next/link";
import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import { MegaMenu } from "primereact/megamenu";
import { Menubar } from "primereact/menubar";
import { ThemeSwitcher } from "@/components/theme-switcher";

type HeaderProps = {
  mode?: "mega" | "menubar";
};

export default function Header({ mode = "mega" }: HeaderProps) {
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => (window.location.href = "/"),
    },
    {
      label: "Docs",
      icon: "pi pi-book",
      items: [
        [
          {
            label: "Getting Started",
            command: () => (window.location.href = "/"),
          },
        ],
      ],
    },
  ];

  const menubarModel = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => (window.location.href = "/"),
    },
    {
      label: "Docs",
      icon: "pi pi-book",
      items: [
        {
          label: "Getting Started",
          command: () => (window.location.href = "/"),
        },
      ],
    },
  ];

  const start = (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <span className="text-lg">Next.js Supabase Starter</span>
    </Link>
  );

  const end = (
    <div className="flex items-center gap-2">
      <ThemeSwitcher />
      <Suspense>
        <AuthButton />
      </Suspense>
    </div>
  );

  return (
    <>
      {mode === "mega" ? (
        <MegaMenu
          model={items}
          orientation="horizontal"
          start={start}
          end={end}
          breakpoint="960px"
        />
      ) : (
        <Menubar model={menubarModel} start={start} end={end} />
      )}
    </>
  );
}
