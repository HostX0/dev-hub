import { ArrowUpLeft, ArrowUpRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/Icon";
import { getDict, type Locale } from "@/i18n";
import type { Service } from "@/lib/types";

export function Services({
  services,
  locale,
}: {
  services: Service[];
  locale: Locale;
}) {
  const t = getDict(locale);
  const Arrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;
  if (!services.length) return null;
  return (
    <section id="services" className="surface-light section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow={`01 / ${t.services.eyebrow}`}
          title={
            <>
              {t.services.title}
              <span className="text-gradient-brand">
                {t.services.titleAccent}
              </span>
            </>
          }
          description={t.services.description}
        />
        <div className="grid overflow-hidden rounded-2xl border border-line bg-line gap-px sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.id}
              className="group flex flex-col bg-surface p-7 transition-colors duration-300 hover:bg-[#F2F3FE] md:p-8"
            >
              <div className="mb-9 flex items-center justify-between">
                <ServiceIcon name={s.icon} className="size-7 text-brand-2" />
                <span className="font-display text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-base leading-[1.8] text-muted">
                {s.description}
              </p>
              {s.features?.length > 0 && (
                <ul className="mt-6 space-y-3 border-t border-line pt-5">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <a
                href="#contact"
                className="mt-auto inline-flex w-fit items-center gap-2 pt-7 text-sm font-bold text-fg hover:text-brand-2"
              >
                {t.services.more}
                <Arrow className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
