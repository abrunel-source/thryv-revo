import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production site URL — update if the final domain differs.
export default defineConfig({
  site: 'https://thryv.co.za',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
