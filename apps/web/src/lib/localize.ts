import type { Locale } from "@/i18n/config";
import type { Project, Service, SiteSettings } from "./types";
import defaults from "@/content/sorani-defaults.json";

/** Missing CMS translations fall back to the Arabic source; custom content is never silently replaced. */
export const pick = (
  locale: Locale,
  ar: string,
  en?: string | null,
  ckb?: string | null,
) => {
  const translated = locale === "en" ? en : locale === "ckb" ? ckb : ar;
  return translated?.trim() ? translated : ar;
};
const pickList = (
  locale: Locale,
  ar: string[],
  en?: string[] | null,
  ckb?: string[] | null,
) => {
  const translated = locale === "en" ? en : locale === "ckb" ? ckb : ar;
  return translated?.length ? translated : ar;
};
const known = (source: unknown, original: unknown, translation?: string) =>
  source === original ? translation : undefined;
export function localizeProject(p: Project, locale: Locale): Project {
  const d = defaults.projects.find((d) => d.key === p.slug);
  return {
    ...p,
    title: pick(
      locale,
      p.title,
      p.titleEn,
      p.titleCkb || known(p.title, d?.source.title, d?.translation.title),
    ),
    tagline: pick(
      locale,
      p.tagline,
      p.taglineEn,
      p.taglineCkb ||
        known(p.tagline, d?.source.tagline, d?.translation.tagline),
    ),
    description: pick(
      locale,
      p.description,
      p.descriptionEn,
      p.descriptionCkb ||
        known(p.description, d?.source.description, d?.translation.description),
    ),
    client:
      locale === "ckb"
        ? p.clientCkb ||
          known(p.client, d?.source.client, d?.translation.client) ||
          p.client
        : p.client,
  };
}
export function localizeService(s: Service, locale: Locale): Service {
  const d = defaults.services.find((d) => d.source.title === s.title);
  return {
    ...s,
    title: pick(locale, s.title, s.titleEn, s.titleCkb || d?.translation.title),
    description: pick(
      locale,
      s.description,
      s.descriptionEn,
      s.descriptionCkb ||
        known(s.description, d?.source.description, d?.translation.description),
    ),
    features: pickList(
      locale,
      s.features ?? [],
      s.featuresEn,
      s.featuresCkb?.length
        ? s.featuresCkb
        : JSON.stringify(s.features) === JSON.stringify(d?.source.features)
          ? d?.translation.features
          : undefined,
    ),
  };
}
export function localizeSettings(
  s: SiteSettings,
  locale: Locale,
): SiteSettings {
  return {
    ...s,
    team: s.team?.map((member) => ({
      ...member,
      role: pick(locale, member.role, member.roleEn, member.roleCkb),
      focus: pick(locale, member.focus, member.focusEn, member.focusCkb),
    })),
    heroTitle: pick(locale, s.heroTitle, s.heroTitleEn, s.heroTitleCkb),
    heroSubtitle: pick(
      locale,
      s.heroSubtitle,
      s.heroSubtitleEn,
      s.heroSubtitleCkb,
    ),
    bio: pick(locale, s.bio, s.bioEn, s.bioCkb),
    location: pick(locale, s.location, s.locationEn, s.locationCkb),
    clients:
      locale === "ckb"
        ? (s.clients ?? []).map(
            (c) =>
              defaults.clients.find((d) => d.source === c)?.translation ?? c,
          )
        : s.clients,
    stats: (s.stats ?? []).map((st) => ({
      ...st,
      label: pick(
        locale,
        st.label,
        st.labelEn,
        st.labelCkb ||
          defaults.stats.find((d) => d.source.label === st.label)?.translation
            .label,
      ),
    })),
    testimonials: (s.testimonials ?? []).map((t) => {
      const d = defaults.testimonials.find((d) => d.source.text === t.text);
      return {
        ...t,
        name: pick(
          locale,
          t.name,
          t.nameEn,
          t.nameCkb || known(t.name, d?.source.name, d?.translation.name),
        ),
        role: pick(
          locale,
          t.role,
          t.roleEn,
          t.roleCkb || known(t.role, d?.source.role, d?.translation.role),
        ),
        text: pick(locale, t.text, t.textEn, t.textCkb || d?.translation.text),
      };
    }),
  };
}
