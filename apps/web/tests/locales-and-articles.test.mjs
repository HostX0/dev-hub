import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  LOCALES,
  dirOf,
  preferredLocale,
  switchLocalePath,
  HREFLANG,
} from "../src/i18n/config.ts";

test("negotiates all three languages by preference, including Kurdish tags", () => {
  assert.equal(preferredLocale("en;q=0.4,ckb-IQ;q=0.9,ar;q=0.8"), "ckb");
  assert.equal(preferredLocale("ku-Arab-IQ,en;q=0.8"), "ckb");
  assert.equal(preferredLocale("ckb;q=0,en;q=0.8"), "en");
  assert.equal(preferredLocale("fr,de;q=0.5"), "ar");
  assert.equal(preferredLocale("ar;q=invalid,en"), "en");
  assert.equal(dirOf("ckb"), "rtl");
  assert.equal(dirOf("en"), "ltr");
  assert.equal(HREFLANG.ckb, "ku-Arab");
});
test("language changes preserve the article, query and section", () => {
  assert.equal(
    switchLocalePath("/ar/blog/guide?q=web#planning", "ckb"),
    "/ckb/blog/guide?q=web#planning",
  );
  assert.equal(switchLocalePath("/projects", "en"), "/en/projects");
});
test("published guides have substantive translations and resolvable primary references", () => {
  const files = ["product", "engineering"].flatMap((name) =>
    JSON.parse(
      readFileSync(
        new URL(`../src/content/articles/${name}.json`, import.meta.url),
        "utf8",
      ),
    ),
  );
  const slugs = new Set();
  for (const article of files) {
    assert.match(article.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(!slugs.has(article.slug), `Duplicate slug: ${article.slug}`);
    slugs.add(article.slug);
    assert.ok(Number.isFinite(Date.parse(article.publishedAt)));
    const sourceIds = new Set(article.sources.map((s) => s.id));
    assert.equal(sourceIds.size, article.sources.length);
    for (const s of article.sources) {
      const url = new URL(s.url);
      assert.equal(url.protocol, "https:");
      assert.ok(s.title.trim());
    }
    for (const locale of LOCALES) {
      const c = article.translations[locale];
      assert.ok(
        c.title && c.description && c.excerpt && c.conclusion,
        `${article.slug}/${locale}: incomplete metadata`,
      );
      assert.equal(c.takeaways.length, 3);
      assert.ok(c.sections.length >= 5);
      const ids = new Set(c.sections.map((s) => s.id));
      assert.equal(ids.size, c.sections.length);
      assert.ok(!ids.has("sources") && !ids.has("next-step"));
      let refs = 0;
      for (const section of c.sections) {
        assert.ok(section.heading && section.paragraphs.length);
        for (const id of section.sourceIds ?? []) {
          assert.ok(sourceIds.has(id), `Missing ${id}`);
          refs++;
        }
      }
      assert.ok(refs >= 3, `${article.slug}/${locale}: too few references`);
      const words = c.sections
        .flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])])
        .join(" ")
        .split(/\s+/).length;
      assert.ok(
        words >= 500,
        `${article.slug}/${locale}: incomplete article (${words} words)`,
      );
    }
  }
});
