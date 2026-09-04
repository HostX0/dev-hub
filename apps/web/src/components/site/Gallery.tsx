"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { useI18n } from "@/i18n/client";
import { imgUrl } from "@/lib/utils";

export function Gallery({ images, title, url }: { images: string[]; title: string; url?: string }) {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, images.length]);

  if (!images.length) return null;

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {images.map((src, i) => (
          <motion.button
            key={`${src}-${i}`}
            onClick={() => setOpen(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
            className="text-start"
          >
            <BrowserFrame src={src} alt={`${title} - ${i + 1}`} url={url} className="transition-transform duration-500 hover:-translate-y-1 hover:shadow-glow" noImageText={t.projects.noImage} />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md"
            onClick={() => setOpen(null)}
            dir="ltr"
          >
            <button className="absolute right-4 top-4 grid size-11 place-items-center rounded-full glass" aria-label={t.projects.close}>
              <X className="size-5" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full glass"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((open - 1 + images.length) % images.length);
                  }}
                  aria-label={t.projects.prev}
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full glass"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((open + 1) % images.length);
                  }}
                  aria-label={t.projects.next}
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
            <motion.img
              key={open}
              src={imgUrl(images[open])}
              alt={title}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-h-[88vh] max-w-[92vw] rounded-2xl border border-line-2 object-contain shadow-card"
              onClick={(e) => e.stopPropagation()}
            />
            <span className="absolute bottom-5 font-display text-xs text-muted">
              {open + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
