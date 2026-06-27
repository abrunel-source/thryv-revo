# Thryv — Static Astro Website

A fast, accessible, SEO-optimised static rebuild of [thryv.co.za](https://thryv.co.za)
(Thryv Accountants Pty Ltd) using [Astro](https://astro.build). Designed to deploy on
Vercel as a static site — no WordPress, no render-blocking bloat.

## Why this exists

The previous WordPress + Elementor + WP Rocket stack capped out at **Performance 72**
on mobile PageSpeed Insights (LCP 4.6s, ~36 render-blocking stylesheets). This static
rebuild scores (local Lighthouse, mobile, simulated):

| Metric          | WordPress | This site |
| --------------- | --------- | --------- |
| Performance     | 72        | **100**   |
| Accessibility   | 88        | **100**   |
| Best Practices  | 100       | **100**   |
| SEO             | 100       | **100**   |
| LCP             | 4.6 s     | **1.6 s** |
| CLS             | 0         | **0**     |

## Tech

- **Astro 5** — static output (zero JS shipped except a tiny nav toggle)
- **Self-hosted fonts** (Plus Jakarta Sans + Inter via `@fontsource-variable`) — no Google Fonts requests, preloaded to avoid CLS
- **@astrojs/sitemap** — auto-generates `sitemap-index.xml`
- Inline SVG icons, inlined critical CSS, JSON-LD structured data, `llms.txt`, `robots.txt`

## Project structure

```
src/
  data/
    posts.json        # 42 blog posts exported from WordPress (title, html, meta)
    site.ts           # brand, contact, nav, services, pricing packages
    serviceDetails.ts # extended copy for each service page
  lib/posts.ts        # post helpers + legacy-link rewriting + reading time
  layouts/Base.astro  # SEO meta, OG, fonts, Organization JSON-LD
  components/          # Header, Footer, Hero, PostCard, CtaBand, Icon, …
  pages/
    index.astro
    about.astro  contact.astro  privacy.astro  terms.astro  404.astro
    services/index.astro  services/[slug].astro
    blog/index.astro      blog/[slug].astro
public/
  img/                # logo + OG image (self-hosted from thryv.co.za)
  robots.txt  llms.txt
```

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static site to ./dist
npm run preview  # serve the production build locally
```

## Deploy to Vercel

1. Import this repository into Vercel.
2. Vercel auto-detects Astro. Defaults are correct:
   - **Build command:** `astro build` (or `npm run build`)
   - **Output directory:** `dist`
   - **Install command:** `npm install`
3. Deploy. No environment variables are required.

Set your production domain in `astro.config.mjs` (`site:`) so the sitemap and
canonical URLs use the right host. It is currently `https://thryv.co.za`.

## Before going live — to-do

- **Contact form:** `src/pages/contact.astro` posts to a placeholder
  `https://formspree.io/f/YOUR_FORM_ID`. Replace it with your
  [Formspree](https://formspree.io) endpoint, a Vercel serverless function, or
  another form handler. Direct phone/email/WhatsApp links work immediately.
- **Redirects:** the blog lives at `/blog/<slug>/`. If your old WordPress URLs
  differed, add 301 redirects in `vercel.json` to preserve SEO equity.
- **Images in posts:** blog post bodies reference any original images via absolute
  `thryv.co.za` URLs. Migrate them into `public/` if you decommission WordPress.

## Content

Blog content and brand data were exported from the live WordPress site. To refresh,
re-export `posts.json` and update `src/data/site.ts`.
