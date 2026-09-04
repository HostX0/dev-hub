"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin gradient bar at the very top showing reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-brand via-brand-2 to-brand-3"
      dir="ltr"
    />
  );
}
