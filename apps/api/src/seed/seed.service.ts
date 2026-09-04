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
    'شركة تقنية متخصصة في تطوير المنصات الرقمية، حلول الذكاء الاصطناعي، والأتمتة المتقدمة. نحوّل أفكاركم إلى منتجات حقيقية تعمل بكفاءة، تُطلق بسرعة، وتنمو مع أعمالكم.',
  heroSubtitleEn:
    'A software company specialising in digital platforms, applied AI and advanced automation. We turn ideas into reliable products that ship fast and scale with your business.',
  bio: 'مركز التطوير (Dev Hub) شريككم التقني من الفكرة إلى الإطلاق. يضم فريقنا الداخلي مهندسي برمجيات ومصممين وخبراء ذكاء اصطناعي يعملون معاً على بناء منصات ويب وتطبيقات جوال وأنظمة مؤسسية قابلة للتوسع. نضع الذكاء الاصطناعي والأتمتة في صميم كل ما نبنيه، لنساعد عملاءنا على خفض التكاليف، تسريع العمليات، واتخاذ قرارات أفضل مبنية على البيانات.',
  bioEn:
    'Dev Hub is your technology partner from idea to launch. Our in-house team of software engineers, designers and AI specialists builds web platforms, mobile apps and enterprise systems designed to scale. We put AI and automation at the heart of everything we build, helping our clients cut costs, speed up operations and make better, data-driven decisions.',
  email: 'iosapk.org@gmail.com',
  phone: '+966 5X XXX XXXX',
  whatsapp: '9665XXXXXXXX',
  location: 'الرياض، السعودية',
  locationEn: 'Riyadh, Saudi Arabia',
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
  clients: ['Ma5zn', 'Nova Labs', 'FoodGo', 'Estate Co.', 'StockPro', 'Qawafil', 'Sahab Health', 'Tamkeen'],
  testimonials: [
    {
      name: 'خالد العتيبي',
      nameEn: 'Khalid Al-Otaibi',
      role: 'الرئيس التنفيذي، Ma5zn',
      roleEn: 'CEO, Ma5zn',
      text: 'فريق مركز التطوير فهم أهدافنا التجارية قبل أن يكتب سطر كود واحد. أطلقنا المنصة في موعدها المحدد، وتضاعفت المبيعات خلال ثلاثة أشهر من الإطلاق.',
      textEn:
        'The Dev Hub team understood our business goals before writing a single line of code. We launched on schedule, and sales doubled within three months of going live.',
    },
    {
      name: 'سارة المنصور',
      nameEn: 'Sarah Al-Mansour',
      role: 'مديرة العمليات، Qawafil',
      roleEn: 'Head of Operations, Qawafil',
      text: 'كنا نقضي ساعات يومياً في إدخال الطلبات يدوياً. بعد الأتمتة أصبح كل شيء يتم تلقائياً، وفريقنا يركّز الآن على العملاء بدلاً من الجداول.',
      textEn:
        'We used to spend hours every day entering orders by hand. Since the automation went live everything simply happens, and our team now spends its time on customers instead of spreadsheets.',
    },
    {
      name: 'د. فهد الشهري',
      nameEn: 'Dr. Fahad Al-Shehri',
      role: 'المدير الطبي، Sahab Health',
      roleEn: 'Medical Director, Sahab Health',
      text: 'المساعد الذكي يجيب على أكثر من 80% من استفسارات المرضى فوراً وبدقة، وباللغتين. جودة التنفيذ والدعم بعد الإطلاق فاقت توقعاتنا.',
      textEn:
        'The AI assistant answers more than 80% of patient enquiries instantly and accurately, in both languages. The quality of delivery and post-launch support exceeded our expectations.',
    },
  ],
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
    slug: 'sahab-ai-assistant',
    title: 'Sahab — مساعد ذكي لخدمة العملاء',
    titleEn: 'Sahab — AI Customer Support Assistant',
    tagline: 'وكيل ذكاء اصطناعي يجيب من وثائق الشركة عبر واتساب والموقع',
    taglineEn: 'An AI agent that answers from company documents over WhatsApp and the web',
    description:
      'وكيل ذكاء اصطناعي لخدمة العملاء يعتمد على تقنية RAG للإجابة بدقة من وثائق الشركة وسياساتها وقاعدة معرفتها، مع فهم كامل للغتين العربية والإنجليزية. يعمل عبر واتساب وودجت مدمج في الموقع، يتعامل مع الاستفسارات المتكررة تلقائياً، يحوّل الحالات المعقدة إلى فريق الدعم مع ملخص للمحادثة، ويوفر لوحة تحكم لمتابعة الأداء وتحديث المحتوى. انخفض زمن الاستجابة من ساعات إلى ثوانٍ، وتمت أتمتة أكثر من 80% من المحادثات بالكامل.',
    descriptionEn:
      "An AI-powered customer-support agent that uses retrieval-augmented generation (RAG) to answer accurately from the company's documents, policies and knowledge base, with full Arabic and English understanding. Available through WhatsApp and an embeddable web widget, it resolves routine enquiries automatically, hands complex cases to the support team with a conversation summary, and comes with a dashboard for monitoring performance and updating content. Response times dropped from hours to seconds, with over 80% of conversations handled end-to-end.",
    category: 'ai',
    tags: ['OpenAI', 'LangChain', 'RAG', 'pgvector', 'NestJS', 'WhatsApp API', 'Next.js'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/ai-cover.svg',
    gallery: ['/uploads/seed/ai-cover.svg', '/uploads/seed/ai-detail.svg'],
    featured: true,
    year: 2026,
    client: 'Sahab Health',
    sortOrder: 1,
  },
  {
    slug: 'qawafil-automation',
    title: 'Qawafil — أتمتة الطلبات والفواتير',
    titleEn: 'Qawafil — Order-to-Invoice Automation',
    tagline: 'أتمتة شاملة من استلام الطلب حتى إصدار الفاتورة باستخدام n8n',
    taglineEn: 'End-to-end automation from order intake to invoicing, built on n8n',
    description:
      'أتمتة كاملة لدورة الطلب في شركة لوجستية: استلام الطلبات من واتساب والبريد والموقع، التحقق منها وإثراؤها تلقائياً، إنشاؤها في نظام ERP، إصدار الفاتورة وإرسالها للعميل عبر البريد وواتساب، وتحديث لوحات المتابعة لحظياً. بُنيت على n8n مع خدمات مخصصة للتكامل مع ERP، وألغت الإدخال اليدوي بالكامل وقلّصت زمن معالجة الطلب من يوم كامل إلى دقائق.',
    descriptionEn:
      'Complete automation of the order lifecycle for a logistics company: orders arrive from WhatsApp, email and the website, are validated and enriched automatically, created in the ERP, invoiced and sent to the customer by email and WhatsApp, with live dashboards updated along the way. Built on n8n with custom integration services for the ERP, it eliminated manual data entry entirely and cut order processing time from a full day to minutes.',
    category: 'automation',
    tags: ['n8n', 'Node.js', 'ERP Integration', 'WhatsApp API', 'PostgreSQL', 'Grafana'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/automation-cover.svg',
    gallery: ['/uploads/seed/automation-cover.svg', '/uploads/seed/automation-detail.svg'],
    featured: true,
    year: 2026,
    client: 'Qawafil',
    sortOrder: 2,
  },
  {
    slug: 'ma5zn-ecommerce',
    title: 'منصة Ma5zn للتجارة الإلكترونية',
    titleEn: 'Ma5zn E-commerce Platform',
    tagline: 'متجر إلكتروني متكامل مع إدارة مخزون وبوابات دفع',
    taglineEn: 'A complete online store with inventory management and payment gateways',
    description:
      'منصة تجارة إلكترونية كاملة تشمل واجهة متجر سريعة وSEO محسّن، سلة شراء، بوابات دفع، إدارة منتجات وطلبات، تقارير مبيعات، وتكامل مع شركات الشحن. تم بناؤها بمعمارية قابلة للتوسع باستخدام Next.js في الواجهة وNestJS وPostgreSQL في الخلفية مع MinIO لتخزين الملفات.',
    descriptionEn:
      'A full-featured e-commerce platform with a fast, SEO-optimised storefront, cart and checkout, payment gateways, product and order management, sales reporting and shipping-carrier integrations. Built on a scalable architecture with Next.js on the front end and NestJS with PostgreSQL on the back end, using MinIO for file storage.',
    category: 'ecommerce',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Stripe', 'Docker', 'MinIO'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/ecommerce-cover.webp',
    gallery: ['/uploads/seed/ecommerce-cover.webp', '/uploads/seed/ecommerce-detail.webp'],
    featured: true,
    year: 2026,
    client: 'Ma5zn',
    sortOrder: 3,
  },
  {
    slug: 'nova-analytics-dashboard',
    title: 'Nova — لوحة تحليلات SaaS',
    titleEn: 'Nova — SaaS Analytics Dashboard',
    tagline: 'لوحة تحكم تحليلية فورية مع رسوم بيانية تفاعلية',
    taglineEn: 'A real-time analytics dashboard with interactive charts',
    description:
      'منصة SaaS لتحليل البيانات في الوقت الفعلي: مؤشرات أداء، رسوم بيانية تفاعلية، تقارير قابلة للتصدير، وإدارة فرق وصلاحيات. تعتمد على WebSockets للتحديث اللحظي وRedis للتخزين المؤقت.',
    descriptionEn:
      'A SaaS platform for real-time data analytics: KPIs, interactive charts, exportable reports, and team and permission management. Powered by WebSockets for live updates and Redis for caching.',
    category: 'dashboard',
    tags: ['React', 'TypeScript', 'NestJS', 'Redis', 'WebSockets', 'Recharts'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/dashboard-cover.webp',
    gallery: ['/uploads/seed/dashboard-cover.webp', '/uploads/seed/dashboard-detail.webp'],
    featured: true,
    year: 2025,
    client: 'Nova Labs',
    sortOrder: 4,
  },
  {
    slug: 'clinic-booking',
    title: 'نظام حجز مواعيد العيادات',
    titleEn: 'Clinic Appointment Booking System',
    tagline: 'حجز إلكتروني ذكي مع تذكيرات واتساب وتقويم للأطباء',
    taglineEn: 'Smart online booking with WhatsApp reminders and doctor calendars',
    description:
      'نظام حجوزات متكامل للعيادات والمراكز الطبية: جدولة الأطباء، حجز المرضى عبر الموقع، تذكيرات تلقائية عبر واتساب والبريد، ولوحة تحكم لإدارة المواعيد والتقارير.',
    descriptionEn:
      'An end-to-end booking system for clinics and medical centres: doctor scheduling, online patient booking, automatic reminders via WhatsApp and email, and an admin dashboard for managing appointments and reports.',
    category: 'web-app',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'WhatsApp API', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/booking-cover.webp',
    gallery: ['/uploads/seed/booking-cover.webp', '/uploads/seed/booking-detail.webp'],
    featured: true,
    year: 2025,
    client: 'عيادات النخبة',
    sortOrder: 5,
  },
  {
    slug: 'estate-realty',
    title: 'Estate — منصة عقارية',
    titleEn: 'Estate — Real Estate Platform',
    tagline: 'موقع عقاري احترافي مع بحث متقدم وخرائط تفاعلية',
    taglineEn: 'A professional property portal with advanced search and interactive maps',
    description:
      'منصة عرض وبيع العقارات مع بحث متقدم بالفلاتر، خرائط تفاعلية، صفحات عقارات غنية بالصور، ونظام تواصل مباشر مع المسوقين. محسّنة بالكامل لمحركات البحث والأجهزة المحمولة.',
    descriptionEn:
      'A platform for listing and selling properties with advanced filtered search, interactive maps, image-rich property pages and direct contact with agents. Fully optimised for search engines and mobile devices.',
    category: 'website',
    tags: ['Next.js', 'Mapbox', 'PostgreSQL', 'PostGIS', 'SEO'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/realestate-cover.webp',
    gallery: ['/uploads/seed/realestate-cover.webp', '/uploads/seed/realestate-detail.webp'],
    featured: false,
    year: 2024,
    client: 'Estate Co.',
    sortOrder: 6,
  },
  {
    slug: 'foodgo-delivery-app',
    title: 'FoodGo — تطبيق توصيل الطعام',
    titleEn: 'FoodGo — Food Delivery App',
    tagline: 'تطبيق iOS و Android للطلب والتوصيل مع تتبع مباشر',
    taglineEn: 'An iOS and Android ordering and delivery app with live tracking',
    description:
      'تطبيق توصيل طعام متعدد المطاعم: قوائم طعام، سلة وطلبات، دفع إلكتروني، تتبع السائق مباشرة على الخريطة، وتطبيق مستقل للسائقين ولوحة تحكم للمطاعم.',
    descriptionEn:
      'A multi-restaurant food delivery app: menus, cart and orders, online payment, live driver tracking on the map, a dedicated driver app and a restaurant management dashboard.',
    category: 'mobile',
    tags: ['Flutter', 'NestJS', 'PostgreSQL', 'Firebase', 'Google Maps'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/mobile-cover.webp',
    gallery: ['/uploads/seed/mobile-cover.webp', '/uploads/seed/mobile-detail.webp'],
    featured: false,
    year: 2025,
    client: 'FoodGo',
    sortOrder: 7,
  },
  {
    slug: 'stockpro-erp',
    title: 'StockPro — نظام مخزون ونقاط بيع',
    titleEn: 'StockPro — Inventory & POS System',
    tagline: 'ERP مبسّط لإدارة المخزون والمبيعات والفواتير',
    taglineEn: 'A lightweight ERP for inventory, sales and invoicing',
    description:
      'نظام إدارة مخزون ونقاط بيع للشركات الصغيرة والمتوسطة: منتجات وباركود، مستودعات متعددة، فواتير وضرائب، تقارير مالية، وصلاحيات متعددة للمستخدمين. يعمل أوفلاين مع مزامنة تلقائية.',
    descriptionEn:
      'An inventory and point-of-sale system for small and medium businesses: products and barcodes, multiple warehouses, invoices and taxes, financial reports and multi-user permissions. Works offline with automatic sync.',
    category: 'erp',
    tags: ['React', 'NestJS', 'PostgreSQL', 'Docker', 'PWA'],
    liveUrl: 'https://example.com',
    repoUrl: '',
    coverImage: '/uploads/seed/erp-cover.webp',
    gallery: ['/uploads/seed/erp-cover.webp', '/uploads/seed/erp-detail.webp'],
    featured: false,
    year: 2024,
    client: 'StockPro',
    sortOrder: 8,
  },
];

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
}
