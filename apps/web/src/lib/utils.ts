import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Resolve an image path stored by the API (e.g. /uploads/x.png). Relative paths are proxied by Next rewrites. */
export function imgUrl(path?: string | null) {
  if (!path) return "";
  if (/^https?:\/\//.test(path) || path.startsWith("data:")) return path;
  return path.startsWith("/") ? path : `/${path}`;
}

export const CATEGORIES: Record<string, { ar: string; en: string }> = {
  website: { ar: "مواقع", en: "Websites" },
  "web-app": { ar: "تطبيقات ويب", en: "Web apps" },
  ecommerce: { ar: "متاجر إلكترونية", en: "E-commerce" },
  dashboard: { ar: "لوحات تحكم", en: "Dashboards" },
  mobile: { ar: "تطبيقات جوال", en: "Mobile apps" },
  erp: { ar: "أنظمة إدارية", en: "ERP systems" },
  ai: { ar: "ذكاء اصطناعي", en: "AI solutions" },
  automation: { ar: "أتمتة", en: "Automation" },
  education: { ar: "منصات تعليمية", en: "Education" },
  saas: { ar: "منصات SaaS", en: "SaaS platforms" },
  other: { ar: "أخرى", en: "Other" },
};

export const CATEGORY_KEYS = Object.keys(CATEGORIES);

export function categoryLabel(c?: string, locale: Locale = "ar") {
  const entry = c ? CATEGORIES[c] : undefined;
  if (entry) return entry[locale];
  return c || CATEGORIES.other[locale];
}

export function formatDate(d: string | Date, locale: Locale = "ar") {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(d));
}
