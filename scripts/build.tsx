/**
 * Build: validate every template, then render every output into out/.
 *
 *   npm run build
 *
 * Validation is a build gate: any error-severity diagnostic fails the build.
 * Warnings are printed but don't fail it. The email is also checked with the
 * @hyper-elements/email-clients plugin (classic Outlook, Gmail, Apple Mail
 * and the rest), and per-client previews are written to out/clients/.
 *
 * Outputs:
 *   out/email.html, out/email.txt   the donor thank-you email + plain-text twin
 *   out/page.html                   the gala + impact page
 *   out/receipt-print.html          the printable A4 donation receipt
 *   out/receipt.pdf                 the same receipt as a PDF
 *   out/share-card.png, out/share-card.svg  the 1200×627 share card
 *   out/clients/*.html              the email as Outlook, Gmail, Apple Mail draw it
 *   docs/share-card.svg             copy of the canvas SVG for the README
 *   docs/screenshots/share-card.png copy of the canvas PNG for the README
 */
import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { ReactElement } from "react";
import { ElementsError, formatDiagnostics, render, validate, type Diagnostic } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { emailClients, renderInEmailClients } from "@hyper-elements/email-clients";
import DonorThankYouEmail from "../src/email.js";
import GalaImpactPage from "../src/page.js";
import DonationReceipt from "../src/document.js";
import LanternShareCard from "../src/canvas.js";
import { loadFontFiles } from "../src/fonts.js";

const ROOT = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const OUT = join(ROOT, "out");
const CLIENTS = join(OUT, "clients");

let failed = false;

function report(label: string, diagnostics: readonly Diagnostic[]): void {
  const errors = diagnostics.filter((d) => d.severity === "error");
  const warnings = diagnostics.filter((d) => d.severity === "warning");
  const notes = diagnostics.filter((d) => d.severity !== "error" && d.severity !== "warning");
  console.log(`\n— ${label}: ${errors.length} error(s), ${warnings.length} warning(s), ${notes.length} note(s)`);
  if (diagnostics.length > 0) console.log(formatDiagnostics(diagnostics));
  if (errors.length > 0) failed = true;
}

async function validateTemplate(label: string, element: ReactElement, plugins?: unknown[]): Promise<void> {
  // validate() never throws: it returns { valid, diagnostics }.
  const result = validate(element, plugins ? { plugins: plugins as never } : undefined);
  report(`validate ${label}`, result.diagnostics);
  if (!result.valid) failed = true;
}

async function writeOut(name: string, contents: string | Buffer): Promise<void> {
  await writeFile(join(OUT, name), contents);
  const { size } = await stat(join(OUT, name));
  console.log(`  wrote out/${name} (${(size / 1024).toFixed(1)} KB)`);
}

async function main(): Promise<void> {
  await mkdir(CLIENTS, { recursive: true });
  await mkdir(join(ROOT, "docs", "screenshots"), { recursive: true });
  const plugin = await emailClients();

  // 1. Validate all four templates. The email gets the client checks too.
  await validateTemplate("email", <DonorThankYouEmail />, [plugin]);
  await validateTemplate("page", <GalaImpactPage />);
  await validateTemplate("document", <DonationReceipt />);
  await validateTemplate("canvas", <LanternShareCard />);
  if (failed) {
    console.error("\n✗ validation failed — not rendering.");
    process.exitCode = 1;
    return;
  }

  // 2. Render the HTML outputs (and the email's plain-text twin).
  const email = await render(<DonorThankYouEmail />, { plugins: [plugin] });
  report("render email", email.diagnostics);
  await writeOut("email.html", email.html);
  await writeOut("email.txt", email.text);

  const page = await render(<GalaImpactPage />);
  report("render page", page.diagnostics);
  await writeOut("page.html", page.html);

  const doc = await render(<DonationReceipt />);
  report("render document", doc.diagnostics);
  await writeOut("receipt-print.html", doc.html);

  // 3. PDF and image outputs. Fonts are given as files — nothing is fetched.
  const fonts = await loadFontFiles();
  console.log(`\n— loaded ${fonts.length} font files for the PDF and image engines`);
  const pdf = await renderPdf(<DonationReceipt />, { fonts });
  report("renderPdf receipt", pdf.diagnostics);
  await writeOut("receipt.pdf", Buffer.from(pdf.pdf));

  const png = await renderImage(<LanternShareCard />, { fonts, format: "png" });
  report("renderImage share-card.png", png.diagnostics);
  await writeOut("share-card.png", Buffer.from(png.image));
  console.log(`  share-card.png is ${png.width}×${png.height}px`);

  const svg = await renderImage(<LanternShareCard />, { fonts, format: "svg" });
  report("renderImage share-card.svg", svg.diagnostics);
  await writeOut("share-card.svg", Buffer.from(svg.image));
  await copyFile(join(OUT, "share-card.svg"), join(ROOT, "docs", "share-card.svg"));
  console.log("  copied out/share-card.svg → docs/share-card.svg (for the README)");
  await copyFile(join(OUT, "share-card.png"), join(ROOT, "docs", "screenshots", "share-card.png"));
  console.log("  copied out/share-card.png → docs/screenshots/share-card.png (for the README)");

  // 4. Per-client previews of the email (self-contained HTML files).
  const { previews, skipped, diagnostics } = await renderInEmailClients(<DonorThankYouEmail />, {
    emailClients: ["outlook", "gmail", "apple-mail"],
    fonts: "inline",
    plugins: [plugin],
  });
  report("renderInEmailClients", diagnostics);
  for (const preview of previews) {
    await writeFile(join(CLIENTS, preview.filename), preview.html);
    const { size } = await stat(join(CLIENTS, preview.filename));
    console.log(`  wrote out/clients/${preview.filename} (${(size / 1024).toFixed(1)} KB, ${preview.client}${preview.approximate ? ", approximate" : ""})`);
  }
  for (const skip of skipped) console.log(`  skipped: ${skip.client} — ${skip.reason}`);

  if (failed) {
    console.error("\n✗ build finished with errors.");
    process.exitCode = 1;
  } else {
    console.log("\n✓ build complete — see out/ for every output.");
  }
}

main().catch((e: unknown) => {
  if (e instanceof ElementsError) {
    console.error(formatDiagnostics(e.diagnostics));
  } else {
    console.error(e);
  }
  process.exitCode = 1;
});
