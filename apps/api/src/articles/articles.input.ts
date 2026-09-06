import { BadRequestException } from '@nestjs/common';
import { object, str, int, bool, strings, url } from '../common/input.js';
import type { ArticleContent } from '../db/schema.js';
export function articleInput(value: unknown) {
  const raw = object(value, [
    'slug',
    'category',
    'publishedAt',
    'published',
    'sortOrder',
    'sources',
    'translations',
  ]);
  const slug = str(raw.slug, 120, true);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    throw new BadRequestException('Use a lowercase URL slug');
  if (!['product', 'engineering', 'growth'].includes(raw.category))
    throw new BadRequestException('Invalid article category');
  const publishedAt = str(raw.publishedAt, 10, true);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt) ||
    Number.isNaN(Date.parse(publishedAt)) ||
    new Date(publishedAt).toISOString().slice(0, 10) !== publishedAt
  )
    throw new BadRequestException('Invalid date');
  if (!Array.isArray(raw.sources) || raw.sources.length > 50)
    throw new BadRequestException('Invalid sources');
  const sources = raw.sources.map((v) => {
    const s = object(v, ['id', 'title', 'url']);
    return {
      id: str(s.id, 80, true),
      title: str(s.title, 240, true),
      url: url(s.url, false, true),
    };
  });
  if (new Set(sources.map((s) => s.id)).size !== sources.length)
    throw new BadRequestException('Duplicate source IDs');
  const input = object(raw.translations, ['en', 'ar', 'ckb']);
  const translations = {} as Record<'en' | 'ar' | 'ckb', ArticleContent>;
  for (const locale of ['en', 'ar', 'ckb'] as const) {
    const c = object(
      input[locale] ?? {
        title: '',
        description: '',
        excerpt: '',
        takeaways: [],
        sections: [],
        conclusion: '',
      },
      [
        'title',
        'description',
        'excerpt',
        'takeaways',
        'sections',
        'conclusion',
      ],
    );
    if (!Array.isArray(c.sections) || c.sections.length > 40)
      throw new BadRequestException('Invalid article sections');
    const sections = c.sections.map((v) => {
      const s = object(v, [
        'id',
        'heading',
        'paragraphs',
        'bullets',
        'sourceIds',
      ]);
      const refs =
        s.sourceIds === undefined ? [] : strings(s.sourceIds, 50, 80);
      if (refs.some((r) => !sources.some((s) => s.id === r)))
        throw new BadRequestException('Unknown source reference');
      return {
        id: str(s.id, 80, true),
        heading: str(s.heading, 300),
        paragraphs: strings(s.paragraphs, 40, 10000),
        ...(s.bullets !== undefined
          ? { bullets: strings(s.bullets, 50, 3000) }
          : {}),
        ...(s.sourceIds !== undefined ? { sourceIds: refs } : {}),
      };
    });
    if (new Set(sections.map((s) => s.id)).size !== sections.length)
      throw new BadRequestException('Duplicate section IDs');
    translations[locale] = {
      title: str(c.title, 240),
      description: str(c.description, 500),
      excerpt: str(c.excerpt, 2000),
      takeaways: strings(c.takeaways, 20, 1000),
      sections,
      conclusion: str(c.conclusion, 10000),
    };
  }
  const result = {
    slug,
    category: raw.category as 'product' | 'engineering' | 'growth',
    publishedAt,
    sources,
    translations,
    ...(raw.published !== undefined ? { published: bool(raw.published) } : {}),
    ...(raw.sortOrder !== undefined ? { sortOrder: int(raw.sortOrder) } : {}),
  };
  if (Buffer.byteLength(JSON.stringify(result)) > 500000)
    throw new BadRequestException('Article is too large');
  if (result.published) assertPublishable(translations);
  return result;
}
export function assertPublishable(
  translations: Record<'en' | 'ar' | 'ckb', ArticleContent>,
) {
  for (const locale of ['en', 'ar', 'ckb'] as const) {
    const c = translations[locale];
    if (
      !c ||
      ![c.title, c.description, c.excerpt, c.conclusion].every((s) =>
        s.trim(),
      ) ||
      !c.takeaways.some((t) => t.trim()) ||
      !c.sections.length ||
      c.sections.some(
        (s) =>
          !s.heading.trim() ||
          !s.paragraphs.length ||
          s.paragraphs.some((p) => !p.trim()),
      )
    )
      throw new BadRequestException(
        `Complete the ${locale} translation before publishing`,
      );
  }
}
