export const BUSINESS_CONTACT = {
  email: "info@devshub.cc",
  phone: "+964 770 854 0899",
  location:
    "بغداد، القادسية، بناية مركز الشام، الطابق الثالث، شقة 6، محافظة بغداد 10011، العراق",
  locationEn:
    "Baghdad, Al Qadisiyah, Sham Center Building, Floor 3, Apartment 6, Baghdad, Baghdad Governorate 10011, IQ",
  locationCkb:
    "بەغدا، قادسیە، بینای ناوەندی شام، نهۆمی سێیەم، شوقەی 6، پارێزگای بەغدا 10011، عێراق",
} as const;
import type { SiteSettings } from "./types";

export const BRAND_COPY = {
  heroTitleCkb: "لە بیرۆکەوە بۆ بەرهەم.",
  heroSubtitleCkb:
    "هاوبەشی نەرمەکاڵای تۆین؛ بیرکردنەوە لە بەرهەم، ڕوونیی دیزاین و وردیی ئەندازیاری لە یەک شوێندا کۆدەکەینەوە. پێکەوە هەنگاوی داهاتوو دروست دەکەین.",
  bioCkb:
    "لە DevsHub.cc باوەڕمان وایە بەرهەمی باش لە تێگەیشتن لە خەڵک و پێداویستییەکانیانەوە دەست پێ دەکات. ستراتیژیی بەرهەم، دیزاینی ئەزموونی بەکارهێنەر و ئەندازیاریی نەرمەکاڵا لە یەک تیمدا کۆدەکەینەوە. لە بەغداوە بۆ هەر شوێنێک کە تۆ لێیت، بە ڕوونی و هاوکاریی نزیک لەگەڵت کار دەکەین، تا بینینەکەت بکەینە بەرهەمێکی ڕوون و بەسوود کە توانای گەشەکردنی هەیە.",
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

type DefaultedField = keyof typeof BRAND_COPY | keyof typeof BUSINESS_CONTACT | "whatsapp";
type LegacyBrandSettings = Omit<SiteSettings, DefaultedField> & Partial<Pick<SiteSettings, DefaultedField>>;

/** Only absent legacy fields and exact old placeholders receive defaults.
 * Empty text is an intentional CMS value and must remain empty. */
export function applyBrandDefaults(settings: LegacyBrandSettings): SiteSettings {
  const result = { ...settings };
  for (const key of Object.keys(BRAND_COPY) as (keyof typeof BRAND_COPY)[]) {
    const value = settings[key];
    if (value !== undefined) {
      if (LEGACY_COPY[key]?.includes(value)) result[key] = BRAND_COPY[key];
      continue;
    }
    if (key.endsWith("En") || key.endsWith("Ckb")) {
      const source = key.replace(/(En|Ckb)$/, "") as keyof typeof BRAND_COPY;
      const original = settings[source];
      if (original !== undefined && original !== BRAND_COPY[source] && !LEGACY_COPY[source]?.includes(original)) {
        result[key] = "";
        continue;
      }
    }
    result[key] = BRAND_COPY[key];
  }
  if (result.email === undefined || result.email === "iosapk.org@gmail.com")
    result.email = BUSINESS_CONTACT.email;
  if (result.phone === undefined || result.phone === "+964 7XX XXX XXXX")
    result.phone = BUSINESS_CONTACT.phone;
  if (result.location === undefined || ["بغداد، العراق", "بغداد - العراق"].includes(result.location))
    result.location = BUSINESS_CONTACT.location;
  if (result.locationEn === undefined)
    result.locationEn = result.location === BUSINESS_CONTACT.location ? BUSINESS_CONTACT.locationEn : "";
  else if (result.location === BUSINESS_CONTACT.location && result.locationEn === "Baghdad, Iraq")
    result.locationEn = BUSINESS_CONTACT.locationEn;
  if (result.locationCkb === undefined)
    result.locationCkb = result.location === BUSINESS_CONTACT.location ? BUSINESS_CONTACT.locationCkb : "";
  if (result.whatsapp === undefined || ["9647XXXXXXXXX", "9665XXXXXXXX"].includes(result.whatsapp))
    result.whatsapp = "";
  return result as SiteSettings;
}
