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
  "clinic-nawa",
  "realestate-sukn",
  "gym",
  "appliances",
  "phones",
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
      en: [
        "Services & projects",
        "Animated stats",
        "Team & clients",
        "Quote form",
      ],
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
    kind: {
      ar: "موقع محامي",
      en: "Law office website",
      ckb: "ماڵپەڕی پارێزەر",
    },
    tagline: {
      ar: "طابع كلاسيكي فاخر بالكحلي والذهبي: مجالات الممارسة، السيرة، النتائج، وحجز استشارة.",
      en: "Classic navy-and-gold authority: practice areas, profile, case results and consultation booking.",
      ckb: "شێوازی کلاسیکی شین و زێڕین: بوارەکانی کار، ژیاننامە، ئەنجامەکان و نۆرەی ڕاوێژ.",
    },
    features: {
      ar: ["مجالات الممارسة", "نتائج القضايا", "أسئلة شائعة", "حجز استشارة"],
      en: ["Practice areas", "Case results", "FAQ", "Consultation booking"],
      ckb: [
        "بوارەکانی کار",
        "ئەنجامی دۆسیەکان",
        "پرسیارە باوەکان",
        "نۆرەی ڕاوێژ",
      ],
    },
    accent: "#C8A24A",
    palette: ["#0B1220", "#C8A24A", "#F5F1E8"],
  },
  {
    slug: "photographer",
    name: { ar: "سارة كامل", en: "Sara Kamel", ckb: "سارا کامل" },
    kind: {
      ar: "موقع مصوّر",
      en: "Photographer portfolio",
      ckb: "پۆرتفۆلیۆی وێنەگر",
    },
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
    kind: {
      ar: "موقع مطعم",
      en: "Restaurant website",
      ckb: "ماڵپەڕی چێشتخانە",
    },
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
    slug: "clinic-nawa",
    name: {
      ar: "عيادة نواة",
      en: "Nawa Clinic",
      ckb: "کلینیکی ناوا",
    },
    kind: {
      ar: "موقع عيادة",
      en: "Clinic website",
      ckb: "ماڵپەڕی کلینیک",
    },
    tagline: {
      ar: "هوية هادئة بالأبيض الدافئ والأخضر المزرق: مجالات الرعاية، الفريق، رحلة الزيارة، وتجربة طلب موعد.",
      en: "A calm, considered clinic identity: areas of care, team profiles, a first-visit guide, and a demo appointment request.",
      ckb: "ناسنامەیەکی ئارام بۆ کلینیک: خزمەتگوزاری، پزیشکان و داواکردنی نۆرە.",
    },
    features: {
      ar: ["مجالات الرعاية", "الفريق الطبي", "طلب موعد تجريبي", "أسئلة شائعة"],
      en: ["Areas of care", "Care team", "Demo booking", "Patient FAQ"],
      ckb: [
        "خزمەتگوزارییەکان",
        "تیمی پزیشکی",
        "داواکردنی نۆرە",
        "پرسیارە باوەکان",
      ],
    },
    accent: "#19756B",
    palette: ["#F7F9F5", "#19756B", "#153F3C"],
  },
  {
    slug: "realestate-sukn",
    name: {
      ar: "سُكن",
      en: "SUKN",
      ckb: "سوکن",
    },
    kind: {
      ar: "موقع عقارات",
      en: "Real estate website",
      ckb: "ماڵپەڕی خانووبەرە",
    },
    tagline: {
      ar: "عرض عقاري تحريري بالأخضر العميق والكريمي: بحث وفلاتر، تفاصيل المساكن، الأحياء، وطلب معاينة.",
      en: "An editorial property collection in forest green and cream: searchable homes, detailed listings, neighborhoods, and demo viewing requests.",
      ckb: "خانووبەرەکان بە وردەکاری و پاڵاوتن ببینە و داوای سەردان بکە.",
    },
    features: {
      ar: ["بحث في العقارات", "فلاتر النتائج", "تفاصيل المسكن", "طلب معاينة"],
      en: [
        "Property search",
        "Live filters",
        "Residence details",
        "Viewing requests",
      ],
      ckb: [
        "گەڕانی خانووبەرە",
        "پاڵاوتنی ئەنجامەکان",
        "وردەکاریی موڵک",
        "داواکردنی سەردان",
      ],
    },
    accent: "#8A6846",
    palette: ["#F5F2EA", "#173D32", "#8A6846"],
  },
  {
    slug: "gym",
    name: {
      ar: "نبض",
      en: "PULSE",
      ckb: "نەبز",
    },
    kind: {
      ar: "موقع نادٍ رياضي",
      en: "Gym website",
      ckb: "ماڵپەڕی هۆڵی وەرزش",
    },
    tagline: {
      ar: "حضور رياضي قوي بالأخضر الداكن والليموني: مساحات التدريب، جدول حصص تفاعلي، عضويات، وتجربة التسجيل.",
      en: "A bold training club in dark green and electric lime: training spaces, a filterable timetable, memberships, and a demo signup.",
      ckb: "دیزاینێکی بەهێز بۆ هۆڵی وەرزش: خشتەی ڕاهێنان، پلانی ئەندامێتی و فۆڕمی تۆمارکردن.",
    },
    features: {
      ar: ["جدول التدريب", "فلاتر الحصص", "خطط العضوية", "تسجيل تجريبي"],
      en: [
        "Training timetable",
        "Class filters",
        "Membership plans",
        "Demo signup",
      ],
      ckb: [
        "خشتەی ڕاهێنان",
        "پاڵاوتنی وانەکان",
        "پلانی ئەندامێتی",
        "تۆمارکردنی نموونەیی",
      ],
    },
    accent: "#CBF36F",
    palette: ["#101715", "#CBF36F", "#F1F3EA"],
  },
  {
    slug: "appliances",
    name: {
      ar: "متين",
      en: "MATIN",
      ckb: "مەتین",
    },
    kind: {
      ar: "موقع أجهزة منزلية",
      en: "Home appliance website",
      ckb: "ماڵپەڕی ئامێری ناوماڵ",
    },
    tagline: {
      ar: "كتالوج أنيق للأجهزة المنزلية بهوية كريمية وخضراء: تصنيفات واضحة، تفاصيل المنتجات، وطلب المعلومات.",
      en: "A considered home appliance catalog in cream and forest green: clear categories, product details, and a demo inquiry flow.",
      ckb: "کاتەلۆگێکی ڕوون بۆ ئامێرەکانی ناوماڵ، بە وردەکاریی بەرهەم و داواکردنی زانیاری.",
    },
    features: {
      ar: [
        "كتالوج المنتجات",
        "فلاتر التصنيفات",
        "تفاصيل الأجهزة",
        "طلب المعلومات",
      ],
      en: [
        "Product catalog",
        "Category filters",
        "Appliance details",
        "Product inquiries",
      ],
      ckb: [
        "کاتەلۆگی بەرهەم",
        "پاڵاوتن بەپێی پۆل",
        "وردەکاریی ئامێر",
        "داواکردنی زانیاری",
      ],
    },
    accent: "#224D3D",
    palette: ["#F5F3EC", "#224D3D", "#E8EBDD"],
  },
  {
    slug: "phones",
    name: {
      ar: "كونكت",
      en: "CONNECT",
      ckb: "کۆنێکت",
    },
    kind: {
      ar: "موقع هواتف وإكسسوارات",
      en: "Phones & accessories website",
      ckb: "ماڵپەڕی مۆبایل و پێداویستی",
    },
    tagline: {
      ar: "واجهة تقنية واضحة بالأبيض والبنفسجي: هواتف وإكسسوارات، فلاتر منتجات، تفاصيل، وسلة تجريبية.",
      en: "A clear, contemporary phone and accessory store in white and violet: product filters, detailed specifications, and a demo basket.",
      ckb: "مۆبایل و پێداویستییەکان ببینە، وردەکارییەکان بپشکنە و هەڵبژاردنەکانت ڕێک بخە.",
    },
    features: {
      ar: [
        "هواتف وإكسسوارات",
        "فلاتر المنتجات",
        "تفاصيل المنتجات",
        "سلة تجريبية",
      ],
      en: [
        "Phones & accessories",
        "Product filters",
        "Product details",
        "Demo basket",
      ],
      ckb: [
        "مۆبایل و پێداویستی",
        "پاڵاوتنی بەرهەمەکان",
        "وردەکاریی بەرهەم",
        "سەبەتەی نموونەیی",
      ],
    },
    accent: "#6550C7",
    palette: ["#F4F3F7", "#6550C7", "#181821"],
  },
];

export const getDemoSite = (slug: DemoSlug) =>
  DEMO_SITES.find((s) => s.slug === slug)!;
