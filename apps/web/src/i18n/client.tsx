"use client";

import { createContext, useContext } from "react";
import type { Dict } from "./dictionaries/ar";
import { dirOf, type Locale } from "./config";

type Ctx = { locale: Locale; dir: "rtl" | "ltr"; t: Dict };
const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ locale, dict, children }: { locale: Locale; dict: Dict; children: React.ReactNode }) {
  return <I18nCtx.Provider value={{ locale, dir: dirOf(locale), t: dict }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/** Prefix a site-relative href with the current locale: href("/projects") -> "/ar/projects" */
export const localeHref = (locale: Locale, href: string) => (href.startsWith("/") ? `/${locale}${href === "/" ? "" : href}` : href);
