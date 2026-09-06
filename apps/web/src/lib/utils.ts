import { resolvePortfolioImage } from "./media";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Resolve an image path stored by the API (e.g. /uploads/x.png). Relative paths are proxied by Next rewrites. */
export function imgUrl(path?: string | null) {
  if (!path) return "";
  path = resolvePortfolioImage(path);
  if (/^https?:\/\//.test(path) || path.startsWith("data:")) return path;
  return path.startsWith("/") ? path : `/${path}`;
}

export const CATEGORIES: Record<string, Record<Locale, string>> = {
  website: { ar: "مواقع", en: "Websites", ckb: "ماڵپەڕ" },
  "web-app": { ar: "تطبيقات ويب", en: "Web apps", ckb: "ئەپەکانی وێب" },
  ecommerce: {
    ar: "متاجر إلكترونية",
    en: "E-commerce",
    ckb: "فرۆشگای ئەلیکترۆنی",
  },
  dashboard: { ar: "لوحات تحكم", en: "Dashboards", ckb: "داشبۆرد" },
  mobile: { ar: "تطبيقات جوال", en: "Mobile apps", ckb: "ئەپی مۆبایل" },
  erp: { ar: "أنظمة إدارية", en: "ERP systems", ckb: "سیستەمی بەڕێوەبردن" },
  ai: { ar: "ذكاء اصطناعي", en: "AI solutions", ckb: "زیرەکی دەستکرد" },
  automation: { ar: "أتمتة", en: "Automation", ckb: "خۆکارکردن" },
  education: { ar: "منصات تعليمية", en: "Education", ckb: "پلاتفۆرمی فێرکاری" },
  saas: { ar: "منصات SaaS", en: "SaaS platforms", ckb: "پلاتفۆرمی SaaS" },
  other: { ar: "أخرى", en: "Other", ckb: "هی تر" },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES);

export function categoryLabel(c?: string, locale: Locale = "ar") {
  const entry = c ? CATEGORIES[c] : undefined;
  if (entry) return entry[locale];
  return c || CATEGORIES.other[locale];
}

export function formatDate(d: string | Date, locale: Locale = "ar") {
  return new Intl.DateTimeFormat(
    locale === "ar" ? "ar-IQ" : locale === "ckb" ? "ckb-IQ" : "en-GB",
    { dateStyle: "medium", timeStyle: "short" },
  ).format(new Date(d));
}
