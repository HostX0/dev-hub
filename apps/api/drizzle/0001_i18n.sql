ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "title_en" varchar(160) DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "tagline_en" varchar(240) DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "description_en" text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "title_en" varchar(160) DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "description_en" text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "features_en" jsonb DEFAULT '[]'::jsonb NOT NULL;
