# Live template demos

Eleven complete, bilingual (Arabic RTL / English LTR) showcase websites that customers can open from the main site. Each has its own identity — palette, typography, layout, navigation and footer — and none of them share DevsHub chrome.

| Slug           | Business                              | Identity                                                    | Notable sections                                            |
| -------------- | ------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `company`      | Rafid Group — contracting & supply    | Navy `#10233F` + amber `#F59E0B` on off-white, IBM Plex Sans Arabic | Services, projects, animated stats, process, team, quote form |
| `lawyer`       | Al-Saadi Law Office                   | Midnight `#0B1220` + gold `#C8A24A`, Playfair Display / Amiri | Practice areas, bio, results counters, FAQ accordion, consultation form |
| `photographer` | Sara Kamel — portfolio                | White editorial, Cormorant / Reem Kufi, oversized type      | Filterable masonry gallery + lightbox, packages, booking form |
| `restaurant`   | Bayt Al-Reef — Iraqi kitchen          | Cream `#FBF3E4` + terracotta `#B4532A` + olive, Fraunces / Lalezar / Rubik | Tabbed menu, chef, gallery, reservation form |
| `clinic`       | Elite Dental Clinic                   | Sky `#F0F9FF` + teal `#0E7490` / `#14B8A6`, Cairo, rounded cards | Quick booking in hero, services with prices, doctors, insurance strip, FAQ, full appointment form |
| `realestate`   | Dar Realty — agency                   | Black `#141414` + lime `#C8F542`, Manrope / Cairo               | Search box, featured listings with price/beds/area, area guides, agents, valuation form |
| `clinic-nawa` | Nawa Clinic / عيادة نواة | Off-white, teal `#19756B` and warm wood; Cormorant / Inter / Tajawal | Care areas, team, approach, FAQ, sample visit-request form without medical-history collection |
| `realestate-sukn` | SUKN / سُكن | Cream `#F5F2EA`, forest green and bronze `#8A6846`; Cormorant / Amiri / Inter / Tajawal | Buy/rent, property-type and area filters; property detail dialog with multiple architectural views; sample viewing request |
| `gym` | PULSE / نبض | Charcoal `#101715` and lime `#CBF36F`; heavy Inter / Tajawal | Training zones, day/style schedule filters, membership selection, sample signup dialog, abstract coaching roles and FAQ |
| `appliances` | MATIN / متين | Warm ivory and forest green `#224D3D`; Cormorant / Inter / Tajawal | Searchable appliance catalogue, category and price sorting, product details, shortlist quantities and sample enquiry |
| `phones` | CONNECT / كونكت | Soft grey, graphite and violet `#6550C7`; Inter / Tajawal | Phone/accessory catalogue, search and filters, product details, demo cart quantities and checkout preview |

## URLs

- Gallery inside the main site: `/{ar,en,ckb}/demos` — cards, live-preview buttons for both languages, "request this design" CTA. Also linked from the navbar, the footer and a home-page section (`#templates`).
- Templates: `/demos/<slug>/<ar|en>`, giving 22 pages. `/demos/<slug>` redirects to the visitor's language (Kurdish visitors land on Arabic). Template pages are `noindex`; the gallery page is indexable and in the sitemap.
- The gallery has native Arabic, English and Sorani copy, including names, features, preview labels and image fallbacks. Both preview buttons name their destination language; the bilingual demo sites do not claim to offer a Sorani version.

## Architecture (`apps/web`)

```
src/demos/
  config.ts            registry (slugs, trilingual gallery copy, palette) — imported by the proxy, keep it dependency-free
  fonts.ts             per-template font variables (faces come from fonts.local.ts, generated)
  fonts.local.ts       generated next/font/local declarations for the self-hosted faces
  shared/              DemoNav, DemoForm (simulated submit), Gallery (lightbox), Tabs, Accordion, Marquee, DemoBadge
  <slug>/content.ts    typed ar/en content (type derived from `en`, so both languages must match structurally)
  <slug>/Site.tsx      the page, composed from the shared pieces
  retail/              shared appliance/phone catalogue and cart behavior; independent brand content and palettes
src/app/demos/[site]/[lang]/layout.tsx   separate root layout: <html lang dir data-demo> + demos.css
src/app/demos/demos.css                  one token set (bg-d-*, text-d-*, font-d-*) overridden per html[data-demo]
src/app/[locale]/(site)/demos/page.tsx   gallery page in the main site
src/components/site/DemoSites.tsx        DemoCard + home-page section
src/i18n/demos.ts                        gallery copy (ar/en/ckb)
public/demos/art/                        original SVG artwork + five bundled generated PNG hero images
public/demos/covers/                     screenshot covers used by the gallery
```

