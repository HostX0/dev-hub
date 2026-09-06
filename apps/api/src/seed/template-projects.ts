import type { projects } from '../db/schema.js';

type ProjectInsert = typeof projects.$inferInsert;

/**
 * The live template sites shipped with the web app (apps/web/src/demos) exposed as
 * portfolio projects, so they appear in "Our work" on the home page with a working
 * "Live preview" link. URLs are site-relative: the web app localises `/demos/<slug>/ar`
 * and the cover to the visitor's language.
 */
type Template = {
  slug: string;
  title: string;
  titleEn: string;
  titleCkb: string;
  tagline: string;
  taglineEn: string;
  taglineCkb: string;
  description: string;
  descriptionEn: string;
  descriptionCkb: string;
  client: string;
  clientCkb: string;
  tags: string[];
};

const TEMPLATES: Template[] = [
  {
    slug: 'template-company',
    title: 'مجموعة رافد — موقع شركة مقاولات وتوريد',
    titleEn: 'Rafid Group — Corporate Website',
    titleCkb: 'گرووپی ڕافید — ماڵپەڕی کۆمپانیا',
    tagline: 'قالب مؤسسي واثق بالكحلي والعنبري: خدمات، مشاريع، أرقام متحركة، وطلب عرض سعر',
    taglineEn: 'Confident navy-and-amber corporate template: services, projects, animated stats and a quote form',
    taglineCkb: 'تێمپلەیتی دامەزراوەیی بە شین و کاریب: خزمەتگوزاری، پڕۆژە، ژمارەی جوڵاو و فۆڕمی نرخ',
    description:
      'قالب موقع شركة جاهز بلغتين (عربي/إنجليزي) لشركات المقاولات والتوريد والاستشارات. يضم صفحة رئيسية بأرقام متحركة وشريط عملاء، ستة أقسام خدمات، مشاريع مختارة بقيمة العقد، مسار العمل بأربع خطوات، الفريق، آراء العملاء، ونموذج طلب عرض سعر مع بيانات المكاتب. مبني بـ Next.js و Tailwind CSS ويعمل بالكامل من دون قاعدة بيانات، ويمكن تخصيص الألوان والخطوط والمحتوى خلال أيام.',
    descriptionEn:
      'A ready bilingual (Arabic/English) corporate template for contracting, supply and consulting firms. It includes a hero with animated statistics and a client strip, six service cards, selected projects with contract values, a four-step process, leadership team, testimonials and a quote-request form with office details. Built with Next.js and Tailwind CSS, fully static, and customisable in colours, fonts and content within days.',
    descriptionCkb:
      'تێمپلەیتێکی ئامادەی دوو زمانی (عەرەبی/ئینگلیزی) بۆ کۆمپانیاکانی بەڵێندەری و دابینکردن و ڕاوێژکاری. هیرۆ بە ژمارەی جوڵاو و شریتی کڕیاران، شەش کارتی خزمەتگوزاری، پڕۆژەی هەڵبژێردراو، پرۆسەی چوار هەنگاوی، تیم، ڕای کڕیاران و فۆڕمی داواکردنی نرخ لەخۆدەگرێت. بە Next.js و Tailwind CSS دروستکراوە و بە تەواوی ستاتیکە.',
    client: 'قالب جاهز — DevsHub.cc',
    clientCkb: 'تێمپلەیتی ئامادە — DevsHub.cc',
    tags: ['Next.js', 'Tailwind CSS', 'Motion', 'i18n', 'RTL', 'Static'],
  },
  {
    slug: 'template-lawyer',
    title: 'مكتب السعدي للمحاماة — موقع محامي',
    titleEn: 'Al-Saadi Law Office — Lawyer Website',
    titleCkb: 'نووسینگەی پارێزەری سەعدی — ماڵپەڕی پارێزەر',
    tagline: 'طابع كلاسيكي فاخر بالكحلي والذهبي: مجالات الممارسة، النتائج، أسئلة شائعة، وحجز استشارة',
    taglineEn: 'Classic navy-and-gold authority: practice areas, case results, FAQ and consultation booking',
    taglineCkb: 'شێوازی کلاسیکی شین و زێڕین: بوارەکانی کار، ئەنجامەکان، پرسیارە باوەکان و نۆرەی ڕاوێژ',
    description:
      'قالب موقع لمكتب محاماة أو محامٍ مستقل بلغتين، بخطوط Amiri و Playfair Display وهوية كحلية بلمسات ذهبية. يشمل بورتريه وشارات الاعتماد، ستة مجالات ممارسة، السيرة والتعليم والقيم، عدادات النتائج، مسار العمل بثلاث خطوات، آراء الموكلين، أكورديون أسئلة شائعة، ونموذج حجز استشارة سرّية مع ساعات الدوام والعنوان.',
    descriptionEn:
      'A bilingual template for a law office or independent attorney, set in Amiri and Playfair Display with a midnight-and-gold identity. It includes a portrait hero with credentials, six practice areas, biography and education, result counters, a three-step process, client testimonials, an FAQ accordion and a confidential consultation form with office hours and address.',
    descriptionCkb:
      'تێمپلەیتێکی دوو زمانی بۆ نووسینگەی پارێزەری یان پارێزەری سەربەخۆ، بە فۆنتی Amiri و Playfair Display و ناسنامەی شینی تاریک و زێڕین. هیرۆی پۆرترەیت، شەش بواری کار، ژیاننامە، ژمێرەری ئەنجامەکان، پرۆسەی سێ هەنگاوی، ڕای موکلان، پرسیارە باوەکان و فۆڕمی نۆرەی ڕاوێژ لەخۆدەگرێت.',
    client: 'قالب جاهز — DevsHub.cc',
    clientCkb: 'تێمپلەیتی ئامادە — DevsHub.cc',
    tags: ['Next.js', 'Tailwind CSS', 'Motion', 'i18n', 'RTL', 'Static'],
  },
  {
    slug: 'template-photographer',
    title: 'سارة كامل — بورتفوليو مصوّرة',
    titleEn: 'Sara Kamel — Photographer Portfolio',
    titleCkb: 'سارا کامل — پۆرتفۆلیۆی وێنەگر',
    tagline: 'بورتفوليو تحريري أبيض بخطوط ضخمة: معرض بفلاتر ولايت بوكس، باقات، وحجز جلسة',
    taglineEn: 'Editorial white portfolio with oversized type: filterable gallery with lightbox, packages and session booking',
    taglineCkb: 'پۆرتفۆلیۆی سپی ئەدیتۆریاڵ: گەلەری بە فلتەر و لایتبۆکس، پاکێج و نۆرەی وێنەگرتن',
    description:
      'قالب بورتفوليو لمصوّر أو مصوّرة بلغتين، بأسلوب تحريري أبيض وخطوط Cormorant و Reem Kufi. يتضمن معرض أعمال بتصفية حسب الفئة (بورتريه، أعراس، طبيعة، مدينة) مع لايت بوكس يدعم لوحة المفاتيح، قسم عني بأرقام متحركة، ثلاث باقات بأسعار واضحة، خطوات الجلسة، آراء العملاء، ونموذج حجز جلسة.',
    descriptionEn:
      'A bilingual portfolio template for a photographer in a white editorial style with Cormorant and Reem Kufi. It features a category-filterable gallery (portrait, wedding, landscape, urban) with a keyboard-accessible lightbox, an about section with animated numbers, three clearly priced packages, session steps, testimonials and a booking form.',
    descriptionCkb:
      'تێمپلەیتی پۆرتفۆلیۆی دوو زمانی بۆ وێنەگر بە شێوازی سپی ئەدیتۆریاڵ و فۆنتی Cormorant و Reem Kufi. گەلەری بە فلتەری پۆل و لایتبۆکس، بەشی دەربارە بە ژمارەی جوڵاو، سێ پاکێج بە نرخی ڕوون، هەنگاوەکانی وێنەگرتن، ڕای کڕیاران و فۆڕمی نۆرە لەخۆدەگرێت.',
    client: 'قالب جاهز — DevsHub.cc',
    clientCkb: 'تێمپلەیتی ئامادە — DevsHub.cc',
    tags: ['Next.js', 'Tailwind CSS', 'Motion', 'Lightbox', 'i18n', 'RTL'],
  },
  {
    slug: 'template-restaurant',
    title: 'بيت الريف — موقع مطعم',
    titleEn: 'Bayt Al-Reef — Restaurant Website',
    titleCkb: 'بەیت ئەلڕیف — ماڵپەڕی چێشتخانە',
    tagline: 'أجواء دافئة بالكريمي والطيني: قائمة طعام بتبويبات، الشيف، المعرض، وحجز طاولة',
    taglineEn: 'Warm cream-and-terracotta atmosphere: tabbed menu, chef story, gallery and table reservation',
    taglineCkb: 'کەشێکی گەرم: مینیوی تاب‌دار، شێف، گەلەری و نۆرەی مێز',
    description:
      'قالب موقع مطعم بلغتين بهوية دافئة (كريمي وطيني وزيتوني) وخطوط Fraunces و Lalezar و Rubik. يضم قسم القصة، قائمة طعام بخمسة تبويبات (مقبلات، أطباق رئيسية، مشاوي، حلويات، مشروبات) مع الأسعار وشارات اختيار الشيف والنباتي والحار، الشيف، معرض صور مع لايت بوكس، تقييمات الضيوف، ونموذج حجز طاولة مع ساعات العمل والعنوان.',
    descriptionEn:
      'A bilingual restaurant template with a warm cream, terracotta and olive identity in Fraunces, Lalezar and Rubik. It includes the story section, a five-tab menu (starters, mains, grill, desserts, drinks) with prices and chef/vegetarian/spicy badges, the chef, a gallery with lightbox, guest reviews and a table reservation form with hours and address.',
    descriptionCkb:
      'تێمپلەیتی چێشتخانەی دوو زمانی بە ناسنامەیەکی گەرم و فۆنتی Fraunces و Lalezar و Rubik. بەشی چیرۆک، مینیوی پێنج تاب بە نرخ و نیشانەکان، شێف، گەلەری بە لایتبۆکس، هەڵسەنگاندنی میوانان و فۆڕمی نۆرەی مێز لەخۆدەگرێت.',
    client: 'قالب جاهز — DevsHub.cc',
    clientCkb: 'تێمپلەیتی ئامادە — DevsHub.cc',
    tags: ['Next.js', 'Tailwind CSS', 'Motion', 'Tabs', 'i18n', 'RTL'],
  },
  {
    slug: 'template-clinic',
    title: 'عيادة النخبة لطب الأسنان — موقع عيادة',
    titleEn: 'Elite Dental Clinic — Clinic Website',
    titleCkb: 'کلینیکی ددانی ئیلیت — ماڵپەڕی کلینیک',
    tagline: 'طابع طبي مريح بالسماوي والفيروزي: الخدمات والأسعار، الأطباء، حجز موعد فوري، وأسئلة شائعة',
    taglineEn: 'Calm sky-blue and teal medical look: services with prices, doctors, instant appointment booking and FAQ',
    taglineCkb: 'شێوازی پزیشکی ئارام: خزمەتگوزاری و نرخ، پزیشکەکان، نۆرەی خێرا و پرسیارە باوەکان',
    description:
      'قالب موقع عيادة أسنان أو مركز طبي بلغتين بخط Cairo وهوية سماوية فيروزية مريحة. يضم نموذج موعد سريع في الواجهة، إحصائيات متحركة، ثمانية خدمات بأسعار ابتدائية، بطاقات الأطباء، لماذا نحن، شريط شركات التأمين، قصص المرضى، أسئلة شائعة، ونموذج حجز موعد كامل مع ساعات العمل والعنوان.',
    descriptionEn:
      'A bilingual template for a dental clinic or medical centre in Cairo with a calm sky-blue and teal identity. It includes a quick appointment form in the hero, animated statistics, eight services with starting prices, doctor cards, why-us points, an insurance partner strip, patient stories, FAQ and a full appointment form with opening hours and address.',
    descriptionCkb:
      'تێمپلەیتێکی دوو زمانی بۆ کلینیکی ددان یان ناوەندی پزیشکی بە فۆنتی Cairo و ناسنامەی شینی ئاسمانی و تورکوازی. فۆڕمی نۆرەی خێرا، ژمارەی جوڵاو، هەشت خزمەتگوزاری بە نرخ، کارتی پزیشکەکان، بۆچی ئێمە، شریتی بیمە، چیرۆکی نەخۆشان، پرسیارە باوەکان و فۆڕمی نۆرەی تەواو لەخۆدەگرێت.',
    client: 'قالب جاهز — DevsHub.cc',
    clientCkb: 'تێمپلەیتی ئامادە — DevsHub.cc',
    tags: ['Next.js', 'Tailwind CSS', 'Motion', 'Booking', 'i18n', 'RTL'],
  },
  {
    slug: 'template-realestate',
    title: 'دار العقارية — موقع عقارات',
    titleEn: 'Dar Realty — Real-Estate Website',
    titleCkb: 'دار بۆ خانووبەرە — ماڵپەڕی خانووبەرە',
    tagline: 'أسود جريء بلمسة ليمونية: بحث عن العقارات، قوائم مميزة بالأسعار، الوكلاء، وطلب تقييم مجاني',
    taglineEn: 'Bold black with a lime accent: property search, featured listings with prices, agents and a free valuation request',
    taglineCkb: 'ڕەشی بوێر بە لیمۆیی: گەڕان بۆ خانووبەرە، لیستی تایبەت، بریکارەکان و داواکاری هەڵسەنگاندن',
    description:
      'قالب موقع مكتب عقارات بلغتين بهوية سوداء جريئة ولون ليموني مميز وخطوط Manrope و Cairo. يشمل صندوق بحث في الواجهة (النوع، المنطقة، الميزانية)، إحصائيات، ست قوائم عقارية مميزة بالسعر وعدد الغرف والمساحة، دليل الأحياء، لماذا نحن ومسار البيع، بطاقات الوكلاء، آراء العملاء، ونموذج طلب تقييم مجاني.',
    descriptionEn:
      'A bilingual real-estate agency template with a bold black identity, lime accent and Manrope/Cairo type. It includes a hero search box (type, area, budget), statistics, six featured listings with price, bedrooms and area, neighbourhood guides, why-us and the selling process, agent cards, testimonials and a free valuation request form.',
    descriptionCkb:
      'تێمپلەیتی نووسینگەی خانووبەرەی دوو زمانی بە ناسنامەی ڕەشی بوێر و ڕەنگی لیمۆیی و فۆنتی Manrope/Cairo. سندوقی گەڕان، ئامار، شەش لیستی تایبەت بە نرخ و ژووری نوستن و ڕووبەر، ڕێنمایی گەڕەکەکان، بۆچی ئێمە و پرۆسەی فرۆشتن، کارتی بریکارەکان، ڕای کڕیاران و فۆڕمی داواکاری هەڵسەنگاندن لەخۆدەگرێت.',
    client: 'قالب جاهز — DevsHub.cc',
    clientCkb: 'تێمپلەیتی ئامادە — DevsHub.cc',
    tags: ['Next.js', 'Tailwind CSS', 'Motion', 'Listings', 'i18n', 'RTL'],
  },
];

export const TEMPLATE_PROJECTS: ProjectInsert[] = TEMPLATES.map((t, i) => {
  const demo = t.slug.replace(/^template-/, '');
  return {
    ...t,
    category: 'website',
    liveUrl: `/demos/${demo}/ar`,
    repoUrl: '',
    coverImage: `/demos/covers/${demo}-ar.jpg`,
    gallery: [`/demos/covers/${demo}-ar.jpg`, `/demos/covers/${demo}-en.jpg`],
    featured: true,
    published: true,
    year: 2026,
    // Templates lead "Our work" so the live previews are the first thing visitors see.
    sortOrder: -10 + i,
  };
});

export const TEMPLATE_SLUGS = TEMPLATES.map((t) => t.slug);
