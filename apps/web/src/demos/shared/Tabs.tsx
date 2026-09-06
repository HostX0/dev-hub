"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type Tab = { key: string; label: string; content: React.ReactNode };

/** WAI-ARIA tabs with arrow-key navigation; used for the restaurant menu. */
export function Tabs({
  tabs,
  className,
  listClassName,
  tabClassName,
  activeTabClassName,
}: {
  tabs: Tab[];
  className?: string;
  listClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
}) {
  const [active, setActive] = useState(tabs[0]?.key);
  const id = useId();
  const index = tabs.findIndex((t) => t.key === active);

  function onKey(e: React.KeyboardEvent<HTMLButtonElement>) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = tabs[(index + dir + tabs.length) % tabs.length];
    setActive(next.key);
    document.getElementById(`${id}-tab-${next.key}`)?.focus();
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        className={cn("flex flex-wrap gap-2", listClassName)}
      >
        {tabs.map((t) => {
          const selected = t.key === active;
          return (
            <button
              key={t.key}
              id={`${id}-tab-${t.key}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${id}-panel-${t.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.key)}
              onKeyDown={onKey}
              className={cn(
                "relative h-11 rounded-full px-5 text-sm font-bold transition-colors",
                tabClassName,
                selected && activeTabClassName,
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <motion.div
          key={t.key}
          id={`${id}-panel-${t.key}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${t.key}`}
          hidden={t.key !== active}
          initial={false}
          animate={t.key === active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.35 }}
          className="mt-8"
        >
          {t.content}
        </motion.div>
      ))}
    </div>
  );
}
