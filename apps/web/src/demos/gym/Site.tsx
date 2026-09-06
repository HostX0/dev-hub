"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  Dumbbell,
  MoveUpRight,
  Plus,
  Timer,
  X,
} from "lucide-react";
import type { DemoLang } from "@/demos/config";
import { DemoNav } from "@/demos/shared/DemoNav";
import { DemoForm } from "@/demos/shared/DemoForm";
import { cn } from "@/lib/utils";
import { gymContent, type GymContent } from "./content";

type Session = GymContent["schedule"]["sessions"][number];
type Plan = GymContent["plans"]["items"][number];
const action =
  "inline-flex min-h-12 items-center justify-center gap-3 border border-d-accent bg-d-accent px-6 py-3 text-sm font-extrabold text-d-accent-fg transition-colors hover:bg-d-fg hover:border-d-fg";
const heading =
  "whitespace-pre-line text-[clamp(2.25rem,4.5vw,4.5rem)] font-black leading-[1.08]";

function ClubMark({ t }: { t: GymContent }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid size-10 -skew-x-6 place-items-center bg-d-accent text-d-accent-fg">
        <Activity
          className="size-6 skew-x-6"
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </span>
      <span>
        <span className="block text-3xl font-black leading-none">
          {t.brand}
        </span>
        <span className="mt-1 block text-[9px] font-bold tracking-[.18em]">
          {t.brandSub}
        </span>
      </span>
    </span>
  );
}

/** Generated concept studio artwork; the demo does not claim a real venue. */
function EquipmentArt({ label, caption }: { label: string; caption: string }) {
  return (
    <div className="relative isolate aspect-[5/4] w-full overflow-hidden border border-white/10 bg-[#17231d] lg:aspect-[5/6]">
      <Image
        src="/demos/art/gym-hero.png"
        alt=""
        fill
        priority
        sizes="(max-width: 1023px) 100vw, 45vw"
        className="object-cover object-[72%_center]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10"
        aria-hidden="true"
      />
      <div
        className="absolute end-7 top-7 h-20 w-1.5 bg-d-accent"
        aria-hidden="true"
      />
      <div className="absolute inset-x-7 bottom-7 border-t border-white/25 pt-5">
        <p className="text-[10px] font-bold tracking-[.18em] text-d-accent">
          {label}
        </p>
        <p className="mt-2 max-w-xs text-2xl font-black text-white">
          {caption}
        </p>
      </div>
    </div>
  );
}

function SignupDialog({
  lang,
  t,
  plan,
  session,
  onPlanChange,
  onDismiss,
}: {
  lang: DemoLang;
  t: GymContent;
  plan: Plan;
  session: Session | null;
  onPlanChange: (id: string) => void;
  onDismiss: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const planId = useId();
  useEffect(() => {
    const dialog = ref.current;
    const opener = document.activeElement;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      if (dialog?.open) dialog.close();
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not(:disabled), a[href], input:not(:disabled):not([type="hidden"]), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((control) => control.getClientRects().length > 0);
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          onDismiss();
      }}
      className="m-auto max-h-[88dvh] w-[min(92vw,38rem)] overflow-y-auto border border-d-line bg-d-bg p-6 text-d-fg shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm sm:p-9"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 id={titleId} className="max-w-md text-3xl font-black leading-tight">
          {t.form.title}
        </h2>
        <button
          type="button"
          aria-label={t.form.close}
          onClick={onDismiss}
          className="grid size-11 shrink-0 place-items-center border border-d-line hover:bg-d-surface"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-d-muted">
        {t.form.intro}
      </p>
      {session && (
        <p className="mt-5 border-s-2 border-d-accent ps-4 text-sm">
          <span className="block text-d-muted">{t.form.session}</span>
          <strong>
            {session.title} ·{" "}
            {t.schedule.days.find((day) => day.id === session.day)?.label} ·{" "}
            <bdi>{session.time}</bdi>
          </strong>
        </p>
      )}
      <label htmlFor={planId} className="mb-2 mt-6 block text-sm font-bold">
        {t.form.plan}
      </label>
      <select
        id={planId}
        value={plan.id}
        onChange={(event) => onPlanChange(event.target.value)}
        className="mb-6 min-h-12 w-full rounded-lg border border-d-line bg-d-surface px-4 text-d-fg"
      >
        {t.plans.items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} — {item.price} {t.plans.currency} {t.plans.period}
          </option>
        ))}
      </select>
      <DemoForm
        fields={[
          {
            name: "name",
            label: t.form.name,
            placeholder: t.form.namePh,
            half: true,
          },
          {
            name: "email",
            label: t.form.email,
            type: "email",
            placeholder: t.form.emailPh,
            half: true,
          },
          {
            name: "phone",
            label: t.form.phone,
            type: "tel",
            placeholder: t.form.phonePh,
            required: false,
          },
          {
            name: "area",
            label: t.form.preference,
            type: "select",
            placeholder: t.form.preferencePh,
            options: t.zones.items.map((zone) => zone.title),
          },
        ]}
        submit={t.form.submit}
        success={t.form.success}
        note={t.form.note}
        inputClassName="border-d-line bg-d-surface text-d-fg placeholder:text-d-muted"
        buttonClassName="bg-d-accent text-d-accent-fg hover:bg-d-fg"
      />
    </dialog>
  );
}

