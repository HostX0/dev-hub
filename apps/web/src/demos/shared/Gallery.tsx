"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { DemoLang } from "@/demos/config";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  src: string;
  alt: string;
  category: string;
  /** width / height, used to reserve space before the image loads */
  ratio: number;
};

const labels = {
  ar: { close: "إغلاق", prev: "السابق", next: "التالي", all: "الكل", open: "عرض" },
  en: { close: "Close", prev: "Previous", next: "Next", all: "All", open: "View" },
} as const;

/** Filterable masonry gallery with an accessible lightbox (keyboard, focus restore, scroll lock). */
export function Gallery({
  items,
  categories,
  lang,
  className,
  filterClassName,
  activeFilterClassName,
  columns = "columns-2 md:columns-3",
}: {
  items: GalleryItem[];
  categories: { key: string; label: string }[];
  lang: DemoLang;
  className?: string;
  filterClassName?: string;
  activeFilterClassName?: string;
  columns?: string;
}) {
  const t = labels[lang];
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (d: 1 | -1) =>
      setActive((a) => (a === null ? a : (a + d + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (active === null) {
      opener.current?.focus();
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(lang === "ar" ? -1 : 1);
      if (e.key === "ArrowLeft") step(lang === "ar" ? 1 : -1);
      if (e.key === "Tab") {
        // Keep focus inside the dialog: only the three buttons are tabbable.
        const nodes = Array.from(
          document.querySelectorAll<HTMLElement>("[data-lightbox] button"),
        );
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step, lang]);

  const current = active !== null ? visible[active] : null;
  const Prev = lang === "ar" ? ChevronRight : ChevronLeft;
  const Next = lang === "ar" ? ChevronLeft : ChevronRight;

  return (
    <div className={className}>
      <div className="mb-8 flex flex-wrap gap-2" role="group">
        {[{ key: "all", label: t.all }, ...categories].map((c) => (
          <button
            key={c.key}
            type="button"
            aria-pressed={filter === c.key}
            onClick={() => setFilter(c.key)}
            className={cn(
              "h-10 rounded-full border px-4 text-sm font-semibold transition-colors",
              filterClassName,
              filter === c.key && activeFilterClassName,
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <motion.div
        key={filter}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn("gap-4 space-y-4", columns)}
      >
        {visible.map((item, i) => (
          <figure key={item.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setActive(i);
              }}
              aria-label={`${t.open}: ${item.alt}`}
              className="group block w-full overflow-hidden rounded-sm bg-d-surface-2"
              style={{ aspectRatio: item.ratio }}
            >
              {/* Generated SVG artwork — no optimisation pipeline needed */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </button>
          </figure>
        ))}
      </motion.div>

      <AnimatePresence>
        {current && (
          <motion.div
            data-lightbox
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex flex-col bg-black/95 text-white"
            onClick={close}
          >
            <div className="flex items-center justify-between p-4">
              <p className="text-sm text-white/70">
                {active! + 1} / {visible.length} · {current.alt}
              </p>
              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                aria-label={t.close}
                className="grid size-11 place-items-center rounded-full border border-white/20 hover:bg-white/10"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-14 pb-6">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label={t.prev}
                className="absolute inset-y-0 start-2 my-auto grid size-11 place-items-center rounded-full border border-white/20 hover:bg-white/10"
              >
                <Prev className="size-5" />
              </button>
              <motion.img
                key={current.src}
                src={current.src}
                alt={current.alt}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="max-h-full max-w-full rounded-sm object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label={t.next}
                className="absolute inset-y-0 end-2 my-auto grid size-11 place-items-center rounded-full border border-white/20 hover:bg-white/10"
              >
                <Next className="size-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
