import assert from "node:assert/strict";
import path from "node:path";
import os from "node:os";
import fs from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const root = process.env.STRENGTH_COACH_ROOT || path.resolve(import.meta.dirname, "..");
const browser = await chromium.launch({ headless: true });
const previewDir = path.join(os.tmpdir(), "strength-coach-previews");
await fs.mkdir(previewDir, { recursive: true });
try {
  for (const [name, width, height] of [["desktop", 1365, 900], ["phone", 390, 844], ["tablet", 820, 1100]]) {
    const page = await browser.newPage({ viewport: { width, height }, acceptDownloads: true });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(pathToFileURL(path.join(root, "site/plans/bodybuilding-priority-block.html")).href);
    await page.locator(".hero h1").waitFor();
    assert.match(await page.locator(".hero h1").textContent(), /priority muscle block/i);
    assert.equal(await page.locator("[data-week]").count(), 4);
    assert.equal(await page.locator(".session").count(), 4);
    await page.locator("[data-week='2']").click();
    assert.match(await page.locator(".week-intro").textContent(), /Week 3/);
    await page.locator("button[data-muscle='hamstrings']").click();
    assert.match(await page.locator(".selected-detail").textContent(), /Romanian deadlift/);
    assert.equal(errors.length, 0, errors.join("\n"));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "Page should not overflow horizontally");
    await page.screenshot({ path: path.join(previewDir, `${name}.png`), fullPage: true });
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, acceptDownloads: true });
  await page.goto(pathToFileURL(path.join(root, "site/plans/strongman-rpe-pyramid.html")).href);
  await page.locator(".hero h1").waitFor();
  assert.equal(await page.locator("[data-week]").count(), 4);
  await page.evaluate(() => dispatchEvent(new Event("beforeprint")));
  assert.equal(await page.locator("details:not([open])").count(), 0);
  await page.evaluate(() => dispatchEvent(new Event("afterprint")));
  await page.locator("[data-meso='2']").click();
  assert.match(await page.locator(".week-intro").textContent(), /Week 9/);
  await page.locator("[data-meso='0']").click();
  const suggested = page.locator("[data-preview]").first();
  assert.ok(await suggested.count(), "Expected a previewable adjustment in the first strongman week");
  await suggested.click();
  assert.ok(await page.locator(".preview").isVisible());
  await page.locator("[data-accept]").click();
  assert.equal(await page.locator(".preview").count(), 0);
  assert.match(await page.locator(".session").allTextContents().then((parts) => parts.join(" ")), /2 x 3-5 @ RPE 7-8/);
  const downloadEvent = page.waitForEvent("download");
  await page.locator("[data-export]").click();
  const download = await downloadEvent;
  assert.match(download.suggestedFilename(), /\.html$/);
  const exported = await fs.readFile(await download.path(), "utf8");
  assert.match(exported, /2 x 3-5 @ RPE 7-8/);
  await page.close();
  const site = await browser.newPage();
  await site.goto(pathToFileURL(path.join(root, "site/index.html")).href);
  assert.equal(await site.locator(".card").count(), 2);
  assert.equal(await site.locator(".chart-row").count(), 12);
  assert.match(await site.locator("#current-program").textContent(), /AMRAP top set/i);
  assert.equal(await site.locator(".card a:has-text('Open plan')").count(), 2);
  await site.locator("#programs").screenshot({ path: path.join(previewDir, "gallery.png") });
  await site.close();
  for (const [name, width, height] of [["site-phone", 390, 844], ["site-tablet", 820, 1100]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(pathToFileURL(path.join(root, "site/index.html")).href);
    await page.locator(".hero h1").waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name} should not overflow horizontally`);
    await page.locator(".hero").screenshot({ path: path.join(previewDir, `${name}.png`) });
    await page.close();
  }
  console.log(`Browser smoke passed; previews: ${previewDir}`);
} finally {
  await browser.close();
}
