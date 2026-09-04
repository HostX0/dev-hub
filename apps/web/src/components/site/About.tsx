import { MapPin, ShieldCheck, Gauge, Eye, LifeBuoy } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { getDict, type Locale } from "@/i18n";
import type { SiteSettings } from "@/lib/types";

const VALUE_ICONS = [ShieldCheck, Gauge, Eye, LifeBuoy];

export function About({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const t = getDict(locale);
  return (
    <section id="about" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(40%_50%_at_20%_50%,rgba(34,211,238,0.08),transparent_70%)]" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-brand-2 shadow-[0_0_10px_#22d3ee]" />
              {t.about.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-3xl font-bold leading-[1.25] tracking-tight md:text-5xl md:leading-[1.2]">
              {t.about.title}
              <span className="text-gradient-brand">{t.about.titleAccent}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-[2] text-muted md:text-lg">{settings.bio}</p>
          </Reveal>
          <Stagger className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.08}>
            {t.about.values.map((v, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <StaggerItem key={v.title}>
                  <div className="flex items-start gap-3 rounded-2xl border border-line bg-white/[0.02] p-4 transition-colors hover:border-brand/40">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand-2">
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{v.title}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted">{v.text}</span>
                    </span>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          {settings.location && (
            <Reveal delay={0.15}>
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
                <MapPin className="size-4 text-brand-2" />
                {settings.location}
              </p>
            </Reveal>
          )}
        </div>

        <Stagger className="grid grid-cols-2 gap-4" stagger={0.1}>
          {settings.stats?.map((s, i) => (
            <StaggerItem key={i}>
              <SpotlightCard className="p-7 md:p-8">
                <div className="num text-4xl font-black text-gradient md:text-5xl" dir="ltr">
                  <Counter value={s.value} />
                </div>
                <p className="mt-2 text-sm text-muted md:text-base">{s.label}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
