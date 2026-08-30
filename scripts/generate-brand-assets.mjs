/**
 * Alpha Gains — brand asset generator
 * ------------------------------------------------------------------
 * Rebuilds every raster brand asset from `public/logo-mark.svg`
 * (favicons, iOS home-screen icon, PWA icons, social share image).
 *
 * Put your own logo in `public/logo-mark.svg` (or point SVG below at
 * your file), then run:
 *
 *    npm i -D sharp          # one time, sharp is only a build tool
 *    npm run brand:assets
 *
 * The SVG lockups (public/logo.svg, logo-white.svg, logo-stacked.svg) are
 * hand-authored vectors and do not need regeneration.
 * ------------------------------------------------------------------
 */
import sharp from "sharp";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ROOT = process.env.BRAND_ROOT || join(dirname(new URL(import.meta.url).pathname), "..");
const SVG = join(ROOT, "public/logo-mark.svg");
const HERO = join(ROOT, "public/images/hero/hero-tub.jpg");

const DARK = "#0b0e14";
const svgBuffer = readFileSync(SVG);

const out = (p) => {
  const full = join(ROOT, p);
  mkdirSync(dirname(full), { recursive: true });
  return full;
};

/** Icon = mark centered on a dark tile (looks right in a browser tab / home screen) */
async function tile(size, { padding = 0.16 } = {}) {
  const inner = Math.max(8, Math.round(size * (1 - padding * 2)));
  const mark = await sharp(svgBuffer).resize(inner, inner, { fit: "contain" }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: DARK } })
    .composite([{ input: mark, gravity: "centre" }])
    .png()
    .toBuffer();
}

async function writeIco(entries, dest) {
  // ICO container holding PNG payloads (supported since Windows Vista / all modern browsers)
  const dir = Buffer.alloc(6);
  dir.writeUInt16LE(0, 0); // reserved
  dir.writeUInt16LE(1, 2); // type: icon
  dir.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const headers = [];
  for (const { size, data } of entries) {
    const h = Buffer.alloc(16);
    h.writeUInt8(size === 256 ? 0 : size, 0);
    h.writeUInt8(size === 256 ? 0 : size, 1);
    h.writeUInt8(0, 2); // palette
    h.writeUInt8(0, 3); // reserved
    h.writeUInt16LE(1, 4); // planes
    h.writeUInt16LE(32, 6); // bpp
    h.writeUInt32LE(data.length, 8);
    h.writeUInt32LE(offset, 12);
    offset += data.length;
    headers.push(h);
  }
  writeFileSync(dest, Buffer.concat([dir, ...headers, ...entries.map((e) => e.data)]));
}

async function main() {
  // ---- favicons -------------------------------------------------------
  const sizes = [16, 24, 32, 48];
  const favicons = [];
  for (const s of sizes) {
    const buf = await tile(s, { padding: s <= 32 ? 0.08 : 0.14 });
    favicons.push({ size: s, data: buf });
    writeFileSync(out(`public/icons/favicon-${s}.png`), buf);
  }
  await writeIco(favicons, out("app/favicon.ico"));

  // ---- apple touch icon ----------------------------------------------
  writeFileSync(out("app/apple-icon.png"), await tile(180, { padding: 0.1 }));

  // ---- PWA / android icons ---------------------------------------------
  writeFileSync(out("public/icons/icon-192.png"), await tile(192, { padding: 0.12 }));
  writeFileSync(out("public/icons/icon-512.png"), await tile(512, { padding: 0.12 }));
  // maskable needs the safe zone (center 80%) — extra padding
  writeFileSync(out("public/icons/icon-maskable-512.png"), await tile(512, { padding: 0.24 }));

  // ---- standalone transparent logo (share, invoices, packaging) --------
  writeFileSync(out("public/logo-mark.png"), await sharp(svgBuffer).resize(1024, 1024).png().toBuffer());
  writeFileSync(out("public/logo.png"), await tile(1024, { padding: 0.14 }));

  // ---- social share image (1200x630) -----------------------------------
  const bg = await sharp(HERO)
    .resize(1200, 630, { fit: "cover" })
    .modulate({ brightness: 0.75, saturation: 1.05 })
    .toBuffer();
  const scrim = await sharp({
    create: { width: 1200, height: 630, channels: 4, background: "#070a11bf" },
  })
    .ensureAlpha()
    .png()
    .toBuffer();
  const mark1200 = await sharp(svgBuffer).resize(188, 188).png().toBuffer();
  writeFileSync(
    out("public/og/og-image.png"),
    await sharp({ create: { width: 1200, height: 630, channels: 4, background: DARK } })
      .composite([
        { input: bg, blend: "over" },
        { input: scrim, blend: "over" },
        { input: mark1200, gravity: "centre" },
      ])
      .flatten({ background: "#090b0e" })
      .jpeg({ quality: 88 })
      .toBuffer()
  );

  console.log("✓ brand assets regenerated");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
