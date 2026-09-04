import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div className={cn("mb-12 md:mb-16 max-w-3xl", align === "center" ? "mx-auto text-center" : "text-start", className)}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="size-1.5 rounded-full bg-brand-2 shadow-[0_0_10px_#22d3ee]" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-5 text-3xl font-bold leading-[1.25] tracking-tight md:text-5xl md:leading-[1.2]">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-[1.9] text-muted md:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
