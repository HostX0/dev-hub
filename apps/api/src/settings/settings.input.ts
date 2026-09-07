import { BadRequestException } from '@nestjs/common';
import type { SiteSettings } from '../db/schema.js';
import { object, str, strings, url, bool } from '../common/input.js';
const textKeys = [
  'siteName',
  'siteNameAr',
  'heroTitle',
  'heroTitleEn',
  'heroTitleCkb',
  'heroSubtitle',
  'heroSubtitleEn',
  'heroSubtitleCkb',
  'bio',
  'bioEn',
  'bioCkb',
  'email',
  'phone',
  'whatsapp',
  'location',
  'locationEn',
  'locationCkb',
];
const listKeys = ['stack', 'clients', 'clientsEn', 'clientsCkb'];
const platforms = ['github', 'linkedin', 'twitter', 'instagram', 'facebook'];
function rows(value: unknown, max: number) {
  if (!Array.isArray(value) || value.length > max)
    throw new BadRequestException('Invalid settings list');
  return value;
}
export function settingsInput(value: unknown, old: SiteSettings): SiteSettings {
  const raw = object(value, [
    ...textKeys,
    ...listKeys,
    'team',
    'socials',
    'socialLinks',
    'stats',
    'testimonials',
    'seedVersion',
  ]);
  const data: Record<string, any> = { ...old };
  for (const k of textKeys)
    if (raw[k] !== undefined)
      data[k] = str(
        raw[k],
        k.startsWith('bio')
          ? 20000
          : k.startsWith('heroSubtitle')
            ? 3000
            : k.startsWith('heroTitle')
              ? 1000
              : 240,
      );
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    throw new BadRequestException('Invalid email');
  for (const k of listKeys)
    if (raw[k] !== undefined) data[k] = strings(raw[k], 100, 240);
  if (raw.team !== undefined) {
    data.team = rows(raw.team, 30).map((v) => {
      const t = object(v, [
        'id',
        'name',
        'nameAr',
        'nameEn',
        'nameCkb',
        'photo',
        'role',
        'roleEn',
        'roleCkb',
        'focus',
        'focusEn',
        'focusCkb',
        'github',
      ]);
      const result: Record<string, any> = {};
      for (const k of Object.keys(t))
        result[k] =
          k === 'photo'
            ? url(t[k], true)
            : k === 'github'
              ? url(t[k])
              : str(
                  t[k],
                  k === 'id' ? 80 : k.startsWith('focus') ? 1000 : 240,
                  k === 'id',
                );
      if (!result.id) throw new BadRequestException('Team ID is required');
      return result;
    });
    if (new Set(data.team.map((v: any) => v.id)).size !== data.team.length)
      throw new BadRequestException('Duplicate team IDs');
  }
  if (raw.socials !== undefined) {
    const legacy = object(raw.socials, platforms);
    data.socials = { ...old.socials };
    for (const k of platforms)
      if (legacy[k] !== undefined) data.socials[k] = url(legacy[k]);
  }
  if (raw.socialLinks !== undefined) {
    data.socialLinks = rows(raw.socialLinks, 30).map((v) => {
      const l = object(v, ['id', 'platform', 'label', 'url', 'enabled']);
      const enabled = bool(l.enabled);
      return {
        id: str(l.id, 80, true),
        platform: str(l.platform, 40, true),
        label: str(l.label, 120, enabled),
        url: url(l.url, false, enabled),
        enabled,
      };
    });
    if (
      new Set(data.socialLinks.map((l: any) => l.id)).size !==
      data.socialLinks.length
    )
      throw new BadRequestException('Duplicate social link IDs');
    data.socials = Object.fromEntries(
      platforms.map((p) => [
        p,
        data.socialLinks.find(
          (l: any) => l.enabled && l.platform.toLowerCase() === p,
        )?.url ?? '',
      ]),
    );
  } else if (raw.socials !== undefined && old.socialLinks !== undefined) {
    // Legacy clients can update their known links without discarding custom platforms.
    data.socialLinks = old.socialLinks
      .filter((l) => !platforms.includes(l.platform))
      .concat(
        platforms
          .filter((p) => data.socials[p])
          .map((p) => ({
            id: p,
            platform: p,
            label: p,
            url: data.socials[p],
            enabled: true,
          })),
      );
  }
  if (raw.stats !== undefined)
    data.stats = rows(raw.stats, 30).map((v) => {
      const s = object(v, ['label', 'labelEn', 'labelCkb', 'value']);
      return Object.fromEntries(
        Object.entries(s).map(([k, v]) => [k, str(v, 240)]),
      );
    });
  if (raw.testimonials !== undefined)
    data.testimonials = rows(raw.testimonials, 50).map((v) => {
      const s = object(v, [
        'name',
        'nameEn',
        'nameCkb',
        'role',
        'roleEn',
        'roleCkb',
        'text',
        'textEn',
        'textCkb',
      ]);
      return Object.fromEntries(
        Object.entries(s).map(([k, v]) => [
          k,
          str(v, k.startsWith('text') ? 5000 : 240),
        ]),
      );
    });
  // The seed marker is internal; a CMS save must never reset it.
  data.seedVersion = old.seedVersion;
  return data as SiteSettings;
}
export function publicSettings(data: SiteSettings) {
  return {
    ...data,
    socialLinks:
      data.socialLinks ??
      Object.entries(data.socials ?? {})
        .filter(([, v]) => v)
        .map(([platform, url]) => ({
          id: platform,
          platform,
          label: platform,
          url,
          enabled: true,
        })),
  };
}
