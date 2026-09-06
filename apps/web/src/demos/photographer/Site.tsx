import { ArrowDown, ArrowLeft, ArrowRight, Camera, Check } from "lucide-react";
import type { DemoLang } from "@/demos/config";
import { DemoNav } from "@/demos/shared/DemoNav";
import { DemoForm } from "@/demos/shared/DemoForm";
import { Gallery } from "@/demos/shared/Gallery";
import { Marquee } from "@/demos/shared/Marquee";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { cn } from "@/lib/utils";
import { PHOTOS, photographerContent } from "./content";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.25em] text-d-muted">{children}</p>;
}

export function PhotographerSite({ lang }: { lang: DemoLang }) {
  const t = photographerContent[lang];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const links = [
    { href: "#work", label: t.nav.work },
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#contact", label: t.nav.contact },
  ];
  const gallery = PHOTOS.map((p) => ({
    src: `/demos/art/${p.id}.svg`,
    alt: t.work.alts[p.id],
    category: p.category,
    ratio: p.ratio,
  }));

  return (
    <div id="top" className="bg-d-bg text-d-fg">
      <DemoNav
        site="photographer"
        lang={lang}
        brand={
          <span className="flex items-center gap-2">
            <Camera className="size-5" aria-hidden="true" />
            <span className="d-display text-2xl font-semibold tracking-wide">{t.name}</span>
          </span>
        }
        links={links}
        cta={{ href: "#contact", label: t.cta }}
        className="bg-d-bg/80 backdrop-blur-md"
        scrolledClassName="border-b border-d-line"
        linkClassName="text-d-muted hover:text-d-fg"
        ctaClassName="bg-d-accent text-d-accent-fg"
        langClassName="border-d-line hover:bg-d-surface"
        toggleClassName="border-d-line"
        panelClassName="border-d-line bg-d-bg"
      />

      {/* Hero */}
      <section className="pt-[4.5rem]">
        <div className="container-d pb-10 pt-12 md:pt-20">
          <Reveal>
            <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          </Reveal>
          <h1
            className={cn(
              "d-display mt-4 leading-[0.95] font-medium",
              lang === "en"
                ? "text-[clamp(4rem,15vw,15rem)] tracking-[-0.04em]"
                : "text-[clamp(3.5rem,12vw,11rem)] leading-[1.15]",
            )}
          >
            <Reveal as="span" className="block">
              {t.first}
            </Reveal>
            <Reveal as="span" delay={0.08} className={cn("block", lang === "en" && "italic ps-[8vw]")}>
              {t.last}
              <span className="text-d-accent-2">.</span>
            </Reveal>
          </h1>
          <div className="mt-10 grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <Reveal delay={0.15}>
              <p className="d-display max-w-2xl text-2xl leading-[1.5] md:text-3xl">{t.hero.statement}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <a href="#work" className="inline-flex items-center gap-3 text-sm font-semibold text-d-muted hover:text-d-fg">
                {t.hero.scroll}
                <ArrowDown className="size-4 animate-bounce" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.1} className="container-d">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/demos/art/photo-02.svg"
            alt={t.hero.heroAlt}
            className="aspect-[16/7] w-full object-cover"
            loading="eager"
          />
        </Reveal>
        <div className="border-y border-d-line py-5 mt-16">
          <Marquee
            items={t.marquee}
            lang={lang}
            itemClassName="d-display text-3xl italic text-d-fg/80"
            separator={<Camera className="size-4" aria-hidden="true" />}
          />
        </div>
      </section>

      {/* Work */}
      <section id="work" className="section-d">
        <div className="container-d">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>{t.work.eyebrow}</Eyebrow>
              <h2 className="d-display mt-3 text-5xl font-medium md:text-6xl">{t.work.title}</h2>
            </div>
            <p className="max-w-md text-d-muted">{t.work.text}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Gallery
              items={gallery}
              categories={t.work.categories}
              lang={lang}
              filterClassName="border-d-line text-d-muted hover:text-d-fg"
              activeFilterClassName="border-d-accent bg-d-accent text-d-accent-fg hover:text-d-accent-fg"
            />
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-d bg-d-ink text-d-ink-fg">
        <div className="container-d grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/art/portrait-photographer.svg"
              alt={t.name}
              className="aspect-[4/5] w-full max-w-md object-cover grayscale"
              loading="lazy"
            />
          </Reveal>
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-d-ink-muted">{t.about.eyebrow}</p>
              <h2 className="d-display mt-4 text-3xl font-medium leading-[1.3] md:text-5xl">{t.about.title}</h2>
              <p className="mt-6 max-w-2xl leading-[1.95] text-d-ink-muted">{t.about.text}</p>
            </Reveal>
            <Stagger className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4" stagger={0.08}>
              {t.about.facts.map((f) => (
                <StaggerItem key={f.label}>
                  <div className="border-t border-white/20 pt-4">
                    <Counter value={f.value} className="d-display block text-4xl font-medium" />
                    <p className="mt-1 text-sm text-d-ink-muted">{f.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}>
              <p className="mt-8 text-xs text-d-ink-muted">{t.about.gear}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-d">
        <div className="container-d">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t.services.eyebrow}</Eyebrow>
            <h2 className="d-display mt-3 text-4xl font-medium md:text-5xl">{t.services.title}</h2>
            <p className="mt-4 leading-[1.8] text-d-muted">{t.services.text}</p>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {t.services.items.map((s) => (
              <StaggerItem key={s.name} className="h-full">
                <article
                  className={cn(
                    "flex h-full flex-col border p-8",
                    s.featured ? "border-d-accent bg-d-ink text-d-ink-fg" : "border-d-line bg-d-surface",
                  )}
                >
                  <h3 className="d-display text-3xl font-medium">{s.name}</h3>
                  <p className={cn("mt-1 text-sm", s.featured ? "text-d-ink-muted" : "text-d-muted")}>
                    {s.duration}
                  </p>
                  <p className="mt-6 flex items-baseline gap-2">
                    <span className={cn("text-xs", s.featured ? "text-d-ink-muted" : "text-d-muted")}>
                      {t.services.from}
                    </span>
                    <span className="text-3xl font-bold" dir="ltr">
                      {s.price}
                    </span>
                    <span className="text-sm">{t.services.currency}</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <Check className="size-4 text-d-accent-2" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={cn(
                      "mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full text-sm font-bold transition-transform hover:-translate-y-0.5",
                      s.featured ? "bg-d-bg text-d-fg" : "bg-d-accent text-d-accent-fg",
                    )}
                  >
                    {t.services.choose}
                    <Arrow className="size-4" aria-hidden="true" />
                  </a>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger className="mt-16 grid gap-6 border-t border-d-line pt-10 md:grid-cols-[auto_1fr_1fr_1fr]" stagger={0.1}>
            <StaggerItem>
              <h3 className="d-display text-2xl font-medium">{t.process.title}</h3>
            </StaggerItem>
            {t.process.steps.map((s, i) => (
              <StaggerItem key={s.title}>
                <p className="text-xs font-semibold text-d-muted">0{i + 1}</p>
                <h4 className="mt-1 font-bold">{s.title}</h4>
                <p className="mt-1 text-sm leading-[1.8] text-d-muted">{s.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-d-line bg-d-surface py-16">
        <Stagger className="container-d grid gap-10 md:grid-cols-2" stagger={0.15}>
          {t.testimonials.map((q) => (
            <StaggerItem key={q.name}>
              <figure>
                <blockquote className="d-display text-2xl leading-[1.5] md:text-3xl">“{q.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-d-muted">
                  <span className="font-bold text-d-fg">{q.name}</span> — {q.role}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Contact */}
      <section id="contact" className="section-d">
        <div className="container-d grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <h2 className="d-display mt-3 text-4xl font-medium leading-[1.2] md:text-6xl">{t.contact.title}</h2>
            <p className="mt-5 max-w-md leading-[1.8] text-d-muted">{t.contact.text}</p>
            <p className="mt-8 text-sm text-d-muted">{t.contact.based}</p>
            <p className="mt-2 text-lg font-semibold" dir="ltr">
              {t.contact.email}
            </p>
            <p className="text-lg font-semibold" dir="ltr">
              {t.contact.phone}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <DemoForm
              fields={[
                { name: "name", label: t.contact.fields.name, half: true },
                { name: "email", label: t.contact.fields.email, type: "email", half: true },
                { name: "phone", label: t.contact.fields.phone, type: "tel", half: true },
                { name: "date", label: t.contact.fields.date, type: "date", half: true },
                {
                  name: "type",
                  label: t.contact.fields.type,
                  type: "select",
                  placeholder: t.contact.fields.typePh,
                  options: t.services.items.map((s) => s.name),
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
              inputClassName="rounded-none border-0 border-b border-d-line bg-transparent px-0 focus:shadow-none"
              buttonClassName="rounded-full bg-d-accent text-d-accent-fg"
            />
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-d-line">
        <div className="container-d flex flex-col items-center justify-between gap-4 py-8 text-sm text-d-muted md:flex-row">
          <p className="d-display text-2xl text-d-fg">{t.name}</p>
          <ul className="flex gap-6">
            {t.footer.social.map((s) => (
              <li key={s}>
                <a href="#top" className="hover:text-d-fg">
                  {s}
                </a>
              </li>
            ))}
          </ul>
          <p>
            © {new Date().getFullYear()} {t.name}. {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}
