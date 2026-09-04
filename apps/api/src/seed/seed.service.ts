import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcryptjs';
import { count, eq } from 'drizzle-orm';
import { DbService } from '../db/db.service.js';
import { projects, services, settings, users } from '../db/schema.js';
import type { SiteSettings } from '../db/schema.js';

const DEMO_SETTINGS: SiteSettings = {
  siteName: 'Dev Hub',
  siteNameAr: 'مركز التطوير',
  heroTitle: 'نبني برمجيات وذكاءً اصطناعياً وأتمتة تُسرّع نمو أعمالك',
  heroTitleEn: 'We build software, AI and automation that accelerate your business',
  heroSubtitle:
    'شركة تقنية عراقية متخصصة في تطوير المنصات الرقمية، حلول الذكاء الاصطناعي، والأتمتة المتقدمة. نخدم الشركات في العراق والمنطقة، ونحوّل أفكاركم إلى منتجات حقيقية تعمل بكفاءة، تُطلق بسرعة، وتنمو مع أعمالكم.',
  heroSubtitleEn:
    'An Iraqi software company specialising in digital platforms, applied AI and advanced automation. We serve companies across Iraq and the region, turning ideas into reliable products that ship fast and scale with your business.',
  bio: 'مركز التطوير (Dev Hub) شريككم التقني من الفكرة إلى الإطلاق. من بغداد، نخدم الشركات والمؤسسات في مختلف محافظات العراق والمنطقة. يضم فريقنا الداخلي مهندسي برمجيات ومصممين وخبراء ذكاء اصطناعي يعملون معاً على بناء منصات ويب وتطبيقات جوال وأنظمة مؤسسية قابلة للتوسع. نضع الذكاء الاصطناعي والأتمتة في صميم كل ما نبنيه، لنساعد عملاءنا على خفض التكاليف، تسريع العمليات، واتخاذ قرارات أفضل مبنية على البيانات.',
  bioEn:
    'Dev Hub is your technology partner from idea to launch. Based in Baghdad, we serve companies and institutions across Iraq and the wider region. Our in-house team of software engineers, designers and AI specialists builds web platforms, mobile apps and enterprise systems designed to scale. We put AI and automation at the heart of everything we build, helping our clients cut costs, speed up operations and make better, data-driven decisions.',
  email: 'iosapk.org@gmail.com',
  phone: '+964 7XX XXX XXXX',
  whatsapp: '9647XXXXXXXXX',
  location: 'بغداد، العراق',
  locationEn: 'Baghdad, Iraq',
  socials: {
    github: 'https://github.com/iosapk',
    linkedin: 'https://linkedin.com/in/iosapk',
    twitter: 'https://x.com/iosapk',
    instagram: '',
  },
  stats: [
    { label: 'مشروع منجز', labelEn: 'Projects delivered', value: '+120' },
    { label: 'سنوات خبرة', labelEn: 'Years of experience', value: '+8' },
    { label: 'عميل حول العالم', labelEn: 'Clients worldwide', value: '+60' },
    { label: 'رضا العملاء', labelEn: 'Client satisfaction', value: '99%' },
  ],
  stack: [
    'Next.js',
    'React',
    'TypeScript',
    'NestJS',
    'Node.js',
    'Python',
    'PostgreSQL',
    'Redis',
    'Docker',
    'Kubernetes',
    'AWS',
    'OpenAI',
    'Claude',
    'LangChain',
    'n8n',
    'Zapier',
    'Make',
    'Flutter',
    'Tailwind CSS',
    'GraphQL',
  ],
  clients: ['سوق بابل', 'مكتب الرافدين', 'أكاديمية دجلة', 'عيادتي', 'رواتب', 'كاشير', 'مصرف الفرات', 'شركة النخيل للنقل'],
  testimonials: [
    {
      name: 'المحامي أحمد الجبوري',
      nameEn: 'Ahmed Al-Jubouri, Attorney at Law',
      role: 'مدير مكتب الرافدين للمحاماة',
      roleEn: 'Managing Partner, Al-Rafidain Law Firm',
      text: 'كنا نتابع القضايا والجلسات على الورق وفي مجموعات واتساب متفرقة. اليوم كل ملف وموعد جلسة وفاتورة في مكان واحد، والتذكيرات التلقائية أنهت مشكلة الجلسات الفائتة نهائياً. تنفيذ احترافي وفهم حقيقي لطبيعة العمل القانوني في العراق.',
      textEn:
        'We used to track cases and hearings on paper and across scattered WhatsApp groups. Today every file, hearing date and invoice lives in one place, and the automatic reminders have put an end to missed hearings. Professional delivery and a real understanding of how legal practice works in Iraq.',
    },
    {
      name: 'سارة الحسني',
      nameEn: 'Sara Al-Hasani',
      role: 'مؤسسة سوق بابل',
      roleEn: 'Founder, Souq Babil',
      text: 'أطلقنا المتجر والتطبيق ولوحة الإدارة معاً في أقل من أربعة أشهر. الدفع عند الاستلام وزين كاش والتوصيل إلى كل المحافظات تعمل بسلاسة، وتضاعفت طلباتنا اليومية خلال الموسم الأول. فريق مركز التطوير كان شريكاً حقيقياً في كل خطوة.',
      textEn:
        'We launched the storefront, the app and the admin panel together in under four months. Cash on delivery, ZainCash and delivery to every governorate all run smoothly, and our daily orders doubled during the first season. The Dev Hub team has been a true partner at every step.',
    },
    {
      name: 'د. علي البصري',
      nameEn: 'Dr. Ali Al-Basri',
      role: 'مدير أكاديمية دجلة',
      roleEn: 'Director, Dijla Academy',
      text: 'المنصة تخدم آلاف الطلاب من بغداد إلى أربيل بفصول مباشرة وامتحانات إلكترونية دون انقطاع، حتى مع ضعف الإنترنت في بعض المناطق. جودة التنفيذ والدعم بعد الإطلاق فاقت توقعاتنا بكثير.',
      textEn:
        'The platform serves thousands of students from Baghdad to Erbil with live classes and online exams without interruption, even where internet connectivity is weak. The quality of delivery and post-launch support far exceeded our expectations.',
    },
  ],
  seedVersion: 2,
};

