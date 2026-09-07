import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  ArrowUpRight,
  ArrowUpLeft,
  Lightbulb,
  Layers,
  Code2,
} from "lucide-react";
import { resolveLocale } from "@/i18n";
import { blogCopy } from "@/i18n/blog";
import {
  hasArticleTranslation,
  readingMinutes,
  type ArticleCategory,
} from "@/lib/articles";
import { api } from "@/lib/api";
import { alternates } from "@/lib/seo";
import { ArticleCard } from "@/components/blog/ArticleCard";
const categories: ArticleCategory[] = ["product", "engineering", "growth"];
type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    category?: string | string[];
    q?: string | string[];
  }>;
};
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale),
    t = blogCopy[locale];
  const filters = await searchParams;
  return {
    title: t.nav,
    description: t.description,
    alternates: alternates(locale, "/blog"),
    openGraph: {
      title: `${t.title} ${t.accent}`,
      description: t.description,
      url: `/${locale}/blog`,
    },
    ...(filters.q || filters.category
      ? { robots: { index: false, follow: true } }
      : {}),
  };
}
export default async function BlogPage({ params, searchParams }: Props) {
  const locale = resolveLocale((await params).locale),
    t = blogCopy[locale];
  const articles = (await api.articles()).filter((a) =>
    hasArticleTranslation(a, locale),
  );
  const filters = await searchParams;
  const q = Array.isArray(filters.q) ? filters.q[0] : (filters.q ?? "");
  const requestedCategory = Array.isArray(filters.category)
    ? filters.category[0]
    : filters.category;
  const category = categories.includes(requestedCategory as ArticleCategory)
    ? requestedCategory!
    : "";
  const query = q.trim().slice(0, 120);
  const filtered = articles.filter(
    (a) =>
      (!category || a.category === category) &&
      (!query ||
        [
          a.translations[locale].title,
          a.translations[locale].excerpt,
          ...a.translations[locale].sections.map((s) => s.heading),
        ]
          .join(" ")
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase())),
  );
  const featured = articles[0],
    f = featured?.translations[locale];
  const Arrow = locale === "en" ? ArrowUpRight : ArrowUpLeft;
  return (
    <div className="surface-light pb-20 pt-32 md:pt-40">
      <div className="container-x">
        <div className="grid gap-8 border-b border-line pb-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">
              <span className="size-1.5 bg-brand" />
              {t.eyebrow}
            </p>
            <h1 className="mt-6 text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.15] tracking-tight">
              {t.title}
              <br />
              <span className="text-brand-2">{t.accent}</span>
            </h1>
          </div>
          <p className="max-w-lg text-lg leading-[1.85] text-muted">
            {t.description}
          </p>
        </div>
        {!category && !query && featured && f && (
          <article className="my-10 grid overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-[1.2fr_1fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="eyebrow text-brand-2">{t.featured}</p>
              <h2 className="mt-6 text-2xl font-bold leading-snug sm:text-3xl">
                <Link
                  href={`/${locale}/blog/${featured.slug}`}
                  className="hover:underline decoration-brand underline-offset-4"
                >
                  {f.title}
                </Link>
              </h2>
              <p className="mt-5 text-base leading-[1.85] text-muted">
                {f.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Link
                  href={`/${locale}/blog/${featured.slug}`}
                  className="inline-flex min-h-12 items-center gap-4 rounded-lg bg-[#0A0A0B] px-6 text-sm font-bold text-white"
                >
                  {t.read}
                  <Arrow className="size-4" />
                </Link>
                <span className="text-sm text-muted">
                  {readingMinutes(f)} {t.minutes}
                </span>
              </div>
            </div>
            <div className="journal-diagram flex flex-col justify-center bg-[#0A0A0B] p-8 text-white sm:p-12">
              <span
                className="font-display text-xs uppercase tracking-[.18em] text-[#A5A7FA]"
                dir="ltr"
              >
                {locale === "en"
                  ? "PRODUCT / PEOPLE / POSSIBILITIES"
                  : locale === "ar"
                    ? "المنتج / الفريق / الإمكانات"
                    : "بەرهەم / تیم / ئەگەرەکان"}
              </span>
              <ol className="my-10 space-y-5">
                {[
                  { label: t.discover, icon: Lightbulb },
                  { label: t.define, icon: Layers },
                  { label: t.build, icon: Code2 },
                ].map(({ label, icon: Icon }, i) => (
                  <li key={label} className="flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/5">
                      <Icon className="size-5 text-[#A5A7FA]" />
                    </span>
                    <span className="text-lg font-medium">{label}</span>
                    <span className="ms-auto font-display text-xs text-[#A8AFBE]">
                      0{i + 1}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="border-t border-white/15 pt-5 text-sm leading-relaxed text-[#BDC3D0]">
                {t.note}
              </p>
            </div>
          </article>
        )}
        <div className="my-10 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <nav aria-label={t.all} className="flex flex-wrap gap-2">
            {["", ...categories].map((c) => (
              <Link
                key={c}
                href={`/${locale}/blog${c || query ? `?${new URLSearchParams({ ...(c ? { category: c } : {}), ...(query ? { q: query } : {}) })}` : ""}`}
                aria-current={category === c ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors ${category === c ? "border-[#0A0A0B] bg-[#0A0A0B] text-white" : "border-line bg-white text-muted hover:border-brand hover:text-fg"}`}
              >
                {c ? t[c as ArticleCategory] : t.all}
              </Link>
            ))}
          </nav>
          <form
            action={`/${locale}/blog`}
            role="search"
            className="flex w-full items-center rounded-lg border border-line bg-white xl:max-w-sm"
          >
            <label htmlFor="insights-search" className="sr-only">
              {t.search}
            </label>
            <Search
              className="ms-4 size-4 shrink-0 text-muted"
              aria-hidden="true"
            />
            <input
              id="insights-search"
              name="q"
              defaultValue={query}
              maxLength={120}
              placeholder={t.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-fg outline-offset-[-3px]"
            />
            {category && (
              <input type="hidden" name="category" value={category} />
            )}
            <button
              type="submit"
              className="min-h-11 px-4 text-sm font-bold text-brand-2"
            >
              {t.searchAction}
            </button>
          </form>
        </div>
        <p className="mb-5 text-sm text-muted" aria-live="polite">
          {filtered.length} {t.count}
          {(category || query) && (
            <Link
              href={`/${locale}/blog`}
              className="ms-4 text-brand-2 underline underline-offset-4"
            >
              {t.clear}
            </Link>
          )}
        </p>
        {filtered.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((a) => (
              <ArticleCard
                key={a.slug}
                article={a}
                locale={locale}
                index={articles.indexOf(a)}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-line bg-white p-12 text-center text-muted">
            {t.empty}
          </p>
        )}
      </div>
    </div>
  );
}
