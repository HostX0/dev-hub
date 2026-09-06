# Live template demos

Four complete, bilingual (Arabic RTL / English LTR) showcase websites that customers can open from the main site. Each has its own identity — palette, typography, layout, navigation and footer — and none of them share DevsHub chrome.

| Slug           | Business                              | Identity                                                    | Notable sections                                            |
| -------------- | ------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| `company`      | Rafid Group — contracting & supply    | Navy `#10233F` + amber `#F59E0B` on off-white, IBM Plex Sans Arabic | Services, projects, animated stats, process, team, quote form |
| `lawyer`       | Al-Saadi Law Office                   | Midnight `#0B1220` + gold `#C8A24A`, Playfair Display / Amiri | Practice areas, bio, results counters, FAQ accordion, consultation form |
| `photographer` | Sara Kamel — portfolio                | White editorial, Cormorant / Reem Kufi, oversized type      | Filterable masonry gallery + lightbox, packages, booking form |
| `restaurant`   | Bayt Al-Reef — Iraqi kitchen          | Cream `#FBF3E4` + terracotta `#B4532A` + olive, Fraunces / Lalezar / Rubik | Tabbed menu, chef, gallery, reservation form |

## URLs

- Gallery inside the main site: `/{ar,en,ckb}/demos` — cards, live-preview buttons for both languages, "request this design" CTA. Also linked from the navbar, the footer and a home-page section (`#templates`).
- Templates: `/demos/<slug>/<ar|en>`. `/demos/<slug>` redirects to the visitor's language (Kurdish visitors land on Arabic). Template pages are `noindex`; the gallery page is indexable and in the sitemap.

## Architecture (`apps/web`)

```
src/demos/
  config.ts            registry (slugs, trilingual gallery copy, palette) — imported by the proxy, keep it dependency-free
  fonts.ts             next/font/google faces per template
  shared/              DemoNav, DemoForm (simulated submit), Gallery (lightbox), Tabs, Accordion, Marquee, DemoBadge
  <slug>/content.ts    typed ar/en content (type derived from `en`, so both languages must match structurally)
  <slug>/Site.tsx      the page, composed from the shared pieces
src/app/demos/[site]/[lang]/layout.tsx   separate root layout: <html lang dir data-demo> + demos.css
src/app/demos/demos.css                  one token set (bg-d-*, text-d-*, font-d-*) overridden per html[data-demo]
src/app/[locale]/(site)/demos/page.tsx   gallery page in the main site
src/components/site/DemoSites.tsx        DemoCard + home-page section
src/i18n/demos.ts                        gallery copy (ar/en/ckb)
public/demos/art/                        generated SVG artwork (no external images)
public/demos/covers/                     screenshot covers used by the gallery
```

Because the templates are a second root layout, navigating between the main site and a demo is a full page load — intended, they are separate "sites".

Forms in the templates are demos: they validate natively, simulate a request and show a success state; nothing is sent.

## Adding a template

1. Add the slug to `DEMO_SLUGS` and an entry to `DEMO_SITES` in `src/demos/config.ts` (name/kind/tagline/features in ar, en and ckb).
2. Add a palette block `html[data-demo="<slug>"]` in `src/app/demos/demos.css` and, if needed, fonts in `src/demos/fonts.ts` + `THEME_COLOR` in the layout.
3. Create `src/demos/<slug>/content.ts` (export `en`, type `XContent = typeof en`, then `ar: XContent`) and `Site.tsx`; register it in `src/app/demos/[site]/[lang]/page.tsx`.
4. Generate covers (below) and run `pnpm test` — `tests/demos.test.mjs` checks registry completeness, ar/en structural parity, bundled artwork and covers.

## Regenerating assets

```bash
pnpm --dir apps/web art:demos     # deterministic SVG artwork -> public/demos/art
pnpm --dir apps/web build && pnpm --dir apps/web start -p 3100
pnpm --dir apps/web shoot:demos   # covers -> public/demos/covers (BASE_URL, CHROME env overrides)
pnpm --dir apps/web shoot:demos -- --full shots-demos   # full-page PNGs for review
```

`shoot:demos` uses `playwright-core` (dev dependency) with a locally installed Chromium (Playwright's `ms-playwright` cache or `CHROME=<path>`). Capture from a production build so the Next.js dev indicator is not in the covers.
