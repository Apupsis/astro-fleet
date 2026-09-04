# Arabian Breed Mastery Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add local stock photos, an SVG wordmark, and one site-wide OG card to `arabian-breed-mastery.space` per the locked design (mixed set, full-bleed hero, CREDITS.md only).

**Architecture:** Content photos live in `src/assets/photos/` and render via Astro `<Image />`. The wordmark and OG JPEG live under `public/` so Header/`og:image` can use stable root-relative URLs. A small `src/lib/images.ts` centralises imports + alt text; pages pass `ogImage`/`logoSrc` from `site-config`.

**Tech Stack:** Astro 6 `astro:assets`, Bun, Unsplash License stock (downloaded once), optional `sharp` one-shot for OG compositing.

**Spec:** `docs/superpowers/specs/2026-09-03-arabian-breed-mastery-images-design.md`

---

## File map

| Path | Role |
|---|---|
| `sites/arabian-breed-mastery.space/src/assets/photos/*.jpg` | Optimised content photos (8 files) |
| `sites/arabian-breed-mastery.space/public/brand/wordmark.svg` | Header logo (plain `<img>` URL) |
| `sites/arabian-breed-mastery.space/public/images/og-default.jpg` | 1200×630 social card |
| `sites/arabian-breed-mastery.space/CREDITS.md` | Photographer + URL per file |
| `sites/arabian-breed-mastery.space/src/lib/images.ts` | Typed photo imports + alts |
| `sites/arabian-breed-mastery.space/src/lib/site-config.ts` | `LOGO_SRC`, `OG_IMAGE_PATH`, `OG_IMAGE_ALT` |
| `sites/arabian-breed-mastery.space/src/pages/index.astro` | Full-bleed hero + pillar images |
| `sites/arabian-breed-mastery.space/src/pages/about.astro` | Atmosphere band + OG |
| `sites/arabian-breed-mastery.space/src/pages/services.astro` | Offering images + OG |
| `sites/arabian-breed-mastery.space/src/pages/contact.astro` | OG only (no content photos) |
| `sites/arabian-breed-mastery.space/src/pages/404.astro` | OG only |
| `sites/arabian-breed-mastery.space/scripts/make-og.mjs` | One-shot OG generator |

**Note on wordmark path:** Spec listed `src/assets/brand/wordmark.svg`. Header uses a plain `src` string, so the plan uses `public/brand/wordmark.svg` instead. Same SVG, stable URL.

---

### Task 1: Asset folders + download stock photos

**Files:**
- Create: `sites/arabian-breed-mastery.space/src/assets/photos/` (8 JPEGs)
- Create: `sites/arabian-breed-mastery.space/CREDITS.md`

- [ ] **Step 1: Create directories**

```powershell
New-Item -ItemType Directory -Force -Path `
  "E:\astro-fleet\sites\arabian-breed-mastery.space\src\assets\photos", `
  "E:\astro-fleet\sites\arabian-breed-mastery.space\public\brand", `
  "E:\astro-fleet\sites\arabian-breed-mastery.space\public\images" | Out-Null
