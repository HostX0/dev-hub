import Image from "next/image";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CalendarDays,
  Check,
  Clock3,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Smile,
  Stethoscope,
  Sun,
} from "lucide-react";
import type { DemoLang } from "@/demos/config";
import { DemoNav } from "@/demos/shared/DemoNav";
import { DemoForm } from "@/demos/shared/DemoForm";
import { Accordion } from "@/demos/shared/Accordion";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { clinicContent } from "./content";
import { clinicBookingFields } from "./booking";

const CARE_ICONS = {
  stethoscope: Stethoscope,
  smile: Smile,
  sun: Sun,
  activity: Activity,
};
const PRINCIPLE_ICONS = [MessageCircle, Stethoscope, HeartHandshake];

function NawaMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 20V7a7 7 0 0 1 7 7c0 3.5-3.1 6-7 6Z" fill="currentColor" />
      <path
        d="M20 20h13a7 7 0 0 1-7 7c-3.5 0-6-3.1-6-7Z"
        fill="currentColor"
        opacity=".8"
      />
      <path d="M20 20v13a7 7 0 0 1-7-7c0-3.5 3.1-6 7-6Z" fill="currentColor" />
      <path
        d="M20 20H7a7 7 0 0 1 7-7c3.5 0 6 3.1 6 7Z"
        fill="currentColor"
        opacity=".8"
      />
    </svg>
  );
}

