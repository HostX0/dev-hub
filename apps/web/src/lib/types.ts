import { BRAND_COPY } from "./brand";

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
export type Testimonial = {
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  text: string;
  textEn: string;
};

export type SiteSettings = {
  siteName: string; // Latin brand name, e.g. "DevsHub.cc"
  siteNameAr: string; // Arabic brand name, e.g. "ديفز هب"
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
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  stats: Stat[];
  stack: string[];
  clients: string[]; // names shown in the "trusted by" strip
  testimonials: Testimonial[];
};

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: BRAND_COPY.siteName,
  siteNameAr: BRAND_COPY.siteNameAr,
  heroTitle: BRAND_COPY.heroTitle,
  heroTitleEn: BRAND_COPY.heroTitleEn,
  heroSubtitle: BRAND_COPY.heroSubtitle,
  heroSubtitleEn: BRAND_COPY.heroSubtitleEn,
  bio: BRAND_COPY.bio,
  bioEn: BRAND_COPY.bioEn,
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
