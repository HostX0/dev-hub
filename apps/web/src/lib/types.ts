import team from "@/content/team.json";
import { BUSINESS_CONTACT } from "./business";
import { BRAND_COPY } from "./brand";

export type Project = {
  id: number;
  slug: string;
  title: string;
  titleEn: string;
  titleCkb?: string;
  tagline: string;
  taglineEn: string;
  taglineCkb?: string;
  description: string;
  descriptionEn: string;
  descriptionCkb?: string;
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
  clientCkb?: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type Service = {
  id: number;
  title: string;
  titleEn: string;
  titleCkb?: string;
  description: string;
  descriptionEn: string;
  descriptionCkb?: string;
  icon: string;
  features: string[];
  featuresEn: string[];
  featuresCkb?: string[];
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

export type Stat = {
  label: string;
  labelEn: string;
  labelCkb?: string;
  value: string;
};
export type Testimonial = {
  name: string;
  nameEn: string;
  nameCkb?: string;
  role: string;
  roleEn: string;
  roleCkb?: string;
  text: string;
  textEn: string;
  textCkb?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  photo: string;
  role: string;
  roleEn: string;
  roleCkb?: string;
  focus: string;
  focusEn: string;
  focusCkb?: string;
};

export type SiteSettings = {
  team?: TeamMember[];
  siteName: string; // Latin brand name, e.g. "DevsHub.cc"
  siteNameAr: string; // Arabic brand name, e.g. "ديفز هب"
  heroTitle: string;
  heroTitleEn: string;
  heroTitleCkb?: string;
  heroSubtitle: string;
  heroSubtitleEn: string;
  heroSubtitleCkb?: string;
  bio: string;
  bioEn: string;
  bioCkb?: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  locationEn: string;
  locationCkb?: string;
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
  team,
  siteName: BRAND_COPY.siteName,
  siteNameAr: BRAND_COPY.siteNameAr,
  heroTitle: BRAND_COPY.heroTitle,
  heroTitleEn: BRAND_COPY.heroTitleEn,
  heroTitleCkb: BRAND_COPY.heroTitleCkb,
  heroSubtitle: BRAND_COPY.heroSubtitle,
  heroSubtitleEn: BRAND_COPY.heroSubtitleEn,
  heroSubtitleCkb: BRAND_COPY.heroSubtitleCkb,
  bio: BRAND_COPY.bio,
  bioEn: BRAND_COPY.bioEn,
  bioCkb: BRAND_COPY.bioCkb,
  email: BUSINESS_CONTACT.email,
  phone: BUSINESS_CONTACT.phone,
  whatsapp: "",
  location: BUSINESS_CONTACT.location,
  locationEn: BUSINESS_CONTACT.locationEn,
  locationCkb: BUSINESS_CONTACT.locationCkb,
  socials: { github: "", linkedin: "", twitter: "", instagram: "" },
  stats: [],
  stack: [],
  clients: [],
  testimonials: [],
};
