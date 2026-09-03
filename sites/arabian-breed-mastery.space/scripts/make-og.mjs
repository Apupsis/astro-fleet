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
  <text x="80" y="430" font-family="Georgia, serif" font-size="28" fill="#9EC5C3" letter-spacing="4">ARABIAN BREED MASTERY</text>
  <text x="80" y="510" font-family="Georgia, serif" font-size="64" fill="#F3EFE8">Quiet hands for hot horses</text>
  <text x="80" y="560" font-family="system-ui, sans-serif" font-size="22" fill="#CFC8BC">Egypt · Est. 2020</text>
</svg>
`);

const out = await sharp(base)
  .composite([{ input: await sharp(overlay).png().toBuffer(), top: 0, left: 0 }])
  .jpeg({ quality: 90 })
  .toBuffer();

await writeFile(outPath, out);
console.log('Wrote', outPath, out.length, 'bytes');
