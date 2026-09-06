import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  DEMO_LANGS,
  DEMO_SITES,
  DEMO_SLUGS,
  demoCover,
  demoHref,
  demoLangFromLocale,
  isDemoLang,
  isDemoSlug,
} from "../src/demos/config.ts";
import { companyContent } from "../src/demos/company/content.ts";
import { lawyerContent } from "../src/demos/lawyer/content.ts";
import { photographerContent } from "../src/demos/photographer/content.ts";
import { restaurantContent } from "../src/demos/restaurant/content.ts";
import { clinicContent } from "../src/demos/clinic/content.ts";
import { realestateContent } from "../src/demos/realestate/content.ts";
import { demosCopy } from "../src/i18n/demos.ts";
import { LOCALES } from "../src/i18n/config.ts";

const CONTENT = {
  company: companyContent,
  lawyer: lawyerContent,
  photographer: photographerContent,
  restaurant: restaurantContent,
  clinic: clinicContent,
  realestate: realestateContent,
};

/** Structural shape of a content tree: same keys, same array lengths, same leaf types. */
function shape(value) {
  if (Array.isArray(value)) return `[${value.length}:${value.map(shape).join("|")}]`;
  if (value && typeof value === "object")
    return `{${Object.keys(value)
      .sort()
      .map((k) => `${k}:${shape(value[k])}`)
      .join(",")}}`;
  return typeof value;
}
/** Optional decorations (e.g. listing badges) may legitimately be empty. */
const OPTIONAL_KEYS = new Set(["badge"]);
function leafEntries(value, out = [], key = "") {
  if (Array.isArray(value)) value.forEach((v) => leafEntries(v, out, key));
  else if (value && typeof value === "object")
    Object.entries(value).forEach(([k, v]) => leafEntries(v, out, k));
  else out.push([key, value]);
  return out;
}

test("every registered template has a page component and content", () => {
  assert.deepEqual(Object.keys(CONTENT).sort(), [...DEMO_SLUGS].sort());
});

test("template registry is complete and trilingual for the gallery", () => {
  assert.deepEqual(
    DEMO_SITES.map((s) => s.slug),
    [...DEMO_SLUGS],
  );
  assert.equal(new Set(DEMO_SLUGS).size, DEMO_SLUGS.length);
  for (const site of DEMO_SITES) {
    for (const locale of LOCALES) {
      assert.ok(site.name[locale].trim(), `${site.slug}/${locale}: name`);
      assert.ok(site.kind[locale].trim(), `${site.slug}/${locale}: kind`);
      assert.ok(site.tagline[locale].length > 30, `${site.slug}/${locale}: tagline`);
      assert.equal(site.features[locale].length, 4, `${site.slug}/${locale}: features`);
    }
    assert.equal(site.palette.length, 3);
    for (const c of [...site.palette, site.accent]) assert.match(c, /^#[0-9a-f]{6}$/i);
  }
});

test("every template has Arabic and English content with an identical structure", () => {
  for (const [slug, content] of Object.entries(CONTENT)) {
    assert.deepEqual(Object.keys(content).sort(), [...DEMO_LANGS].sort());
    assert.equal(shape(content.ar), shape(content.en), `${slug}: ar/en shape differs`);
    for (const lang of DEMO_LANGS) {
      const empty = leafEntries(content[lang]).filter(
        ([k, v]) => typeof v === "string" && !v.trim() && !OPTIONAL_KEYS.has(k),
      );
      assert.equal(empty.length, 0, `${slug}/${lang}: empty strings`);
    }
    // Arabic copy must actually be Arabic, not a pasted English fallback.
    const strings = leafEntries(content.ar).map(([, v]) => v).filter((v) => typeof v === "string");
    const arabic = strings.filter((v) => /[؀-ۿ]/.test(v));
    assert.ok(arabic.length > strings.length * 0.6, `${slug}: Arabic coverage`);
  }
});

test("artwork referenced by the templates is bundled", () => {
  const refs = new Set();
  for (const content of Object.values(CONTENT))
    for (const [, v] of leafEntries(content))
      if (typeof v === "string" && v.startsWith("/demos/art/")) refs.add(v);
  // Photographer and restaurant galleries build their paths from ids.
  for (let i = 1; i <= 12; i++) refs.add(`/demos/art/photo-${String(i).padStart(2, "0")}.svg`);
  for (let i = 1; i <= 6; i++) refs.add(`/demos/art/dish-0${i}.svg`);
  for (const p of ["portrait-lawyer", "portrait-photographer", "portrait-chef", "re-hero", "clinic-hero"]) refs.add(`/demos/art/${p}.svg`);
  assert.ok(refs.size >= 38);
  for (const ref of refs) {
    const svg = readFileSync(new URL(`../public${ref}`, import.meta.url), "utf8");
    assert.match(svg, /^<svg\b/, ref);
  }
});

test("gallery covers exist for every template and demo language", () => {
  for (const slug of DEMO_SLUGS)
    for (const lang of DEMO_LANGS) {
      const file = readFileSync(new URL(`../public${demoCover(slug, lang)}`, import.meta.url));
      assert.equal(file.subarray(0, 2).toString("hex"), "ffd8", `${slug}-${lang} is a JPEG`);
      assert.ok(file.length > 10_000, `${slug}-${lang} is not empty`);
    }
});

test("routing helpers map main-site locales onto the bilingual demos", () => {
  assert.equal(demoLangFromLocale("ckb"), "ar");
  assert.equal(demoLangFromLocale("en"), "en");
  assert.equal(demoCover("lawyer", "ckb"), "/demos/covers/lawyer-ar.jpg");
  assert.equal(demoHref("restaurant", "en", "#menu"), "/demos/restaurant/en#menu");
  assert.ok(isDemoSlug("company") && !isDemoSlug("shop"));
  assert.ok(isDemoLang("ar") && !isDemoLang("ckb"));
  for (const locale of LOCALES) {
    assert.ok(demosCopy[locale].nav.trim());
    assert.equal(demosCopy[locale].how.length, 3);
  }
});