```

- [ ] **Step 2: Download the eight photos (Unsplash Source URLs)**

Use `Invoke-WebRequest`. Prefer images ≥1600px on the long edge. If a URL 404s, search Unsplash for the described subject and substitute — then update CREDITS.

```powershell
$photos = "E:\astro-fleet\sites\arabian-breed-mastery.space\src\assets\photos"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=2400&q=85" -OutFile "$photos\hero-dusk.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1593179449458-e0d43d512551?auto=format&fit=crop&w=1600&q=85" -OutFile "$photos\pillar-hand.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?auto=format&fit=crop&w=1600&q=85" -OutFile "$photos\pillar-calm.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1534180476814-4b5234f5f3f7?auto=format&fit=crop&w=1600&q=85" -OutFile "$photos\pillar-anatomy.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1450052594571-673b83bd55c6?auto=format&fit=crop&w=2400&q=85" -OutFile "$photos\about-atmosphere.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1534120247760-c44c3e4a7f1f?auto=format&fit=crop&w=1600&q=85" -OutFile "$photos\work-soft.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1518459022354-1f19c1f04243?auto=format&fit=crop&w=1600&q=85" -OutFile "$photos\work-calm.jpg"
Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1598974357801-cbca100e65e0?auto=format&fit=crop&w=1600&q=85" -OutFile "$photos\work-anatomy.jpg"
Get-ChildItem $photos | Select-Object Name, Length
```

Expected: eight files, each clearly >50 KB (reject tiny error HTML).

Subject checklist if you must substitute:

| File | Subject |
|---|---|
| `hero-dusk.jpg` | Horse in soft side light / dusk, calm profile |
| `pillar-hand.jpg` | Hand/rein or muzzle close-up |
| `pillar-calm.jpg` | Quiet horse face/eye, low arousal feel |
| `pillar-anatomy.jpg` | Body/structure/shoulder of a horse |
| `about-atmosphere.jpg` | Landscape / yard / equestrian place atmosphere |
| `work-soft.jpg` | Soft contact / ridden quiet work |
| `work-calm.jpg` | Training / arena, controlled energy |
| `work-anatomy.jpg` | Side view / conformation / body awareness |

- [ ] **Step 3: Write CREDITS.md**

Create `sites/arabian-breed-mastery.space/CREDITS.md`:

```markdown
# Photo credits — arabian-breed-mastery.space

All photos used under the [Unsplash License](https://unsplash.com/license).
Downloaded locally; not hotlinked at runtime. Attribution recorded for maintainers
(not shown on the public site).

| File | Photographer | Source | Downloaded |
|---|---|---|---|
| `src/assets/photos/hero-dusk.jpg` | [NAME] | https://unsplash.com/photos/PHOTO_ID | 2026-09-03 |
| `src/assets/photos/pillar-hand.jpg` | [NAME] | https://unsplash.com/photos/PHOTO_ID | 2026-09-03 |
| `src/assets/photos/pillar-calm.jpg` | [NAME] | https://unsplash.com/photos/PHOTO_ID | 2026-09-03 |
| `src/assets/photos/pillar-anatomy.jpg` | [NAME] | https://unsplash.com/photos/PHOTO_ID | 2026-09-03 |
| `src/assets/photos/about-atmosphere.jpg` | [NAME] | https://unsplash.com/photos/PHOTO_ID | 2026-09-03 |
| `src/assets/photos/work-soft.jpg` | [NAME] | https://unsplash.com/photos/PHOTO_ID | 2026-09-03 |
| `src/assets/photos/work-calm.jpg` | [NAME] | https://unsplash.com/photos/PHOTO_ID | 2026-09-03 |
| `src/assets/photos/work-anatomy.jpg` | [NAME] | https://unsplash.com/photos/PHOTO_ID | 2026-09-03 |
| `public/images/og-default.jpg` | Derived from `hero-dusk.jpg` + brand overlay | — | 2026-09-03 |
```

Fill `[NAME]` / `PHOTO_ID` from each Unsplash page (open the photo URL without query params). Do **not** add a footer credits link.

- [ ] **Step 4: Commit**

```bash
git add sites/arabian-breed-mastery.space/src/assets/photos sites/arabian-breed-mastery.space/CREDITS.md
git commit -m "$(cat <<'EOF'
chore: add stock photos and CREDITS for arabian-breed-mastery

EOF
)"
```

---

### Task 2: SVG wordmark + site-config wiring

**Files:**
- Create: `sites/arabian-breed-mastery.space/public/brand/wordmark.svg`
- Modify: `sites/arabian-breed-mastery.space/src/lib/site-config.ts`

- [ ] **Step 1: Create the wordmark SVG**

Write `public/brand/wordmark.svg` (Nile dusk: `#152238`, `#3D7A78`, `#E8E4DC`):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 48" role="img" aria-labelledby="wmTitle">
  <title id="wmTitle">Arabian Breed Mastery</title>
  <rect x="0" y="4" width="40" height="40" rx="2" fill="#152238"/>
  <text x="20" y="31" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="14" font-weight="600" fill="#E8E4DC" letter-spacing="0.06em">ABM</text>
  <text x="52" y="22" font-family="Georgia, 'Times New Roman', serif" font-size="16" font-weight="500" fill="#152238">Arabian Breed Mastery</text>
  <text x="52" y="38" font-family="system-ui, sans-serif" font-size="9" font-weight="500" fill="#3D7A78" letter-spacing="0.14em">SOFT WORK · EGYPT</text>
