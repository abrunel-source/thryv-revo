import data from '../data/posts.json';
import { services } from '../data/site';

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

export function formatDate(d: string): string {
  return new Date(d + 'T00:00:00Z').toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
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
