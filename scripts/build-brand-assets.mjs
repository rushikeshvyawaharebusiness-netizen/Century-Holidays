// Generates favicons + OG cover from the brand logo.
// Run with: node scripts/build-brand-assets.mjs
//
// Source artwork lives in src/assets/images:
//   logo.png      full lockup (compass "C" + CENTURY HOLIDAYS), black on transparent
//   logo-mark.png the compass "C" alone, square, black on transparent
// Both are pre-trimmed — no transparent padding — so they scale predictably.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const PAPER = { r: 0xfd, g: 0xfd, b: 0xf9, alpha: 1 };
const INK = { r: 0x15, g: 0x14, b: 0x0f, alpha: 1 };
const BRAND_HEX = '#f0ea1b';

const LOGO = 'src/assets/images/logo.png';
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

// --- OG cover: white lockup on ink -------------------------------------------
const OG_W = 1200;
const OG_H = 630;
const logoWidth = 760;
const whiteLogo = await sharp(await sharp(LOGO).resize({ width: logoWidth }).toBuffer())
  .extractChannel('alpha')
  .toBuffer();
const logoMeta = await sharp(LOGO).resize({ width: logoWidth }).metadata();
const whiteLockup = await sharp({
  create: { width: logoWidth, height: logoMeta.height, channels: 3, background: PAPER },
})
  .joinChannel(whiteLogo)
  .png()
  .toBuffer();

const backdrop = Buffer.from(
  `<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${OG_W}" height="${OG_H}" fill="#15140f"/>
    <circle cx="1080" cy="80" r="220" fill="#f0ea1b" fill-opacity="0.08"/>
    <circle cx="90" cy="560" r="180" fill="#f0ea1b" fill-opacity="0.06"/>
  </svg>`,
);

/*
  Tagline under the logo. Keep it in sync with BUSINESS.tagline in
  src/data/site.ts — this script cannot import that TypeScript file directly.
  Brand yellow at 46px so it stays readable when WhatsApp or Facebook shrink the
  preview to a thumbnail: at 30px it dropped to roughly 9px on a phone.
*/
const TAGLINE = 'Crafting Memories for Every Century';
const TAGLINE_BOX_H = 70;
const GAP = 34;
// Centre the logo and tagline as one group, rather than nudging each by eye.
const groupTop = Math.round((OG_H - (logoMeta.height + GAP + TAGLINE_BOX_H)) / 2);

await sharp(backdrop)
  .composite([
    {
      input: whiteLockup,
      left: Math.round((OG_W - logoWidth) / 2),
      top: groupTop,
    },
    {
      input: Buffer.from(
        `<svg width="${OG_W}" height="${TAGLINE_BOX_H}" xmlns="http://www.w3.org/2000/svg">
          <text x="${OG_W / 2}" y="52" text-anchor="middle" font-family="Outfit, Segoe UI, sans-serif"
                font-size="46" font-weight="600" fill="${BRAND_HEX}">${TAGLINE}</text>
        </svg>`,
      ),
      left: 0,
      top: groupTop + logoMeta.height + GAP,
    },
  ])
  .png()
  .toFile('public/og-cover.png');

console.log('Brand assets generated: favicon.png, apple-touch-icon.png, og-cover.png');
