import { BadRequestException } from '@nestjs/common';
import { object, str, int, bool, strings, url, nonEmpty } from './input.js';
export function translatedPublication(data: Record<string, any>) {
  for (const suffix of ['', 'En', 'Ckb'])
    if (
      !data['title' + suffix]?.trim() ||
      !data['description' + suffix]?.trim()
    )
      throw new BadRequestException(
        'Complete the Arabic, English and Sorani titles and descriptions before publishing',
      );
}
export function serviceInput(value: unknown) {
  const raw = object(value, [
    'title',
    'titleEn',
    'titleCkb',
    'description',
    'descriptionEn',
    'descriptionCkb',
    'icon',
    'features',
    'featuresEn',
    'featuresCkb',
    'published',
    'sortOrder',
  ]);
  const d: Record<string, any> = {};
  for (const k of [
    'title',
    'titleEn',
    'titleCkb',
    'description',
    'descriptionEn',
    'descriptionCkb',
    'icon',
  ])
    if (raw[k] !== undefined)
      d[k] = str(
        raw[k],
        k.startsWith('description') ? 20000 : k === 'icon' ? 60 : 160,
      );
  for (const k of ['features', 'featuresEn', 'featuresCkb'])
    if (raw[k] !== undefined) d[k] = strings(raw[k], 50, 1000);
  if (raw.published !== undefined) d.published = bool(raw.published);
  if (raw.sortOrder !== undefined) d.sortOrder = int(raw.sortOrder);
  nonEmpty(d);
  return d;
}
export function validateProjectFields(data: Record<string, any>) {
  for (const k of ['liveUrl', 'repoUrl'])
    if (data[k] !== undefined) url(data[k]);
  if (data.coverImage !== undefined) url(data.coverImage, true);
  if (data.gallery !== undefined)
    strings(data.gallery, 50, 2048).forEach((v) => url(v, true, true));
  if (data.tags !== undefined) strings(data.tags, 50, 120);
  for (const k of ['description', 'descriptionEn', 'descriptionCkb'])
    if (data[k] !== undefined) str(data[k], 30000);
  if (data.sortOrder !== undefined) int(data.sortOrder);
  if (data.year != null) int(data.year, 1900, 2200);
}
