// Generates the favicons and the link-preview icon from the brand mark.
// Run with: node scripts/build-brand-assets.mjs
//
// Source artwork lives in src/assets/images:
//   logo-mark.png the compass "C" alone, square, black on transparent
// It is pre-trimmed — no transparent padding — so it scales predictably.
// (The full lockup, logo.png, is traced into public/logo.svg by trace-logo.mjs.)
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const INK = { r: 0x15, g: 0x14, b: 0x0f, alpha: 1 };
const BRAND_HEX = '#f0ea1b';

const MARK = 'src/assets/images/logo-mark.png';

mkdirSync('public', { recursive: true });

/*
  The artwork is black, so on our ink backgrounds it needs recolouring. Both assets are
  pure silhouettes, so the alpha channel is the shape: paint a solid colour and graft the
  logo's alpha onto it.
*/
async function recolour(file, size, colour) {
  const alpha = await sharp(file).resize({ width: size, height: size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extractChannel('alpha')
    .toBuffer();

  return sharp({ create: { width: size, height: size, channels: 3, background: colour } })
    .joinChannel(alpha)
    .png()
    .toBuffer();
}

// --- Favicons: ink compass on a full-bleed brand-yellow disc ------------------
/*
  `shape: 'circle'` leaves the corners transparent so the icon reads as a yellow
  coin on any browser chrome. Apple masks its touch icon itself and composites
  transparency over black, so that one gets a full-bleed square instead.
*/
async function icon(size, shape = 'circle') {
  const backdrop = Buffer.from(
    shape === 'circle'
      ? `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${BRAND_HEX}"/>
        </svg>`
      : `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${size}" height="${size}" fill="${BRAND_HEX}"/>
        </svg>`,
  );
  // Inset the mark so it breathes inside the disc.
  const glyphSize = Math.round(size * (shape === 'circle' ? 0.66 : 0.72));
  const glyph = await recolour(MARK, glyphSize, INK);
  const offset = Math.round((size - glyphSize) / 2);

  return sharp(backdrop).composite([{ input: glyph, left: offset, top: offset }]).png().toBuffer();
}

await sharp(await icon(512)).toFile('public/favicon.png');
await sharp(await icon(32)).toFile('public/favicon-32x32.png');
await sharp(await icon(180, 'square')).toFile('public/apple-touch-icon.png');

// --- Link-preview icon --------------------------------------------------------
/*
  The image WhatsApp, Facebook, LinkedIn and X show when a link to the site is
  shared: the favicon's yellow compass disc, centred on the site's ink colour.

  Why not favicon.png itself: its corners are transparent, and WhatsApp
  re-encodes preview thumbnails as JPEG, which has no transparency, so the
  corners would come out as solid black or white blocks. An opaque square
  avoids that.

  Why 256px: WhatsApp shows preview images roughly 300px wide or larger as a
  big banner above the message. Staying below that keeps it a small icon beside
  the text, while clearing Facebook's 200px minimum.
*/
const OG_ICON = 256;
const DISC = 216;
await sharp({ create: { width: OG_ICON, height: OG_ICON, channels: 3, background: INK } })
  .composite([{ input: await icon(DISC), left: (OG_ICON - DISC) / 2, top: (OG_ICON - DISC) / 2 }])
  .png()
  .toFile('public/og-icon.png');

console.log('Brand assets generated: favicon.png, favicon-32x32.png, apple-touch-icon.png, og-icon.png');
