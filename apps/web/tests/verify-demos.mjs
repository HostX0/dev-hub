/** Local browser acceptance audit. BASE_URL=http://127.0.0.1:3311 node tests/verify-demos.mjs */
import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright-core";
import { DEMO_SLUGS, DEMO_LANGS } from "../src/demos/config.ts";
import { appliancesContent } from "../src/demos/appliances/content.ts";
import { phonesContent } from "../src/demos/phones/content.ts";
const base = process.env.BASE_URL || "http://127.0.0.1:3311";
const sites = process.env.SITES ? process.env.SITES.split(",") : DEMO_SLUGS;
const out = process.env.QA_SCREENSHOTS;
if (out) mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  channel: process.env.QA_BROWSER || "chrome",
  headless: true,
});
const results = [];
try {
  for (const width of [390, 1440])
    for (const site of sites)
      for (const lang of DEMO_LANGS) {
        const page = await browser.newPage({
          viewport: { width, height: 1000 },
          reducedMotion: "reduce",
        });
        const issues = [];
        const writes = [];
        page.on("pageerror", (error) => issues.push(error.message));
        page.on("response", (response) => {
          if (
            response.status() >= 400 &&
            /\.(?:woff2?|png|webp|jpe?g|svg)(?:\?|$)|\/_next\/image/.test(
              response.url(),
            )
          )
            issues.push(`Asset ${response.status()}: ${response.url()}`);
        });
        page.on("request", (request) => {
          if (!["GET", "HEAD"].includes(request.method()))
            writes.push(`${request.method()} ${request.url()}`);
        });
        try {
          const response = await page.goto(`${base}/demos/${site}/${lang}`, {
            waitUntil: "networkidle",
          });
          assert.equal(response.status(), 200);
          await page.evaluate(async () => {
            await document.fonts.ready;
            for (let y = 0; y < document.body.scrollHeight; y += 700) {
              window.scrollTo(0, y);
              await new Promise((r) => setTimeout(r, 35));
            }
            await Promise.all(
              [...document.images].map((img) => img.decode().catch(() => {})),
            );
            window.scrollTo(0, 0);
          });
          const audit = await page.evaluate(
            ({ lang }) => {
              const errors = [];
              if (document.documentElement.lang !== lang)
                errors.push("Wrong language");
              if (
                document.documentElement.dir !== (lang === "ar" ? "rtl" : "ltr")
              )
                errors.push("Wrong direction");
              if (document.documentElement.scrollWidth > innerWidth + 2)
                errors.push("Horizontal overflow");
              if (document.querySelectorAll("h1").length !== 1)
                errors.push("Expected one h1");
              if (
                !document
                  .querySelector('meta[name="robots"]')
                  ?.content.includes("noindex")
              )
                errors.push("Fictional demo must be noindex");
              for (const image of document.images)
                if (!image.complete || !image.naturalWidth)
                  errors.push(`Broken image ${image.currentSrc}`);
              const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
              );
              const leaks = [];
              while (walker.nextNode()) {
                const el = walker.currentNode.parentElement;
                if (
                  !el ||
                  el.closest("script,style,code,pre,[lang='ar']") ||
                  !el.getClientRects().length ||
                  getComputedStyle(el).visibility === "hidden"
                )
                  continue;
                if (
                  lang === "en" &&
                  /[\u0600-\u06ff]/.test(walker.currentNode.textContent)
                )
                  leaks.push(walker.currentNode.textContent.trim());
              }
              if (leaks.length)
                errors.push(
                  `Arabic in English content: ${leaks.slice(0, 5).join(" | ")}`,
                );
              return {
                issues: errors,
                images: document.images.length,
                h1: document.querySelector("h1")?.textContent.trim(),
                bodyFont: getComputedStyle(document.body).fontFamily,
              };
            },
            { lang },
          );
          issues.push(...audit.issues);
          if (out)
            await page.screenshot({
              path: join(out, `${site}-${lang}-${width}.png`),
              fullPage: false,
            });
          if (site === "appliances" || site === "phones") {
            const t = (
              site === "appliances" ? appliancesContent : phonesContent
            )[lang];
            const collection = page.locator("#collection");
            const cards = collection.locator("article");
            assert.equal(await cards.count(), 6);
            await collection
              .getByRole("button", { name: t.categories[1].name, exact: true })
              .click();
            assert.equal(
              await cards.count(),
              t.products.filter((p) => p.category === t.categories[1].id)
                .length,
            );
            await collection
              .getByRole("searchbox")
              .fill("no-matching-product-98234");
            await collection
              .getByText(t.catalogue.empty, { exact: true })
              .waitFor();
            await collection
              .getByRole("button", { name: t.catalogue.reset, exact: true })
              .click();
            assert.equal(await cards.count(), 6);
            await collection.getByRole("combobox").selectOption("low");
            const cheapest = [...t.products].sort(
              (a, b) => a.price - b.price,
            )[0];
            assert.equal(
              await cards.first().locator("h3").textContent(),
              cheapest.name,
            );
            await collection.getByRole("combobox").selectOption("high");
            const expensive = [...t.products].sort(
              (a, b) => b.price - a.price,
            )[0];
            assert.equal(
              await cards.first().locator("h3").textContent(),
              expensive.name,
            );
            await collection.getByRole("searchbox").fill(cheapest.name);
            assert.equal(await cards.count(), 1);
            const trigger = collection.getByRole("button", {
              name: `${t.catalogue.details}: ${cheapest.name}`,
              exact: true,
            });
            await trigger.click();
            let dialog = page.getByRole("dialog");
            await dialog
              .getByText(cheapest.description, { exact: true })
              .waitFor();
            await page.keyboard.press("Escape");
            assert.equal(await dialog.count(), 0);
            assert.ok(
              await trigger.evaluate((el) => el === document.activeElement),
              "Detail trigger regains focus",
            );
            await collection
              .getByRole("button", {
                name: `${t.catalogue.add}: ${cheapest.name}`,
                exact: true,
              })
              .click();
            await collection
              .getByRole("button", { name: new RegExp(t.cart.title) })
              .click();
            dialog = page.getByRole("dialog");
            await dialog
              .getByRole("button", {
                name: `${t.cart.increase}: ${cheapest.name}`,
                exact: true,
              })
              .click();
            const number = new Intl.NumberFormat(
              lang === "ar" ? "ar-IQ" : "en-IQ",
            );
            assert.equal(
              await dialog.locator("output").textContent(),
              number.format(2),
            );
            assert.ok(
              (await dialog.textContent()).includes(
                `${number.format(cheapest.price * 2)} ${t.catalogue.currency}`,
              ),
            );
            await dialog
              .getByRole("button", {
                name: `${t.cart.decrease}: ${cheapest.name}`,
                exact: true,
              })
              .click();
            assert.equal(
              await dialog.locator("output").textContent(),
              number.format(1),
            );
            await dialog
              .getByRole("button", { name: t.cart.checkout, exact: true })
              .click();
            await dialog.getByText(t.cart.done, { exact: true }).waitFor();
            await dialog
              .getByRole("button", { name: t.cart.continue, exact: true })
              .click();
            await collection
              .getByRole("button", { name: new RegExp(t.cart.title) })
              .click();
            dialog = page.getByRole("dialog");
            await dialog
              .getByRole("button", {
                name: `${t.cart.remove}: ${cheapest.name}`,
                exact: true,
              })
              .click();
            await dialog.getByText(t.cart.empty, { exact: true }).waitFor();
            await page.keyboard.press("Escape");
            const contact = page.locator("#contact");
            await contact
              .getByLabel(t.contact.name, { exact: true })
              .fill(lang === "ar" ? "زائر تجريبي" : "Demo visitor");
            await contact
              .getByLabel(t.contact.email, { exact: true })
              .fill("demo@example.test");
            await contact
              .getByLabel(t.contact.message, { exact: true })
              .fill(
                lang === "ar"
                  ? "اختبار نموذج العرض"
                  : "Testing the demonstration form",
              );
            await contact
              .getByRole("button", { name: t.contact.submit, exact: true })
              .click();
            await contact.getByRole("status").waitFor();
            await contact
              .getByText(t.contact.success.title, { exact: true })
              .waitFor();
            assert.equal(
              writes.length,
              0,
              "Demo must not send real orders or contact data",
            );
            if (width === 390) {
              await page.evaluate(() => window.scrollTo(0, 0));
              const menu = page.getByRole("button", {
                name: lang === "ar" ? "القائمة" : "Menu",
                exact: true,
              });
              await menu.click();
              await page
                .locator("#demo-mobile-nav")
                .getByRole("link", { name: t.nav[0], exact: true })
                .click();
              assert.equal(await menu.getAttribute("aria-expanded"), "false");
            }
          }
          results.push({ site, lang, width, ...audit, issues });
        } catch (error) {
          results.push({ site, lang, width, issues: [...issues, error.stack] });
        }
        await page.close();
      }
} finally {
  await browser.close();
}
console.log(JSON.stringify(results, null, 2));
if (results.some((result) => result.issues.length)) process.exitCode = 1;