</svg>
```

- [ ] **Step 2: Update site-config**

In `src/lib/site-config.ts`, replace `LOGO_SRC` and add OG constants:

```ts
export const LOGO_SRC = '/brand/wordmark.svg';

/** Root-relative path; pages must resolve to absolute URL for og:image scrapers. */
export const OG_IMAGE_PATH = '/images/og-default.jpg';
export const OG_IMAGE_ALT =
  'Arabian Breed Mastery — Quiet hands for hot horses';
```

Keep all other exports unchanged. Pages already pass `logoSrc={LOGO_SRC}` — the header will switch from text to the SVG once this constant is set.

- [ ] **Step 3: Smoke-check in browser**

```powershell
cd E:\astro-fleet\sites\arabian-breed-mastery.space
bun E:\astro-fleet\node_modules\astro\bin\astro.mjs dev --port 4321 --host 127.0.0.1
```

Open `http://127.0.0.1:4321/` — header should show the ABM mark + wordmark (not plain text only).

- [ ] **Step 4: Commit**

```bash
git add sites/arabian-breed-mastery.space/public/brand/wordmark.svg sites/arabian-breed-mastery.space/src/lib/site-config.ts
git commit -m "$(cat <<'EOF'
feat: add ABM wordmark and OG path constants

EOF
)"
```

---

### Task 3: `images.ts` helper + generate OG JPEG

**Files:**
- Create: `sites/arabian-breed-mastery.space/src/lib/images.ts`
- Create: `sites/arabian-breed-mastery.space/scripts/make-og.mjs`
- Create: `sites/arabian-breed-mastery.space/public/images/og-default.jpg`

- [ ] **Step 1: Create images helper**

`src/lib/images.ts`:

```ts
import type { ImageMetadata } from 'astro';
import heroDusk from '../assets/photos/hero-dusk.jpg';
import pillarHand from '../assets/photos/pillar-hand.jpg';
import pillarCalm from '../assets/photos/pillar-calm.jpg';
import pillarAnatomy from '../assets/photos/pillar-anatomy.jpg';
import aboutAtmosphere from '../assets/photos/about-atmosphere.jpg';
import workSoft from '../assets/photos/work-soft.jpg';
import workCalm from '../assets/photos/work-calm.jpg';
import workAnatomy from '../assets/photos/work-anatomy.jpg';

export type SiteImage = {
  src: ImageMetadata;
  alt: string;
};

export const photos = {
  heroDusk: {
    src: heroDusk,
    alt: 'Arabian horse moving through soft dusk light',
  },
  pillarHand: {
    src: pillarHand,
    alt: 'Close view of quiet hand contact with a horse',
  },
  pillarCalm: {
    src: pillarCalm,
    alt: 'Calm Arabian horse face at rest',
  },
  pillarAnatomy: {
    src: pillarAnatomy,
    alt: 'Horse body and structure in profile',
  },
  aboutAtmosphere: {
    src: aboutAtmosphere,
    alt: 'Quiet equestrian landscape at low light',
  },
  workSoft: {
    src: workSoft,
    alt: 'Rider and horse in soft, controlled contact',
  },
  workCalm: {
    src: workCalm,
    alt: 'Horse work in an arena with steady focus',
  },
  workAnatomy: {
    src: workAnatomy,
    alt: 'Horse conformation and movement under saddle',
  },
} as const satisfies Record<string, SiteImage>;
```

