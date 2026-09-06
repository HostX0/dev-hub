"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ChevronRight,
  Home,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { DemoNav } from "@/demos/shared/DemoNav";
import { DemoForm } from "@/demos/shared/DemoForm";
import type { DemoLang } from "@/demos/config";
import { ProductVisual } from "./ProductVisual";
import type { RetailContent, RetailProduct } from "./types";

type RetailSlug = "appliances" | "phones";
function RetailDialog({
  title,
  closeLabel,
  onClose,
  children,
}: {
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previous = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previous;
      trigger?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      onCancel={onClose}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]',
          ),
        ).filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="retail-dialog m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-2xl border border-d-line bg-d-bg p-0 text-d-fg backdrop:bg-black/60"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-d-line bg-d-bg p-5 sm:px-8">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-d-line hover:bg-d-surface-2"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="p-5 sm:p-8">{children}</div>
    </dialog>
  );
}
export function RetailSite({
  site,
  lang,
  t,
}: {
  site: RetailSlug;
  lang: DemoLang;
  t: RetailContent;
}) {
  const tech = site === "phones";
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState<RetailProduct | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase(lang);
  const visible = t.products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      `${p.name} ${p.description} ${p.specs.join(" ")}`
        .toLocaleLowerCase(lang)
        .includes(normalizedQuery),
  );
  if (sort !== "featured")
    visible.sort((a, b) =>
      sort === "low" ? a.price - b.price : b.price - a.price,
    );
  const entries = t.products.filter((p) => (cart[p.id] ?? 0) > 0);
  const count = Object.values(cart).reduce((sum, n) => sum + n, 0);
  const total = entries.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  const number = (n: number) =>
    new Intl.NumberFormat(lang === "ar" ? "ar-IQ" : "en-IQ").format(n);
  const price = (n: number) => `${number(n)} ${t.catalogue.currency}`;
  const reset = () => {
    setCategory("all");
    setQuery("");
    setSort("featured");
  };
  const add = (product: RetailProduct) => {
    setCart((current) => ({
      ...current,
      [product.id]: Math.min((current[product.id] ?? 0) + 1, 99),
    }));
    setCheckoutDone(false);
    setAnnouncement(`${product.name}: ${t.catalogue.added}`);
  };
  const changeQuantity = (id: string, delta: number) => {
    setCheckoutDone(false);
    setCart((current) => ({
      ...current,
      [id]: Math.max(0, Math.min(99, (current[id] ?? 0) + delta)),
    }));
  };
  const button =
    "inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-d-accent px-6 py-3 text-sm font-bold text-d-accent-fg transition-transform hover:-translate-y-0.5";
  return (
    <div id="top" className={`retail-site ${site}-site pb-16`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-d-accent focus:px-5 focus:py-3 focus:text-d-accent-fg"
      >
        {lang === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>
      <DemoNav
        site={site}
        lang={lang}
        brand={
          <span className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-d-accent text-d-accent-fg">
              {tech ? (
                <Zap className="size-5" fill="currentColor" />
              ) : (
                <Home className="size-5" />
              )}
            </span>
            <span className="text-2xl font-extrabold tracking-tight">
              {t.brand}
              <span className="mt-0.5 hidden text-[9px] font-medium tracking-[.12em] sm:block">
                {t.descriptor}
              </span>
            </span>
          </span>
        }
        links={t.nav.map((label, i) => ({
          label,
          href: ["#collection", "#approach", "#contact"][i],
        }))}
        cta={{ label: t.hero.primary, href: "#collection" }}
        className="border-b border-d-line bg-d-bg/95 text-d-fg backdrop-blur-xl"
        scrolledClassName="shadow-sm"
        panelClassName="bg-d-bg text-d-fg"
        langClassName="border-d-line hover:bg-d-surface-2"
        toggleClassName="border-d-line"
        ctaClassName="bg-d-accent text-d-accent-fg"
      />
      <main id="main-content">
        <section
          className={`pt-[4.5rem] ${tech ? "bg-d-ink text-d-ink-fg" : "bg-d-bg"}`}
        >
          <div
            className={`border-b py-2.5 text-center text-xs ${tech ? "border-white/10 text-d-ink-muted" : "border-d-line text-d-muted"}`}
          >
            <p className="container-d">{t.announcement}</p>
          </div>
          <div className="container-d grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[.85fr_1.15fr] lg:gap-12 lg:py-20">
            <div>
              <p
                className={`eyebrow-d ${tech ? "text-[#C0B2F7]" : "text-d-accent"}`}
              >
                {t.hero.eyebrow}
              </p>
              <h1
                className={`mt-6 font-d-display leading-[1.05] tracking-tight ${tech ? "text-5xl font-extrabold sm:text-6xl xl:text-[5rem]" : "text-5xl font-medium sm:text-7xl xl:text-[5.5rem]"}`}
              >
                {t.hero.title}
                <span
                  className={`mt-2 block ${tech ? "text-[#C0B2F7]" : "text-d-accent"}`}
                >
                  {t.hero.accent}
                </span>
              </h1>
              <p
                className={`mt-7 max-w-md text-base leading-relaxed sm:text-lg ${tech ? "text-d-ink-muted" : "text-d-muted"}`}
              >
                {t.hero.text}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <a
                  href="#collection"
                  className={
                    tech ? `${button} bg-[#C0B2F7] text-[#201938]` : button
                  }
                >
                  {t.hero.primary}
                  <ArrowUpRight className="size-4 rtl:-scale-x-100" />
                </a>
                <a
                  href="#guide"
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-current/30 underline-offset-8"
                >
                  {t.hero.secondary}
                  <ChevronRight className="size-4 rtl:rotate-180" />
                </a>
              </div>
            </div>
            <div className="relative">
              <div
                className={`relative aspect-[1.16] overflow-hidden ${tech ? "rounded-3xl border border-white/10" : "rounded-t-[9rem] rounded-b-2xl sm:rounded-t-[12rem]"}`}
              >
                <Image
                  src={`/demos/art/${site}-hero.png`}
                  alt={t.hero.imageAlt}
                  fill
                  preload
                  sizes="(max-width:1023px) 100vw, 58vw"
                  className="object-cover"
                />
              </div>
              <div
                className={`relative -mt-7 ms-6 inline-flex max-w-[calc(100%-3rem)] items-center gap-3 rounded-xl border px-5 py-4 text-xs shadow-sm ${tech ? "border-white/15 bg-[#211F30]" : "border-d-line bg-d-surface"}`}
              >
                <Sparkles
                  className={`size-4 shrink-0 ${tech ? "text-[#C0B2F7]" : "text-d-accent"}`}
                />
                {t.hero.caption}
              </div>
            </div>
          </div>
        </section>
        <section
          aria-label={t.hero.eyebrow}
          className="border-y border-d-line bg-d-surface"
        >
          <div className="container-d grid md:grid-cols-3">
            {t.benefits.map((benefit, i) => {
              const Icon = [SlidersHorizontal, Sparkles, Truck][i];
              return (
                <div
                  key={benefit.title}
                  className="flex gap-4 py-7 md:px-6 md:first:ps-0 md:last:pe-0"
                >
                  <Icon className="mt-1 size-6 shrink-0 text-d-accent" />
                  <div>
                    <h2 className="font-bold">{benefit.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-d-muted">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section id="collection" className="section-d">
          <div className="container-d">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="eyebrow-d text-d-accent">{t.catalogue.eyebrow}</p>
                <h2 className="mt-4 font-d-display text-4xl leading-tight font-semibold sm:text-5xl">
                  {t.catalogue.title}
                </h2>
                <p className="mt-4 max-w-xl text-d-muted">{t.catalogue.text}</p>
              </div>
              <button
                onClick={() => setCartOpen(true)}
                className="inline-flex min-h-12 items-center gap-3 rounded-full border border-d-line bg-d-surface px-5 font-semibold"
              >
                <ShoppingBag className="size-5" />
                {t.cart.title}
                <span className="grid min-w-7 place-items-center rounded-full bg-d-accent px-1.5 text-sm text-d-accent-fg">
                  {number(count)}
                </span>
              </button>
            </div>
            <div className="mt-9 flex flex-col justify-between gap-5 border-y border-d-line py-5 xl:flex-row xl:items-center">
              <div
                className="flex flex-wrap gap-2"
                aria-label={t.catalogue.all}
              >
                {[{ id: "all", name: t.catalogue.all }, ...t.categories].map(
                  (c) => (
                    <button
                      type="button"
                      key={c.id}
                      aria-pressed={category === c.id}
                      onClick={() => setCategory(c.id)}
                      className={`min-h-11 rounded-full border px-4 text-sm font-semibold ${category === c.id ? "border-d-fg bg-d-fg text-d-bg" : "border-d-line bg-transparent hover:bg-d-surface-2"}`}
                    >
                      {c.name}
                    </button>
                  ),
                )}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="relative min-w-0 flex-1">
                  <span className="sr-only">{t.catalogue.search}</span>
                  <Search className="absolute start-3 top-3.5 size-4 text-d-muted" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="search"
                    placeholder={t.catalogue.searchPlaceholder}
                    className="h-11 w-full rounded-full border border-d-line bg-d-surface pe-4 ps-10 text-sm xl:w-60"
                  />
                </label>
                <label>
                  <span className="sr-only">{t.catalogue.sort}</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="h-11 w-full rounded-full border border-d-line bg-d-surface px-4 text-sm"
                  >
                    <option value="featured">{t.catalogue.featured}</option>
                    <option value="low">{t.catalogue.low}</option>
                    <option value="high">{t.catalogue.high}</option>
                  </select>
                </label>
              </div>
            </div>
            <p role="status" className="mt-5 text-xs text-d-muted">
              {number(visible.length)} {t.catalogue.results}
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => (
                <article
                  key={p.id}
                  className="group overflow-hidden rounded-2xl border border-d-line bg-d-surface"
                >
                  <button
                    onClick={() => setSelected(p)}
                    className="relative block w-full overflow-hidden bg-d-surface-2 text-start"
                    aria-label={`${t.catalogue.details}: ${p.name}`}
                  >
                    <ProductVisual
                      product={p}
                      className="mx-auto aspect-[1.25] w-full max-w-[400px] transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute start-4 top-4 rounded-full bg-d-surface/90 px-3 py-1 text-[11px] font-medium">
                      {t.categories.find((c) => c.id === p.category)?.name}
                    </span>
                    <span className="absolute bottom-4 end-4 grid size-9 place-items-center rounded-full bg-d-surface">
                      <ArrowUpRight className="size-4 rtl:-scale-x-100" />
                    </span>
                  </button>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-bold">
                      <button
                        onClick={() => setSelected(p)}
                        className="text-start hover:underline"
                      >
                        {p.name}
                      </button>
                    </h3>
                    <p className="mt-2 min-h-10 text-sm leading-relaxed text-d-muted">
                      {p.specs[0]}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-d-line pt-4">
                      <p className="font-semibold tabular-nums">
                        {price(p.price)}
                      </p>
                      <button
                        onClick={() => add(p)}
                        aria-label={`${t.catalogue.add}: ${p.name}`}
                        className="grid size-11 shrink-0 place-items-center rounded-full bg-d-fg text-d-bg transition-colors hover:bg-d-accent"
                      >
                        <Plus className="size-5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {visible.length === 0 && (
              <div className="rounded-2xl border border-d-line py-16 text-center">
                <Search className="mx-auto size-8 text-d-muted" />
                <p className="mt-5 font-medium">{t.catalogue.empty}</p>
                <button onClick={reset} className={`${button} mt-5`}>
                  {t.catalogue.reset}
                </button>
              </div>
            )}
            <p role="status" className="mt-4 min-h-5 text-sm text-d-accent">
              {announcement}
            </p>
          </div>
        </section>
        <section
          id="approach"
          className="bg-d-ink py-16 text-d-ink-fg sm:py-24"
        >
          <div className="container-d grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="relative overflow-hidden rounded-2xl bg-white/5 p-5 sm:p-9">
              <div className="absolute -end-20 -top-20 size-72 rounded-full border border-white/15" />
              <div className="absolute -bottom-20 -start-20 size-72 rounded-full border border-white/15" />
              <ProductVisual
                product={t.products[tech ? 0 : 3]}
                className="relative mx-auto max-w-md"
              />
              <p className="relative text-center text-xs tracking-wide text-d-ink-muted">
                {t.hero.caption}
              </p>
            </div>
            <div>
              <p className="eyebrow-d text-d-ink-muted">{t.story.eyebrow}</p>
              <h2 className="mt-5 font-d-display text-4xl leading-tight font-semibold sm:text-5xl">
                {t.story.title}
              </h2>
              <p className="mt-6 leading-relaxed text-d-ink-muted">
                {t.story.text}
              </p>
              <ul className="mt-6 space-y-4">
                {t.story.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm">
                    <Check className="size-5 shrink-0 text-d-ink-muted" />
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-d-bg px-6 text-sm font-bold text-d-fg"
              >
                {t.story.cta}
                <ArrowUpRight className="size-4 rtl:-scale-x-100" />
              </a>
            </div>
          </div>
        </section>
        <section id="guide" className="section-d">
          <div className="container-d">
            <p className="eyebrow-d text-d-accent">{t.guide.eyebrow}</p>
            <h2 className="mt-4 max-w-2xl font-d-display text-4xl leading-tight font-semibold sm:text-5xl">
              {t.guide.title}
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {t.guide.steps.map((step, i) => (
                <article
                  key={step.title}
                  className="border-t border-d-line pt-6"
                >
                  <span className="text-sm font-semibold text-d-accent">
                    {number(i + 1).padStart(2, lang === "ar" ? "٠" : "0")}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-d-muted">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="border-y border-d-line bg-d-surface py-16">
          <div className="container-d grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <h2 className="font-d-display text-4xl leading-tight font-semibold">
              {t.faqTitle}
            </h2>
            <div>
              {t.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group border-b border-d-line py-5 first:pt-0"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <Plus className="size-5 shrink-0 transition-transform group-open:rotate-45" />
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-d-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="section-d">
          <div className="container-d grid gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="eyebrow-d text-d-accent">{t.contact.eyebrow}</p>
              <h2 className="mt-5 font-d-display text-4xl leading-tight font-semibold sm:text-5xl">
                {t.contact.title}
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-d-muted">
                {t.contact.text}
              </p>
            </div>
            <DemoForm
              fields={[
                { name: "name", label: t.contact.name, half: true },
                {
                  name: "email",
                  label: t.contact.email,
                  type: "email",
                  half: true,
                },
                { name: "message", label: t.contact.message, type: "textarea" },
              ]}
              submit={t.contact.submit}
              success={t.contact.success}
              note={t.contact.note}
              inputClassName="border-d-line bg-d-surface text-d-fg"
              buttonClassName="bg-d-accent text-d-accent-fg"
            />
          </div>
        </section>
      </main>
      <footer className="border-t border-d-line bg-d-surface py-10">
        <div className="container-d flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-2xl font-extrabold">{t.brand}</p>
            <p className="mt-3 max-w-lg text-xs leading-relaxed text-d-muted">
              {t.footer}
            </p>
          </div>
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
          >
            {t.top}
            <ArrowUpRight className="size-4 rtl:-scale-x-100" />
          </a>
        </div>
      </footer>
      {count > 0 && !cartOpen && (
        <button
          onClick={() => setCartOpen(true)}
          aria-label={`${t.cart.title}, ${number(count)} ${t.cart.item}`}
          className="fixed bottom-24 end-4 z-40 inline-flex min-h-14 items-center gap-3 rounded-full border border-d-line bg-d-fg px-5 text-sm font-bold text-d-bg shadow-xl sm:end-8"
        >
          <ShoppingBag className="size-5" />
          <span>{t.cart.title}</span>
          <span className="rounded-full bg-d-bg px-2.5 py-1 text-d-fg">
            {number(count)}
          </span>
        </button>
      )}
      {selected && (
        <RetailDialog
          title={selected.name}
          closeLabel={t.catalogue.close}
          onClose={() => setSelected(null)}
        >
          <div className="grid gap-7 sm:grid-cols-2">
            <div className="rounded-xl bg-d-surface-2">
              <ProductVisual product={selected} className="w-full" />
            </div>
            <div>
              <p className="leading-relaxed text-d-muted">
                {selected.description}
              </p>
              <h3 className="mt-5 text-sm font-bold">
                {t.catalogue.specTitle}
              </h3>
              <ul className="mt-3 space-y-3">
                {selected.specs.map((spec) => (
                  <li key={spec} className="flex gap-2 text-sm">
                    <Check className="size-4 shrink-0 text-d-accent" />
                    {spec}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-2xl font-bold">{price(selected.price)}</p>
              <button
                className={`${button} mt-5 w-full`}
                onClick={() => add(selected)}
              >
                <Plus className="size-4" />
                {t.catalogue.add}
              </button>
              <p role="status" className="mt-3 text-xs text-d-accent">
                {announcement}
              </p>
            </div>
          </div>
          <p className="mt-6 border-t border-d-line pt-5 text-xs leading-relaxed text-d-muted">
            {t.cart.note}
          </p>
        </RetailDialog>
      )}
      {cartOpen && (
        <RetailDialog
          title={t.cart.title}
          closeLabel={t.catalogue.close}
          onClose={() => setCartOpen(false)}
        >
          {checkoutDone ? (
            <div className="py-8 text-center" role="status">
              <Check className="mx-auto size-12 text-d-accent" />
              <h3 className="mt-5 text-2xl font-bold">{t.cart.done}</h3>
              <p className="mx-auto mt-3 max-w-md text-d-muted">
                {t.cart.doneText}
              </p>
              <button
                className={`${button} mt-6`}
                onClick={() => {
                  setCheckoutDone(false);
                  setCartOpen(false);
                }}
              >
                {t.cart.continue}
              </button>
            </div>
          ) : entries.length === 0 ? (
            <div className="py-10 text-center">
              <ShoppingBag className="mx-auto size-10 text-d-muted" />
              <p className="mt-5">{t.cart.empty}</p>
              <button
                className={`${button} mt-6`}
                onClick={() => setCartOpen(false)}
              >
                {t.cart.continue}
              </button>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-d-line">
                {entries.map((p) => (
                  <li key={p.id} className="flex gap-4 py-5 first:pt-0">
                    <div className="hidden w-24 shrink-0 self-start rounded-xl bg-d-surface-2 sm:block">
                      <ProductVisual product={p} className="w-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold">{p.name}</h3>
                      <p className="mt-1 text-sm text-d-muted">
                        {price(p.price)}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full border border-d-line">
                          <button
                            aria-label={`${t.cart.decrease}: ${p.name}`}
                            disabled={cart[p.id] <= 1}
                            onClick={() => changeQuantity(p.id, -1)}
                            className="grid size-10 place-items-center rounded-full disabled:opacity-30"
                          >
                            <Minus className="size-4" />
                          </button>
                          <output
                            className="min-w-7 text-center text-sm tabular-nums"
                            aria-label={p.name}
                          >
                            {number(cart[p.id])}
                          </output>
                          <button
                            aria-label={`${t.cart.increase}: ${p.name}`}
                            disabled={cart[p.id] >= 99}
                            onClick={() => changeQuantity(p.id, 1)}
                            className="grid size-10 place-items-center rounded-full disabled:opacity-30"
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            setCart((current) => ({ ...current, [p.id]: 0 }))
                          }
                          className="min-h-11 text-xs text-d-muted underline underline-offset-4"
                          aria-label={`${t.cart.remove}: ${p.name}`}
                        >
                          {t.cart.remove}
                        </button>
                      </div>
                    </div>
                    <p className="self-start text-sm font-semibold tabular-nums">
                      {price(p.price * cart[p.id])}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between gap-4 border-t border-d-line pt-5 text-lg font-bold">
                <span>{t.cart.subtotal}</span>
                <span>{price(total)}</span>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-d-muted">
                {t.cart.note}
              </p>
              <button
                onClick={() => setCheckoutDone(true)}
                className={`${button} mt-6 w-full`}
              >
                {t.cart.checkout}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </button>
            </>
          )}
        </RetailDialog>
      )}
    </div>
  );
}
