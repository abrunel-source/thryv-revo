import data from '../data/posts.json';
import { services } from '../data/site';

export type PostAf = {
  title: string;
  slug: string;
  desc: string;
  excerpt?: string;
  focus_kw?: string;
  html: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  date: string;
  modified: string;
  excerpt: string;
  desc: string;
  focus_kw: string;
  cats: string[];
  thumb: string;
  html: string;
  af?: PostAf;
};

const serviceSlugs = new Set(services.map((s) => s.slug));
const allPosts = (data.posts as Post[]).slice();
const postSlugs = new Set(allPosts.map((p) => p.slug));

/**
 * Rewrite legacy thryv.co.za absolute links to the new static routes:
 *  - links to a known blog post   -> /blog/<slug>/
 *  - links to a known service     -> /services/<slug>/
 *  - other on-site links          -> root-relative /<path>
 * External links are left untouched.
 */
export function rewriteLinks(html: string): string {
  return html.replace(
    /href="https?:\/\/(?:www\.)?thryv\.co\.za\/([^"#?]*)([^"]*)"/gi,
    (_m, path: string, rest: string) => {
      const clean = path.replace(/^\/+|\/+$/g, '');
      if (clean === '') return `href="/${rest}"`;
      const last = clean.split('/').pop() as string;
      if (postSlugs.has(last)) return `href="/blog/${last}/${rest}"`;
      if (serviceSlugs.has(last)) return `href="/services/${last}/${rest}"`;
      return `href="/${clean}/${rest}"`;
    }
  );
}

export function readingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(d: string, lang: 'en' | 'af' = 'en'): string {
  return new Date(d + 'T00:00:00Z').toLocaleDateString(lang === 'af' ? 'af-ZA' : 'en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Afrikaans labels for blog categories. */
const CATEGORY_AF: Record<string, string> = {
  Accounting: 'Rekeningkunde',
  Bookkeeping: 'Boekhouding',
  Tax: 'Belasting',
  Payroll: 'Betaalstaat',
  'Employer of record': 'Werkgewer van Rekord',
  Audit: 'Oudit',
  'Audited Financial Statements': 'Geouditeerde Finansiële State',
  'Independent Review': 'Onafhanklike Hersiening',
  'Business registration': 'Besigheidsregistrasie',
};

export function categoryLabel(cat: string | undefined, lang: 'en' | 'af' = 'en'): string {
  if (!cat) return '';
  return lang === 'af' ? CATEGORY_AF[cat] ?? cat : cat;
}

/** A post's user-facing fields resolved for a locale (falls back to English). */
export type LocalPost = {
  enSlug: string;
  slug: string;
  title: string;
  desc: string;
  excerpt: string;
  html: string;
  focus_kw: string;
  date: string;
  cats: string[];
};

export function localizePost(post: Post, lang: 'en' | 'af' = 'en'): LocalPost {
  const af = lang === 'af' ? post.af : undefined;
  return {
    enSlug: post.slug,
    slug: af?.slug ?? post.slug,
    title: af?.title ?? post.title,
    desc: af?.desc ?? post.desc,
    excerpt: af?.excerpt ?? af?.desc ?? post.excerpt,
    html: af?.html ?? post.html,
    focus_kw: af?.focus_kw ?? post.focus_kw,
    date: post.date,
    cats: post.cats,
  };
}

/** Look a post up by its Afrikaans slug (used by AF blog routes). */
export function getPostByAfSlug(slug: string): Post | undefined {
  return allPosts.find((p) => (p.af?.slug ?? p.slug) === slug);
}

export function getAllPosts(): Post[] {
  return allPosts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of allPosts) for (const c of p.cats) counts.set(c, (counts.get(c) ?? 0) + 1);
  return [...counts.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}

/** Related posts: same category first, then most recent, excluding self. */
export function getRelated(post: Post, limit = 3): Post[] {
  const scored = allPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.cats.filter((c) => post.cats.includes(c)).length }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1));
  return scored.slice(0, limit).map((s) => s.p);
}

/* ----------------------------------------------------------------------------
 * SEO SILOS
 * Each blog category maps to a "pillar" service page. Cluster posts link UP to
 * their pillar (related-service block + breadcrumb), SIDEWAYS to same-silo posts
 * (related posts), and the pillar pages link DOWN to their cluster posts. Body
 * copy is auto-linked to money pages. This concentrates internal link equity on
 * the service and home pages.
 * ------------------------------------------------------------------------- */

export type Silo = { service: string; label: string };

const SILO_BY_CATEGORY: Record<string, Silo> = {
  Accounting: { service: 'accounting-services', label: 'Accounting' },
  Bookkeeping: { service: 'bookkeeping-services', label: 'Bookkeeping' },
  Tax: { service: 'tax-services', label: 'Tax & SARS' },
  Payroll: { service: 'payroll-services', label: 'Payroll' },
  'Employer of record': { service: 'employer-of-record', label: 'Employer of Record' },
  Audit: { service: 'audit-services', label: 'Audit' },
  'Audited Financial Statements': { service: 'financial-statement-preparation', label: 'Financial Statements' },
  'Independent Review': { service: 'independent-review', label: 'Independent Review' },
  'Business registration': { service: 'company-secretary', label: 'Company Registration' },
};

const DEFAULT_SILO: Silo = { service: 'accounting-services', label: 'Accounting' };

/** The pillar silo for a post, derived from its first mapped category. */
export function getSilo(post: Post): Silo {
  for (const c of post.cats) if (SILO_BY_CATEGORY[c]) return SILO_BY_CATEGORY[c];
  return DEFAULT_SILO;
}

/** The pillar silo for a single category name (used for topic hubs). */
export function siloForCategory(cat: string): Silo | undefined {
  return SILO_BY_CATEGORY[cat];
}

/** Cluster posts that belong to a given service's silo (newest first). */
export function getPostsForService(serviceSlug: string, limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => getSilo(p).service === serviceSlug)
    .slice(0, limit);
}

/**
 * Inject up to `max` contextual internal links from body copy to service pages.
 * Only links inside <p> blocks that don't already contain a link, only the first
 * occurrence of each phrase, and each service is linked at most once per article.
 */
const AUTO_LINKS: { re: RegExp; service: string }[] = [
  { re: /\bannual financial statements\b/i, service: 'financial-statement-preparation' },
  { re: /\bprovisional tax\b/i, service: 'tax-services' },
  { re: /\bcompany secretary\b/i, service: 'company-secretary' },
  { re: /\bindependent review\b/i, service: 'independent-review' },
  { re: /\bemployer of record\b/i, service: 'employer-of-record' },
  { re: /\bcash[\s-]?flow forecasting\b/i, service: 'finance-consultancy-services' },
  { re: /\bsmall business accountant\b/i, service: 'accounting-services' },
  { re: /\bbookkeeping\b/i, service: 'bookkeeping-services' },
  { re: /\bpayroll\b/i, service: 'payroll-services' },
];

export function autoLinkServices(html: string, max = 3): string {
  const used = new Set<string>();
  let count = 0;
  return html.replace(/(<p[^>]*>)([\s\S]*?)(<\/p>)/g, (m, open, inner, close) => {
    if (count >= max || inner.includes('<a')) return m;
    for (const { re, service } of AUTO_LINKS) {
      if (used.has(service)) continue;
      if (re.test(inner)) {
        inner = inner.replace(re, (hit: string) => `<a href="/services/${service}/">${hit}</a>`);
        used.add(service);
        count++;
        break; // at most one injected link per paragraph
      }
    }
    return open + inner + close;
  });
}