Because the templates are a second root layout, navigating between the main site and a demo is a full page load — intended, they are separate "sites".

Forms in the templates are demos: they validate natively and show a local success state; nothing is sent. Names, sample prices, products, venues and schedules are fictional. There is no payment integration, live booking availability or real order creation. Retail selections exist only in page state and clear on reload.

The six existing sites retain their identities, content and routes. The new sites also have their own typography, navigation and footer. Native dialogs and keyboard controls support the interactive flows; the shared demo CSS respects reduced motion. Changes to CMS articles/projects do not replace these static showcase templates. For those content controls, see [CMS.md](CMS.md), [CONTENT.md](CONTENT.md) and the deployment runbook [CMS-RELEASE.md](CMS-RELEASE.md).

## Portfolio integration (API seed)

`apps/api/src/seed/template-projects.ts` declares all eleven templates as trilingual portfolio projects (`template-<slug>`, featured, `liveUrl: /demos/<slug>/ar`, cover `/demos/covers/<slug>-ar.jpg`). The API seed adds missing template projects to an existing database as part of its recorded demo-data upgrade; fresh installs receive them with the demo data. Durable v3/v4 upgrade markers prevent subsequent starts from restoring deleted templates or republishing hidden ones. Existing edited records remain CMS-controlled. The web app localises those relative URLs to the visitor's language (`localizeDemoUrl` in `src/lib/localize.ts`), so "Live preview" on `/en` opens the English demo. Requires `SEED_DEMO=true` (the default).

## Adding a template

1. Add the slug to `DEMO_SLUGS` and an entry to `DEMO_SITES` in `src/demos/config.ts` (name/kind/tagline/features in ar, en and ckb).
2. Add a palette block `html[data-demo="<slug>"]` in `src/app/demos/demos.css` and, if needed, fonts in `src/demos/fonts.ts` + `THEME_COLOR` in the layout.
3. Create `src/demos/<slug>/content.ts` (export `en`, type `XContent = typeof en`, then `ar: XContent`) and `Site.tsx`; register it in `src/app/demos/[site]/[lang]/page.tsx`.
4. Add the template to `apps/api/src/seed/template-projects.ts` so it appears in "Our work" alongside the registered demos. Keep its relative demo and cover URLs tied to the same registered slug.
5. Register the exported content in `tests/demos.test.mjs` alongside every `DEMO_SLUGS` entry. Add meaningful checks for identifiers used by interactions (for example, filter categories or product IDs shared across translations).
6. Generate both language covers (below) and run `pnpm --dir apps/web test`. The tests require registry/content coverage for every slug, ar/en structural parity, native-language display copy, bundled SVG/PNG and self-hosted font integrity, portfolio template references and a nonempty JPEG cover for every page. Machine IDs and known technology/brand names are excluded from display-copy checks, not entire text sections.
7. Verify mobile and desktop interactions in a browser: filters including no-results states, keyboard navigation, dialog open/close and focus, form validation and local confirmation. Unit/content checks do not replace these interaction checks.

## Regenerating assets

```bash
pnpm --dir apps/web fonts:demos   # regenerates self-hosted font files and fonts.local.ts
pnpm --dir apps/web art:demos     # regenerates the original deterministic SVG assets
pnpm --dir apps/web build
pnpm --dir apps/web start -p 3100  # keep running in a separate terminal
```

In another terminal, explicitly include all eleven sites when capturing. `BASE_URL` and `CHROME` can select the local server and browser executable:

```bash
SITES=company,lawyer,photographer,restaurant,clinic,realestate,clinic-nawa,realestate-sukn,gym,appliances,phones pnpm --dir apps/web shoot:demos
SITES=company,lawyer,photographer,restaurant,clinic,realestate,clinic-nawa,realestate-sukn,gym,appliances,phones pnpm --dir apps/web shoot:demos -- --full shots-demos
```

The SVG generation command does not recreate or replace the five PNG hero assets. Keep those approved images in `public/demos/art/`; artwork tests check their PNG signatures and usable dimensions. Covers are screenshots of the rendered pages, not substituted stock images.

The site and demos load bundled font files with `next/font/local`, so production builds do not need Google Fonts network access. `fonts:demos` refreshes the generated OFL faces in `src/app/fonts/demos` and their declarations in `fonts.local.ts`; existing Satoshi files remain separate. License notes are bundled with the font assets.

`shoot:demos` uses `playwright-core` (dev dependency) with a locally installed Chromium (Playwright's `ms-playwright` cache or `CHROME=<path>`). Capture from a production build so the Next.js dev indicator is not in the covers.
