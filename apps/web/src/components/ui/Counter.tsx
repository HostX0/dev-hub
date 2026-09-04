"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

/** Animates numeric part of a value like "+40" or "100%" */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const m = value.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);

  useEffect(() => {
    if (!inView || !ref.current || !m) return;
    const target = parseFloat(m[2].replace(",", "."));
    const decimals = (m[2].split(/[.,]/)[1] ?? "").length;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${m[1]}${v.toFixed(decimals)}${m[3]}`;
      },
    });
    return () => controls.stop();
  }, [inView, m]);

  return (
    <span ref={ref} className={className}>
      {m ? `${m[1]}0${m[3]}` : value}
    </span>
  );
}
