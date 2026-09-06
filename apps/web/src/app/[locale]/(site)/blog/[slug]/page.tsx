import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowUpLeft,
  Check,
  BookOpen,
} from "lucide-react";
import { resolveLocale } from "@/i18n";
import { blogCopy } from "@/i18n/blog";
import {
  hasArticleTranslation,
  readingMinutes,
  articleDate,
} from "@/lib/articles";
import { api } from "@/lib/api";
import { SITE_URL, alternates, jsonLd } from "@/lib/seo";
import { ArticleCard } from "@/components/blog/ArticleCard";
type Props = { params: Promise<{ locale: string; slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l, slug } = await params,
    locale = resolveLocale(l),
    article = await api.article(slug);
  if (!article || !hasArticleTranslation(article, locale))
    return {
      title: blogCopy[locale].empty,
      robots: { index: false, follow: false },
    };
  const c = article.translations[locale];
  return {
    title: c.title,
    description: c.description,
    alternates: alternates(locale, `/blog/${slug}`),
    openGraph: {
      type: "article",
      title: c.title,
      description: c.description,
      url: `/${locale}/blog/${slug}`,
      publishedTime: `${article.publishedAt}T00:00:00Z`,
      authors: ["DevsHub.cc"],
      images: [
        {
          url: "/brand/hero-monolith.webp",
          width: 1200,
          height: 1200,
          alt: `DevsHub.cc — ${blogCopy[locale].nav}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: c.title,
      description: c.description,
      images: ["/brand/hero-monolith.webp"],
    },
  };
}
export default async function ArticlePage({ params }: Props) {
  const { locale: l, slug } = await params,
    locale = resolveLocale(l),
    article = await api.article(slug);
  if (!article || !hasArticleTranslation(article, locale)) notFound();
  const articles = (await api.articles()).filter((a) =>
    hasArticleTranslation(a, locale),
  );
  const c = article.translations[locale],
    t = blogCopy[locale];
  const sourceLabel = (source: { title: string; url: string }) => {
    if (locale === "en" && !/[\u0600-\u06ff]/.test(source.title))
      return source.title;
    try {
      return `${t.source}: ${new URL(source.url).hostname.replace(/^www\./, "")}`;
    } catch {
      return t.source;
    }
  };
  const Back = locale === "en" ? ArrowLeft : ArrowRight,
    Arrow = locale === "en" ? ArrowUpRight : ArrowUpLeft;
  const url = `${SITE_URL}/${locale}/blog/${slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: c.title,
        description: c.description,
        datePublished: `${article.publishedAt}T00:00:00Z`,
        inLanguage: locale,
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: "DevsHub.cc", url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: "DevsHub.cc",
          url: SITE_URL,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/mark.svg` },
        },
        articleSection: t[article.category],
        citation: article.sources.map((s) => s.url),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t.breadcrumbHome,
            item: `${SITE_URL}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t.nav,
            item: `${SITE_URL}/${locale}/blog`,
          },
          { "@type": "ListItem", position: 3, name: c.title, item: url },
        ],
      },
    ],
  };
  return (
    <div className="surface-light pb-20 pt-28 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <div className="container-x">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg"
        >
          <Back className="size-4" />
          {t.back}
        </Link>
        <header className="max-w-5xl py-9 md:py-12">
          <p className="eyebrow text-brand-2">{t[article.category]}</p>
          <h1 className="mt-5 text-[clamp(2rem,4.3vw,3.7rem)] font-bold leading-[1.25] tracking-tight">
            {c.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-[1.85] text-muted">
            {c.excerpt}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span className="font-medium text-fg">{t.author}</span>
            <span>
              {t.published}{" "}
              <time dateTime={article.publishedAt}>
                {articleDate(article.publishedAt, locale)}
              </time>
            </span>
            <span>
              {readingMinutes(c)} {t.minutes}
            </span>
          </div>
        </header>
        <div className="grid items-start gap-10 border-t border-line pt-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16 xl:gap-24">
          <article className="min-w-0 max-w-[780px]">
            <section
              aria-labelledby="takeaways-heading"
              className="mb-12 rounded-xl bg-[#0A0A0B] p-6 text-white sm:p-8"
            >
              <h2
                id="takeaways-heading"
                className="mb-5 flex items-center gap-3 text-lg font-bold"
              >
                <BookOpen className="size-5 text-[#A5A7FA]" />
                {t.takeaways}
              </h2>
              <ul className="space-y-4">
                {c.takeaways.map((text) => (
                  <li
                    key={text}
                    className="flex gap-3 text-base leading-[1.85] text-[#E2E6F0]"
                  >
                    <Check className="mt-1.5 size-4 shrink-0 text-[#34D399]" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </section>
            <details className="mb-12 rounded-xl border border-line bg-white p-5 lg:hidden">
              <summary className="cursor-pointer font-bold">{t.toc}</summary>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed">
                {c.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-muted hover:text-brand-2"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
            <div className="article-body">
              {c.sections.map((section, i) => (
                <section
                  id={section.id}
                  key={section.id}
                  className="scroll-mt-28"
                >
                  <h2>
                    <span
                      className="me-3 font-display text-sm font-medium text-brand-2"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, j) => (
                    <p key={j}>{paragraph}</p>
                  ))}
                  {section.bullets?.length ? (
                    <ul>
                      {section.bullets.map((bullet, j) => (
                        <li key={j}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.sourceIds?.length ? (
                    <div className="article-citations">
                      <span>{t.source}: </span>
                      {section.sourceIds.map((id) => {
                        const source = article.sources.find((s) => s.id === id);
                        return source ? (
                          <a
                            key={id}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {sourceLabel(source)}
                            <span className="sr-only"> ↗</span>
                          </a>
                        ) : null;
                      })}
                    </div>
                  ) : null}
                </section>
              ))}
              <section id="next-step" className="scroll-mt-28">
                <h2>{t.conclusion}</h2>
                <p>{c.conclusion}</p>
              </section>
            </div>
            <section
              id="sources"
              className="mt-12 scroll-mt-28 border-t border-line pt-8"
            >
              <h2 className="text-xl font-bold">{t.sources}</h2>
              <p className="mt-2 text-sm text-muted">
                {t.reviewed}:{" "}
                <time dateTime={article.publishedAt}>
                  {articleDate(article.publishedAt, locale)}
                </time>
              </p>
              <ol className="mt-6 list-decimal space-y-4 ps-5 text-sm leading-relaxed">
                {article.sources.map((source) => (
                  <li key={source.id}>
                    <a
                      className="break-words text-brand-2 underline underline-offset-4"
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {sourceLabel(source)} ↗
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          </article>
          <aside className="sticky top-28 hidden border-s border-line ps-7 lg:block">
            <p className="mb-6 text-sm font-bold">{t.toc}</p>
            <nav aria-label={t.toc}>
              <ol className="space-y-4">
                {c.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-sm leading-relaxed text-muted transition-colors hover:text-brand-2"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#sources" className="text-sm text-brand-2">
                    {t.sources}
                  </a>
                </li>
              </ol>
            </nav>
            <Link
              href={`/${locale}/#contact`}
              className="mt-8 inline-flex min-h-11 items-center gap-3 text-sm font-bold"
            >
              {t.cta}
              <Arrow className="size-4" />
            </Link>
          </aside>
        </div>
        <section className="mt-16 flex flex-col justify-between gap-7 rounded-2xl bg-[#0A0A0B] p-8 text-white md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="text-2xl font-bold">{t.ctaTitle}</h2>
            <p className="mt-3 max-w-xl leading-relaxed text-[#BDC3D0]">
              {t.ctaText}
            </p>
          </div>
          <Link
            href={`/${locale}/#contact`}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-4 rounded-lg bg-[#5B5EE8] px-7 text-sm font-bold"
          >
            {t.cta}
            <Arrow className="size-4" />
          </Link>
        </section>
        <section className="mt-16">
          <h2 className="mb-7 text-2xl font-bold">{t.next}</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {articles
              .filter((a) => a.slug !== slug)
              .slice(0, 2)
              .map((a) => (
                <ArticleCard
                  key={a.slug}
                  article={a}
                  locale={locale}
                  index={articles.indexOf(a)}
                />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
