/** Original portfolio SVGs retain readable Arabic text; the old raster exports lost those glyphs. */
const ORIGINAL_ARTWORK: Record<string, string> = {
  "/uploads/seed/ayadati-cover.webp": "/uploads/seed/ayadati-cover.svg",
  "/uploads/seed/ayadati-detail.webp": "/uploads/seed/ayadati-detail.svg",
  "/uploads/seed/dijla-cover.webp": "/uploads/seed/dijla-cover.svg",
  "/uploads/seed/dijla-detail.webp": "/uploads/seed/dijla-detail.svg",
  "/uploads/seed/kashier-cover.webp": "/uploads/seed/kashier-cover.svg",
  "/uploads/seed/kashier-detail.webp": "/uploads/seed/kashier-detail.svg",
  "/uploads/seed/law-dash-cover.webp": "/uploads/seed/law-dash-cover.svg",
  "/uploads/seed/law-dash-detail.webp": "/uploads/seed/law-dash-detail.svg",
  "/uploads/seed/law-site-cover.webp": "/uploads/seed/law-site-cover.svg",
  "/uploads/seed/law-site-detail.webp": "/uploads/seed/law-site-detail.svg",
  "/uploads/seed/rawatib-cover.webp": "/uploads/seed/rawatib-cover.svg",
  "/uploads/seed/rawatib-detail.webp": "/uploads/seed/rawatib-detail.svg",
  "/uploads/seed/souq-admin-cover.webp": "/uploads/seed/souq-admin-cover.svg",
  "/uploads/seed/souq-admin-detail.webp": "/uploads/seed/souq-admin-detail.svg",
  "/uploads/seed/souq-app-cover.webp": "/uploads/seed/souq-app-cover.svg",
  "/uploads/seed/souq-app-detail.webp": "/uploads/seed/souq-app-detail.svg",
  "/uploads/seed/souq-store-cover.webp": "/uploads/seed/souq-store-cover.svg",
  "/uploads/seed/souq-store-detail.webp": "/uploads/seed/souq-store-detail.svg",
};
export const resolvePortfolioImage = (path: string) =>
  ORIGINAL_ARTWORK[path] ?? path;
