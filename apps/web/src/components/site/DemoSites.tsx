import Link from "next/link";
import { ArrowUpLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { demosCopy } from "@/i18n/demos";
import type { Locale } from "@/i18n";
import {
  DEMO_SITES,
  demoCover,
  demoHref,
  demoLangFromLocale,
  type DemoSite,
} from "@/demos/config";

export function DemoCard({
  site,
  locale,
  compact,
}: {
  site: DemoSite;
  locale: Locale;
  compact?: boolean;
}) {
  const t = demosCopy[locale];
  const lang = demoLangFromLocale(locale);
  const other = lang === "ar" ? "en" : "ar";
  return (
    <SpotlightCard
      as="article"
      className="group flex h-full flex-col overflow-hidden p-0 transition-transform duration-500 will-change-transform hover:-translate-y-1.5"
    >
      <a
        href={demoHref(site.slug, lang)}
        hrefLang={lang}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t.preview}: ${site.name[locale]}`}
        className="block"
      >
        <BrowserFrame
          src={demoCover(site.slug, locale)}
          alt={`${site.kind[locale]} — ${site.name[locale]}`}
          noImageText={t.imageUnavailable}
          url={`https://${site.slug}.demo`}
          className="rounded-none border-0 border-b border-line"
        />
      </a>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <span
            className="flex h-5 items-center gap-1 rounded-full border border-line px-1.5"
            aria-hidden="true"
          >
            {site.palette.map((c) => (
              <span
                key={c}
                className="size-2.5 rounded-full border border-black/10"
                style={{ background: c }}
              />
            ))}
          </span>
          <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand-2">
            {site.kind[locale]}
          </span>
        </div>
        <h3 className="text-xl font-bold leading-snug">{site.name[locale]}</h3>
        {!compact && (
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {site.tagline[locale]}
          </p>
        )}
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t.includes}>
          {site.features[locale].map((f) => (
            <li
              key={f}
              className="rounded-md border border-line bg-white/[0.03] px-2 py-0.5 text-xs text-muted"
            >
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <a
            href={demoHref(site.slug, lang)}
            hrefLang={lang}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[#5B5EE8] px-4 text-sm font-bold text-white transition-colors hover:bg-[#4F46E5]"
          >
            <ExternalLink className="size-3.5" aria-hidden="true" />
            {t.preview} · {lang === "ar" ? t.previewAr : t.previewEn}
          </a>
          <a
            href={demoHref(site.slug, other)}
            target="_blank"
            rel="noopener noreferrer"
            hrefLang={other}
            className="inline-flex h-10 items-center rounded-full border border-line px-4 text-sm font-semibold text-muted transition-colors hover:border-brand/50 hover:text-fg"
          >
            {other === "ar" ? t.previewAr : t.previewEn}
          </a>
          {!compact && (
            <Link
              href={`/${locale}/#contact`}
              className="ms-auto text-sm font-semibold text-fg transition-colors hover:text-brand-2"
            >
              {t.request}
            </Link>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}

/** Home page section: live templates with a link to the full gallery. */
export function DemoSites({ locale }: { locale: Locale }) {
  const t = demosCopy[locale];
  const Arrow = locale !== "en" ? ArrowUpLeft : ArrowUpRight;
  return (
    <section
      id="templates"
      className="section-pad relative border-t border-line"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(50%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent_70%)]" />
      <div className="container-x">
        <SectionHeading
          eyebrow={`03 / ${t.eyebrow}`}
          title={
            <>
              {t.homeTitle.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-gradient-brand">
                {t.homeTitle.split(" ").slice(-2).join(" ")}
              </span>
            </>
          }
          description={t.homeText}
        />
        <Stagger
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          stagger={0.08}
        >
          {DEMO_SITES.map((site) => (
            <StaggerItem key={site.slug} className="h-full">
              <DemoCard site={site} locale={locale} compact />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-12 flex justify-center">
          <Button
            href={`/${locale}/demos`}
            variant="secondary"
            size="lg"
            className="group"
          >
            {t.viewAll}
            <Arrow className="size-4 transition-transform group-hover:-translate-y-0.5" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
