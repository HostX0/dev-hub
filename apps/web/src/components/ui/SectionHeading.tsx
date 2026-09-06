import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
  as: Heading = "h2",
}: {
  as?: "h1" | "h2";
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "section-heading mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="eyebrow">
          <span className="size-1.5 bg-brand" />
          {eyebrow}
        </p>
      )}
      <div
        className={cn(
          "mt-5",
          align === "start" &&
            "grid items-end gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20",
        )}
      >
        <Heading className="text-3xl font-bold leading-[1.2] md:text-5xl">
          {title}
        </Heading>
        {description && (
          <p className="max-w-lg text-base leading-[1.8] text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
