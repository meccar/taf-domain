import Link from "next/link";

const footerLinks = [
  {
    heading: "Landings",
    items: [
      { label: "Travel", href: "/travel" },
      { label: "SaaS", href: "/saas" },
      { label: "Startup", href: "/startup" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "E-Learning", href: "/e-learning" },
      { label: "Real Estate", href: "/real-estate" },
      { label: "Logistics", href: "/logistics" },
      { label: "Agency", href: "/agency" },
    ],
  },
  {
    heading: "Secondary Pages",
    items: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Blog Detail", href: "/blog/detail" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Account Pages",
    items: [
      { label: "Sign Up", href: "/sign-up" },
      { label: "Sign In", href: "/sign-in" },
      { label: "Error", href: "/error" },
      { label: "Password Reset", href: "/password-reset" },
      { label: "Account General", href: "/account" },
    ],
  },
];

const socialLinks = [
  { icon: "pi pi-youtube", href: "https://youtube.com", label: "YouTube" },
  { icon: "pi pi-twitter", href: "https://x.com", label: "X" },
  { icon: "pi pi-discord", href: "https://discord.com", label: "Discord" },
];

export default function Footer() {
  return (
    <footer className="w-full surface-section border-top-1 surface-border">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12">
        <div className="flex flex-col justify-between gap-12 min-w-[180px]">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <i className="pi pi-prime text-2xl text-color" />
            <span className="text-xl font-bold text-color">TAF Viet</span>
          </Link>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-10 h-10 rounded-full border-1 surface-border surface-card text-color-secondary hover:text-color transition-colors duration-200"
              >
                <i className={`${icon} text-sm`} />
              </a>
            ))}
          </div>
        </div>

        {/* Right — Link columns */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {footerLinks.map(({ heading, items }) => (
            <div key={heading} className="flex flex-col gap-5">
              <h3 className="text-base font-semibold text-color m-0">
                {heading}
              </h3>
              <ul className="list-none p-0 m-0 flex flex-col gap-4">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-color-secondary hover:text-color no-underline transition-colors duration-200 text-sm"
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
