import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcPhoto = join(root, 'src/assets/photos/hero-dusk.jpg');
const outPath = join(root, 'public/images/og-default.jpg');

await mkdir(dirname(outPath), { recursive: true });

const base = await sharp(srcPhoto)
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .modulate({ brightness: 0.55 })
  .jpeg({ quality: 88 })
  .toBuffer();

// Arabic glyphs need a system face with Arabic coverage (Segoe UI / Arial on Windows).
const overlay = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0c1422" stop-opacity="0.25"/>
      <stop offset="55%" stop-color="#0c1422" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0c1422" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="1120" y="400" text-anchor="end" font-family="Georgia, serif" font-size="28" fill="#9EC5C3" letter-spacing="4">ARABIAN BREED MASTERY</text>
  <text x="1120" y="490" text-anchor="end" font-family="'Segoe UI', Arial, 'Noto Naskh Arabic', sans-serif" font-size="48" fill="#F3EFE8" direction="rtl" unicode-bidi="embed">عمل هادئ للخيول الحارة</text>
  <text x="1120" y="545" text-anchor="end" font-family="'Segoe UI', Arial, sans-serif" font-size="22" fill="#CFC8BC" direction="rtl" unicode-bidi="embed">مصر · تأسست 2020</text>
</svg>
`);

const out = await sharp(base)
  .composite([{ input: await sharp(overlay).png().toBuffer(), top: 0, left: 0 }])
  .jpeg({ quality: 90 })
  .toBuffer();

await writeFile(outPath, out);
console.log('Wrote', outPath, out.length, 'bytes');
