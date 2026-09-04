import type { MenuItem } from '@astro-fleet/shared-ui/src/components/Header.astro';
import type {
  FooterColumn,
  ContactInfo,
  SocialLink,
} from '@astro-fleet/shared-ui/src/components/Footer.astro';

export const SITE_NAME = 'Arabian Breed Mastery';
export const ALTERNATE_NAME = 'Мастерство Арабской Породы';
export const LOGO_SRC = '/brand/wordmark.svg';
export const LOGO_ALT = SITE_NAME;

/** Root-relative path; pages must resolve to absolute URL for og:image scrapers. */
export const OG_IMAGE_PATH = '/images/og-default.jpg';
export const OG_IMAGE_ALT =
  'Arabian Breed Mastery — Quiet hands for hot horses';

/** Contact & location — single source of truth for phone, address, founding. */
export const PHONE_DISPLAY = '+20 122 060 1781';
export const PHONE_E164 = '+201220601781';
export const FOUNDING_YEAR = '2020';
export const AREA_SERVED = 'Egypt';

export const TAGLINE = `${ALTERNATE_NAME} · Soft work for hot horses · ${AREA_SERVED}, est. ${FOUNDING_YEAR}`;

export const address = {
  streetAddress: 'Unnamed road',
  addressLocality: 'Al Maţarīyah',
  addressRegion: 'Ad Daqahlīyah',
  postalCode: '35789',
  addressCountry: 'EG',
  countryName: 'Egypt',
} as const;

export const LOCATION_SHORT = `${address.addressLocality}, ${address.countryName}`;
export const LOCATION_REGION = `${address.addressLocality}, ${address.addressRegion}`;

export function postalAddressSchema() {
  return {
    '@type': 'PostalAddress' as const,
    streetAddress: address.streetAddress,
    addressLocality: address.addressLocality,
    addressRegion: address.addressRegion,
    postalCode: address.postalCode,
    addressCountry: address.addressCountry,
  };
}

export const contactInfo: ContactInfo = {
  phone: PHONE_DISPLAY,
  address: [
    address.streetAddress,
    `${address.addressLocality}, ${address.addressRegion} ${address.postalCode}`,
    address.countryName,
  ].join(', '),
};

export const navigation: MenuItem[] = [
  { label: 'Approach', href: '/about/' },
  { label: 'Work', href: '/services/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Practice',
    links: [
      { label: 'Approach', href: '/about/' },
      { label: 'Soft hand work', href: '/services/' },
      { label: 'Calming hot horses', href: '/services/' },
      { label: 'Anatomy-aware sessions', href: '/services/' },
    ],
  },
  {
    title: 'Visit',
    links: [
      { label: 'Book a session', href: '/contact/' },
      { label: 'Location', href: '/contact/' },
      { label: `Call ${PHONE_DISPLAY}`, href: `tel:${PHONE_E164}` },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our story', href: '/about/' },
      { label: `Since ${FOUNDING_YEAR}`, href: '/about/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];

export const socialLinks: SocialLink[] = [];
