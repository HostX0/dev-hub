import type { DemoLang } from "@/demos/config";

const en = {
  brand: "Bayt Al-Reef",
  brandSub: "Iraqi kitchen · Est. 1998",
  nav: { menu: "Menu", story: "Our story", gallery: "Gallery", reserve: "Reserve" },
  cta: "Reserve a table",
  hero: {
    eyebrow: "Al-Jadriya, on the Tigris",
    title: "Iraqi flavours,",
    titleAccent: "the way grandmother made them.",
    text: "Slow-cooked stews, masgouf grilled over open fire, and bread from a clay tannour — served on the riverbank since 1998.",
    primary: "Reserve a table",
    secondary: "See the menu",
    open: "Open daily 12:00 – 23:30",
    tags: ["Since 1998", "Riverside terrace", "Family recipes"],
    dishAlt: "Grilled kebab over saffron rice",
  },
  story: {
    eyebrow: "Our story",
    title: "A family table that grew into a restaurant",
    text1:
      "Bayt Al-Reef began as Umm Ali's Friday lunch — a long table, a courtyard, and a pot of tashreeb that never ran out. In 1998 her sons opened the doors to the neighbourhood, and the neighbourhood kept coming.",
    text2:
      "Today the third generation runs the kitchen with the same rules: whole spices ground each morning, fish bought at dawn, and nothing served that we would not put in front of our own family.",
    pillars: [
      { title: "Fresh every morning", text: "Produce from Baghdad's markets, fish from the river." },
      { title: "Family recipes", text: "Three generations of spice blends, unchanged." },
      { title: "On the Tigris", text: "A terrace over the water for long evenings." },
    ],
  },
  menu: {
    eyebrow: "The menu",
    title: "From the tannour to your table",
    text: "Prices in Iraqi dinar. Ask about today's specials — the kitchen cooks what the market brings.",
    currency: "IQD",
    badges: { chef: "Chef's pick", veg: "Vegetarian", spicy: "Spicy" },
    tabs: [
      {
        key: "starters",
        label: "Starters",
        items: [
          { name: "Hummus with lamb", desc: "Silky chickpeas, spiced minced lamb, pine nuts, olive oil", price: "9,000", badge: "chef" },
          { name: "Kubba Mosul", desc: "Thin bulgur shell, minced beef, onion and sumac", price: "8,000" },
          { name: "Dolma", desc: "Vine leaves, peppers and onions stuffed with rice and herbs", price: "10,000", badge: "veg" },
          { name: "Lentil soup", desc: "Red lentils, cumin, lemon, toasted bread", price: "5,000", badge: "veg" },
        ],
      },
      {
        key: "mains",
        label: "Mains",
        items: [
          { name: "Masgouf", desc: "Whole river carp, butterflied and grilled beside open fire — for two", price: "45,000", badge: "chef" },
          { name: "Tashreeb", desc: "Lamb shank slow-cooked in tomato broth over tannour bread", price: "18,000" },
          { name: "Quzi", desc: "Roast lamb over saffron rice with almonds and raisins", price: "22,000" },
          { name: "Bamia", desc: "Okra and lamb stew with garlic and dried lime, served with rice", price: "15,000", badge: "spicy" },
        ],
      },
      {
        key: "grill",
        label: "Grill",
        items: [
          { name: "Mixed grill", desc: "Kebab, tikka and shish tawook with grilled tomato and onion", price: "25,000", badge: "chef" },
          { name: "Lamb kebab", desc: "Hand-minced lamb, parsley and sumac, over saffron rice", price: "16,000" },
          { name: "Chicken tikka", desc: "Marinated overnight in yoghurt, lemon and Iraqi baharat", price: "14,000" },
          { name: "Gass", desc: "Lamb shawarma on tannour bread with amba and pickles", price: "9,000", badge: "spicy" },
        ],
      },
      {
        key: "desserts",
        label: "Desserts",
        items: [
          { name: "Kunafa", desc: "Shredded pastry, sweet cheese and rose syrup, baked to order", price: "8,000", badge: "chef" },
          { name: "Baklava", desc: "Layers of filo, pistachio and cardamom syrup", price: "7,000" },
          { name: "Zarda", desc: "Saffron rice pudding with rose water and almonds", price: "6,000", badge: "veg" },
          { name: "Kleicha", desc: "Date-filled cardamom cookies, warm", price: "5,000", badge: "veg" },
        ],
      },
      {
        key: "drinks",
        label: "Drinks",
        items: [
          { name: "Istikan tea", desc: "Black tea with cardamom, served in the traditional glass", price: "2,000" },
          { name: "Fresh lemon-mint", desc: "Squeezed to order", price: "4,000" },
          { name: "Sharbat noomi Basra", desc: "Dried lime cordial over ice", price: "4,000" },
          { name: "Arabic coffee", desc: "Light roast with cardamom, served with dates", price: "3,000" },
        ],
      },
    ],
  },
  chef: {
    eyebrow: "The kitchen",
    name: "Chef Ali Al-Rubaie",
    role: "Head chef · third generation",
    quote:
      "My grandmother measured spices with her palm. I still do — I just write it down now so the kitchen tastes the same on a Tuesday as it does on a Friday.",
  },
  gallery: {
    eyebrow: "Gallery",
    title: "A glimpse of the table",
    categories: [
      { key: "dishes", label: "Dishes" },
      { key: "sweets", label: "Sweets & drinks" },
    ],
    alts: {
      "dish-01": "Kebab over saffron rice",
      "dish-02": "Dolma platter",
      "dish-03": "Masgouf grilled carp",
      "dish-04": "Lentil soup",
      "dish-05": "Baklava diamonds",
      "dish-06": "Istikan tea",
    },
  },
  testimonials: {
    eyebrow: "Guests say",
    title: "Loved by regulars",
    items: [
      { quote: "The masgouf is the best in Baghdad, and the terrace at sunset is unforgettable.", name: "Zainab H.", role: "Google review" },
      { quote: "We celebrated my father's 70th here. The staff treated us like family.", name: "Mustafa A.", role: "Birthday dinner" },
      { quote: "Honest food, generous portions, fair prices. We come every Friday.", name: "The Karim family", role: "Regulars since 2010" },
    ],
  },
  reserve: {
    eyebrow: "Reservations",
    title: "Book your table",
    text: "For groups of ten or more, or private events on the terrace, call us directly.",
    fields: {
      name: "Name",
      phone: "Phone",
      guests: "Guests",
      guestsPh: "How many?",
      guestOptions: ["1", "2", "3", "4", "5", "6", "7", "8", "9+"],
      date: "Date",
      time: "Time",
      notes: "Special requests",
      notesPh: "Birthday, terrace seating, allergies…",
    },
    submit: "Confirm reservation",
    success: {
      title: "Table requested",
      text: "We will confirm by phone shortly. See you at the river!",
      again: "Make another reservation",
    },
    note: "Demo form — nothing is actually sent.",
    hours: {
      title: "Opening hours",
      rows: [
        { days: "Saturday – Thursday", time: "12:00 – 23:30" },
        { days: "Friday", time: "13:00 – 00:00" },
      ],
    },
    address: "Al-Jadriya, Abu Nuwas Street, Baghdad",
    phone: "+964 790 000 0000",
    labels: { address: "Find us", phone: "Call us" },
  },
  footer: {
    tagline: "Iraqi kitchen on the Tigris since 1998.",
    rights: "All rights reserved.",
  },
};

