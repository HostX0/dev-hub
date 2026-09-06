import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Clock,
  MapPin,
  Maximize2,
  Phone,
  Search,
  ShieldCheck,
} from "lucide-react";
import type { DemoLang } from "@/demos/config";
import { DemoNav } from "@/demos/shared/DemoNav";
import { DemoForm } from "@/demos/shared/DemoForm";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { cn } from "@/lib/utils";
import { realestateContent } from "./content";

function Brand({ name, sub, dark }: { name: string; sub: string; dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className={cn("grid size-10 place-items-center rounded-lg", dark ? "bg-d-accent text-d-accent-fg" : "bg-d-ink text-d-accent")}>
        <Building2 className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-lg font-extrabold tracking-tight">{name}</span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.15em] opacity-70">{sub}</span>
      </span>
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em]">
      <span className="size-2 rounded-sm bg-d-accent" aria-hidden="true" />
      {children}
    </p>
  );
}

export function RealEstateSite({ lang }: { lang: DemoLang }) {
  const t = realestateContent[lang];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const links = [
    { href: "#listings", label: t.nav.listings },
    { href: "#areas", label: t.nav.areas },
    { href: "#agents", label: t.nav.agents },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];
  const selectCls = "h-12 w-full rounded-lg border border-d-line bg-d-surface px-3 text-sm font-semibold outline-none focus:border-d-fg";

  return (
    <div id="top" className="bg-d-bg text-d-fg">
      <DemoNav
        site="realestate"
        lang={lang}
        brand={<span className="text-d-ink-fg"><Brand name={t.brand} sub={t.brandSub} dark /></span>}
        links={links}
        cta={{ href: "#contact", label: t.cta }}
        className="bg-d-ink text-d-ink-fg"
        scrolledClassName="border-b border-white/10"
        linkClassName="text-d-ink-fg/75 hover:text-d-accent"
        ctaClassName="rounded-lg bg-d-accent text-d-accent-fg"
        langClassName="rounded-lg border-white/25 text-d-ink-fg hover:bg-white/10"
        toggleClassName="rounded-lg border-white/25 text-d-ink-fg"
        panelClassName="border-white/10 bg-d-ink text-d-ink-fg"
      />

      {/* Hero */}
      <section className="relative bg-d-ink pt-[4.5rem] text-d-ink-fg">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/demos/art/re-hero.svg" alt="" className="size-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-d-ink via-d-ink/70 to-d-ink/20" />
        </div>
        <div className="container-d relative py-20 lg:py-28">
          <Reveal>
            <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              {t.hero.title} <span className="text-d-accent">{t.hero.titleAccent}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-[1.85] text-d-ink-muted">{t.hero.text}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            {/* Showcase search: the button simply jumps to the listings section. */}
            <div
              role="search"
              className="grid gap-3 rounded-2xl bg-d-bg p-3 text-d-fg shadow-2xl md:grid-cols-[1fr_1fr_1fr_auto]"
              aria-label={t.hero.search.submit}
            >
              {[
                { name: "type", label: t.hero.search.type, options: t.hero.search.types },
                { name: "area", label: t.hero.search.area, options: t.hero.search.areas },
                { name: "budget", label: t.hero.search.budget, options: t.hero.search.budgets },
              ].map((f) => (
                <label key={f.name} className="flex flex-col gap-1 px-1 text-xs font-bold text-d-muted">
                  {f.label}
                  <select name={f.name} className={selectCls} defaultValue={f.options[0]}>
                    {f.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
              ))}
              <a href="#listings" className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-d-ink px-6 font-bold text-d-accent">
                <Search className="size-4" aria-hidden="true" />
                {t.hero.search.submit}
              </a>
            </div>
          </Reveal>
          <Stagger className="mt-12 flex flex-wrap gap-x-12 gap-y-6" stagger={0.1}>
            {t.hero.stats.map((s) => (
              <StaggerItem key={s.label}>
                <Counter value={s.value} className="block text-3xl font-extrabold text-d-accent" />
                <p className="text-sm text-d-ink-muted">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Listings */}
      <section id="listings" className="section-d">
        <div className="container-d">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Eyebrow>{t.listings.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">{t.listings.title}</h2>
              <p className="mt-3 text-d-muted">{t.listings.text}</p>
            </div>
            <a href="#listings" className="inline-flex h-11 items-center gap-2 rounded-lg border border-d-line px-5 text-sm font-bold hover:border-d-fg">
              {t.listings.all}
              <Arrow className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {t.listings.items.map((p) => (
              <StaggerItem key={p.title} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-d-line bg-d-surface transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgba(20,20,20,.35)]">
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className={cn("absolute start-3 top-3 rounded-md px-2.5 py-1 text-xs font-extrabold", p.mode === "sale" ? "bg-d-ink text-d-accent" : "bg-d-accent text-d-accent-fg")}>
                      {p.mode === "sale" ? t.listings.labels.sale : t.listings.labels.rent}
                    </span>
                    {p.badge && <span className="absolute end-3 top-3 rounded-md bg-d-bg px-2.5 py-1 text-xs font-extrabold">{p.badge}</span>}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-2xl font-extrabold tracking-tight" dir="ltr">
                      {p.price}
                      {p.mode === "rent" && <span className="text-sm font-semibold text-d-muted"> {t.listings.labels.month}</span>}
                    </p>
                    <h3 className="mt-1 font-bold">{p.title}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-d-muted">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      {p.location}
                    </p>
                    <ul className="mt-4 flex gap-4 border-t border-d-line pt-4 text-sm font-semibold text-d-muted">
                      {p.beds > 0 && (
                        <li className="flex items-center gap-1.5">
                          <BedDouble className="size-4" aria-hidden="true" /> {p.beds} {t.listings.labels.beds}
                        </li>
                      )}
                      <li className="flex items-center gap-1.5">
                        <Bath className="size-4" aria-hidden="true" /> {p.baths} {t.listings.labels.baths}
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Maximize2 className="size-4" aria-hidden="true" /> {p.area} {t.listings.labels.area}
                      </li>
                    </ul>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Areas */}
      <section id="areas" className="section-d bg-d-ink text-d-ink-fg">
        <div className="container-d">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.areas.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">{t.areas.title}</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            {t.areas.items.map((a) => (
              <StaggerItem key={a.name} className="h-full">
                <div className="flex h-full flex-col bg-d-ink p-7 transition-colors hover:bg-white/5">
                  <h3 className="text-xl font-extrabold">{a.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-[1.8] text-d-ink-muted">{a.text}</p>
                  <p className="mt-5 text-sm font-bold text-d-accent">{a.count}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* About + process */}
      <section id="about" className="section-d">
        <div className="container-d grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{t.about.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">{t.about.title}</h2>
            </Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2" stagger={0.08}>
              {t.about.points.map((p) => (
                <StaggerItem key={p.title}>
                  <div className="rounded-2xl border border-d-line bg-d-surface p-5">
                    <ShieldCheck className="size-5 text-d-accent-2" aria-hidden="true" />
                    <h3 className="mt-3 font-bold">{p.title}</h3>
                    <p className="mt-1 text-sm leading-[1.8] text-d-muted">{p.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div>
            <Reveal>
              <Eyebrow>{t.process.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">{t.process.title}</h2>
            </Reveal>
            <Stagger className="mt-8 space-y-4" stagger={0.08}>
              {t.process.steps.map((s, i) => (
                <StaggerItem key={s.title}>
                  <div className="flex gap-5 rounded-2xl bg-d-surface-2 p-5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-d-ink font-extrabold text-d-accent">{i + 1}</span>
                    <div>
                      <h3 className="font-bold">{s.title}</h3>
                      <p className="mt-1 text-sm leading-[1.8] text-d-muted">{s.text}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="section-d bg-d-surface">
        <div className="container-d">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.agents.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">{t.agents.title}</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {t.agents.items.map((a) => (
              <StaggerItem key={a.name}>
                <article className="flex items-center gap-5 rounded-2xl border border-d-line bg-d-bg p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.photo} alt={a.name} className="size-24 shrink-0 rounded-xl object-cover object-top" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold">{a.name}</h3>
                    <p className="text-sm text-d-muted">{a.role}</p>
                    <p className="mt-1 text-xs font-bold text-d-accent-2">{a.deals}</p>
                    <a href="#contact" className="mt-3 inline-flex h-9 items-center gap-2 rounded-lg bg-d-ink px-4 text-xs font-bold text-d-accent">
                      <Phone className="size-3.5" aria-hidden="true" />
                      {t.agents.call}
                    </a>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-d">
        <div className="container-d">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.testimonials.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">{t.testimonials.title}</h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {t.testimonials.items.map((q) => (
              <StaggerItem key={q.name} className="h-full">
                <figure className="flex h-full flex-col rounded-2xl border-s-4 border-d-accent bg-d-surface p-6">
                  <blockquote className="flex-1 leading-[1.9]">{q.quote}</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="block font-extrabold">{q.name}</span>
                    <span className="text-d-muted">{q.role}</span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-d bg-d-ink text-d-ink-fg">
        <div className="container-d grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">{t.contact.title}</h2>
            <p className="mt-4 leading-[1.8] text-d-ink-muted">{t.contact.text}</p>
            <dl className="mt-8 space-y-4 text-sm">
              {[
                { icon: MapPin, label: t.contact.labels.address, value: t.contact.address },
                { icon: Phone, label: t.contact.labels.phone, value: t.contact.phone, ltr: true },
                { icon: Clock, label: t.contact.labels.hours, value: t.contact.hours },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-3">
                  <row.icon className="mt-0.5 size-4 text-d-accent" aria-hidden="true" />
                  <div>
                    <dt className="text-d-ink-muted">{row.label}</dt>
                    <dd className="font-semibold" dir={row.ltr ? "ltr" : undefined}>{row.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl bg-d-bg p-6 text-d-fg sm:p-8">
            <DemoForm
              fields={[
                { name: "name", label: t.contact.fields.name, half: true },
                { name: "phone", label: t.contact.fields.phone, type: "tel", half: true },
                { name: "goal", label: t.contact.fields.goal, type: "select", placeholder: "—", options: t.contact.fields.goals, half: true },
                { name: "type", label: t.contact.fields.type, type: "select", placeholder: t.contact.fields.typePh, options: t.hero.search.types, half: true },
                { name: "area", label: t.contact.fields.area, type: "select", placeholder: t.contact.fields.areaPh, options: t.hero.search.areas, half: true },
                { name: "size", label: t.contact.fields.size, type: "number", half: true, min: 20, max: 100000 },
                { name: "notes", label: t.contact.fields.notes, type: "textarea", placeholder: t.contact.fields.notesPh, required: false },
              ]}
              submit={t.contact.submit}
              success={t.contact.success}
              note={t.contact.note}
              inputClassName="border-d-line bg-d-surface"
              buttonClassName="bg-d-ink text-d-accent"
            />
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-d-ink text-d-ink-fg">
        <div className="container-d flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
          <Brand name={t.brand} sub={t.brandSub} dark />
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
