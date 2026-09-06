import { Magnetic } from "@/components/ui/Magnetic";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpLeft,
  ArrowUpRight,
  Box,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getDict, type Locale } from "@/i18n";
import type { SiteSettings } from "@/lib/types";

export function Hero({
  settings,
  locale,
}: {
  settings: SiteSettings;
  locale: Locale;
}) {
  const t = getDict(locale);
  const Arrow = locale !== "en" ? ArrowUpLeft : ArrowUpRight;
  const pillars =
    locale === "ar"
      ? [
          { title: "المنتج", text: "أفكار تتحول إلى قيمة.", icon: Box },
          { title: "الفريق", text: "شراكة تصنع الفرق.", icon: Users },
          { title: "الإمكانات", text: "نبني ما هو قادم.", icon: Zap },
        ]
      : locale === "ckb"
        ? [
            { title: "بەرهەم", text: "بیرۆکەی بەبەها.", icon: Box },
            { title: "تیم", text: "هاوبەشییەکی کاریگەر.", icon: Users },
            { title: "دەرفەتەکان", text: "داهاتوو دروست دەکەین.", icon: Zap },
          ]
        : [
            { title: "Product", text: "Ideas with real purpose.", icon: Box },
            { title: "People", text: "A team that cares.", icon: Users },
            {
              title: "Possibilities",
              text: "Built for what's next.",
              icon: Zap,
            },
          ];
  const brandTitle =
    settings.heroTitle === "من الأفكار إلى المنتجات." ||
    settings.heroTitle === "Ideas to Products." ||
    settings.heroTitle === "لە بیرۆکەوە بۆ بەرهەم.";
  return (
    <section className="relative overflow-hidden bg-[#0A0A0B] pt-28 md:pt-32">
      <div className="container-x">
        <div className="grid items-center gap-2 lg:min-h-[620px] lg:grid-cols-[1.08fr_1fr] lg:gap-6">
          <div className="hero-copy-enter relative z-10 pt-10 pb-6 lg:pb-14">
            <p className="mb-8 inline-flex items-center gap-2.5 text-sm text-[#BDC3D0]">
              <span className="size-1.5 rounded-full bg-success" />
              {t.hero.tagline}
            </p>
            <h1 className="hero-title max-w-2xl">
              {brandTitle ? (
                <>
                  {locale === "ar" ? (
                    <>
                      من الأفكار
                      <br />
                      إلى المنتجات.
                    </>
                  ) : locale === "ckb" ? (
                    <>
                      لە بیرۆکەوە
                      <br />
                      بۆ بەرهەم.
                    </>
                  ) : (
                    <>
                      Ideas to
                      <br />
                      Products.
                    </>
                  )}
                </>
              ) : (
                settings.heroTitle
              )}
              <span className="block text-[#8183FF]">
                {locale === "ar"
                  ? "معاً."
                  : locale === "ckb"
                    ? "پێکەوە."
                    : "Together."}
              </span>
            </h1>
            <p className="mt-7 max-w-[31rem] text-base leading-[1.85] text-muted md:text-lg">
              {settings.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic
                strength={0.16}
                className="min-w-[150px] flex-1 sm:flex-none"
              >
                <Button
                  href={`/${locale}/#contact`}
                  size="lg"
                  className="w-full px-4 text-sm sm:px-8 sm:text-base"
                >
                  {t.hero.primary}
                  <Arrow className="size-4" />
                </Button>
              </Magnetic>
              <Button
                href={`/${locale}/projects`}
                size="lg"
                variant="secondary"
                className="min-w-[150px] flex-1 px-4 text-sm sm:flex-none sm:px-8 sm:text-base"
              >
                {t.hero.secondary}
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted">
              {locale === "ar"
                ? "من وضوح الفكرة إلى إطلاق منتجك. فريق واحد."
                : locale === "ckb"
                  ? "لە یەکەم گفتوگۆوە تا بڵاوکردنەوەی بەرهەم. یەک تیم."
                  : "From the first conversation to the final launch. One team."}
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[640px] lg:w-[115%] lg:max-w-none lg:-ms-8">
            <Image
              src="/brand/hero-monolith.webp"
              alt=""
              width={1200}
              height={1200}
              priority
              sizes="(max-width: 1023px) 90vw, 54vw"
              className="hero-art hero-art-enter aspect-square w-full object-contain"
            />
            <div
              className="absolute inset-x-7 bottom-[10%] flex items-end justify-between border-t border-white/15 pt-4 text-[12px] uppercase leading-5 tracking-[0.18em] text-[#CDD2E3]"
              dir="ltr"
            >
              <span>
                Same vision.
                <br />
                Greater impact.
              </span>
              <span>
                Build better
                <br />
                together.
              </span>
            </div>
          </div>
        </div>
        <div className="relative grid border-t border-white/15 py-7 md:grid-cols-[1fr_1fr_1fr_auto] md:gap-6 md:py-8">
          {pillars.map(({ title, text, icon: Icon }) => (
            <div key={title} className="flex items-center gap-4 py-3 md:py-0">
              <Icon
                className="size-5 shrink-0 text-[#A5A7FA]"
                strokeWidth={1.5}
              />
              <div>
                <h2 className="text-sm font-bold">{title}</h2>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </div>
            </div>
          ))}
          <a
            href="#services"
            className="hidden items-center gap-3 text-xs text-muted transition-colors hover:text-white md:flex"
          >
            {t.hero.scroll}
            <ArrowDown className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
