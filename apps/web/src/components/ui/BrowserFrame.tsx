import { SafeImage } from "./SafeImage";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  src,
  alt,
  url,
  className,
  imgClassName,
  priority,
  noImageText = "No image",
}: {
  src: string;
  alt: string;
  url?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  noImageText?: string;
}) {
  const host = (() => {
    try {
      return url ? new URL(url).host : "";
    } catch {
      return url ?? "";
    }
  })();
  return (
    <div
      className={cn(
        "group/frame overflow-hidden rounded-2xl border border-line-2 bg-surface-2 shadow-card",
        className,
      )}
      dir="ltr"
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-3/80 px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <div className="mx-auto flex h-6 w-2/3 max-w-sm items-center justify-center gap-1.5 rounded-md bg-bg/70 text-[11px] text-muted-2">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          <span className="truncate font-display">{host || "devshub.cc"}</span>
        </div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        {src ? (
          <SafeImage
            src={src}
            alt={alt}
            priority={priority}
            fallback={noImageText}
            className={cn(
              "absolute inset-0 size-full object-cover object-top transition-transform duration-700 ease-out will-change-transform group-hover/frame:scale-[1.03]",
              imgClassName,
            )}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-grid text-muted-2">
            {noImageText}
          </div>
        )}
      </div>
    </div>
  );
}
