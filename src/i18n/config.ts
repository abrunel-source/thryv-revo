// i18n configuration — English (default, at root) + Afrikaans (under /af/).
// Slugs are localised per the project requirement ("translate everything").

export const locales = ['en', 'af'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = { en: 'English', af: 'Afrikaans' };
export const localeShort: Record<Locale, string> = { en: 'EN', af: 'AF' };
export const htmlLang: Record<Locale, string> = { en: 'en-ZA', af: 'af-ZA' };
export const ogLocale: Record<Locale, string> = { en: 'en_ZA', af: 'af_ZA' };

// Localised path segment for each top-level page (the part after /af/ for AF).
type PageKey = 'home' | 'about' | 'services' | 'contact' | 'blog' | 'privacy' | 'terms';
const PAGE_SLUGS: Record<PageKey, Record<Locale, string>> = {
  home: { en: '', af: '' },
  about: { en: 'about', af: 'oor-ons' },
  services: { en: 'services', af: 'dienste' },
  contact: { en: 'contact', af: 'kontak' },
  blog: { en: 'blog', af: 'blog' },
  privacy: { en: 'privacy', af: 'privaatheidsbeleid' },
  terms: { en: 'terms', af: 'diensbepalings' },
};

// Localised service detail slugs, keyed by the canonical English slug.
export const SERVICE_SLUGS: Record<string, Record<Locale, string>> = {
  'accounting-services': { en: 'accounting-services', af: 'rekeningkundige-dienste' },
  'bookkeeping-services': { en: 'bookkeeping-services', af: 'boekhoudienste' },
  'tax-services': { en: 'tax-services', af: 'belastingdienste' },
  'payroll-services': { en: 'payroll-services', af: 'betaalstaatdienste' },
  'audit-services': { en: 'audit-services', af: 'ouditdienste' },
  'independent-review': { en: 'independent-review', af: 'onafhanklike-hersiening' },
  'financial-statement-preparation': { en: 'financial-statement-preparation', af: 'finansiele-state' },
  'company-secretary': { en: 'company-secretary', af: 'maatskappysekretaris' },
  'finance-consultancy-services': { en: 'finance-consultancy-services', af: 'finansiele-konsultasie' },
  'employer-of-record': { en: 'employer-of-record', af: 'werkgewer-van-rekord' },
};

const prefix = (lang: Locale) => (lang === defaultLocale ? '' : `/${lang}`);

/** Localised path for a top-level page, e.g. routes('af').about === '/af/oor-ons/'. */
export function routes(lang: Locale) {
  const seg = (k: PageKey) => {
    const s = PAGE_SLUGS[k][lang];
    return `${prefix(lang)}/${s ? s + '/' : ''}`;
  };
  return {
    home: seg('home'),
    about: seg('about'),
    services: seg('services'),
    contact: seg('contact'),
    blog: seg('blog'),
    privacy: seg('privacy'),
    terms: seg('terms'),
  };
}

/** Localised URL for a service detail page (input is the canonical English slug). */
export function serviceHref(lang: Locale, enSlug: string): string {
  const slug = SERVICE_SLUGS[enSlug]?.[lang] ?? enSlug;
  return `${prefix(lang)}/${PAGE_SLUGS.services[lang]}/${slug}/`;
}

/** Localised URL for a blog post (input is the canonical English slug + optional AF slug). */
export function blogHref(lang: Locale, enSlug: string, afSlug?: string): string {
  const slug = lang === 'af' ? afSlug || enSlug : enSlug;
  return `${prefix(lang)}/${PAGE_SLUGS.blog[lang]}/${slug}/`;
}

/** Page slug for a localised page key (used when defining AF route file paths). */
export const pageSlug = (k: PageKey, lang: Locale) => PAGE_SLUGS[k][lang];
