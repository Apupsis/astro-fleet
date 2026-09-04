# arabian-breed-mastery.space — Image System Design

**Date:** 2026-09-03  
**Site:** `sites/arabian-breed-mastery.space`  
**Status:** Draft for review

## Goal

Add a coherent image layer to Arabian Breed Mastery without inventing client photography: licensed stock (downloaded locally), a custom SVG wordmark, and one site-wide Open Graph card — while preserving the Nile dusk brand and WCAG AA contrast on the full-bleed hero.

## Decisions (locked)

| Topic | Choice |
|---|---|
| Source | Licensed stock (e.g. Unsplash), local copies — permanent until client photos arrive |
| Mood | **Mixed set** — dusk hero, close-up pillars, arena/atmosphere on Approach & Work |
| Home hero | **Full-bleed photo + dark overlay**, text/CTA on top |
| Slots | Logo, OG, Home hero, Home pillars, Approach, Work — **not** Contact |
| Logo | Custom **SVG wordmark** (Nile dusk) |
| OG | Single **photo + brand overlay** JPG for all pages |
| Tech | `src/assets/` + Astro `<Image />` (`astro:assets`) |
| Credits | **`CREDITS.md` only** — no footer link, no `/credits/` page |

## Current state (baseline)

- Pages: Home, Approach, Work, Contact, 404 — copy and layout exist; **no content images**.
- Visuals today: CSS gradient sky + SVG noise grain on home hero; text logo (`LOGO_SRC` undefined).
- Monorepo demo sites also ship without photo libraries; docs recommend `astro:assets` and `BaseLayout` `ogImage`.
- Repo policy: no fabricated proof; stock is acceptable as atmospheric illustration until real session photos exist.

## Architecture

```
sites/arabian-breed-mastery.space/
  CREDITS.md
  public/
    favicon.svg
    images/og-default.jpg          # absolute URL for og:image scrapers
  src/
    assets/
      brand/
        wordmark.svg
      photos/
        hero-dusk.jpg
        pillar-hand.jpg
        pillar-calm.jpg
        pillar-anatomy.jpg
        about-atmosphere.jpg
        work-soft.jpg
        work-calm.jpg
        work-anatomy.jpg
    lib/
      site-config.ts               # LOGO_SRC → wordmark (or / path)
      images.ts                    # typed imports + alt strings (optional helper)
    pages/
      index.astro                  # hero + pillars
      about.astro                  # atmosphere band
      services.astro               # three offering photos
```

**Why split `public/images/og-default.jpg` vs `src/assets/photos/`:**  
Social scrapers need a stable absolute URL. Astro-optimized hashed assets are awkward for `og:image`. Content photos go through the image pipeline; OG is a fixed JPEG in `public/`.

**No Unsplash hotlinking in production.** Download once, commit (or LFS if large), reference locally.

## Page placements

### Home (`index.astro`)

1. **Hero (full-bleed):** `hero-dusk.jpg` as background (or absolutely positioned `<Image>` behind copy). Keep existing brand/title/CTA structure. Overlay: deep indigo gradient so body/CTA meet AA against the composited photo. Grain optional, `aria-hidden`.
2. **Pillars:** each of the three focus cards gets a close-up:
   - Soft hand work → `pillar-hand.jpg`
   - Calming hot horses → `pillar-calm.jpg`
   - Anatomy → `pillar-anatomy.jpg`

### Approach (`about.astro`)

- After the page hero / before method: one full-width **atmosphere** image (`about-atmosphere.jpg`).
- Timeline and belief quote stay text-first.

### Work (`services.astro`)

- Each offering block: image + copy (soft / calm / anatomy → `work-*.jpg`).
- Honest-note section stays text-only.

### Contact / 404

- No new content photos.

### Chrome

- Header: SVG wordmark via `LOGO_SRC`.
- All pages: `ogImage="/images/og-default.jpg"` (resolved against `site` in config) + `ogImageAlt`.

## Wordmark

- SVG, Nile dusk palette (`#152238`, `#3D7A78`, limestone `#E8E4DC` as needed).
- Prefer compact mark: **ABM** monogram + short wordmark “Arabian Breed Mastery” for larger breakpoints; collapse to monogram on narrow header if needed.
- Height ~40–48px; crisp at 1x/2x; no raster.

## Open Graph

- One static `1200×630` JPEG: dusk photo, darkened, site name + short tagline (“Quiet hands for hot horses” or bilingual secondary line).
- Wired on every `BaseLayout` call for this site.
- JPEG (not WebP) for LinkedIn/Slack unfurl reliability per `docs/seo-recipes.md`.

## Accessibility & performance

- Meaningful `alt` in English describing subject (breed/work context), not “image1”.
- Hero LCP image: `loading="eager"` / Astro priority where supported; other photos lazy.
- Explicit `width`/`height` (or Astro defaults) to avoid CLS.
- Visible keyboard focus on CTAs over the hero.
- No motion that fights `prefers-reduced-motion` (no parallax required).
- Measure contrast of hero text against the **real** overlay+photo composite; adjust gradient opacity until AA passes.

## Licensing

- Prefer Unsplash License (or equivalent free commercial use with attribution optional).
- Record every file in `CREDITS.md`: filename, photographer, source URL, license, download date.
- **Do not** add a footer “Photo credits” link or a public credits page (user decision).

## Client photo swap later

Replace files under `src/assets/photos/` (and regenerate OG if desired) **keeping the same filenames**. No layout change required. Mark any session photos that need model/horse owner release in `CREDITS.md`.

## Out of scope

- Contact page photography
- Gallery / lightbox / CMS media library
- Per-page dynamic OG (Satori)
- Stock served from a third-party CDN at runtime

## Success criteria

- Build passes for `arabian-breed-mastery.space`.
- Home, Approach, Work show the planned images; Contact does not.
- Wordmark appears in the header; OG meta present with `/images/og-default.jpg`.
- No broken images; hero text contrast ≥ AA on sampled composites.
- `CREDITS.md` lists every stock file used.
