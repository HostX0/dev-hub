import "server-only";
import type { Project, Service, SiteSettings } from "./types";
import { DEFAULT_SETTINGS } from "./types";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

/**
 * Site data is cached (tag "content") and purged by /api/revalidate whenever the admin saves something,
 * so public pages are served instantly without hitting the API on every request.
 */
async function get<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}/api${path}`, { next: { revalidate: 3600, tags: ["content"] } });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export const api = {
  settings: async (): Promise<SiteSettings> => ({ ...DEFAULT_SETTINGS, ...(await get<Partial<SiteSettings>>("/settings", {})) }),
  services: () => get<Service[]>("/services", []),
  projects: (featured = false) => get<Project[]>(`/projects${featured ? "?featured=1" : ""}`, []),
  project: (slug: string) => get<Project | null>(`/projects/${encodeURIComponent(slug)}`, null),
};
