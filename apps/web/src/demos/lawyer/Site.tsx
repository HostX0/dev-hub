import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  Scale,
} from "lucide-react";
import type { DemoLang } from "@/demos/config";
import { DemoNav } from "@/demos/shared/DemoNav";
import { DemoForm } from "@/demos/shared/DemoForm";
import { Accordion } from "@/demos/shared/Accordion";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { lawyerContent } from "./content";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

function Brand({ name, sub }: { name: string; sub: string }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-full border border-d-accent/60 text-d-accent">
        <Scale className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="d-display block text-xl font-bold tracking-wide">{name}</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-d-accent">
          {sub}
        </span>
      </span>
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow-d">
      <span className="size-1.5 rotate-45 bg-d-accent" aria-hidden="true" />
      {children}
    </p>
  );
}

function Heading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`d-display d-display-tight mt-4 text-3xl font-bold leading-[1.25] sm:text-4xl lg:text-[2.75rem] ${className}`}>
      {children}
    </h2>
  );
}

export function LawyerSite({ lang }: { lang: DemoLang }) {
  const t = lawyerContent[lang];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const links = [
    { href: "#practice", label: t.nav.practice },
    { href: "#about", label: t.nav.about },
    { href: "#results", label: t.nav.results },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <div id="top" className="bg-d-bg text-d-fg">
      <DemoNav
        site="lawyer"
        lang={lang}
        brand={<Brand name={t.brand} sub={t.brandSub} />}
        links={links}
        cta={{ href: "#contact", label: t.cta }}
        className="bg-d-bg/0"
        scrolledClassName="border-b border-d-line bg-d-bg/95 backdrop-blur-md"
        linkClassName="text-d-fg/75 hover:text-d-accent-2"
        ctaClassName="bg-d-accent text-d-accent-fg"
        langClassName="border-d-accent/40 text-d-accent-2 hover:bg-d-accent/10"
        toggleClassName="border-d-accent/40 text-d-accent-2"
        panelClassName="border-d-line bg-d-bg"
      />

      {/* Hero */}
      <section className="bg-lines-gold relative overflow-hidden pt-[4.5rem]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(60%_60%_at_70%_20%,rgba(200,162,74,0.16),transparent_70%)]"
          aria-hidden="true"
        />
        <div className="container-d relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <Reveal>
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="d-display d-display-tight mt-6 text-4xl font-bold leading-[1.2] sm:text-5xl lg:text-[3.9rem]">
                {t.hero.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-[1.9] text-d-muted">{t.hero.text}</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-d-accent px-7 font-bold text-d-accent-fg transition-transform hover:-translate-y-0.5"
              >
                {t.hero.primary}
                <Arrow className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#practice"
                className="inline-flex h-12 items-center rounded-full border border-d-accent/40 px-7 font-semibold text-d-accent-2 transition-colors hover:bg-d-accent/10"
              >
                {t.hero.secondary}
              </a>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-d-muted">
              {t.hero.badges.map((b) => (
                <span key={b} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-d-accent" aria-hidden="true" />
                  {b}
                </span>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-t-full border border-d-accent/30" aria-hidden="true" />
            <div className="overflow-hidden rounded-t-full border border-d-accent/50 bg-d-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/demos/art/portrait-lawyer.svg"
                alt=""
                className="aspect-[4/5] w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 start-0 rounded-lg border border-d-accent/40 bg-d-ink px-6 py-4 shadow-2xl">
              <p className="d-display text-2xl font-bold text-d-accent">{t.hero.since}</p>
              <p className="text-xs text-d-muted">{t.hero.sinceText}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Practice areas */}
      <section id="practice" className="section-d border-t border-d-line">
        <div className="container-d">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.practice.eyebrow}</Eyebrow>
            <Heading>{t.practice.title}</Heading>
            <p className="mt-4 text-lg leading-[1.8] text-d-muted">{t.practice.text}</p>
          </Reveal>
          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-xl border border-d-line bg-d-line sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {t.practice.items.map((p, i) => (
              <StaggerItem key={p.title} className="h-full">
                <article className="group h-full bg-d-bg p-8 transition-colors hover:bg-d-surface">
                  <span className="d-display text-3xl font-bold text-d-accent/70 transition-colors group-hover:text-d-accent">
                    {ROMAN[i]}
                  </span>
                  <h3 className="d-display mt-5 text-2xl font-bold">{p.title}</h3>
                  <p className="mt-3 leading-[1.85] text-d-muted">{p.text}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-d bg-d-surface">
        <div className="container-d grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{t.about.eyebrow}</Eyebrow>
            <Heading>{t.about.title}</Heading>
            <p className="mt-6 leading-[1.95] text-d-muted">{t.about.text}</p>
            <div className="mt-8 rounded-xl border border-d-accent/30 p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-d-accent">
                {t.about.education.title}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {t.about.education.items.map((e) => (
                  <li key={e} className="flex gap-3">
                    <span className="mt-2 size-1 shrink-0 rotate-45 bg-d-accent" aria-hidden="true" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Stagger className="grid content-center gap-5" stagger={0.1}>
            {t.about.values.map((v, i) => (
              <StaggerItem key={v.title}>
                <div className="flex gap-6 border-s-2 border-d-accent/60 ps-6">
                  <span className="d-display text-4xl font-bold text-d-accent/50">0{i + 1}</span>
                  <div>
                    <h3 className="d-display text-2xl font-bold">{v.title}</h3>
                    <p className="mt-2 leading-[1.8] text-d-muted">{v.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Results */}
      <section id="results" className="section-d bg-d-ink">
        <div className="container-d">
          <Reveal className="text-center">
            <Eyebrow>{t.results.eyebrow}</Eyebrow>
            <Heading className="mx-auto">{t.results.title}</Heading>
          </Reveal>
          <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
            {t.results.stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="border-t border-d-accent/40 pt-6 text-center">
                  <Counter value={s.value} className="d-display block text-5xl font-bold text-d-accent" />
                  <p className="mt-2 text-sm text-d-muted">{s.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-10 text-center text-xs text-d-muted/80">{t.results.note}</p>
        </div>
      </section>

      {/* Process */}
      <section className="section-d">
        <div className="container-d">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.process.eyebrow}</Eyebrow>
            <Heading>{t.process.title}</Heading>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
            {t.process.steps.map((s, i) => (
              <StaggerItem key={s.title} className="h-full">
                <div className="flex h-full flex-col rounded-xl border border-d-line bg-d-surface p-8">
                  <span className="grid size-12 place-items-center rounded-full border border-d-accent/50 font-bold text-d-accent">
                    {i + 1}
                  </span>
                  <h3 className="d-display mt-6 text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 leading-[1.85] text-d-muted">{s.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-d border-t border-d-line bg-d-surface">
        <div className="container-d">
          <Reveal className="text-center">
            <Eyebrow>{t.testimonials.eyebrow}</Eyebrow>
            <Heading className="mx-auto">{t.testimonials.title}</Heading>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
            {t.testimonials.items.map((q) => (
              <StaggerItem key={q.name} className="h-full">
                <figure className="flex h-full flex-col rounded-xl border border-d-line bg-d-bg p-8">
                  <span className="d-display text-5xl leading-none text-d-accent" aria-hidden="true">
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 flex-1 leading-[1.9]">{q.quote}</blockquote>
                  <figcaption className="mt-6 text-sm">
                    <span className="block font-bold text-d-accent-2">{q.name}</span>
                    <span className="text-d-muted">{q.role}</span>
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
            <Heading>{t.faq.title}</Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion items={t.faq.items} className="divide-d-line border-y border-d-line" />
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-d bg-d-ink">
        <div className="container-d grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <Heading>{t.contact.title}</Heading>
            <p className="mt-4 leading-[1.85] text-d-muted">{t.contact.text}</p>
            <dl className="mt-8 space-y-5 text-sm">
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
          <Reveal delay={0.1} className="rounded-xl border border-d-accent/30 bg-d-surface p-6 sm:p-8">
            <DemoForm
              fields={[
                { name: "name", label: t.contact.fields.name, half: true },
                { name: "phone", label: t.contact.fields.phone, type: "tel", half: true },
                { name: "email", label: t.contact.fields.email, type: "email", half: true },
                { name: "date", label: t.contact.fields.date, type: "date", half: true },
                {
                  name: "area",
                  label: t.contact.fields.area,
                  type: "select",
                  placeholder: t.contact.fields.areaPh,
                  options: t.practice.items.map((p) => p.title),
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
              inputClassName="border-d-line bg-d-bg text-d-fg placeholder:text-d-muted/60"
              buttonClassName="rounded-full bg-d-accent text-d-accent-fg"
            />
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-d-line">
        <div className="container-d grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Brand name={t.brand} sub={t.brandSub} />
            <p className="mt-5 max-w-sm leading-[1.8] text-d-muted">{t.footer.tagline}</p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-d-accent">
              {t.footer.columns.practice}
            </h3>
            <ul className="space-y-2 text-sm text-d-muted">
              {t.practice.items.map((p) => (
                <li key={p.title}>
                  <a href="#practice" className="hover:text-d-fg">
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-d-accent">
              {t.footer.columns.contact}
            </h3>
            <ul className="space-y-2 text-sm text-d-muted">
              <li>{t.contact.info.address}</li>
              <li dir="ltr" className="text-start">{t.contact.info.phone}</li>
              <li dir="ltr" className="text-start">{t.contact.info.email}</li>
              <li>{t.contact.info.hours}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-d-line py-5 text-center text-xs text-d-muted">
          <p>{t.footer.disclaimer}</p>
          <p className="mt-2">
            © {new Date().getFullYear()} {t.brand} {t.brandSub}. {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}
