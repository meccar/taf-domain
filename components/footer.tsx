"use client";

import Link from "next/link";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import Logo from "./logo";
import { navigation } from "@/const/items/navigation.const";
import { useTranslations } from "next-intl";

const socialLinks = [
  { Icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const nav = useTranslations("Navigation");
  const t = useTranslations("Footer");

  const year = new Date().getFullYear();

  const footerLinks = [
    {
      heading: t("services"),
      items: navigation.find((x) => x.labelKey === "services")!.children!,
    },
    {
      heading: t("resources"),
      items: [
        ...navigation.find((x) => x.labelKey === "resources")!.children!,
        navigation.find((x) => x.labelKey === "blog")!,
      ],
    },
    {
      heading: t("company"),
      items: [
        navigation.find((x) => x.labelKey === "about")!,
        navigation.find((x) => x.labelKey === "contact")!,
      ],
    },
  ];

  return (
    <footer className="w-full border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-5 sm:col-span-2 md:col-span-1">
            <Logo />

            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("description")}
            </p>

            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ heading, items }) => (
            <div key={heading}>
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {heading}
              </p>

              <ul className="flex flex-col gap-3">
                {items.map(({ labelKey, href }) => (
                  <li key={labelKey}>
                    <Link
                      href={href!}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {nav(labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {year} TAF Việt. {t("copyright")}
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/chinh-sach-bao-mat"
              className="transition-colors hover:text-foreground"
            >
              {t("privacyPolicy")}
            </Link>

            <Link
              href="/dieu-khoan-su-dung"
              className="transition-colors hover:text-foreground"
            >
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
