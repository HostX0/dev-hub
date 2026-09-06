import type { SiteSettings } from "./types";

export const BRAND_COPY = {
  siteName: "DevsHub.cc",
  siteNameAr: "ديفز هب",
  heroTitle: "من الأفكار إلى المنتجات.",
  heroTitleEn: "Ideas to Products.",
  heroSubtitle:
    "شريكك البرمجي الذي يجمع التفكير بالمنتج، ووضوح التصميم، ودقة التنفيذ في مكان واحد. نبني معك ما هو قادم.",
  heroSubtitleEn:
    "A software partner that brings product thinking, design clarity, and engineering execution together in one place.",
  bio: "في DevsHub.cc، نؤمن أن المنتجات المميزة تبدأ بفهم الناس وما يحتاجونه. نجمع استراتيجية المنتج، وتصميم تجربة المستخدم، والهندسة البرمجية في فريق واحد. من بغداد إلى كل مكان، نعمل معك بشفافية لنحوّل رؤيتك إلى منتج واضح، مفيد، وقابل للنمو.",
  bioEn:
    "Great products start with understanding people. At DevsHub.cc, we bring product strategy, user experience design, and software engineering into one team. From Baghdad to wherever you are, we work closely with you to turn your vision into useful, thoughtful software that can grow.",
};

const LEGACY_COPY: Partial<Record<keyof typeof BRAND_COPY, string[]>> = {
  siteName: ["Dev Hub"],
  siteNameAr: ["مركز التطوير"],
  heroTitle: [
    "نبني برمجيات وذكاءً اصطناعياً وأتمتة تُسرّع نمو أعمالك",
    "نبني برمجيات وذكاءً اصطناعياً وأتمتة تُحرّك أعمالك",
  ],
  heroTitleEn: [
    "We build software, AI and automation that accelerate your business",
    "We build software, AI and automation that move your business",
  ],
  heroSubtitle: [
    "شركة تقنية عراقية متخصصة في تطوير المنصات الرقمية، حلول الذكاء الاصطناعي، والأتمتة المتقدمة. نخدم الشركات في العراق والمنطقة، ونحوّل أفكاركم إلى منتجات حقيقية تعمل بكفاءة، تُطلق بسرعة، وتنمو مع أعمالكم.",
  ],
  heroSubtitleEn: [
    "An Iraqi software company specialising in digital platforms, applied AI and advanced automation. We serve companies across Iraq and the region, turning ideas into reliable products that ship fast and scale with your business.",
  ],
  bio: [
    "مركز التطوير (Dev Hub) شريككم التقني من الفكرة إلى الإطلاق. من بغداد، نخدم الشركات والمؤسسات في مختلف محافظات العراق والمنطقة. يضم فريقنا الداخلي مهندسي برمجيات ومصممين وخبراء ذكاء اصطناعي يعملون معاً على بناء منصات ويب وتطبيقات جوال وأنظمة مؤسسية قابلة للتوسع. نضع الذكاء الاصطناعي والأتمتة في صميم كل ما نبنيه، لنساعد عملاءنا على خفض التكاليف، تسريع العمليات، واتخاذ قرارات أفضل مبنية على البيانات.",
  ],
  bioEn: [
    "Dev Hub is your technology partner from idea to launch. Based in Baghdad, we serve companies and institutions across Iraq and the wider region. Our in-house team of software engineers, designers and AI specialists builds web platforms, mobile apps and enterprise systems designed to scale. We put AI and automation at the heart of everything we build, helping our clients cut costs, speed up operations and make better, data-driven decisions.",
  ],
};

/** Rebrand only known seed copy. Never replace client-authored content or contact data. */
export function applyBrandDefaults(settings: SiteSettings): SiteSettings {
  const result = { ...settings };
  for (const key of Object.keys(BRAND_COPY) as (keyof typeof BRAND_COPY)[]) {
    if (key.endsWith("En") && !settings[key]?.trim()) {
      const source = key.slice(0, -2) as keyof typeof BRAND_COPY;
      const original = settings[source];
      if (
        original?.trim() &&
        original !== BRAND_COPY[source] &&
        !LEGACY_COPY[source]?.includes(original)
      )
        continue;
    }
    if (!result[key]?.trim() || LEGACY_COPY[key]?.includes(result[key]))
      result[key] = BRAND_COPY[key];
  }
  return result;
}
