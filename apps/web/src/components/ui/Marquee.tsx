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
    <div className={cn("group flex w-full overflow-hidden mask-fade-x", className)} dir="ltr">
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-6 pe-6 will-change-transform",
          reverse ? "animate-marquee-rtl" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
