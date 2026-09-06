import type { RetailContent } from "../retail/types";

export const phonesContent: Record<"en" | "ar", RetailContent> = {
  en: {
    brand: "CONNECT",
    descriptor: "Everyday, connected.",
    announcement:
      "Your next phone. The little things around it. One considered collection.",
    nav: ["Shop the collection", "Why CONNECT", "Let’s talk"],
    hero: {
      eyebrow: "FIND YOUR EVERYDAY UPGRADE",
      title: "Your day.",
      accent: "Better connected.",
      text: "A phone that feels right. Audio for your own space. The essentials that bring it all together. Build a setup around the way you live.",
      primary: "Explore the collection",
      secondary: "Make a clearer choice",
      imageAlt:
        "Three unbranded graphite and lavender-silver phones on dark charcoal platforms, with white earbuds and a USB-C cable",
      caption: "Small upgrades. A setup that feels like you.",
    },
    benefits: [
      {
        title: "Useful details first",
        text: "Compare sample sizes, storage options and the connections that matter.",
      },
      {
        title: "A complete everyday setup",
        text: "Explore phones, personal audio and a few well-chosen essentials.",
      },
      {
        title: "Space to choose",
        text: "Open the details, compare your options and build a cart at your own pace.",
      },
    ],
    catalogue: {
      eyebrow: "THE CONNECT COLLECTION",
      title: "Good tech. Your kind of everyday.",
      text: "Fictional devices, illustrative specifications and sample prices in Iraqi dinars. Explore how the storefront works—these are not products available to buy.",
      all: "All products",
      search: "Search the collection",
      searchPlaceholder: "Try phone, earbuds, watch or charger…",
      sort: "Sort products",
      featured: "Our selection",
      low: "Price: low to high",
      high: "Price: high to low",
      results: "products",
      empty: "Nothing matches that search yet.",
      reset: "Clear filters",
      details: "Take a closer look",
      add: "Add to cart",
      added: "Added to your demo cart",
      close: "Close",
      currency: "IQD",
      specTitle: "Concept specifications",
    },
    categories: [
      { id: "phones", name: "Phones" },
      { id: "audio", name: "Audio" },
      { id: "essentials", name: "Everyday essentials" },
    ],
    products: [
      {
        id: "connect-one",
        category: "phones",
        name: "CONNECT One",
        description:
          "A compact phone concept with a clean graphite finish. A simple starting point for a setup that goes everywhere with you.",
        specs: [
          "Illustrative 6.2-inch display",
          "128 GB sample storage",
          "Graphite concept finish",
        ],
        price: 425000,
        visual: "phone",
        color: "#697786",
      },
      {
        id: "connect-one-plus",
        category: "phones",
        name: "CONNECT One Plus",
        description:
          "A larger canvas for the things you enjoy. This phone concept pairs a spacious screen with a soft, sky-blue finish.",
        specs: [
          "Illustrative 6.7-inch display",
          "256 GB sample storage",
          "Sky-blue concept finish",
        ],
        price: 685000,
        visual: "phone",
        color: "#87B3D6",
      },
      {
        id: "connect-buds",
        category: "audio",
        name: "Pocket Buds",
        description:
          "A little listening space of your own. Rounded earbuds and a pocket-sized case form this personal-audio concept.",
        specs: [
          "Wireless in-ear concept",
          "Illustrative charging case",
          "Soft silicone-tip design",
        ],
        price: 85000,
        visual: "buds",
        color: "#D3E3E5",
      },
      {
        id: "connect-watch",
        category: "essentials",
        name: "Day Watch",
        description:
          "A clean face and a comfortable-looking strap. An everyday watch concept designed to sit naturally alongside your phone.",
        specs: [
          "Illustrative 1.7-inch display",
          "Adjustable strap concept",
          "Touchscreen interface concept",
        ],
        price: 135000,
        visual: "watch",
        color: "#C3B6A9",
      },
      {
        id: "connect-charge",
        category: "essentials",
        name: "Charge Mini",
        description:
          "A compact charging concept for a less cluttered desk or travel pouch. In a live store, check the device and cable requirements before choosing.",
        specs: [
          "Illustrative USB-C connection",
          "30 W concept output",
          "Single-port wall-plug design",
        ],
        price: 45000,
        visual: "charger",
        color: "#9BAED1",
      },
      {
        id: "connect-case",
        category: "essentials",
        name: "Soft Shell",
        description:
          "A quiet layer of color for your everyday carry. This case concept is sized for the fictional CONNECT One, rather than a universal fit.",
        specs: [
          "Fictional CONNECT One fit",
          "Soft-touch material concept",
          "Raised-edge design",
        ],
        price: 25000,
        visual: "case",
        color: "#B0C1AD",
      },
    ],
    story: {
      eyebrow: "LESS NOISE. A BETTER FIT.",
      title: "Start with your day, not a spec sheet.",
      text: "What do you reach for most: the camera, a map, a playlist, or a call home? The right setup starts with those moments. Decide what matters, then compare the details that support it.",
      points: [
        "Choose a screen size you enjoy holding.",
        "Match storage to the things you keep.",
        "Check the exact model and accessory compatibility.",
      ],
      cta: "Talk through your options",
    },
    guide: {
      eyebrow: "THREE STEPS TO A CLEARER CHOICE",
      title: "Build a setup that works together.",
      steps: [
        {
          title: "Know your priorities",
          text: "Set a comfortable budget and choose the two or three features you will use most. More specifications do not always mean a better fit.",
        },
        {
          title: "Compare the whole setup",
          text: "Look at the phone, charger, cable and case together. Check model names, connector types and what is included before adding accessories.",
        },
        {
          title: "Confirm before buying",
          text: "With a real seller, confirm the exact variant, network support, software support and written warranty terms. Demo specifications cannot establish compatibility.",
        },
      ],
    },
    faqTitle: "A few things worth knowing.",
    faqs: [
      {
        question: "Are these real devices I can order?",
        answer:
          "No. CONNECT is a fictional storefront. Product names, specifications, illustrations and prices are sample content. The demo does not take orders, charge a card or arrange delivery.",
      },
      {
        question: "How does the demo cart work?",
        answer:
          "Add a product, change its quantity or remove it, then preview the checkout confirmation. The cart exists only in the current page session and resets when you reload. No purchase is placed.",
      },
      {
        question: "Will these accessories work with my phone?",
        answer:
          "The products shown are fictional, so their specifications do not establish real compatibility. When shopping for actual accessories, match the exact device model, connector and power requirements with the seller.",
      },
      {
        question: "What happens to my enquiry?",
        answer:
          "The form checks the required fields and shows a demonstration confirmation. Your details are not sent to a sales team or stored by this demo.",
      },
    ],
    contact: {
      eyebrow: "LET’S FIND YOUR FIT",
      title: "What does your next upgrade look like?",
      text: "A first phone, more room for your photos, or the right accessory. Try telling us what matters to you using the demonstration form.",
      name: "Your name",
      email: "Email address",
      message: "What are you looking for?",
      submit: "Try the enquiry form",
      note: "Demo only. No message is sent and no details are stored.",
      success: {
        title: "Your next step, demonstrated.",
        text: "That is the end of the sample enquiry. No message was sent and no device was reserved.",
        again: "Try another enquiry",
      },
    },
    cart: {
      title: "Your demo cart",
      empty: "Start with the phone or essential that catches your eye.",
      subtotal: "Illustrative subtotal",
      remove: "Remove",
      increase: "Increase quantity",
      decrease: "Decrease quantity",
      checkout: "Preview checkout",
      note: "Demo prices only. No real order, payment, delivery or reservation is created.",
      done: "That’s the checkout experience.",
      doneText:
        "You’ve reached the demonstration confirmation. Nothing was purchased and no payment was requested.",
      continue: "Keep exploring",
      item: "items in your cart",
    },
    footer:
      "CONNECT is a fictional phone and accessories brand created to demonstrate a retail website.",
    top: "Back to top",
  },
  ar: {
    brand: "كونكت",
    descriptor: "أقرب ليومك.",
    announcement: "موبايلك الجاي، وتفاصيله الصغيرة. كلّها بمجموعة مختارة.",
    nav: ["تسوّق المجموعة", "ليش كونكت؟", "تواصل ويانا"],
    hero: {
      eyebrow: "اختار تغيير يناسب يومك",
      title: "يومك.",
      accent: "بتواصل أحلى.",
      text: "موبايل ترتاح له. سماعات تخليك بجوّك. وإكسسوارات تكمّل اختياراتك. رتّب أجهزتك على طريقتك، وحسب الأشياء اللي تحبّها.",
      primary: "استكشف المجموعة",
      secondary: "خلّ اختيارك أوضح",
      imageAlt:
        "ثلاثة موبايلات بدون علامة تجارية بألوان غرافيتية وفضية مائلة للبنفسجي على منصات فحمية داكنة، مع سماعات بيضاء وكيبل USB-C",
      caption: "تغييرات صغيرة. واختيارات تشبهك.",
    },
    benefits: [
      {
        title: "التفاصيل اللي تهمّك",
        text: "قارن الأحجام والسعات التوضيحية والتوصيلات اللي تحتاجها.",
      },
      {
        title: "اختيارات تكمّل بعض",
        text: "موبايلات وصوتيات وأساسيات مختارة لتفاصيل يومك.",
      },
      {
        title: "اختار على مهلك",
        text: "افتح التفاصيل وقارن الخيارات ورتّب سلتك بدون استعجال.",
      },
    ],
    catalogue: {
      eyebrow: "مجموعة كونكت",
      title: "تقنية حلوة. على طريقتك.",
      text: "أجهزة افتراضية ومواصفات وأسعار توضيحية بالدينار العراقي. جرّب المتجر؛ هذه المنتجات مو معروضة للبيع الفعلي.",
      all: "كل المنتجات",
      search: "ابحث بالمجموعة",
      searchPlaceholder: "جرّب موبايل، سماعات، ساعة أو شاحن…",
      sort: "ترتيب المنتجات",
      featured: "اختياراتنا",
      low: "السعر: من الأقل للأعلى",
      high: "السعر: من الأعلى للأقل",
      results: "منتجات",
      empty: "ماكو منتجات تطابق هذا البحث.",
      reset: "إزالة الفلاتر",
      details: "شوف التفاصيل",
      add: "أضف للسلة",
      added: "تمت الإضافة للسلة التجريبية",
      close: "إغلاق",
      currency: "د.ع",
      specTitle: "المواصفات التوضيحية",
    },
    categories: [
      { id: "phones", name: "الموبايلات" },
      { id: "audio", name: "الصوتيات" },
      { id: "essentials", name: "أساسيات يومك" },
    ],
    products: [
      {
        id: "connect-one",
        category: "phones",
        name: "موبايل كونكت ون",
        description:
          "تصوّر لموبايل بحجم مريح ولون غرافيتي هادئ. بداية بسيطة لمجموعة أجهزة تبقى قريبة منك وين ما تروح.",
        specs: [
          "شاشة توضيحية ٦٫٢ إنج",
          "سعة نموذجية ١٢٨ غيغابايت",
          "تصوّر بلون غرافيتي",
        ],
        price: 425000,
        visual: "phone",
        color: "#697786",
      },
      {
        id: "connect-one-plus",
        category: "phones",
        name: "موبايل كونكت ون بلس",
        description:
          "مساحة أكبر للأشياء اللي تحبّها. تصوّر لموبايل بشاشة واسعة ولمسة زرقاء سماوية هادئة.",
        specs: [
          "شاشة توضيحية ٦٫٧ إنج",
          "سعة نموذجية ٢٥٦ غيغابايت",
          "تصوّر بلون أزرق سماوي",
        ],
        price: 685000,
        visual: "phone",
        color: "#87B3D6",
      },
      {
        id: "connect-buds",
        category: "audio",
        name: "سماعات بوكت",
        description:
          "مساحة صغيرة لجوّك الخاص. سماعات مستديرة ويا علبة بحجم الجيب، ضمن تصوّر لصوتياتك اليومية.",
        specs: [
          "تصوّر لسماعات لاسلكية داخل الأذن",
          "علبة شحن توضيحية",
          "تصميم بأطراف سيليكون ناعمة",
        ],
        price: 85000,
        visual: "buds",
        color: "#D3E3E5",
      },
      {
        id: "connect-watch",
        category: "essentials",
        name: "ساعة داي",
        description:
          "واجهة بسيطة وسوار بتصميم مريح. تصوّر لساعة يومية تنسجم ويا موبايلك وبقية اختياراتك.",
        specs: [
          "شاشة توضيحية ١٫٧ إنج",
          "تصوّر لسوار قابل للتعديل",
          "تصوّر لواجهة تعمل باللمس",
        ],
        price: 135000,
        visual: "watch",
        color: "#C3B6A9",
      },
      {
        id: "connect-charge",
        category: "essentials",
        name: "شاحن ميني",
        description:
          "تصوّر لشاحن صغير يناسب مكتب مرتب أو حقيبة سفر. بالمتجر الفعلي، تأكد من متطلبات جهازك والكيبل قبل الاختيار.",
        specs: [
          "منفذ USB-C توضيحي",
          "قدرة افتراضية ٣٠ واط",
          "تصميم شاحن جداري بمنفذ واحد",
        ],
        price: 45000,
        visual: "charger",
        color: "#9BAED1",
      },
      {
        id: "connect-case",
        category: "essentials",
        name: "كفر سوفت شِل",
        description:
          "لمسة لون هادئة لأكثر جهاز تستخدمه. هذا الكفر مصمّم للموبايل الافتراضي كونكت ون، مو قياس يناسب كل الأجهزة.",
        specs: [
          "قياس مخصّص لكونكت ون الافتراضي",
          "تصوّر لخامة ناعمة الملمس",
          "تصميم بحواف مرتفعة",
        ],
        price: 25000,
        visual: "case",
        color: "#B0C1AD",
      },
    ],
    story: {
      eyebrow: "تفاصيل أقل تشتّتك. واختيار أقرب لك.",
      title: "ابدأ من يومك، مو من جدول المواصفات.",
      text: "شنو أكثر شي تستخدمه: الكاميرا، الخريطة، الأغاني، لو مكالمة لأهلك؟ اختيارك المناسب يبدأ من هاللحظات. حدّد شنو يهمّك، وبعدين قارن التفاصيل اللي تخدمه.",
      points: [
        "اختار حجم شاشة ترتاح وأنت تمسكه.",
        "خلّ السعة تناسب الصور والملفات اللي تحتفظ بيها.",
        "تأكد من الموديل وتوافق كل إكسسوار وياه.",
      ],
      cta: "خلّ نحچي عن اختياراتك",
    },
    guide: {
      eyebrow: "ثلاث خطوات لاختيار أوضح",
      title: "أجهزة وإكسسوارات تشتغل سوا.",
      steps: [
        {
          title: "اعرف أولوياتك",
          text: "حدّد ميزانية مريحة واثنين أو ثلاثة من الخصائص اللي تستخدمها أكثر. كثرة المواصفات مو دائماً تعني اختيار أنسب.",
        },
        {
          title: "قارن المجموعة كاملة",
          text: "فكّر بالموبايل والشاحن والكيبل والكفر سوا. راجع أسماء الموديلات ونوع المنافذ وشنو يجي داخل العلبة قبل إضافة الإكسسوارات.",
        },
        {
          title: "تأكد قبل الشراء",
          text: "عند البائع الفعلي، تأكد من النسخة ودعم الشبكات وتحديثات النظام وشروط الكفالة المكتوبة. المواصفات التجريبية هنا ما تثبت التوافق.",
        },
      ],
    },
    faqTitle: "كم شغلة يفيدك تعرفها.",
    faqs: [
      {
        question: "هذه الأجهزة حقيقية وأكدر أطلبها؟",
        answer:
          "لا. كونكت متجر افتراضي للعرض. أسماء المنتجات والمواصفات والرسومات والأسعار أمثلة فقط. النموذج ما يستلم طلبات ولا يسحب مبالغ ولا يرتّب توصيل.",
      },
      {
        question: "شلون تشتغل السلة التجريبية؟",
        answer:
          "أضف المنتج وغيّر كميته أو احذفه، وبعدين جرّب معاينة إتمام الطلب. السلة تبقى بجلسة الصفحة الحالية وتنمسح إذا أعدت تحميلها. ما ينطلب أي منتج فعلياً.",
      },
      {
        question: "هذه الإكسسوارات تناسب موبايلي؟",
        answer:
          "المنتجات افتراضية، ومواصفاتها ما تثبت توافقاً حقيقياً. عند شراء إكسسوار فعلي، طابق موديل جهازك بالضبط ونوع المنفذ ومتطلبات الطاقة ويا البائع.",
      },
      {
        question: "شنو يصير باستفساري؟",
        answer:
          "النموذج يتحقق من الحقول المطلوبة ويعرض تأكيداً تجريبياً. بياناتك ما تنرسل لفريق مبيعات ولا تنحفظ بهذا النموذج.",
      },
    ],
    contact: {
      eyebrow: "خلّ نلقى اللي يناسبك",
      title: "شنو تتمنّى من جهازك الجاي؟",
      text: "أول موبايل، مساحة أكثر لصورك، أو إكسسوار مناسب. جرّب تحچيلنا عن الأشياء اللي تهمّك من خلال النموذج التوضيحي.",
      name: "اسمك",
      email: "البريد الإلكتروني",
      message: "شنو المنتج اللي تدور عليه؟",
      submit: "جرّب نموذج الاستفسار",
      note: "للتجربة فقط. ما تنرسل رسالة ولا تنحفظ بياناتك.",
      success: {
        title: "هكذا تكون خطوتك الجاية.",
        text: "وصلت لنهاية تجربة الاستفسار. ما انرسلت رسالة وما انحجز أي جهاز.",
        again: "جرّب استفسار ثاني",
      },
    },
    cart: {
      title: "سلتك التجريبية",
      empty: "ابدأ بالموبايل أو الإكسسوار اللي يعجبك.",
      subtotal: "المجموع الفرعي التوضيحي",
      remove: "حذف",
      increase: "زيادة الكمية",
      decrease: "تقليل الكمية",
      checkout: "معاينة إتمام الطلب",
      note: "الأسعار للتجربة فقط. ماكو طلب أو دفع أو توصيل أو حجز فعلي.",
      done: "هذه تجربة إتمام الطلب.",
      doneText: "وصلت للتأكيد التوضيحي. ما اشتريت أي منتج وما انطلب منك دفع.",
      continue: "كمّل استكشاف",
      item: "منتجات بالسلة",
    },
    footer:
      "كونكت علامة افتراضية للموبايلات والإكسسوارات، صُممت لعرض نموذج متجر إلكتروني.",
    top: "الرجوع للأعلى",
  },
};
