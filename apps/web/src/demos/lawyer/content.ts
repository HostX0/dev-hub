import type { DemoLang } from "@/demos/config";

const en = {
  brand: "Al-Saadi",
  brandSub: "Law Office",
  nav: {
    practice: "Practice areas",
    about: "About",
    results: "Results",
    faq: "FAQ",
    contact: "Contact",
  },
  cta: "Book a consultation",
  hero: {
    eyebrow: "Attorney at law · Baghdad",
    title: "Counsel you can stand behind.",
    text: "Haider Al-Saadi has represented individuals, families and companies before Iraqi courts for twenty years — with discretion, preparation and a record that speaks for itself.",
    primary: "Book a consultation",
    secondary: "Explore practice areas",
    since: "Est. 2004",
    sinceText: "Member of the Iraqi Bar Association",
    badges: ["Iraqi Bar Association", "Court of Cassation", "Arabic · English · Kurdish"],
  },
  practice: {
    eyebrow: "Practice areas",
    title: "Focused expertise across six disciplines",
    text: "Every matter is handled personally by the principal attorney with a dedicated associate, so you always know who is working on your case.",
    items: [
      {
        title: "Corporate & commercial",
        text: "Company formation, contracts, shareholder disputes and regulatory compliance for local and foreign investors.",
      },
      {
        title: "Real estate & property",
        text: "Title verification, sale and lease agreements, construction disputes and land registration.",
      },
      {
        title: "Family law",
        text: "Marriage contracts, divorce, custody and inheritance handled with sensitivity and confidentiality.",
      },
      {
        title: "Criminal defence",
        text: "Representation from investigation through trial and appeal, including bail applications.",
      },
      {
        title: "Labour & employment",
        text: "Employment contracts, wrongful termination, social security and workplace disputes.",
      },
      {
        title: "Intellectual property",
        text: "Trademark registration, copyright protection and enforcement against infringement.",
      },
    ],
  },
  about: {
    eyebrow: "About the attorney",
    title: "Twenty years before the bench.",
    text: "After graduating from the University of Baghdad College of Law in 2002, Haider Al-Saadi trained under one of the country's most respected litigators before founding his own office in 2004. Today the practice combines courtroom experience with modern case management, serving clients in Baghdad, Basra and Erbil.",
    education: {
      title: "Education & admissions",
      items: [
        "LL.B., University of Baghdad, 2002",
        "LL.M. in Commercial Law, 2008",
        "Admitted to the Iraqi Bar, 2004",
        "Licensed before the Court of Cassation, 2012",
      ],
    },
    values: [
      { title: "Preparation", text: "No hearing without a full brief and a rehearsed strategy." },
      { title: "Discretion", text: "Your matter stays between you and your counsel." },
      { title: "Clarity", text: "Plain explanations of risks, costs and timelines." },
    ],
  },
  results: {
    eyebrow: "Track record",
    title: "Results, measured honestly",
    stats: [
      { value: "+1,200", label: "Cases handled" },
      { value: "91%", label: "Favourable outcomes" },
      { value: "20", label: "Years of practice" },
      { value: "3", label: "Cities served" },
    ],
    note: "Past results do not guarantee a similar outcome. Every matter depends on its facts.",
  },
  process: {
    eyebrow: "How we work",
    title: "From first meeting to final ruling",
    steps: [
      {
        title: "Consultation",
        text: "A confidential 45-minute meeting to understand your situation and options — in person or online.",
      },
      {
        title: "Strategy & fee agreement",
        text: "A written plan with the legal path, expected timeline and transparent fees before any work begins.",
      },
      {
        title: "Representation",
        text: "Filing, negotiation and advocacy before the court, with regular updates at every milestone.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Client testimonials",
    title: "Trusted in difficult moments",
    items: [
      {
        quote:
          "He explained every step in plain language and prepared for our hearing as if it were his own case. The judgment was in our favour.",
        name: "R. Al-Obaidi",
        role: "Commercial dispute, Baghdad",
      },
      {
        quote:
          "Discreet, calm and relentless on the details. Our property title was cleared within four months.",
        name: "S. Karim",
        role: "Real estate matter, Erbil",
      },
      {
        quote:
          "As a foreign investor I needed someone who understood both the law and the practice. Mr. Al-Saadi delivered both.",
        name: "M. Haddad",
        role: "Company formation, Basra",
      },
    ],
  },
  faq: {
    eyebrow: "Questions",
    title: "Before you call",
    items: [
      {
        q: "How much does the first consultation cost?",
        a: "The initial 45-minute consultation is a fixed fee of 50,000 IQD, deducted from your invoice if you decide to proceed with the office.",
      },
      {
        q: "Do you take cases outside Baghdad?",
        a: "Yes. The office regularly appears before courts in Basra and Erbil, and can arrange local counsel elsewhere in Iraq.",
      },
      {
        q: "How are fees structured?",
        a: "Depending on the matter: a fixed fee for defined work such as contracts or registrations, or staged fees for litigation. Everything is agreed in writing before work starts.",
      },
      {
        q: "Can we meet online?",
        a: "Consultations are available by video call. Original documents can be reviewed at the office or through a secure upload link.",
      },
      {
        q: "Is my information confidential?",
        a: "Absolutely. Attorney–client privilege applies from the first contact, whether or not you engage the office.",
      },
    ],
  },
  contact: {
    eyebrow: "Consultation",
    title: "Request a confidential consultation",
    text: "Tell us briefly about your matter. The office will confirm an appointment within one business day.",
    fields: {
      name: "Full name",
      phone: "Phone",
      email: "Email",
      area: "Type of matter",
      areaPh: "Select a practice area",
      date: "Preferred date",
      message: "Brief description",
      messagePh: "A few sentences about your situation. Do not include sensitive details here.",
    },
    submit: "Request appointment",
    success: {
      title: "Request received",
      text: "Thank you. The office will call to confirm your appointment.",
      again: "Send another request",
    },
    note: "Demo form — nothing is actually sent.",
    info: {
      address: "Karrada Dakhil, Building 14, 2nd floor, Baghdad",
      phone: "+964 770 000 0000",
      email: "office@alsaadi-law.example",
      hours: "Sun–Thu 9:00–17:00 · Sat by appointment",
    },
    labels: { address: "Office", phone: "Phone", email: "Email", hours: "Hours" },
  },
  footer: {
    tagline: "Independent law office serving individuals and businesses across Iraq since 2004.",
    rights: "All rights reserved.",
    disclaimer:
      "This website is for general information only and does not constitute legal advice.",
    columns: { office: "Office", practice: "Practice", contact: "Contact" },
  },
};

export type LawyerContent = typeof en;

const ar: LawyerContent = {
  brand: "السعدي",
  brandSub: "للمحاماة والاستشارات القانونية",
  nav: {
    practice: "مجالات الممارسة",
    about: "عن المكتب",
    results: "النتائج",
    faq: "أسئلة شائعة",
    contact: "تواصل",
  },
  cta: "احجز استشارة",
  hero: {
    eyebrow: "محامٍ مجاز · بغداد",
    title: "دفاعٌ تثق به، وحضورٌ يُحسب له.",
    text: "يمثّل حيدر السعدي الأفراد والعائلات والشركات أمام المحاكم العراقية منذ عشرين عاماً — بسرّية تامة وتحضير دقيق وسجلّ يتحدث عن نفسه.",
    primary: "احجز استشارة",
    secondary: "استعرض مجالات الممارسة",
    since: "تأسس 2004",
    sinceText: "عضو نقابة المحامين العراقيين",
    badges: ["نقابة المحامين العراقيين", "مجاز أمام محكمة التمييز", "عربي · إنكليزي · كوردي"],
  },
  practice: {
    eyebrow: "مجالات الممارسة",
    title: "خبرة مركّزة في ستة تخصصات",
    text: "كل قضية يتولاها المحامي الرئيسي شخصياً مع مساعد مخصص، لتعرف دائماً من يعمل على ملفك.",
    items: [
      {
        title: "الشركات والقانون التجاري",
        text: "تأسيس الشركات، العقود، نزاعات الشركاء، والامتثال التنظيمي للمستثمرين المحليين والأجانب.",
      },
      {
        title: "العقارات والملكية",
        text: "التحقق من السندات، عقود البيع والإيجار، نزاعات البناء، والتسجيل العقاري.",
      },
      {
        title: "الأحوال الشخصية",
        text: "عقود الزواج، الطلاق، الحضانة، والميراث بحساسية وسرّية كاملة.",
      },
      {
        title: "الدفاع الجنائي",
        text: "التمثيل من مرحلة التحقيق حتى المحاكمة والاستئناف، بما في ذلك طلبات الكفالة.",
      },
      {
        title: "قانون العمل",
        text: "عقود العمل، الفصل التعسفي، الضمان الاجتماعي، ونزاعات مكان العمل.",
      },
      {
        title: "الملكية الفكرية",
        text: "تسجيل العلامات التجارية، حماية حقوق المؤلف، وملاحقة التعدي.",
      },
    ],
  },
  about: {
    eyebrow: "عن المحامي",
    title: "عشرون عاماً أمام المنصّة.",
    text: "بعد تخرجه من كلية القانون بجامعة بغداد عام 2002، تدرّب حيدر السعدي على يد أحد أبرز المرافعين في البلاد قبل أن يؤسس مكتبه عام 2004. يجمع المكتب اليوم بين خبرة قاعات المحاكم وإدارة القضايا الحديثة، ويخدم عملاء في بغداد والبصرة وأربيل.",
    education: {
      title: "التعليم والإجازات",
      items: [
        "بكالوريوس قانون، جامعة بغداد، 2002",
        "ماجستير في القانون التجاري، 2008",
        "إجازة نقابة المحامين، 2004",
        "مجاز أمام محكمة التمييز، 2012",
      ],
    },
    values: [
      { title: "التحضير", text: "لا جلسة دون ملف كامل واستراتيجية مُحكمة." },
      { title: "السرّية", text: "قضيتك تبقى بينك وبين محاميك." },
      { title: "الوضوح", text: "شرح مباشر للمخاطر والتكاليف والمدد." },
    ],
  },
  results: {
    eyebrow: "السجل المهني",
    title: "نتائج تُقاس بصدق",
    stats: [
      { value: "+1,200", label: "قضية" },
      { value: "91%", label: "نتائج إيجابية" },
      { value: "20", label: "عاماً من الممارسة" },
      { value: "3", label: "مدن نخدمها" },
    ],
    note: "النتائج السابقة لا تضمن نتيجة مماثلة؛ كل قضية تعتمد على وقائعها.",
  },
  process: {
    eyebrow: "كيف نعمل",
    title: "من أول لقاء إلى الحكم النهائي",
    steps: [
      {
        title: "الاستشارة",
        text: "لقاء سرّي لمدة 45 دقيقة لفهم وضعك وخياراتك — حضورياً أو عبر الإنترنت.",
      },
      {
        title: "الاستراتيجية واتفاق الأتعاب",
        text: "خطة مكتوبة بالمسار القانوني والمدة المتوقعة والأتعاب الشفافة قبل بدء أي عمل.",
      },
      {
        title: "التمثيل",
        text: "الإيداع والتفاوض والمرافعة أمام المحكمة، مع تحديثات منتظمة عند كل مرحلة.",
      },
    ],
  },
  testimonials: {
    eyebrow: "آراء الموكلين",
    title: "ثقة في اللحظات الصعبة",
    items: [
      {
        quote:
          "شرح لنا كل خطوة بلغة واضحة وحضّر لجلستنا كأنها قضيته الشخصية. جاء الحكم لصالحنا.",
        name: "ر. العبيدي",
        role: "نزاع تجاري، بغداد",
      },
      {
        quote: "كتوم وهادئ ولا يترك تفصيلاً. تمّ تصحيح سند ملكيتنا خلال أربعة أشهر.",
        name: "س. كريم",
        role: "قضية عقارية، أربيل",
      },
      {
        quote:
          "كمستثمر أجنبي احتجت من يفهم القانون والممارسة معاً. الأستاذ السعدي قدّم الاثنين.",
        name: "م. حداد",
        role: "تأسيس شركة، البصرة",
      },
    ],
  },
  faq: {
    eyebrow: "أسئلة",
    title: "قبل أن تتصل",
    items: [
      {
        q: "كم تكلفة الاستشارة الأولى؟",
        a: "الاستشارة الأولى لمدة 45 دقيقة برسم ثابت قدره 50,000 دينار، يُخصم من فاتورتك إذا قررت المضي مع المكتب.",
      },
      {
        q: "هل تتولون قضايا خارج بغداد؟",
        a: "نعم. يترافع المكتب بانتظام أمام محاكم البصرة وأربيل، ويمكنه ترتيب محامٍ محلي في بقية المحافظات.",
      },
      {
        q: "كيف تُحتسب الأتعاب؟",
        a: "حسب طبيعة القضية: رسم ثابت للأعمال المحددة كالعقود والتسجيلات، أو أتعاب مرحلية للدعاوى. كل شيء يُتفق عليه كتابةً قبل البدء.",
      },
      {
        q: "هل يمكن اللقاء عبر الإنترنت؟",
        a: "الاستشارات متاحة عبر مكالمة فيديو. تُراجع المستندات الأصلية في المكتب أو عبر رابط رفع آمن.",
      },
      {
        q: "هل معلوماتي سرّية؟",
        a: "بالتأكيد. تسري سرّية العلاقة بين المحامي وموكله من أول اتصال، سواء تعاقدت مع المكتب أم لا.",
      },
    ],
  },
  contact: {
    eyebrow: "استشارة",
    title: "اطلب استشارة سرّية",
    text: "أخبرنا باختصار عن قضيتك، وسيؤكد المكتب موعدك خلال يوم عمل واحد.",
    fields: {
      name: "الاسم الكامل",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      area: "نوع القضية",
      areaPh: "اختر مجال الممارسة",
      date: "التاريخ المفضل",
      message: "وصف موجز",
      messagePh: "بضع جمل عن وضعك. لا تُدرج تفاصيل حساسة هنا.",
    },
    submit: "طلب موعد",
    success: {
      title: "تم استلام طلبك",
      text: "شكراً لك. سيتصل بك المكتب لتأكيد الموعد.",
      again: "إرسال طلب آخر",
    },
    note: "نموذج تجريبي — لا يتم إرسال أي بيانات.",
    info: {
      address: "الكرادة داخل، عمارة 14، الطابق الثاني، بغداد",
      phone: "+964 770 000 0000",
      email: "office@alsaadi-law.example",
      hours: "الأحد–الخميس 9:00–17:00 · السبت بموعد مسبق",
    },
    labels: { address: "المكتب", phone: "الهاتف", email: "البريد", hours: "الدوام" },
  },
  footer: {
    tagline: "مكتب محاماة مستقل يخدم الأفراد والشركات في عموم العراق منذ 2004.",
    rights: "جميع الحقوق محفوظة.",
    disclaimer: "محتوى هذا الموقع للمعلومات العامة فقط ولا يُعدّ استشارة قانونية.",
    columns: { office: "المكتب", practice: "الممارسة", contact: "التواصل" },
  },
};

export const lawyerContent: Record<DemoLang, LawyerContent> = { ar, en };
