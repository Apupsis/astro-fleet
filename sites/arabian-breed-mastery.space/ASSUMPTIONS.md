# Assumptions — arabian-breed-mastery.space

- **Language:** Arabic (MSA), RTL site-wide (`lang="ar"` `dir="rtl"` `locale="ar_EG"`). Brand name stays Latin: `Arabian Breed Mastery`. Arabic slogan: `عمل هادئ للخيول الحارة`. No English UI; Russian secondary line removed.
- **Primary action:** احجز جلسة (phone / enquiry form) → `/contact-us/`.
- **Pages (canonical):** Home `/`, About `/about-us/`, Programs catalog `/programs/` + four details (`ground-longe`, `seat-reins`, `temperament-control`, `arena-collection`), Contact `/contact-us/`, Legal `/privacy-policy/`, `/cookie-policy/`, `/terms/`, `/warnings/`. Legacy `/about/`, `/contact/`, `/services/` 301 to canon.
- **Design direction:** “Quiet hand at Nile dusk” — cool limestone ground, deep indigo ink, muted Nile teal accent. Arabic display (Amiri) + IBM Plex Sans Arabic body; Cormorant Garamond only for Latin brand. Not cream+terracotta, not SaaS neon.
- **Proof:** No invented client names, counts, or awards. Founded 2020 is stated; anything else marked for supply where needed.
- **Pricing:** No public rate card until the client supplies figures. Program and contact copy say quotes are given before booking.
- **Contact:** Phone, address, founding year, and related labels live in `src/lib/site-config.ts` only (no email). Location framed as Egypt / مصر (Nile Delta), not “Cairo” alone — the supplied street address is in Dakahlia / الدقهلية.
- **Preset seed:** Custom tokens (not an unmodified corporate/saas/warm preset).
- **Imagery:** Licensed Unsplash stock downloaded into `src/assets/photos/` (mixed set: dusk hero, close-up pillars, arena/atmosphere on Approach & Work). Wordmark SVG in `public/brand/`. Single OG JPEG in `public/images/og-default.jpg`. Credits in `CREDITS.md` only — no public credits page. Swap client photos later by replacing files with the same names.
- **Shared UI:** ContactForm forked into `src/components/` for Arabic labels. BaseLayout receives `htmlLang` / `htmlDir` / `locale` / chrome strings / `legalLinks`; footer legal links on (`showLegalLinks: true`).
