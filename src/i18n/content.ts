// Locale-aware accessors for structured content (services, packages).
import { services as enServices, packages as enPackages, type Service } from '../data/site';
import servicesAf from '../data/i18n/services.af.json';
import { packagesI18n } from './ui';
import { type Locale, serviceHref } from './config';

export type LocalService = {
  enSlug: string;
  icon: string;
  title: string;
  tagline: string;
  summary: string;
  href: string;
};

const afMap = servicesAf as Record<string, { title: string; tagline: string; summary: string }>;

/** All services with copy + href localised for the given locale. */
export function getServices(lang: Locale): LocalService[] {
  return enServices.map((s: Service) => {
    const af = afMap[s.slug];
    const loc = lang === 'af' && af ? af : s;
    return {
      enSlug: s.slug,
      icon: s.icon,
      title: loc.title,
      tagline: loc.tagline,
      summary: loc.summary,
      href: serviceHref(lang, s.slug),
    };
  });
}

/** Pricing packages with name/blurb/features localised for the given locale. */
export function getPackages(lang: Locale) {
  return enPackages.map((p) => {
    const tr = packagesI18n[p.name]?.[lang];
    return {
      name: tr?.name ?? p.name,
      price: p.price,
      best: p.best ?? false,
      blurb: tr?.blurb ?? p.blurb,
      features: lang === 'af' && tr?.features?.length ? tr.features : p.features,
    };
  });
}
