import { cn } from "@/lib/utils";

/** Dev Hub mark: a hub node with six connected satellites inside a rounded gradient tile. */
export function LogoMark({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand via-[#6a5cff] to-brand-2 text-white shadow-glow", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_20%,rgba(255,255,255,0.35),transparent_70%)]" />
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" className="relative">
        <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="12" cy="20" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="5.1" cy="8" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="18.9" cy="8" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="5.1" cy="16" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="18.9" cy="16" r="1.5" fill="currentColor" stroke="none" />
        <path d="M12 9.6V5.5M12 14.4v4.1M9.9 10.8 6.4 8.8M14.1 10.8l3.5-2M9.9 13.2l-3.5 2M14.1 13.2l3.5 2" opacity="0.9" />
      </svg>
    </span>
  );
}

export function Logo({ name, nameAr, locale, className, compact }: { name: string; nameAr?: string; locale: "ar" | "en"; className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-tight" dir="ltr">
          {name}
        </span>
        {!compact && nameAr && locale === "ar" && <span className="mt-1 text-[10px] font-semibold text-muted">{nameAr}</span>}
        {!compact && locale === "en" && <span className="mt-1 font-display text-[10px] font-medium uppercase tracking-[0.2em] text-muted">Development Center</span>}
      </span>
    </span>
  );
}
