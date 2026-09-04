import { Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { ContactForm } from "./ContactForm";
import { getDict, type Locale } from "@/i18n";
import type { SiteSettings } from "@/lib/types";

export function Contact({ settings, locale }: { settings: SiteSettings; locale: Locale }) {
  const t = getDict(locale);
  const items = [
    settings.email && { icon: Mail, label: t.contact.email, value: settings.email, href: `mailto:${settings.email}`, ltr: true },
    settings.whatsapp && { icon: MessageCircle, label: t.contact.whatsapp, value: t.contact.whatsappValue, href: `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`, ltr: false },
    settings.phone && { icon: Phone, label: t.contact.phone, value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}`, ltr: true },
    settings.location && { icon: MapPin, label: t.contact.location, value: settings.location, href: "", ltr: false },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string; ltr: boolean }[];

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[600px] bg-[radial-gradient(60%_80%_at_50%_100%,rgba(124,108,255,0.2),transparent_70%)]" />

      {/* CTA band */}
      <div className="container-x mb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-r from-brand/25 via-surface to-brand-2/20 px-8 py-10 text-center md:px-14">
            <div className="pointer-events-none absolute inset-0 bg-grid-sm opacity-30" />
            <div className="glow-blob pointer-events-none absolute -top-40 left-1/2 h-80 w-[700px] -translate-x-1/2 [--glow-color:rgba(124,108,255,0.35)]" />
            <div className="relative">
              <Sparkles className="mx-auto size-6 text-brand-2" />
              <h2 className="mt-4 text-2xl font-bold leading-[1.3] md:text-4xl">
                {t.cta.title}
                <span className="text-gradient">{t.cta.titleAccent}</span>
              </h2>
              <p className="mt-3 text-muted">{t.cta.text}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-x">
        <div className="card relative overflow-hidden">
          <BorderBeam />
          <div className="grid lg:grid-cols-[1fr_1.2fr]">
            <div className="relative bg-gradient-to-br from-brand/20 via-transparent to-brand-2/10 p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" />
              <div className="relative">
                <Reveal>
                  <span className="eyebrow">{t.contact.eyebrow}</span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="mt-5 text-3xl font-bold leading-[1.25] md:text-4xl">
                    {t.contact.title} <br />
                    <span className="text-gradient">{t.contact.titleAccent}</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-5 leading-[1.9] text-muted">{t.contact.description}</p>
                </Reveal>
                <ul className="mt-10 space-y-4">
                  {items.map((it, i) => (
                    <Reveal key={it.label} delay={0.15 + i * 0.05}>
                      {it.href ? (
                        <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-4">
                          <ContactIcon icon={it.icon} />
                          <span>
                            <span className="block text-xs text-muted-2">{it.label}</span>
                            <span className="block font-semibold" dir={it.ltr ? "ltr" : undefined}>{it.value}</span>
                          </span>
                        </a>
                      ) : (
                        <span className="group flex items-center gap-4">
                          <ContactIcon icon={it.icon} />
                          <span>
                            <span className="block text-xs text-muted-2">{it.label}</span>
                            <span className="block font-semibold">{it.value}</span>
                          </span>
                        </span>
                      )}
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactIcon({ icon: Icon }: { icon: typeof Mail }) {
  return (
    <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.04] text-brand-2 transition-all group-hover:border-brand/50 group-hover:shadow-glow">
      <Icon className="size-5" />
    </span>
  );
}