export function GymSite({ lang }: { lang: DemoLang }) {
  const t = gymContent[lang];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const [day, setDay] = useState("sat");
  const [style, setStyle] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState("flow");
  const [signup, setSignup] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const plan =
    t.plans.items.find((item) => item.id === selectedPlan) ?? t.plans.items[1];
  const visibleSessions = t.schedule.sessions.filter(
    (item) => item.day === day && (style === "all" || item.type === style),
  );
  function openSignup(
    planId = selectedPlan,
    selectedSession: Session | null = null,
  ) {
    setSelectedPlan(planId);
    setSession(selectedSession);
    setSignup(true);
  }
  const number = (value: number) =>
    value.toLocaleString(lang === "ar" ? "ar-IQ" : "en");

  return (
    <div id="top" className="overflow-x-clip bg-d-bg text-d-fg">
      <DemoNav
        site="gym"
        lang={lang}
        brand={<ClubMark t={t} />}
        links={[
          { href: "#zones", label: t.nav.zones },
          { href: "#schedule", label: t.nav.schedule },
          { href: "#membership", label: t.nav.plans },
          { href: "#coaching", label: t.nav.coaches },
        ]}
        cta={{ href: "#membership", label: t.cta }}
        className="border-b border-d-line bg-d-bg/95 backdrop-blur-md"
        scrolledClassName="shadow-lg"
        linkClassName="text-d-muted hover:text-d-accent"
        ctaClassName="bg-d-accent text-d-accent-fg"
        langClassName="border-d-line text-d-fg"
        toggleClassName="border-d-line text-d-accent"
        panelClassName="border-d-line bg-d-bg"
      />

      <main>
        <section className="relative border-b border-d-line pt-[4.5rem]">
          <div className="container-d grid items-center gap-10 py-14 lg:grid-cols-[1.2fr_1fr] lg:gap-7 lg:py-20">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-bold tracking-[.13em] text-d-accent">
                <span className="size-2 bg-d-accent" aria-hidden="true" />
                {t.eyebrow}
              </p>
              <h1
                className={cn(
                  "mt-8 text-[clamp(3.1rem,8.4vw,8rem)] font-black",
                  lang === "en"
                    ? "leading-[.94] tracking-[-.065em]"
                    : "leading-[1.12]",
                )}
              >
                <span className="block">{t.hero.first}</span>
                <span className="block">{t.hero.second}</span>
                <span className="block text-d-accent">{t.hero.third}</span>
              </h1>
              <p className="mt-7 max-w-lg text-base leading-[1.85] text-d-muted sm:text-lg">
                {t.hero.text}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#membership" className={action}>
                  {t.hero.primary}
                  <Arrow className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="#schedule"
                  className="inline-flex min-h-12 items-center gap-2 border border-d-line px-5 text-sm font-bold transition-colors hover:border-d-accent"
                >
                  {t.hero.secondary}
                </a>
              </div>
            </div>
            <EquipmentArt label={t.hero.artLabel} caption={t.hero.artCaption} />
          </div>
          <p className="container-d pb-8 text-[10px] font-bold tracking-[.16em] text-d-muted">
            {t.hero.tag}
          </p>
        </section>
        <div
          className="grid gap-3 bg-d-accent px-5 py-5 text-d-accent-fg sm:grid-cols-3"
          aria-label={t.brandSub}
        >
          {t.strip.map((item) => (
            <p
              key={item}
              className="flex items-center justify-center gap-4 text-sm font-black sm:text-base"
            >
              <Plus className="size-4" aria-hidden="true" />
              {item}
            </p>
          ))}
        </div>

        <section id="zones" className="section-d">
          <div className="container-d">
            <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
              <div>
                <p className="eyebrow-d">{t.zones.eyebrow}</p>
                <h2 className={cn(heading, "mt-5")}>{t.zones.title}</h2>
              </div>
              <p className="max-w-lg self-end leading-[1.85] text-d-muted">
                {t.zones.text}
              </p>
            </div>
            <div className="mt-12 grid gap-px border border-d-line bg-d-line md:grid-cols-3">
              {t.zones.items.map((zone, index) => {
                const Icon = [Dumbbell, Activity, MoveUpRight][index];
                return (
                  <article key={zone.title} className="bg-d-bg p-7 sm:p-9">
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-d-muted">
                        {number(index + 1).padStart(
                          2,
                          lang === "ar" ? "٠" : "0",
                        )}
                      </span>
                      <Icon
                        className="size-9 text-d-accent"
                        strokeWidth={1.25}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-12 text-5xl font-black text-d-fg/10">
                      {zone.label}
                    </p>
                    <h3 className="mt-4 text-2xl font-bold">{zone.title}</h3>
                    <p className="mt-3 min-h-20 text-sm leading-[1.85] text-d-muted">
                      {zone.text}
                    </p>
                    <p className="mt-7 border-t border-d-line pt-4 text-xs text-d-accent">
                      {zone.detail}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="schedule"
          className="section-d border-y border-d-line bg-d-surface"
        >
          <div className="container-d">
            <p className="eyebrow-d">{t.schedule.eyebrow}</p>
            <h2 className={cn(heading, "mt-5")}>{t.schedule.title}</h2>
            <p className="mt-5 max-w-2xl leading-[1.85] text-d-muted">
              {t.schedule.text}
            </p>
            <fieldset className="mt-10">
              <legend className="mb-3 text-xs font-bold text-d-muted">
                {t.schedule.dayLabel}
              </legend>
              <div className="flex flex-wrap gap-2">
                {t.schedule.days.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={day === item.id}
                    onClick={() => setDay(item.id)}
                    className={cn(
                      "min-h-12 flex-1 border px-5 text-sm font-bold transition-colors sm:flex-none",
                      day === item.id
                        ? "border-d-accent bg-d-accent text-d-accent-fg"
                        : "border-d-line bg-d-bg hover:border-d-accent",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-6">
              <legend className="mb-3 text-xs font-bold text-d-muted">
                {t.schedule.typeLabel}
              </legend>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {[
                  { id: "all", label: t.schedule.all },
                  ...t.schedule.types,
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={style === item.id}
                    onClick={() => setStyle(item.id)}
                    className={cn(
                      "min-h-11 border-b-2 text-sm font-semibold",
                      style === item.id
                        ? "border-d-accent text-d-accent"
                        : "border-transparent text-d-muted hover:text-d-fg",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <p role="status" className="mb-3 mt-7 text-xs text-d-muted">
              {t.schedule.result}: {number(visibleSessions.length)}
            </p>
            <div className="divide-y divide-d-line border-y border-d-line">
              {visibleSessions.length ? (
                visibleSessions.map((item) => (
                  <article
                    key={item.id}
                    className="grid items-center gap-5 py-7 sm:grid-cols-[.35fr_1fr_auto]"
                  >
                    <div className="text-3xl font-black text-d-accent">
                      <bdi>{item.time}</bdi>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-d-muted">
                        {
                          t.schedule.types.find((type) => type.id === item.type)
                            ?.label
                        }
                      </p>
                      <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
                      <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-d-muted">
                        <Timer className="size-3.5" aria-hidden="true" />
                        {number(item.minutes)} {t.schedule.duration}
                        <span aria-hidden="true">/</span>
                        {item.level}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openSignup(selectedPlan, item)}
                      className="inline-flex min-h-11 items-center justify-center gap-3 border border-d-line px-5 text-sm font-bold hover:border-d-accent hover:text-d-accent"
                    >
                      {t.schedule.join}
                      <Arrow className="size-4" aria-hidden="true" />
                    </button>
                  </article>
                ))
              ) : (
                <p className="py-10 text-d-muted">{t.schedule.empty}</p>
              )}
            </div>
          </div>
        </section>

        <section id="membership" className="section-d">
          <div className="container-d">
            <p className="eyebrow-d">{t.plans.eyebrow}</p>
            <h2 className={cn(heading, "mt-5")}>{t.plans.title}</h2>
            <p className="mt-5 max-w-2xl leading-[1.85] text-d-muted">
              {t.plans.text}
            </p>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {t.plans.items.map((item, index) => (
                <article
                  key={item.id}
                  className={cn(
                    "relative flex flex-col border p-7 sm:p-9",
                    index === 1
                      ? "border-d-accent bg-d-accent text-d-accent-fg"
                      : "border-d-line bg-d-surface",
                  )}
                >
                  <p className="min-h-5 text-[10px] font-extrabold tracking-widest">
                    {index === 1 ? t.plans.popular : `0${index + 1}`}
                  </p>
                  <h3 className="mt-4 text-4xl font-black">{item.name}</h3>
                  <p
                    className={cn(
                      "mt-3 text-sm",
                      index === 1 ? "text-d-accent-fg/75" : "text-d-muted",
                    )}
                  >
                    {item.text}
                  </p>
                  <p className="mt-8 flex flex-wrap items-baseline gap-2">
                    <span className="text-[2.5rem] font-black leading-none">
                      <bdi>{item.price}</bdi>
                    </span>
                    <span className="text-xs font-bold">
                      {t.plans.currency} {t.plans.period}
                    </span>
                  </p>
                  <ul className="my-8 space-y-4 border-t border-current/15 pt-7">
                    {item.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check
                          className="mt-0.5 size-4 shrink-0"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => openSignup(item.id)}
                    className={cn(
                      "mt-auto inline-flex min-h-12 w-full items-center justify-between gap-3 px-5 text-sm font-extrabold",
                      index === 1
                        ? "bg-d-accent-fg text-d-accent hover:bg-[#26382c]"
                        : "border border-d-line hover:border-d-accent hover:text-d-accent",
                    )}
                  >
                    {t.plans.choose}
                    <Arrow className="size-4" aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="coaching"
          className="section-d border-y border-d-line bg-d-surface"
        >
          <div className="container-d grid gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow-d">{t.coaches.eyebrow}</p>
              <h2 className={cn(heading, "mt-5")}>{t.coaches.title}</h2>
              <p className="mt-6 max-w-lg leading-[1.85] text-d-muted">
                {t.coaches.text}
              </p>
            </div>
            <div>
              <p className="mb-5 text-[10px] font-bold tracking-[.16em] text-d-muted">
                {t.coaches.badge}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {t.coaches.items.map((coach, index) => (
                  <article
                    key={coach.title}
                    className="border border-d-line bg-d-bg"
                  >
                    <div
                      className="relative grid aspect-square place-items-center overflow-hidden bg-[#1b2920]"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-6 rotate-45 border border-d-accent/20" />
                      <div className="absolute inset-11 rotate-45 border border-d-accent/20" />
                      <span className="relative text-[5.5rem] font-black text-d-accent">
                        {coach.initials}
                      </span>
                      <span className="absolute bottom-3 end-3 text-xs text-d-muted">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold">{coach.title}</h3>
                      <p className="mt-2 text-xs text-d-accent">{coach.role}</p>
                      <p className="mt-4 text-xs leading-[1.8] text-d-muted">
                        {coach.text}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-d">
          <div className="container-d grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow-d">{t.faq.eyebrow}</p>
              <h2 className={cn(heading, "mt-5")}>{t.faq.title}</h2>
            </div>
            <div className="divide-y divide-d-line border-y border-d-line">
              {t.faq.items.map((item) => (
                <details key={item.q} className="group py-1">
                  <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus
                      className="size-5 shrink-0 text-d-accent transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="max-w-xl pb-6 leading-[1.9] text-d-muted">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="bg-d-accent py-16 text-d-accent-fg md:py-24"
        >
          <div className="container-d grid items-end gap-9 lg:grid-cols-[1.25fr_.75fr]">
            <div>
              <p className="text-xs font-bold tracking-widest">
                {t.contact.eyebrow}
              </p>
              <h2 className="mt-6 whitespace-pre-line text-[clamp(3.5rem,7vw,7rem)] font-black leading-[1.03]">
                {t.contact.title}
              </h2>
            </div>
            <div>
              <p className="max-w-lg leading-[1.85]">{t.contact.text}</p>
              <button
                type="button"
                onClick={() => openSignup()}
                className="mt-7 inline-flex min-h-14 items-center justify-between gap-7 bg-d-accent-fg px-6 text-sm font-extrabold text-d-accent hover:bg-[#26382c]"
              >
                {t.contact.button}
                <Arrow className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="container-d py-12 pb-28">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <ClubMark t={t} />
          <div className="text-sm">
            <p>{t.contact.location}</p>
            <p className="mt-2 text-xs text-d-muted">{t.contact.hoursLabel}</p>
            <p className="mt-1 text-xs">{t.contact.hours}</p>
          </div>
          <a
            href="#top"
            aria-label={t.contact.back}
            className="grid size-12 place-items-center border border-d-line hover:border-d-accent"
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </a>
        </div>
        <p className="mt-9 max-w-2xl border-t border-d-line pt-6 text-xs leading-relaxed text-d-muted">
          {t.contact.note}
        </p>
      </footer>
      {signup && (
        <SignupDialog
          lang={lang}
          t={t}
          plan={plan}
          session={session}
          onPlanChange={setSelectedPlan}
          onDismiss={() => setSignup(false)}
        />
      )}
    </div>
  );
}
