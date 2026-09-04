import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.arabian-breed-mastery.space',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  output: 'static',
  redirects: {
    '/about': '/about-us/',
    '/contact': '/contact-us/',
    '/services': '/programs/',
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-brand',
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
    },
    {
      provider: fontProviders.google(),
      name: 'Amiri',
      cssVariable: '--font-heading',
      weights: [400, 700],
      styles: ['normal', 'italic'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Sans Arabic',
      cssVariable: '--font-body',
      weights: [400, 500, 600, 700],
    },
  ],
});
