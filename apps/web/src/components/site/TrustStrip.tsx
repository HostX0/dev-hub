import { Marquee } from "@/components/ui/Marquee";
import { MotionControls } from "@/components/ui/MotionControls";
import { getDict, type Locale } from "@/i18n";

export function TrustStrip({
  clients,
  stack,
  locale,
}: {
  clients: string[];
  stack: string[];
  locale: Locale;
}) {
  const t = getDict(locale);
  if (!clients?.length && !stack?.length) return null;
  return (
    <section className="surface-light border-b border-line py-8">
      <div className="container-x space-y-7">
        {clients?.length > 0 && (
          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
            <p className="shrink-0 text-xs font-bold uppercase tracking-widest text-muted">
              {t.trust.eyebrow}
            </p>
            <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-10 gap-y-4 md:justify-between">
              {clients.map((c, i) => (
                <li
                  key={`${c}-${i}`}
                  lang={locale}
                  className="text-lg font-bold text-muted"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
        {stack?.length > 0 && (
          <div className="flex flex-col items-center gap-5 md:flex-row md:gap-10">
            <p className="shrink-0 text-xs font-bold uppercase tracking-widest text-muted">
              {t.trust.stackEyebrow}
            </p>
            <div className="min-w-0 w-full flex-1">
              <MotionControls>
                <Marquee>
                  {stack.map((name, i) => (
                    <span
                      key={`${name}-${i}`}
                      lang="en"
                      dir="ltr"
                      className="font-display text-sm text-muted"
                    >
                      {name}
                    </span>
                  ))}
                </Marquee>
              </MotionControls>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
