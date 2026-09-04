"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowUpLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { TextReveal } from "@/components/ui/Reveal";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { HubVisual } from "./HubVisual";
import { localeHref, useI18n } from "@/i18n/client";
import type { Project, SiteSettings } from "@/lib/types";

export function Hero({ settings, projects }: { settings: SiteSettings; projects: Project[] }) {
  const { t, locale } = useI18n();
  const Arrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;
  const words = settings.heroTitle.split(" ").filter(Boolean);
  const accentFrom = Math.max(1, words.length - (locale === "ar" ? 2 : 3));
  const strip = projects.filter((p) => p.coverImage).slice(0, 8);

  return (
    <section className="relative overflow-hidden pt-32 pb-10 md:pt-40 md:pb-16">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-60" />
        <div className="glow-blob absolute left-1/2 top-[-160px] h-[900px] w-[1300px] animate-aurora [--glow-color:rgba(124,108,255,0.3)]" />
        <div className="glow-blob absolute right-[-5%] top-[20%] h-[600px] w-[600px] animate-float [--glow-color:rgba(34,211,238,0.14)]" />
        <div className="glow-blob absolute left-[-5%] top-[45%] h-[520px] w-[520px] animate-float [animation-delay:-3s] [--glow-color:rgba(244,114,182,0.12)]" />
        <div className="absolute inset-0 noise" />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="text-center lg:text-start">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-2 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-muted backdrop-blur"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-success animate-pulse-ring" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {t.hero.badge}
              <Sparkles className="size-3.5 text-brand-2" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.25em] text-brand-2"
            >
              {t.hero.tagline}
            </motion.p>

            <h1 className="text-4xl font-black leading-[1.22] tracking-tight sm:text-5xl md:text-6xl md:leading-[1.15] xl:text-[4.25rem]">
              <TextReveal text={settings.heroTitle} delay={0.15} accentFrom={accentFrom} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mx-auto mt-6 max-w-xl text-base leading-[1.9] text-muted md:text-lg lg:mx-0"
            >
              {settings.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <Magnetic>
                <Button href={localeHref(locale, "/#contact")} size="lg" className="group">
                  {t.hero.primary}
                  <Arrow className="size-4 transition-transform group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5" />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href={localeHref(locale, "/projects")} size="lg" variant="secondary">
                  {t.hero.secondary}
                </Button>
              </Magnetic>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.7 }}
              className="mt-10 flex items-center justify-center gap-6 lg:justify-start md:gap-10"
            >
              {t.hero.stats.map((s, i) => (
                <li key={i} className="relative">
                  {i > 0 && <span className="absolute -start-3 top-1/2 h-8 w-px -translate-y-1/2 bg-line-2 md:-start-5" />}
                  <span className="num block text-2xl font-black text-fg md:text-3xl" dir="ltr">{s.value}</span>
                  <span className="mt-0.5 block text-xs text-muted">{s.label}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative">
            <HubVisual />
          </motion.div>
        </div>

        {/* showcase ribbon: featured projects in a 3D perspective strip */}
        {strip.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-16 md:mt-24 [perspective:1400px]"
          >
            <div className="glow-blob pointer-events-none absolute left-1/2 top-1/2 h-72 w-[1000px] -translate-x-1/2 -translate-y-1/2 [--glow-color:rgba(124,108,255,0.22)]" />
            <div className="[transform:rotateX(14deg)] [transform-style:preserve-3d]">
              <div className="group flex w-full overflow-hidden mask-fade-x" dir="ltr">
                <div className="flex w-max shrink-0 items-center gap-5 pe-5 animate-marquee will-change-transform group-hover:[animation-play-state:paused]">
                  {[...strip, ...strip].map((p, i) => (
                    <a key={`${p.id}-${i}`} href={localeHref(locale, `/projects/${p.slug}`)} className="block w-[300px] shrink-0 transition-transform duration-500 hover:-translate-y-2 md:w-[380px]" aria-label={p.title}>
                      <BrowserFrame src={p.coverImage} alt={p.title} url={p.liveUrl} priority={i < 3} noImageText={t.projects.noImage} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 -bottom-4 h-32 bg-gradient-to-t from-bg to-transparent" />
          </motion.div>
        )}

        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mx-auto mt-8 flex w-fit flex-col items-center gap-2 text-xs text-muted-2 transition-colors hover:text-fg"
        >
          <span>{t.hero.scroll}</span>
          <ArrowDown className="size-4 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
