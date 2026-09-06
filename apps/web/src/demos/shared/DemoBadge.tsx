"use client";

import { useState } from "react";
import { LayoutGrid, Languages, X } from "lucide-react";
import { demoHref, type DemoLang, type DemoSlug } from "@/demos/config";

const copy = {
  ar: {
    demo: "نموذج من DevsHub.cc",
    all: "كل القوالب",
    switch: "English",
    hide: "إخفاء",
  },
  en: {
    demo: "Demo by DevsHub.cc",
    all: "All templates",
    switch: "العربية",
    hide: "Hide",
  },
} as const;

/** Small floating toolbar shared by every template so visitors can return to the gallery or flip the language. */
export function DemoBadge({ site, lang }: { site: DemoSlug; lang: DemoLang }) {
  const [hidden, setHidden] = useState(false);
  const t = copy[lang];
  const other: DemoLang = lang === "ar" ? "en" : "ar";
  if (hidden) return null;
  return (
    <div
      role="region"
      aria-label={t.demo}
      className="menu-enter-d fixed bottom-4 z-[60] flex items-center gap-1 rounded-full border border-white/15 bg-[#0A0A0B]/90 p-1.5 text-xs font-semibold text-[#F8FAFC] shadow-[0_20px_50px_-20px_rgba(0,0,0,.8)] backdrop-blur-xl ltr:left-4 rtl:right-4"
      dir={lang === "ar" ? "rtl" : "ltr"}
      style={{
        fontFamily:
          "var(--font-latin), var(--font-plex), system-ui, sans-serif",
      }}
    >
      <a
        href={`/${lang}/demos`}
        className="flex items-center gap-2 rounded-full py-1.5 pe-3 ps-1.5 transition-colors hover:bg-white/10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/mark.svg"
          alt=""
          width={22}
          height={22}
          className="size-[22px]"
        />
        <span className="hidden sm:inline">{t.demo}</span>
        <LayoutGrid className="size-3.5 opacity-70" aria-hidden="true" />
        <span className="sr-only sm:not-sr-only sm:text-[#A5A7FA]">
          {t.all}
        </span>
      </a>
      <span className="h-5 w-px bg-white/15" aria-hidden="true" />
      <a
        href={demoHref(site, other)}
        hrefLang={other}
        lang={other}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-white/10"
      >
        <Languages className="size-3.5" aria-hidden="true" />
        {t.switch}
      </a>
      <button
        type="button"
        onClick={() => setHidden(true)}
        aria-label={t.hide}
        className="grid size-7 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
