// Build first. Requires an EMPTY disposable local review DB.
import assert from 'node:assert/strict';
import { Pool } from 'pg';
import { NestFactory } from '@nestjs/core';
import { readFile } from 'node:fs/promises';
import { assertPublishable } from '../dist/articles/articles.input.js';

const target = new URL(process.env.DATABASE_URL);
if (
  process.env.CMS_TEST_ALLOW_MUTATIONS !== 'true' ||
  !['localhost', '127.0.0.1'].includes(target.hostname) ||
  !target.pathname.includes('review')
)
  throw Error('Empty disposable local review DB required');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
try {
  assert.equal(
    (
      await pool.query(
        "SELECT count(*)::int n FROM information_schema.tables WHERE table_schema='public'",
      )
    ).rows[0].n,
    0,
  );
  process.env.SEED_DEMO = 'true';
  process.env.JWT_SECRET = 'local-fresh-review-secret';
  const { AppModule } = await import('../dist/app.module.js');
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });
  await app.close();
  const journal = JSON.parse(
    await readFile('drizzle/meta/_journal.json', 'utf8'),
  );
  assert.equal(
    (
      await pool.query(
        'SELECT count(*)::int n FROM drizzle.__drizzle_migrations',
      )
    ).rows[0].n,
    journal.entries.length,
  );
  const people = (
    await pool.query('SELECT role,active,display_name FROM users')
  ).rows;
  assert.equal(people.length, 1);
  assert.equal(people[0].role, 'owner');
  assert(people[0].active);
  assert(people[0].display_name);
  const settings = (await pool.query('SELECT data FROM settings WHERE id=1'))
    .rows[0].data;
  assert.deepEqual(
    settings.socialLinks.map((l) => l.url).sort(),
    [
      'https://www.facebook.com/dev.point.iq',
      'https://www.linkedin.com/company/devshub-cc',
    ].sort(),
  );
  assert(
    settings.team.every((t) => t.nameAr && t.nameEn && t.nameCkb && t.github),
  );
  assert.equal(settings.team[0].github, 'https://github.com/HostX0');
  assert.equal(settings.team[1].github, 'https://github.com/hamodywe');
  assert.equal(settings.email, 'info@devshub.cc');
  assert.equal(settings.phone.replaceAll(' ', ''), '+9647708540899');
  assert(settings.heroTitleCkb);
  const articles = (await pool.query('SELECT * FROM articles')).rows;
  assert.equal(articles.length, 4);
  for (const a of articles) {
    assert(a.published);
    assertPublishable(a.translations);
  }
  for (const [table, expected] of [
    ['projects', 9],
    ['services', 6],
  ]) {
    const rows = (await pool.query(`SELECT * FROM ${table}`)).rows;
    assert.equal(rows.length, expected);
    assert(
      rows.every(
        (r) =>
          r.published &&
          r.title &&
          r.title_en &&
          r.title_ckb &&
          r.description &&
          r.description_en &&
          r.description_ckb,
      ),
    );
  }
  assert.equal(
    (await pool.query('SELECT count(*)::int n FROM task_stages')).rows[0].n,
    3,
  );
  assert.equal(
    (
      await pool.query(
        "SELECT count(*)::int n FROM cms_seed_runs WHERE key='legacy-demo-v2'",
      )
    ).rows[0].n,
    1,
  );
  console.log(
    'PASS: clean install applies all migrations, initializes an active owner, company profiles/founder translations/contact defaults, 4 published trilingual articles, 9 projects, 6 services, 3 task stages and a durable seed marker.',
  );
} finally {
  await pool.end();
}
