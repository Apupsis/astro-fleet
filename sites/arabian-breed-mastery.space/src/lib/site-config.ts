import type { MenuItem } from '@astro-fleet/shared-ui/src/components/Header.astro';
import type {
  FooterColumn,
  ContactInfo,
  SocialLink,
} from '@astro-fleet/shared-ui/src/components/Footer.astro';

export const SITE_NAME = 'Arabian Breed Mastery';
export const TAGLINE = 'Мастерство Арабской Породы · Soft work for hot horses · Egypt, est. 2020';
export const LOGO_SRC = '/brand/wordmark.svg';
export const LOGO_ALT = SITE_NAME;

/** Root-relative path; pages must resolve to absolute URL for og:image scrapers. */
export const OG_IMAGE_PATH = '/images/og-default.jpg';
export const OG_IMAGE_ALT =
  'Arabian Breed Mastery — Quiet hands for hot horses';

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
      { label: 'Call +20 122 060 1781', href: 'tel:+201220601781' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our story', href: '/about/' },
      { label: 'Since 2020', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];

export const contactInfo: ContactInfo = {
  phone: '+20 122 060 1781',
  address: 'Unnamed road, Al Maţarīyah, Ad Daqahlīyah 35789, Egypt',
};

export const socialLinks: SocialLink[] = [];

export const PHONE_E164 = '+201220601781';
