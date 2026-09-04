export type Project = {
  id: number;
  slug: string;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  category: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  coverImage: string;
  gallery: string[];
  featured: boolean;
  published: boolean;
  year: number | null;
  client: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type Service = {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: string;
  features: string[];
  featuresEn: string[];
  sortOrder: number;
};

export type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  body: string;
  read: boolean;
  createdAt: string;
};

export type Stat = { label: string; labelEn: string; value: string };
export type Testimonial = { name: string; nameEn: string; role: string; roleEn: string; text: string; textEn: string };

export type SiteSettings = {
  siteName: string; // Latin brand name, e.g. "Dev Hub"
  siteNameAr: string; // Arabic brand name, e.g. "مركز التطوير"
  heroTitle: string;
  heroTitleEn: string;
  heroSubtitle: string;
  heroSubtitleEn: string;
  bio: string;
  bioEn: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  locationEn: string;
  socials: { github: string; linkedin: string; twitter: string; instagram: string };
  stats: Stat[];
  stack: string[];
  clients: string[]; // names shown in the "trusted by" strip
  testimonials: Testimonial[];
};

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Dev Hub",
  siteNameAr: "مركز التطوير",
  heroTitle: "نبني برمجيات وذكاءً اصطناعياً وأتمتة تُحرّك أعمالك",
  heroTitleEn: "We build software, AI and automation that move your business",
  heroSubtitle: "",
  heroSubtitleEn: "",
  bio: "",
  bioEn: "",
  email: "",
  phone: "",
  whatsapp: "",
  location: "",
  locationEn: "",
  socials: { github: "", linkedin: "", twitter: "", instagram: "" },
  stats: [],
  stack: [],
  clients: [],
  testimonials: [],
};
