import "server-only";
import { applyBrandDefaults } from "./brand";
import type { Project, Service, SiteSettings } from "./types";
import { DEFAULT_SETTINGS } from "./types";
import type { Article } from "./articles";

// Render/Railway-style platforms hand out an internal "host:port" via fromService wiring,
// with no protocol — add one so this stays a valid absolute fetch URL.
const rawApiUrl = process.env.API_URL ?? "http://localhost:4000";
const API_URL = /^https?:\/\//.test(rawApiUrl)
  ? rawApiUrl
  : `http://${rawApiUrl}`;

/** CMS publication changes must apply on the next request, including across server replicas. */
async function get<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}/api${path}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export const api = {
  settings: async (): Promise<SiteSettings> => {
    const saved = await get<Partial<SiteSettings>>("/settings", {});
    return applyBrandDefaults({
      ...DEFAULT_SETTINGS,
      ...saved,
      heroTitleEn: saved.heroTitleEn,
      heroTitleCkb: saved.heroTitleCkb,
      heroSubtitleEn: saved.heroSubtitleEn,
      heroSubtitleCkb: saved.heroSubtitleCkb,
      bioEn: saved.bioEn,
      bioCkb: saved.bioCkb,
      locationEn: saved.locationEn,
      locationCkb: saved.locationCkb,
    });
  },
  services: () => get<Service[]>("/services", []),
  projects: (featured = false) =>
    get<Project[]>(`/projects${featured ? "?featured=1" : ""}`, []),
  project: (slug: string) =>
    get<Project | null>(`/projects/${encodeURIComponent(slug)}`, null),
  articles: () => get<Article[]>("/articles", []),
  article: (slug: string) =>
    get<Article | null>(`/articles/${encodeURIComponent(slug)}`, null),
};