const DEMO_SERVICES: (typeof services.$inferInsert)[] = [
  {
    title: 'تطوير البرمجيات والمنصات الرقمية',
    titleEn: 'Custom Software & Web Platforms',
    icon: 'Code2',
    description:
      'نصمّم ونبني منصات ويب وأنظمة مخصصة تناسب طبيعة أعمالكم بدقة: من المواقع عالية الأداء إلى الأنظمة المؤسسية المعقدة، بمعمارية حديثة قابلة للتوسع.',
    descriptionEn:
      'We design and build web platforms and bespoke systems tailored to how your business actually works — from high-performance websites to complex enterprise systems, on a modern architecture built to scale.',
    features: ['Next.js / React / NestJS', 'أنظمة إدارية و ERP مخصصة', 'واجهات برمجية REST و GraphQL', 'أداء وSEO على أعلى مستوى'],
    featuresEn: ['Next.js / React / NestJS', 'Custom admin systems & ERP', 'REST & GraphQL APIs', 'Top-tier performance & SEO'],
    sortOrder: 1,
  },
  {
    title: 'حلول الذكاء الاصطناعي',
    titleEn: 'AI Solutions',
    icon: 'Bot',
    description:
      'نطوّر وكلاء ذكاء اصطناعي ومساعدين محادثة وأنظمة RAG تستند إلى بيانات شركتكم، وحلول ذكاء المستندات التي تقرأ وتستخرج وتلخّص تلقائياً — بالعربية والإنجليزية.',
    descriptionEn:
      "We build AI agents, chat assistants and RAG systems grounded in your company's own data, plus document-intelligence solutions that read, extract and summarise automatically — in Arabic and English.",
    features: ['وكلاء ذكاء اصطناعي ومساعدون محادثة', 'مساعدون RAG على وثائق الشركة', 'ذكاء المستندات واستخراج البيانات', 'OpenAI / Claude / LangChain'],
    featuresEn: ['AI agents & chat assistants', 'RAG assistants over your documents', 'Document intelligence & data extraction', 'OpenAI / Claude / LangChain'],
    sortOrder: 2,
  },
  {
    title: 'أتمتة الأعمال والتكاملات',
    titleEn: 'Business Automation & Integrations',
    icon: 'Workflow',
    description:
      'نؤتمت العمليات المتكررة ونربط أنظمتكم ببعضها: مسارات n8n وMake وZapier، أتمتة العمليات الروبوتية RPA، وتكاملات واتساب وCRM وERP، لتوفير الوقت والقضاء على الأخطاء اليدوية.',
    descriptionEn:
      'We automate repetitive processes and connect your systems together — n8n, Make and Zapier workflows, RPA, and WhatsApp, CRM and ERP integrations — so your team saves time and eliminates manual errors.',
    features: ['n8n / Make / Zapier', 'أتمتة العمليات الروبوتية RPA', 'تكامل واتساب و CRM و ERP', 'مراقبة وتنبيهات فورية'],
    featuresEn: ['n8n / Make / Zapier workflows', 'Robotic process automation (RPA)', 'WhatsApp, CRM & ERP integrations', 'Monitoring & real-time alerts'],
    sortOrder: 3,
  },
  {
    title: 'تطبيقات الجوال',
    titleEn: 'Mobile Apps',
    icon: 'Smartphone',
    description:
      'تطبيقات iOS وAndroid بتجربة أصلية سلسة، مرتبطة بالكامل مع الواجهات البرمجية ولوحات التحكم، من التصميم حتى النشر على المتاجر.',
    descriptionEn:
      'Native-feeling iOS and Android apps, fully connected to your APIs and dashboards — from design through to App Store and Google Play release.',
    features: ['Flutter / React Native', 'إشعارات فورية ودفع إلكتروني', 'عمل دون اتصال مع مزامنة تلقائية', 'نشر ومتابعة على المتاجر'],
    featuresEn: ['Flutter / React Native', 'Push notifications & in-app payments', 'Offline mode with automatic sync', 'Store release & ongoing support'],
    sortOrder: 4,
  },
  {
    title: 'منصات البيانات ولوحات التحكم',
    titleEn: 'Data Platforms & Dashboards',
    icon: 'BarChart3',
    description:
      'نحوّل بياناتكم المتفرقة إلى لوحات تحكم واضحة وتقارير لحظية تدعم اتخاذ القرار: خطوط معالجة بيانات، مستودعات، ومؤشرات أداء تفاعلية.',
    descriptionEn:
      'We turn scattered data into clear dashboards and real-time reports that support decision-making: data pipelines, warehouses and interactive KPIs.',
    features: ['لوحات تحكم لحظية وتفاعلية', 'خطوط معالجة ودمج البيانات', 'تقارير مجدولة وقابلة للتصدير', 'تنبؤات وتحليلات مدعومة بالذكاء الاصطناعي'],
    featuresEn: ['Real-time interactive dashboards', 'Data pipelines & integration', 'Scheduled, exportable reports', 'AI-assisted forecasting & analytics'],
    sortOrder: 5,
  },
  {
    title: 'السحابة و DevOps والأمان',
    titleEn: 'Cloud, DevOps & Security',
    icon: 'Cloud',
    description:
      'نشر وتشغيل ومراقبة أنظمتكم باحترافية: بنية تحتية سحابية، حاويات Docker وKubernetes، خطوط CI/CD، نسخ احتياطي، وتأمين شامل.',
    descriptionEn:
      'We deploy, run and monitor your systems professionally: cloud infrastructure, Docker and Kubernetes, CI/CD pipelines, backups and end-to-end security hardening.',
    features: ['AWS / Docker / Kubernetes', 'خطوط CI/CD آلية', 'مراقبة ونسخ احتياطي تلقائي', 'تأمين وحماية شاملة'],
    featuresEn: ['AWS / Docker / Kubernetes', 'Automated CI/CD pipelines', 'Monitoring & automatic backups', 'Security hardening & compliance'],
    sortOrder: 6,
  },
];

