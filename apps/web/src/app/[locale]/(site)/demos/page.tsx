import type { Metadata } from "next";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { alternates } from "@/lib/seo";
import { resolveLocale } from "@/i18n";
import { demosCopy } from "@/i18n/demos";
import { DEMO_SITES } from "@/demos/config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { DemoCard } from "@/components/site/DemoSites";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = demosCopy[locale];
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: alternates(locale, "/demos"),
  };
}

export default async function DemosPage({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  const t = demosCopy[locale];
  const Arrow = locale !== "en" ? ArrowUpLeft : ArrowUpRight;
  return (
    <>
      <section className="surface-light relative pt-36 pb-16 md:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid mask-fade-b opacity-50" />
          <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.22),transparent_70%)]" />
        </div>
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow={t.eyebrow}
            title={
              <>
                {t.title}
                <span className="text-gradient-brand">{t.accent}</span>
              </>
            }
            description={t.description}
          />
          <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.1}>
            {DEMO_SITES.map((site) => (
              <StaggerItem key={site.slug} className="h-full">
                <DemoCard site={site} locale={locale} />
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-6 text-xs text-muted-2">{t.note}</p>
        </div>
      </section>

      <section className="section-pad border-t border-line">
        <div className="container-x">
          <Reveal>
            <h2 className="text-3xl font-bold md:text-4xl">{t.howTitle}</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.1}>
            {t.how.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="card h-full p-7">
                  <span className="font-display text-sm font-bold text-brand-2">0{i + 1}</span>
                  <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 leading-[1.8] text-muted">{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="card-strong mt-14 flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">{t.ctaTitle}</h2>
              <p className="mt-2 max-w-xl leading-[1.8] text-muted">{t.ctaText}</p>
            </div>
            <Button href={`/${locale}/#contact`} size="lg" className="group shrink-0">
              {t.cta}
              <Arrow className="size-4 transition-transform group-hover:-translate-y-0.5" />
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
