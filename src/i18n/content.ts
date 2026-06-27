// Locale-aware accessors for structured content (services, packages).
import { services as enServices, packages as enPackages, type Service } from '../data/site';
import { serviceDetails } from '../data/serviceDetails';
import serviceExtra from '../data/serviceExtra.json';
import servicesAf from '../data/i18n/services.af.json';
import serviceContentAf from '../data/i18n/serviceContent.af.json';
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

export type ServiceContent = {
  enSlug: string;
  icon: string;
  title: string;
  tagline: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  included: string[];
  outcomes: { title: string; text: string }[];
  body: { heading: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[];
};

const extraMap = serviceExtra as Record<string, { metaTitle: string; metaDescription: string; body: ServiceContent['body']; faqs: ServiceContent['faqs'] }>;
const afContentMap = serviceContentAf as Record<string, Omit<ServiceContent, 'enSlug' | 'icon' | 'title' | 'tagline' | 'summary'>>;

/** Full service detail content (copy, body, FAQs, meta) for a locale. */
export function getServiceContent(enSlug: string, lang: Locale): ServiceContent {
  const base = enServices.find((s) => s.slug === enSlug)!;
  if (lang === 'af') {
    const af = afContentMap[enSlug];
    const t = afMap[enSlug];
    return {
      enSlug, icon: base.icon,
      title: t.title, tagline: t.tagline, summary: t.summary,
      metaTitle: af.metaTitle, metaDescription: af.metaDescription,
      intro: af.intro, included: af.included, outcomes: af.outcomes, body: af.body, faqs: af.faqs,
    };
  }
  const det = serviceDetails[enSlug];
  const ex = extraMap[enSlug];
  return {
    enSlug, icon: base.icon,
    title: base.title, tagline: base.tagline, summary: base.summary,
    metaTitle: ex.metaTitle, metaDescription: ex.metaDescription,
    intro: det.intro, included: det.included, outcomes: det.outcomes, body: ex.body, faqs: ex.faqs,
  };
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
