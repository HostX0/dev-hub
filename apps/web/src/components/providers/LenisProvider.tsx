"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";

/**
 * Smooth scroll. Tuned to stay close to the wheel (high lerp) so it never feels laggy.
 * Set NEXT_PUBLIC_SMOOTH_SCROLL=off to use the browser's native scroll instead.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SMOOTH_SCROLL === "off") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.26, // higher = follows the wheel faster (0.1 is the floaty default)
      wheelMultiplier: 1.4, // more distance per wheel tick
      smoothWheel: true,
      syncTouch: false, // native scrolling on touch devices
      autoRaf: true,
    });
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.(
        "a[href^='#']",
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (id === "main-content") return;
      const el = id ? document.getElementById(id) : null;
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80, duration: 1 });
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
