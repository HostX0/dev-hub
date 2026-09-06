import { cn } from "@/lib/utils";

/** A geometric D with a forward cut and independent indigo hub block. */
export function LogoMark({
  className,
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <path
        d="M24 4H43C63 4 76 19 76 40S63 76 43 76H24V52H46V28H24V4Z"
        fill="currentColor"
      />
      <path d="M3 28H24V52H3Z" fill="#6366F1" />
    </svg>
  );
}
export function Logo({
  className,
}: {
  name?: string;
  nameAr?: string;
  locale?: "ar" | "en";
  className?: string;
  compact?: boolean;
}) {
  return (
    <span
      className={cn("brand-logo inline-flex items-center gap-2.5", className)}
      dir="ltr"
      aria-label="DevsHub.cc"
    >
      <LogoMark size={36} />
      <span className="brand-wordmark">
        DevsHub<span className="font-normal">.cc</span>
      </span>
    </span>
  );
}
