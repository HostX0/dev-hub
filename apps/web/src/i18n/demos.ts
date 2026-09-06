import type { Locale } from "./config";

const en = {
  imageUnavailable: "Image unavailable",
  nav: "Templates",
  eyebrow: "Live templates",
  title: "Ready-made designs. ",
  accent: "Live, in two languages.",
  description:
    "Explore live demo websites, each with its own identity and Arabic and English versions. Choose a starting point for your brand.",
  homeTitle: "See a site before you order it.",
  homeText:
    "Explore live website designs for different businesses. Each demo has Arabic and English versions and can be customised.",
  viewAll: "Browse all templates",
  preview: "Live preview",
  previewAr: "Arabic",
  previewEn: "English",
  request: "Request this design",
  includes: "Includes",
  metaTitle: "Live templates",
  metaDescription:
    "Explore live Arabic and English website templates by DevsHub.cc for different businesses, each with its own design.",
  howTitle: "How it works",
  how: [
    {
      title: "Pick a template",
      text: "Open the demos and choose the closest fit for your business.",
    },
    {
      title: "We adapt it",
      text: "Your logo, colours, photos and content — in Arabic, English or both.",
    },
    {
      title: "Launch",
      text: "Agree on content, hosting, domain and handover before launch.",
    },
  ],
  ctaTitle: "Want one of these for your business?",
  ctaText:
    "Send us the template name so we can discuss the scope, cost and next steps.",
  cta: "Start a project",
  breadcrumbHome: "Home",
  note: "Demo content is fictional; names, prices and results are illustrative only.",
};

type DemosDict = { [K in keyof typeof en]: (typeof en)[K] };

const ar: DemosDict = {
  imageUnavailable: "الصورة غير متاحة",
  nav: "القوالب",
  eyebrow: "قوالب جاهزة",
  title: "تصاميم جاهزة. ",
  accent: "مباشرة، وبلغتين.",
  description:
    "استعرض مواقع تجريبية مباشرة، لكل منها هويته الخاصة ونسختان بالعربية والإنجليزية. اختر نقطة انطلاق تناسب علامتك.",
  homeTitle: "شاهد موقعك قبل أن تطلبه.",
  homeText:
    "استعرض تصاميم مواقع لأنشطة مختلفة. لكل نموذج نسختان بالعربية والإنجليزية ويمكن تخصيصه لنشاطك.",
  viewAll: "استعرض كل القوالب",
  preview: "معاينة مباشرة",
  previewAr: "عربي",
  previewEn: "إنجليزي",
  request: "اطلب هذا التصميم",
  includes: "يتضمن",
  metaTitle: "قوالب مباشرة",
  metaDescription:
    "استعرض قوالب مواقع مباشرة بالعربية والإنجليزية من DevsHub.cc لأنشطة مختلفة، ولكل منها تصميمه الخاص.",
  howTitle: "كيف يتم الأمر",
  how: [
    { title: "اختر القالب", text: "افتح النماذج واختر الأقرب لنشاطك." },
    {
      title: "نكيّفه لك",
      text: "شعارك وألوانك وصورك ومحتواك — بالعربية أو الإنجليزية أو كلتيهما.",
    },
    {
      title: "الإطلاق",
      text: "نتفق على المحتوى والاستضافة والنطاق وتسليم العمل قبل الإطلاق.",
    },
  ],
  ctaTitle: "تريد واحداً من هذه لنشاطك؟",
  ctaText: "أرسل لنا اسم القالب لنناقش نطاق العمل والتكلفة والخطوات التالية.",
  cta: "ابدأ مشروعك",
  breadcrumbHome: "الرئيسية",
  note: "محتوى النماذج خيالي؛ الأسماء والأسعار والنتائج للتوضيح فقط.",
};

const ckb: DemosDict = {
  nav: "قاڵبەکان",
  eyebrow: "قاڵبی ماڵپەڕ",
  title: "دیزاینی ئامادە. ",
  accent: "بیکەرەوە، بە دوو زمان.",
  description:
    "ماڵپەڕە نموونەییەکان بکەرەوە؛ هەریەکەیان ناسنامەی خۆی و وەشانی عەرەبی و ئینگلیزی هەیە. دەستپێکێک هەڵبژێرە کە لەگەڵ براندەکەت بگونجێت.",
  homeTitle: "پێش داواکردن، ماڵپەڕەکەت ببینە.",
  homeText:
    "دیزاینی ماڵپەڕ بۆ کار و بازرگانیی جۆراوجۆر ببینە. هەر نموونەیەک بە عەرەبی و ئینگلیزی بەردەستە و دەتوانرێت بۆ کارەکەت بگونجێندرێت.",
  viewAll: "هەموو قاڵبەکان ببینە",
  preview: "پێشاندانی ڕاستەوخۆ",
  previewAr: "عەرەبی",
  previewEn: "ئینگلیزی",
  request: "داوای ئەم دیزاینە بکە",
  includes: "ئەمانە لەخۆ دەگرێت",
  metaTitle: "قاڵبی ماڵپەڕی ئامادە",
  metaDescription:
    "قاڵبی ماڵپەڕی عەرەبی و ئینگلیزی لە DevsHub.cc بۆ کار و بازرگانیی جۆراوجۆر ببینە؛ هەریەکەیان دیزاینی خۆی هەیە.",
  howTitle: "چۆن دەست پێ دەکەین",
  how: [
    {
      title: "قاڵبێک هەڵبژێرە",
      text: "نموونەکان بکەرەوە و ئەوە هەڵبژێرە کە زیاتر لەگەڵ کارەکەت دەگونجێت.",
    },
    {
      title: "بۆ تۆی دەگونجێنین",
      text: "لۆگۆ، ڕەنگ، وێنە و ناوەڕۆکی خۆت، بە عەرەبی، ئینگلیزی یان هەردووکیان.",
    },
    {
      title: "بڵاوکردنەوە",
      text: "پێش بڵاوکردنەوە لەسەر ناوەڕۆک، میوانداری، دۆمەین و ڕادەستکردنی کارەکە ڕێک دەکەوین.",
    },
  ],
  ctaTitle: "یەکێک لەم دیزاینانەت بۆ کارەکەت دەوێت؟",
  ctaText:
    "ناوی قاڵبەکەمان بۆ بنێرە تا لەسەر سنووری کار، تێچوو و هەنگاوەکانی دواتر گفتوگۆ بکەین.",
  cta: "پڕۆژەیەک دەست پێ بکە",
  breadcrumbHome: "سەرەکی",
  note: "ناوەڕۆکی نموونەکان خەیاڵییە؛ ناو، نرخ و ئەنجامەکان تەنها بۆ ڕوونکردنەوەن.",
  imageUnavailable: "وێنەکە بەردەست نییە",
};

export const demosCopy: Record<Locale, DemosDict> = { ar, en, ckb };
