import Link from "next/link";
import {
  ArrowUpLeft,
  ArrowUpRight,
  Code2,
  Lightbulb,
  Gauge,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { blogCopy } from "@/i18n/blog";
import { type Article, readingMinutes } from "@/lib/articles";
const icons = { product: Lightbulb, engineering: Code2, growth: Gauge };
export function ArticleCard({
  article,
  locale,
  index = 0,
}: {
  article: Article;
  locale: Locale;
  index?: number;
}) {
  const content = article.translations[locale];
  const t = blogCopy[locale];
  const Icon = icons[article.category];
  const Arrow = locale === "en" ? ArrowUpRight : ArrowUpLeft;
  return (
    <article className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-colors hover:border-brand/50 sm:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-2">
          <Icon className="size-4" />
          {t[article.category]}
        </span>
        <span className="text-xs text-muted">
          {String(index + 1).padStart(2, "0")} / {t.nav}
        </span>
      </div>
      <h2 className="text-xl font-bold leading-snug tracking-tight sm:text-2xl">
        <Link
          href={`/${locale}/blog/${article.slug}`}
          className="decoration-brand decoration-2 underline-offset-4 hover:underline"
        >
          {content.title}
        </Link>
      </h2>
      <p className="mt-4 flex-1 text-base leading-[1.85] text-muted">
        {content.excerpt}
      </p>
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-5 text-sm">
        <span className="text-muted">
          {readingMinutes(content)} {t.minutes}
        </span>
        <Link
          href={`/${locale}/blog/${article.slug}`}
          aria-label={`${t.read}: ${content.title}`}
          className="inline-flex min-h-11 items-center gap-2 font-bold text-fg"
        >
          {t.read}
          <Arrow className="size-4 transition-transform group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
