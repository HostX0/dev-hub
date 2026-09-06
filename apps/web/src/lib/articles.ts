import type { Locale } from "@/i18n/config";
import productArticles from "@/content/articles/product.json";
import engineeringArticles from "@/content/articles/engineering.json";
export type ArticleCategory = "product" | "engineering" | "growth";
export type ArticleContent = {
  title: string;
  description: string;
  excerpt: string;
  takeaways: string[];
  sections: {
    id: string;
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    sourceIds?: string[];
  }[];
  conclusion: string;
};
export type Article = {
  slug: string;
  category: ArticleCategory;
  publishedAt: string;
  sources: { id: string; title: string; url: string }[];
  translations: Record<Locale, ArticleContent>;
};
export const articles: Article[] = [
  ...productArticles,
  ...engineeringArticles,
] as Article[];
export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);
export function readingMinutes(content: ArticleContent) {
  const text = [
    content.excerpt,
    ...content.takeaways,
    ...content.sections.flatMap((s) => [
      s.heading,
      ...s.paragraphs,
      ...(s.bullets ?? []),
    ]),
    content.conclusion,
  ].join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 190));
}
export function articleDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(
    locale === "ckb" ? "ckb-IQ" : locale === "ar" ? "ar-IQ" : "en-GB",
    { dateStyle: "long", timeZone: "UTC" },
  ).format(new Date(`${date}T00:00:00Z`));
}
