import type { Locale } from "@/i18n/config";
import type { Project, Service, SiteSettings, Stat, Testimonial } from "./types";

/** Pick the English value when the locale is English and a translation exists, otherwise fall back to Arabic. */
export const pick = (locale: Locale, ar: string, en?: string | null) => (locale === "en" && en && en.trim() ? en : ar);
const pickList = (locale: Locale, ar: string[], en?: string[] | null) => (locale === "en" && en && en.length ? en : ar);

export function localizeProject(p: Project, locale: Locale): Project {
  return {
    ...p,
    title: pick(locale, p.title, p.titleEn),
    tagline: pick(locale, p.tagline, p.taglineEn),
    description: pick(locale, p.description, p.descriptionEn),
  };
}

export function localizeService(s: Service, locale: Locale): Service {
  return {
    ...s,
    title: pick(locale, s.title, s.titleEn),
    description: pick(locale, s.description, s.descriptionEn),
    features: pickList(locale, s.features ?? [], s.featuresEn),
  };
}

export function localizeSettings(s: SiteSettings, locale: Locale): SiteSettings {
  return {
    ...s,
    heroTitle: pick(locale, s.heroTitle, s.heroTitleEn),
    heroSubtitle: pick(locale, s.heroSubtitle, s.heroSubtitleEn),
    bio: pick(locale, s.bio, s.bioEn),
    location: pick(locale, s.location, s.locationEn),
    stats: (s.stats ?? []).map((st: Stat) => ({ ...st, label: pick(locale, st.label, st.labelEn) })),
    testimonials: (s.testimonials ?? []).map((t: Testimonial) => ({
      ...t,
      name: pick(locale, t.name, t.nameEn),
      role: pick(locale, t.role, t.roleEn),
      text: pick(locale, t.text, t.textEn),
    })),
  };
}
