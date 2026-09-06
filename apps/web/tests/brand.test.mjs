import { test } from "node:test";
import assert from "node:assert/strict";
import { applyBrandDefaults, BRAND_COPY } from "../src/lib/brand.ts";

const settings = () => ({
  ...BRAND_COPY,
  email: "owner@example.test",
  stats: [{ label: "Clients", value: "12" }],
});

test("updates recognized legacy branding without touching CMS contact data", () => {
  const original = {
    ...settings(),
    siteName: "Dev Hub",
    heroTitleEn:
      "We build software, AI and automation that accelerate your business",
  };
  const result = applyBrandDefaults(original);
  assert.equal(result.siteName, "DevsHub.cc");
  assert.equal(result.heroTitleEn, BRAND_COPY.heroTitleEn);
  assert.equal(result.email, original.email);
  assert.deepEqual(result.stats, original.stats);
  assert.equal(original.siteName, "Dev Hub");
});

test("preserves custom Arabic content and empty English fallback", () => {
  const original = {
    ...settings(),
    heroTitle: "منتج مخصص",
    heroTitleEn: "",
    bio: "نبذة مخصصة",
    bioEn: "",
  };
  assert.deepEqual(applyBrandDefaults(original), original);
});

test("preserves explicit custom translations", () => {
  const original = {
    ...settings(),
    heroTitle: "منتج مخصص",
    heroTitleEn: "Our own product story",
  };
  assert.deepEqual(applyBrandDefaults(original), original);
});

test("fills empty default copy and is safe to apply more than once", () => {
  const result = applyBrandDefaults({
    ...settings(),
    heroTitle: "",
    heroTitleEn: "",
  });
  assert.equal(result.heroTitle, BRAND_COPY.heroTitle);
  assert.equal(result.heroTitleEn, BRAND_COPY.heroTitleEn);
  assert.deepEqual(applyBrandDefaults(result), result);
});
