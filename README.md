# DevsHub.cc — Build better together

موقع شركة تقنية حديثة (برمجيات · ذكاء اصطناعي · أتمتة) بثلاث لغات: **عربي (RTL)** و**إنجليزي (LTR)** و**كوردي سوراني (RTL)** مع لوحة تحكم لإدارة المحتوى.

| الطبقة   | التقنية                                                                                                   |
| -------- | --------------------------------------------------------------------------------------------------------- |
| Frontend | Next.js 16 (App Router, Turbopack, Proxy) · React 19 · Tailwind CSS v4 · Motion 13 · Lenis · lucide-react |
| Backend  | NestJS 12 (ESM) · Drizzle ORM · JWT · Multer (رفع الصور)                                                  |
| Database | PostgreSQL 17                                                                                             |
| Infra    | Docker Compose (db + api + web)                                                                           |

## التشغيل السريع (Docker)

```bash
cp .env.example .env      # عدّل كلمات المرور والمنافذ
docker compose up -d --build
```

- الموقع (عربي): http://localhost:3100/ar — (إنجليزي): http://localhost:3100/en — (كوردي): http://localhost:3100/ckb
- الجذر `/` يحوّل تلقائياً حسب لغة المتصفح أو آخر لغة اختارها الزائر (كوكي `dh_locale`).
- الـ API: http://localhost:4100/api (المنفذ من `API_PORT`)
- لوحة التحكم: http://localhost:3100/admin/login

> حساب الأدمن يُنشأ تلقائياً عند أول تشغيل من `ADMIN_USER` / `ADMIN_PASSWORD`.
> يمكن تغيير كلمة المرور لاحقاً من **الإعدادات → تغيير كلمة المرور**.

## التطوير المحلي

```bash
pnpm dev:db                       # PostgreSQL على 5433
pnpm --dir apps/api install && pnpm dev:api    # http://localhost:4000/api
pnpm --dir apps/web install && pnpm dev:web    # http://localhost:3100
```

ملفات البيئة: `apps/api/.env` و `apps/web/.env.local`.

## اللغات الثلاث (i18n)

- المسارات العامة تحت `src/app/[locale]/...` (`ar` افتراضي، `en`، `ckb`). `src/proxy.ts` يحوّل المسارات بدون بادئة لغة.
- نصوص الواجهة الثابتة في `src/i18n/dictionaries/{ar,en,ckb}.ts`. مكوّنات الخادم تستخدم `getDict(locale)` ومكوّنات العميل `useI18n()`.
- المحتوى الديناميكي (الإعدادات، الخدمات، المشاريع) يحمل حقولاً إنجليزية وكوردية اختيارية (`titleEn`, `descriptionEn`, `heroTitleEn`, `titleCkb`, `descriptionCkb`, ...). عند غياب الترجمة يُعرض النص العربي تلقائياً (`src/lib/localize.ts`).
- زر تبديل اللغة في شريط التنقل يحافظ على نفس الصفحة (`/ar/projects` ⇄ `/en/projects` ⇄ `/ckb/projects`).

## الهيكل

```
apps/
  api/            NestJS
    src/db        schema.ts (Drizzle) + migrations runner
    src/auth      JWT login / change password
    src/projects  CRUD المشاريع (عام + أدمن)
    src/services  الخدمات
    src/messages  رسائل نموذج التواصل
    src/settings  إعدادات الموقع (JSON متعدد اللغات)
    src/uploads   رفع الصور -> /uploads
    src/seed      بيانات Dev Hub التجريبية + إنشاء الأدمن + ترقية البيانات القديمة
    drizzle/      ملفات الترحيل SQL (0000_init, 0001_i18n, 0002_sorani_and_contact)
    uploads/seed  الرسومات الأصلية للمشاريع بصيغة SVG مع نص عربي مقروء
  web/            Next.js
    src/proxy.ts               توجيه اللغة
    src/i18n                   القواميس + المزوّد
    src/app/[locale]/(site)    الصفحات العامة: / ، /projects ، /projects/[slug] ، /blog ، /blog/[slug]
    src/app/admin              لوحة التحكم (root layout مستقل)
    src/components/site        Hero + HubVisual · TrustStrip · Services · Capabilities (عروض تفاعلية) · Process · About · Founders · Testimonials · Faq · Contact · Footer
    src/components/ui          Logo, Reveal, Magnetic, Spotlight, BrowserFrame, Marquee, ScrollProgress...
docker-compose.yml
```

## لوحة التحكم

- **المشاريع**: إضافة/تعديل/حذف، محتوى عربي + إنجليزي + كوردي، صورة غلاف + معرض صور، رابط Live Demo، التقنيات، التصنيف (يشمل ذكاء اصطناعي وأتمتة)، مميز/منشور.
- **الخدمات**: عنوان/وصف/مميزات بالعربية والإنجليزية والكوردية + أيقونة.
- **الرسائل**: قراءة/رد/حذف مع عداد غير المقروء.
- **الإعدادات**: اسم العلامة (لاتيني + عربي)، نصوص الرئيسية والنبذة بثلاث لغات، الإحصائيات، التقنيات، العملاء (شريط الثقة)، آراء العملاء، صور المؤسسين ومناصبهم وتخصصاتهم بثلاث لغات، بيانات التواصل، السوشيال، وتغيير كلمة المرور.

## ملاحظات إنتاج

- غيّر `JWT_SECRET` و `POSTGRES_PASSWORD` و `ADMIN_PASSWORD` في `.env`.
- ضع `SEED_DEMO=false` بعد حذف المشاريع التجريبية إن أردت منع إعادة زرعها (وإيقاف ترقية البيانات التجريبية القديمة).
- التمرير السلس (Lenis) يمكن تعطيله بوضع `NEXT_PUBLIC_SMOOTH_SCROLL=off` في بيئة `web` (يتطلب إعادة بناء الصورة).
- الصور المرفوعة محفوظة في Volume باسم `uploads`.
- بيانات الصفحات العامة مخزّنة مؤقتاً (Next cache) وتُحدَّث فوراً بعد أي حفظ من لوحة التحكم عبر `/api/revalidate`.
- ضع Nginx/Caddy أمام `web` مع SSL، ووجّه `/api` و `/uploads` تلقائياً عبر Next rewrites (لا حاجة لتعريض `api` للعامة).

## المقالات والهوية

أربع مقالات بحثية كاملة بثلاث لغات عن التخطيط قبل بناء المنتج، اختيار موقع/PWA/تطبيق أصلي، أمان الإطلاق، وأداء الويب وSEO. تشمل بحثاً وتصنيفات وفهرس قراءة ومصادر أصلية، مع metadata وhreflang وstructured data وsitemap.

- دليل الهوية والحركة والنشر: [docs/BRAND.md](docs/BRAND.md)
- إضافة المقالات ومراجعة المصادر: [docs/CONTENT.md](docs/CONTENT.md)
- فحص المحتوى واللغات: `pnpm --dir apps/web test`

عند النشر، يطبق الـAPI ترحيل `0002_sorani_and_contact` تلقائياً. يتضمن حقول الكوردي والبريد info@devshub.cc والهاتف والعنوان المعتمدين، ويضيف المؤسسين ويصلح مسارات صور المشاريع الأصلية، ويحافظ على النصوص المخصصة والترجمات الموجودة. خذ نسخة احتياطية لقاعدة البيانات ضمن إجراءات النشر المعتادة.