/** Titles of the services shipped with the previous (portfolio) demo content. */
const LEGACY_SERVICE_TITLES = new Set([
  'تطوير المواقع الإلكترونية',
  'تطبيقات الجوال',
  'المتاجر الإلكترونية',
  'الأنظمة الإدارية و ERP',
  'تصميم واجهات UI/UX',
  'DevOps والاستضافة',
]);

const DEMO_PROJECTS: (typeof projects.$inferInsert)[] = [
  {
    slug: 'rafidain-law-website',
    title: 'مكتب الرافدين للمحاماة والاستشارات القانونية',
    titleEn: 'Al-Rafidain Law Firm — Website',
    tagline: 'موقع ثنائي اللغة يعكس مكانة المكتب ويحوّل الزوار إلى عملاء',
    taglineEn: 'A bilingual website that reflects the firm’s standing and turns visitors into clients',
    description:
      'موقع إلكتروني أنيق ثنائي اللغة (عربي/إنجليزي) لمكتب محاماة في بغداد، بهوية بصرية رصينة تليق بالمهنة. يعرض مجالات الممارسة (القانون التجاري، العقاري، الشركات، الأحوال الشخصية، التحكيم)، وصفحات تعريفية للمحامين والشركاء، ومقالات ونشرات قانونية محسّنة لمحركات البحث. يتيح للزوار حجز استشارة قانونية إلكترونياً مع اختيار المحامي والموعد، مع تأكيد فوري عبر واتساب والبريد الإلكتروني. مبني على Next.js مع نظام إدارة محتوى يسمح لفريق المكتب بتحديث المقالات والفريق دون الحاجة لمبرمج.',
    descriptionEn:
      'An elegant bilingual (Arabic/English) website for a Baghdad-based law firm, with a refined visual identity befitting the profession. It presents the firm’s practice areas (commercial, real estate, corporate, family law and arbitration), profiles of partners and lawyers, and SEO-optimised legal articles and briefings. Visitors can book a legal consultation online, choosing a lawyer and a time slot, with instant confirmation by WhatsApp and email. Built on Next.js with a content management system that lets the firm’s staff update articles and team pages without a developer.',
    category: 'website',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'WhatsApp API', 'SEO', 'i18n'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/law-site-cover.svg',
    gallery: ['/uploads/seed/law-site-cover.svg', '/uploads/seed/law-site-detail.svg'],
    featured: true,
    year: 2026,
    client: 'مكتب الرافدين للمحاماة',
    sortOrder: 1,
  },
  {
    slug: 'rafidain-law-dashboard',
    title: 'نظام إدارة مكتب الرافدين للمحاماة',
    titleEn: 'Al-Rafidain Law Firm — Practice Management System',
    tagline: 'لوحة تحكم عربية لإدارة القضايا والجلسات والعملاء والفواتير',
    taglineEn: 'An Arabic RTL admin dashboard for cases, hearings, clients and invoicing',
    description:
      'نظام إداري متكامل باللغة العربية (RTL) لإدارة العمل اليومي لمكتب المحاماة: ملفات القضايا ومراحلها أمام المحاكم العراقية، تقويم جلسات المحاكم مع تذكيرات تلقائية للمحامين والموكلين عبر واتساب والرسائل النصية، سجل العملاء والموكلين، أرشفة المستندات والعقود والوكالات بشكل آمن، وإصدار الفواتير وتتبع الأتعاب والمدفوعات بالدينار العراقي. يوفر النظام صلاحيات متعددة (شريك، محامٍ، سكرتارية، محاسبة) وتقارير شهرية عن القضايا والإيرادات وأداء الفريق.',
    descriptionEn:
      'A comprehensive Arabic-first (RTL) practice management system for the firm’s day-to-day work: case files and their stages before the Iraqi courts, a court-hearings calendar with automatic WhatsApp and SMS reminders for lawyers and clients, a client registry, secure archiving of documents, contracts and powers of attorney, and invoicing with fee and payment tracking in Iraqi dinars. The system supports multiple roles (partner, lawyer, secretary, accounting) and produces monthly reports on cases, revenue and team performance.',
    category: 'dashboard',
    tags: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'WhatsApp API', 'SMS Gateway', 'Docker'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/law-dash-cover.svg',
    gallery: ['/uploads/seed/law-dash-cover.svg', '/uploads/seed/law-dash-detail.svg'],
    featured: true,
    year: 2026,
    client: 'مكتب الرافدين للمحاماة',
    sortOrder: 2,
  },
  {
    slug: 'souq-babil-store',
    title: 'سوق بابل — متجر إلكتروني',
    titleEn: 'Souq Babil — E-commerce Storefront',
    tagline: 'متجر إلكتروني عراقي بالدينار مع توصيل لجميع المحافظات',
    taglineEn: 'An Iraqi online store priced in dinars with delivery to every governorate',
    description:
      'متجر إلكتروني عراقي سريع ومحسّن لمحركات البحث يعرض آلاف المنتجات بأسعار بالدينار العراقي، مع بحث ذكي وتصنيفات وعروض موسمية. يدعم التوصيل إلى جميع المحافظات العراقية مع حساب رسوم التوصيل تلقائياً حسب المحافظة، وطرق الدفع المناسبة للسوق المحلي: الدفع عند الاستلام، زين كاش، وبطاقات كي كارد وماستر كارد. يتضمن سلة شراء وحسابات عملاء وتتبع الطلبات وتنبيهات عبر واتساب عند تغيّر حالة الطلب. مبني على Next.js وNestJS وPostgreSQL بمعمارية قابلة للتوسع تتحمل مواسم الذروة.',
    descriptionEn:
      'A fast, SEO-optimised Iraqi online store presenting thousands of products priced in Iraqi dinars, with smart search, categories and seasonal promotions. It delivers to every Iraqi governorate with shipping fees calculated automatically per governorate, and supports the payment methods the local market expects: cash on delivery, ZainCash, and Qi Card and Mastercard payments. It includes cart and checkout, customer accounts, order tracking and WhatsApp notifications on every status change. Built on Next.js, NestJS and PostgreSQL on a scalable architecture that holds up during peak seasons.',
    category: 'ecommerce',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'ZainCash API', 'Docker', 'MinIO', 'SEO'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/souq-store-cover.svg',
    gallery: ['/uploads/seed/souq-store-cover.svg', '/uploads/seed/souq-store-detail.svg'],
    featured: true,
    year: 2025,
    client: 'سوق بابل',
    sortOrder: 3,
  },
  {
    slug: 'souq-babil-admin',
    title: 'لوحة إدارة سوق بابل',
    titleEn: 'Souq Babil — Admin Panel',
    tagline: 'إدارة الطلبات حسب المحافظة والمخزون والمندوبين والتقارير',
    taglineEn: 'Orders by governorate, inventory, couriers, returns and sales reports',
    description:
      'لوحة إدارة عربية لتشغيل متجر سوق بابل: متابعة الطلبات حسب المحافظة وحالة التوصيل، إدارة المنتجات والتصنيفات والعروض، مراقبة المخزون مع تنبيهات النفاد، توزيع الطلبات على مندوبي التوصيل وشركات الشحن مع تتبع التسليم والتحصيل النقدي، ومعالجة المرتجعات والاستبدال. تتضمن تقارير مبيعات يومية وشهرية حسب المحافظة والفئة والمنتج، وتقارير تحصيل لمبالغ الدفع عند الاستلام، مع صلاحيات مخصصة لفرق المبيعات والمستودع والتوصيل.',
    descriptionEn:
      'An Arabic admin panel for running the Souq Babil store: orders tracked by governorate and delivery status, product, category and promotion management, inventory monitoring with low-stock alerts, order assignment to couriers and shipping partners with delivery and cash-collection tracking, and returns and exchange handling. It includes daily and monthly sales reports by governorate, category and product, cash-on-delivery collection reports, and role-based access for the sales, warehouse and delivery teams.',
    category: 'dashboard',
    tags: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'Recharts', 'Docker'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/souq-admin-cover.svg',
    gallery: ['/uploads/seed/souq-admin-cover.svg', '/uploads/seed/souq-admin-detail.svg'],
    featured: false,
    year: 2025,
    client: 'سوق بابل',
    sortOrder: 4,
  },
  {
    slug: 'souq-babil-app',
    title: 'تطبيق سوق بابل',
    titleEn: 'Souq Babil — Shopping App',
    tagline: 'تطبيق تسوّق لنظامي iOS وAndroid مع تتبع الطلبات والإشعارات',
    taglineEn: 'An iOS and Android shopping app with order tracking and notifications',
    description:
      'تطبيق تسوّق لنظامي iOS وAndroid يمنح عملاء سوق بابل تجربة شراء سلسة من الهاتف: تصفح المنتجات والعروض، بحث فوري، قوائم مفضلة، سلة شراء ودفع عبر زين كاش أو البطاقات أو الدفع عند الاستلام، وتتبع الطلب خطوة بخطوة من التأكيد حتى التسليم. يرسل التطبيق إشعارات فورية عند تغيّر حالة الطلب وعند العروض الجديدة، ويدعم تسجيل الدخول برقم الهاتف العراقي مع رمز التحقق، ويعمل بكفاءة على الاتصال الضعيف مع تخزين مؤقت للمنتجات والصور. مبني بـ Flutter ومرتبط بالكامل بالواجهة البرمجية للمتجر.',
    descriptionEn:
      'An iOS and Android shopping app that gives Souq Babil customers a smooth mobile buying experience: browsing products and offers, instant search, wishlists, cart and payment via ZainCash, cards or cash on delivery, and step-by-step order tracking from confirmation to delivery. The app sends push notifications on every status change and new promotion, supports login with an Iraqi phone number and OTP, and performs well on weak connections thanks to product and image caching. Built with Flutter and fully connected to the store’s API.',
    category: 'mobile',
    tags: ['Flutter', 'Dart', 'NestJS', 'PostgreSQL', 'Firebase', 'Push Notifications', 'ZainCash API'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/souq-app-cover.svg',
    gallery: ['/uploads/seed/souq-app-cover.svg', '/uploads/seed/souq-app-detail.svg'],
    featured: true,
    year: 2026,
    client: 'سوق بابل',
    sortOrder: 5,
  },
  {
    slug: 'dijla-academy',
    title: 'أكاديمية دجلة — منصة تعليم إلكتروني',
    titleEn: 'Dijla Academy — E-learning Platform',
    tagline: 'دورات وفصول مباشرة وامتحانات وشهادات لطلاب العراق',
    taglineEn: 'Courses, live classes, exams and certificates for students across Iraq',
    description:
      'منصة تعليم إلكتروني متكاملة لطلاب المدارس والجامعات في العراق: دورات مسجلة ومنهجية، فصول مباشرة تفاعلية، واجبات وامتحانات إلكترونية بتصحيح تلقائي، وشهادات إتمام قابلة للتحقق. يوفر النظام لوحة للمعلم لإدارة الدروس والطلاب والدرجات، وواجهة لولي الأمر لمتابعة الحضور والتقدم الدراسي، مع دفع الاشتراكات عبر زين كاش والبطاقات. صُمّمت المنصة لتعمل بكفاءة على الاتصال الضعيف مع بث تكيّفي للفيديو، وتخدم آلاف الطلاب في بغداد وأربيل والمحافظات الأخرى.',
    descriptionEn:
      'A complete e-learning platform for school and university students in Iraq: recorded curriculum-aligned courses, interactive live classes, assignments and auto-graded online exams, and verifiable completion certificates. It provides a teacher dashboard for managing lessons, students and grades, a parent view for following attendance and progress, and subscription payments via ZainCash and cards. Designed to perform well on weak connections with adaptive video streaming, it serves thousands of students in Baghdad, Erbil and other governorates.',
    category: 'education',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'WebRTC', 'HLS Video', 'ZainCash API', 'Docker'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/dijla-cover.svg',
    gallery: ['/uploads/seed/dijla-cover.svg', '/uploads/seed/dijla-detail.svg'],
    featured: true,
    year: 2025,
    client: 'أكاديمية دجلة',
    sortOrder: 6,
  },
  {
    slug: 'ayadati-app',
    title: 'عيادتي — تطبيق حجز مواعيد الأطباء',
    titleEn: 'Ayadati — Doctor Booking App',
    tagline: 'ابحث عن طبيبك في بغداد والبصرة واحجز موعدك من هاتفك',
    taglineEn: 'Find a doctor in Baghdad or Basra and book from your phone',
    description:
      'تطبيق جوال لحجز مواعيد الأطباء في بغداد والبصرة: البحث عن الأطباء حسب التخصص والمنطقة والتقييم، عرض المواعيد المتاحة والحجز الفوري، تذكيرات تلقائية عبر الإشعارات وواتساب قبل الموعد، وسجل طبي شخصي يحفظ الزيارات والوصفات الإلكترونية. يتضمن المشروع تطبيقاً للطبيب لإدارة جدوله ومرضاه وكتابة الوصفات، ولوحة تحكم للعيادات والمراكز الطبية. يدعم الدفع عبر زين كاش أو الدفع في العيادة، ويعمل على iOS وAndroid.',
    descriptionEn:
      'A mobile app for booking doctor appointments in Baghdad and Basra: search doctors by specialty, area and rating, view available slots and book instantly, receive automatic push and WhatsApp reminders before the visit, and keep a personal medical record of visits and e-prescriptions. The project includes a doctor app for managing schedules, patients and prescriptions, plus a dashboard for clinics and medical centres. Supports payment via ZainCash or at the clinic, on both iOS and Android.',
    category: 'mobile',
    tags: ['React Native', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'WhatsApp API', 'Push Notifications', 'ZainCash API'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/ayadati-cover.svg',
    gallery: ['/uploads/seed/ayadati-cover.svg', '/uploads/seed/ayadati-detail.svg'],
    featured: true,
    year: 2026,
    client: 'شبكة عيادتي الطبية',
    sortOrder: 7,
  },
  {
    slug: 'rawatib-saas',
    title: 'رواتب — نظام الموارد البشرية والرواتب',
    titleEn: 'Rawatib — HR & Payroll SaaS',
    tagline: 'منصة سحابية لإدارة الحضور والإجازات والرواتب للشركات العراقية',
    taglineEn: 'A cloud platform for attendance, leave and dinar payroll for Iraqi companies',
    description:
      'منصة SaaS متعددة المستأجرين لإدارة الموارد البشرية والرواتب مصممة للشركات العراقية: ملفات الموظفين والعقود، تسجيل الحضور والانصراف عبر التطبيق وأجهزة البصمة، إدارة الإجازات والموافقات، واحتساب الرواتب بالدينار العراقي مع البدلات والخصومات والسلف واشتراكات الضمان الاجتماعي. تُصدر المنصة قسائم رواتب إلكترونية وملفات تحويل بنكي، وتدعم تعدد الشركات والفروع تحت حساب واحد مع صلاحيات دقيقة، وتوفر تقارير تكلفة القوى العاملة وتصديرها إلى النظام المحاسبي.',
    descriptionEn:
      'A multi-tenant HR and payroll SaaS built for Iraqi companies: employee files and contracts, attendance via mobile app and biometric devices, leave management and approvals, and payroll calculated in Iraqi dinars with allowances, deductions, advances and social security contributions. The platform issues electronic payslips and bank transfer files, supports multiple companies and branches under one account with fine-grained permissions, and provides workforce cost reports with export to accounting systems.',
    category: 'saas',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Multi-tenant', 'BullMQ', 'Docker', 'Kubernetes'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/rawatib-cover.svg',
    gallery: ['/uploads/seed/rawatib-cover.svg', '/uploads/seed/rawatib-detail.svg'],
    featured: false,
    year: 2025,
    client: 'شركة رواتب للتقنية',
    sortOrder: 8,
  },
  {
    slug: 'kashier-pos-saas',
    title: 'كاشير — نقاط بيع سحابية',
    titleEn: 'Kashier — Cloud POS SaaS',
    tagline: 'نظام نقاط بيع سحابي للمطاعم والمحلات يعمل دون اتصال',
    taglineEn: 'An offline-first cloud POS for Iraqi restaurants and shops',
    description:
      'نظام نقاط بيع سحابي للمطاعم والمقاهي والمحلات في العراق: شاشة كاشير سريعة تعمل دون اتصال بالإنترنت مع مزامنة تلقائية عند عودة الاتصال، شاشة مطبخ لعرض الطلبات وتتبع التحضير، إدارة القوائم والمخزون والوصفات مع تنبيهات النقص، وقبول الدفع نقداً أو عبر زين كاش والبطاقات. يدعم تعدد الفروع تحت حساب واحد، وطباعة الفواتير والإيصالات، وتقارير مبيعات لكل فرع ووردية وموظف، مع تطبيق للمالك لمتابعة الأداء لحظياً من الهاتف.',
    descriptionEn:
      'A cloud POS system for restaurants, cafés and shops in Iraq: a fast checkout screen that works offline and syncs automatically when the connection returns, a kitchen display for order preparation tracking, menu, inventory and recipe management with low-stock alerts, and payment acceptance in cash, ZainCash or cards. It supports multiple branches under one account, receipt and invoice printing, and sales reports per branch, shift and staff member, with an owner app for following performance live from a phone.',
    category: 'saas',
    tags: ['React', 'PWA', 'NestJS', 'PostgreSQL', 'Redis', 'Offline-first', 'ZainCash API', 'Docker'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/kashier-cover.svg',
    gallery: ['/uploads/seed/kashier-cover.svg', '/uploads/seed/kashier-detail.svg'],
    featured: false,
    year: 2024,
    client: 'كاشير',
    sortOrder: 9,
  },
];

/** Slugs of every demo project this seeder has ever shipped (v1 Saudi-flavoured set + v2 Iraqi set). */
const KNOWN_DEMO_SLUGS = new Set([
  'sahab-ai-assistant',
  'qawafil-automation',
  'ma5zn-ecommerce',
  'nova-analytics-dashboard',
  'clinic-booking',
  'estate-realty',
  'foodgo-delivery-app',
  'stockpro-erp',
  ...DEMO_PROJECTS.map((p) => p.slug),
]);

/** Version of the demo content currently shipped by this seeder. */
const SEED_VERSION = 2;

/** Shape of the settings JSON as stored by the previous (single-language) release. */
type LegacySettings = Partial<Omit<SiteSettings, 'stats'>> & {
  stats?: { label: string; labelEn?: string; value: string }[];
};

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);
  constructor(
    private readonly dbs: DbService,
    private readonly config: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const db = this.dbs.db;

    const [{ value: userCount }] = await db.select({ value: count() }).from(users);
    if (userCount === 0) {
      const username = this.config.get<string>('ADMIN_USER', 'admin');
      const password = this.config.get<string>('ADMIN_PASSWORD', 'admin12345');
      await db.insert(users).values({ username, passwordHash: await bcrypt.hash(password, 10) });
      this.logger.log(`Admin user "${username}" created`);
    }

    const [{ value: settingsCount }] = await db.select({ value: count() }).from(settings);
    if (settingsCount === 0) {
      await db.insert(settings).values({ id: 1, data: DEMO_SETTINGS });
      this.logger.log('Default settings seeded');
    }

    if (this.config.get('SEED_DEMO', 'true') !== 'true') return;

    const [{ value: servicesCount }] = await db.select({ value: count() }).from(services);
    if (servicesCount === 0) {
      await db.insert(services).values(DEMO_SERVICES);
      this.logger.log('Demo services seeded');
    }

    const [{ value: projectsCount }] = await db.select({ value: count() }).from(projects);
    if (projectsCount === 0) {
      await db.insert(projects).values(DEMO_PROJECTS);
      this.logger.log('Demo projects seeded');
    }

    await this.upgradeLegacyDemo();
    await this.upgradeToV2();
  }

  /**
   * Non-destructive upgrade for databases that were seeded with the previous
   * single-language portfolio demo content. Only touches rows that are
   * recognisably demo data; user-authored content is left alone.
   */
  private async upgradeLegacyDemo() {
    await this.upgradeLegacySettings();
    await this.upgradeLegacyServices();
    await this.upgradeLegacyProjects();
  }

  private async upgradeLegacySettings() {
    const db = this.dbs.db;
    const [row] = await db.select().from(settings).where(eq(settings.id, 1)).limit(1);
    if (!row) return;
    const old = row.data as LegacySettings;
    if (old.heroTitleEn !== undefined) return; // already on the bilingual shape

    let next: SiteSettings;
    if (old.siteName === 'iosapk') {
      // Pure old demo content: replace wholesale, keeping the contact details the user may have edited.
      next = {
        ...DEMO_SETTINGS,
        email: old.email ?? DEMO_SETTINGS.email,
        phone: old.phone ?? DEMO_SETTINGS.phone,
        whatsapp: old.whatsapp ?? DEMO_SETTINGS.whatsapp,
        socials: { ...DEMO_SETTINGS.socials, ...old.socials },
      };
      this.logger.log('Settings upgraded: legacy demo settings replaced with Dev Hub settings');
    } else {
      // Customised content: fill only the keys the old shape lacks.
      const { stats: oldStats, ...rest } = old;
      next = { ...DEMO_SETTINGS, ...rest, stats: DEMO_SETTINGS.stats };
      if (oldStats) next.stats = oldStats.map((s) => ({ label: s.label, labelEn: s.labelEn ?? '', value: s.value }));
      this.logger.log('Settings upgraded: bilingual keys added to existing settings');
    }
    // Mark as v1 so the v2 upgrade below still runs (it replaces the legacy demo projects).
    next.seedVersion = 1;

    await db.update(settings).set({ data: next, updatedAt: new Date() }).where(eq(settings.id, 1));
  }

  private async upgradeLegacyServices() {
    const db = this.dbs.db;
    const existing = await db.select({ title: services.title }).from(services);
    if (existing.length === 0 || !existing.every((s) => LEGACY_SERVICE_TITLES.has(s.title))) return;

    await db.delete(services);
    await db.insert(services).values(DEMO_SERVICES);
    this.logger.log(`Services upgraded: ${existing.length} legacy demo services replaced with ${DEMO_SERVICES.length} Dev Hub services`);
  }

  private async upgradeLegacyProjects() {
    const db = this.dbs.db;
    const rows = await db.select({ id: projects.id, slug: projects.slug, titleEn: projects.titleEn }).from(projects);
    const seedSlugs = new Set(DEMO_PROJECTS.map((p) => p.slug));
    const bySlug = new Map(rows.map((r) => [r.slug, r]));
    const onlyDemoData = rows.every((r) => seedSlugs.has(r.slug));

    let updated = 0;
    let inserted = 0;
    for (const p of DEMO_PROJECTS) {
      const hit = bySlug.get(p.slug);
      if (hit) {
        if (hit.titleEn) continue;
        await db
          .update(projects)
          .set({
            titleEn: p.titleEn,
            taglineEn: p.taglineEn,
            descriptionEn: p.descriptionEn,
            featured: p.featured,
            sortOrder: p.sortOrder,
            updatedAt: new Date(),
          })
          .where(eq(projects.id, hit.id));
        updated++;
      } else if (onlyDemoData) {
        await db.insert(projects).values(p);
        inserted++;
      }
    }
    if (updated || inserted) {
      this.logger.log(`Projects upgraded: ${updated} translated, ${inserted} inserted`);
    }
  }

  /**
   * Seed v2: replaces the v1 (Saudi-flavoured) demo projects with the Iraqi
   * portfolio and localises the demo settings to Baghdad. Gated on the
   * `seedVersion` stored in the settings row so it runs exactly once.
   * User-authored projects are never deleted; customised settings are never
   * overwritten.
   */
  private async upgradeToV2() {
    const db = this.dbs.db;
    const [row] = await db.select().from(settings).where(eq(settings.id, 1)).limit(1);
    if (!row) return;
    const data = row.data;
    if ((data.seedVersion ?? 1) >= SEED_VERSION) return;

    // (a) Projects
    const rows = await db.select({ slug: projects.slug }).from(projects);
    const existing = new Set(rows.map((r) => r.slug));
    if (rows.every((r) => KNOWN_DEMO_SLUGS.has(r.slug))) {
      await db.delete(projects);
      await db.insert(projects).values(DEMO_PROJECTS);
      this.logger.log(`Seed v2: ${rows.length} demo projects replaced with ${DEMO_PROJECTS.length} Iraqi demo projects`);
    } else {
      const missing = DEMO_PROJECTS.filter((p) => !existing.has(p.slug));
      if (missing.length) await db.insert(projects).values(missing);
      this.logger.log(`Seed v2: user projects detected, kept ${rows.length} existing and inserted ${missing.length} new demo projects`);
    }

    // (b) Settings
    let next: SiteSettings = { ...data, seedVersion: SEED_VERSION };
    if (data.siteName === 'Dev Hub') {
      const v1Phone = data.phone === '+966 5X XXX XXXX' || !data.phone;
      const v1WhatsApp = data.whatsapp === '9665XXXXXXXX' || !data.whatsapp;
      next = {
        ...next,
        location: DEMO_SETTINGS.location,
        locationEn: DEMO_SETTINGS.locationEn,
        phone: v1Phone ? DEMO_SETTINGS.phone : data.phone,
        whatsapp: v1WhatsApp ? DEMO_SETTINGS.whatsapp : data.whatsapp,
        clients: DEMO_SETTINGS.clients,
        testimonials: DEMO_SETTINGS.testimonials,
        bio: DEMO_SETTINGS.bio,
        bioEn: DEMO_SETTINGS.bioEn,
        heroSubtitle: DEMO_SETTINGS.heroSubtitle,
        heroSubtitleEn: DEMO_SETTINGS.heroSubtitleEn,
      };
      this.logger.log('Seed v2: Dev Hub demo settings localised to Iraq (email, socials, stats and stack kept)');
    } else {
      this.logger.log('Seed v2: customised settings detected, only seedVersion updated');
    }

    await db.update(settings).set({ data: next, updatedAt: new Date() }).where(eq(settings.id, 1));
  }
}
