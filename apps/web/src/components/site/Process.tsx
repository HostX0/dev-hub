import { Lightbulb, PenTool, Code2, Rocket, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getDict, type Locale } from "@/i18n";
const ICONS = [Lightbulb, PenTool, Code2, Rocket];
export function Process({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <section className="surface-light section-pad border-b border-line">
      <div className="container-x">
        <SectionHeading
          eyebrow={`04 / ${t.process.eyebrow}`}
          title={
            <>
              {t.process.title}
              <span className="text-gradient-brand">
                {t.process.titleAccent}
              </span>
            </>
          }
        />
        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <li key={s.title} className="border-t border-line-2 pt-6">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-display text-sm text-brand-2">
                    / 0{i + 1}
                  </span>
                  <Icon className="size-5 text-muted" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-3 text-base leading-[1.8] text-muted">
                  {s.text}
                </p>
              </li>
            );
          })}
        </ol>
        <p className="mt-10 flex items-center gap-3 border-t border-line pt-6 text-sm text-muted">
          <ArrowUpRight className="size-4 text-brand-2" />
          {locale === "ar"
            ? "رؤية مشتركة. خطوات واضحة. تقدم تراه في كل مرحلة."
            : "Shared vision. Clear milestones. Progress you can see at every step."}
        </p>
      </div>
    </section>
  );
}
