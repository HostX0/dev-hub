import type { DemoLang } from "@/demos/config";

export type PropertyType = "villa" | "apartment" | "townhouse";
export type PropertyArea = "mansour" | "jadriya" | "karada";
export type Property = {
  id: string;
  type: PropertyType;
  area: PropertyArea;
  tenure: "buy" | "rent";
  price: number;
  beds: number;
  baths: number;
  size: number;
  tone: "sand" | "sage" | "clay";
  copy: Record<
    DemoLang,
    { name: string; character: string; description: string; features: string[] }
  >;
};

export const properties: Property[] = [
  {
    id: "SK-01",
    type: "villa",
    area: "jadriya",
    tenure: "buy",
    price: 485000,
    beds: 4,
    baths: 3,
    size: 320,
    tone: "sand",
    copy: {
      en: {
        name: "The Courtyard House",
        character: "Quiet spaces. Open skies.",
        description:
          "A concept home arranged around a private courtyard. Deep openings bring light into the living spaces, while a shaded terrace creates a natural place to gather. The upstairs suite looks inward to the garden.",
        features: [
          "Private central courtyard",
          "Separate study",
          "Shaded family terrace",
          "Two parking spaces",
        ],
      },
      ar: {
        name: "دار الفناء",
        character: "مساحات هادئة. وسماء مفتوحة.",
        description:
          "تصوّر لبيت تلتف غرفه حول فناء خاص. فتحات عميقة تدخل الضوء إلى مساحات المعيشة، وشرفة مظللة تجمع العائلة. أما الجناح العلوي فيطل على الحديقة الداخلية بعيداً عن حركة الشارع.",
        features: [
          "فناء داخلي خاص",
          "غرفة مكتب مستقلة",
          "شرفة عائلية مظللة",
          "موقف لسيارتين",
        ],
      },
    },
  },
  {
    id: "SK-02",
    type: "apartment",
    area: "mansour",
    tenure: "buy",
    price: 225000,
    beds: 2,
    baths: 2,
    size: 145,
    tone: "sage",
    copy: {
      en: {
        name: "Olive Terrace",
        character: "Room for a slower morning.",
        description:
          "An apartment concept with a generous balcony and an open living area. The kitchen sits close to the dining space, with a separate utility room to keep everyday essentials out of sight.",
        features: [
          "Wide private balcony",
          "Open kitchen and dining",
          "Separate utility room",
          "Lift access",
        ],
      },
      ar: {
        name: "شرفة الزيتون",
        character: "مساحة لصباح على مهلك.",
        description:
          "تصوّر لشقة بشرفة واسعة ومساحة معيشة مفتوحة. المطبخ قريب من طاولة الطعام، وغرفة الخدمات مستقلة لتبقى تفاصيل الحياة اليومية مرتبة وبعيدة عن مساحة الاستقبال.",
        features: [
          "شرفة خاصة واسعة",
          "مطبخ ومساحة طعام مفتوحة",
          "غرفة خدمات مستقلة",
          "وصول بالمصعد",
        ],
      },
    },
  },
  {
    id: "SK-03",
    type: "townhouse",
    area: "karada",
    tenure: "buy",
    price: 310000,
    beds: 3,
    baths: 3,
    size: 215,
    tone: "clay",
    copy: {
      en: {
        name: "The Brick Residence",
        character: "A little warmth in every detail.",
        description:
          "A townhouse concept that pairs a warm brick exterior with flexible living spaces. A guest room on the entrance level can become a workspace, while the roof terrace offers an additional outdoor room.",
        features: [
          "Private roof terrace",
          "Flexible ground-floor room",
          "Enclosed entrance",
          "Built-in storage",
        ],
      },
      ar: {
        name: "دار الآجر",
        character: "دفء في كل تفصيل.",
        description:
          "تصوّر لبيت متصل بواجهة من الآجر الدافئ ومساحات مرنة. غرفة الضيوف في الطابق الأرضي تصلح مكتباً أيضاً، والسطح المهيأ للجلوس يمنح البيت مساحة إضافية في الهواء الطلق.",
        features: [
          "سطح خاص للجلوس",
          "غرفة أرضية متعددة الاستخدام",
          "مدخل مستقل مغلق",
          "مساحات تخزين مدمجة",
        ],
      },
    },
  },
  {
    id: "SK-04",
    type: "apartment",
    area: "jadriya",
    tenure: "rent",
    price: 1250,
    beds: 2,
    baths: 2,
    size: 130,
    tone: "sand",
    copy: {
      en: {
        name: "Garden Level",
        character: "An easy connection to outdoors.",
        description:
          "A rental apartment concept with a sheltered garden-facing patio. Two bedrooms sit apart from the living area, making space for a quiet workspace or a second bedroom without rearranging daily life.",
        features: [
          "Garden-facing patio",
          "Two separate bedrooms",
          "Dedicated laundry space",
          "Unfurnished concept",
        ],
      },
      ar: {
        name: "إطلالة الحديقة",
        character: "قربٌ يومي من المساحات الخضراء.",
        description:
          "تصوّر لشقة للإيجار بفناء مظلل يطل على الحديقة. غرفتا النوم منفصلتان عن المعيشة، لتكون إحداهما مساحة عمل هادئة أو غرفة إضافية حسب احتياجك.",
        features: [
          "فناء يطل على الحديقة",
          "غرفتا نوم منفصلتان",
          "مساحة غسيل مستقلة",
          "تصوّر لشقة غير مؤثثة",
        ],
      },
    },
  },
  {
    id: "SK-05",
    type: "villa",
    area: "mansour",
    tenure: "buy",
    price: 560000,
    beds: 5,
    baths: 4,
    size: 390,
    tone: "sage",
    copy: {
      en: {
        name: "The Palm House",
        character: "A home that gathers everyone.",
        description:
          "A larger family-home concept with separate formal and everyday living spaces. A ground-floor bedroom keeps options open for guests or multigenerational living, and the courtyard gives every gathering a green backdrop.",
        features: [
          "Ground-floor bedroom",
          "Two living rooms",
          "Landscaped courtyard concept",
          "Covered parking",
        ],
      },
      ar: {
        name: "دار النخيل",
        character: "بيت يتّسع للجميع.",
        description:
          "تصوّر لبيت عائلي واسع يفصل الاستقبال الرسمي عن المعيشة اليومية. غرفة النوم الأرضية مناسبة للضيوف أو لسكن أكثر من جيل، والفناء يجعل الخضرة جزءاً من كل جلسة.",
        features: [
          "غرفة نوم في الطابق الأرضي",
          "مساحتا معيشة",
          "تصوّر لفناء مزروع",
          "موقف سيارات مغطى",
        ],
      },
    },
  },
  {
    id: "SK-06",
    type: "townhouse",
    area: "karada",
    tenure: "rent",
    price: 1800,
    beds: 3,
    baths: 2,
    size: 190,
    tone: "clay",
    copy: {
      en: {
        name: "The Archway",
        character: "Your own door. Your own rhythm.",
        description:
          "A rental townhouse concept with an independent entrance and a compact courtyard. Simple circulation connects the kitchen, dining and living spaces, with bedrooms grouped upstairs for privacy.",
        features: [
          "Independent entrance",
          "Compact private courtyard",
          "Bedrooms on one level",
          "Flexible dining space",
        ],
      },
      ar: {
        name: "بيت القوس",
        character: "بابك الخاص. وإيقاعك الخاص.",
        description:
          "تصوّر لبيت متصل للإيجار بمدخل مستقل وفناء صغير. حركة بسيطة تربط المطبخ والطعام والمعيشة، بينما تجتمع غرف النوم في الطابق العلوي لتمنحها خصوصية أكبر.",
        features: [
          "مدخل مستقل",
          "فناء خاص صغير",
          "غرف النوم في طابق واحد",
          "مساحة طعام مرنة",
        ],
      },
    },
  },
];

