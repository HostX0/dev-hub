-- A one-time conversion: explicit CMS socialLinks (including [] or disabled entries) win.
WITH legacy AS (
  SELECT id, data, COALESCE(data->'socials', '{}'::jsonb) AS socials
  FROM settings WHERE NOT data ? 'socialLinks'
), cleaned AS (
  SELECT id, data, EXISTS (
    SELECT 1 FROM jsonb_each_text(socials) entry
    WHERE entry.value ~* '^https?://(www\.)?(github\.com|linkedin\.com|x\.com|twitter\.com|facebook\.com|instagram\.com)/(in/|company/)?(iosapk|devpoint)/?$'
  ) AS has_demo,
  COALESCE((SELECT jsonb_object_agg(entry.key, CASE
    WHEN entry.value ~* '^https?://(www\.)?(github\.com|linkedin\.com|x\.com|twitter\.com|facebook\.com|instagram\.com)/(in/|company/)?(iosapk|devpoint)/?$' THEN ''
    ELSE entry.value END) FROM jsonb_each_text(socials) entry), '{}'::jsonb) AS socials
  FROM legacy
), company AS (
 SELECT id, data, CASE WHEN has_demo THEN socials || jsonb_build_object(
   'linkedin', COALESCE(NULLIF(socials->>'linkedin', ''), 'https://www.linkedin.com/company/devshub-cc'),
   'facebook', COALESCE(NULLIF(socials->>'facebook', ''), 'https://www.facebook.com/dev.point.iq')
 ) ELSE socials END AS socials FROM cleaned
)
UPDATE settings SET data = company.data || jsonb_build_object('socials', company.socials, 'socialLinks',
 COALESCE((SELECT jsonb_agg(jsonb_build_object('id',entry.key,'platform',entry.key,'label',
 CASE entry.key WHEN 'linkedin' THEN 'LinkedIn' WHEN 'facebook' THEN 'Facebook' WHEN 'github' THEN 'GitHub' WHEN 'twitter' THEN 'X' ELSE initcap(entry.key) END,
 'url',entry.value,'enabled',true) ORDER BY entry.key) FROM jsonb_each_text(company.socials) entry WHERE entry.value <> ''), '[]'::jsonb)
), updated_at = now() FROM company WHERE settings.id = company.id;
--> statement-breakpoint
UPDATE settings SET data = jsonb_set(data, '{team}', (
  SELECT jsonb_agg(COALESCE((SELECT defaults.value FROM jsonb_array_elements('[{"id": "abdulazeez-noaman", "nameEn": "Abdulazeez Noaman", "nameAr": "عبدالعزيز نعمان", "nameCkb": "عەبدولعەزیز نەعمان", "github": "https://github.com/HostX0"}, {"id": "mohammed-saddam", "nameEn": "Mohammed Saddam", "nameAr": "محمد صدام", "nameCkb": "محەمەد سەددام", "github": "https://github.com/hamodywe"}]'::jsonb) defaults WHERE defaults.value->>'id' = members.value->>'id'), '{}'::jsonb) || members.value ORDER BY members.ordinal)
  FROM jsonb_array_elements(data->'team') WITH ORDINALITY AS members(value, ordinal)
)), updated_at = now() WHERE jsonb_typeof(data->'team') = 'array' AND jsonb_array_length(data->'team') > 0;
