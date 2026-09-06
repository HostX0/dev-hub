ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "title_ckb" varchar(160) DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "tagline_ckb" varchar(240) DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "description_ckb" text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "client_ckb" varchar(120) DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "title_ckb" varchar(160) DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "description_ckb" text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "features_ckb" jsonb DEFAULT '[]'::jsonb NOT NULL;
--> statement-breakpoint
UPDATE settings SET data = data || '{"phone": "+964 770 854 0899", "location": "بغداد، القادسية، بناية مركز الشام، الطابق الثالث، شقة 6، محافظة بغداد 10011، العراق", "locationEn": "Baghdad, Al Qadisiyah, Sham Center Building, Floor 3, Apartment 6, Baghdad, Baghdad Governorate 10011, IQ", "locationCkb": "بەغدا، قادسیە، بینای ناوەندی شام، نهۆمی سێیەم، شوقەی 6، پارێزگای بەغدا 10011، عێراق"}'::jsonb, updated_at = now() WHERE id = 1;
--> statement-breakpoint
UPDATE settings SET data = jsonb_set(data, '{whatsapp}', '""'::jsonb) WHERE data->>'whatsapp' ~* 'x';
--> statement-breakpoint
UPDATE services SET title_ckb = 'پەرەپێدانی نەرمەکاڵا و پلاتفۆرمی دیجیتاڵ' WHERE title = 'تطوير البرمجيات والمنصات الرقمية' AND title_ckb = '';
--> statement-breakpoint
UPDATE services SET description_ckb = 'پلاتفۆرمی وێب و سیستەمی تایبەت دیزاین و دروست دەکەین کە بە وردی لەگەڵ شێوازی کاری ئێوە بگونجێن: لە ماڵپەڕی خێراوە تا سیستەمی ئاڵۆزی دامەزراوەکان، بە بنیاتێکی نوێ کە توانای فراوانبوونی هەیە.' WHERE description = 'نصمّم ونبني منصات ويب وأنظمة مخصصة تناسب طبيعة أعمالكم بدقة: من المواقع عالية الأداء إلى الأنظمة المؤسسية المعقدة، بمعمارية حديثة قابلة للتوسع.' AND description_ckb = '';
--> statement-breakpoint
UPDATE services SET features_ckb = '["Next.js / React / NestJS", "سیستەمی بەڕێوەبردن و ERP بەپێی پێویستیت", "ڕووکاری بەرنامەسازیی REST و GraphQL", "ئەدای بەرز و باشترکردن بۆ بزوێنەرەکانی گەڕان"]'::jsonb WHERE features = '["Next.js / React / NestJS", "أنظمة إدارية و ERP مخصصة", "واجهات برمجية REST و GraphQL", "أداء وSEO على أعلى مستوى"]'::jsonb AND features_ckb = '[]'::jsonb;
--> statement-breakpoint
UPDATE services SET title_ckb = 'چارەسەرەکانی هۆشی دەستکرد' WHERE title = 'حلول الذكاء الاصطناعي' AND title_ckb = '';
--> statement-breakpoint
UPDATE services SET description_ckb = 'بریکاری هۆشی دەستکرد، یارمەتیدەری گفتوگۆ و سیستەمی RAG دروست دەکەین کە پشت بە داتای خودی کۆمپانیاکەتان دەبەستن. هەروەها چارەسەری زیرەکیی بەڵگەنامە پەرە پێ دەدەین کە بە عەرەبی و ئینگلیزی، خۆکارانە دەخوێننەوە، داتا دەردەهێنن و پوختەی دەکەنەوە.' WHERE description = 'نطوّر وكلاء ذكاء اصطناعي ومساعدين محادثة وأنظمة RAG تستند إلى بيانات شركتكم، وحلول ذكاء المستندات التي تقرأ وتستخرج وتلخّص تلقائياً — بالعربية والإنجليزية.' AND description_ckb = '';
--> statement-breakpoint
UPDATE services SET features_ckb = '["بریکاری هۆشی دەستکرد و یارمەتیدەری گفتوگۆ", "یارمەتیدەری RAG بە پشتبەستن بە بەڵگەنامەکانت", "زیرەکیی بەڵگەنامە و دەرهێنانی داتا", "OpenAI / Claude / LangChain"]'::jsonb WHERE features = '["وكلاء ذكاء اصطناعي ومساعدون محادثة", "مساعدون RAG على وثائق الشركة", "ذكاء المستندات واستخراج البيانات", "OpenAI / Claude / LangChain"]'::jsonb AND features_ckb = '[]'::jsonb;
--> statement-breakpoint
UPDATE services SET title_ckb = 'خۆکارکردنی کار و پەیوەستکردنی سیستەمەکان' WHERE title = 'أتمتة الأعمال والتكاملات' AND title_ckb = '';
--> statement-breakpoint
UPDATE services SET description_ckb = 'کارە دووبارەبووەکان خۆکار دەکەین و سیستەمەکانتان پێکەوە دەبەستین: ڕەوتی کاری n8n و Make و Zapier، خۆکارکردنی پرۆسە بە ڕۆبۆت (RPA) و پەیوەستکردنی WhatsApp و CRM و ERP، بۆ ئەوەی کاتی تیمەکەتان بپارێزرێت و هەڵەی دەستی نەهێڵرێت.' WHERE description = 'نؤتمت العمليات المتكررة ونربط أنظمتكم ببعضها: مسارات n8n وMake وZapier، أتمتة العمليات الروبوتية RPA، وتكاملات واتساب وCRM وERP، لتوفير الوقت والقضاء على الأخطاء اليدوية.' AND description_ckb = '';
--> statement-breakpoint
UPDATE services SET features_ckb = '["ڕەوتی کاری n8n / Make / Zapier", "خۆکارکردنی پرۆسە بە ڕۆبۆت (RPA)", "پەیوەستکردنی WhatsApp و CRM و ERP", "چاودێری و ئاگادارکردنەوەی دەستبەجێ"]'::jsonb WHERE features = '["n8n / Make / Zapier", "أتمتة العمليات الروبوتية RPA", "تكامل واتساب و CRM و ERP", "مراقبة وتنبيهات فورية"]'::jsonb AND features_ckb = '[]'::jsonb;
--> statement-breakpoint
UPDATE services SET title_ckb = 'ئەپی مۆبایل' WHERE title = 'تطبيقات الجوال' AND title_ckb = '';
--> statement-breakpoint
UPDATE services SET description_ckb = 'ئەپی iOS و Android بە ئەزموونێکی ڕەوان کە هەستی ئەپی ڕەسەنی سیستەمەکە دەبەخشێت، بە تەواوی پەیوەست بە ڕووکارە بەرنامەسازییەکان و داشبۆردەکانتان؛ لە دیزاینەوە تا بڵاوکردنەوە لە App Store و Google Play.' WHERE description = 'تطبيقات iOS وAndroid بتجربة أصلية سلسة، مرتبطة بالكامل مع الواجهات البرمجية ولوحات التحكم، من التصميم حتى النشر على المتاجر.' AND description_ckb = '';
--> statement-breakpoint
UPDATE services SET features_ckb = '["Flutter / React Native", "ئاگادارکردنەوەی دەستبەجێ و پارەدانی ئەلیکترۆنی", "کارکردن بەبێ ئینتەرنێت و هاوکاتکردنی خۆکار", "بڵاوکردنەوە لە فرۆشگاکانی ئەپ و پشتیوانیی بەردەوام"]'::jsonb WHERE features = '["Flutter / React Native", "إشعارات فورية ودفع إلكتروني", "عمل دون اتصال مع مزامنة تلقائية", "نشر ومتابعة على المتاجر"]'::jsonb AND features_ckb = '[]'::jsonb;
--> statement-breakpoint
UPDATE services SET title_ckb = 'پلاتفۆرمی داتا و داشبۆرد' WHERE title = 'منصات البيانات ولوحات التحكم' AND title_ckb = '';
--> statement-breakpoint
UPDATE services SET description_ckb = 'داتا پەرتەوازەکانتان دەکەینە داشبۆردی ڕوون و ڕاپۆرتی زیندوو کە یارمەتیی بڕیاردان دەدەن: ڕەوتی پرۆسەکردنی داتا، کۆگای داتا و پێوەری ئەدای کارلێککەر.' WHERE description = 'نحوّل بياناتكم المتفرقة إلى لوحات تحكم واضحة وتقارير لحظية تدعم اتخاذ القرار: خطوط معالجة بيانات، مستودعات، ومؤشرات أداء تفاعلية.' AND description_ckb = '';
--> statement-breakpoint
UPDATE services SET features_ckb = '["داشبۆردی زیندوو و کارلێککەر", "ڕەوتی پرۆسەکردن و پێکەوەخستنی داتا", "ڕاپۆرتی خشتەکراو و هەناردەکراو", "پێشبینی و شیکردنەوە بە یارمەتیی هۆشی دەستکرد"]'::jsonb WHERE features = '["لوحات تحكم لحظية وتفاعلية", "خطوط معالجة ودمج البيانات", "تقارير مجدولة وقابلة للتصدير", "تنبؤات وتحليلات مدعومة بالذكاء الاصطناعي"]'::jsonb AND features_ckb = '[]'::jsonb;
--> statement-breakpoint
UPDATE services SET title_ckb = 'هەور، DevOps و ئاسایش' WHERE title = 'السحابة و DevOps والأمان' AND title_ckb = '';
--> statement-breakpoint
UPDATE services SET description_ckb = 'سیستەمەکانتان بە شێوەیەکی پیشەیی بڵاو دەکەینەوە، بەڕێوە دەبەین و چاودێرییان دەکەین: ژێرخانی هەوری، کۆنتەینەری Docker و Kubernetes، ڕەوتی CI/CD، کۆپیی یەدەگ و پاراستنی سەرتاسەری.' WHERE description = 'نشر وتشغيل ومراقبة أنظمتكم باحترافية: بنية تحتية سحابية، حاويات Docker وKubernetes، خطوط CI/CD، نسخ احتياطي، وتأمين شامل.' AND description_ckb = '';
--> statement-breakpoint
UPDATE services SET features_ckb = '["AWS / Docker / Kubernetes", "ڕەوتی خۆکاری CI/CD", "چاودێری و کۆپیی یەدەگی خۆکار", "بەهێزکردنی ئاسایش و پاراستنی سەرتاسەری"]'::jsonb WHERE features = '["AWS / Docker / Kubernetes", "خطوط CI/CD آلية", "مراقبة ونسخ احتياطي تلقائي", "تأمين وحماية شاملة"]'::jsonb AND features_ckb = '[]'::jsonb;
--> statement-breakpoint
UPDATE projects SET title_ckb = 'ئۆفیسی پارێزەریی ڕافیدەین — ماڵپەڕ' WHERE title = 'مكتب الرافدين للمحاماة والاستشارات القانونية' AND title_ckb = '' AND slug = 'rafidain-law-website';
--> statement-breakpoint
UPDATE projects SET tagline_ckb = 'ماڵپەڕێکی عەرەبی و ئینگلیزی بۆ ئۆفیسێکی پارێزەری لە بەغدا، لەگەڵ حجزکردنی ڕاوێژ' WHERE tagline = 'موقع ثنائي اللغة يعكس مكانة المكتب ويحوّل الزوار إلى عملاء' AND tagline_ckb = '' AND slug = 'rafidain-law-website';
--> statement-breakpoint
UPDATE projects SET description_ckb = 'ماڵپەڕێکی جوان بە دوو زمانی عەرەبی و ئینگلیزی بۆ ئۆفیسێکی پارێزەری لە بەغدا، بە ناسنامەیەکی بینراوی ڕەزین کە لەگەڵ پیشەکە بگونجێت. بوارەکانی کارکردنی ئۆفیسەکە پیشان دەدات، لەوانە یاسای بازرگانی، خانووبەرە، کۆمپانیاکان، باری کەسێتی و ناوبژیوانی. پەڕەی ناساندنی هاوبەش و پارێزەرەکان و وتار و پوختەی یاسایی تێدایە کە بۆ بزوێنەرەکانی گەڕان باشتر کراون. سەردانکەران دەتوانن بە هەڵبژاردنی پارێزەر و کات، ڕاوێژێکی یاسایی ئۆنلاین حجز بکەن و دەستبەجێ لە ڕێگەی WhatsApp و ئیمەیڵ پشتڕاستکردنەوە وەربگرن. بە Next.js دروست کراوە و سیستەمی بەڕێوەبردنی ناوەڕۆکی هەیە، بۆ ئەوەی ستافی ئۆفیسەکە بەبێ پێویستی بە بەرنامەساز، وتار و پەڕەی تیمەکە نوێ بکەنەوە.' WHERE description = 'موقع إلكتروني أنيق ثنائي اللغة (عربي/إنجليزي) لمكتب محاماة في بغداد، بهوية بصرية رصينة تليق بالمهنة. يعرض مجالات الممارسة (القانون التجاري، العقاري، الشركات، الأحوال الشخصية، التحكيم)، وصفحات تعريفية للمحامين والشركاء، ومقالات ونشرات قانونية محسّنة لمحركات البحث. يتيح للزوار حجز استشارة قانونية إلكترونياً مع اختيار المحامي والموعد، مع تأكيد فوري عبر واتساب والبريد الإلكتروني. مبني على Next.js مع نظام إدارة محتوى يسمح لفريق المكتب بتحديث المقالات والفريق دون الحاجة لمبرمج.' AND description_ckb = '' AND slug = 'rafidain-law-website';
--> statement-breakpoint
UPDATE projects SET client_ckb = 'ئۆفیسی پارێزەریی ڕافیدەین' WHERE client = 'مكتب الرافدين للمحاماة' AND client_ckb = '' AND slug = 'rafidain-law-website';
--> statement-breakpoint
UPDATE projects SET title_ckb = 'سیستەمی بەڕێوەبردنی ئۆفیسی پارێزەریی ڕافیدەین' WHERE title = 'نظام إدارة مكتب الرافدين للمحاماة' AND title_ckb = '' AND slug = 'rafidain-law-dashboard';
--> statement-breakpoint
UPDATE projects SET tagline_ckb = 'داشبۆردێکی عەرەبی بۆ بەڕێوەبردنی کەیس، دانیشتنی دادگا، موەکیل و پسوڵەکان' WHERE tagline = 'لوحة تحكم عربية لإدارة القضايا والجلسات والعملاء والفواتير' AND tagline_ckb = '' AND slug = 'rafidain-law-dashboard';
--> statement-breakpoint
UPDATE projects SET description_ckb = 'سیستەمێکی تەواوی بەڕێوەبردن بە زمانی عەرەبی و ئاراستەی ڕاست بۆ چەپ، بۆ کارە ڕۆژانەکانی ئۆفیسی پارێزەری: فایلەکانی کەیس و قۆناغەکانیان لە دادگاکانی عێراق، ڕۆژژمێری دانیشتنەکانی دادگا لەگەڵ بیرخستنەوەی خۆکار بۆ پارێزەر و موەکیل لە ڕێگەی WhatsApp و پەیامی کورت، تۆماری موەکیلەکان، ئەرشیفکردنی پارێزراوی بەڵگەنامە و گرێبەست و وەکالەتنامەکان، دەرکردنی پسوڵە و بەدواداچوونی کرێی پارێزەری و پارەدان بە دیناری عێراقی. سیستەمەکە ئاستی دەسەڵاتی جیاواز بۆ هاوبەش، پارێزەر، سکرتێر و ژمێریاری دابین دەکات و ڕاپۆرتی مانگانەی کەیس، داهات و ئەدای تیم دەردەکات.' WHERE description = 'نظام إداري متكامل باللغة العربية (RTL) لإدارة العمل اليومي لمكتب المحاماة: ملفات القضايا ومراحلها أمام المحاكم العراقية، تقويم جلسات المحاكم مع تذكيرات تلقائية للمحامين والموكلين عبر واتساب والرسائل النصية، سجل العملاء والموكلين، أرشفة المستندات والعقود والوكالات بشكل آمن، وإصدار الفواتير وتتبع الأتعاب والمدفوعات بالدينار العراقي. يوفر النظام صلاحيات متعددة (شريك، محامٍ، سكرتارية، محاسبة) وتقارير شهرية عن القضايا والإيرادات وأداء الفريق.' AND description_ckb = '' AND slug = 'rafidain-law-dashboard';
--> statement-breakpoint
UPDATE projects SET client_ckb = 'ئۆفیسی پارێزەریی ڕافیدەین' WHERE client = 'مكتب الرافدين للمحاماة' AND client_ckb = '' AND slug = 'rafidain-law-dashboard';
--> statement-breakpoint
UPDATE projects SET title_ckb = 'سوق بابل — فرۆشگای ئەلیکترۆنی' WHERE title = 'سوق بابل — متجر إلكتروني' AND title_ckb = '' AND slug = 'souq-babil-store';
--> statement-breakpoint
UPDATE projects SET tagline_ckb = 'فرۆشگایەکی ئۆنلاینی عێراقی بە نرخی دینار و گەیاندن بۆ هەموو پارێزگاکان' WHERE tagline = 'متجر إلكتروني عراقي بالدينار مع توصيل لجميع المحافظات' AND tagline_ckb = '' AND slug = 'souq-babil-store';
--> statement-breakpoint
UPDATE projects SET description_ckb = 'فرۆشگایەکی ئەلیکترۆنیی خێرای عێراقی کە بۆ بزوێنەرەکانی گەڕان باشتر کراوە و هەزاران بەرهەم بە نرخی دیناری عێراقی پیشان دەدات، لەگەڵ گەڕانی زیرەک، پۆلێنکردن و ئۆفەری وەرزی. گەیاندن بۆ هەموو پارێزگاکانی عێراق دابین دەکات و کرێی گەیاندن بەپێی پارێزگا خۆکارانە هەژمار دەکات. شێوازەکانی پارەدان لەگەڵ بازاڕی ناوخۆ دەگونجێن: پارەدان لە کاتی وەرگرتن، ZainCash، کارتی Qi Card و Mastercard. سەبەتەی کڕین، تەواوکردنی داواکاری، هەژماری کڕیار، بەدواداچوونی داواکاری و ئاگادارکردنەوەی WhatsApp لە هەر گۆڕانێکی دۆخی داواکاری تێدایە. بە Next.js و NestJS و PostgreSQL لەسەر بنیاتێکی فراوانبوو دروست کراوە کە بەرگەی قەرەباڵغیی وەرزەکانی زۆریی داواکاری دەگرێت.' WHERE description = 'متجر إلكتروني عراقي سريع ومحسّن لمحركات البحث يعرض آلاف المنتجات بأسعار بالدينار العراقي، مع بحث ذكي وتصنيفات وعروض موسمية. يدعم التوصيل إلى جميع المحافظات العراقية مع حساب رسوم التوصيل تلقائياً حسب المحافظة، وطرق الدفع المناسبة للسوق المحلي: الدفع عند الاستلام، زين كاش، وبطاقات كي كارد وماستر كارد. يتضمن سلة شراء وحسابات عملاء وتتبع الطلبات وتنبيهات عبر واتساب عند تغيّر حالة الطلب. مبني على Next.js وNestJS وPostgreSQL بمعمارية قابلة للتوسع تتحمل مواسم الذروة.' AND description_ckb = '' AND slug = 'souq-babil-store';
--> statement-breakpoint
UPDATE projects SET client_ckb = 'سوق بابل' WHERE client = 'سوق بابل' AND client_ckb = '' AND slug = 'souq-babil-store';
--> statement-breakpoint
UPDATE projects SET title_ckb = 'پانێڵی بەڕێوەبردنی سوق بابل' WHERE title = 'لوحة إدارة سوق بابل' AND title_ckb = '' AND slug = 'souq-babil-admin';
--> statement-breakpoint
UPDATE projects SET tagline_ckb = 'بەڕێوەبردنی داواکاری بەپێی پارێزگا، کۆگا، گەیەنەر، گەڕاندنەوە و ڕاپۆرتی فرۆشتن' WHERE tagline = 'إدارة الطلبات حسب المحافظة والمخزون والمندوبين والتقارير' AND tagline_ckb = '' AND slug = 'souq-babil-admin';
--> statement-breakpoint
UPDATE projects SET description_ckb = 'پانێڵێکی عەرەبی بۆ بەڕێوەبردنی فرۆشگای سوق بابل: بەدواداچوونی داواکارییەکان بەپێی پارێزگا و دۆخی گەیاندن، بەڕێوەبردنی بەرهەم و پۆل و ئۆفەر، چاودێریی کۆگا لەگەڵ ئاگادارکردنەوەی کەمبوونەوەی کاڵا، دابەشکردنی داواکاری بەسەر گەیەنەر و کۆمپانیاکانی گەیاندندا لەگەڵ بەدواداچوونی ڕادەستکردن و وەرگرتنی پارەی نەقد، هەروەها مامەڵەکردن لەگەڵ گەڕاندنەوە و گۆڕینەوەی کاڵا. ڕاپۆرتی ڕۆژانە و مانگانەی فرۆشتن بەپێی پارێزگا و پۆل و بەرهەم، ڕاپۆرتی کۆکردنەوەی پارەدانی کاتی وەرگرتن، و ئاستی دەسەڵاتی تایبەت بۆ تیمەکانی فرۆشتن و کۆگا و گەیاندن دابین دەکات.' WHERE description = 'لوحة إدارة عربية لتشغيل متجر سوق بابل: متابعة الطلبات حسب المحافظة وحالة التوصيل، إدارة المنتجات والتصنيفات والعروض، مراقبة المخزون مع تنبيهات النفاد، توزيع الطلبات على مندوبي التوصيل وشركات الشحن مع تتبع التسليم والتحصيل النقدي، ومعالجة المرتجعات والاستبدال. تتضمن تقارير مبيعات يومية وشهرية حسب المحافظة والفئة والمنتج، وتقارير تحصيل لمبالغ الدفع عند الاستلام، مع صلاحيات مخصصة لفرق المبيعات والمستودع والتوصيل.' AND description_ckb = '' AND slug = 'souq-babil-admin';
--> statement-breakpoint
UPDATE projects SET client_ckb = 'سوق بابل' WHERE client = 'سوق بابل' AND client_ckb = '' AND slug = 'souq-babil-admin';
--> statement-breakpoint
UPDATE projects SET title_ckb = 'ئەپی سوق بابل' WHERE title = 'تطبيق سوق بابل' AND title_ckb = '' AND slug = 'souq-babil-app';
--> statement-breakpoint
UPDATE projects SET tagline_ckb = 'ئەپی کڕین بۆ iOS و Android، لەگەڵ بەدواداچوونی داواکاری و ئاگادارکردنەوە' WHERE tagline = 'تطبيق تسوّق لنظامي iOS وAndroid مع تتبع الطلبات والإشعارات' AND tagline_ckb = '' AND slug = 'souq-babil-app';
--> statement-breakpoint
UPDATE projects SET description_ckb = 'ئەپی کڕین بۆ iOS و Android کە ئەزموونێکی ڕەوانی کڕین لە مۆبایل بۆ کڕیارانی سوق بابل دابین دەکات: گەڕان بەناو بەرهەم و ئۆفەرەکاندا، گەڕانی دەستبەجێ، لیستی دڵخوازەکان، سەبەتەی کڕین و پارەدان بە ZainCash یان کارت یان لە کاتی وەرگرتن، لەگەڵ بەدواداچوونی هەنگاو بە هەنگاوی داواکاری لە پشتڕاستکردنەوە تا گەیاندن. ئەپەکە لە هەر گۆڕانێکی دۆخی داواکاری و لە کاتی ئۆفەری نوێ ئاگادارکردنەوەی دەستبەجێ دەنێرێت، چوونەژوورەوە بە ژمارەی مۆبایلی عێراقی و کۆدی پشتڕاستکردنەوە دابین دەکات و بەهۆی هەڵگرتنی کاتیی بەرهەم و وێنەکان، لەسەر ئینتەرنێتی لاوازیش بە باشی کار دەکات. بە Flutter دروست کراوە و بە تەواوی بە ڕووکاری بەرنامەسازیی فرۆشگاکەوە پەیوەستە.' WHERE description = 'تطبيق تسوّق لنظامي iOS وAndroid يمنح عملاء سوق بابل تجربة شراء سلسة من الهاتف: تصفح المنتجات والعروض، بحث فوري، قوائم مفضلة، سلة شراء ودفع عبر زين كاش أو البطاقات أو الدفع عند الاستلام، وتتبع الطلب خطوة بخطوة من التأكيد حتى التسليم. يرسل التطبيق إشعارات فورية عند تغيّر حالة الطلب وعند العروض الجديدة، ويدعم تسجيل الدخول برقم الهاتف العراقي مع رمز التحقق، ويعمل بكفاءة على الاتصال الضعيف مع تخزين مؤقت للمنتجات والصور. مبني بـ Flutter ومرتبط بالكامل بالواجهة البرمجية للمتجر.' AND description_ckb = '' AND slug = 'souq-babil-app';
--> statement-breakpoint
UPDATE projects SET client_ckb = 'سوق بابل' WHERE client = 'سوق بابل' AND client_ckb = '' AND slug = 'souq-babil-app';
--> statement-breakpoint
UPDATE projects SET title_ckb = 'ئەکادیمیای دیجڵە — پلاتفۆرمی فێربوونی ئەلیکترۆنی' WHERE title = 'أكاديمية دجلة — منصة تعليم إلكتروني' AND title_ckb = '' AND slug = 'dijla-academy';
--> statement-breakpoint
UPDATE projects SET tagline_ckb = 'کۆرس، پۆلی ڕاستەوخۆ، تاقیکردنەوە و بڕوانامە بۆ قوتابیانی عێراق' WHERE tagline = 'دورات وفصول مباشرة وامتحانات وشهادات لطلاب العراق' AND tagline_ckb = '' AND slug = 'dijla-academy';
--> statement-breakpoint
UPDATE projects SET description_ckb = 'پلاتفۆرمێکی تەواوی فێربوونی ئەلیکترۆنی بۆ قوتابیانی قوتابخانە و زانکۆ لە عێراق: کۆرسی تۆمارکراو و گونجاو لەگەڵ بەرنامەی خوێندن، پۆلی ڕاستەوخۆی کارلێککەر، ئەرک و تاقیکردنەوەی ئەلیکترۆنی بە ڕاستکردنەوەی خۆکار و بڕوانامەی تەواوکردن کە دەتوانرێت ڕەسەنایەتییەکەی بپشکنرێت. داشبۆردێک بۆ مامۆستا بۆ بەڕێوەبردنی وانە و قوتابی و نمرەکان، ڕووکارێک بۆ دایک و باوک بۆ بەدواداچوونی ئامادەبوون و پێشکەوتنی خوێندن، و پارەدانی بەشداریکردن بە ZainCash و کارت دابین دەکات. پلاتفۆرمەکە بۆ کارکردنی باش لەسەر ئینتەرنێتی لاواز دیزاین کراوە، بە پەخشی ڤیدیۆی گونجاو لەگەڵ خێرایی پەیوەندی، و خزمەت بە هەزاران قوتابی لە بەغدا و هەولێر و پارێزگاکانی دیکە دەکات.' WHERE description = 'منصة تعليم إلكتروني متكاملة لطلاب المدارس والجامعات في العراق: دورات مسجلة ومنهجية، فصول مباشرة تفاعلية، واجبات وامتحانات إلكترونية بتصحيح تلقائي، وشهادات إتمام قابلة للتحقق. يوفر النظام لوحة للمعلم لإدارة الدروس والطلاب والدرجات، وواجهة لولي الأمر لمتابعة الحضور والتقدم الدراسي، مع دفع الاشتراكات عبر زين كاش والبطاقات. صُمّمت المنصة لتعمل بكفاءة على الاتصال الضعيف مع بث تكيّفي للفيديو، وتخدم آلاف الطلاب في بغداد وأربيل والمحافظات الأخرى.' AND description_ckb = '' AND slug = 'dijla-academy';
--> statement-breakpoint
UPDATE projects SET client_ckb = 'ئەکادیمیای دیجڵە' WHERE client = 'أكاديمية دجلة' AND client_ckb = '' AND slug = 'dijla-academy';
--> statement-breakpoint
UPDATE projects SET title_ckb = 'عیادتی — ئەپی حجزکردنی کاتی پزیشک' WHERE title = 'عيادتي — تطبيق حجز مواعيد الأطباء' AND title_ckb = '' AND slug = 'ayadati-app';
--> statement-breakpoint
UPDATE projects SET tagline_ckb = 'پزیشکەکەت لە بەغدا و بەسرە بدۆزەوە و لە مۆبایلەکەتەوە کات حجز بکە' WHERE tagline = 'ابحث عن طبيبك في بغداد والبصرة واحجز موعدك من هاتفك' AND tagline_ckb = '' AND slug = 'ayadati-app';
--> statement-breakpoint
UPDATE projects SET description_ckb = 'ئەپی مۆبایل بۆ حجزکردنی کاتی پزیشک لە بەغدا و بەسرە: گەڕان بۆ پزیشک بەپێی پسپۆڕی و ناوچە و هەڵسەنگاندن، پیشاندانی کاتە بەردەستەکان و حجزکردنی دەستبەجێ، بیرخستنەوەی خۆکار بە ئاگادارکردنەوەی ئەپ و WhatsApp پێش کاتی سەردان، و تۆمارێکی پزیشکیی کەسی بۆ پاراستنی سەردان و ڕەچەتەی ئەلیکترۆنی. پڕۆژەکە ئەپێکی تایبەت بە پزیشک بۆ بەڕێوەبردنی خشتەی کات و نەخۆش و نووسینی ڕەچەتە، لەگەڵ داشبۆردێک بۆ کلینیک و ناوەندە پزیشکییەکان دەگرێتەوە. پارەدان بە ZainCash یان لە کلینیک دابین دەکات و لەسەر iOS و Android کار دەکات.' WHERE description = 'تطبيق جوال لحجز مواعيد الأطباء في بغداد والبصرة: البحث عن الأطباء حسب التخصص والمنطقة والتقييم، عرض المواعيد المتاحة والحجز الفوري، تذكيرات تلقائية عبر الإشعارات وواتساب قبل الموعد، وسجل طبي شخصي يحفظ الزيارات والوصفات الإلكترونية. يتضمن المشروع تطبيقاً للطبيب لإدارة جدوله ومرضاه وكتابة الوصفات، ولوحة تحكم للعيادات والمراكز الطبية. يدعم الدفع عبر زين كاش أو الدفع في العيادة، ويعمل على iOS وAndroid.' AND description_ckb = '' AND slug = 'ayadati-app';
--> statement-breakpoint
UPDATE projects SET client_ckb = 'تۆڕی پزیشکیی عیادتی' WHERE client = 'شبكة عيادتي الطبية' AND client_ckb = '' AND slug = 'ayadati-app';
--> statement-breakpoint
UPDATE projects SET title_ckb = 'ڕەواتب — سیستەمی سەرچاوە مرۆییەکان و مووچە' WHERE title = 'رواتب — نظام الموارد البشرية والرواتب' AND title_ckb = '' AND slug = 'rawatib-saas';
--> statement-breakpoint
UPDATE projects SET tagline_ckb = 'پلاتفۆرمێکی هەوری بۆ بەڕێوەبردنی ئامادەبوون، مۆڵەت و مووچەی کۆمپانیا عێراقییەکان' WHERE tagline = 'منصة سحابية لإدارة الحضور والإجازات والرواتب للشركات العراقية' AND tagline_ckb = '' AND slug = 'rawatib-saas';
--> statement-breakpoint
UPDATE projects SET description_ckb = 'پلاتفۆرمی نەرمەکاڵا وەک خزمەتگوزاری (SaaS) بۆ بەڕێوەبردنی سەرچاوە مرۆییەکان و مووچە، دیزاینکراو بۆ کۆمپانیا عێراقییەکان، بە ژینگەی جیاکراوە بۆ هەر کڕیارێک: فایل و گرێبەستی کارمەندان، تۆمارکردنی هاتن و ڕۆیشتن بە ئەپی مۆبایل و ئامێری پەنجەمۆر، بەڕێوەبردنی مۆڵەت و پەسەندکردنەکان، هەژمارکردنی مووچە بە دیناری عێراقی لەگەڵ پاشکۆ، لێبڕین، پێشەکی و بەشداریی دەستەبەری کۆمەڵایەتی. پلاتفۆرمەکە پسوڵەی مووچەی ئەلیکترۆنی و فایلی گواستنەوەی بانکی دەردەکات، چەندین کۆمپانیا و لق لە ژێر یەک هەژماردا بە ئاستی دەسەڵاتی ورد بەڕێوە دەبات و ڕاپۆرتی تێچووی هێزی کار دابین دەکات کە دەتوانرێت بۆ سیستەمی ژمێریاری هەناردە بکرێت.' WHERE description = 'منصة SaaS متعددة المستأجرين لإدارة الموارد البشرية والرواتب مصممة للشركات العراقية: ملفات الموظفين والعقود، تسجيل الحضور والانصراف عبر التطبيق وأجهزة البصمة، إدارة الإجازات والموافقات، واحتساب الرواتب بالدينار العراقي مع البدلات والخصومات والسلف واشتراكات الضمان الاجتماعي. تُصدر المنصة قسائم رواتب إلكترونية وملفات تحويل بنكي، وتدعم تعدد الشركات والفروع تحت حساب واحد مع صلاحيات دقيقة، وتوفر تقارير تكلفة القوى العاملة وتصديرها إلى النظام المحاسبي.' AND description_ckb = '' AND slug = 'rawatib-saas';
--> statement-breakpoint
UPDATE projects SET client_ckb = 'کۆمپانیای ڕەواتب بۆ تەکنەلۆژیا' WHERE client = 'شركة رواتب للتقنية' AND client_ckb = '' AND slug = 'rawatib-saas';
--> statement-breakpoint
UPDATE projects SET title_ckb = 'کاشێر — سیستەمی هەوریی خاڵی فرۆشتن' WHERE title = 'كاشير — نقاط بيع سحابية' AND title_ckb = '' AND slug = 'kashier-pos-saas';
--> statement-breakpoint
UPDATE projects SET tagline_ckb = 'سیستەمی هەوریی خاڵی فرۆشتن بۆ چێشتخانە و دوکانەکانی عێراق کە بەبێ ئینتەرنێتیش کار دەکات' WHERE tagline = 'نظام نقاط بيع سحابي للمطاعم والمحلات يعمل دون اتصال' AND tagline_ckb = '' AND slug = 'kashier-pos-saas';
--> statement-breakpoint
UPDATE projects SET description_ckb = 'سیستەمێکی هەوریی خاڵی فرۆشتن بۆ چێشتخانە و کافێ و دوکانەکانی عێراق: شاشەیەکی خێرای کاشێر کە بەبێ ئینتەرنێت کار دەکات و کاتێک پەیوەندی دەگەڕێتەوە خۆکارانە داتا هاوکات دەکات، شاشەی چێشتخانە بۆ پیشاندانی داواکاری و بەدواداچوونی ئامادەکردن، بەڕێوەبردنی مێنیو و کۆگا و پێکهاتەی خواردن لەگەڵ ئاگادارکردنەوەی کەمبوونەوە، و وەرگرتنی پارە بە نەقد یان ZainCash یان کارت. چەندین لق لە ژێر یەک هەژماردا بەڕێوە دەبات، پسوڵەی فرۆشتن و وەسڵ چاپ دەکات و ڕاپۆرتی فرۆشتن بەپێی لق و شەفت و کارمەند دابین دەکات، لەگەڵ ئەپێک بۆ خاوەنکار بۆ چاودێریی زیندووی ئەدا لە مۆبایلەوە.' WHERE description = 'نظام نقاط بيع سحابي للمطاعم والمقاهي والمحلات في العراق: شاشة كاشير سريعة تعمل دون اتصال بالإنترنت مع مزامنة تلقائية عند عودة الاتصال، شاشة مطبخ لعرض الطلبات وتتبع التحضير، إدارة القوائم والمخزون والوصفات مع تنبيهات النقص، وقبول الدفع نقداً أو عبر زين كاش والبطاقات. يدعم تعدد الفروع تحت حساب واحد، وطباعة الفواتير والإيصالات، وتقارير مبيعات لكل فرع ووردية وموظف، مع تطبيق للمالك لمتابعة الأداء لحظياً من الهاتف.' AND description_ckb = '' AND slug = 'kashier-pos-saas';
--> statement-breakpoint
UPDATE projects SET client_ckb = 'کاشێر' WHERE client = 'كاشير' AND client_ckb = '' AND slug = 'kashier-pos-saas';
--> statement-breakpoint
UPDATE settings SET data = jsonb_set(data, '{heroTitleCkb}', '"لە بیرۆکەوە بۆ بەرهەم."'::jsonb) WHERE COALESCE(data->>'heroTitleCkb','') = '' AND data->>'heroTitle' IN ('نبني برمجيات وذكاءً اصطناعياً وأتمتة تُسرّع نمو أعمالك','من الأفكار إلى المنتجات.');
--> statement-breakpoint
UPDATE settings SET data = jsonb_set(data, '{heroSubtitleCkb}', '"هاوبەشی نەرمەکاڵای تۆین؛ بیرکردنەوە لە بەرهەم، ڕوونیی دیزاین و وردیی ئەندازیاری لە یەک شوێندا کۆدەکەینەوە. پێکەوە هەنگاوی داهاتوو دروست دەکەین."'::jsonb) WHERE COALESCE(data->>'heroSubtitleCkb','') = '' AND data->>'heroSubtitle' IN ('شركة تقنية عراقية متخصصة في تطوير المنصات الرقمية، حلول الذكاء الاصطناعي، والأتمتة المتقدمة. نخدم الشركات في العراق والمنطقة، ونحوّل أفكاركم إلى منتجات حقيقية تعمل بكفاءة، تُطلق بسرعة، وتنمو مع أعمالكم.','شريكك البرمجي الذي يجمع التفكير بالمنتج، ووضوح التصميم، ودقة التنفيذ في مكان واحد. نبني معك ما هو قادم.');
--> statement-breakpoint
UPDATE settings SET data = jsonb_set(data, '{bioCkb}', '"لە DevsHub.cc باوەڕمان وایە بەرهەمی باش لە تێگەیشتن لە خەڵک و پێداویستییەکانیانەوە دەست پێ دەکات. ستراتیژیی بەرهەم، دیزاینی ئەزموونی بەکارهێنەر و ئەندازیاریی نەرمەکاڵا لە یەک تیمدا کۆدەکەینەوە. لە بەغداوە بۆ هەر شوێنێک کە تۆ لێیت، بە ڕوونی و هاوکاریی نزیک لەگەڵت کار دەکەین، تا بینینەکەت بکەینە بەرهەمێکی ڕوون و بەسوود کە توانای گەشەکردنی هەیە."'::jsonb) WHERE COALESCE(data->>'bioCkb','') = '' AND data->>'bio' IN ('مركز التطوير (Dev Hub) شريككم التقني من الفكرة إلى الإطلاق. من بغداد، نخدم الشركات والمؤسسات في مختلف محافظات العراق والمنطقة. يضم فريقنا الداخلي مهندسي برمجيات ومصممين وخبراء ذكاء اصطناعي يعملون معاً على بناء منصات ويب وتطبيقات جوال وأنظمة مؤسسية قابلة للتوسع. نضع الذكاء الاصطناعي والأتمتة في صميم كل ما نبنيه، لنساعد عملاءنا على خفض التكاليف، تسريع العمليات، واتخاذ قرارات أفضل مبنية على البيانات.','في DevsHub.cc، نؤمن أن المنتجات المميزة تبدأ بفهم الناس وما يحتاجونه. نجمع استراتيجية المنتج، وتصميم تجربة المستخدم، والهندسة البرمجية في فريق واحد. من بغداد إلى كل مكان، نعمل معك بشفافية لنحوّل رؤيتك إلى منتج واضح، مفيد، وقابل للنمو.');
--> statement-breakpoint
UPDATE settings SET data = jsonb_set(data, '{team}', '[{"id": "abdulazeez-noaman", "name": "Abdulazeez Noaman", "role": "شريك مؤسس ورئيس المنتجات", "roleEn": "Co-Founder & Chief Product Officer", "roleCkb": "هاودامەزرێنەر و بەڕێوەبەری باڵای بەرهەم", "focus": "استراتيجية المنتج وتجربة المستخدم", "focusEn": "Product Strategy & User Experience", "focusCkb": "ستراتیژیی بەرهەم و ئەزموونی بەکارهێنەر", "photo": "/brand/team/abdulazeez-noaman.png"}, {"id": "mohammed-saddam", "name": "Mohammed Saddam", "role": "شريك مؤسس ورئيس التقنية", "roleEn": "Co-Founder & Chief Technology Officer", "roleCkb": "هاودامەزرێنەر و بەڕێوەبەری باڵای تەکنەلۆژیا", "focus": "هندسة البرمجيات وتطوير الواجهات والأنظمة", "focusEn": "Software Architecture & Full-Stack Engineering", "focusCkb": "بنیاتی نەرمەکاڵا و ئەندازیاریی ڕووکار و بەشی پشتەوە", "photo": "/brand/team/mohammed-saddam.png"}]'::jsonb) WHERE NOT (data ? 'team');
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/ayadati-cover.svg' WHERE cover_image = '/uploads/seed/ayadati-cover.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/ayadati-cover.webp"'::jsonb THEN '"/uploads/seed/ayadati-cover.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/ayadati-cover.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/ayadati-detail.svg' WHERE cover_image = '/uploads/seed/ayadati-detail.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/ayadati-detail.webp"'::jsonb THEN '"/uploads/seed/ayadati-detail.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/ayadati-detail.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/dijla-cover.svg' WHERE cover_image = '/uploads/seed/dijla-cover.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/dijla-cover.webp"'::jsonb THEN '"/uploads/seed/dijla-cover.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/dijla-cover.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/dijla-detail.svg' WHERE cover_image = '/uploads/seed/dijla-detail.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/dijla-detail.webp"'::jsonb THEN '"/uploads/seed/dijla-detail.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/dijla-detail.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/kashier-cover.svg' WHERE cover_image = '/uploads/seed/kashier-cover.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/kashier-cover.webp"'::jsonb THEN '"/uploads/seed/kashier-cover.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/kashier-cover.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/kashier-detail.svg' WHERE cover_image = '/uploads/seed/kashier-detail.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/kashier-detail.webp"'::jsonb THEN '"/uploads/seed/kashier-detail.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/kashier-detail.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/law-dash-cover.svg' WHERE cover_image = '/uploads/seed/law-dash-cover.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/law-dash-cover.webp"'::jsonb THEN '"/uploads/seed/law-dash-cover.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/law-dash-cover.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/law-dash-detail.svg' WHERE cover_image = '/uploads/seed/law-dash-detail.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/law-dash-detail.webp"'::jsonb THEN '"/uploads/seed/law-dash-detail.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/law-dash-detail.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/law-site-cover.svg' WHERE cover_image = '/uploads/seed/law-site-cover.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/law-site-cover.webp"'::jsonb THEN '"/uploads/seed/law-site-cover.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/law-site-cover.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/law-site-detail.svg' WHERE cover_image = '/uploads/seed/law-site-detail.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/law-site-detail.webp"'::jsonb THEN '"/uploads/seed/law-site-detail.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/law-site-detail.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/rawatib-cover.svg' WHERE cover_image = '/uploads/seed/rawatib-cover.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/rawatib-cover.webp"'::jsonb THEN '"/uploads/seed/rawatib-cover.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/rawatib-cover.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/rawatib-detail.svg' WHERE cover_image = '/uploads/seed/rawatib-detail.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/rawatib-detail.webp"'::jsonb THEN '"/uploads/seed/rawatib-detail.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/rawatib-detail.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/souq-admin-cover.svg' WHERE cover_image = '/uploads/seed/souq-admin-cover.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/souq-admin-cover.webp"'::jsonb THEN '"/uploads/seed/souq-admin-cover.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/souq-admin-cover.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/souq-admin-detail.svg' WHERE cover_image = '/uploads/seed/souq-admin-detail.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/souq-admin-detail.webp"'::jsonb THEN '"/uploads/seed/souq-admin-detail.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/souq-admin-detail.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/souq-app-cover.svg' WHERE cover_image = '/uploads/seed/souq-app-cover.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/souq-app-cover.webp"'::jsonb THEN '"/uploads/seed/souq-app-cover.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/souq-app-cover.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/souq-app-detail.svg' WHERE cover_image = '/uploads/seed/souq-app-detail.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/souq-app-detail.webp"'::jsonb THEN '"/uploads/seed/souq-app-detail.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/souq-app-detail.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/souq-store-cover.svg' WHERE cover_image = '/uploads/seed/souq-store-cover.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/souq-store-cover.webp"'::jsonb THEN '"/uploads/seed/souq-store-cover.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/souq-store-cover.webp"]'::jsonb;
--> statement-breakpoint
UPDATE projects SET cover_image = '/uploads/seed/souq-store-detail.svg' WHERE cover_image = '/uploads/seed/souq-store-detail.webp';
--> statement-breakpoint
UPDATE projects SET gallery = (SELECT COALESCE(jsonb_agg(CASE WHEN value = '"/uploads/seed/souq-store-detail.webp"'::jsonb THEN '"/uploads/seed/souq-store-detail.svg"'::jsonb ELSE value END ORDER BY ordinal), '[]'::jsonb) FROM jsonb_array_elements(gallery) WITH ORDINALITY AS images(value, ordinal)) WHERE gallery @> '["/uploads/seed/souq-store-detail.webp"]'::jsonb;
--> statement-breakpoint
UPDATE settings SET data = jsonb_set(data, '{email}', '"info@devshub.cc"'::jsonb) WHERE id = 1;
