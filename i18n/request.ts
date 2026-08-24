import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { defaultLocale, isValidLocale, type Locale } from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  let locale: Locale = defaultLocale;

  if (isValidLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    const headerList = await headers();
    const preferred = headerList
      .get("accept-language")
      ?.split(",")[0]
      ?.split("-")[0];
    if (isValidLocale(preferred)) locale = preferred;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