const en = {
  brand: "SUKN",
  brandSub: "Considered living",
  city: "Baghdad, thoughtfully imagined",
  nav: {
    homes: "The collection",
    places: "Neighborhoods",
    approach: "Our approach",
    contact: "Let’s talk",
  },
  cta: "Plan a viewing",
  hero: {
    eyebrow: "HOMES WITH A SENSE OF PLACE",
    title: "A place to",
    accent: "call your own.",
    text: "Beyond a floor plan. Beyond an address. Discover spaces chosen for the way life could feel inside them.",
    primary: "Explore the collection",
    secondary: "Find your next chapter",
    imageAlt:
      "Concept rendering of a warm stone villa with an arched entrance, palms and landscaped gardens",
    imageNote: "Architectural concept · not an actual listing",
    feature: "IN FOCUS / 01",
    featureTitle: "The Courtyard House",
    featureText: "A quieter kind of everyday.",
    view: "Discover the residence",
  },
  intro: {
    eyebrow: "LESS SEARCHING. MORE BELONGING.",
    title: "Good homes begin with better questions.",
    text: "Morning light or evening shade? A busy neighborhood or a private courtyard? Start with what matters to you, then find the space that fits.",
    points: ["How you live", "What you value", "Where you feel at home"],
  },
  listings: {
    eyebrow: "THE SUKN COLLECTION",
    title: "Spaces with a story.",
    text: "A small selection. A more thoughtful search.",
    note: "Demo collection: properties, prices and specifications are illustrative. Architectural images are concepts, not photographs of available homes.",
    type: "Property type",
    area: "Neighborhood",
    tenure: "Looking to",
    allTypes: "All property types",
    allAreas: "All neighborhoods",
    allTenures: "Buy or rent",
    buy: "Buy",
    rent: "Rent",
    saleBadge: "For sale",
    rentBadge: "For rent",
    count: "homes in this selection",
    empty: "No homes match this combination.",
    emptyText:
      "Try another neighborhood or clear your filters to see the full collection.",
    reset: "Clear filters",
    view: "View residence",
    beds: "Bedrooms",
    baths: "Bathrooms",
    sqm: "m²",
    areaLabel: "Interior area",
    month: "/ month",
    priceLabel: "Illustrative price",
    types: { villa: "Villa", apartment: "Apartment", townhouse: "Townhouse" },
    areas: { mansour: "Al-Mansour", jadriya: "Jadriya", karada: "Karada" },
  },
  dialog: {
    close: "Close residence details",
    previous: "Previous view",
    next: "Next view",
    views: ["Exterior concept", "Interior concept", "Illustrative floor plan"],
    about: "The way it could feel",
    features: "Thoughtful details",
    note: "Concept illustrations of selected spaces only. Floor plans are partial studies, not complete or scaled building plans.",
    enquire: "Ask about this residence",
    reference: "Reference",
    priceNote:
      "Illustrative asking price. This demo does not advertise a real property.",
  },
  places: {
    eyebrow: "THE FEEL OF A NEIGHBORHOOD",
    title: "The home is only half the story.",
    text: "Explore three imagined ways to live in Baghdad. Use a neighborhood as a starting point, then refine your search.",
    link: "Explore these homes",
    items: [
      {
        area: "mansour" as PropertyArea,
        mood: "An urban rhythm",
        text: "Our Al-Mansour concepts pair generous living spaces with a city-minded daily routine.",
        number: "01",
      },
      {
        area: "jadriya" as PropertyArea,
        mood: "Room to slow down",
        text: "Our Jadriya concepts put courtyards, terraces and quiet corners at the center of the home.",
        number: "02",
      },
      {
        area: "karada" as PropertyArea,
        mood: "A character of its own",
        text: "Our Karada concepts explore warm materials, independent entrances and flexible spaces.",
        number: "03",
      },
    ],
  },
  process: {
    eyebrow: "A MORE CONSIDERED APPROACH",
    title: "Your next chapter, one clear step at a time.",
    text: "A good conversation is the beginning. The right questions help turn a long list into a meaningful choice.",
    steps: [
      {
        title: "Tell us what matters",
        text: "Share your needs, preferred areas and comfortable budget. Include the details that make an ordinary day work.",
      },
      {
        title: "Build your shortlist",
        text: "Compare the spaces, layout and trade-offs. Keep the homes that fit your priorities, rather than the longest list.",
      },
      {
        title: "Look a little closer",
        text: "Plan a viewing, ask about documents and costs, and take time to understand the details before making a decision.",
      },
    ],
  },
  contact: {
    eyebrow: "LET’S FIND YOUR PLACE",
    title: "Every good move starts with a conversation.",
    text: "Tell us a little about the home you have in mind. Try the enquiry experience below—nothing is sent and no viewing is booked.",
    label: "YOUR SEARCH, AT YOUR PACE",
    selected: "Your selected residence",
    clear: "Remove selection",
    name: "Your name",
    email: "Email address",
    interest: "I’m interested in",
    choice: "Choose an option",
    options: ["Buying a home", "Renting a home", "Exploring my options"],
    message: "What would make a place feel like home?",
    messagePh:
      "Your preferred area, space, budget, or anything else that matters…",
    submit: "Try the enquiry",
    note: "Demo only. No data is sent or stored.",
    success: {
      title: "That’s how the conversation begins.",
      text: "You’ve completed the demo enquiry. No message was sent and no appointment was created.",
      again: "Try another enquiry",
    },
  },
  faq: {
    eyebrow: "A FEW HELPFUL ANSWERS",
    title: "Before your next move.",
    items: [
      {
        q: "Are these homes actually available?",
        a: "No. SUKN is a fictional real-estate website demonstration. Every listing, price, room count and illustration is sample content used to show how the template works.",
      },
      {
        q: "Can I filter and explore individual homes?",
        a: "Yes. Choose a property type, neighborhood or buy/rent preference. Open any residence to explore its concept gallery, details and illustrative floor plan.",
      },
      {
        q: "What happens when I submit an enquiry?",
        a: "The form validates your entries and displays a sample confirmation. It does not send an email, store your information or book a real viewing.",
      },
      {
        q: "What should I check for a real property?",
        a: "Confirm ownership documents, the property's condition, the total costs and the terms of the agreement with qualified local professionals. This demo is a design example and does not verify any property.",
      },
    ],
  },
  footer: {
    statement: "A sense of place.\nA place of your own.",
    text: "SUKN is an imagined property studio, built around thoughtful spaces and a clearer search.",
    explore: "Explore",
    detail: "Fictional brand. Illustrative properties. No real transactions.",
    top: "Back to top",
    rights: "A real-estate website concept.",
  },
};

