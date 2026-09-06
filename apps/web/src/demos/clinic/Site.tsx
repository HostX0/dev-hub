import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Baby,
  Clock,
  HeartPulse,
  MapPin,
  Phone,
  ShieldCheck,
  Siren,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";
import type { DemoLang } from "@/demos/config";
import { DemoNav } from "@/demos/shared/DemoNav";
import { DemoForm } from "@/demos/shared/DemoForm";
import { Accordion } from "@/demos/shared/Accordion";
import { Marquee } from "@/demos/shared/Marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { clinicContent } from "./content";

const ICONS = {
  check: Stethoscope,
  sparkles: Sparkles,
  braces: Smile,
  implant: Activity,
  child: Baby,
  root: HeartPulse,
  veneer: Star,
  emergency: Siren,
} as const;

function Brand({ name, sub }: { name: string; sub: string }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-2xl bg-d-accent text-white">
        <Smile className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-bold">{name}</span>
        <span className="block text-[11px] font-semibold text-d-accent">{sub}</span>
      </span>
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-d-surface-2 px-3 py-1 text-xs font-bold text-d-accent">
      {children}
    </p>
  );
}

export function ClinicSite({ lang }: { lang: DemoLang }) {
  const t = clinicContent[lang];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#doctors", label: t.nav.doctors },
    { href: "#about", label: t.nav.about },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];
  const serviceNames = t.services.items.map((s) => s.title);

  return (
    <div id="top" className="bg-d-bg text-d-fg">
      <DemoNav
        site="clinic"
        lang={lang}
        brand={<Brand name={t.brand} sub={t.brandSub} />}
        links={links}
        cta={{ href: "#contact", label: t.cta }}
        className="bg-d-bg/85 backdrop-blur-md"
        scrolledClassName="border-b border-d-line shadow-[0_10px_30px_-24px_rgba(14,116,144,.5)]"
        linkClassName="text-d-fg/80 hover:text-d-accent"
        ctaClassName="rounded-2xl bg-d-accent text-white"
        langClassName="rounded-2xl border-d-line hover:bg-d-surface"
        toggleClassName="rounded-2xl border-d-line"
        panelClassName="border-d-line bg-d-bg"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-d-surface pt-[4.5rem]">
        <div className="pointer-events-none absolute -end-32 -top-32 size-[520px] rounded-full bg-d-accent-2/15 blur-3xl" aria-hidden="true" />
        <div className="container-d grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <Reveal>
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 text-4xl font-bold leading-[1.2] sm:text-5xl lg:text-6xl">
                {t.hero.title}
                <span className="block text-d-accent">{t.hero.titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-[1.85] text-d-muted">{t.hero.text}</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex h-12 items-center gap-2 rounded-2xl bg-d-accent px-6 font-bold text-white transition-transform hover:-translate-y-0.5">
                {t.hero.primary}
                <Arrow className="size-4" aria-hidden="true" />
              </a>
              <a href="#services" className="inline-flex h-12 items-center rounded-2xl border border-d-line bg-d-bg px-6 font-semibold transition-colors hover:border-d-accent">
                {t.hero.secondary}
              </a>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-d-muted">
              {t.hero.badges.map((b) => (
                <span key={b} className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-d-accent-2" aria-hidden="true" />
                  {b}
                </span>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative">
            <div className="overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/demos/art/clinic-hero.svg" alt="" className="aspect-[16/10] w-full object-cover" loading="eager" />
            </div>
            <div className="relative -mt-16 ms-4 me-4 rounded-3xl border border-d-line bg-d-bg p-6 shadow-[0_30px_60px_-30px_rgba(12,42,58,.35)] sm:ms-10 sm:-mt-20">
              <h2 className="text-lg font-bold">{t.hero.quick.title}</h2>
              <DemoForm
                className="mt-4"
                fields={[
                  { name: "name", label: t.hero.quick.name, half: true },
                  { name: "phone", label: t.hero.quick.phone, type: "tel", half: true },
                  { name: "service", label: t.hero.quick.service, type: "select", placeholder: t.hero.quick.servicePh, options: serviceNames },
                ]}
                submit={t.hero.quick.submit}
                success={t.hero.quick.success}
                note={t.hero.quick.note}
                inputClassName="rounded-xl border-d-line bg-d-surface"
                buttonClassName="rounded-xl bg-d-accent text-white"
                successClassName="min-h-[220px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-d-line">
        <Stagger className="container-d grid grid-cols-2 gap-6 py-10 md:grid-cols-4" stagger={0.08}>
          {t.stats.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <Counter value={s.value} className="block text-3xl font-bold text-d-accent md:text-4xl" />
              <p className="mt-1 text-sm text-d-muted">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Services */}
      <section id="services" className="section-d">
        <div className="container-d">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t.services.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">{t.services.title}</h2>
            <p className="mt-4 leading-[1.8] text-d-muted">{t.services.text}</p>
          </Reveal>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {t.services.items.map((s) => {
              const Icon = ICONS[s.icon as keyof typeof ICONS];
              return (
                <StaggerItem key={s.title} className="h-full">
                  <article className="group flex h-full flex-col rounded-3xl border border-d-line bg-d-bg p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(14,116,144,.35)]">
                    <span className="grid size-12 place-items-center rounded-2xl bg-d-surface-2 text-d-accent transition-colors group-hover:bg-d-accent group-hover:text-white">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-[1.8] text-d-muted">{s.text}</p>
                    <p className="mt-4 text-sm text-d-muted">
                      {t.services.from}{" "}
                      <span className="font-bold text-d-fg" dir="ltr">{s.price}</span> {t.services.currency}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="section-d bg-d-surface">
        <div className="container-d">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.doctors.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">{t.doctors.title}</h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
            {t.doctors.items.map((d) => (
              <StaggerItem key={d.name} className="h-full">
                <article className="h-full overflow-hidden rounded-3xl border border-d-line bg-d-bg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.photo} alt={d.name} className="aspect-[4/3] w-full object-cover object-top" loading="lazy" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{d.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-d-accent">{d.role}</p>
                    <p className="mt-3 text-sm leading-[1.8] text-d-muted">{d.bio}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-d">
        <div className="container-d grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>{t.about.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">{t.about.title}</h2>
          </Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
            {t.about.points.map((p, i) => (
              <StaggerItem key={p.title}>
                <div className="rounded-3xl bg-d-surface p-6">
                  <span className="text-sm font-bold text-d-accent-2">0{i + 1}</span>
                  <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-[1.8] text-d-muted">{p.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <div className="container-d mt-14 border-t border-d-line pt-8">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-d-muted">{t.insurance.title}</p>
          <Marquee items={t.insurance.items} lang={lang} itemClassName="text-lg font-bold text-d-fg/60" />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-d bg-d-ink text-d-ink-fg">
        <div className="container-d">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-d-accent-2">{t.testimonials.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">{t.testimonials.title}</h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {t.testimonials.items.map((q) => (
              <StaggerItem key={q.name} className="h-full">
                <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-7">
                  <div className="flex gap-1 text-d-accent-2" aria-label="5/5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 leading-[1.9]">{q.quote}</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="block font-bold">{q.name}</span>
                    <span className="text-d-ink-muted">{q.role}</span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-d">
        <div className="container-d grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <Eyebrow>{t.faq.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">{t.faq.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion items={t.faq.items} className="divide-d-line rounded-3xl border border-d-line px-6" />
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-d bg-d-surface">
        <div className="container-d grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">{t.contact.title}</h2>
            <p className="mt-4 leading-[1.8] text-d-muted">{t.contact.text}</p>
            <div className="mt-8 rounded-3xl border border-d-line bg-d-bg p-6">
              <h3 className="flex items-center gap-2 font-bold">
                <Clock className="size-4 text-d-accent" aria-hidden="true" />
                {t.contact.hours.title}
              </h3>
              <dl className="mt-3 space-y-2 text-sm">
                {t.contact.hours.rows.map((r) => (
                  <div key={r.days} className="flex justify-between gap-4">
                    <dt className="text-d-muted">{r.days}</dt>
                    <dd className="font-semibold">{r.time}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 space-y-3 border-t border-d-line pt-5 text-sm">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 text-d-accent" aria-hidden="true" />
                  <span>
                    <span className="block text-d-muted">{t.contact.labels.address}</span>
                    <span className="font-semibold">{t.contact.address}</span>
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Phone className="mt-0.5 size-4 text-d-accent" aria-hidden="true" />
                  <span>
                    <span className="block text-d-muted">{t.contact.labels.phone} · {t.contact.emergency}</span>
                    <span className="font-semibold" dir="ltr">{t.contact.phone}</span>
                  </span>
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl border border-d-line bg-d-bg p-6 sm:p-8">
            <DemoForm
              fields={[
                { name: "name", label: t.contact.fields.name, half: true },
                { name: "phone", label: t.contact.fields.phone, type: "tel", half: true },
                { name: "service", label: t.contact.fields.service, type: "select", placeholder: t.contact.fields.servicePh, options: serviceNames, half: true },
                { name: "doctor", label: t.contact.fields.doctor, type: "select", placeholder: t.contact.fields.doctorPh, options: t.doctors.items.map((d) => d.name), half: true, required: false },
                { name: "date", label: t.contact.fields.date, type: "date", half: true },
                { name: "time", label: t.contact.fields.time, type: "time", half: true },
                { name: "notes", label: t.contact.fields.notes, type: "textarea", placeholder: t.contact.fields.notesPh, required: false },
              ]}
              submit={t.contact.submit}
              success={t.contact.success}
              note={t.contact.note}
              inputClassName="rounded-xl border-d-line bg-d-surface"
              buttonClassName="rounded-xl bg-d-accent text-white"
            />
          </Reveal>
        </div>
      </section>

      <footer className="bg-d-ink text-d-ink-fg">
        <div className="container-d flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
          <Brand name={t.brand} sub={t.brandSub} />
          <p className="text-sm text-d-ink-muted">{t.footer.tagline}</p>
          <ul className="flex flex-wrap gap-5 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-d-ink-muted hover:text-d-ink-fg">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-d-ink-muted">
          © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
        </div>
      </footer>
    </div>
  );
}
