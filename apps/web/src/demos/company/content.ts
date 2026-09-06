import type { DemoLang } from "@/demos/config";

const en = {
  brand: "Rafid Group",
  brandSub: "Engineering · Supply · Consulting",
  nav: {
    services: "Services",
    projects: "Projects",
    about: "About",
    team: "Team",
    contact: "Contact",
  },
  cta: "Request a quote",
  hero: {
    eyebrow: "Baghdad · Basra · Erbil",
    title: "Engineering partners for",
    titleAccent: "projects that last.",
    text: "Rafid Group delivers contracting, industrial supply and technical consulting for public and private clients across Iraq — on schedule, on budget, and to international standards.",
    primary: "Start a project",
    secondary: "Explore our services",
    stats: [
      { value: "+240", label: "Projects completed" },
      { value: "15", label: "Years in the market" },
      { value: "98%", label: "On-time delivery" },
    ],
  },
  clients: [
    "Ministry of Oil",
    "Basra Gas Company",
    "Al-Rasheed Bank",
    "Iraqi Cement",
    "Zain Iraq",
    "Baghdad Municipality",
    "Korek Telecom",
    "Asiacell",
  ],
  clientsLabel: "Trusted by leading organisations",
  services: {
    eyebrow: "What we do",
    title: "Five disciplines, one accountable team",
    text: "From feasibility to handover, every phase is managed in-house so nothing falls between contractors.",
    items: [
      {
        icon: "hardhat",
        title: "General contracting",
        text: "Civil, structural and finishing works for commercial, residential and public buildings.",
      },
      {
        icon: "cog",
        title: "Industrial supply",
        text: "Procurement and logistics of certified equipment, pipes, valves and electrical systems.",
      },
      {
        icon: "compass",
        title: "Engineering consulting",
        text: "Feasibility studies, design review, quantity surveying and supervision.",
      },
      {
        icon: "zap",
        title: "Power & MEP",
        text: "Substations, generators, HVAC and plumbing systems designed for Iraqi conditions.",
      },
      {
        icon: "truck",
        title: "Logistics & fleet",
        text: "Heavy transport, customs clearance and warehousing across the southern ports.",
      },
      {
        icon: "shield",
        title: "HSE & quality",
        text: "ISO 9001 / 45001 systems, site safety programs and third-party inspections.",
      },
    ],
  },
  about: {
    eyebrow: "About Rafid",
    title: "Built in Iraq, measured against global standards.",
    text: "Founded in 2011 in Basra, Rafid Group grew from a small supply office into a multi-disciplinary engineering house with 320 employees and three regional offices. We work with the same discipline whether the site is a downtown tower or a remote pump station.",
    points: [
      "ISO 9001, 14001 and 45001 certified",
      "In-house engineering & procurement",
      "Registered with the Ministry of Planning — Grade 1",
      "Local teams in the south, centre and north",
    ],
    since: "Since 2011",
    sinceText: "Three offices, one standard",
  },
  projects: {
    eyebrow: "Selected projects",
    title: "Work that speaks for itself",
    text: "A selection of projects delivered over the last three years.",
    items: [
      {
        title: "Al-Zubair Logistics Park",
        sector: "Industrial",
        location: "Basra",
        year: "2025",
        image: "/demos/art/co-project-01.svg",
        value: "$18M",
      },
      {
        title: "Karada Medical Tower",
        sector: "Healthcare",
        location: "Baghdad",
        year: "2024",
        image: "/demos/art/co-project-02.svg",
        value: "$11M",
      },
      {
        title: "Erbil Substation Upgrade",
        sector: "Power",
        location: "Erbil",
        year: "2024",
        image: "/demos/art/co-project-03.svg",
        value: "$6.5M",
      },
    ],
    value: "Contract value",
  },
  process: {
    eyebrow: "How we work",
    title: "A clear path from brief to handover",
    steps: [
      {
        title: "Assessment",
        text: "Site visit, scope definition and a transparent cost estimate within 10 working days.",
      },
      {
        title: "Engineering",
        text: "Design, procurement plan and an approved schedule with milestones.",
      },
      {
        title: "Execution",
        text: "Dedicated project manager, weekly reporting and HSE supervision on site.",
      },
      {
        title: "Handover",
        text: "Testing, commissioning, documentation and a 24-month warranty.",
      },
    ],
  },
  team: {
    eyebrow: "Leadership",
    title: "People who own the outcome",
    members: [
      { name: "Eng. Ali Al-Mayahi", role: "Chief Executive Officer", initials: "AM" },
      { name: "Eng. Noor Hassan", role: "Director of Engineering", initials: "NH" },
      { name: "Omar Al-Tamimi", role: "Head of Procurement", initials: "OT" },
      { name: "Eng. Sana Kareem", role: "HSE & Quality Manager", initials: "SK" },
    ],
  },
  testimonials: {
    eyebrow: "Client voices",
    title: "What our partners say",
    items: [
      {
        quote:
          "Rafid handed over the logistics park two weeks early with zero lost-time incidents. That is rare in this market.",
        name: "Hussein Jabbar",
        role: "Operations Director, Basra Gas Company",
      },
      {
        quote:
          "Their engineering team caught design issues before they became change orders. The savings paid for the consultancy many times over.",
        name: "Dr. Layla Adnan",
        role: "Project Owner, Karada Medical Tower",
      },
      {
        quote:
          "Reliable procurement, clear reporting and a team that actually picks up the phone.",
        name: "Ahmed Rasheed",
        role: "Facilities Manager, Zain Iraq",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Tell us about your project",
    text: "Share a few details and a senior engineer will reply within one business day with next steps and a preliminary estimate.",
    fields: {
      name: "Full name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      service: "Service needed",
      servicePh: "Choose a service",
      message: "Project details",
      messagePh: "Location, scope, timeline and anything else that helps us prepare.",
    },
    submit: "Send request",
    success: {
      title: "Request received",
      text: "Thank you — our engineering team will contact you within one business day.",
      again: "Send another request",
    },
    note: "Demo form — nothing is actually sent.",
    info: {
      address: "Al-Mansour, Baghdad — Head office",
      phone: "+964 780 000 0000",
      email: "info@rafid-group.example",
      hours: "Sun–Thu, 8:30–17:00",
    },
    labels: { address: "Head office", phone: "Phone", email: "Email", hours: "Working hours" },
  },
  footer: {
    tagline: "Engineering, supply and consulting for projects across Iraq since 2011.",
    rights: "All rights reserved.",
    columns: { company: "Company", services: "Services", offices: "Offices" },
    offices: ["Baghdad — Al-Mansour", "Basra — Al-Ashar", "Erbil — Gulan Street"],
  },
};

export type CompanyContent = typeof en;

const ar: CompanyContent = {
  brand: "مجموعة رافد",
  brandSub: "هندسة · توريد · استشارات",
  nav: {
    services: "خدماتنا",
    projects: "المشاريع",
    about: "من نحن",
    team: "الفريق",
    contact: "تواصل",
  },
  cta: "اطلب عرض سعر",
  hero: {
    eyebrow: "بغداد · البصرة · أربيل",
    title: "شريكك الهندسي",
    titleAccent: "لمشاريع تدوم.",
    text: "تقدّم مجموعة رافد خدمات المقاولات والتوريد الصناعي والاستشارات الفنية للقطاعين العام والخاص في عموم العراق — بالموعد، وبالميزانية، وبالمعايير الدولية.",
    primary: "ابدأ مشروعك",
    secondary: "استعرض خدماتنا",
    stats: [
      { value: "+240", label: "مشروع منجز" },
      { value: "15", label: "عاماً في السوق" },
      { value: "98%", label: "تسليم بالموعد" },
    ],
  },
  clients: [
    "وزارة النفط",
    "شركة غاز البصرة",
    "مصرف الرشيد",
    "الإسمنت العراقية",
    "زين العراق",
    "أمانة بغداد",
    "كورك تيليكوم",
    "آسياسيل",
  ],
  clientsLabel: "بثقة كبرى المؤسسات",
  services: {
    eyebrow: "ماذا نقدّم",
    title: "خمسة تخصصات، فريق واحد مسؤول",
    text: "من دراسة الجدوى إلى التسليم، كل مرحلة تُدار داخلياً كي لا يضيع شيء بين المقاولين.",
    items: [
      {
        icon: "hardhat",
        title: "المقاولات العامة",
        text: "أعمال مدنية وإنشائية وتشطيبات للمباني التجارية والسكنية والحكومية.",
      },
      {
        icon: "cog",
        title: "التوريد الصناعي",
        text: "شراء ولوجستيات المعدات المعتمدة والأنابيب والصمامات والأنظمة الكهربائية.",
      },
      {
        icon: "compass",
        title: "الاستشارات الهندسية",
        text: "دراسات الجدوى ومراجعة التصاميم وحساب الكميات والإشراف.",
      },
      {
        icon: "zap",
        title: "الطاقة والأنظمة الميكانيكية",
        text: "محطات تحويل ومولدات وتكييف وسباكة مصممة للظروف العراقية.",
      },
      {
        icon: "truck",
        title: "اللوجستيات والأسطول",
        text: "نقل ثقيل وتخليص كمركي ومخازن في الموانئ الجنوبية.",
      },
      {
        icon: "shield",
        title: "السلامة والجودة",
        text: "أنظمة ISO 9001 / 45001 وبرامج سلامة المواقع وفحوصات الطرف الثالث.",
      },
    ],
  },
  about: {
    eyebrow: "عن رافد",
    title: "صُنعت في العراق، وتُقاس بمعايير العالم.",
    text: "تأسست مجموعة رافد عام 2011 في البصرة كمكتب توريد صغير، ونمت لتصبح بيتاً هندسياً متعدد التخصصات يضم 320 موظفاً وثلاثة مكاتب إقليمية. نعمل بالانضباط نفسه سواء كان الموقع برجاً في قلب المدينة أو محطة ضخ نائية.",
    points: [
      "حاصلون على شهادات ISO 9001 و14001 و45001",
      "هندسة وتوريد داخل المجموعة",
      "مسجّلون لدى وزارة التخطيط — الدرجة الأولى",
      "فرق محلية في الجنوب والوسط والشمال",
    ],
    since: "منذ 2011",
    sinceText: "ثلاثة مكاتب، معيار واحد",
  },
  projects: {
    eyebrow: "مشاريع مختارة",
    title: "أعمال تتحدث عن نفسها",
    text: "مجموعة من المشاريع المنجزة خلال السنوات الثلاث الأخيرة.",
    items: [
      {
        title: "مجمع الزبير اللوجستي",
        sector: "صناعي",
        location: "البصرة",
        year: "2025",
        image: "/demos/art/co-project-01.svg",
        value: "18 مليون دولار",
      },
      {
        title: "برج الكرادة الطبي",
        sector: "صحي",
        location: "بغداد",
        year: "2024",
        image: "/demos/art/co-project-02.svg",
        value: "11 مليون دولار",
      },
      {
        title: "تطوير محطة تحويل أربيل",
        sector: "طاقة",
        location: "أربيل",
        year: "2024",
        image: "/demos/art/co-project-03.svg",
        value: "6.5 مليون دولار",
      },
    ],
    value: "قيمة العقد",
  },
  process: {
    eyebrow: "كيف نعمل",
    title: "مسار واضح من الفكرة إلى التسليم",
    steps: [
      {
        title: "التقييم",
        text: "زيارة الموقع وتحديد النطاق وتقدير كلفة شفاف خلال 10 أيام عمل.",
      },
      {
        title: "الهندسة",
        text: "التصميم وخطة التوريد وجدول زمني معتمد بمراحل واضحة.",
      },
      {
        title: "التنفيذ",
        text: "مدير مشروع مخصص، تقارير أسبوعية، وإشراف سلامة في الموقع.",
      },
      {
        title: "التسليم",
        text: "الفحص والتشغيل والتوثيق وضمان لمدة 24 شهراً.",
      },
    ],
  },
  team: {
    eyebrow: "القيادة",
    title: "أشخاص يتحملون مسؤولية النتيجة",
    members: [
      { name: "م. علي المياحي", role: "الرئيس التنفيذي", initials: "ع م" },
      { name: "م. نور حسن", role: "مديرة الهندسة", initials: "ن ح" },
      { name: "عمر التميمي", role: "رئيس المشتريات", initials: "ع ت" },
      { name: "م. سناء كريم", role: "مديرة السلامة والجودة", initials: "س ك" },
    ],
  },
  testimonials: {
    eyebrow: "آراء العملاء",
    title: "ماذا يقول شركاؤنا",
    items: [
      {
        quote:
          "سلّمت رافد المجمع اللوجستي قبل موعده بأسبوعين دون أي حادث. هذا نادر في سوقنا.",
        name: "حسين جبار",
        role: "مدير العمليات، شركة غاز البصرة",
      },
      {
        quote:
          "فريقهم الهندسي اكتشف مشاكل التصميم قبل أن تتحول إلى أوامر تغيير. الوفورات غطّت كلفة الاستشارة أضعافاً.",
        name: "د. ليلى عدنان",
        role: "مالكة المشروع، برج الكرادة الطبي",
      },
      {
        quote: "توريد موثوق، تقارير واضحة، وفريق يردّ على الهاتف فعلاً.",
        name: "أحمد رشيد",
        role: "مدير المرافق، زين العراق",
      },
    ],
  },
  contact: {
    eyebrow: "تواصل معنا",
    title: "حدّثنا عن مشروعك",
    text: "شاركنا بعض التفاصيل وسيرد عليك مهندس أول خلال يوم عمل واحد بالخطوات التالية وتقدير أولي.",
    fields: {
      name: "الاسم الكامل",
      company: "الشركة",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      service: "الخدمة المطلوبة",
      servicePh: "اختر الخدمة",
      message: "تفاصيل المشروع",
      messagePh: "الموقع والنطاق والجدول الزمني وأي معلومات تساعدنا على التحضير.",
    },
    submit: "إرسال الطلب",
    success: {
      title: "تم استلام طلبك",
      text: "شكراً لك — سيتواصل معك فريقنا الهندسي خلال يوم عمل واحد.",
      again: "إرسال طلب آخر",
    },
    note: "نموذج تجريبي — لا يتم إرسال أي بيانات.",
    info: {
      address: "المنصور، بغداد — المكتب الرئيسي",
      phone: "+964 780 000 0000",
      email: "info@rafid-group.example",
      hours: "الأحد–الخميس، 8:30–17:00",
    },
    labels: { address: "المكتب الرئيسي", phone: "الهاتف", email: "البريد", hours: "ساعات العمل" },
  },
  footer: {
    tagline: "هندسة وتوريد واستشارات لمشاريع في عموم العراق منذ 2011.",
    rights: "جميع الحقوق محفوظة.",
    columns: { company: "الشركة", services: "الخدمات", offices: "المكاتب" },
    offices: ["بغداد — المنصور", "البصرة — العشار", "أربيل — شارع كولان"],
  },
};

export const companyContent: Record<DemoLang, CompanyContent> = { ar, en };