export type RestaurantContent = typeof en;

const ar: RestaurantContent = {
  brand: "بيت الريف",
  brandSub: "مطبخ عراقي · منذ 1998",
  nav: { menu: "القائمة", story: "قصتنا", gallery: "المعرض", reserve: "الحجز" },
  cta: "احجز طاولة",
  hero: {
    eyebrow: "الجادرية، على ضفاف دجلة",
    title: "نكهات عراقية،",
    titleAccent: "كما كانت تطبخها الجدّة.",
    text: "مرق على نار هادئة، مسكوف مشوي على اللهب المفتوح، وخبز من تنور الطين — نقدّمه على ضفة النهر منذ 1998.",
    primary: "احجز طاولة",
    secondary: "استعرض القائمة",
    open: "مفتوح يومياً 12:00 – 23:30",
    tags: ["منذ 1998", "تراس على النهر", "وصفات العائلة"],
    dishAlt: "كباب مشوي على تمن الزعفران",
  },
  story: {
    eyebrow: "قصتنا",
    title: "مائدة عائلية صارت مطعماً",
    text1:
      "بدأ بيت الريف من غداء الجمعة عند أم علي — طاولة طويلة، حوش، وقدر تشريب لا ينفد. في عام 1998 فتح أبناؤها الباب لأهل المنطقة، وظلّ الناس يأتون.",
    text2:
      "اليوم يدير الجيل الثالث المطبخ بالقواعد نفسها: بهارات كاملة تُطحن كل صباح، سمك يُشترى مع الفجر، ولا يُقدَّم شيء لا نضعه أمام عائلتنا.",
    pillars: [
      { title: "طازج كل صباح", text: "خضار من أسواق بغداد، وسمك من النهر." },
      { title: "وصفات العائلة", text: "خلطات بهارات من ثلاثة أجيال لم تتغير." },
      { title: "على دجلة", text: "تراس فوق الماء لأمسيات طويلة." },
    ],
  },
  menu: {
    eyebrow: "القائمة",
    title: "من التنور إلى طاولتك",
    text: "الأسعار بالدينار العراقي. اسأل عن أطباق اليوم — المطبخ يطبخ ما يأتي به السوق.",
    currency: "د.ع",
    badges: { chef: "اختيار الشيف", veg: "نباتي", spicy: "حار" },
    tabs: [
      {
        key: "starters",
        label: "المقبلات",
        items: [
          { name: "حمص باللحم", desc: "حمص ناعم، لحم غنم مفروم بالبهارات، صنوبر، زيت زيتون", price: "9,000", badge: "chef" },
          { name: "كبة الموصل", desc: "قشرة برغل رقيقة، لحم بقر مفروم، بصل وسماق", price: "8,000" },
          { name: "دولمة", desc: "ورق عنب وفلفل وبصل محشو بالتمن والأعشاب", price: "10,000", badge: "veg" },
          { name: "شوربة عدس", desc: "عدس أحمر، كمون، ليمون، خبز محمّص", price: "5,000", badge: "veg" },
        ],
      },
      {
        key: "mains",
        label: "الأطباق الرئيسية",
        items: [
          { name: "مسكوف", desc: "سمكة نهرية كاملة، مفتوحة ومشوية قرب النار المفتوحة — لشخصين", price: "45,000", badge: "chef" },
          { name: "تشريب", desc: "موزات غنم مطبوخة ببطء بمرق الطماطة فوق خبز التنور", price: "18,000" },
          { name: "قوزي", desc: "لحم غنم محمّر فوق تمن الزعفران باللوز والزبيب", price: "22,000" },
          { name: "بامية", desc: "مرق بامية ولحم بالثوم والنومي بصرة، مع التمن", price: "15,000", badge: "spicy" },
        ],
      },
      {
        key: "grill",
        label: "المشاوي",
        items: [
          { name: "مشاوي مشكّلة", desc: "كباب وتكة وشيش طاووق مع طماطة وبصل مشوي", price: "25,000", badge: "chef" },
          { name: "كباب غنم", desc: "لحم غنم مفروم يدوياً، بقدونس وسماق، فوق تمن الزعفران", price: "16,000" },
          { name: "تكة دجاج", desc: "منقوعة ليلة كاملة باللبن والليمون والبهارات العراقية", price: "14,000" },
          { name: "كص", desc: "شاورما غنم بخبز التنور مع العنبة والمخلل", price: "9,000", badge: "spicy" },
        ],
      },
      {
        key: "desserts",
        label: "الحلويات",
        items: [
          { name: "كنافة", desc: "عجينة شعرية، جبن حلو وقطر بماء الورد، تُخبز عند الطلب", price: "8,000", badge: "chef" },
          { name: "بقلاوة", desc: "طبقات رقاق، فستق، وقطر بالهيل", price: "7,000" },
          { name: "زردة", desc: "تمن بالزعفران وماء الورد واللوز", price: "6,000", badge: "veg" },
          { name: "كليجة", desc: "كعك بالهيل محشو بالتمر، دافئ", price: "5,000", badge: "veg" },
        ],
      },
      {
        key: "drinks",
        label: "المشروبات",
        items: [
          { name: "چاي استكان", desc: "شاي أسود بالهيل في الاستكان التقليدي", price: "2,000" },
          { name: "ليمون بالنعناع", desc: "يُعصر عند الطلب", price: "4,000" },
          { name: "شربت نومي بصرة", desc: "شراب النومي المجفف مع الثلج", price: "4,000" },
          { name: "قهوة عربية", desc: "تحميص خفيف بالهيل، تُقدَّم مع التمر", price: "3,000" },
        ],
      },
    ],
  },
  chef: {
    eyebrow: "المطبخ",
    name: "الشيف علي الربيعي",
    role: "رئيس الطهاة · الجيل الثالث",
    quote:
      "كانت جدتي تكيل البهارات بكفّها. وما زلت أفعل — لكني أكتبها الآن كي يكون طعم المطبخ يوم الثلاثاء كطعمه يوم الجمعة.",
  },
  gallery: {
    eyebrow: "المعرض",
    title: "لمحة من المائدة",
    categories: [
      { key: "dishes", label: "الأطباق" },
      { key: "sweets", label: "حلويات ومشروبات" },
    ],
    alts: {
      "dish-01": "كباب فوق تمن الزعفران",
      "dish-02": "صحن دولمة",
      "dish-03": "مسكوف مشوي",
      "dish-04": "شوربة عدس",
      "dish-05": "بقلاوة",
      "dish-06": "چاي استكان",
    },
  },
  testimonials: {
    eyebrow: "يقول ضيوفنا",
    title: "محبوب من الروّاد",
    items: [
      { quote: "المسكوف الأفضل في بغداد، والتراس عند الغروب لا يُنسى.", name: "زينب ح.", role: "تقييم Google" },
      { quote: "احتفلنا هنا بعيد ميلاد والدي السبعين. عاملونا كأننا عائلتهم.", name: "مصطفى أ.", role: "عشاء عيد ميلاد" },
      { quote: "أكل صادق، كميات كريمة، وأسعار عادلة. نأتي كل جمعة.", name: "عائلة كريم", role: "روّاد منذ 2010" },
    ],
  },
  reserve: {
    eyebrow: "الحجوزات",
    title: "احجز طاولتك",
    text: "للمجموعات من عشرة أشخاص فأكثر، أو المناسبات الخاصة على التراس، اتصل بنا مباشرة.",
    fields: {
      name: "الاسم",
      phone: "الهاتف",
      guests: "عدد الضيوف",
      guestsPh: "كم شخصاً؟",
      guestOptions: ["1", "2", "3", "4", "5", "6", "7", "8", "+9"],
      date: "التاريخ",
      time: "الوقت",
      notes: "طلبات خاصة",
      notesPh: "عيد ميلاد، جلسة على التراس، حساسية…",
    },
    submit: "تأكيد الحجز",
    success: {
      title: "تم طلب الطاولة",
      text: "سنؤكد الحجز هاتفياً قريباً. نراك على النهر!",
      again: "حجز آخر",
    },
    note: "نموذج تجريبي — لا يتم إرسال أي بيانات.",
    hours: {
      title: "ساعات العمل",
      rows: [
        { days: "السبت – الخميس", time: "12:00 – 23:30" },
        { days: "الجمعة", time: "13:00 – 00:00" },
      ],
    },
    address: "الجادرية، شارع أبو نؤاس، بغداد",
    phone: "+964 790 000 0000",
    labels: { address: "موقعنا", phone: "اتصل بنا" },
  },
  footer: {
    tagline: "مطبخ عراقي على دجلة منذ 1998.",
    rights: "جميع الحقوق محفوظة.",
  },
};

export const restaurantContent: Record<DemoLang, RestaurantContent> = { ar, en };

export const DISHES: { id: keyof typeof en.gallery.alts; category: string }[] = [
  { id: "dish-01", category: "dishes" },
  { id: "dish-02", category: "dishes" },
  { id: "dish-03", category: "dishes" },
  { id: "dish-04", category: "dishes" },
  { id: "dish-05", category: "sweets" },
  { id: "dish-06", category: "sweets" },
];
