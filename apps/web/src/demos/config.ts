/**
 * Registry of the live template sites showcased under /demos/<site>/<lang>.
 * Kept free of React/Next imports because the proxy (edge-safe routing) reads it.
 */
export const DEMO_LANGS = ["ar", "en"] as const;
export type DemoLang = (typeof DEMO_LANGS)[number];

export const DEMO_SLUGS = [
  "company",
  "lawyer",
  "photographer",
  "restaurant",
  "clinic",
  "realestate",
] as const;
export type DemoSlug = (typeof DEMO_SLUGS)[number];

export const isDemoLang = (v: unknown): v is DemoLang =>
  typeof v === "string" && (DEMO_LANGS as readonly string[]).includes(v);
export const isDemoSlug = (v: unknown): v is DemoSlug =>
  typeof v === "string" && (DEMO_SLUGS as readonly string[]).includes(v);

export const demoDir = (lang: DemoLang): "rtl" | "ltr" =>
  lang === "ar" ? "rtl" : "ltr";

/** Demo sites are Arabic/English only; Kurdish visitors of the main site land on Arabic. */
export const demoLangFromLocale = (locale: string): DemoLang =>
  locale === "en" ? "en" : "ar";

export const demoHref = (slug: DemoSlug, lang: DemoLang, hash = "") =>
  `/demos/${slug}/${lang}${hash}`;

export const demoCover = (slug: DemoSlug, locale: string) =>
  `/demos/covers/${slug}-${demoLangFromLocale(locale)}.jpg`;

type Tri<T = string> = { ar: T; en: T; ckb: T };

export type DemoSite = {
  slug: DemoSlug;
  /** Fictional brand used inside the demo. */
  name: Tri;
  /** What kind of business the template targets — shown on gallery cards. */
  kind: Tri;
  tagline: Tri;
  features: Tri<string[]>;
  /** Accent swatch used by the gallery so each card hints at the demo's palette. */
  accent: string;
  palette: [string, string, string];
};

