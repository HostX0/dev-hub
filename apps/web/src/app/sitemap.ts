import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/config";
import { SITE_URL, alternates } from "@/lib/seo";
import { articles } from "@/lib/articles";
import { api } from "@/lib/api";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await api.projects();
  const pages: { path: string; modified?: string }[] = [
    { path: "" },
    { path: "/projects" },
    { path: "/blog" },
    ...articles.map((a) => ({
      path: `/blog/${a.slug}`,
      modified: a.publishedAt,
    })),
    ...projects.map((p) => ({
      path: `/projects/${encodeURIComponent(p.slug)}`,
      modified: p.updatedAt,
    })),
  ];
  return pages.flatMap((p) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${p.path}`,
      ...(p.modified ? { lastModified: new Date(p.modified) } : {}),
      alternates: { languages: alternates(locale, p.path).languages },
    })),
  );
}
