import { cn } from "@/lib/utils";
import type { DemoLang } from "@/demos/config";

/** Infinite horizontal strip; content is duplicated for a seamless loop. */
export function Marquee({
  items,
  lang,
  className,
  itemClassName,
  separator = "•",
}: {
  items: string[];
  lang: DemoLang;
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
}) {
  const row = [...items, ...items];
  return (
    <div
      className={cn("mask-fade-x overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex w-max items-center gap-8 whitespace-nowrap",
          lang === "ar" ? "animate-d-marquee-rtl" : "animate-d-marquee",
        )}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className={cn("flex items-center gap-8", itemClassName)}
          >
            {item}
            <span className="opacity-40">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
