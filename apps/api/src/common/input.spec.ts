import { describe, expect, it } from 'vitest';
import { articleInput } from '../articles/articles.input.js';
import { password, url, strings } from './input.js';
import { hasPermission } from '../auth/permissions.js';
import { settingsInput } from '../settings/settings.input.js';
import type { SiteSettings } from '../db/schema.js';
const content = {
  title: 'A title',
  description: 'Description',
  excerpt: 'Excerpt',
  takeaways: ['A useful takeaway'],
  sections: [
    {
      id: 'one',
      heading: 'Section',
      paragraphs: ['A paragraph'],
      sourceIds: ['ref'],
    },
  ],
  conclusion: 'Conclusion',
};
const article = () => ({
  slug: 'an-article',
  category: 'engineering',
  publishedAt: '2026-09-06',
  published: true,
  sources: [{ id: 'ref', title: 'Source', url: 'https://example.org/doc' }],
  translations: {
    en: structuredClone(content),
    ar: structuredClone(content),
    ckb: structuredClone(content),
  },
});
describe('CMS validation and permissions', () => {
  it('accepts safe URLs and bounded relative image paths', () => {
    expect(url('https://example.com/path')).toBe('https://example.com/path');
    expect(url('/uploads/photo.png', true)).toBe('/uploads/photo.png');
  });
  it.each([
    'javascript:alert(1)',
    'data:text/html,hello',
    'https://user:pass@example.com',
    '//evil.example/a',
    '/uploads/../secret',
  ])('rejects unsafe URL %s', (v) => {
    expect(() => url(v, true)).toThrow();
  });
  it('bounds passwords in bytes and preserves intentional blank translated list entries', () => {
    expect(() => password('س'.repeat(40))).toThrow();
    expect(strings(['one', '', 'three'])).toEqual(['one', '', 'three']);
  });
  it('write implies read while inactive users and unrelated scopes fail', () => {
    const u = {
      id: 2,
      username: 'writer',
      displayName: 'Writer',
      role: 'admin' as const,
      permissions: ['tasks:write'],
      active: true,
    };
    expect(hasPermission(u, 'tasks:read')).toBe(true);
    expect(hasPermission(u, 'users:read')).toBe(false);
    expect(hasPermission({ ...u, active: false }, 'tasks:write')).toBe(false);
  });
  it('validates source references and duplicate IDs', () => {
    expect(articleInput(article()).published).toBe(true);
    const bad = article();
    bad.translations.en.sections[0].sourceIds = ['missing'];
    expect(() => articleInput(bad)).toThrow();
    const duplicates = article();
    duplicates.sources.push(duplicates.sources[0]);
    expect(() => articleInput(duplicates)).toThrow();
  });
  it('allows incomplete drafts but blocks publishing them', () => {
    const a = article();
    a.translations.ckb.title = '';
    expect(() => articleInput(a)).toThrow();
    a.published = false;
    expect(articleInput(a).published).toBe(false);
  });
  it('rejects normalized invalid calendar dates', () => {
    const a = article();
    a.publishedAt = '2026-02-30';
    expect(() => articleInput(a)).toThrow();
  });
  it('keeps explicit empty socials and protects the internal seed marker', () => {
    const old = {
      socials: {
        github: 'https://github.com/dev',
        linkedin: '',
        twitter: '',
        instagram: '',
      },
      seedVersion: 2,
    } as SiteSettings;
    const next = settingsInput({ socialLinks: [], seedVersion: 0 }, old);
    expect(next.socialLinks).toEqual([]);
    expect(next.socials.github).toBe('');
    expect(next.seedVersion).toBe(2);
  });
  it('rejects enabled blank social links and supports disabled drafts', () => {
    const old = {
      socials: { github: '', linkedin: '', twitter: '', instagram: '' },
    } as SiteSettings;
    const link = {
      id: 'one',
      platform: 'custom',
      label: '',
      url: '',
      enabled: false,
    };
    expect(
      settingsInput({ socialLinks: [link] }, old).socialLinks?.[0].enabled,
    ).toBe(false);
    expect(() =>
      settingsInput({ socialLinks: [{ ...link, enabled: true }] }, old),
    ).toThrow();
  });
  it('requires a useful takeaway in each published locale', () => {
    const a = article();
    a.translations.ar.takeaways = [''];
    expect(() => articleInput(a)).toThrow();
    a.published = false;
    expect(articleInput(a).published).toBe(false);
  });
  it('accepts safe legacy Facebook and rejects credential-bearing URLs', () => {
    const old = {
      socials: { github: '', linkedin: '', twitter: '', instagram: '' },
    } as SiteSettings;
    expect(
      settingsInput(
        { socials: { facebook: 'https://www.facebook.com/dev.point.iq' } },
        old,
      ).socials.facebook,
    ).toBe('https://www.facebook.com/dev.point.iq');
    expect(() =>
      settingsInput(
        { socials: { facebook: 'https://user:pass@facebook.com/profile' } },
        old,
      ),
    ).toThrow();
  });
});
