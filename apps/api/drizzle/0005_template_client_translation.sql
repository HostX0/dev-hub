-- The upstream six templates predate client_en. Fill only their recognizable default
-- client label during upgrade; custom clients and existing translations stay authoritative.
UPDATE projects SET client_en = 'DevsHub.cc template'
WHERE client_en = '' AND client = 'قالب جاهز — DevsHub.cc'
AND slug IN ('template-company','template-lawyer','template-photographer','template-restaurant','template-clinic','template-realestate');
