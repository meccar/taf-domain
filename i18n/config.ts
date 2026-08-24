export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export const localeLabels: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

export function isValidLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
