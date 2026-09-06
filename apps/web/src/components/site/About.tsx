import { MapPin, ShieldCheck, Gauge, Eye, LifeBuoy } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { getDict, type Locale } from "@/i18n";
import type { SiteSettings } from "@/lib/types";
const ICONS = [ShieldCheck, Gauge, Eye, LifeBuoy];
export function About({
  settings,
  locale,
}: {
  settings: SiteSettings;
  locale: Locale;
}) {
  const t = getDict(locale);
  return (
    <section id="about" className="section-pad border-b border-line">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div>
            <p className="eyebrow">
              <span className="size-1.5 bg-brand" />
              05 / {t.about.eyebrow}
            </p>
            <h2 className="mt-5 text-3xl font-bold leading-[1.25] md:text-5xl">
              {locale === "ar" ? (
                <>
                  شريكك البرمجي.
                  <br />
                  <span className="text-gradient-brand">
                    من الفكرة إلى الأثر.
                  </span>
                </>
              ) : (
                <>
                  The complete
                  <br />
                  <span className="text-gradient-brand">software partner.</span>
                </>
              )}
            </h2>
            <p className="mt-6 text-base leading-[1.9] text-muted">
              {settings.bio}
            </p>
            {settings.location && (
              <p className="mt-6 flex items-center gap-2 text-sm text-muted">
                <MapPin className="size-4 text-brand-2" />
                {settings.location}
              </p>
            )}
          </div>
          <div className="relative flex aspect-square max-h-[400px] flex-col items-center justify-center rounded-2xl border border-line bg-surface p-8">
            <LogoMark size={190} className="max-w-[65%]" />
            <p
              className="mt-10 text-center font-display text-xs uppercase tracking-[.2em] text-muted"
              dir="ltr"
            >
              Product · People · Possibilities
            </p>
            <span className="absolute start-5 top-5 size-1.5 bg-brand" />
            <span
              className="absolute end-5 bottom-5 text-xs text-muted"
              dir="ltr"
            >
              DevsHub.cc / 2026
            </span>
          </div>
        </div>
        <div className="mt-14 grid gap-6 border-t border-line pt-8 md:grid-cols-2 lg:grid-cols-4">
          {t.about.values.map((v, i) => {
            const Icon = ICONS[i];
            return (
              <div key={v.title}>
                <Icon className="mb-4 size-5 text-brand-2" />
                <h3 className="font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-[1.8] text-muted">
                  {v.text}
                </p>
              </div>
            );
          })}
        </div>
        {settings.stats?.length > 0 && (
          <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-10 lg:grid-cols-4">
            {settings.stats.map((s, i) => (
              <div key={i}>
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="mt-2 font-display text-4xl font-bold" dir="ltr">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
