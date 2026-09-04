import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, Layers, User } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { api } from "@/lib/api";
import { getDict, resolveLocale } from "@/i18n";
import { localizeProject } from "@/lib/localize";
import { categoryLabel, imgUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Reveal } from "@/components/ui/Reveal";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Gallery } from "@/components/site/Gallery";
import { ProjectCard } from "@/components/site/ProjectCard";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = resolveLocale(l);
  const t = getDict(locale);
  const raw = await api.project(slug);
  if (!raw) return { title: t.projects.notFound };
  const p = localizeProject(raw, locale);
  return {
    title: p.title,
    description: p.tagline || p.description.slice(0, 160),
    openGraph: { title: p.title, description: p.tagline, images: p.coverImage ? [imgUrl(p.coverImage)] : [] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale: l, slug } = await params;
  const locale = resolveLocale(l);
  const t = getDict(locale);
  const raw = await api.project(slug);
  if (!raw) notFound();
  const project = localizeProject(raw, locale);
  const all = (await api.projects()).map((p) => localizeProject(p, locale));
  const related = all.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 2);
  const fallbackRelated = related.length ? related : all.filter((p) => p.id !== project.id).slice(0, 2);
  const gallery = project.gallery?.length ? project.gallery : project.coverImage ? [project.coverImage] : [];
  const BackIcon = locale === "ar" ? ArrowRight : ArrowLeft;

  return (
    <article className="relative pt-32 pb-16 md:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-40" />
        <div className="absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,108,255,0.2),transparent_70%)]" />
      </div>
      <div className="container-x">
        <Reveal>
          <Link href={`/${locale}/projects`} className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
            <BackIcon className="size-4" />
            {t.projects.back}
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow">{categoryLabel(project.category, locale)}</span>
                {project.featured && <span className="rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-xs font-semibold text-warning">{t.work.featured}</span>}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 text-3xl font-black leading-[1.25] tracking-tight md:text-5xl">{project.title}</h1>
            </Reveal>
            {project.tagline && (
              <Reveal delay={0.15}>
                <p className="mt-4 text-lg leading-relaxed text-muted">{project.tagline}</p>
              </Reveal>
            )}
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button href={project.liveUrl} size="lg" className="group">
                    <ExternalLink className="size-4" />
                    {t.work.live}
                  </Button>
                )}
                {project.repoUrl && (
                  <Button href={project.repoUrl} size="lg" variant="secondary">
                    <GithubIcon className="size-4" />
                    {t.projects.source}
                  </Button>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <dl className="card grid grid-cols-2 gap-5 p-6 sm:grid-cols-3">
              <div>
                <dt className="flex items-center gap-1.5 text-xs text-muted-2"><User className="size-3.5" /> {t.projects.client}</dt>
                <dd className="mt-1.5 font-semibold">{project.client || "—"}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-xs text-muted-2"><Calendar className="size-3.5" /> {t.projects.year}</dt>
                <dd className="mt-1.5 font-display font-semibold">{project.year ?? "—"}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 text-xs text-muted-2"><Layers className="size-3.5" /> {t.projects.type}</dt>
                <dd className="mt-1.5 font-semibold">{categoryLabel(project.category, locale)}</dd>
              </div>
              {project.tags?.length > 0 && (
                <div className="col-span-full border-t border-line pt-4">
                  <dt className="text-xs text-muted-2">{t.projects.tech}</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5" dir="ltr">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-md border border-line bg-white/[0.03] px-2 py-0.5 font-display text-[11px] text-muted">{tag}</span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </div>

        <Reveal className="relative mt-14 rounded-2xl" delay={0.1}>
          <BrowserFrame src={project.coverImage} alt={project.title} url={project.liveUrl} priority className="shadow-glow" noImageText={t.projects.noImage} />
          <BorderBeam />
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <Reveal>
            <h2 className="text-2xl font-bold">{t.projects.aboutProject}</h2>
            <div className="prose-site mt-5 space-y-4 text-lg">
              {project.description.split(/\n{2,}|\n/).filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-strong sticky top-28 overflow-hidden p-6">
              <div className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-brand/25 blur-3xl" />
              <h3 className="relative font-bold">{t.projects.similarTitle}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">{t.projects.similarText}</p>
              <Button href={`/${locale}/#contact`} className="relative mt-5 w-full">{t.projects.start}</Button>
            </div>
          </Reveal>
        </div>

        {gallery.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <h2 className="mb-8 text-2xl font-bold">{t.projects.shots}</h2>
            </Reveal>
            <Gallery images={gallery} title={project.title} url={project.liveUrl} />
          </div>
        )}

        {fallbackRelated.length > 0 && (
          <div className="mt-24">
            <Reveal>
              <h2 className="mb-8 text-2xl font-bold">{t.projects.others}</h2>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2">
              {fallbackRelated.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
