import type { APIRoute } from 'astro';
import { site, services } from '../data/site';
import { getAllPosts, getSilo } from '../lib/posts';

/**
 * llms.txt is GENERATED at build time from the same data the site uses, so it
 * never goes stale: add a service to site.ts or a post to posts.json and its
 * link appears here automatically on the next build.
 */
export const GET: APIRoute = () => {
  const posts = getAllPosts();

  const serviceLines = services
    .map((s) => `- ${s.title} — ${s.summary} /services/${s.slug}/`)
    .join('\n');

  // Group every blog post under its SEO silo so the structure is legible to LLMs.
  const bySilo = new Map<string, { label: string; items: string[] }>();
  for (const p of posts) {
    const silo = getSilo(p);
    if (!bySilo.has(silo.service)) bySilo.set(silo.service, { label: silo.label, items: [] });
    bySilo.get(silo.service)!.items.push(`- ${p.title}: /blog/${p.slug}/`);
  }
  const blogSection = [...bySilo.values()]
    .map((g) => `### ${g.label}\n${g.items.join('\n')}`)
    .join('\n\n');

  const body = `# ${site.name} — ${site.tagline}

> ${site.description}

## What makes Thryv different
- Fixed monthly fee — no hourly billing and no surprise invoices.
- Chartered accountants (CA) handling SARS and CIPC compliance end to end.
- Cloud accounting included, with real-time dashboards and management reporting.
- A genuine business partner, not just a once-a-year accountant.
- Serves SME owners across ${site.locations.join(', ')} and the rest of South Africa.

## Services
${serviceLines}

## Key pages
- Home: /
- About (story, mission, team): /about/
- All services: /services/
- Blog (accounting, tax, bookkeeping & business guides): /blog/
- Contact / request a free quote: /contact/

## Blog — all guides (${posts.length})
${blogSection}

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
