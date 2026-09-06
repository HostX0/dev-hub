"use client";

import { useMotionPaused } from "@/components/ui/MotionControls";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  Bot,
  Check,
  FileText,
  Mail,
  MessageCircle,
  Play,
  ShoppingCart,
  User,
  Zap,
  GitBranch,
  ShieldCheck,
  TestTube2,
} from "lucide-react";
import { useI18n } from "@/i18n/client";
import { Counter } from "@/components/ui/Counter";
import { cn } from "@/lib/utils";

/* ---------------- AI chat: messages appear one by one, loops ---------------- */
export function AiChatDemo() {
  const paused = useMotionPaused();
  const { t } = useI18n();
  const msgs = t.capabilities.ai.chat;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView || paused) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const step = (i: number) => {
      if (cancelled) return;
      if (i >= msgs.length) {
        timer = setTimeout(() => {
          setShown(0);
          step(0);
        }, 3200);
        return;
      }
      const isBot = msgs[i].role === "bot";
      if (isBot) {
        setTyping(true);
        timer = setTimeout(() => {
          setTyping(false);
          setShown(i + 1);
          step(i + 1);
        }, 1100);
      } else {
        timer = setTimeout(() => {
          setShown(i + 1);
          step(i + 1);
        }, 900);
      }
    };
    step(shown);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, paused, msgs]);

  return (
    <div ref={ref} className="relative flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2 text-xs text-muted">
        <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
          <Bot className="size-3.5" />
        </span>
        <span className="font-semibold text-fg">DevsHub Assistant</span>
        <span className="ms-auto inline-flex items-center gap-1 text-[10px] text-success">
          <span className="size-1.5 rounded-full bg-success" /> online
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2">
        <AnimatePresence initial={false}>
          {msgs.slice(0, paused ? msgs.length : shown).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex items-end gap-2",
                m.role === "user" ? "flex-row-reverse" : "",
              )}
            >
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full",
                  m.role === "user"
                    ? "bg-white/10 text-fg"
                    : "bg-brand/30 text-brand-2",
                )}
              >
                {m.role === "user" ? (
                  <User className="size-3" />
                ) : (
                  <Bot className="size-3" />
                )}
              </span>
              <span
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed",
                  m.role === "user"
                    ? "rounded-ee-sm bg-white/[0.08] text-fg"
                    : "rounded-es-sm bg-gradient-to-br from-brand/35 to-brand-2/20 text-fg",
                )}
              >
                {m.text}
              </span>
            </motion.div>
          ))}
          {typing && !paused && (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <span className="grid size-6 place-items-center rounded-full bg-brand/30 text-brand-2">
                <Bot className="size-3" />
              </span>
              <span className="inline-flex items-center gap-1 rounded-2xl rounded-es-sm bg-brand/20 px-3 py-2">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="size-1.5 rounded-full bg-brand-2 animate-bounce"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- Automation flow: nodes light up in sequence ---------------- */
const NODE_ICONS = [ShoppingCart, FileText, Zap, MessageCircle, User, Mail];

export function AutomationFlowDemo() {
  const paused = useMotionPaused();
  const { t } = useI18n();
  const nodes = t.capabilities.automation.nodes;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [active, setActive] = useState(-1);
  const [runs, setRuns] = useState(1284);

  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => {
      setActive((a) => {
        const n = a + 1;
        if (n >= nodes.length) {
          setRuns((r) => r + 1);
          return -1;
        }
        return n;
      });
    }, 650);
    return () => clearInterval(id);
  }, [inView, nodes.length, paused]);

  return (
    <div ref={ref} className="relative flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 font-semibold">
          <Play className="size-3.5 text-lime" /> n8n · workflow
        </span>
        <span className="font-display text-muted">
          <span className="text-fg">{runs.toLocaleString("en-US")}</span>{" "}
          {t.capabilities.automation.runs}
        </span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-x-3 gap-y-5">
        {nodes.map((label, i) => {
          const Icon = NODE_ICONS[i % NODE_ICONS.length];
          const done = paused || i <= active;
          const current = !paused && i === active;
          return (
            <div key={label} className="relative">
              {i % 3 !== 2 && i < nodes.length - 1 && (
                <span className="absolute top-1/2 hidden h-px w-3 ltr:-right-3 rtl:-left-3 sm:block">
                  <span
                    className={cn(
                      "block h-full transition-colors duration-300",
                      done ? "bg-lime" : "bg-line-2",
                    )}
                  />
                </span>
              )}
              <div
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-2.5 py-2 text-[11px] font-medium transition-all duration-300",
                  current
                    ? "border-lime/60 bg-lime/10 text-fg shadow-[0_0_24px_-6px_rgba(163,230,53,0.7)] scale-[1.04]"
                    : done
                      ? "border-lime/30 bg-white/[0.04] text-fg"
                      : "border-line bg-white/[0.02] text-muted",
                )}
              >
                <span
                  className={cn(
                    "grid size-6 shrink-0 place-items-center rounded-lg",
                    done ? "bg-lime/20 text-lime" : "bg-white/5 text-muted-2",
                  )}
                >
                  {done && !current ? (
                    <Check className="size-3" strokeWidth={3} />
                  ) : (
                    <Icon className="size-3" />
                  )}
                </span>
                <span className="truncate">{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Code: typed snippet with checks ---------------- */
const CODE = [
  "export const agent = createAgent({",
  "  model: selectedModel,",
  "  tools: [crm, whatsapp, invoices],",
  "  memory: vectorStore('docs'),",
  "});",
  "",
  "await agent.run(order.id); // ✓ done",
];

export function CodeDemo() {
  const paused = useMotionPaused();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [chars, setChars] = useState(0);
  const full = CODE.join("\n");

  useEffect(() => {
    if (!inView || paused) return;
    let i = chars;
    const id = setInterval(() => {
      i += 2;
      if (i > full.length + 60) i = 0;
      setChars(Math.min(i, full.length));
    }, 28);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, paused]);

  const shown = paused ? full : full.slice(0, chars);
  return (
    <div ref={ref} className="flex h-full flex-col" dir="ltr">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ms-2 font-display text-[10px] text-muted-2">
          agent.ts
        </span>
      </div>
      <pre className="flex-1 overflow-hidden whitespace-pre-wrap font-display text-[11.5px] leading-[1.7] text-fg/85">
        {shown.split("\n").map((line, i) => (
          <span key={i} className="block">
            <span className="me-3 inline-block w-3 select-none text-muted-2">
              {i + 1}
            </span>
            <Highlight line={line} />
          </span>
        ))}
        <span className="inline-block h-3.5 w-1.5 translate-y-0.5 bg-brand-2 animate-blink" />
      </pre>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[
          { icon: TestTube2, label: "tests 128/128" },
          { icon: ShieldCheck, label: "security ok" },
          { icon: GitBranch, label: "deploy ✓" },
        ].map((b) => (
          <span
            key={b.label}
            className="inline-flex items-center gap-1 rounded-md border border-success/25 bg-success/10 px-2 py-0.5 font-display text-[10px] text-success"
          >
            <b.icon className="size-3" />
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Highlight({ line }: { line: string }) {
  const parts = line
    .split(/('[^']*'|\/\/.*$|\b(?:export|const|await)\b)/g)
    .filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("'"))
          return (
            <span key={i} className="text-lime">
              {p}
            </span>
          );
        if (p.startsWith("//"))
          return (
            <span key={i} className="text-muted-2">
              {p}
            </span>
          );
        if (/^(export|const|await)$/.test(p))
          return (
            <span key={i} className="text-brand-3">
              {p}
            </span>
          );
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

/* ---------------- Metrics: animated bars + counters ---------------- */
export function MetricsDemo() {
  const paused = useMotionPaused();
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const bars = [38, 62, 48, 80, 66, 92, 74, 100];
  return (
    <div ref={ref} className="flex h-full flex-col">
      <div className="flex flex-1 items-end gap-1.5" dir="ltr">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            initial={{ height: "8%" }}
            animate={inView || paused ? { height: `${h}%` } : {}}
            transition={{
              delay: paused ? 0 : 0.1 + i * 0.07,
              duration: paused ? 0 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={cn(
              "flex-1 rounded-t-md bg-gradient-to-t",
              i === bars.length - 1
                ? "from-brand-2 to-lime"
                : "from-brand/70 to-brand-2/60",
            )}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {t.capabilities.data.metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-line bg-white/[0.03] p-2.5"
          >
            <div className="num text-base font-black text-fg" dir="ltr">
              <Counter value={m.value} />
            </div>
            <div className="mt-0.5 truncate text-[10px] text-muted">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Integrations: orbiting logos as text chips ---------------- */
const INTEGRATIONS = [
  "WhatsApp",
  "Salla",
  "Zid",
  "Odoo",
  "SAP",
  "Stripe",
  "HubSpot",
  "Slack",
  "Google",
  "Notion",
  "Shopify",
  "Zapier",
];

export function IntegrationsDemo() {
  return (
    <div
      className="relative flex h-full items-center justify-center overflow-hidden"
      dir="ltr"
    >
      <div className="absolute size-[280px] rounded-full border border-dashed border-white/10 animate-spin-slower" />
      <div className="absolute size-[170px] rounded-full border border-white/[0.07] animate-spin-reverse" />
      <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white shadow-glow">
        <Zap className="size-6" />
      </span>
      {INTEGRATIONS.map((name, i) => {
        const angle = (i / INTEGRATIONS.length) * Math.PI * 2;
        const r = i % 2 === 0 ? 105 : 66;
        // Keep server and browser style serialization identical across runtimes.
        const horizontalPercent = Number(
          (50 + Math.cos(angle) * (i % 2 === 0 ? 34 : 22)).toFixed(3),
        );
        const y = Number((Math.sin(angle) * r * 0.62).toFixed(3));
        return (
          <span
            key={name}
            className="absolute left-1/2 top-1/2"
            style={{ left: `${horizontalPercent}%`, marginTop: y }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.05 * i,
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              className="block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-surface-2/90 px-2.5 py-1 font-display text-[10px] font-semibold text-fg/80 shadow-card animate-orbit-glow"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {name}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}
