import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Clock,
  Cog,
  Compass,
  HardHat,
  Mail,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import type { DemoLang } from "@/demos/config";
import { DemoNav } from "@/demos/shared/DemoNav";
import { DemoForm } from "@/demos/shared/DemoForm";
import { Marquee } from "@/demos/shared/Marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { companyContent } from "./content";

const ICONS = {
  hardhat: HardHat,
  cog: Cog,
  compass: Compass,
  zap: Zap,
  truck: Truck,
  shield: ShieldCheck,
} as const;

function Brand({ name, sub }: { name: string; sub: string }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-lg bg-d-ink text-d-accent">
        <Building2 className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-base font-bold">{name}</span>
        <span className="block text-[11px] font-medium tracking-wide text-d-muted">
          {sub}
        </span>
      </span>
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow-d">
      <span className="h-px w-8 bg-d-accent" aria-hidden="true" />
      {children}
    </p>
  );
}

export function CompanySite({ lang }: { lang: DemoLang }) {
  const t = companyContent[lang];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#projects", label: t.nav.projects },
    { href: "#about", label: t.nav.about },
    { href: "#team", label: t.nav.team },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <div id="top" className="bg-d-bg text-d-fg">
      <DemoNav
        site="company"
        lang={lang}
        brand={<Brand name={t.brand} sub={t.brandSub} />}
        links={links}
        cta={{ href: "#contact", label: t.cta }}
        className="bg-d-bg/80 backdrop-blur-md"
        scrolledClassName="border-b border-d-line bg-d-bg/95 shadow-[0_10px_30px_-20px_rgba(16,35,63,.35)]"
        linkClassName="text-d-fg/80 hover:text-d-fg"
        ctaClassName="bg-d-accent text-d-accent-fg"
        langClassName="border-d-line text-d-fg hover:bg-d-surface-2"
        toggleClassName="border-d-line"
        panelClassName="border-d-line bg-d-bg"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-d-ink pt-[4.5rem] text-d-ink-fg">
        <div
          className="pointer-events-none absolute -end-40 top-0 h-[120%] w-[55%] -skew-x-12 bg-d-accent/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -end-16 top-1/3 h-72 w-72 rounded-full bg-d-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-d relative grid items-center gap-14 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <Reveal>
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="d-display-tight mt-6 text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl">
                {t.hero.title}{" "}
                <span className="text-d-accent">{t.hero.titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-[1.85] text-d-ink-muted">
                {t.hero.text}
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-d-accent px-6 font-bold text-d-accent-fg transition-transform hover:-translate-y-0.5"
              >
                {t.hero.primary}
                <Arrow className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#services"
                className="inline-flex h-12 items-center rounded-lg border border-white/20 px-6 font-semibold transition-colors hover:bg-white/10"
              >
                {t.hero.secondary}
              </a>
            </Reveal>
          </div>
          <Stagger className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1" stagger={0.1}>
            {t.hero.stats.map((s, i) => (
              <StaggerItem key={s.label}>
                <div
                  className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:max-w-sm"
                  style={{ marginInlineStart: `${i * 2.5}rem` }}
                >
                  <Counter
                    value={s.value}
                    className="block text-4xl font-bold text-d-accent"
                  />
                  <p className="mt-1 text-sm text-d-ink-muted">{s.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <div className="border-t border-white/10 py-6">
          <p className="container-d mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-d-ink-muted">
            {t.clientsLabel}
          </p>
          <Marquee
            items={t.clients}
            lang={lang}
            itemClassName="text-lg font-semibold text-white/70"
          />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-d">
        <div className="container-d">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.services.eyebrow}</Eyebrow>
            <h2 className="d-display-tight mt-4 text-3xl font-bold sm:text-4xl">
              {t.services.title}
            </h2>
            <p className="mt-4 text-lg leading-[1.8] text-d-muted">{t.services.text}</p>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {t.services.items.map((s, i) => {
              const Icon = ICONS[s.icon as keyof typeof ICONS];
              return (
                <StaggerItem key={s.title} className="h-full">
                  <article className="group h-full rounded-xl border border-d-line bg-d-surface p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(16,35,63,.35)]">
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-lg bg-d-ink text-d-accent transition-colors group-hover:bg-d-accent group-hover:text-d-accent-fg">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-bold text-d-muted">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                    <p className="mt-2 leading-[1.8] text-d-muted">{s.text}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-d bg-d-surface">
        <div className="container-d grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-2xl border border-d-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/demos/art/co-project-02.svg"
                alt=""
                className="aspect-[16/10] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 end-6 rounded-xl bg-d-ink p-6 text-d-ink-fg shadow-xl">
              <p className="text-3xl font-bold text-d-accent">{t.about.since}</p>
              <p className="text-sm text-d-ink-muted">{t.about.sinceText}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>{t.about.eyebrow}</Eyebrow>
            <h2 className="d-display-tight mt-4 text-3xl font-bold sm:text-4xl">
              {t.about.title}
            </h2>
            <p className="mt-5 leading-[1.9] text-d-muted">{t.about.text}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.about.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm font-medium">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-d-accent" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section-d">
        <div className="container-d">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Eyebrow>{t.projects.eyebrow}</Eyebrow>
              <h2 className="d-display-tight mt-4 text-3xl font-bold sm:text-4xl">
                {t.projects.title}
              </h2>
            </div>
            <p className="max-w-sm text-d-muted">{t.projects.text}</p>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
            {t.projects.items.map((p) => (
              <StaggerItem key={p.title}>
                <article className="group overflow-hidden rounded-xl border border-d-line bg-d-surface">
                  <div className="overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-semibold text-d-muted">
                      <span className="rounded-full bg-d-accent/15 px-2.5 py-1 text-d-fg">
                        {p.sector}
                      </span>
                      <span>{p.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{p.year}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
                    <p className="mt-3 text-sm text-d-muted">
                      {t.projects.value}:{" "}
                      <span className="font-bold text-d-fg">{p.value}</span>
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Process */}
      <section className="section-d bg-d-ink text-d-ink-fg">
        <div className="container-d">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.process.eyebrow}</Eyebrow>
            <h2 className="d-display-tight mt-4 text-3xl font-bold sm:text-4xl">
              {t.process.title}
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-8 md:grid-cols-4" stagger={0.1}>
            {t.process.steps.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="relative border-t border-white/15 pt-6">
                  <span
                    className="absolute -top-px start-0 h-px w-16 bg-d-accent"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-bold text-d-accent">0{i + 1}</span>
                  <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 leading-[1.8] text-d-ink-muted">{s.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section-d">
        <div className="container-d">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.team.eyebrow}</Eyebrow>
            <h2 className="d-display-tight mt-4 text-3xl font-bold sm:text-4xl">
              {t.team.title}
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {t.team.members.map((m) => (
              <StaggerItem key={m.name}>
                <div className="rounded-xl border border-d-line bg-d-surface p-6 text-center">
                  <span className="mx-auto grid size-20 place-items-center rounded-full bg-d-ink text-xl font-bold text-d-accent">
                    {m.initials}
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{m.name}</h3>
                  <p className="mt-1 text-sm text-d-muted">{m.role}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-d bg-d-surface">
        <div className="container-d">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.testimonials.eyebrow}</Eyebrow>
            <h2 className="d-display-tight mt-4 text-3xl font-bold sm:text-4xl">
              {t.testimonials.title}
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {t.testimonials.items.map((q) => (
              <StaggerItem key={q.name} className="h-full">
                <figure className="flex h-full flex-col rounded-xl border border-d-line bg-d-bg p-7">
                  <Quote className="size-7 text-d-accent" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 leading-[1.9]">{q.quote}</blockquote>
                  <figcaption className="mt-6 border-t border-d-line pt-4 text-sm">
                    <span className="block font-bold">{q.name}</span>
                    <span className="text-d-muted">{q.role}</span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-d">
        <div className="container-d grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <h2 className="d-display-tight mt-4 text-3xl font-bold sm:text-4xl">
              {t.contact.title}
            </h2>
            <p className="mt-4 leading-[1.8] text-d-muted">{t.contact.text}</p>
            <dl className="mt-8 space-y-4 text-sm">
              {[
                { icon: MapPin, label: t.contact.labels.address, value: t.contact.info.address },
                { icon: Phone, label: t.contact.labels.phone, value: t.contact.info.phone, ltr: true },
                { icon: Mail, label: t.contact.labels.email, value: t.contact.info.email, ltr: true },
                { icon: Clock, label: t.contact.labels.hours, value: t.contact.info.hours },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3">
                  <row.icon className="mt-0.5 size-4 text-d-accent" aria-hidden="true" />
                  <div>
                    <dt className="text-d-muted">{row.label}</dt>
                    <dd className="font-semibold" dir={row.ltr ? "ltr" : undefined}>
                      {row.value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl border border-d-line bg-d-surface p-6 sm:p-8">
            <DemoForm
              fields={[
                { name: "name", label: t.contact.fields.name, half: true },
                { name: "company", label: t.contact.fields.company, half: true, required: false },
                { name: "email", label: t.contact.fields.email, type: "email", half: true },
                { name: "phone", label: t.contact.fields.phone, type: "tel", half: true },
                {
                  name: "service",
                  label: t.contact.fields.service,
                  type: "select",
                  placeholder: t.contact.fields.servicePh,
                  options: t.services.items.map((s) => s.title),
                },
                {
                  name: "message",
                  label: t.contact.fields.message,
                  type: "textarea",
                  placeholder: t.contact.fields.messagePh,
                },
              ]}
              submit={t.contact.submit}
              success={t.contact.success}
              note={t.contact.note}
              inputClassName="border-d-line bg-d-bg"
              buttonClassName="bg-d-ink text-d-ink-fg"
            />
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-d-ink text-d-ink-fg">
        <div className="container-d grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Brand name={t.brand} sub={t.brandSub} />
            <p className="mt-5 max-w-sm leading-[1.8] text-d-ink-muted">{t.footer.tagline}</p>
          </div>
          <div>
            <h3 className="mb-4 font-bold">{t.footer.columns.company}</h3>
            <ul className="space-y-2 text-sm text-d-ink-muted">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-d-ink-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">{t.footer.columns.services}</h3>
            <ul className="space-y-2 text-sm text-d-ink-muted">
              {t.services.items.map((s) => (
                <li key={s.title}>
                  <a href="#services" className="hover:text-d-ink-fg">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold">{t.footer.columns.offices}</h3>
            <ul className="space-y-2 text-sm text-d-ink-muted">
              {t.footer.offices.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-d-ink-muted">
          © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
        </div>
      </footer>
    </div>
  );
}
