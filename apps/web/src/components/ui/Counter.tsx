"use client";
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
/** Animate only on entry. The real value remains available to assistive tech and without JavaScript. */
export function Counter({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  useEffect(() => {
    const match = value.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
    if (!inView || !ref.current || !match || reduced) return;
    const element = ref.current;
    const target = Number(match[2].replace(",", ".")),
      decimals = (match[2].split(/[.,]/)[1] ?? "").length;
    const controls = animate(0, target, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        element.textContent = `${match[1]}${v.toFixed(decimals)}${match[3]}`;
      },
      onComplete: () => {
        element.textContent = value;
      },
    });
    return () => {
      controls.stop();
      element.textContent = value;
    };
  }, [inView, reduced, value]);
  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
    </span>
  );
}