- [ ] **Step 2: Install sharp temporarily and write OG script**

```powershell
cd E:\astro-fleet
bun add -d sharp --filter=arabian-breed-mastery.space
```

Create `sites/arabian-breed-mastery.space/scripts/make-og.mjs`:

```js
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
```

- [ ] **Step 3: Run the script**

```powershell
cd E:\astro-fleet\sites\arabian-breed-mastery.space
bun scripts/make-og.mjs
```

Expected: `Wrote ...\public\images\og-default.jpg` with size roughly 80–250 KB.

- [ ] **Step 4: Commit**

```bash
git add sites/arabian-breed-mastery.space/src/lib/images.ts `
  sites/arabian-breed-mastery.space/scripts/make-og.mjs `
  sites/arabian-breed-mastery.space/public/images/og-default.jpg `
  sites/arabian-breed-mastery.space/package.json `
  bun.lock
git commit -m "$(cat <<'EOF'
feat: add image registry and default OG card

EOF
)"
```

---

### Task 4: Home — full-bleed hero + pillar photos

**Files:**
- Modify: `sites/arabian-breed-mastery.space/src/pages/index.astro`

- [ ] **Step 1: Add imports and OG props**

At top of `index.astro`, add:

```astro
import { Image } from 'astro:assets';
import { photos } from '../lib/images';
import { OG_IMAGE_PATH, OG_IMAGE_ALT } from '../lib/site-config';
```

Extend the existing `pillars` array with image keys:

```ts
const pillars = [
  {
    title: 'Soft hand work',
    body: 'Quiet contact through the rein and body. Less force, clearer answers — so the horse can think instead of brace.',
    image: photos.pillarHand,
  },
  {
    title: 'Calming hot horses',
    body: 'Techniques for sensitive, forward, “hot” Arabians: lower arousal, rebuild trust, keep athleticism without the spiral.',
    image: photos.pillarCalm,
  },
  {
    title: 'Anatomy in the room',
    body: 'Every ask respects how the horse is built. We work with structure and breath, not against tension.',
    image: photos.pillarAnatomy,
  },
];
```

On `<BaseLayout ...>` add:

```astro
  ogImage={new URL(OG_IMAGE_PATH, Astro.site).href}
  ogImageAlt={OG_IMAGE_ALT}
```

- [ ] **Step 2: Replace hero markup**

Replace the hero section so photo + overlay sit behind copy (keep brand/title/CTA/meta text):

```astro
  <section class="abm-hero" aria-label="Introduction">
    <Image
      src={photos.heroDusk.src}
      alt=""
      class="abm-hero__photo"
      widths={[800, 1200, 1800, 2400]}
      sizes="100vw"
      loading="eager"
      fetchpriority="high"
      quality={80}
    />
    <div class="abm-hero__overlay" aria-hidden="true"></div>
    <div class="abm-hero__grain" aria-hidden="true"></div>
    <div class="abm-hero__inner">
      <!-- existing brand / title / lede / actions / meta unchanged -->
    </div>
  </section>
```

Use `alt=""` because the hero is decorative relative to the adjacent H1. Remove `.abm-hero__sky` from markup.

- [ ] **Step 3: Update hero CSS**

Replace `.abm-hero__sky` rules with:

```css
  .abm-hero__photo {
    position: absolute;
    inset: 0;
    z-index: -3;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 35%;
  }

  .abm-hero__overlay {
    position: absolute;
    inset: 0;
    z-index: -2;
    background:
      linear-gradient(
        180deg,
        rgba(12, 20, 34, 0.55) 0%,
        rgba(12, 20, 34, 0.45) 40%,
        rgba(12, 20, 34, 0.82) 100%
      ),
      linear-gradient(
        90deg,
        rgba(12, 20, 34, 0.55) 0%,
        rgba(12, 20, 34, 0.2) 55%,
        rgba(12, 20, 34, 0.35) 100%
      );
  }
```

