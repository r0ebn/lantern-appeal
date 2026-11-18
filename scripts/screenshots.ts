/**
 * Screenshots: render the built HTML in Chromium and capture it.
 *
 *   npm run screenshots   (run `npm run build` first)
 *
 * Writes docs/screenshots/email.png, page.png, receipt.png, plus 390px
 * mobile captures of the email and page, and an Outlook preview capture.
 * The canvas PNG is copied in by the build. The screenshots are the README's
 * visuals — and the design check: read them before calling the kit done.
 */
import { mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { homedir } from "node:os";
import { pathToFileURL } from "node:url";
import { chromium, type Browser } from "playwright";

const ROOT = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const OUT = join(ROOT, "out");
const SHOTS = join(ROOT, "docs", "screenshots");

async function launchBrowser(): Promise<Browser> {
  try {
    return await chromium.launch();
  } catch {
    // Fall back to a cached Chromium from ~/.cache/ms-playwright.
    const cache = join(homedir(), ".cache", "ms-playwright");
    const entries = await readdir(cache).catch(() => []);
    const candidates = entries
      .filter((e) => e.startsWith("chromium-"))
      .sort()
      .reverse()
      .map((e) => join(cache, e, "chrome-linux", "chrome"));
    for (const executablePath of candidates) {
      if (!existsSync(executablePath)) continue;
      try {
        console.log(`using cached Chromium at ${executablePath}`);
        return await chromium.launch({ executablePath });
      } catch {
        // try the next one
      }
    }
    throw new Error("No Chromium available: run `npx playwright install chromium` first.");
  }
}

async function shot(browser: Browser, file: string, name: string, width: number): Promise<void> {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(pathToFileURL(join(OUT, file)).href);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(800); // let the web fonts swap in
  await page.screenshot({ path: join(SHOTS, name), fullPage: true });
  console.log(`  wrote docs/screenshots/${name} (${width}px)`);
  await page.close();
}

async function main(): Promise<void> {
  await mkdir(SHOTS, { recursive: true });
  const browser = await launchBrowser();
  try {
    await shot(browser, "email.html", "email.png", 700);
    await shot(browser, "email.html", "email-mobile.png", 390);
    await shot(browser, "page.html", "page.png", 1280);
    await shot(browser, "page.html", "page-mobile.png", 390);
    await shot(browser, "receipt-print.html", "receipt.png", 1000);
    // The Outlook preview, if the build wrote one (filename varies by client).
    const clients = await readdir(join(OUT, "clients")).catch(() => []);
    const outlook = clients.find((f) => f.startsWith("outlook") && f.endsWith(".html"));
    if (outlook) {
      await shot(browser, join("clients", outlook), "email-outlook.png", 700);
    } else {
      console.log("  no Outlook preview found in out/clients/ — skipping email-outlook.png");
    }
  } finally {
    await browser.close();
  }
  console.log("\n✓ screenshots complete — read them in docs/screenshots/.");
}

main().catch((e: unknown) => {
  console.error(e);
  process.exitCode = 1;
});
