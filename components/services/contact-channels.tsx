import { Mail, MessageCircle, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

type Channels = { zalo?: string; phone?: string; email?: string };

/**
 * Quick ways to reach the firm without filling a form (Zalo is the default
 * channel for many Vietnamese SMEs). Only channels with a value are shown;
 * leave a value empty in messages to hide it. Renders nothing if all empty.
 */
export async function ContactChannels() {
  const t = await getTranslations("ServicePageLayout");
  const channels = (t.raw("channels") as Channels) ?? {};

  const digits = (value: string) => value.replace(/[^\d+]/g, "");
  const items = [
    channels.zalo && {
      key: "zalo",
      href: `https://zalo.me/${digits(channels.zalo)}`,
      label: t("zaloLabel"),
      Icon: MessageCircle,
      external: true,
    },
    channels.phone && {
      key: "phone",
      href: `tel:${digits(channels.phone)}`,
      label: `${t("phoneLabel")}: ${channels.phone}`,
      Icon: Phone,
      external: false,
    },
    channels.email && {
      key: "email",
      href: `mailto:${channels.email}`,
      label: t("emailLabel"),
      Icon: Mail,
      external: false,
    },
  ].filter(Boolean) as Array<{
    key: string;
    href: string;
    label: string;
    Icon: typeof Mail;
    external: boolean;
  }>;

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
      <div className="flex flex-col items-start gap-3 rounded-lg border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-sm font-medium text-foreground">
          {t("channelsTitle")}
        </p>
        <div className="flex flex-wrap gap-3">
          {items.map(({ key, href, label, Icon, external }) => (
            <a
              key={key}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-royal-blue/40 hover:text-royal-blue"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
