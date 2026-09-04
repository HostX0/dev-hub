"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpLeft, ArrowUpRight, Languages, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";
import { Logo } from "@/components/ui/Logo";
import { localeHref, useI18n } from "@/i18n/client";
import { otherLocale, switchLocalePath } from "@/i18n/config";
import type { SiteSettings } from "@/lib/types";

export function Navbar({ settings }: { settings: SiteSettings }) {
  const { t, locale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const Arrow = locale === "ar" ? ArrowUpLeft : ArrowUpRight;

  const LINKS = [
    { href: "/", label: t.nav.home },
    { href: "/#services", label: t.nav.services },
    { href: "/#capabilities", label: t.nav.capabilities },
    { href: "/projects", label: t.nav.work },
    { href: "/#about", label: t.nav.about },
    { href: "/#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const other = otherLocale(locale);
  const switchHref = switchLocalePath(pathname, other);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 md:px-4",
          scrolled ? "glass shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]" : "border border-transparent",
        )}
      >
        <Link href={localeHref(locale, "/")} className="ps-1" aria-label={settings.siteName}>
          <Logo name={settings.siteName} nameAr={settings.siteNameAr} locale={locale} />
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {LINKS.map((l) => {
            const full = localeHref(locale, l.href);
            const active = l.href === "/" ? pathname === `/${locale}` : !l.href.includes("#") && pathname.startsWith(full);
            return (
              <li key={l.href}>
                <Link
                  href={full}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-fg",
                    active && "text-fg",
                  )}
                >
                  {active && <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full bg-white/[0.06]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="relative">{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={switchHref}
            aria-label={t.nav.switchLangAria}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-semibold text-muted transition-all hover:border-brand/50 hover:text-fg"
          >
            <Languages className="size-3.5 text-brand-2" />
            <span className={other === "ar" ? "" : "font-display"}>{t.nav.switchLang}</span>
          </a>
          <Magnetic strength={0.25} className="hidden md:inline-block">
            <Link
              href={localeHref(locale, "/#contact")}
              className="group inline-flex h-10 items-center gap-2 rounded-full bg-fg px-5 text-sm font-semibold text-bg transition-all hover:bg-white hover:shadow-glow"
            >
              {t.nav.cta}
              <Arrow className="size-4 transition-transform group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5" />
            </Link>
          </Magnetic>
          <button
            aria-label={t.nav.menu}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-line text-fg lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass absolute inset-x-4 top-20 overflow-hidden rounded-3xl p-3 lg:hidden"
          >
            <div className="pointer-events-none absolute -end-16 -top-16 size-48 rounded-full bg-brand/30 blur-3xl" />
            <ul className="relative flex flex-col">
              {LINKS.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link href={localeHref(locale, l.href)} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base font-medium text-fg hover:bg-white/5">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <li className="mt-2">
                <Link href={localeHref(locale, "/#contact")} onClick={() => setOpen(false)} className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-fg font-semibold text-bg">
                  {t.nav.cta}
                  <Arrow className="size-4" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