If body/CTA contrast fails against the real photo, darken the bottom stop toward `0.9` opacity. Target ≥4.5:1 for lede, ≥3:1 for large title.

- [ ] **Step 4: Pillar images in markup + CSS**

Inside the pillar map:

```astro
          <article class="abm-pillar">
            <Image
              src={p.image.src}
              alt={p.image.alt}
              class="abm-pillar__img"
              widths={[400, 640, 800]}
              sizes="(min-width: 768px) 30vw, 100vw"
              loading="lazy"
              quality={75}
            />
            <span class="abm-pillar__num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
```

Add CSS:

```css
  .abm-pillar__img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    margin-bottom: 1.25rem;
  }
```

- [ ] **Step 5: Verify home**

Check:
- `http://127.0.0.1:4321/` hero photo visible, text readable
- Three pillar images load
- View source: `og:image` contains `.../images/og-default.jpg`

- [ ] **Step 6: Commit**

```bash
git add sites/arabian-breed-mastery.space/src/pages/index.astro
git commit -m "$(cat <<'EOF'
feat: full-bleed hero and pillar photos on home

EOF
)"
```

---

### Task 5: Approach + Work pages

**Files:**
- Modify: `sites/arabian-breed-mastery.space/src/pages/about.astro`
- Modify: `sites/arabian-breed-mastery.space/src/pages/services.astro`

- [ ] **Step 1: Approach — imports, OG, atmosphere band**

Add imports:

```astro
import { Image } from 'astro:assets';
import { photos } from '../lib/images';
import { OG_IMAGE_PATH, OG_IMAGE_ALT } from '../lib/site-config';
```

On BaseLayout:

```astro
  ogImage={new URL(OG_IMAGE_PATH, Astro.site).href}
  ogImageAlt={OG_IMAGE_ALT}
```

Insert **after** `.abm-page-hero` and **before** `.abm-belief`:

```astro
  <figure class="abm-atmosphere">
    <Image
      src={photos.aboutAtmosphere.src}
      alt={photos.aboutAtmosphere.alt}
      class="abm-atmosphere__img"
      widths={[800, 1200, 1800]}
      sizes="100vw"
      loading="lazy"
      quality={75}
    />
  </figure>
```

CSS:

```css
  .abm-atmosphere {
    margin: 0;
  }

  .abm-atmosphere__img {
    display: block;
    width: 100%;
    max-height: min(52vh, 520px);
    object-fit: cover;
    object-position: center;
  }
```

- [ ] **Step 2: Work — imports, OG, offering images**

Add imports (`Image`, `photos`, `OG_*`). Extend offerings with `image: photos.workSoft | workCalm | workAnatomy` (keep existing titles/summaries/points).

Update article markup:

```astro
          <article class="abm-offer">
            <span class="abm-offer__num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div class="abm-offer__media">
              <Image
                src={o.image.src}
                alt={o.image.alt}
                class="abm-offer__img"
                widths={[480, 720, 960]}
                sizes="(min-width: 768px) 36vw, 100vw"
                loading="lazy"
                quality={75}
              />
            </div>
            <div class="abm-offer__copy">
              <h2>{o.title}</h2>
              <p class="abm-offer__summary">{o.summary}</p>
              <ul>
                {o.points.map((pt) => (
                  <li>{pt}</li>
                ))}
              </ul>
            </div>
          </article>
```

Replace offer grid CSS:

```css
  .abm-offer {
    display: grid;
    gap: 1.25rem;
    padding: 2.5rem 0;
    border-top: 1px solid var(--color-border);
  }

  .abm-offer:last-child {
    border-bottom: 1px solid var(--color-border);
  }

  @media (min-width: 768px) {
    .abm-offer {
      grid-template-columns: 4rem 1fr 1.1fr;
      gap: 2rem;
      align-items: start;
      padding: 3rem 0;
    }
  }

  .abm-offer__img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  @media (max-width: 767px) {
    .abm-offer__num {
      order: -1;
    }
  }
```

Keep honest-note section text-only.

- [ ] **Step 3: Verify**

