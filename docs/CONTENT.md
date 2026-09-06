# DevsHub.cc journal content

The journal is managed in **Admin → المقالات** (`/admin/articles`). The API database is the source of published content. The four original guides in `apps/web/src/content/articles/` are initial seed material; a tracked migration imports them once. Restarting the API does not recreate an article that an editor deleted. Editing the seed JSON is not the normal publishing workflow.

Public article pages are rendered on the server. The public API excludes drafts. CMS changes request public cache revalidation; the journal index, article detail pages, related articles, locale links and sitemap use published API content.

## Create and review an article

1. Choose **مقال جديد**. Set a stable lowercase, hyphenated slug, such as `product-discovery`. Select Product, Engineering or Growth, set the display date and a non-negative display order.
2. Keep **منشور على الموقع** off while writing. A draft may have incomplete translations. The slug, date and any sources or section identifiers you add still need to be valid.
3. Use the Arabic, English and Sorani buttons to edit each translation. Switching languages preserves the unsaved form state. **حفظ جميع الترجمات** saves all three languages together; there is no autosave.
4. For each language, write the title, concise search description, excerpt, key takeaways, article sections and conclusion. Each section has an ID, heading, paragraphs, optional bullet items and source references. Add, remove or reorder individual paragraphs, lists and sections with the controls beside them.
5. Add sources in the shared Sources area, then tick the supporting sources inside the relevant sections. Changing a source ID updates its references in all translations; deleting a source removes those references.
6. Review complete translations before enabling publication. Each language needs a title, description, excerpt, conclusion, at least one key takeaway and at least one section with a heading and nonempty paragraph. Use three useful takeaways as an editorial convention, rather than padding the article.
7. Save, then open **عرض النسخة المنشورة**. Check the English, Arabic and Sorani versions on mobile and desktop, including the table of contents, sources, internal links and language switcher.

The publication date is a displayed editorial date, **not a scheduler**. Enabling publication makes the article available immediately, even if the displayed date is in the future. Keep section headings free of number prefixes: the public page adds section numbers itself.

## Hide, delete and rename

- **إخفاء** changes an article back to a draft. Its translations and references remain editable in the CMS; its public detail URL is unavailable while hidden.
- **نشر** makes a complete article public. The same publication validation applies to the list action and editor save.
- **حذف** permanently removes the article and all its translations after confirmation. There is no CMS recycle bin or revision history. Use hiding for a reversible withdrawal.
- A slug is the article's public address. Changing it changes all three locale URLs. The CMS does not create a redirect for the old slug; keep published slugs stable or arrange a redirect separately.

## Sources and editorial quality

A source has a unique ID, a human-readable title and an absolute HTTP(S) URL without embedded credentials. Section references must match an existing source ID. The API rejects malformed references and invalid URLs; it does not verify that a linked page is online or supports the claim. Editors should open each source and check that relationship themselves.

Prefer primary sources: official documentation, standards and original research. Distinguish sourced platform behavior from DevsHub's editorial recommendations. Date changing compatibility claims and re-check them before publication. Do not invent client results, testimonials, statistics, guarantees or quotes.

All article fields are plain text rendered by React. The structured editor supports paragraphs and bullet lists; it is not an HTML or Markdown editor. Pasted HTML and Markdown syntax are not interpreted as rich content. Keep the same stable section ID for corresponding sections across translations where practical.

## Translation conventions

Use complete `en`, `ar` and `ckb` content. Avoid inserting Arabic copy into a missing English or Sorani translation. English fields use LTR; Arabic and Sorani fields use RTL. Arabic uses Tajawal, and the Kurdish fields use the site's Sorani font. The public route and HTML language tag remain `/ckb` and `ckb`; the SEO alternate uses `ku-Arab` for the Kurdish script convention.

Existing exact seed content has localized defaults, but custom content needs its own translation. A blank translation is not a request for an automatic translation. The CMS preserves explicitly cleared settings and arrays.

## Original editorial coverage

| Guide                            | Primary references                                         |
| -------------------------------- | ---------------------------------------------------------- |
| Before building a website or app | GOV.UK discovery, research, alpha and measurement guidance |
| Website, PWA or native app       | MDN, web.dev, Apple and Android documentation              |
| Secure software launch checklist | OWASP ASVS and OWASP Cheat Sheets                          |
| Performance and technical SEO    | Google Search Central and web.dev                          |

The original sources were checked on 6 September 2026. Practical scenarios are explanatory examples, not claimed client outcomes. These guides avoid ranking promises, universal platform support, guaranteed security and fixed-budget claims.

For the complete Arabic operating guide, see [CMS.md](CMS.md).
