import type { Locale } from "./config";

const en = {
  nav: "Templates",
  eyebrow: "Live templates",
  title: "Ready-made designs. ",
  accent: "Live, in two languages.",
  description:
    "Four complete websites you can open right now — each with its own identity, Arabic and English versions, and every section a real business needs. Pick one and we adapt it to your brand.",
  homeTitle: "See a site before you order it.",
  homeText:
    "Browse live demo sites for a company, a law office, a photographer and a restaurant. Every one is bilingual and built to be customised.",
  viewAll: "Browse all templates",
  preview: "Live preview",
  previewAr: "Arabic",
  previewEn: "English",
  request: "Request this design",
  includes: "Includes",
  metaTitle: "Live templates",
  metaDescription:
    "Browse live bilingual website templates by DevsHub.cc: corporate, law office, photographer portfolio and restaurant — each with its own design.",
  howTitle: "How it works",
  how: [
    { title: "Pick a template", text: "Open the demos and choose the closest fit for your business." },
    { title: "We adapt it", text: "Your logo, colours, photos and content — in Arabic, English or both." },
    { title: "Launch", text: "Hosting, domain and a dashboard to edit your content later." },
  ],
  ctaTitle: "Want one of these for your business?",
  ctaText: "Send us the template name and we'll reply with a plan and a quote within 24 hours.",
  cta: "Start a project",
  breadcrumbHome: "Home",
  note: "Demo content is fictional; names, prices and results are illustrative only.",
};

type DemosDict = { [K in keyof typeof en]: (typeof en)[K] };

const ar: DemosDict = {
  nav: "القوالب",
  eyebrow: "قوالب جاهزة",
  title: "تصاميم جاهزة. ",
  accent: "مباشرة، وبلغتين.",
  description:
    "أربعة مواقع كاملة يمكنك فتحها الآن — لكلٍّ منها هويته الخاصة ونسخة عربية وإنجليزية وكل الأقسام التي يحتاجها نشاطك. اختر واحداً ونكيّفه على علامتك.",
  homeTitle: "شاهد موقعك قبل أن تطلبه.",
  homeText:
    "استعرض مواقع تجريبية مباشرة لشركة ومكتب محاماة ومصوّر ومطعم. كلها ثنائية اللغة ومبنية لتُخصَّص لك.",
  viewAll: "استعرض كل القوالب",
  preview: "معاينة مباشرة",
  previewAr: "عربي",
  previewEn: "إنجليزي",
  request: "اطلب هذا التصميم",
  includes: "يتضمن",
  metaTitle: "قوالب مباشرة",
  metaDescription:
    "استعرض قوالب مواقع مباشرة ثنائية اللغة من DevsHub.cc: شركة، مكتب محاماة، بورتفوليو مصوّر، ومطعم — لكلٍّ تصميمه الخاص.",
  howTitle: "كيف يتم الأمر",
  how: [
    { title: "اختر القالب", text: "افتح النماذج واختر الأقرب لنشاطك." },
    { title: "نكيّفه لك", text: "شعارك وألوانك وصورك ومحتواك — بالعربية أو الإنجليزية أو كلتيهما." },
    { title: "الإطلاق", text: "استضافة ونطاق ولوحة تحكم لتعديل محتواك لاحقاً." },
  ],
  ctaTitle: "تريد واحداً من هذه لنشاطك؟",
  ctaText: "أرسل لنا اسم القالب ونرد عليك بخطة وعرض سعر خلال 24 ساعة.",
  cta: "ابدأ مشروعك",
  breadcrumbHome: "الرئيسية",
  note: "محتوى النماذج خيالي؛ الأسماء والأسعار والنتائج للتوضيح فقط.",
};

const ckb: DemosDict = {
  nav: "تێمپلەیتەکان",
  eyebrow: "تێمپلەیتی ئامادە",
  title: "دیزاینی ئامادە. ",
  accent: "زیندوو، بە دوو زمان.",
  description:
    "چوار ماڵپەڕی تەواو کە ئێستا دەتوانیت بیانکەیتەوە — هەریەکە ناسنامەی خۆی هەیە و وەشانی عەرەبی و ئینگلیزی و هەموو ئەو بەشانەی کە کارەکەت پێویستی پێیەتی. یەکێک هەڵبژێرە و بۆ براندەکەت دەیگونجێنین.",
  homeTitle: "ماڵپەڕەکەت ببینە پێش ئەوەی داوای بکەیت.",
  homeText:
    "ماڵپەڕە نموونەییەکان ببینە بۆ کۆمپانیا، نووسینگەی پارێزەر، وێنەگر و چێشتخانە. هەموویان دوو زمانین و بۆ تایبەتکردن دروستکراون.",
  viewAll: "هەموو تێمپلەیتەکان ببینە",
  preview: "پێشبینینی زیندوو",
  previewAr: "عەرەبی",
  previewEn: "ئینگلیزی",
  request: "داوای ئەم دیزاینە بکە",
  includes: "لەخۆدەگرێت",
  metaTitle: "تێمپلەیتی زیندوو",
  metaDescription:
    "تێمپلەیتی ماڵپەڕی زیندوو و دوو زمانی لە DevsHub.cc ببینە: کۆمپانیا، نووسینگەی پارێزەر، پۆرتفۆلیۆی وێنەگر و چێشتخانە — هەریەکە بە دیزاینی خۆی.",
  howTitle: "چۆن کار دەکات",
  how: [
    { title: "تێمپلەیت هەڵبژێرە", text: "نموونەکان بکەرەوە و نزیکترینیان بۆ کارەکەت هەڵبژێرە." },
    { title: "بۆت دەیگونجێنین", text: "لۆگۆ و ڕەنگ و وێنە و ناوەڕۆکی خۆت — بە عەرەبی، ئینگلیزی یان هەردووکیان." },
    { title: "بڵاوکردنەوە", text: "هۆستینگ و دۆمەین و داشبۆرد بۆ گۆڕینی ناوەڕۆک دواتر." },
  ],
  ctaTitle: "یەکێک لەمانە دەتەوێت بۆ کارەکەت؟",
  ctaText: "ناوی تێمپلەیتەکەمان بۆ بنێرە و لە ماوەی ٢٤ کاتژمێردا بە پلان و نرخ وەڵامت دەدەینەوە.",
  cta: "پڕۆژەیەک دەست پێ بکە",
  breadcrumbHome: "سەرەکی",
  note: "ناوەڕۆکی نموونەکان خەیاڵییە؛ ناو و نرخ و ئەنجامەکان تەنها بۆ ڕوونکردنەوەن.",
};

export const demosCopy: Record<Locale, DemosDict> = { ar, en, ckb };
