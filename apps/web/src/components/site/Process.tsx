import { Lightbulb, PenTool, Code2, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { getDict, type Locale } from "@/i18n";

const ICONS = [Lightbulb, PenTool, Code2, Rocket];

export function Process({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow={t.process.eyebrow}
          title={
            <>
              {t.process.title}
              <span className="text-gradient-brand">{t.process.titleAccent}</span>
            </>
          }
        />
        <Stagger className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          <div className="pointer-events-none absolute inset-x-[12%] top-12 hidden h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent lg:block" />
          {t.process.steps.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <StaggerItem key={s.title}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface/50 p-6 transition-all hover:border-brand/40 hover:bg-surface">
                  <div className="pointer-events-none absolute -end-8 -top-8 size-32 rounded-full bg-brand/0 blur-3xl transition-colors duration-500 group-hover:bg-brand/25" />
                  <div className="relative mb-5 flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white shadow-glow transition-transform group-hover:scale-110">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-display text-4xl font-black text-white/10 transition-colors group-hover:text-white/20">0{i + 1}</span>
                  </div>
                  <h3 className="relative text-lg font-bold">{s.title}</h3>
                  <p className="relative mt-2.5 text-sm leading-[1.8] text-muted">{s.text}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
