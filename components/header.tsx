"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { Menu } from "lucide-react";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { MenuItems } from "@/const/items/menu-Items.const";
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

function getSubItems(items: any): any[] {
  const res: any[] = [];
  const stack: any[] = Array.isArray(items) ? [...items] : [items];
  while (stack.length) {
    const el = stack.shift();
    if (!el) continue;
    if (Array.isArray(el)) stack.push(...el);
    else if (el.items)
      stack.push(...(Array.isArray(el.items) ? el.items : [el.items]));
    else if (el.label) res.push(el);
  }
  return res;
}

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
            {MenuItems.map((item, idx) => (
              <NavigationMenuItem key={idx}>
                {item.items ? (
                  <>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-48 p-1">
                        {getSubItems(item.items).map((sub, sidx) => (
                          <li key={sidx}>
                            {sub.command ? (
                              <NavigationMenuLink asChild>
                                <Button
                                  variant="ghost"
                                  onClick={sub.command}
                                  className="w-full justify-start px-3 py-2 h-auto text-sm font-normal"
                                >
                                  {sub.label}
                                </Button>
                              </NavigationMenuLink>
                            ) : (
                              <NavigationMenuLink asChild>
                                <Link
                                  href={sub.url ?? "/"}
                                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent"
                                >
                                  {sub.label}
                                </Link>
                              </NavigationMenuLink>
                            )}
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : item.command ? (
                  <NavigationMenuLink asChild>
                    <Button
                      variant="ghost"
                      onClick={item.command}
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.label}
                    </Button>
                  </NavigationMenuLink>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.url ?? "/"}
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
                  {MenuItems.map((item, idx) =>
                    item.items ? (
                      <AccordionItem key={idx} value={`item-${idx}`}>
                        <AccordionTrigger className="text-sm font-medium py-3 hover:no-underline">
                          {item.label}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="flex flex-col gap-1 pl-2">
                            {getSubItems(item.items).map((sub, sidx) => (
                              <li key={sidx}>
                                {sub.command ? (
                                  <Button
                                    variant="ghost"
                                    onClick={() => {
                                      sub.command();
                                      setMobileOpen(false);
                                    }}
                                    className="w-full justify-start px-2 py-2 h-auto text-sm font-normal text-muted-foreground hover:text-foreground"
                                  >
                                    {sub.label}
                                  </Button>
                                ) : (
                                  <Link
                                    href={sub.url ?? "/"}
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-2 py-2 text-sm rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                                  >
                                    {sub.label}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <div key={idx} className="border-b py-3">
                        {item.command ? (
                          <Button
                            variant="ghost"
                            onClick={() => {
                              item.command();
                              setMobileOpen(false);
                            }}
                            className="w-full justify-start p-0 h-auto text-sm font-medium"
                          >
                            {item.label}
                          </Button>
                        ) : (
                          <Link
                            href={item.url ?? "/"}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm font-medium"
                          >
                            {item.label}
                          </Link>
                        )}
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
