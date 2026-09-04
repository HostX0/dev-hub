import type { Metadata } from "next";
import { api } from "@/lib/api";
import { getDict, resolveLocale } from "@/i18n";
import { localizeProject } from "@/lib/localize";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsGallery } from "@/components/site/ProjectsGallery";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getDict((await params).locale);
  return { title: t.projects.title, description: t.projects.metaDescription };
}

export default async function ProjectsPage({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  const t = getDict(locale);
  const projects = (await api.projects()).map((p) => localizeProject(p, locale));
  return (
    <section className="relative pt-36 pb-16 md:pt-44">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-50" />
        <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,108,255,0.22),transparent_70%)]" />
      </div>
      <div className="container-x">
        <SectionHeading
          eyebrow={t.projects.title}
          title={
            <>
              {t.projects.heading}
              <span className="text-gradient-brand">{t.projects.headingAccent}</span>
            </>
          }
          description={t.projects.description}
        />
        <ProjectsGallery projects={projects} />
      </div>
    </section>
  );
}
