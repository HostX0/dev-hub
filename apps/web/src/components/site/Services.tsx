import { ArrowUpLeft, ArrowUpRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/Icon";
import { getDict, type Locale } from "@/i18n";
import type { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

const ACCENTS = [
  "from-brand/30 to-brand-2/10 text-brand-2 shadow-[0_0_30px_-8px_rgba(124,108,255,0.7)]",
  "from-brand-2/30 to-lime/10 text-brand-2 shadow-[0_0_30px_-8px_rgba(34,211,238,0.7)]",
  "from-lime/30 to-brand-2/10 text-lime shadow-[0_0_30px_-8px_rgba(163,230,53,0.6)]",
  "from-brand-3/30 to-brand/10 text-brand-3 shadow-[0_0_30px_-8px_rgba(244,114,182,0.7)]",
  "from-warning/30 to-brand-3/10 text-warning shadow-[0_0_30px_-8px_rgba(251,191,36,0.6)]",
  "from-sky-400/30 to-brand/10 text-sky-300 shadow-[0_0_30px_-8px_rgba(56,189,248,0.7)]",
];

export function Services({ services, locale }: { services: Service[]; locale: Locale }) {
  const t = getDict(locale);
  const Arrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;
  if (!services.length) return null;
  return (
    <section id="services" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(124,108,255,0.12),transparent_70%)]" />
      <div className="container-x">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={
            <>
              {t.services.title}
              <span className="text-gradient-brand">{t.services.titleAccent}</span>
            </>
          }
          description={t.services.description}
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <StaggerItem key={s.id} className={cn(i === 0 && services.length % 3 === 1 && "lg:col-span-2")}>
              <SpotlightCard as="article" className="group flex h-full flex-col p-7 transition-transform duration-500 hover:-translate-y-1">
                <div className="mb-6 flex items-start justify-between">
                  <div className={cn("inline-grid size-13 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", ACCENTS[i % ACCENTS.length])}>
                    <ServiceIcon name={s.icon} className="size-6" />
                  </div>
                  <span className="font-display text-sm font-bold text-white/15">0{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-3 leading-[1.8] text-muted">{s.description}</p>
                {s.features?.length > 0 && (
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                        <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <a href="#contact" className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-fg/80 transition-colors hover:text-brand-2">
                  {t.services.more}
                  <Arrow className="size-4 transition-transform group-hover:-translate-y-0.5" />
                </a>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
