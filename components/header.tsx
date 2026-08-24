"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { Menu } from "lucide-react";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LanguageSwitcher } from "./language-switcher";
import Logo from "./logo";
import { navigation } from "@/const/items/navigation.const";
import { Loading } from "./ui/loading";
import { useTranslations } from "next-intl";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("Navigation");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:grid md:grid-cols-[auto_1fr_auto]">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <NavigationMenu
          className="hidden justify-self-center md:flex"
          viewport={false}
        >
          <NavigationMenuList>
            {navigation.map((item) => (
              <NavigationMenuItem key={item.labelKey}>
                {"children" in item ? (
                  <>
                    <NavigationMenuTrigger>
                      {t(item.labelKey)}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul className="w-48 p-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                              >
                                {t(child.labelKey)}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={navigationMenuTriggerStyle()}
                    >
                      {t(item.labelKey)}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side - Desktop */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ThemeSwitcher />

          <Suspense fallback={<Loading />}>
            <AuthButton />
          </Suspense>
        </div>

        {/* Mobile */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={t("menu")}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] p-0 sm:w-[360px]">
            <SheetHeader className="border-b px-4 py-4">
              <SheetTitle asChild>
                <Logo />
              </SheetTitle>
            </SheetHeader>

            <div className="flex h-[calc(100%-73px)] flex-col">
              {/* Scrollable navigation */}
              <nav className="flex-1 overflow-y-auto px-4 py-3">
                <Accordion type="single" collapsible className="w-full">
                  {navigation.map((item) =>
                    "children" in item ? (
                      <AccordionItem key={item.labelKey} value={item.labelKey}>
                        <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline">
                          {t(item.labelKey)}
                        </AccordionTrigger>

                        <AccordionContent>
                          <ul className="flex flex-col gap-1 pl-2">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                >
                                  {t(child.labelKey)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <div key={item.labelKey} className="border-b py-3">
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm font-medium"
                        >
                          {t(item.labelKey)}
                        </Link>
                      </div>
                    ),
                  )}
                </Accordion>
              </nav>

              {/* Footer controls */}
              <div className="flex items-center justify-between gap-3 border-t bg-muted/30 px-4 py-4">
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <ThemeSwitcher />
                </div>

                <Suspense fallback={<Loading />}>
                  <AuthButton />
                </Suspense>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
