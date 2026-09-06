"use client";
import { Plus } from "lucide-react";
import { useI18n } from "@/i18n/client";
export function Faq() {
  const { t } = useI18n();
  return (
    <section className="surface-light section-pad">
      <div className="container-x grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">
            <span className="size-1.5 bg-brand" />
            {t.faq.eyebrow}
          </p>
          <h2 className="mt-5 text-3xl font-bold leading-[1.25] md:text-4xl">
            {t.faq.title}
            <span className="text-gradient-brand">{t.faq.titleAccent}</span>
          </h2>
        </div>
        <div className="border-t border-line-2">
          {t.faq.items.map((item, i) => (
            <details
              key={item.q}
              name="frequent-questions"
              open={i === 0}
              className="group border-b border-line-2"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 text-base font-bold [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus className="size-5 shrink-0 text-muted transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-6 pe-8 text-base leading-[1.9] text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
