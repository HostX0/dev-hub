import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolvePortfolioImage } from "../src/lib/media.ts";

test("legacy portfolio covers and galleries resolve to bundled original artwork", () => {
  const projects = [
    "ayadati",
    "dijla",
    "kashier",
    "law-dash",
    "law-site",
    "rawatib",
    "souq-admin",
    "souq-app",
    "souq-store",
  ];
  for (const project of projects) {
    for (const kind of ["cover", "detail"]) {
      const path = resolvePortfolioImage(
        `/uploads/seed/${project}-${kind}.webp`,
      );
      assert.equal(path, `/uploads/seed/${project}-${kind}.svg`);
      const svg = readFileSync(
        new URL(`../../api${path}`, import.meta.url),
        "utf8",
      );
      assert.match(svg, /<svg\b/);
      assert.match(svg, /viewBox="0 0 1600 1000"/);
    }
  }
});

test("portfolio compatibility never rewrites uploaded images or remote preview URLs", () => {
  for (const path of [
    "",
    "/uploads/custom.webp",
    "/uploads/seed/custom.webp",
    "https://example.com",
    "https://cdn.example.test/uploads/seed/law-site-cover.webp",
    "/brand/team/abdulazeez-noaman.png",
  ]) {
    assert.equal(resolvePortfolioImage(path), path);
  }
});

test("founder portraits are bundled PNGs with complete localized roles", () => {
  const team = JSON.parse(
    readFileSync(new URL("../src/content/team.json", import.meta.url), "utf8"),
  );
  assert.deepEqual(
    team.map((person) => person.name),
    ["Abdulazeez Noaman", "Mohammed Saddam"],
  );
  for (const person of team) {
    const portrait = readFileSync(
      new URL(`../public${person.photo}`, import.meta.url),
    );
    assert.equal(portrait.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    for (const suffix of ["", "En", "Ckb"]) {
      assert.ok(person[`role${suffix}`].trim());
      assert.ok(person[`focus${suffix}`].trim());
    }
  }
});
