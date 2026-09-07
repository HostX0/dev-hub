"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bath,
  BedDouble,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  Maximize2,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { DemoLang } from "@/demos/config";
import { DemoNav } from "@/demos/shared/DemoNav";
import { DemoForm } from "@/demos/shared/DemoForm";
import { Accordion } from "@/demos/shared/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Architecture } from "./Architecture";
import {
  properties,
  realEstateContent,
  type Property,
  type PropertyArea,
  type PropertyType,
} from "./content";

const price = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
const button =
  "inline-flex min-h-12 items-center justify-center gap-3 px-6 text-sm font-semibold transition-colors";
const outlineButton = `${button} border border-d-line hover:border-d-ink hover:bg-d-surface-2`;

function Brand({ lang, light = false }: { lang: DemoLang; light?: boolean }) {
  const t = realEstateContent[lang];
  return (
    <span className="flex items-center gap-3">
      <span
        className={`grid size-10 place-items-center border ${light ? "border-d-ink-fg/35" : "border-d-ink/35"}`}
      >
        <svg
          width="24"
          height="29"
          viewBox="0 0 24 29"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 26V11a9 9 0 0 1 18 0v15H3Z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path d="M12 2v24M3 16h18" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      </span>
      <span>
        <span
          className={`block text-3xl ${lang === "en" ? "d-display leading-none tracking-[.18em]" : "font-bold leading-tight"}`}
        >
          {t.brand}
        </span>
        <span
          className={`mt-1 block text-[10px] ${light ? "text-d-ink-muted" : "text-d-muted"}`}
        >
          {t.brandSub}
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
      className={`flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.18em] sm:text-xs ${light ? "text-d-ink-muted" : "text-d-accent"}`}
    >
      <span className="h-px w-7 shrink-0 bg-current" aria-hidden="true" />
      {children}
    </p>
  );
}
function Facts({ property, lang }: { property: Property; lang: DemoLang }) {
  const t = realEstateContent[lang].listings;
  return (
    <dl className="grid grid-cols-3 gap-2 border-y border-d-line py-4 text-sm">
      {[
        { Icon: BedDouble, value: property.beds, label: t.beds },
        { Icon: Bath, value: property.baths, label: t.baths },
        {
          Icon: Maximize2,
          value: `${property.size} ${t.sqm}`,
          label: t.areaLabel,
        },
      ].map(({ Icon, value, label }) => (
        <div key={label} className="space-y-1">
          <dt className="flex items-center gap-1.5 text-[11px] text-d-muted">
            <Icon className="size-3.5 shrink-0" aria-hidden="true" />
            <span>{label}</span>
          </dt>
          <dd className="font-semibold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function ResidenceDialog({
  property,
  lang,
  onClose,
  onEnquire,
}: {
  property: Property;
  lang: DemoLang;
  onClose: () => void;
  onEnquire: (property: Property) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [view, setView] = useState(0);
  const t = realEstateContent[lang];
  const copy = property.copy[lang];
  const Prev = lang === "ar" ? ChevronRight : ChevronLeft;
  const Next = lang === "ar" ? ChevronLeft : ChevronRight;
  useEffect(() => {
    const dialog = ref.current;
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    const trapTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const controls = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          !element.matches(":disabled") && element.getClientRects().length > 0,
      );
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    dialog?.addEventListener("keydown", trapTab);
    return () => {
      dialog?.removeEventListener("keydown", trapTab);
      if (dialog?.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[92dvh] w-[calc(100%_-_1.5rem)] max-w-5xl overflow-y-auto border border-d-line bg-d-bg p-0 text-d-fg shadow-2xl backdrop:bg-[#10251f]/75 backdrop:backdrop-blur-sm"
      data-lenis-prevent
    >
      <div className="relative">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-d-line bg-d-bg/95 px-5 py-3 backdrop-blur-sm">
          <span className="text-xs font-semibold text-d-muted">
            {t.dialog.reference}{" "}
            <span lang="en" dir="ltr">
              {property.id}
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.dialog.close}
            className="grid size-11 place-items-center border border-d-line bg-d-surface hover:bg-d-surface-2"
            autoFocus
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="grid lg:grid-cols-[1.08fr_.92fr]">
          <div className="min-w-0 border-d-line bg-d-surface-2 lg:border-e">
            <Architecture
              property={property}
              view={view}
              label={`${copy.name} — ${t.dialog.views[view]}`}
              className="aspect-[9/7] w-full object-cover"
            />
            <div className="flex items-center justify-between gap-3 border-y border-d-line px-5 py-3">
              <p className="text-xs text-d-muted" aria-live="polite">
                <span className="me-2 font-semibold text-d-fg">
                  0{view + 1} / 03
                </span>
                {t.dialog.views[view]}
              </p>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setView((v) => (v + 2) % 3)}
                  aria-label={t.dialog.previous}
                  className="grid size-10 place-items-center border border-d-line hover:bg-d-bg"
                >
                  <Prev className="size-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setView((v) => (v + 1) % 3)}
                  aria-label={t.dialog.next}
                  className="grid size-10 place-items-center border border-d-line hover:bg-d-bg"
                >
                  <Next className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              className="grid grid-cols-3 gap-2 p-4"
              role="group"
              aria-label={lang === "ar" ? "عروض البيت" : "Residence views"}
            >
              {t.dialog.views.map((name, index) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setView(index)}
                  aria-pressed={view === index}
                  aria-label={name}
                  className={`overflow-hidden border-2 transition-colors ${view === index ? "border-d-ink" : "border-transparent hover:border-d-accent"}`}
                >
                  <Architecture
                    property={property}
                    view={index}
                    label={name}
                    className="w-full"
                  />
                  <span className="block bg-d-bg px-1 py-2 text-[10px] font-medium">
                    {name}
                  </span>
                </button>
              ))}
            </div>
            <p className="px-5 pb-5 text-xs leading-relaxed text-d-muted">
              {t.dialog.note}
            </p>
          </div>
          <div className="min-w-0 p-6 sm:p-8">
            <p className="flex items-center gap-2 text-xs text-d-muted">
              <MapPin className="size-3.5" aria-hidden="true" />
              {t.listings.areas[property.area]}
              <span aria-hidden="true">/</span>
              {t.listings.types[property.type]}
            </p>
            <h2
              id={titleId}
              className="d-display mt-4 text-4xl leading-[1.12] sm:text-5xl"
            >
              {copy.name}
            </h2>
            <p className="mt-3 text-sm text-d-muted">{copy.character}</p>
            <div className="my-6">
              <span lang="en" dir="ltr" className="text-2xl font-medium">
                {price(property.price)}
              </span>
              {property.tenure === "rent" && (
                <span className="ms-2 text-sm text-d-muted">
                  {t.listings.month}
                </span>
              )}
              <p className="mt-2 text-[11px] leading-relaxed text-d-muted">
                {t.dialog.priceNote}
              </p>
            </div>
            <Facts property={property} lang={lang} />
            <h3 className="mt-7 text-xl">{t.dialog.about}</h3>
            <p className="mt-3 text-sm leading-[1.9] text-d-muted">
              {copy.description}
            </p>
            <h3 className="mt-6 text-xl">{t.dialog.features}</h3>
            <ul className="mt-3 grid gap-3 text-sm">
              {copy.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-d-accent"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onEnquire(property)}
              className={`${button} mt-8 w-full bg-d-ink text-d-ink-fg hover:bg-d-ink/90`}
            >
              {t.dialog.enquire}
              <ArrowDown className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export function RealEstateSite({ lang }: { lang: DemoLang }) {
  const t = realEstateContent[lang];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const [type, setType] = useState<PropertyType | "">("");
  const [area, setArea] = useState<PropertyArea | "">("");
  const [tenure, setTenure] = useState<Property["tenure"] | "">("");
  const [selected, setSelected] = useState<Property | null>(null);
  const [interest, setInterest] = useState<Property | null>(null);
  const visible = properties.filter(
    (p) =>
      (!type || p.type === type) &&
      (!area || p.area === area) &&
      (!tenure || p.tenure === tenure),
  );
  const filtered = Boolean(type || area || tenure);
  const links = [
    { href: "#homes", label: t.nav.homes },
    { href: "#neighborhoods", label: t.nav.places },
    { href: "#approach", label: t.nav.approach },
  ];
  function reset() {
    setType("");
    setArea("");
    setTenure("");
  }
  function scrollTo(id: string) {
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      target?.focus({ preventScroll: true });
    });
  }
  function enquire(property: Property) {
    setSelected(null);
    setInterest(property);
    scrollTo("contact");
  }
  function chooseArea(value: PropertyArea) {
    setArea(value);
    setType("");
    setTenure("");
    scrollTo("homes");
  }
  return (
    <div id="top" className="re-site bg-d-bg text-d-fg">
      <a
        href="#realestate-main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:bg-d-bg focus:px-5 focus:py-3"
      >
        {lang === "ar" ? "الانتقال إلى المحتوى" : "Skip to content"}
      </a>
      <DemoNav
        site="realestate-sukn"
        lang={lang}
        brand={<Brand lang={lang} />}
        links={links}
        cta={{ href: "#contact", label: t.cta }}
        className="border-b border-d-line/70 bg-d-bg/95 backdrop-blur-md"
        scrolledClassName="shadow-[0_10px_25px_-20px_#173D3240]"
        linkClassName="text-d-muted hover:text-d-fg"
        ctaClassName="bg-d-ink text-d-ink-fg"
        langClassName="border-d-line hover:bg-d-surface-2"
        toggleClassName="border-d-line"
        panelClassName="border-d-line bg-d-bg"
      />

      <main id="realestate-main" tabIndex={-1}>
        <section className="pt-[4.5rem]">
          <div className="container-d relative pb-10 pt-12 sm:pt-16 lg:pb-12 lg:pt-20">
            <Reveal>
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
            </Reveal>
            <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1.4fr_.6fr] lg:gap-20">
              <Reveal>
                <h1
                  className={`d-display leading-[.98] ${lang === "en" ? "text-[clamp(3.6rem,7.5vw,7rem)] tracking-[-.045em]" : "text-[clamp(3rem,6.3vw,6.4rem)] leading-[1.23]"}`}
                >
                  {t.hero.title}
                  <span
                    className={`block text-d-accent ${lang === "en" ? "italic" : ""}`}
                  >
                    {t.hero.accent}
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.08} className="max-w-sm lg:pb-2">
                <p className="text-base leading-[1.85] text-d-muted">
                  {t.hero.text}
                </p>
                <a
                  href="#homes"
                  className="mt-7 inline-flex min-h-11 items-center gap-5 border-b border-d-ink pb-2 text-sm font-semibold"
                >
                  {t.hero.primary}
                  <Arrow className="size-5" aria-hidden="true" />
                </a>
              </Reveal>
            </div>
          </div>
          <div className="container-d">
            <Reveal className="relative overflow-hidden bg-d-surface-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/demos/art/realestate-hero.png"
                width={1536}
                height={1024}
                alt={t.hero.imageAlt}
                fetchPriority="high"
                className="aspect-[4/3] w-full object-cover object-center sm:aspect-[2/1] lg:aspect-[2.35/1]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#162b22]/40 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute start-5 top-5 border border-white/45 bg-d-ink/80 px-3 py-2 text-[10px] uppercase tracking-[.14em] text-white sm:start-8 sm:top-8">
                {t.city}
              </div>
              <button
                type="button"
                onClick={() => setSelected(properties[0])}
                className="relative flex w-full items-center justify-between gap-5 bg-d-ink px-6 py-6 text-start text-d-ink-fg transition-colors hover:bg-[#214c3e] sm:absolute sm:bottom-6 sm:end-6 sm:w-auto sm:min-w-[350px] sm:max-w-sm"
              >
                <span>
                  <span className="block text-[9px] tracking-[.18em] text-d-ink-muted">
                    {t.hero.feature}
                  </span>
                  <span className="d-display mt-2 block text-2xl">
                    {t.hero.featureTitle}
                  </span>
                  <span className="mt-1 block text-xs text-d-ink-muted">
                    {t.hero.featureText}
                  </span>
                  <span className="sr-only">{t.hero.view}</span>
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25">
                  <Arrow className="size-4" aria-hidden="true" />
                </span>
              </button>
            </Reveal>
            <div className="flex flex-wrap justify-between gap-2 border-b border-d-line py-4 text-[10px] text-d-muted">
              <span>{t.hero.imageNote}</span>
              <a href="#approach" className="inline-flex items-center gap-2">
                {t.hero.secondary}
                <ArrowDown className="size-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="container-d grid gap-8 py-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24 lg:py-24">
          <Reveal>
            <Eyebrow>{t.intro.eyebrow}</Eyebrow>
            <div className="mt-7 flex gap-3" aria-hidden="true">
              {["01", "02", "03"].map((n, i) => (
                <span
                  key={n}
                  className={`grid size-12 place-items-center rounded-full border border-d-line text-xs ${i === 0 ? "bg-d-ink text-d-ink-fg" : ""}`}
                >
                  {n}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="d-display text-4xl leading-[1.15] sm:text-5xl">
              {t.intro.title}
            </h2>
            <p className="mt-5 max-w-xl leading-[1.85] text-d-muted">
              {t.intro.text}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium">
              {t.intro.points.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <span
                    className="size-1 rounded-full bg-d-accent"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section
          id="homes"
          tabIndex={-1}
          className="section-d border-y border-d-line bg-d-surface outline-none"
        >
          <div className="container-d">
            <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <Eyebrow>{t.listings.eyebrow}</Eyebrow>
                <h2 className="d-display mt-4 text-4xl leading-[1.12] sm:text-5xl lg:text-6xl">
                  {t.listings.title}
                </h2>
              </div>
              <p className="max-w-xs text-sm text-d-muted">{t.listings.text}</p>
            </Reveal>
            <div className="mt-10 grid gap-4 border-y border-d-line py-6 sm:grid-cols-3">
              {[
                {
                  label: t.listings.tenure,
                  value: tenure,
                  change: (value: string) => setTenure(value as typeof tenure),
                  options: [
                    ["", t.listings.allTenures],
                    ["buy", t.listings.buy],
                    ["rent", t.listings.rent],
                  ],
                },
                {
                  label: t.listings.type,
                  value: type,
                  change: (value: string) => setType(value as typeof type),
                  options: [
                    ["", t.listings.allTypes],
                    ...Object.entries(t.listings.types),
                  ],
                },
                {
                  label: t.listings.area,
                  value: area,
                  change: (value: string) => setArea(value as typeof area),
                  options: [
                    ["", t.listings.allAreas],
                    ...Object.entries(t.listings.areas),
                  ],
                },
              ].map((filter) => (
                <label key={filter.label} className="block">
                  <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.08em] text-d-muted">
                    {filter.label}
                  </span>
                  <select
                    value={filter.value}
                    onChange={(event) => filter.change(event.target.value)}
                    className="min-h-12 w-full border border-d-line bg-d-bg px-3 text-sm outline-none focus:border-d-ink"
                  >
                    {filter.options.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
            <div className="flex min-h-16 items-center justify-between gap-4 py-4">
              <p
                role="status"
                aria-live="polite"
                className="text-xs text-d-muted"
              >
                <span className="me-2 font-semibold text-d-fg">
                  {visible.length.toLocaleString(
                    lang === "ar" ? "ar-IQ" : "en-US",
                  )}
                </span>
                {t.listings.count}
              </p>
              {filtered && (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex min-h-10 items-center gap-2 text-xs underline underline-offset-4"
                >
                  <X className="size-3.5" aria-hidden="true" />
                  {t.listings.reset}
                </button>
              )}
            </div>
            {visible.length ? (
              <div className="grid gap-x-7 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
                {visible.map((property) => (
                  <article key={property.id} className="group min-w-0">
                    <div className="relative overflow-hidden bg-d-surface-2">
                      <Architecture
                        property={property}
                        label={`${property.copy[lang].name} — ${t.dialog.views[0]}`}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none"
                      />
                      <span className="absolute start-4 top-4 bg-d-bg/95 px-3 py-1.5 text-[10px] font-semibold">
                        {property.tenure === "buy"
                          ? t.listings.saleBadge
                          : t.listings.rentBadge}
                      </span>
                      <span
                        className="absolute bottom-4 end-4 text-[10px] text-d-ink"
                        lang="en"
                        dir="ltr"
                      >
                        {property.id}
                      </span>
                    </div>
                    <div className="pb-1 pt-5">
                      <div className="flex items-center gap-2 text-[11px] text-d-muted">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {t.listings.areas[property.area]}
                        <span aria-hidden="true">·</span>
                        {t.listings.types[property.type]}
                      </div>
                      <h3 className="d-display mt-2 text-[1.8rem] leading-tight">
                        {property.copy[lang].name}
                      </h3>
                      <p className="mt-2 text-xs text-d-muted">
                        {property.copy[lang].character}
                      </p>
                      <div className="my-5">
                        <Facts property={property} lang={lang} />
                      </div>
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="mb-1 text-[10px] text-d-muted">
                            {t.listings.priceLabel}
                          </p>
                          <p>
                            <span
                              lang="en"
                              dir="ltr"
                              className="text-lg font-medium"
                            >
                              {price(property.price)}
                            </span>
                            {property.tenure === "rent" && (
                              <span className="ms-1 text-[10px] text-d-muted">
                                {t.listings.month}
                              </span>
                            )}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelected(property)}
                          aria-label={`${t.listings.view}: ${property.copy[lang].name}`}
                          className="inline-flex min-h-11 items-center gap-2 border-b border-d-line text-xs font-semibold transition-colors hover:border-d-ink"
                        >
                          {t.listings.view}
                          <Arrow className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid min-h-64 place-items-center border border-dashed border-d-line p-8 text-center">
                <div>
                  <SlidersHorizontal
                    className="mx-auto size-7 text-d-accent"
                    aria-hidden="true"
                  />
                  <h3 className="d-display mt-4 text-3xl">
                    {t.listings.empty}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-d-muted">
                    {t.listings.emptyText}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className={`${outlineButton} mt-6`}
                  >
                    {t.listings.reset}
                  </button>
                </div>
              </div>
            )}
            <p className="mt-10 max-w-3xl border-t border-d-line pt-5 text-xs leading-relaxed text-d-muted">
              {t.listings.note}
            </p>
          </div>
        </section>

        <section id="neighborhoods" className="section-d">
          <div className="container-d">
            <Reveal className="grid gap-6 lg:grid-cols-[1.3fr_.7fr] lg:items-end lg:gap-20">
              <div>
                <Eyebrow>{t.places.eyebrow}</Eyebrow>
                <h2 className="d-display mt-4 max-w-2xl text-4xl leading-[1.12] sm:text-5xl lg:text-6xl">
                  {t.places.title}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-[1.9] text-d-muted">
                {t.places.text}
              </p>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {t.places.items.map((place, index) => (
                <button
                  key={place.area}
                  type="button"
                  onClick={() => chooseArea(place.area)}
                  className="group flex flex-col border border-d-line p-7 text-start transition-colors hover:bg-d-surface-2 sm:p-8"
                >
                  <span className="flex w-full items-center justify-between">
                    <span className="text-xs text-d-accent" lang="en">
                      {place.number}
                    </span>
                    <Compass
                      className="size-6 text-d-accent"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="my-6 block w-full border-y border-d-line py-5"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 260 100"
                      className="h-24 w-full"
                      fill="none"
                    >
                      <path
                        d="M10 89h240M23 88V44h40v44M36 44V21h32v67M81 88V37h54v51M89 37V24h38v13M154 89V17h39v72M201 89V48h36v41"
                        stroke="currentColor"
                        strokeWidth="1.1"
                      />
                      {Array.from({ length: 5 }, (_, i) => (
                        <path
                          key={i}
                          d={`M${index === 1 ? 160 : 89} ${45 + i * 8}h${index === 1 ? 27 : 38}`}
                          stroke="currentColor"
                          opacity=".35"
                        />
                      ))}
                      <path
                        d="M15 89V63m0 2c-15-19 9-26 0-4 18-19 24-3 0 4M224 47v-18m-7 9h14"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </span>
                  <span className="text-[10px] uppercase tracking-[.1em] text-d-accent">
                    {place.mood}
                  </span>
                  <span className="d-display mt-2 block text-4xl">
                    {t.listings.areas[place.area]}
                  </span>
                  <span className="mt-4 block flex-1 text-sm leading-[1.85] text-d-muted">
                    {place.text}
                  </span>
                  <span className="mt-7 flex items-center gap-3 text-xs font-semibold">
                    {t.places.link}
                    <Arrow
                      className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section
          id="approach"
          className="section-d overflow-hidden bg-d-ink text-d-ink-fg"
        >
          <div className="container-d">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_.6fr] lg:items-end lg:gap-20">
              <Reveal>
                <Eyebrow light>{t.process.eyebrow}</Eyebrow>
                <h2 className="d-display mt-5 max-w-2xl text-4xl leading-[1.14] sm:text-5xl lg:text-6xl">
                  {t.process.title}
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-sm leading-[1.9] text-d-ink-muted">
                  {t.process.text}
                </p>
              </Reveal>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {t.process.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative border-t border-white/20 pt-7"
                >
                  <span
                    className="d-display text-5xl text-d-ink-muted/70"
                    lang="en"
                  >
                    0{index + 1}
                  </span>
                  <h3 className="d-display mt-5 text-2xl sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-[1.9] text-d-ink-muted">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" tabIndex={-1} className="section-d outline-none">
          <div className="container-d grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <Eyebrow>{t.contact.eyebrow}</Eyebrow>
              <h2 className="d-display mt-5 text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">
                {t.contact.title}
              </h2>
              <p className="mt-6 max-w-md text-sm leading-[1.9] text-d-muted">
                {t.contact.text}
              </p>
              <div className="mt-9 flex items-center gap-4 border-t border-d-line pt-6">
                <span className="grid size-12 place-items-center rounded-full border border-d-line">
                  <Compass
                    className="size-5 text-d-accent"
                    strokeWidth={1.3}
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[10px] font-semibold tracking-[.12em] text-d-muted">
                  {t.contact.label}
                </span>
              </div>
            </Reveal>
            <div className="border border-d-line bg-d-surface p-6 sm:p-9">
              {interest && (
                <div
                  role="status"
                  className="mb-6 flex items-start justify-between gap-3 border-b border-d-line pb-5"
                >
                  <div>
                    <p className="text-[10px] text-d-muted">
                      {t.contact.selected}
                    </p>
                    <p className="d-display mt-1 text-2xl">
                      {interest.copy[lang].name}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInterest(null)}
                    aria-label={t.contact.clear}
                    className="grid size-10 shrink-0 place-items-center border border-d-line"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>
              )}
              <DemoForm
                fields={[
                  { name: "name", label: t.contact.name, half: true },
                  {
                    name: "email",
                    label: t.contact.email,
                    type: "email",
                    half: true,
                  },
                  {
                    name: "interest",
                    label: t.contact.interest,
                    type: "select",
                    placeholder: t.contact.choice,
                    options: t.contact.options,
                  },
                  {
                    name: "message",
                    label: t.contact.message,
                    type: "textarea",
                    placeholder: t.contact.messagePh,
                  },
                ]}
                submit={t.contact.submit}
                success={t.contact.success}
                note={t.contact.note}
                inputClassName="border-d-line bg-d-bg !rounded-none"
                buttonClassName="bg-d-ink text-d-ink-fg !rounded-none hover:bg-d-ink/90"
              />
            </div>
          </div>
        </section>

        <section
          id="questions"
          className="section-d border-t border-d-line bg-d-surface-2/50"
        >
          <div className="container-d grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div>
              <Eyebrow>{t.faq.eyebrow}</Eyebrow>
              <h2 className="d-display mt-5 text-4xl leading-[1.15] sm:text-5xl">
                {t.faq.title}
              </h2>
            </div>
            <Accordion
              items={t.faq.items}
              className="divide-d-line border-y border-d-line"
            />
          </div>
        </section>
      </main>
      <footer className="bg-d-ink text-d-ink-fg">
        <div className="container-d grid gap-10 py-14 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <h2 className="d-display whitespace-pre-line text-4xl leading-[1.15] sm:text-5xl">
              {t.footer.statement}
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-[1.85] text-d-ink-muted">
              {t.footer.text}
            </p>
          </div>
          <div className="flex flex-wrap justify-between gap-8 lg:justify-end lg:gap-20">
            <div>
              <h3 className="text-sm font-semibold">{t.footer.explore}</h3>
              <ul className="mt-5 space-y-3 text-sm text-d-ink-muted">
                {[
                  ...links,
                  { href: "#contact", label: t.nav.contact },
                  { href: "#questions", label: t.faq.title },
                ].map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="hover:text-d-ink-fg">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#top"
              aria-label={t.footer.top}
              className="grid size-12 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/10"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="container-d flex flex-col justify-between gap-5 border-t border-white/15 py-7 sm:flex-row sm:items-center">
          <Brand lang={lang} light />
          <div className="text-[10px] leading-relaxed text-d-ink-muted sm:text-end">
            <p>{t.footer.detail}</p>
            <p className="mt-1">
              © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
      {selected && (
        <ResidenceDialog
          property={selected}
          lang={lang}
          onClose={() => setSelected(null)}
          onEnquire={enquire}
        />
      )}
    </div>
  );
}
