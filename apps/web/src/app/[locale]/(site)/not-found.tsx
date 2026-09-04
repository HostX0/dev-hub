"use client";

import { Button } from "@/components/ui/Button";
import { useI18n } from "@/i18n/client";

export default function NotFound() {
  const { t, locale } = useI18n();
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial opacity-60" />
      <p className="font-display text-8xl font-black text-gradient md:text-9xl">404</p>
      <h1 className="mt-4 text-2xl font-bold">{t.notFound.title}</h1>
      <p className="mt-2 text-muted">{t.notFound.text}</p>
      <Button href={`/${locale}`} className="mt-8">{t.notFound.home}</Button>
    </section>
  );
}
