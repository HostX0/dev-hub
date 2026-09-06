"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
  className,
  itemClassName,
}: {
  items: { q: string; a: string }[];
  className?: string;
  itemClassName?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const id = useId();
  return (
    <div className={cn("divide-y", className)}>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q} className={itemClassName}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-start text-base font-semibold md:text-lg"
              >
                {item.q}
                <Plus
                  className={cn(
                    "size-5 shrink-0 text-d-accent transition-transform duration-300",
                    open && "rotate-45",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`${id}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 leading-[1.9] text-d-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
