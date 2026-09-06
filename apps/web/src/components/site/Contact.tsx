import { MAP_URL } from "@/lib/business";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";
import { ContactForm } from "./ContactForm";
import { getDict, type Locale } from "@/i18n";
import type { SiteSettings } from "@/lib/types";
export function Contact({
  settings,
  locale,
}: {
  settings: SiteSettings;
  locale: Locale;
}) {
  const t = getDict(locale);
  const Arrow = locale !== "en" ? ArrowUpLeft : ArrowUpRight;
  const items = [
    settings.email && {
      icon: Mail,
      label: t.contact.email,
      value: settings.email,
      href: `mailto:${settings.email}`,
      ltr: true,
    },
    settings.whatsapp && {
      icon: MessageCircle,
      label: t.contact.whatsapp,
      value: t.contact.whatsappValue,
      href: `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`,
      ltr: false,
    },
    settings.phone && {
      icon: Phone,
      label: t.contact.phone,
      value: settings.phone,
      href: `tel:${settings.phone.replace(/\s/g, "")}`,
      ltr: true,
    },
    settings.location && {
      icon: MapPin,
      label: t.contact.location,
      value: settings.location,
      href: MAP_URL,
      ltr: false,
    },
  ].filter(Boolean) as {
    icon: typeof Mail;
    label: string;
    value: string;
    href: string;
    ltr: boolean;
  }[];
  return (
    <section id="contact" className="section-pad border-t border-line">
      <div className="container-x">
        <div className="mb-12 flex items-end justify-between gap-8 border-b border-line pb-10">
          <div>
            <p className="eyebrow">
              <span className="size-1.5 bg-brand" />
              {t.contact.eyebrow}
            </p>
            <h2 className="mt-6 text-4xl font-bold leading-[1.15] md:text-6xl">
              {t.contact.title}
              <br />
              <span className="text-gradient-brand">
                {t.contact.titleAccent}
              </span>
            </h2>
          </div>
          <Arrow
            className="hidden size-20 text-brand md:block"
            strokeWidth={1}
          />
        </div>
        <div className="grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="max-w-md text-lg leading-[1.8] text-muted">
              {t.contact.description}
            </p>
            <ul className="mt-9 space-y-6">
              {items.map((it) => (
                <li key={it.label}>
                  {it.href ? (
                    <a
                      href={it.href}
                      target={it.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4"
                    >
                      <it.icon className="size-5 shrink-0 text-brand-2" />
                      <span>
                        <span className="block text-sm text-muted">
                          {it.label}
                        </span>
                        <span
                          className="mt-1 block break-words font-medium transition-colors group-hover:text-brand-2"
                          dir={it.ltr ? "ltr" : undefined}
                        >
                          {it.value}
                        </span>
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">
                      <it.icon className="size-5 text-brand-2" />
                      <span>
                        <span className="block text-sm text-muted">
                          {it.label}
                        </span>
                        <span className="mt-1 block">{it.value}</span>
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <p
              className="mt-12 border-t border-line pt-6 font-display text-xs uppercase tracking-[.18em] text-muted"
              dir="ltr"
            >
              Great products start with a conversation.
            </p>
          </div>
          <div className="surface-light rounded-2xl p-6 sm:p-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
