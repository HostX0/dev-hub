import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/ui/BrandIcons";
import { Logo } from "@/components/ui/Logo";
import { getDict, type Locale } from "@/i18n";
import type { Service, SiteSettings } from "@/lib/types";

export function Footer({ settings, services, locale: l }: { settings: SiteSettings; services: Service[]; locale: Locale }) {
  const t = getDict(l);
  const base = `/${l}`;
  const socials = [
    { href: settings.socials?.github, icon: GithubIcon, label: "GitHub" },
    { href: settings.socials?.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
    { href: settings.socials?.twitter, icon: XIcon, label: "X" },
    { href: settings.socials?.instagram, icon: InstagramIcon, label: "Instagram" },
    { href: settings.email ? `mailto:${settings.email}` : "", icon: Mail, label: "Email" },
  ].filter((s) => s.href);
  const serviceLinks = services.length ? services.slice(0, 6).map((s) => s.title) : t.footer.serviceLinks;

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[400px] bg-[radial-gradient(50%_80%_at_50%_100%,rgba(124,108,255,0.12),transparent_70%)]" />
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href={base} aria-label={settings.siteName}>
              <Logo name={settings.siteName} nameAr={settings.siteNameAr} locale={l} />
            </Link>
            <p className="mt-5 max-w-sm leading-[1.9] text-muted">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:text-fg hover:shadow-glow"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">{t.footer.links}</h4>
            <ul className="space-y-2.5 text-muted">
              <li><Link href={`${base}/#services`} className="transition-colors hover:text-fg">{t.nav.services}</Link></li>
              <li><Link href={`${base}/#capabilities`} className="transition-colors hover:text-fg">{t.nav.capabilities}</Link></li>
              <li><Link href={`${base}/projects`} className="transition-colors hover:text-fg">{t.nav.work}</Link></li>
              <li><Link href={`${base}/#about`} className="transition-colors hover:text-fg">{t.nav.about}</Link></li>
              <li><Link href={`${base}/#contact`} className="transition-colors hover:text-fg">{t.nav.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">{t.footer.services}</h4>
            <ul className="space-y-2.5 text-muted">
              {serviceLinks.map((s) => (
                <li key={s}><Link href={`${base}/#services`} className="transition-colors hover:text-fg">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">{t.footer.contact}</h4>
            <ul className="space-y-2.5 text-muted">
              {settings.email && <li><a href={`mailto:${settings.email}`} className="transition-colors hover:text-fg" dir="ltr">{settings.email}</a></li>}
              {settings.phone && <li><span dir="ltr">{settings.phone}</span></li>}
              {settings.location && <li>{settings.location}</li>}
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted-2 md:flex-row">
          <p>© {new Date().getFullYear()} {settings.siteName}{l === "ar" && settings.siteNameAr ? ` · ${settings.siteNameAr}` : ""}. {t.footer.rights}</p>
          <div className="flex items-center gap-4">
            <p className="font-display" dir="ltr">{t.footer.built}</p>
            <a href="#" aria-label={t.footer.top} className="grid size-9 place-items-center rounded-full border border-line text-muted transition-all hover:border-brand/50 hover:text-fg">
              <ArrowUp className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
