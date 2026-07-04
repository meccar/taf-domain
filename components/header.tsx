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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between md:grid md:grid-cols-[auto_1fr_auto]">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <NavigationMenu
          className="hidden md:flex justify-self-center"
          viewport={false}
        >
          <NavigationMenuList>
            {navigation.map((item) => (
              <NavigationMenuItem key={item.label}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul className="w-48 p-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                              >
                                {child.label}
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
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side (desktop) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Suspense
            fallback={
              <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
            }
          >
            <AuthButton />
          </Suspense>
        </div>

        {/* Mobile: Sheet trigger + drawer */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
            <SheetHeader className="border-b px-4 py-4">
              <SheetTitle asChild>
                <Logo />
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col h-[calc(100%-73px)]">
              {/* Scrollable nav */}
              <nav className="flex-1 overflow-y-auto px-4 py-3">
                <Accordion type="single" collapsible className="w-full">
                  {navigation.map((item) =>
                    item.children ? (
                      <AccordionItem key={item.label} value={item.label}>
                        <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">
                          {item.label}
                        </AccordionTrigger>

                        <AccordionContent>
                          <ul className="flex flex-col gap-1 pl-2">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block px-2 py-2 text-sm rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <div key={item.label} className="border-b py-3">
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm font-medium"
                        >
                          {item.label}
                        </Link>
                      </div>
                    ),
                  )}
                </Accordion>
              </nav>

              {/* Footer controls, pinned to bottom */}
              <div className="border-t px-4 py-4 flex items-center justify-between gap-3 bg-muted/30">
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <ThemeSwitcher />
                </div>
                <Suspense
                  fallback={
                    <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
                  }
                >
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
