"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { demoHref, type DemoLang, type DemoSlug } from "@/demos/config";
import { cn } from "@/lib/utils";

export type NavLink = { href: string; label: string };

const a11y = {
  ar: { menu: "القائمة", close: "إغلاق القائمة", lang: "English" },
  en: { menu: "Menu", close: "Close menu", lang: "العربية" },
} as const;

/**
 * Sticky navigation shared by every template. Visual identity comes entirely from the
 * class hooks so each site keeps its own look while sharing the a11y/mobile behaviour.
 */
export function DemoNav({
  site,
  lang,
  brand,
  links,
  cta,
  className,
  scrolledClassName,
  linkClassName,
  ctaClassName,
  panelClassName,
  langClassName,
  toggleClassName,
}: {
  site: DemoSlug;
  lang: DemoLang;
  brand: React.ReactNode;
  links: NavLink[];
  cta?: NavLink;
  className?: string;
  scrolledClassName?: string;
  linkClassName?: string;
  ctaClassName?: string;
  panelClassName?: string;
  langClassName?: string;
  toggleClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const t = a11y[lang];
  const other: DemoLang = lang === "ar" ? "en" : "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const trigger = toggle.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      trigger?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        className,
        scrolled && scrolledClassName,
      )}
    >
      <nav
        className="container-d flex h-[4.5rem] items-center justify-between gap-6"
        aria-label={t.menu}
      >
        <a href="#top" className="shrink-0" onClick={() => setOpen(false)}>
          {brand}
        </a>
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  linkClassName,
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={demoHref(site, other)}
            hrefLang={other}
            lang={other}
            className={cn(
              "inline-flex h-10 items-center rounded-full border px-3 text-xs font-bold tracking-wide transition-colors",
              langClassName,
            )}
          >
            {t.lang}
          </a>
          {cta && (
            <a
              href={cta.href}
              className={cn(
                "hidden h-10 items-center gap-2 rounded-full px-5 text-sm font-bold transition-transform hover:-translate-y-0.5 md:inline-flex",
                ctaClassName,
              )}
            >
              {cta.label}
            </a>
          )}
          <button
            ref={toggle}
            type="button"
            aria-label={open ? t.close : t.menu}
            aria-expanded={open}
            aria-controls="demo-mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "grid size-10 place-items-center rounded-full border lg:hidden",
              toggleClassName,
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div
          id="demo-mobile-nav"
          className={cn(
            "menu-enter-d h-[calc(100dvh-4.5rem)] overflow-y-auto border-t p-5 lg:hidden",
            panelClassName,
          )}
        >
          <ul className="container-d space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b py-4 text-xl font-semibold"
                >
                  {l.label}
                </a>
              </li>
            ))}
            {cta && (
              <li className="pt-5">
                <a
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex h-12 items-center justify-center rounded-full font-bold",
                    ctaClassName,
                  )}
                >
                  {cta.label}
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
