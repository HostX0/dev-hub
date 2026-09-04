"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Bot, Cloud, Code2, Database, Smartphone, Workflow, Activity, CheckCircle2, ShieldCheck } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";

const ICONS = [Code2, Bot, Workflow, Smartphone, Cloud, Database];
const COLORS = ["#7c6cff", "#22d3ee", "#a3e635", "#f472b6", "#38bdf8", "#fbbf24"];

/**
 * Animated "hub" illustration: a glowing core with six capability nodes on rotating orbit rings,
 * connection lines with travelling dashes, and three floating status cards. Tilts toward the cursor.
 */
export function HubVisual() {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });

  const nodes = t.hero.orbit.map((label, i) => {
    const angle = (-90 + i * 60) * (Math.PI / 180);
    const r = 36; // percent of the box, measured from the centre
    return { label, Icon: ICONS[i], color: COLORS[i], x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
  });

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[560px] [perspective:1200px]"
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      dir="ltr"
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative size-full">
        {/* glow */}
        <div className="glow-blob absolute left-1/2 top-1/2 size-[85%] -translate-x-1/2 -translate-y-1/2 [--glow-color:rgba(124,108,255,0.28)]" />

        {/* orbit rings */}
        <div className="absolute inset-[8%] rounded-full border border-dashed border-white/10 animate-spin-slower" />
        <div className="absolute inset-[8%] rounded-full animate-spin-slower">
          <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-2 shadow-[0_0_18px_4px_rgba(34,211,238,0.6)]" />
        </div>
        <div className="absolute inset-[24%] rounded-full border border-white/[0.07] animate-spin-reverse">
          <span className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-3 shadow-[0_0_16px_4px_rgba(244,114,182,0.55)]" />
        </div>
        <div className="absolute inset-[36%] rounded-full border border-white/[0.05]" />

        {/* connection lines */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible">
          <defs>
            <linearGradient id="hub-line" x1="0" x2="1">
              <stop offset="0%" stopColor="#7c6cff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {nodes.map((n, i) => (
            <g key={i}>
              <line x1="50" y1="50" x2={n.x} y2={n.y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              <line
                x1="50"
                y1="50"
                x2={n.x}
                y2={n.y}
                stroke="url(#hub-line)"
                strokeWidth="0.7"
                strokeDasharray="3 5"
                className="animate-dash"
                style={{ animationDelay: `${i * -0.35}s` }}
                strokeLinecap="round"
              />
            </g>
          ))}
        </svg>

        {/* core */}
        <div className="absolute left-1/2 top-1/2" style={{ transform: "translate(-50%,-50%) translateZ(40px)" }}>
          <span className="absolute inset-0 rounded-3xl bg-brand/50 blur-2xl" />
          <span className="absolute -inset-3 rounded-[2rem] border border-brand/30 animate-pulse-ring" />
          <span className="absolute -inset-3 rounded-[2rem] border border-brand-2/30 animate-pulse-ring [animation-delay:-1.2s]" />
          <LogoMark size={84} className="relative rounded-3xl" />
        </div>

        {/* nodes */}
        {nodes.map((n, i) => (
          <div key={n.label} className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.08, type: "spring", stiffness: 260, damping: 18 }}
            >
              <div className="glass group flex items-center gap-2 rounded-2xl py-2 pe-3.5 ps-2 shadow-card transition-transform hover:scale-105">
                <span className="grid size-8 place-items-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${n.color}, ${n.color}88)`, boxShadow: `0 0 20px -4px ${n.color}` }}>
                  <n.Icon className="size-4" />
                </span>
                <span className={cn("whitespace-nowrap text-xs font-semibold", locale === "en" && "font-display")}>{n.label}</span>
              </div>
            </motion.div>
          </div>
        ))}

        {/* floating status cards: placed in the corners, clear of the six nodes */}
        <FloatingCard className="-left-4 -top-2 md:-left-12" delay={1.3} icon={Bot} color="text-brand-2" title={t.hero.cards.agent.title} sub={t.hero.cards.agent.sub} status={t.hero.cards.agent.status} />
        <FloatingCard className="-right-4 top-[44%] md:-right-14" delay={1.5} icon={Workflow} color="text-lime" title={t.hero.cards.flow.title} sub={t.hero.cards.flow.sub} status={t.hero.cards.flow.status} float="[animation-delay:-2.5s]" />
        <FloatingCard className="-left-4 -bottom-3 md:-left-10" delay={1.7} icon={ShieldCheck} color="text-brand" title={t.hero.cards.deploy.title} sub={t.hero.cards.deploy.sub} status={t.hero.cards.deploy.status} float="[animation-delay:-4s]" />
      </motion.div>
    </div>
  );
}

function FloatingCard({
  className,
  delay,
  icon: Icon,
  color,
  title,
  sub,
  status,
  float,
}: {
  className?: string;
  delay: number;
  icon: typeof Bot;
  color: string;
  title: string;
  sub: string;
  status: string;
  float?: string;
}) {
  const { dir } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("absolute z-20 hidden sm:block", className)}
      dir={dir}
    >
      <div className={cn("glass flex items-center gap-3 rounded-2xl p-3 pe-4 shadow-card animate-float", float)}>
        <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl bg-white/[0.06]", color)}>
          <Icon className="size-4.5" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-xs font-semibold">{title}</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted">
            <Activity className="size-3 text-success" />
            <span className="truncate">{sub}</span>
          </span>
        </span>
        <span className="ms-2 inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
          <CheckCircle2 className="size-3" />
          {status}
        </span>
      </div>
    </motion.div>
  );
}
