import type { Locale } from "./config";
export const teamCopy: Record<
  Locale,
  {
    eyebrow: string;
    headingLead: string;
    headingAccent: string;
    body: string;
    nav: string;
  }
> = {
  en: {
    eyebrow: "THE PEOPLE BEHIND THE PRODUCT",
    headingLead: "Product vision.",
    headingAccent: "Engineering depth.",
    body: "Two disciplines. One shared commitment to building useful, thoughtful software.",
    nav: "Our founders",
  },
  ar: {
    eyebrow: "الفريق وراء المنتج",
    headingLead: "رؤية للمنتج.",
    headingAccent: "عمق في الهندسة.",
    body: "تخصصان. والتزام واحد ببناء برمجيات مفيدة ومدروسة.",
    nav: "المؤسسون",
  },
  ckb: {
    eyebrow: "ئەو کەسانەی لە پشت بەرهەمەکەن",
    headingLead: "دیدی بەرهەم.",
    headingAccent: "شارەزاییی قوڵی ئەندازیاری.",
    body: "دوو پسپۆڕی. یەک پابەندیی هاوبەش بە دروستکردنی نەرمەکاڵای بەسوود و بیرلێکراوە.",
    nav: "دامەزرێنەران",
  },
};
