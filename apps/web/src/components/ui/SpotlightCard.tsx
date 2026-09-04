"use client";

import { cn } from "@/lib/utils";

export function SpotlightCard({
  children,
  className,
  as = "div",
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { as?: "div" | "article" }) {
  const Comp = as as "div";
  return (
    <Comp
      {...rest}
      className={cn("card spotlight", className)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </Comp>
  );
}