function Brand({ name, sub }: { name: string; sub: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <NawaMark className="size-11 shrink-0 text-d-accent" />
      <span>
        <span className="block text-xl font-semibold leading-tight tracking-tight">
          {name}
        </span>
        <span className="mt-1 hidden text-xs font-medium text-d-muted min-[390px]:block">
          {sub}
        </span>
      </span>
    </span>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-semibold ${light ? "text-d-ink-muted" : "text-d-accent"}`}
    >
      <span
        className="h-px w-7 shrink-0 bg-current opacity-60"
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

function Heading({
  children,
  lang,
  className = "",
}: {
  children: React.ReactNode;
  lang: DemoLang;
  className?: string;
}) {
  return (
    <h2
      className={`d-display d-display-tight mt-5 whitespace-pre-line font-semibold ${lang === "ar" ? "text-3xl leading-[1.45] sm:text-4xl lg:text-5xl" : "text-[2.75rem] leading-[1.06] sm:text-5xl lg:text-[3.6rem]"} ${className}`}
    >
      {children}
    </h2>
  );
}

export function ClinicSite({ lang }: { lang: DemoLang }) {
  const t = clinicContent[lang];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const links = [
    { href: "#care", label: t.nav.care },
    { href: "#team", label: t.nav.team },
    { href: "#journey", label: t.nav.journey },
    { href: "#faq", label: t.nav.faq },
  ];
  const primaryButton =
    "inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-d-accent px-7 py-3 text-base font-semibold text-d-accent-fg transition-colors hover:bg-d-ink";

  return (
    <div id="top" className="clinic-site overflow-clip bg-d-bg text-d-fg">
      <DemoNav
        site="clinic-nawa"
        lang={lang}
        brand={<Brand name={t.brand} sub={t.brandSub} />}
        links={links}
        cta={{ href: "#booking", label: t.cta }}
        className="border-b border-d-line/70 bg-d-bg/95 backdrop-blur-md"
        scrolledClassName="shadow-[0_8px_35px_-25px_rgba(21,63,60,.3)]"
        linkClassName="text-d-muted hover:text-d-accent"
        ctaClassName="bg-d-accent text-d-accent-fg"
        langClassName="border-d-line text-d-fg hover:bg-d-surface-2"
        toggleClassName="border-d-line text-d-fg"
        panelClassName="border-d-line bg-d-bg"
      />

      <section className="relative pt-[4.5rem]">
        <div className="container-d grid items-center gap-12 pb-14 pt-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:pb-20 lg:pt-14">
          <div className="relative z-10 py-4 lg:py-12">
            <Reveal>
              <p className="mb-8 inline-flex items-center gap-2.5 text-xs font-semibold text-d-muted">
                <span
                  className="size-1.5 rounded-full bg-d-accent"
                  aria-hidden="true"
                />
                {t.demoLabel}
              </p>
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              <h1
                className={`d-display d-display-tight mt-6 max-w-2xl font-semibold ${lang === "ar" ? "text-[2.8rem] leading-[1.35] sm:text-6xl lg:text-[4.4rem]" : "text-6xl leading-[1.02] sm:text-7xl xl:text-[5.75rem]"}`}
              >
                {t.hero.title}
                <span
                  className={`mt-1 block text-d-accent ${lang === "en" ? "font-normal italic" : ""}`}
                >
                  {t.hero.accent}
                </span>
              </h1>
              <p className="mt-7 max-w-lg text-base leading-[1.85] text-d-muted sm:text-lg">
                {t.hero.text}
              </p>
            </Reveal>
            <Reveal
              delay={0.08}
              className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-5"
            >
              <a href="#booking" className={primaryButton}>
                {t.hero.primary}
                <Arrow className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#care"
                className="border-b border-d-fg/30 pb-1 text-base font-semibold transition-colors hover:border-d-accent hover:text-d-accent"
              >
                {t.hero.secondary}
              </a>
            </Reveal>
            <Reveal
              delay={0.14}
              className="mt-10 flex items-start gap-3 border-t border-d-line pt-5 lg:max-w-lg"
            >
              <HeartHandshake
                className="mt-0.5 size-5 shrink-0 text-d-accent"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-d-muted">
                {t.hero.detail}
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={0.1}
            className="relative mx-auto w-full max-w-[35rem] pb-10 ps-3 sm:ps-6"
          >
            <div
              className="absolute -end-5 top-7 h-[87%] w-[95%] rounded-t-[16rem] rounded-b-[2rem] border border-d-accent/20"
              aria-hidden="true"
            />
            <figure className="relative">
              <div className="relative aspect-[4/4.7] overflow-hidden rounded-t-[16rem] rounded-b-[2rem] bg-d-surface-2">
                <Image
                  src="/demos/art/clinic-hero.png"
                  alt={t.hero.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  preload
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-d-ink/15 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
              <figcaption className="absolute -bottom-9 -start-3 max-w-[88%] rounded-2xl border border-d-line/80 bg-d-surface p-5 shadow-[0_16px_50px_-30px_rgba(21,63,60,.45)] sm:-start-6 sm:p-6">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-d-surface-2 text-d-accent">
                    <NawaMark className="size-9" />
                  </span>
                  <div>
                    <p className="font-semibold">{t.hero.imageLabel}</p>
                    <p className="mt-1 text-sm text-d-muted">
                      {t.hero.imageText}
                    </p>
                  </div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <div className="border-y border-d-line bg-d-surface">
          <div className="container-d grid gap-6 py-7 md:grid-cols-3 md:gap-9">
            {t.principles.map((item, i) => {
              const Icon = PRINCIPLE_ICONS[i];
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <Icon
                    className="mt-1 size-6 shrink-0 text-d-accent"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div>
                    <h2 className="font-d-body text-base font-semibold">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-d-muted">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="care" className="section-d">
        <div className="container-d">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>{t.care.eyebrow}</Eyebrow>
              <Heading lang={lang}>{t.care.title}</Heading>
            </div>
            <p className="max-w-md text-lg leading-[1.8] text-d-muted lg:pb-1">
              {t.care.text}
            </p>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2" stagger={0.07}>
            {t.care.items.map((item, i) => {
              const Icon = CARE_ICONS[item.icon as keyof typeof CARE_ICONS];
              return (
                <StaggerItem key={item.id} className="h-full">
                  <article className="group flex h-full flex-col rounded-2xl border border-d-line bg-d-surface p-6 transition-colors hover:border-d-accent/50 sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span className="grid size-14 place-items-center rounded-full bg-d-surface-2 text-d-accent">
                        <Icon
                          className="size-6"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        className="text-sm font-medium text-d-muted"
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </span>
                    </div>
                    <p className="mt-6 text-sm font-medium text-d-accent">
                      {item.tag}
                    </p>
                    <h3
                      className={`d-display mt-2 font-semibold ${lang === "ar" ? "text-2xl leading-normal" : "text-4xl"}`}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-lg leading-[1.85] text-d-muted">
                      {item.text}
                    </p>
                    <div className="mt-auto pt-7">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-d-line pt-5">
                        <p className="text-sm text-d-muted">{item.detail}</p>
                        <a
                          href="#booking"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-d-accent transition-colors hover:text-d-ink"
                        >
                          {t.care.link}
                          <Arrow className="size-4" aria-hidden="true" />
                          <span className="sr-only">: {item.title}</span>
                        </a>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="border-y border-d-line bg-d-surface-2 py-16 lg:py-20">
        <div className="container-d grid items-center gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <Reveal className="relative mx-auto grid aspect-square w-full max-w-[21rem] place-items-center">
            <div
              className="absolute inset-2 rounded-full border border-d-accent/15"
              aria-hidden="true"
            />
            <div
              className="absolute inset-12 rounded-full border border-d-accent/20"
              aria-hidden="true"
            />
            <NawaMark className="size-32 text-d-accent" />
            <ul className="absolute inset-0" aria-label={t.approach.eyebrow}>
              {t.approach.labels.map((label, i) => (
                <li
                  key={label}
                  className={`absolute inline-flex items-center gap-2 rounded-full border border-d-line bg-d-surface px-4 py-2.5 text-sm font-medium ${i === 0 ? "start-1/2 top-0 -translate-x-1/2 rtl:translate-x-1/2" : i === 1 ? "bottom-12 start-0" : "bottom-12 end-0"}`}
                >
                  <Check
                    className="size-3.5 text-d-accent"
                    aria-hidden="true"
                  />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <Eyebrow>{t.approach.eyebrow}</Eyebrow>
            <Heading lang={lang}>{t.approach.title}</Heading>
            <p className="mt-6 max-w-2xl text-lg leading-[1.85] text-d-muted">
              {t.approach.text}
            </p>
            <p className="mt-7 border-s-2 border-d-accent ps-5 font-medium leading-relaxed">
              {t.approach.note}
            </p>
          </Reveal>
        </div>
      </section>

      <section id="team" className="section-d">
        <div className="container-d">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{t.team.eyebrow}</Eyebrow>
            </div>
            <Heading lang={lang}>{t.team.title}</Heading>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-[1.8] text-d-muted">
              {t.team.text}
            </p>
          </Reveal>
          <Stagger className="mt-12 grid gap-7 md:grid-cols-3" stagger={0.08}>
            {t.team.members.map((person, i) => (
              <StaggerItem key={person.id}>
                <article>
                  <div
                    className={`relative grid aspect-[5/3.4] overflow-hidden rounded-t-[6rem] rounded-b-2xl border border-d-line ${i === 1 ? "bg-d-surface-2" : "bg-d-surface"}`}
                    aria-hidden="true"
                  >
                    <div className="absolute -bottom-12 start-1/2 size-56 -translate-x-1/2 rounded-full border border-d-accent/15 rtl:translate-x-1/2" />
                    <div className="absolute -top-12 -end-8 size-40 rounded-full border border-d-accent/10" />
                    <span className="d-display relative place-self-center text-6xl font-normal text-d-accent/70">
                      {person.initials}
                    </span>
                    <NawaMark className="absolute bottom-4 end-4 size-8 text-d-accent/40" />
                  </div>
                  <div className="px-1 pt-6">
                    <p className="text-sm font-medium text-d-accent">
                      {person.role}
                    </p>
                    <h3
                      className={`mt-2 font-semibold ${lang === "ar" ? "text-2xl" : "text-3xl"}`}
                    >
                      {person.name}
                    </h3>
                    <p className="mt-3 leading-[1.8] text-d-muted">
                      {person.bio}
                    </p>
                    <p className="mt-5 border-t border-d-line pt-4 text-sm leading-relaxed">
                      <span className="text-d-muted">{t.team.label}: </span>
                      {person.focus}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-8 text-center text-xs leading-relaxed text-d-muted">
            {t.team.demoNote}
          </p>
        </div>
      </section>

      <section
        id="journey"
        className="relative overflow-hidden bg-d-ink py-16 text-d-ink-fg lg:py-24"
      >
        <div
          className="pointer-events-none absolute -bottom-56 -start-48 size-[40rem] rounded-full border border-white/10"
          aria-hidden="true"
        />
        <div className="container-d relative grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Eyebrow light>{t.journey.eyebrow}</Eyebrow>
            <Heading lang={lang}>{t.journey.title}</Heading>
            <p className="mt-6 max-w-md text-lg leading-[1.85] text-d-ink-muted">
              {t.journey.text}
            </p>
            <a
              href="#booking"
              className="mt-8 inline-flex min-h-12 items-center gap-3 border-b border-d-ink-muted pb-2 font-semibold transition-colors hover:text-d-ink-muted"
            >
              {t.journey.link}
              <Arrow className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
          <Stagger className="space-y-8" stagger={0.07}>
            {t.journey.steps.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="flex gap-5 sm:gap-7">
                  <span
                    className="grid size-12 shrink-0 place-items-center rounded-full border border-d-ink-muted/30 text-sm text-d-ink-muted"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <div
                    className={`flex-1 ${i < t.journey.steps.length - 1 ? "border-b border-d-ink-muted/20 pb-8" : ""}`}
                  >
                    <h3 className="font-d-body text-xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-[1.85] text-d-ink-muted">
                      {step.text}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="booking" className="section-d">
        <div className="container-d grid items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <Reveal className="lg:pt-7">
            <Eyebrow>{t.booking.eyebrow}</Eyebrow>
            <Heading lang={lang}>{t.booking.title}</Heading>
            <p className="mt-6 max-w-md text-lg leading-[1.85] text-d-muted">
              {t.booking.text}
            </p>
            <div className="mt-8 flex max-w-md gap-3 rounded-xl border border-d-line bg-d-surface-2/60 p-5">
              <MessageCircle
                className="mt-0.5 size-5 shrink-0 text-d-accent"
                aria-hidden="true"
              />
              <p className="text-sm leading-[1.8] text-d-muted">
                {t.booking.privacy}
              </p>
            </div>
          </Reveal>
          <Reveal
            delay={0.08}
            className="rounded-[1.5rem] border border-d-line bg-d-surface p-6 shadow-[0_18px_70px_-50px_rgba(21,63,60,.4)] sm:p-9"
          >
            <div className="mb-7 flex items-start justify-between gap-4 border-b border-d-line pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-d-accent">
                  {t.booking.demoLabel}
                </p>
                <h3 className="mt-2 font-d-body text-xl font-semibold sm:text-2xl">
                  {t.booking.formTitle}
                </h3>
              </div>
              <CalendarDays
                className="mt-1 size-6 shrink-0 text-d-accent"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
            <DemoForm
              fields={clinicBookingFields(t)}
              submit={t.booking.submit}
              success={t.booking.success}
              note={t.booking.note}
              inputClassName="border-d-line bg-d-bg text-d-fg placeholder:text-d-muted/75"
              labelClassName="text-d-fg"
              buttonClassName="rounded-full bg-d-accent text-d-accent-fg hover:bg-d-ink"
              successClassName="py-8 text-d-fg"
              className="gap-y-5 [&>div:last-child]:flex-col [&>div:last-child]:items-stretch [&>div:last-child>p]:text-center [&>div:last-child>p]:text-sm"
            />
          </Reveal>
        </div>
      </section>

      <section
        id="faq"
        className="border-y border-d-line bg-d-surface py-16 lg:py-24"
      >
        <div className="container-d grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{t.faq.eyebrow}</Eyebrow>
            <Heading lang={lang}>{t.faq.title}</Heading>
            <p className="mt-5 max-w-sm leading-[1.85] text-d-muted">
              {t.faq.text}
            </p>
          </Reveal>
          <Reveal delay={0.07}>
            <Accordion
              items={t.faq.items}
              className="divide-d-line border-t border-d-line"
              itemClassName="px-1"
            />
          </Reveal>
        </div>
      </section>

      <section id="contact" className="section-d">
        <div className="container-d grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <Heading lang={lang}>{t.contact.title}</Heading>
            <p className="mt-6 max-w-lg leading-[1.85] text-d-muted">
              {t.contact.text}
            </p>
            <a href="#booking" className={`${primaryButton} mt-8`}>
              {t.contact.link}
              <Arrow className="size-4" aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal
            delay={0.08}
            className="divide-y divide-d-line rounded-2xl border border-d-line bg-d-surface px-6 sm:px-8"
          >
            <div className="flex gap-4 py-7">
              <MapPin
                className="mt-1 size-5 shrink-0 text-d-accent"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <h3 className="font-d-body text-sm font-medium text-d-muted">
                  {t.contact.addressLabel}
                </h3>
                <p className="mt-2 text-lg font-medium">{t.contact.address}</p>
              </div>
            </div>
            <div className="flex gap-4 py-7">
              <Mail
                className="mt-1 size-5 shrink-0 text-d-accent"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <h3 className="font-d-body text-sm font-medium text-d-muted">
                  {t.contact.emailLabel}
                </h3>
                <p className="mt-2 break-all text-lg font-medium" dir="ltr">
                  {t.contact.email}
                </p>
              </div>
            </div>
            <div className="flex gap-4 py-7">
              <Clock3
                className="mt-1 size-5 shrink-0 text-d-accent"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-d-body text-sm font-medium text-d-muted">
                  {t.contact.hoursLabel}
                </h3>
                <dl className="mt-4 space-y-3">
                  {t.contact.hours.map((row) => (
                    <div
                      key={row.days}
                      className="flex flex-wrap justify-between gap-3 text-base"
                    >
                      <dt>{row.days}</dt>
                      <dd className="font-medium">
                        <bdi>{row.time}</bdi>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-d-line bg-d-surface-2 pb-24 pt-10 sm:pb-12">
        <div className="container-d">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Brand name={t.brand} sub={t.brandSub} />
              <p className="mt-4 text-sm text-d-muted">{t.footer.tagline}</p>
            </div>
            <nav
              aria-label={t.brand}
              className="flex flex-wrap gap-x-7 gap-y-4 pt-2 text-sm font-semibold"
            >
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-d-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href="#top"
              className="inline-flex items-center gap-3 self-start rounded-full border border-d-line bg-d-surface px-4 py-3 text-sm font-medium transition-colors hover:border-d-accent"
            >
              {t.footer.back}
              <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-9 flex flex-col gap-4 border-t border-d-line pt-6 md:flex-row md:items-start md:justify-between">
            <p className="max-w-xl text-xs leading-[1.8] text-d-muted">
              {t.footer.note}
            </p>
            <p className="shrink-0 text-xs leading-[1.8] text-d-muted">
              {t.footer.credit}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
