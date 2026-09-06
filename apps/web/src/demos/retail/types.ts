export type RetailProduct = {
  id: string;
  category: string;
  name: string;
  description: string;
  specs: string[];
  price: number;
  visual:
    | "fridge"
    | "washer"
    | "oven"
    | "coffee"
    | "vacuum"
    | "ac"
    | "phone"
    | "buds"
    | "watch"
    | "charger"
    | "case";
  color: string;
};
export type RetailContent = {
  brand: string;
  descriptor: string;
  announcement: string;
  nav: [string, string, string];
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    text: string;
    primary: string;
    secondary: string;
    imageAlt: string;
    caption: string;
  };
  benefits: { title: string; text: string }[];
  catalogue: {
    eyebrow: string;
    title: string;
    text: string;
    all: string;
    search: string;
    searchPlaceholder: string;
    sort: string;
    featured: string;
    low: string;
    high: string;
    results: string;
    empty: string;
    reset: string;
    details: string;
    add: string;
    added: string;
    close: string;
    currency: string;
    specTitle: string;
  };
  categories: { id: string; name: string }[];
  products: RetailProduct[];
  story: {
    eyebrow: string;
    title: string;
    text: string;
    points: string[];
    cta: string;
  };
  guide: {
    eyebrow: string;
    title: string;
    steps: { title: string; text: string }[];
  };
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    note: string;
    success: { title: string; text: string; again: string };
  };
  cart: {
    title: string;
    empty: string;
    subtotal: string;
    remove: string;
    increase: string;
    decrease: string;
    checkout: string;
    note: string;
    done: string;
    doneText: string;
    continue: string;
    item: string;
  };
  footer: string;
  top: string;
};
