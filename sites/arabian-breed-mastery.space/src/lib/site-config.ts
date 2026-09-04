import type { MenuItem } from '@astro-fleet/shared-ui/src/components/Header.astro';
import type {
  FooterColumn,
  ContactInfo,
  SocialLink,
} from '@astro-fleet/shared-ui/src/components/Footer.astro';
import { programs } from './programs';

export const SITE_NAME = 'Arabian Breed Mastery';
/** Canonical Arabic slogan — use everywhere instead of inventing variants. */
export const SLOGAN_AR = 'عمل هادئ للخيول الحارة';
export const LOGO_SRC = '/brand/wordmark.svg';
export const LOGO_ALT = SITE_NAME;

/** Root-relative path; pages must resolve to absolute URL for og:image scrapers. */
export const OG_IMAGE_PATH = '/images/og-default.jpg';
export const OG_IMAGE_ALT = `Arabian Breed Mastery — ${SLOGAN_AR}`;

/** Contact & location — single source of truth for phone, address, founding. */
export const PHONE_DISPLAY = '+20 122 060 1781';
export const PHONE_E164 = '+201220601781';
export const FOUNDING_YEAR = '2020';
export const AREA_SERVED = 'مصر';

export const TAGLINE = `${SLOGAN_AR} · مصر، تأسست ${FOUNDING_YEAR}`;

export const address = {
  streetAddress: 'طريق بدون اسم',
  addressLocality: 'المطرية',
  addressRegion: 'الدقهلية',
  postalCode: '35789',
  addressCountry: 'EG',
  countryName: 'مصر',
} as const;

export const LOCATION_SHORT = `${address.addressLocality}، ${address.countryName}`;
export const LOCATION_REGION = `${address.addressLocality}، ${address.addressRegion}`;

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
    `${address.addressLocality}، ${address.addressRegion} ${address.postalCode}`,
    address.countryName,
  ].join('، '),
};

export const navigation: MenuItem[] = [
  { label: 'عنّا', href: '/about-us/' },
  { label: 'البرامج', href: '/programs/' },
  { label: 'تواصل', href: '/contact-us/' },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'البرامج',
    links: programs.map((p) => ({
      label: p.title,
      href: `/programs/${p.slug}/`,
    })),
  },
  {
    title: 'الزيارة',
    links: [
      { label: 'احجز جلسة', href: '/contact-us/' },
      { label: 'الموقع', href: '/contact-us/' },
      { label: `اتصل على ${PHONE_DISPLAY}`, href: `tel:${PHONE_E164}` },
    ],
  },
  {
    title: 'عنّا',
    links: [
      { label: 'قصتنا', href: '/about-us/' },
      { label: `منذ ${FOUNDING_YEAR}`, href: '/about-us/' },
      { label: 'تواصل', href: '/contact-us/' },
    ],
  },
];

export const socialLinks: SocialLink[] = [];

export const legalLinks = [
  { label: 'الخصوصية', href: '/privacy-policy/' },
  { label: 'ملفات تعريف الارتباط', href: '/cookie-policy/' },
  { label: 'الشروط', href: '/terms/' },
  { label: 'تحذيرات', href: '/warnings/' },
  { label: 'خريطة الموقع', href: '/sitemap.xml' },
];

/** Shared BaseLayout chrome strings for Arabic-only site. */
export const layoutChrome = {
  htmlLang: 'ar' as const,
  htmlDir: 'rtl' as const,
  locale: 'ar_EG',
  skipLinkText: 'تخطى إلى المحتوى الرئيسي',
  ctaText: 'احجز جلسة',
  ctaHref: '/contact-us/',
  rightsText: 'جميع الحقوق محفوظة.',
  showLegalLinks: true,
  legalLinks,
  navAriaLabel: 'التنقل الرئيسي',
  homeAriaLabel: `${SITE_NAME} — الصفحة الرئيسية`,
  menuToggleAriaLabel: 'فتح قائمة الجوال',
  mobileNavAriaLabel: 'تنقل الجوال',
  breadcrumbAriaLabel: 'مسار التنقل',
  faqAriaLabel: 'الأسئلة الشائعة',
  timelineAriaLabel: 'الجدول الزمني',
};
