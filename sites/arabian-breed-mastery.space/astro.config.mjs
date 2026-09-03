import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.arabian-breed-mastery.space',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  output: 'static',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-heading',
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
    },
    {
      provider: fontProviders.google(),
      name: 'Outfit',
      cssVariable: '--font-body',
      weights: [400, 500, 600, 700],
    },
  ],
});
