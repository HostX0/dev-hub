/** Run against a local dev/production server. Does not control an existing browser.
 * PUBLIC_QA_URL=http://localhost:3100 PLAYWRIGHT_MODULE=/path/to/playwright node tests/verify-public-locales.mjs
 */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.PUBLIC_QA_URL || "http://localhost:3100";
const browser = await chromium.launch({ headless: true, channel: process.env.PUBLIC_QA_BROWSER || "chrome" });
const results = [];
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
    for (const locale of ["en", "ar", "ckb"]) {
      const paths = [`/${locale}`, `/${locale}/projects`, `/${locale}/blog`, `/${locale}/demos`];
      for (let index = 0; index < paths.length; index++) {
        const pathname = paths[index];
        const failures = [];
        const onResponse = (response) => { if (response.status() >= 400 && /\.(?:woff2?|png|webp|jpe?g|svg)(?:\?|$)|\/_next\/image/.test(response.url())) failures.push(`Asset ${response.status()}: ${response.url()}`); };
        page.on("response", onResponse);
        const response = await page.goto(new URL(pathname, base).href, { waitUntil: "networkidle" });
        if (!response?.ok()) failures.push(`Page status ${response?.status()}`);
        await page.evaluate(async () => {
          await document.fonts.ready;
          for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise((resolve) => setTimeout(resolve, 75)); }
          await Promise.all(Array.from(document.images, (img) => img.decode().catch(() => {})));
          window.scrollTo(0, 0);
        });
        if (pathname === `/${locale}/projects` || pathname === `/${locale}/blog`) {
          const prefix = pathname + "/";
          const details = await page.locator(`a[href^="${prefix}"]`).evaluateAll((links) => links.map((link) => link.getAttribute("href")).filter(Boolean));
          for (const detail of details) if (!paths.includes(detail)) paths.push(detail);
        }
        const audit = await page.evaluate(({ locale }) => {
          const issues = [];
          const visible = (el) => { const style = getComputedStyle(el); return style.display !== "none" && style.visibility !== "hidden" && el.getClientRects().length > 0; };
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
          const text = [];
          while (walker.nextNode()) { const node = walker.currentNode; const el = node.parentElement; if (el && !el.closest("script,style,pre,code") && visible(el) && node.textContent.trim()) text.push(node.textContent.trim()); }
          const visibleText = text.join("\n");
          if (document.documentElement.lang !== locale) issues.push("Wrong document language");
          if (document.documentElement.dir !== (locale === "en" ? "ltr" : "rtl")) issues.push("Wrong document direction");
          if (document.documentElement.scrollWidth > innerWidth + 2) issues.push("Horizontal page overflow");
          if (locale === "en" && /[\u0600-\u06ff]/.test(visibleText)) issues.push("Arabic-script text in English UI: " + text.filter((s) => /[\u0600-\u06ff]/.test(s)).slice(0, 5).join(" | "));
          if (locale !== "en") {
            const leaks = ["BUILD BETTER TOGETHER", "Same vision.", "Greater impact.", "Great products start with a conversation.", "DevsHub Assistant", "PRODUCT / PEOPLE / POSSIBILITIES", "JOURNAL", "Abdulazeez Noaman", "Mohammed Saddam"];
            for (const leak of leaks) if (visibleText.includes(leak)) issues.push("Untranslated UI: " + leak);
          }
          const fontIssues = [];
          for (const el of document.querySelectorAll("h1,h2,h3,button,input,textarea,nav a,footer p,#team h3")) {
            if (!visible(el) || el.closest(".brand-logo")) continue;
            const language = el.closest("[lang]")?.lang || locale;
            const family = getComputedStyle(el).fontFamily;
            const expected = language === "ar" ? /Tajawal/i : language === "ckb" ? /Noto.*Sans.*Arabic/i : /Inter|Satoshi/i;
            if (!expected.test(family)) fontIssues.push({ tag: el.tagName, text: (el.textContent || el.getAttribute("placeholder") || "").trim().slice(0, 50), language, family });
          }
          if (fontIssues.length) issues.push("Incorrect font: " + JSON.stringify(fontIssues.slice(0, 8)));
          const missingImages = [...document.images].filter((img) => visible(img) && (!img.complete || img.naturalWidth === 0)).map((img) => img.currentSrc || img.src);
          if (missingImages.length) issues.push("Missing images: " + missingImages.join(", "));
          const expectedPaths = ["M24 4H43C63 4 76 19 76 40S63 76 43 76H24V52H46V28H24V4Z", "M3 28H24V52H3Z"];
          for (const logo of document.querySelectorAll(".brand-logo")) {
            const paths = [...logo.querySelectorAll("svg path")].map((p) => p.getAttribute("d"));
            if (JSON.stringify(paths) !== JSON.stringify(expectedPaths)) issues.push("Changed brand logo geometry");
          }
          return { issues, images: document.images.length, language: document.documentElement.lang, bodyFont: getComputedStyle(document.body).fontFamily, headings: [...document.querySelectorAll("h1")].map((el) => el.textContent.trim()), textLength: visibleText.length };
        }, { locale });
        results.push({ pathname, width, ...audit, issues: [...failures, ...audit.issues] });
        page.off("response", onResponse);
      }
    }
    await page.close();
  }
} finally { await browser.close(); }
console.log(JSON.stringify(results, null, 2));
if (results.some((result) => result.issues.length)) process.exitCode = 1;
