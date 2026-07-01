import Link from "next/link";
import { Facebook, Linkedin, Youtube } from "lucide-react";
import Logo from "./logo";
import { useEffect, useState } from "react";

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
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="flex flex-col gap-5 sm:col-span-2 md:col-span-1">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
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
                  className="w-8 h-8 flex items-center justify-center rounded-full border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
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

        {/* Bottom bar */}
        <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {year} TAF Việt. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link
              href="/chinh-sach-bao-mat"
              className="hover:text-foreground transition-colors"
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="/dieu-khoan-su-dung"
              className="hover:text-foreground transition-colors"
            >
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
