import { test } from "node:test";
import assert from "node:assert/strict";
import { applyBrandDefaults, BRAND_COPY } from "../src/lib/brand.ts";

const settings = () => ({
  ...BRAND_COPY,
  email: "owner@example.test",
  phone: "+964 700 000 0000",
  whatsapp: "",
  location: "Custom address",
  locationEn: "Custom address",
  locationCkb: "Custom address",
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

test("preserves custom Arabic copy when Sorani has not been supplied", () => {
  const original = {
    ...settings(),
    heroTitle: "عنوان مخصص",
    heroTitleCkb: "",
    bio: "نبذة خاصة",
    bioCkb: "",
  };
  const result = applyBrandDefaults(original);
  assert.equal(result.heroTitleCkb, "");
  assert.equal(result.bioCkb, "");
});

test("replaces only known placeholder contacts with the supplied Baghdad details", () => {
  const result = applyBrandDefaults({
    ...settings(),
    phone: "+964 7XX XXX XXXX",
    location: "بغداد، العراق",
    locationEn: "Baghdad, Iraq",
    locationCkb: "",
    whatsapp: "9647XXXXXXXXX",
  });
  assert.equal(result.phone, "+964 770 854 0899");
  assert.match(result.locationEn, /Sham Center Building, Floor 3, Apartment 6/);
  assert.equal(result.whatsapp, "");
});

test("uses the supplied business email while retaining later CMS customization", () => {
  assert.equal(
    applyBrandDefaults({ ...settings(), email: "iosapk.org@gmail.com" }).email,
    "info@devshub.cc",
  );
  assert.equal(
    applyBrandDefaults({ ...settings(), email: "" }).email,
    "info@devshub.cc",
  );
  assert.equal(
    applyBrandDefaults({ ...settings(), email: "contact@example.test" }).email,
    "contact@example.test",
  );
});
