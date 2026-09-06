# DevsHub.cc identity

The public website and content workspace use the supplied 2026 DevsHub.cc identity. The main journey is product direction, selected work, engineering capabilities, collaboration, and contact. Arabic, English, and Central Kurdish (Sorani) routes share the same navigation and support localized content.

## Design system

| Role                          | Value     |
| ----------------------------- | --------- |
| Midnight                      | `#0A0A0B` |
| Indigo                        | `#6366F1` |
| Slate                         | `#717F95` |
| Silver                        | `#E2E6F0` |
| Mint                          | `#10B981` |
| White                         | `#F8FAFC` |
| Accessible indigo button fill | `#5B5EE8` |

Light sections have their own foreground, border, and semantic color tokens. Dark framing stays consistent across the homepage, navigation, footer and admin. Indigo button fill is slightly darker than the core swatch to meet normal-text contrast requirements with white labels.

Inter handles Latin body copy and primary headings; Satoshi handles supporting display text and UI labels; Tajawal handles Arabic. Noto Sans Arabic supplies complete Sorani glyph coverage on Kurdish pages. Fonts are self-hosted by Next.js. Satoshi files come from [Fontshare](https://www.fontshare.com/fonts/satoshi); its bundled license is included in `apps/web/src/app/fonts/Satoshi-LICENSE.txt`.

The geometric D and modular block are vector assets. The hero artwork was generated from the supplied identity references and optimized to a 1200px WebP (approximately 64 KB). The actual wordmark remains selectable, accessible text rather than being baked into the artwork.

## Content compatibility

`apps/web/src/lib/brand.ts` maps only exact legacy seed values to the new brand copy when reading settings. Customized copy and explicit translations are preserved. Empty English or Sorani translations paired with custom Arabic continue to use the Arabic fallback. Exact known demo text has a source-matched Sorani fallback for compatibility during rollout. Normalization is non-destructive and idempotent. New installations receive the same brand copy from the API seed.

The logo itself is the fixed DevsHub.cc identity. Existing CMS records include demo projects and example.com preview links; these remain editable in the admin. The supplied info@devshub.cc email, phone and full Baghdad office address are applied once by migration 0002. Placeholder WhatsApp links are removed; a real WhatsApp number can be set separately in the admin. No production content was changed during implementation.

## Validation and deployment

Run `pnpm --dir apps/web test` with Node 22.6+ for the brand compatibility regression tests, `pnpm --dir apps/web lint`, and `pnpm build` for both production applications.

Browser validation uses a local production build and a NestJS API backed by isolated PostgreSQL, seeded from public content snapshots. Authentication and content saves are verified against the local database. The Docker Compose/server deployment flow is unchanged. Migration `0002_sorani_and_contact.sql` adds Sorani columns, applies the supplied contact details once, and translates only matching default content. The API runs pending migrations before accepting requests. No new environment variable is required. Deploy after merging the reviewed branch through the existing server workflow; this change does not trigger a separate hosting provider setup.

## Journal and languages

`/ar/blog`, `/en/blog`, and `/ckb/blog` expose four researched guides with twelve complete localized article pages. Each includes takeaways, a table of contents, section-level source links, a source list, reading time, and related guides. See [CONTENT.md](CONTENT.md) for authoring.

Document language is `ckb` and direction is RTL. Search-engine alternate links use `ku-Arab` (the ISO 639-1 Kurdish language code plus Arabic script), alongside `ar`, `en`, and `x-default`. Locale detection recognizes `ckb`, `ku`, regional tags and Accept-Language quality weights. The switcher preserves the current route, query, and fragment.

## Motion

The original AI chat, workflow, typed code, metrics, integration diagram, project filter/reflow, card spotlight, FAQ, gallery and contact feedback remain. Magnetic buttons, count-up statistics, a scrolling technology strip, and restrained entrance transitions reinforce the brand. Looping demos and the technology strip have pause controls; reduced-motion preferences stop timers and show completed demo content. Section text is present and visible in server-rendered HTML.

## Verification scope

Production builds and TypeScript pass for web and API. Thirteen regression checks cover brand/custom-content compatibility, locale negotiation, publication integrity, bundled portraits and original portfolio artwork. Fresh installation and legacy upgrades pass, including restart preservation of customized contacts and teams and gallery ordering. Authenticated Sorani project/service/settings writes, read-back, content-cache revalidation, 27 localized project routes, 12 article pages, article 404s, and sitemap/robots output were tested locally. All 18 original portfolio SVGs load through the API and web proxy and decode in Chromium; gallery keyboard navigation, failed-image fallback, focus restoration, and 711 journal link/anchor checks pass. The existing client-api navigation lint warning remains unrelated to this change.

This is a reviewed code change, not a production deployment. Search indexing and ranking depend on deployment and search-engine crawling; the implementation does not promise ranking results. Sorani has complete content coverage but has not received external native-editor sign-off.

## Founders and portfolio images

The supplied portraits are bundled unchanged and rendered in their confirmed order: Abdulazeez Noaman, then Mohammed Saddam. Their names, photos, roles and specialties in three languages are editable in Settings → team. Migration 0002 installs the founding team only when no team field exists, preserving custom teams and intentionally empty arrays.

The old demo WebP exports contained missing Arabic glyphs and were not bundled in the checkout. The website now serves the matching, existing SVG originals, with readable Arabic text. Only the 18 recognized demo image paths are remapped; custom uploads and original external preview URLs are unchanged. Image failures show a localized accessible fallback. Gallery order and duplicates survive migration.

Public pages and CMS language fields use the same typography; embedded English fields select Inter, Arabic uses Tajawal, and Sorani fields select Noto Sans Arabic, including labels and saved tags.
