"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpLeft, ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { localeHref, useI18n } from "@/i18n/client";
import { LOCALES, LOCALE_NAMES, switchLocalePath } from "@/i18n/config";
import { blogCopy } from "@/i18n/blog";
import type { SiteSettings } from "@/lib/types";

export function Navbar({ settings }: { settings: SiteSettings }) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const languageMenu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const details = languageMenu.current;
    if (details) details.open = false;
    const dismiss = (event: PointerEvent) => {
      if (details && !details.contains(event.target as Node))
        details.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details?.open) {
        details.open = false;
        details.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [pathname]);
  const Arrow = locale !== "en" ? ArrowUpLeft : ArrowUpRight;
  const links = [
    { href: "/", label: t.nav.home },
    { href: "/#services", label: t.nav.services },
    { href: "/projects", label: t.nav.work },
    { href: "/#capabilities", label: t.nav.capabilities },
    { href: "/blog", label: blogCopy[locale].nav },
    { href: "/#about", label: t.nav.about },
  ];
  useEffect(() => {
    if (!open) return;
    const trigger = toggle.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
      if (e.key === "Tab") {
        const items = [
          toggle.current,
          ...Array.from(
            panel.current?.querySelectorAll<HTMLElement>("a,button,summary") ??
              [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      trigger?.focus();
    };
  }, [open]);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0A0A0B]/95 text-[#F8FAFC] backdrop-blur-xl">
      <nav
        className="container-x flex h-20 items-center justify-between gap-4"
        aria-label={t.nav.menu}
      >
        <Link
          href={localeHref(locale, "/")}
          aria-label="DevsHub.cc"
          onClick={() => setOpen(false)}
        >
          <Logo name={settings.siteName} locale={locale} />
        </Link>
        <ul className="hidden items-center gap-7 xl:flex">
          {links.map((l) => {
            const active =
              ["/projects", "/blog"].includes(l.href) &&
              pathname.includes(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={localeHref(locale, l.href)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-sm transition-colors hover:text-white",
                    active ? "text-white" : "text-[#A8AFBE]",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-3 md:gap-5">
          <details ref={languageMenu} className="locale-menu relative">
            <summary
              aria-label={t.nav.switchLangAria}
              className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-lg px-2 font-display text-xs font-bold text-[#CCD0DC] hover:bg-white/5 hover:text-white"
            >
              {locale === "ckb" ? "KU" : locale.toUpperCase()}
              <span aria-hidden="true">⌄</span>
            </summary>
            <ul className="absolute end-0 top-full mt-2 min-w-36 rounded-xl border border-white/15 bg-[#141416] p-2 shadow-xl">
              {LOCALES.map((l) => (
                <li key={l}>
                  <a
                    href={switchLocalePath(pathname, l)}
                    lang={l}
                    hrefLang={l}
                    aria-current={l === locale ? "true" : undefined}
                    onClick={(e) => {
                      e.currentTarget.href =
                        switchLocalePath(pathname, l) +
                        window.location.search +
                        window.location.hash;
                    }}
                    className={cn(
                      "block rounded-lg px-4 py-3 text-sm hover:bg-white/10",
                      l === locale ? "bg-white/5 text-[#A5A7FA]" : "text-white",
                    )}
                  >
                    {LOCALE_NAMES[l]}
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <Link
            href={localeHref(locale, "/#contact")}
            onClick={() => setOpen(false)}
            className="hidden h-11 items-center gap-3 rounded-lg bg-[#5B5EE8] px-5 text-sm font-bold text-white transition-colors hover:bg-[#4F46E5] md:inline-flex"
          >
            {t.nav.cta}
            <Arrow className="size-4" />
          </Link>
          <button
            ref={toggle}
            type="button"
            aria-label={t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
            className="grid size-11 place-items-center rounded-lg border border-white/15 xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div
          ref={panel}
          id="mobile-navigation"
          data-lenis-prevent
          className="menu-enter h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-[#0A0A0B] p-5 xl:hidden"
        >
          <ul className="container-x space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={localeHref(locale, l.href)}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/10 py-4 text-xl font-bold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-5">
              <Link
                href={localeHref(locale, "/#contact")}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg bg-[#5B5EE8] p-4 font-bold"
              >
                {t.nav.cta}
                <Arrow className="size-5" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