export const DEMO_SITES: readonly DemoSite[] = [
  {
    slug: "company",
    name: { ar: "مجموعة رافد", en: "Rafid Group", ckb: "گرووپی ڕافید" },
    kind: { ar: "موقع شركة", en: "Corporate website", ckb: "ماڵپەڕی کۆمپانیا" },
    tagline: {
      ar: "هوية مؤسسية واثقة لشركات المقاولات والتوريد والاستشارات: خدمات، مشاريع، أرقام، وفريق.",
      en: "A confident corporate presence for contracting, supply and consulting firms: services, projects, numbers and team.",
      ckb: "ناسنامەیەکی دامەزراوەیی بۆ کۆمپانیاکانی بەڵێندەری و دابینکردن و ڕاوێژکاری: خزمەتگوزاری، پڕۆژە، ژمارە و تیم.",
    },
    features: {
      ar: ["خدمات ومشاريع", "أرقام متحركة", "فريق وعملاء", "نموذج عرض سعر"],
      en: ["Services & projects", "Animated stats", "Team & clients", "Quote form"],
      ckb: ["خزمەتگوزاری و پڕۆژە", "ژمارەی جوڵاو", "تیم و کڕیار", "فۆڕمی نرخ"],
    },
    accent: "#F59E0B",
    palette: ["#10233F", "#F59E0B", "#F7F6F2"],
  },
  {
    slug: "lawyer",
    name: {
      ar: "مكتب حيدر السعدي للمحاماة",
      en: "Al-Saadi Law Office",
      ckb: "نووسینگەی پارێزەری سەعدی",
    },
    kind: { ar: "موقع محامي", en: "Law office website", ckb: "ماڵپەڕی پارێزەر" },
    tagline: {
      ar: "طابع كلاسيكي فاخر بالكحلي والذهبي: مجالات الممارسة، السيرة، النتائج، وحجز استشارة.",
      en: "Classic navy-and-gold authority: practice areas, profile, case results and consultation booking.",
      ckb: "شێوازی کلاسیکی شین و زێڕین: بوارەکانی کار، ژیاننامە، ئەنجامەکان و نۆرەی ڕاوێژ.",
    },
    features: {
      ar: ["مجالات الممارسة", "نتائج القضايا", "أسئلة شائعة", "حجز استشارة"],
      en: ["Practice areas", "Case results", "FAQ", "Consultation booking"],
      ckb: ["بوارەکانی کار", "ئەنجامی دۆسیەکان", "پرسیارە باوەکان", "نۆرەی ڕاوێژ"],
    },
    accent: "#C8A24A",
    palette: ["#0B1220", "#C8A24A", "#F5F1E8"],
  },
  {
    slug: "photographer",
    name: { ar: "سارة كامل", en: "Sara Kamel", ckb: "سارا کامل" },
    kind: { ar: "موقع مصوّر", en: "Photographer portfolio", ckb: "پۆرتفۆلیۆی وێنەگر" },
    tagline: {
      ar: "بورتفوليو تحريري أبيض بخطوط ضخمة: معرض بفلاتر ولايت بوكس، باقات، وحجز جلسة.",
      en: "Editorial white portfolio with oversized type: filterable gallery with lightbox, packages and session booking.",
      ckb: "پۆرتفۆلیۆی سپی و ئەدیتۆریاڵ: گەلەری بە فلتەر و لایتبۆکس، پاکێج و نۆرەی وێنەگرتن.",
    },
    features: {
      ar: ["معرض بفلاتر", "لايت بوكس", "باقات تصوير", "حجز جلسة"],
      en: ["Filterable gallery", "Lightbox", "Packages", "Session booking"],
      ckb: ["گەلەری بە فلتەر", "لایتبۆکس", "پاکێجەکان", "نۆرەی وێنەگرتن"],
    },
    accent: "#111111",
    palette: ["#FFFFFF", "#111111", "#C0392B"],
  },
  {
    slug: "restaurant",
    name: { ar: "بيت الريف", en: "Bayt Al-Reef", ckb: "بەیت ئەلڕیف" },
    kind: { ar: "موقع مطعم", en: "Restaurant website", ckb: "ماڵپەڕی چێشتخانە" },
    tagline: {
      ar: "أجواء دافئة بالكريمي والطيني: قائمة طعام بتبويبات، الشيف، المعرض، وحجز طاولة.",
      en: "Warm cream-and-terracotta atmosphere: tabbed menu, chef story, gallery and table reservation.",
      ckb: "کەشێکی گەرم: مینیوی تاب‌دار، شێف، گەلەری و نۆرەی مێز.",
    },
    features: {
      ar: ["قائمة بتبويبات", "قصة الشيف", "معرض صور", "حجز طاولة"],
      en: ["Tabbed menu", "Chef story", "Gallery", "Table reservation"],
      ckb: ["مینیوی تاب‌دار", "چیرۆکی شێف", "گەلەری", "نۆرەی مێز"],
    },
    accent: "#B4532A",
    palette: ["#FBF3E4", "#B4532A", "#3F5A36"],
  },
  {
    slug: "clinic",
    name: { ar: "عيادة النخبة لطب الأسنان", en: "Elite Dental Clinic", ckb: "کلینیکی ددانی ئیلیت" },
    kind: { ar: "موقع عيادة", en: "Clinic website", ckb: "ماڵپەڕی کلینیک" },
    tagline: {
      ar: "طابع طبي مريح بالسماوي والفيروزي: الخدمات، الأطباء، حجز موعد فوري، التأمين، وساعات العمل.",
      en: "Calm sky-blue and teal medical look: services, doctors, instant appointment booking, insurance and hours.",
      ckb: "شێوازی پزیشکی ئارام بە شین و تورکوازی: خزمەتگوزاری، پزیشکەکان، نۆرەی خێرا، بیمە و کاتەکانی کار.",
    },
    features: {
      ar: ["حجز موعد", "الأطباء", "الخدمات والأسعار", "أسئلة شائعة"],
      en: ["Appointment booking", "Doctors", "Services & prices", "FAQ"],
      ckb: ["نۆرەگرتن", "پزیشکەکان", "خزمەتگوزاری و نرخ", "پرسیارە باوەکان"],
    },
    accent: "#0E7490",
    palette: ["#F0F9FF", "#0E7490", "#14B8A6"],
  },
  {
    slug: "realestate",
    name: { ar: "دار العقارية", en: "Dar Realty", ckb: "دار بۆ خانووبەرە" },
    kind: { ar: "موقع عقارات", en: "Real-estate agency", ckb: "ماڵپەڕی خانووبەرە" },
    tagline: {
      ar: "أسود جريء بلمسة ليمونية: بحث عن العقارات، قوائم مميزة بالأسعار، الوكلاء، وطلب تقييم مجاني.",
      en: "Bold black with a lime accent: property search, featured listings with prices, agents and a free valuation request.",
      ckb: "ڕەشی بوێر بە لیمۆیی: گەڕان بۆ خانووبەرە، لیستی تایبەت بە نرخ، بریکارەکان و داواکاری هەڵسەنگاندنی بەخۆڕایی.",
    },
    features: {
      ar: ["بحث عن عقار", "قوائم مميزة", "الوكلاء", "طلب تقييم"],
      en: ["Property search", "Featured listings", "Agents", "Valuation request"],
      ckb: ["گەڕان بۆ خانووبەرە", "لیستی تایبەت", "بریکارەکان", "داوای هەڵسەنگاندن"],
    },
    accent: "#C8F542",
    palette: ["#141414", "#C8F542", "#F3F4F1"],
  },
];

export const getDemoSite = (slug: DemoSlug) =>
  DEMO_SITES.find((s) => s.slug === slug)!;
