import { CONTACTS, SITE_NAME, SITE_URL, pageUrl, type Locale } from './site';
import type { PageEntry } from '@/content/pages';

const ORG_ID = `${SITE_URL}/#organization`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: 'ТОО «KEY ENTERTAINMENT»',
    taxID: '231240023174',
    url: SITE_URL,
    logo: `${SITE_URL}/logo-navy.svg`,
    email: CONTACTS.email,
    telephone: CONTACTS.phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Алматы', addressCountry: 'KZ' },
    sameAs: CONTACTS.sameAs,
  };
}

export function websiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: locale === 'kz' ? 'kk' : locale,
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({ '@type': 'ListItem', position: idx + 1, name: it.name, item: it.url })),
  };
}

export function serviceSchema(entry: PageEntry, locale: Locale, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: entry.serviceType,
    url: pageUrl(locale, entry.path),
    areaServed: [{ '@type': 'Country', name: 'Kazakhstan' }],
    provider: { '@id': ORG_ID },
  };
}

export function webPageSchema(entry: PageEntry, locale: Locale, name: string, description: string) {
  const type = entry.schema === 'AboutPage' || entry.schema === 'ContactPage' ? entry.schema : 'WebPage';
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url: pageUrl(locale, entry.path),
    inLanguage: locale === 'kz' ? 'kk' : locale,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
}

export function articleSchema(a: {
  title: string; description: string; url: string; locale: Locale;
  published: string; updated: string; image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    mainEntityOfPage: a.url,
    inLanguage: a.locale === 'kz' ? 'kk' : a.locale,
    datePublished: a.published,
    dateModified: a.updated,
    image: a.image ? `${SITE_URL}${a.image}` : `${SITE_URL}/og-image.jpg`,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}
