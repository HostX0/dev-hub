"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ProjectCard } from "./ProjectCard";
import { useI18n } from "@/i18n/client";
import type { Project } from "@/lib/types";
import { categoryLabel, cn } from "@/lib/utils";

export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const { t, locale } = useI18n();
  const categories = useMemo(() => ["all", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const [active, setActive] = useState("all");
  const list = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn("relative rounded-full px-4 py-2 text-sm font-medium transition-colors", active === c ? "text-bg" : "text-muted hover:text-fg")}
          >
            {active === c && (
              <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            )}
            <span className="relative">{c === "all" ? t.projects.all : categoryLabel(c, locale)}</span>
            <span className={cn("relative ms-1.5 font-display text-[11px]", active === c ? "text-bg/60" : "text-muted-2")}>
              {c === "all" ? projects.length : projects.filter((p) => p.category === c).length}
            </span>
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
      {list.length === 0 && <p className="py-20 text-center text-muted">{t.projects.empty}</p>}
    </div>
  );
}
