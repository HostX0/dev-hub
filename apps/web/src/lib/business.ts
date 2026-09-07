import { BUSINESS_CONTACT } from "./brand";
import type { SiteSettings, SocialLink } from "./types";
export { BUSINESS_CONTACT };
export const MAP_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(BUSINESS_CONTACT.locationEn);

/** Trim public contact values without restoring intentionally cleared fields. */
export function publicContactDetails(settings: Pick<SiteSettings, "email" | "phone" | "whatsapp" | "location">) {
  return {
    email: settings.email?.trim() ?? "",
    phone: settings.phone?.trim() ?? "",
    whatsapp: settings.whatsapp?.trim() ?? "",
    location: settings.location?.trim() ?? "",
  };
}
export function mapUrl(location: string): string {
  return location.trim() ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(location.trim()) : "";
}

/** Only public web destinations are accepted for social profile links. */
export function safeSocialUrl(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) return "";
  try {
    const url = new URL(value.trim());
    if (!["https:", "http:"].includes(url.protocol) || !url.hostname || url.username || url.password) return "";
    return url.href;
  } catch { return ""; }
}

/** An explicit list, including [], is authoritative over legacy fixed fields. */
export function normalizeSocialLinks(settings: Pick<SiteSettings, "socialLinks" | "socials">): SocialLink[] {
  const candidates = Array.isArray(settings.socialLinks)
    ? settings.socialLinks
    : Object.entries(settings.socials ?? {}).map(([platform, url]) => ({
        id: `legacy-${platform}`, platform,
        label: "", url, enabled: true,
      }));
  const ids = new Set<string>();
  return candidates.flatMap((link) => {
    if (!link || link.enabled !== true) return [];
    const url = safeSocialUrl(link.url);
    if (!url) return [];
    const id = typeof link.id === "string" && link.id.trim() ? link.id : `social-${ids.size}`;
    if (ids.has(id)) return [];
    ids.add(id);
    return [{ ...link, id, platform: link.platform || "custom", label: link.label || "", url, enabled: true } as SocialLink];
  });
}
