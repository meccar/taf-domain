import Link from "next/link";
import { Sparkles, Facebook, Linkedin, Youtube } from "lucide-react";
import Logo from "./logo";

const footerLinks = [
  {
    heading: "Dịch vụ",
    items: [
      { label: "Kế toán", href: "/dich-vu/ke-toan" },
      { label: "Khai báo thuế", href: "/dich-vu/thue" },
      { label: "Tư vấn tài chính", href: "/dich-vu/tu-van" },
      { label: "Kiểm toán nội bộ", href: "/dich-vu/kiem-toan" },
    ],
  },
  {
    heading: "Công ty",
    items: [
      { label: "Về chúng tôi", href: "/ve-chung-toi" },
      { label: "Đội ngũ", href: "/doi-ngu" },
      { label: "Bài viết", href: "/bai-viet" },
      { label: "Liên hệ", href: "/lien-he" },
    ],
  },
  {
    heading: "Liên hệ",
    items: [
      { label: "info@tafviet.vn", href: "mailto:info@tafviet.vn" },
      { label: "+84 936 378 955", href: "tel:0936378955" },
      { label: "Hà Nội, Việt Nam", href: "#" },
    ],
  },
];

const socialLinks = [
  { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 mb-10">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dịch vụ kế toán và tư vấn thuế uy tín tại Việt Nam.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full border text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {/* Right — Link columns */}
          {footerLinks.map(({ heading, items }) => (
            <div key={heading}>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
                {heading}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
