export const LOCALES = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
] as const;

export const DEFAULT_LOCALE = "vi";

const OG_LOCALE: Record<string, string> = { vi: "vi_VN", en: "en_US" };

export const LOCALE_PREFIXED = false;

export type LocaleCode = (typeof LOCALES)[number]["code"];

export interface TranslationDraft {
  title: string;
  excerpt: string;
  content: string;
  author: string;
}

export const emptyDraft: TranslationDraft = {
  title: "",
  excerpt: "",
  content: "",
  author: "TAF Việt",
};
