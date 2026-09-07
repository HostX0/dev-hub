import type { MetadataRoute } from "next";
import { LOCALES, type Locale } from "@/i18n/config";
import { SITE_URL, alternates } from "@/lib/seo";
import { hasArticleTranslation } from "@/lib/articles";
import { api } from "@/lib/api";
import { localizeProject } from "@/lib/localize";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articles] = await Promise.all([
    api.projects(),
    api.articles(),
  ]);
  const pages: {
    path: string;
    modified?: string;
    locales?: readonly Locale[];
  }[] = [
    { path: "" },
    { path: "/projects" },
    { path: "/blog" },
    { path: "/demos" },
    ...articles.map((a) => ({
      path: `/blog/${a.slug}`,
      modified: a.publishedAt,
      locales: LOCALES.filter((l) => hasArticleTranslation(a, l)),
    })),
    ...projects.map((p) => ({
      path: `/projects/${encodeURIComponent(p.slug)}`,
      modified: p.updatedAt,
      locales: LOCALES.filter((l) => !!localizeProject(p, l).title),
    })),
  ];
  return pages.flatMap((p) =>
    (p.locales ?? LOCALES).map((locale) => ({
      url: `${SITE_URL}/${locale}${p.path}`,
      ...(p.modified ? { lastModified: new Date(p.modified) } : {}),
      alternates: {
        languages: alternates(locale, p.path, p.locales ?? LOCALES).languages,
      },
    })),
  );
}
