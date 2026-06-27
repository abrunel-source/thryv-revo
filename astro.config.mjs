import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production site URL — update if the final domain differs.
export default defineConfig({
  site: 'https://thryv.co.za',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      serialize(item) {
        const u = item.url;
        if (u === 'https://thryv.co.za/') item.priority = 1.0;
        else if (u.includes('/services/')) item.priority = 0.9;
        else if (u === 'https://thryv.co.za/contact/' || u === 'https://thryv.co.za/about/') item.priority = 0.8;
        else if (u.includes('/blog/')) item.priority = 0.6;
        else item.priority = 0.5;
        return item;
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
