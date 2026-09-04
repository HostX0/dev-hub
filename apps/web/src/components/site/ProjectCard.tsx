"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { localeHref, useI18n } from "@/i18n/client";
import type { Project } from "@/lib/types";
import { categoryLabel, cn } from "@/lib/utils";

export function ProjectCard({ project, className, large }: { project: Project; className?: string; large?: boolean }) {
  const { t, locale } = useI18n();
  const Arrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;
  const href = localeHref(locale, `/projects/${project.slug}`);
  return (
    <motion.div layout className={cn("h-full", className)}>
      <SpotlightCard as="article" className="group flex h-full flex-col overflow-hidden p-3 transition-transform duration-500 will-change-transform hover:-translate-y-1.5">
        <Link href={href} className="block">
          <BrowserFrame src={project.coverImage} alt={project.title} url={project.liveUrl} className="rounded-xl" noImageText={t.projects.noImage} />
        </Link>
        <div className="flex flex-1 flex-col p-4 pt-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-2">
              {categoryLabel(project.category, locale)}
            </span>
            {project.year && <span className="font-display text-[11px] text-muted-2">{project.year}</span>}
          </div>
          <h3 className={cn("font-bold leading-snug", large ? "text-2xl" : "text-lg")}>
            <Link href={href} className="transition-colors hover:text-brand-2">
              {project.title}
            </Link>
          </h3>
          {project.tagline && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.tagline}</p>}
          {project.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5" dir="ltr">
              {project.tags.slice(0, 5).map((tag) => (
                <span key={tag} className="rounded-md border border-line bg-white/[0.03] px-2 py-0.5 font-display text-[11px] text-muted">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="mt-auto flex items-center justify-between gap-2 pt-5">
            <Link href={href} className="group/l inline-flex items-center gap-1.5 text-sm font-semibold text-fg transition-colors hover:text-brand-2">
              {t.work.details}
              <Arrow className="size-4 transition-transform group-hover/l:-translate-y-0.5" />
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3.5 text-xs font-semibold text-muted transition-all hover:border-brand/50 hover:text-fg"
              >
                <ExternalLink className="size-3.5" />
                {t.work.live}
              </a>
            )}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
