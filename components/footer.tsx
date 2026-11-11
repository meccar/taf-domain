"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Logo from "./logo";
import { navigation } from "@/const/items/navigation.const";
import { useTranslations } from "next-intl";

export default function Footer() {
  const nav = useTranslations("Navigation");
  const t = useTranslations("Footer");

  const socialLinks = [
    {
      Icon: FaFacebook,
      href: "https://www.facebook.com/profile.php?id=61594757558743",
      labelKey: "facebook",
    },
    {
      Icon: FaLinkedin,
      href: "https://www.linkedin.com/company/tafviet",
      labelKey: "linkedin",
    },
    {
      Icon: MessageCircle,
      href: "https://zalo.me/0936378955",
      labelKey: "zalo",
    },
  ];

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

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  {t("officeAddressLabel")}:
                </span>{" "}
                {t("officeAddressValue")}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  {t("taxIdLabel")}:
                </span>{" "}
                {t("taxIdValue")}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  {t("emailLabel")}:
                </span>{" "}
                <a
                  href="mailto:admin@taf.asia"
                  className="transition-colors hover:text-foreground"
                >
                  admin@taf.asia
                </a>
              </p>
            </div>

            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, labelKey }) => (
                <a
                  key={labelKey}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t(`social.${labelKey}`)}
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
