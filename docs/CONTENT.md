# DevsHub.cc journal

Articles are versioned editorial content in `apps/web/src/content/articles/`. They are reviewed and deployed with the site; they are not stored in the existing projects CMS. Public pages are rendered on the server, so article text and references do not depend on a client-side fetch.

## Publishing a guide

1. Add an article to `product.json` or `engineering.json`, following the `Article` type in `apps/web/src/lib/articles.ts`. To add another content file, import it in that module.
2. Choose a stable lowercase hyphenated slug and category (`product`, `engineering`, or `growth`). Keep the same slug and section IDs across all three languages.
3. Write complete `en`, `ar`, and `ckb` translations: title, SEO description, excerpt, three takeaways, substantive sections, and a useful next step. Do not prepend section numbers; the page renders them.
4. Include official primary sources with stable IDs. Reference those IDs in the relevant section’s `sourceIds`. Separate research findings from editorial recommendations; qualify platform support and verify changing details.
5. Use the real publication date. Review sources and translations before release. Keep URLs stable after publication, or add an explicit redirect when renaming a slug.
6. Run `pnpm --dir apps/web test` and `pnpm build`; inspect the new pages on desktop and mobile in all languages. The sitemap, category filters, search, related links and locale alternatives derive from this collection automatically.

All content is plain text rendered through React. Do not add raw HTML, untrusted script blocks, or fabricated testimonials/benchmarks to the article data. Search matches localized titles, summaries and section headings; query/filter pages use the clean index canonical and are excluded from indexing.

## Current editorial coverage

| Guide                            | Primary references                                              |
| -------------------------------- | --------------------------------------------------------------- |
| Before building a website or app | GOV.UK discovery, user research, alpha and measurement guidance |
| Website, PWA or native app       | MDN, web.dev, Apple and Android documentation                   |
| Secure software launch checklist | OWASP ASVS and relevant OWASP Cheat Sheets                      |
| Performance and technical SEO    | Google Search Central and web.dev                               |

Sources were checked on 6 September 2026. Practical scenarios are explanatory examples, not claimed client outcomes. The articles avoid promises about rankings, universal platform support, guaranteed security, or fixed budgets.

## CMS translations

Project and service forms include dedicated Sorani fields. Settings include Sorani hero, subtitle, bio, address, statistic labels, testimonials, and founder roles/specialties. Founder portraits, names and order are editable in the same Settings page. Empty translations fall back to their Arabic source. Exact known seed content has translated defaults; changing the Arabic source prevents an unrelated default translation from being used. New/custom content should have explicit translations before publication.

Keep the public `/ckb` route and HTML language tag: they identify Central Kurdish. The SEO helper emits `ku-Arab` in hreflang for Google's language-code convention. Both Arabic and Sorani use RTL layout and logical spacing.
