import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { getAllPosts, getSilo, localizePost } from '../lib/posts';
import { type Locale, routes, serviceHref, blogHref } from '../i18n/config';
import { getServices } from '../i18n/content';

/**
 * llms.txt is GENERATED at build time from the same data the site uses, so it
 * never goes stale: add a service to site.ts or a post to posts.json and its
 * link appears here automatically on the next build. Links are emitted as full
 * absolute URLs, for both the English and Afrikaans versions of every page.
 */
export const GET: APIRoute = () => {
  const posts = getAllPosts();
  const abs = (path: string) => new URL(path, site.url).href;

  const serviceBlock = (lang: Locale) =>
    getServices(lang)
      .map((s) => `- ${s.title} — ${s.summary} ${abs(s.href)}`)
      .join('\n');

  // Group every blog post under its SEO silo so the structure is legible to LLMs.
  const blogBlock = (lang: Locale) => {
    const bySilo = new Map<string, { label: string; items: string[] }>();
    for (const p of posts) {
      const silo = getSilo(p);
      const lp = localizePost(p, lang);
      if (!bySilo.has(silo.service)) bySilo.set(silo.service, { label: silo.label, items: [] });
      bySilo.get(silo.service)!.items.push(`- ${lp.title}: ${abs(blogHref(lang, p.slug, p.af?.slug))}`);
    }
    return [...bySilo.values()].map((g) => `### ${g.label}\n${g.items.join('\n')}`).join('\n\n');
  };

  const en = routes('en');
  const af = routes('af');

  const body = `# ${site.name} — ${site.tagline}

> ${site.description}

This site is available in English and Afrikaans (af). Afrikaans pages live under /af/ with localised slugs.

## What makes Thryv different
- Fixed monthly fee — no hourly billing and no surprise invoices.
- Chartered accountants (CA) handling SARS and CIPC compliance end to end.
- Cloud accounting included, with real-time dashboards and management reporting.
- A genuine business partner, not just a once-a-year accountant.
- Serves SME owners across ${site.locations.join(', ')} and the rest of South Africa.

## Key pages
- Home: ${abs(en.home)}
- About (story, mission, team): ${abs(en.about)}
- All services: ${abs(en.services)}
- Blog (accounting, tax, bookkeeping & business guides): ${abs(en.blog)}
- Contact / request a free quote: ${abs(en.contact)}

## Services
${serviceBlock('en')}

## Blog — all guides (${posts.length})
${blogBlock('en')}

## Afrikaans (Afrikaanse weergawe)
- Tuis: ${abs(af.home)}
- Oor Ons: ${abs(af.about)}
- Dienste: ${abs(af.services)}
- Blog: ${abs(af.blog)}
- Kontak: ${abs(af.contact)}

### Dienste (Afrikaans)
${serviceBlock('af')}

### Blog — alle gidse (Afrikaans, ${posts.length})
${blogBlock('af')}

## Contact
- Phone: ${site.phoneDisplay}
- Email: ${site.email}
- Offices: ${site.locations.join(' & ')}, Western Cape, South Africa
- Hours: Monday–Friday, 08:00–17:00 SAST
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
