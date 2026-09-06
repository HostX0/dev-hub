import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  integer,
  timestamp,
  jsonb,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 64 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 120 }).notNull().unique(),
  title: varchar('title', { length: 160 }).notNull(),
  titleEn: varchar('title_en', { length: 160 }).default('').notNull(),
  titleCkb: varchar('title_ckb', { length: 160 }).default('').notNull(),
  tagline: varchar('tagline', { length: 240 }).default('').notNull(),
  taglineEn: varchar('tagline_en', { length: 240 }).default('').notNull(),
  taglineCkb: varchar('tagline_ckb', { length: 240 }).default('').notNull(),
  description: text('description').default('').notNull(),
  descriptionEn: text('description_en').default('').notNull(),
  descriptionCkb: text('description_ckb').default('').notNull(),
  category: varchar('category', { length: 60 }).default('web').notNull(),
  tags: jsonb('tags').$type<string[]>().default([]).notNull(),
  liveUrl: text('live_url').default('').notNull(),
  repoUrl: text('repo_url').default('').notNull(),
  coverImage: text('cover_image').default('').notNull(),
  gallery: jsonb('gallery').$type<string[]>().default([]).notNull(),
  featured: boolean('featured').default(false).notNull(),
  published: boolean('published').default(true).notNull(),
  year: integer('year'),
  client: varchar('client', { length: 120 }).default('').notNull(),
  clientCkb: varchar('client_ckb', { length: 120 }).default('').notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 160 }).notNull(),
  titleEn: varchar('title_en', { length: 160 }).default('').notNull(),
  titleCkb: varchar('title_ckb', { length: 160 }).default('').notNull(),
  description: text('description').default('').notNull(),
  descriptionEn: text('description_en').default('').notNull(),
  descriptionCkb: text('description_ckb').default('').notNull(),
  icon: varchar('icon', { length: 60 }).default('Code2').notNull(),
  features: jsonb('features').$type<string[]>().default([]).notNull(),
  featuresEn: jsonb('features_en').$type<string[]>().default([]).notNull(),
  featuresCkb: jsonb('features_ckb').$type<string[]>().default([]).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  email: varchar('email', { length: 160 }).notNull(),
  subject: varchar('subject', { length: 200 }).default('').notNull(),
  body: text('body').notNull(),
  read: boolean('read').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

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
  siteName: string; // Latin brand name, e.g. "Dev Hub"
  siteNameAr: string; // Arabic brand name, e.g. "مركز التطوير"
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
  seedVersion?: number; // bumped by the seeder when demo content is upgraded
};

export const settings = pgTable('settings', {
  id: integer('id').primaryKey(),
  data: jsonb('data').$type<SiteSettings>().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Project = typeof projects.$inferSelect;
export type Service = typeof services.$inferSelect;
export type Message = typeof messages.$inferSelect;
