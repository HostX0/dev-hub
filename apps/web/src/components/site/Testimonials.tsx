import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDict, type Locale } from "@/i18n";
import type { Testimonial } from "@/lib/types";
export function Testimonials({
  items,
  locale,
}: {
  items: Testimonial[];
  locale: Locale;
}) {
  const t = getDict(locale);
  if (!items?.length) return null;
  return (
    <section className="surface-light section-pad border-b border-line">
      <div className="container-x">
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={
            <>
              {t.testimonials.title}
              <span className="text-gradient-brand">
                {t.testimonials.titleAccent}
              </span>
            </>
          }
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-xl border border-line bg-white p-7"
            >
              <Quote className="size-6 text-brand" strokeWidth={1.5} />
              <blockquote className="my-6 flex-1 text-base leading-[1.85] text-fg">
                {item.text}
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-line pt-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#EEF0FD] font-bold text-brand-2">
                  {item.name.trim().charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-bold">{item.name}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {item.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
