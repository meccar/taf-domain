"use client";

import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { MenuItems } from "@/const/items/menu-Items.const";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
  return (
    <header className="w-full border-b bg-background">
      <div className="max-w-7xl mx-auto px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center">
        {/* Logo */}
        <Logo />

        {/* Nav */}
        <NavigationMenu className="justify-self-center" viewport={false}>
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
                                <button
                                  onClick={sub.command}
                                  className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent"
                                >
                                  {sub.label}
                                </button>
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
                    <button
                      onClick={item.command}
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.label}
                    </button>
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

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
