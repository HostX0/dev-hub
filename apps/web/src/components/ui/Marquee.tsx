import { cn } from "@/lib/utils";
export function Marquee({
  children,
  className,
  reverse,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn("group w-full overflow-hidden mask-fade-x", className)}
      dir="ltr"
    >
      <div
        className={cn(
          "flex w-max items-center",
          reverse ? "animate-marquee-rtl" : "animate-marquee",
          pauseOnHover &&
            "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
        )}
      >
        <div className="flex shrink-0 items-center gap-8 pe-8">{children}</div>
        <div
          className="flex shrink-0 items-center gap-8 pe-8"
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
