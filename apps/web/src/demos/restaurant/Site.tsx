import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Flame,
  Leaf,
  MapPin,
  Phone,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import type { DemoLang } from "@/demos/config";
import { DemoNav } from "@/demos/shared/DemoNav";
import { DemoForm } from "@/demos/shared/DemoForm";
import { Gallery } from "@/demos/shared/Gallery";
import { Tabs } from "@/demos/shared/Tabs";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { DISHES, restaurantContent } from "./content";

function Brand({ name, sub }: { name: string; sub: string }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-full bg-d-accent text-d-accent-fg">
        <UtensilsCrossed className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="d-display block text-xl font-bold">{name}</span>
        <span className="block text-[11px] font-medium text-d-muted">{sub}</span>
      </span>
    </span>
  );
}

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={cn("eyebrow-d", light && "text-d-ink-muted")}>
      <Leaf className="size-3.5" aria-hidden="true" />
      {children}
    </p>
  );
}

export function RestaurantSite({ lang }: { lang: DemoLang }) {
  const t = restaurantContent[lang];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const links = [
    { href: "#menu", label: t.nav.menu },
    { href: "#story", label: t.nav.story },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#reserve", label: t.nav.reserve },
  ];
  const BADGE_ICON = { chef: Star, veg: Leaf, spicy: Flame } as const;

  return (
    <div id="top" className="bg-d-bg text-d-fg">
      <DemoNav
        site="restaurant"
        lang={lang}
        brand={<Brand name={t.brand} sub={t.brandSub} />}
        links={links}
        cta={{ href: "#reserve", label: t.cta }}
        className="bg-d-bg/85 backdrop-blur-md"
        scrolledClassName="border-b border-d-line shadow-[0_12px_30px_-24px_rgba(43,33,24,.5)]"
        linkClassName="text-d-fg/80 hover:text-d-accent"
        ctaClassName="bg-d-accent text-d-accent-fg"
        langClassName="border-d-line hover:bg-d-surface-2"
        toggleClassName="border-d-line"
        panelClassName="border-d-line bg-d-bg"
      />

      {/* Hero */}
      <section className="bg-dots-warm relative overflow-hidden pt-[4.5rem]">
        <div className="container-d grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <Reveal>
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="d-display mt-6 text-5xl font-bold leading-[1.1] sm:text-6xl lg:text-7xl">
                {t.hero.title}
                <span className="block text-d-accent">{t.hero.titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-[1.85] text-d-muted">{t.hero.text}</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#reserve"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-d-accent px-7 font-bold text-d-accent-fg transition-transform hover:-translate-y-0.5"
              >
                {t.hero.primary}
                <Arrow className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#menu"
                className="inline-flex h-12 items-center rounded-full border-2 border-d-accent-2 px-7 font-bold text-d-accent-2 transition-colors hover:bg-d-accent-2 hover:text-d-bg"
              >
                {t.hero.secondary}
              </a>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 flex items-center gap-2 text-sm font-semibold text-d-accent-2">
              <Clock className="size-4" aria-hidden="true" />
              {t.hero.open}
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-6 rounded-full bg-d-accent/15 blur-2xl" aria-hidden="true" />
            <div className="animate-d-float relative overflow-hidden rounded-full border-[6px] border-d-surface shadow-[0_40px_80px_-30px_rgba(43,33,24,.5)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/demos/art/dish-01.svg" alt={t.hero.dishAlt} className="aspect-square w-full object-cover" loading="eager" />
            </div>
            {t.hero.tags.map((tag, i) => (
              <span
                key={tag}
                className={cn(
                  "absolute rounded-full bg-d-ink px-4 py-2 text-xs font-bold text-d-ink-fg shadow-lg",
                  i === 0 && "top-6 start-0",
                  i === 1 && "bottom-10 end-0",
                  i === 2 && "top-1/2 -end-4 hidden sm:inline-block",
                )}
              >
                {tag}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="section-d bg-d-surface">
        <div className="container-d grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>{t.story.eyebrow}</Eyebrow>
            <h2 className="d-display mt-4 text-4xl font-bold leading-[1.2] md:text-5xl">{t.story.title}</h2>
            <p className="mt-6 leading-[1.95] text-d-muted">{t.story.text1}</p>
            <p className="mt-4 leading-[1.95] text-d-muted">{t.story.text2}</p>
          </Reveal>
          <div>
            <Reveal className="grid grid-cols-2 gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/demos/art/dish-03.svg" alt="" className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/demos/art/dish-02.svg" alt="" className="mt-8 aspect-square w-full rounded-2xl object-cover" loading="lazy" />
            </Reveal>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-3" stagger={0.08}>
              {t.story.pillars.map((p) => (
                <StaggerItem key={p.title}>
                  <div className="rounded-xl border border-d-line bg-d-bg p-5">
                    <h3 className="font-bold">{p.title}</h3>
                    <p className="mt-1 text-sm leading-[1.7] text-d-muted">{p.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="section-d">
        <div className="container-d">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t.menu.eyebrow}</Eyebrow>
            <h2 className="d-display mt-4 text-4xl font-bold md:text-5xl">{t.menu.title}</h2>
            <p className="mt-4 leading-[1.8] text-d-muted">{t.menu.text}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Tabs
              listClassName="justify-center"
              tabClassName="border border-d-line text-d-muted hover:text-d-fg"
              activeTabClassName="border-d-accent bg-d-accent text-d-accent-fg hover:text-d-accent-fg"
              tabs={t.menu.tabs.map((tab) => ({
                key: tab.key,
                label: tab.label,
                content: (
                  <ul className="mx-auto grid max-w-4xl gap-x-12 gap-y-2 md:grid-cols-2">
                    {tab.items.map((item) => {
                      const Badge = item.badge ? BADGE_ICON[item.badge as keyof typeof BADGE_ICON] : null;
                      return (
                        <li key={item.name} className="border-b border-dashed border-d-line py-4">
                          <div className="flex items-baseline justify-between gap-4">
                            <h3 className="d-display text-xl font-bold">{item.name}</h3>
                            <span className="shrink-0 font-bold text-d-accent" dir="ltr">
                              {item.price} <span className="text-xs font-semibold text-d-muted">{t.menu.currency}</span>
                            </span>
                          </div>
                          <p className="mt-1 text-sm leading-[1.7] text-d-muted">{item.desc}</p>
                          {Badge && item.badge && (
                            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-d-surface-2 px-2.5 py-0.5 text-[11px] font-bold text-d-accent-2">
                              <Badge className="size-3" aria-hidden="true" />
                              {t.menu.badges[item.badge as keyof typeof t.menu.badges]}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ),
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* Chef */}
      <section className="section-d bg-d-accent-2 text-d-ink-fg">
        <div className="container-d grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <Reveal className="mx-auto w-56 overflow-hidden rounded-full border-4 border-d-bg/40 md:w-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/demos/art/portrait-chef.svg" alt={t.chef.name} className="aspect-square w-full object-cover object-top" loading="lazy" />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow light>{t.chef.eyebrow}</Eyebrow>
            <blockquote className="d-display mt-5 text-2xl leading-[1.5] md:text-4xl">“{t.chef.quote}”</blockquote>
            <p className="mt-6 font-bold">{t.chef.name}</p>
            <p className="text-sm text-d-ink-muted">{t.chef.role}</p>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="section-d">
        <div className="container-d">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t.gallery.eyebrow}</Eyebrow>
            <h2 className="d-display mt-4 text-4xl font-bold md:text-5xl">{t.gallery.title}</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Gallery
              lang={lang}
              items={DISHES.map((d) => ({
                src: `/demos/art/${d.id}.svg`,
                alt: t.gallery.alts[d.id],
                category: d.category,
                ratio: 1,
              }))}
              categories={t.gallery.categories}
              columns="columns-2 md:columns-3"
              filterClassName="border-d-line text-d-muted hover:text-d-fg"
              activeFilterClassName="border-d-accent-2 bg-d-accent-2 text-d-bg hover:text-d-bg"
            />
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-d bg-d-surface">
        <div className="container-d">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>{t.testimonials.eyebrow}</Eyebrow>
            <h2 className="d-display mt-4 text-4xl font-bold md:text-5xl">{t.testimonials.title}</h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {t.testimonials.items.map((q) => (
              <StaggerItem key={q.name} className="h-full">
                <figure className="flex h-full flex-col rounded-2xl bg-d-bg p-7 shadow-[0_20px_40px_-30px_rgba(43,33,24,.4)]">
                  <div className="flex gap-1 text-d-accent" aria-label="5/5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 leading-[1.9]">{q.quote}</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="block font-bold">{q.name}</span>
                    <span className="text-d-muted">{q.role}</span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Reserve */}
      <section id="reserve" className="section-d bg-dots-warm">
        <div className="container-d grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>{t.reserve.eyebrow}</Eyebrow>
            <h2 className="d-display mt-4 text-4xl font-bold md:text-5xl">{t.reserve.title}</h2>
            <p className="mt-4 leading-[1.8] text-d-muted">{t.reserve.text}</p>
            <div className="mt-8 rounded-2xl border border-d-line bg-d-surface p-6">
              <h3 className="flex items-center gap-2 font-bold">
                <Clock className="size-4 text-d-accent" aria-hidden="true" />
                {t.reserve.hours.title}
              </h3>
              <dl className="mt-3 space-y-2 text-sm">
                {t.reserve.hours.rows.map((r) => (
                  <div key={r.days} className="flex justify-between gap-4">
                    <dt className="text-d-muted">{r.days}</dt>
                    <dd className="font-semibold" dir="ltr">{r.time}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 space-y-3 border-t border-d-line pt-5 text-sm">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 text-d-accent" aria-hidden="true" />
                  <span>
                    <span className="block text-d-muted">{t.reserve.labels.address}</span>
                    <span className="font-semibold">{t.reserve.address}</span>
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Phone className="mt-0.5 size-4 text-d-accent" aria-hidden="true" />
                  <span>
                    <span className="block text-d-muted">{t.reserve.labels.phone}</span>
                    <span className="font-semibold" dir="ltr">{t.reserve.phone}</span>
                  </span>
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl border border-d-line bg-d-surface p-6 sm:p-8">
            <DemoForm
              fields={[
                { name: "name", label: t.reserve.fields.name, half: true },
                { name: "phone", label: t.reserve.fields.phone, type: "tel", half: true },
                {
                  name: "guests",
                  label: t.reserve.fields.guests,
                  type: "select",
                  placeholder: t.reserve.fields.guestsPh,
                  options: t.reserve.fields.guestOptions,
                  half: true,
                },
                { name: "date", label: t.reserve.fields.date, type: "date", half: true },
                { name: "time", label: t.reserve.fields.time, type: "time", half: true },
                { name: "notes", label: t.reserve.fields.notes, type: "textarea", placeholder: t.reserve.fields.notesPh, required: false },
              ]}
              submit={t.reserve.submit}
              success={t.reserve.success}
              note={t.reserve.note}
              inputClassName="border-d-line bg-d-bg"
              buttonClassName="rounded-full bg-d-accent text-d-accent-fg"
            />
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-d-ink text-d-ink-fg">
        <div className="container-d flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
          <Brand name={t.brand} sub={t.brandSub} />
          <p className="text-sm text-d-ink-muted">{t.footer.tagline}</p>
          <ul className="flex gap-5 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-d-ink-muted hover:text-d-ink-fg">
                  {l.label}
                </a>
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
