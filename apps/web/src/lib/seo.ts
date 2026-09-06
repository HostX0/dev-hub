import { LOCALES, HREFLANG, type Locale } from "@/i18n/config";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://devshub.cc"
).replace(/\/$/, "");
export function alternates(locale: Locale, path = "") {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [HREFLANG[l], `${SITE_URL}/${l}${path}`]),
      ),
      "x-default": `${SITE_URL}/ar${path}`,
    },
  };
}
export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
