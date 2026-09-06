import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "./ProjectCard";
import { getDict, type Locale } from "@/i18n";
import type { Project } from "@/lib/types";

export function FeaturedProjects({
  projects,
  locale,
}: {
  projects: Project[];
  locale: Locale;
}) {
  const t = getDict(locale);
  const Arrow = locale !== "en" ? ArrowUpLeft : ArrowUpRight;
  if (!projects.length) return null;
  return (
    <section
      id="work"
      className="surface-light section-pad border-t border-line"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[600px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(99,102,241,0.14),transparent_70%)]" />
      <div className="container-x">
        <SectionHeading
          eyebrow={`02 / ${t.work.eyebrow}`}
          title={
            <>
              {t.work.title}
              <span className="text-gradient-brand">{t.work.titleAccent}</span>
            </>
          }
          description={t.work.description}
        />
        <Stagger className="grid gap-5 md:grid-cols-2" stagger={0.1}>
          {projects.slice(0, 4).map((p, i) => (
            <StaggerItem key={p.id} className="h-full">
              <ProjectCard project={p} large={i === 0} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-12 flex justify-center">
          <Button
            href={`/${locale}/projects`}
            variant="secondary"
            size="lg"
            className="group"
          >
            {t.work.all}
            <Arrow className="size-4 transition-transform group-hover:-translate-y-0.5" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
