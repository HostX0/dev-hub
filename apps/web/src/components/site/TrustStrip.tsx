import { Marquee } from "@/components/ui/Marquee";
import { getDict, type Locale } from "@/i18n";

/** "Trusted by" client names + technology stack, two opposite-direction marquees. */
export function TrustStrip({ clients, stack, locale }: { clients: string[]; stack: string[]; locale: Locale }) {
  const t = getDict(locale);
  if (!clients?.length && !stack?.length) return null;
  return (
    <section className="relative border-y border-line bg-surface/60 py-8 md:py-10">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
      {clients?.length > 0 && (
        <div className="mb-6">
          <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-2">{t.trust.eyebrow}</p>
          <Marquee>
            {clients.map((c, i) => (
              <span key={`${c}-${i}`} className="inline-flex items-center gap-3 px-4 font-display text-xl font-bold tracking-tight text-fg/60 transition-colors hover:text-fg md:text-2xl">
                <span className="size-2 rounded-sm rotate-45 bg-gradient-to-br from-brand to-brand-2 opacity-70" />
                {c}
              </span>
            ))}
          </Marquee>
        </div>
      )}
      {stack?.length > 0 && (
        <div>
          <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-2">{t.trust.stackEyebrow}</p>
          <Marquee reverse>
            {stack.map((s, i) => (
              <span key={`${s}-${i}`} className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 font-display text-sm font-semibold text-muted">
                <span className="size-1.5 rounded-full bg-brand-2" />
                {s}
              </span>
            ))}
          </Marquee>
        </div>
      )}
    </section>
  );
}
