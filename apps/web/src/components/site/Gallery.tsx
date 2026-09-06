"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { useI18n } from "@/i18n/client";
import { imgUrl } from "@/lib/utils";

export function Gallery({
  images,
  title,
  url,
}: {
  images: string[];
  title: string;
  url?: string;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const isOpen = open !== null;

  useEffect(() => {
    const element = dialog.current;
    if (!element || !isOpen) return;
    const trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setOpen((i) => (i === null ? null : (i + 1) % images.length));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setOpen((i) =>
          i === null ? null : (i - 1 + images.length) % images.length,
        );
      }
    };
    element.addEventListener("keydown", onKey);
    return () => {
      element.removeEventListener("keydown", onKey);
      element.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [isOpen, images.length]);

  if (!images.length) return null;
  const control =
    "absolute z-10 grid size-11 place-items-center rounded-full border border-white/20 bg-[#18181D] text-white hover:bg-[#303039]";
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            className="text-start"
            aria-label={`${t.projects.shots}: ${title} (${i + 1})`}
          >
            <BrowserFrame
              src={src}
              alt={`${title} - ${i + 1}`}
              url={url}
              className="transition-transform duration-300 hover:-translate-y-1"
              noImageText={t.projects.noImage}
            />
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        aria-label={`${t.projects.shots}: ${title}`}
        onCancel={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
        data-lenis-prevent
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center border-0 bg-[#0A0A0B]/95 p-14 text-white backdrop-blur-md open:flex backdrop:bg-black/70"
        dir="ltr"
      >
        {open !== null && (
          <>
            <button
              type="button"
              className={`${control} right-4 top-4`}
              aria-label={t.projects.close}
              onClick={() => setOpen(null)}
            >
              <X className="size-5" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className={`${control} left-2 top-1/2 -translate-y-1/2 md:left-4`}
                  aria-label={t.projects.prev}
                  onClick={() =>
                    setOpen((open - 1 + images.length) % images.length)
                  }
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  className={`${control} right-2 top-1/2 -translate-y-1/2 md:right-4`}
                  aria-label={t.projects.next}
                  onClick={() => setOpen((open + 1) % images.length)}
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
            {/* CMS screenshots keep their original aspect ratio and can be arbitrarily tall. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgUrl(images[open])}
              alt={`${title} - ${open + 1}`}
              className="max-h-[85dvh] max-w-full rounded-lg object-contain"
            />
            <span
              className="absolute bottom-5 text-sm text-[#CDD2E3]"
              aria-live="polite"
            >
              {open + 1} / {images.length}
            </span>
          </>
        )}
      </dialog>
    </>
  );
}
