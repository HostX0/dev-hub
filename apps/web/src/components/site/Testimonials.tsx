import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { getDict, type Locale } from "@/i18n";
import type { Testimonial } from "@/lib/types";

export function Testimonials({ items, locale }: { items: Testimonial[]; locale: Locale }) {
  const t = getDict(locale);
  if (!items?.length) return null;
  const list = items.length < 4 ? [...items, ...items] : items;
  return (
    <section className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[500px] -translate-y-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(244,114,182,0.08),transparent_70%)]" />
      <div className="container-x">
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={
            <>
              {t.testimonials.title}
              <span className="text-gradient-warm">{t.testimonials.titleAccent}</span>
            </>
          }
        />
      </div>
      <Marquee className="py-2" reverse={locale === "ar"}>
        {list.map((item, i) => (
          <figure key={i} className="card-strong w-[340px] shrink-0 p-6 md:w-[420px]" dir={locale === "ar" ? "rtl" : "ltr"}>
            <Quote className="size-6 text-brand/60" />
            <div className="mt-3 flex gap-0.5 text-warning">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="size-3.5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 whitespace-normal text-sm leading-[1.9] text-fg/90">{item.text}</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 font-display text-sm font-bold text-white">
                {item.name.trim().charAt(0).toUpperCase()}
              </span>
              <span>
                <span className="block text-sm font-bold">{item.name}</span>
                <span className="block text-xs text-muted">{item.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}
