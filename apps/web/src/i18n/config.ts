export const LOCALES = ["ar", "en", "ckb"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ar";
export const LOCALE_COOKIE = "dh_locale";
export const LOCALE_NAMES: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  ckb: "کوردی",
};
export const HREFLANG: Record<Locale, string> = {
  ar: "ar",
  en: "en",
  ckb: "ku-Arab",
};
export const OG_LOCALE: Record<Locale, string> = {
  ar: "ar_IQ",
  en: "en_US",
  ckb: "ckb_IQ",
};
export const isLocale = (v: unknown): v is Locale =>
  typeof v === "string" && (LOCALES as readonly string[]).includes(v);
export const dirOf = (l: Locale): "rtl" | "ltr" => (l === "en" ? "ltr" : "rtl");

export function preferredLocale(header: string): Locale {
  const preferences = header
    .split(",")
    .map((entry, order) => {
      const [tag, ...params] = entry.trim().toLowerCase().split(";");
      const quality = params.find((p) => p.trim().startsWith("q="));
      return { tag, q: quality ? Number(quality.trim().slice(2)) : 1, order };
    })
    .filter((p) => Number.isFinite(p.q) && p.q > 0 && p.q <= 1)
    .sort((a, b) => b.q - a.q || a.order - b.order);
  for (const { tag } of preferences) {
    const language = tag.split("-")[0];
    if (language === "ckb" || language === "ku") return "ckb";
    if (isLocale(language)) return language;
  }
  return DEFAULT_LOCALE;
}

/** Preserve the current page when changing language. */
export function switchLocalePath(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  if (isLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
}
