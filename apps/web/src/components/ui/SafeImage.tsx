"use client";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn, imgUrl } from "@/lib/utils";
/** Keep the layout and accessible name intact when a CMS image is missing or cannot decode. */
export function SafeImage({
  src,
  alt,
  className,
  priority,
  fallback = "Image unavailable",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallback?: string;
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const resolved = imgUrl(src);
  if (!resolved || failedSource === resolved)
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex flex-col items-center justify-center gap-3 bg-surface text-muted",
          className,
        )}
      >
        <ImageOff className="size-7" aria-hidden="true" />
        <span className="max-w-xs px-5 text-center text-sm">{fallback}</span>
      </div>
    );
  return (
    // CMS SVGs are served intact so their original text stays readable.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      onError={() => setFailedSource(resolved)}
    />
  );
}