const ar: typeof en = {
  brand: "سُكن",
  brandSub: "للحياة التي تختارها",
  city: "بغداد، برؤية مختلفة",
  nav: {
    homes: "مجموعة البيوت",
    places: "الأحياء",
    approach: "طريقتنا",
    contact: "لنتحدث",
  },
  cta: "خطّط لزيارة",
  hero: {
    eyebrow: "بيوت لها روح ومكان",
    title: "مكان يشبهك.",
    accent: "وحياة تختارها.",
    text: "أكثر من مخطط. وأكثر من عنوان. اكتشف مساحات اخترناها لما يمكن أن تمنحه لحياتك، يوماً بعد يوم.",
    primary: "اكتشف مجموعة البيوت",
    secondary: "ابدأ فصلك الجديد",
    imageAlt: "تصوّر معماري لفيلا حجرية بألوان دافئة ومدخل مقوّس ونخيل وحدائق",
    imageNote: "تصوّر معماري · ليس عقاراً معروضاً فعلياً",
    feature: "تحت الضوء / 01",
    featureTitle: "دار الفناء",
    featureText: "إيقاع أهدأ للحياة اليومية.",
    view: "اكتشف تفاصيل البيت",
  },
  intro: {
    eyebrow: "بحث أقل. وانتماء أكثر.",
    title: "البيت المناسب يبدأ بالأسئلة المناسبة.",
    text: "ضوء الصباح أم ظل المساء؟ حيّ نابض أم فناء خاص؟ ابدأ بما يهمّك، ثم ابحث عن المساحة التي تناسبه.",
    points: ["كيف تعيش", "ما الذي يهمّك", "أين تجد راحتك"],
  },
  listings: {
    eyebrow: "مجموعة سُكن",
    title: "مساحات، لكل منها حكاية.",
    text: "اختيارات أقل. وبحث أكثر وضوحاً.",
    note: "مجموعة تجريبية: العقارات والأسعار والمواصفات أمثلة توضيحية. الصور تصوّرات معمارية وليست صوراً لبيوت متاحة فعلياً.",
    type: "نوع العقار",
    area: "الحي",
    tenure: "أبحث عن",
    allTypes: "جميع أنواع العقارات",
    allAreas: "جميع الأحياء",
    allTenures: "شراء أو إيجار",
    buy: "شراء",
    rent: "إيجار",
    saleBadge: "للبيع",
    rentBadge: "للإيجار",
    count: "بيوت ضمن هذه الاختيارات",
    empty: "لا توجد بيوت تطابق هذه الخيارات.",
    emptyText: "جرّب حيّاً آخر، أو أزل الفلاتر لعرض المجموعة كاملة.",
    reset: "إزالة الفلاتر",
    view: "تفاصيل البيت",
    beds: "غرف النوم",
    baths: "الحمّامات",
    sqm: "م²",
    areaLabel: "المساحة الداخلية",
    month: "/ شهر",
    priceLabel: "سعر توضيحي",
    types: { villa: "فيلا", apartment: "شقة", townhouse: "بيت متصل" },
    areas: { mansour: "المنصور", jadriya: "الجادرية", karada: "الكرادة" },
  },
  dialog: {
    close: "إغلاق تفاصيل البيت",
    previous: "العرض السابق",
    next: "العرض التالي",
    views: ["تصوّر الواجهة", "تصوّر المساحة الداخلية", "مخطط توضيحي"],
    about: "كيف يمكن أن تبدو الحياة هنا",
    features: "تفاصيل مدروسة",
    note: "رسومات توضيحية لمساحات مختارة. المخططات تصوّرات جزئية وليست مخططات بناء كاملة أو بمقياس رسم.",
    enquire: "استفسر عن هذا البيت",
    reference: "المرجع",
    priceNote: "سعر طلب توضيحي. هذا النموذج لا يعلن عن عقار حقيقي.",
  },
  places: {
    eyebrow: "روح الحي",
    title: "البيت نصف الحكاية فقط.",
    text: "اكتشف ثلاثة تصوّرات للحياة في بغداد. ابدأ بالحي، ثم حدّد ما تبحث عنه في بيتك.",
    link: "اكتشف بيوت هذا الحي",
    items: [
      {
        area: "mansour",
        mood: "إيقاع المدينة",
        text: "تصوّراتنا في المنصور تجمع المساحات الرحبة مع إيقاع حياة قريب من المدينة.",
        number: "01",
      },
      {
        area: "jadriya",
        mood: "مساحة لتتمهّل",
        text: "تصوّراتنا في الجادرية تجعل الأفنية والشرفات والزوايا الهادئة قلب البيت.",
        number: "02",
      },
      {
        area: "karada",
        mood: "شخصية لها حضور",
        text: "تصوّراتنا في الكرادة تستكشف دفء المواد والمداخل المستقلة والمساحات المرنة.",
        number: "03",
      },
    ],
  },
  process: {
    eyebrow: "خطوات أوضح. وخيارات أهدأ.",
    title: "فصلك الجديد، خطوة مدروسة في كل مرة.",
    text: "حوار جيد هو البداية. والأسئلة المناسبة تحول القائمة الطويلة إلى خيارات تستحق النظر.",
    steps: [
      {
        title: "أخبرنا بما يهمّك",
        text: "شاركنا احتياجاتك والأحياء التي تفضلها والميزانية المريحة لك. لا تنسَ التفاصيل الصغيرة التي تجعل يومك أسهل.",
      },
      {
        title: "كوّن قائمتك المختصرة",
        text: "قارن المساحات والتوزيع وما تتنازل عنه مقابل ما تكسبه. احتفظ بالبيوت الأقرب لأولوياتك.",
      },
      {
        title: "اقترب من التفاصيل",
        text: "خطّط لزيارة، واسأل عن المستندات والتكاليف، وخذ وقتك لفهم التفاصيل قبل اتخاذ القرار.",
      },
    ],
  },
  contact: {
    eyebrow: "لنجد مكانك",
    title: "كل نقلة جميلة تبدأ بحديث.",
    text: "أخبرنا قليلاً عن البيت الذي تفكر فيه. جرّب نموذج الاستفسار أدناه؛ لن تُرسل بياناتك ولن يُحجز موعد حقيقي.",
    label: "بحثك، على مهلك",
    selected: "البيت الذي اخترته",
    clear: "إزالة الاختيار",
    name: "اسمك",
    email: "البريد الإلكتروني",
    interest: "أنا مهتم بـ",
    choice: "اختر من القائمة",
    options: ["شراء بيت", "استئجار بيت", "استكشاف الخيارات"],
    message: "ما الذي يجعل المكان بيتاً بالنسبة لك؟",
    messagePh: "الحي المفضل، والمساحة، والميزانية، وأي تفاصيل أخرى تهمّك…",
    submit: "جرّب الاستفسار",
    note: "عرض تجريبي. لا تُرسل البيانات ولا تُحفظ.",
    success: {
      title: "هكذا تبدأ المحادثة.",
      text: "أكملت تجربة الاستفسار. لم تُرسل رسالة ولم يُحجز أي موعد.",
      again: "جرّب استفساراً آخر",
    },
  },
  faq: {
    eyebrow: "إجابات تساعدك",
    title: "قبل خطوتك المقبلة.",
    items: [
      {
        q: "هل هذه البيوت متاحة فعلياً؟",
        a: "لا. سُكن نموذج تجريبي لموقع عقاري بعلامة افتراضية. جميع العقارات والأسعار وعدد الغرف والرسومات أمثلة لشرح طريقة عمل القالب.",
      },
      {
        q: "هل يمكنني تصفية البيوت واستكشاف تفاصيلها؟",
        a: "نعم. اختر نوع العقار والحي والشراء أو الإيجار. افتح أي بيت لتشاهد تصوّراته وتفاصيله ومخططه التوضيحي.",
      },
      {
        q: "ماذا يحدث عند إرسال الاستفسار؟",
        a: "يتحقق النموذج من الحقول ثم يعرض تأكيداً تجريبياً. لا يرسل بريداً ولا يحفظ معلوماتك ولا يحجز زيارة حقيقية.",
      },
      {
        q: "ماذا أراجع عند البحث عن عقار حقيقي؟",
        a: "تحقق من وثائق الملكية وحالة العقار والتكاليف الكاملة وشروط الاتفاق بمساعدة مختصين محليين مؤهلين. هذا النموذج مثال على التصميم ولا يتحقق من أي عقار.",
      },
    ],
  },
  footer: {
    statement: "مكان تنتمي إليه.\nوبيت يشبهك.",
    text: "سُكن تصوّر لاستوديو عقاري يهتم بالمساحات المدروسة والبحث الأكثر وضوحاً.",
    explore: "اكتشف",
    detail: "علامة افتراضية. عقارات توضيحية. دون معاملات حقيقية.",
    top: "العودة للأعلى",
    rights: "تصوّر لموقع عقاري.",
  },
};

export const realEstateContent: Record<DemoLang, typeof en> = { en, ar };
