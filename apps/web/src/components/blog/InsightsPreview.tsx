import Link from "next/link";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { blogCopy } from "@/i18n/blog";
import { articles } from "@/lib/articles";
import { ArticleCard } from "./ArticleCard";
export function InsightsPreview({ locale }: { locale: Locale }) {
  const t = blogCopy[locale],
    Arrow = locale === "en" ? ArrowUpRight : ArrowUpLeft;
  return (
    <section className="surface-light section-pad border-b border-line">
      <div className="container-x">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-brand-2">{t.eyebrow}</p>
            <h2 className="mt-5 text-3xl font-bold md:text-5xl">
              {t.homeTitle}
            </h2>
            <p className="mt-4 text-lg text-muted">{t.homeText}</p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex min-h-11 shrink-0 items-center gap-3 text-sm font-bold"
          >
            {t.viewAll}
            <Arrow className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {articles.slice(0, 2).map((a, i) => (
            <ArticleCard key={a.slug} article={a} locale={locale} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