Open `/about/` and `/services/` — atmosphere and three offering images present; no horizontal overflow at 375px.

- [ ] **Step 4: Commit**

```bash
git add sites/arabian-breed-mastery.space/src/pages/about.astro sites/arabian-breed-mastery.space/src/pages/services.astro
git commit -m "$(cat <<'EOF'
feat: add Approach and Work page photography

EOF
)"
```

---

### Task 6: OG on Contact + 404; build verification

**Files:**
- Modify: `sites/arabian-breed-mastery.space/src/pages/contact.astro`
- Modify: `sites/arabian-breed-mastery.space/src/pages/404.astro`
- Modify: `sites/arabian-breed-mastery.space/ASSUMPTIONS.md`

- [ ] **Step 1: Wire OG on remaining pages**

On both `contact.astro` and `404.astro`:

```astro
import { OG_IMAGE_PATH, OG_IMAGE_ALT } from '../lib/site-config';
```

```astro
  ogImage={new URL(OG_IMAGE_PATH, Astro.site).href}
  ogImageAlt={OG_IMAGE_ALT}
```

Do **not** add content photos to Contact.

- [ ] **Step 2: Note in ASSUMPTIONS.md**

Append:

```markdown
- **Imagery:** Licensed Unsplash stock downloaded into `src/assets/photos/` (mixed set: dusk hero, close-up pillars, arena/atmosphere on Approach & Work). Wordmark SVG in `public/brand/`. Single OG JPEG in `public/images/og-default.jpg`. Credits in `CREDITS.md` only — no public credits page. Swap client photos later by replacing files with the same names.
```

- [ ] **Step 3: Production build**

```powershell
cd E:\astro-fleet
bun run build --filter=arabian-breed-mastery.space
```

Expected: build exits 0. Dist contains optimised image assets under `_astro/` and copies of `brand/wordmark.svg` + `images/og-default.jpg`.

- [ ] **Step 4: HTML checks on built output**

```powershell
Select-String -Path "E:\astro-fleet\sites\arabian-breed-mastery.space\dist\index.html" -Pattern "og:image","wordmark","abm-hero__photo"
Select-String -Path "E:\astro-fleet\sites\arabian-breed-mastery.space\dist\contact\index.html" -Pattern "og:image"
Select-String -Path "E:\astro-fleet\sites\arabian-breed-mastery.space\dist\contact\index.html" -Pattern "abm-pillar__img|abm-offer__img"
```

Expected: home has `og:image` + hero photo class; contact has `og:image` and no content-photo classes.

- [ ] **Step 5: Contrast spot-check**

In browser DevTools on hero: sample lede text against the darkened photo region under the overlay. If contrast < 4.5:1, increase `.abm-hero__overlay` bottom opacity and rebuild.

- [ ] **Step 6: Final commit**

```bash
git add sites/arabian-breed-mastery.space/src/pages/contact.astro `
  sites/arabian-breed-mastery.space/src/pages/404.astro `
  sites/arabian-breed-mastery.space/ASSUMPTIONS.md
git commit -m "$(cat <<'EOF'
feat: wire sitewide OG image and document imagery assumptions

EOF
)"
```

---

## Spec coverage checklist

| Spec item | Task |
|---|---|
| Local stock, no hotlink | 1 |
| Mixed set subjects | 1 |
| CREDITS.md only | 1 |
| Wordmark SVG in header | 2 |
| `images.ts` + alts | 3 |
| OG 1200×630 JPEG in `public/` | 3 |
| Full-bleed hero + overlay AA | 4 |
| Pillar photos | 4 |
| Approach atmosphere | 5 |
| Work offering photos | 5 |
| Contact without photos | 6 |
| OG on all pages | 4–6 |
| Build + verify | 6 |
| Client swap via same filenames | ASSUMPTIONS (Task 6) |

## Out of scope (do not implement)

- Public `/credits/` page or footer credits link
- Per-page Satori OG
- Contact photography
- Gallery / lightbox / CMS
