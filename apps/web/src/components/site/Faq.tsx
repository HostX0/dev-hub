"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/i18n/client";
import { cn } from "@/lib/utils";

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x max-w-4xl">
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={
            <>
              {t.faq.title}
              <span className="text-gradient-brand">{t.faq.titleAccent}</span>
            </>
          }
        />
        <div className="space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 0.04}>
                <div className={cn("card overflow-hidden transition-colors", isOpen && "border-brand/40")}>
                  <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-start md:p-6" aria-expanded={isOpen}>
                    <span className="text-base font-bold md:text-lg">{item.q}</span>
                    <span className={cn("grid size-8 shrink-0 place-items-center rounded-full border border-line transition-all", isOpen ? "rotate-45 border-brand/50 bg-brand/15 text-brand-2" : "text-muted")}>
                      <Plus className="size-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-5 leading-[1.9] text-muted md:px-6 md:pb-6">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
