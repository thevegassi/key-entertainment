import ru from '../../../messages/ru.json';
import kz from '../../../messages/kz.json';
import en from '../../../messages/en.json';
import { ARTICLES } from '@/content/articles';
import { LANDINGS } from '@/content/landings';
import { PAGES } from '@/content/pages';
import { LOCALES, SITE_NAME, pageUrl, type Locale } from './site';

const MESSAGES: Record<Locale, Record<string, string>> = { ru, kz, en } as never;
const msg = (l: Locale, k?: string) => (k ? MESSAGES[l][k] ?? '' : '');

export type UrlEntry = {
  kind: 'page' | 'article' | 'landing';
  locale: Locale;
  path: string;
  url: string;
  department: string;
  title: string;
  description: string;
  lastmod: string;
  priority: number;
  cta: string;
  indexable: boolean;
  /** все языковые версии этой же страницы: { locale: url } */
  versions: Partial<Record<Locale, string>>;
};

/** Единый список всех URL сайта (страницы + статьи + рекламные лендинги). */
export function getUrlEntries(): UrlEntry[] {
  const out: UrlEntry[] = [];

  for (const p of PAGES) {
    const versions = Object.fromEntries(LOCALES.map((l) => [l, pageUrl(l, p.path)]));
    for (const l of LOCALES) {
      out.push({
        kind: 'page', locale: l, path: p.path, url: pageUrl(l, p.path), department: p.department,
        title: msg(l, p.titleKey), description: msg(l, p.descKey), lastmod: p.updated, priority: p.priority,
        cta: msg(l, p.ctaKey) || msg(l, 'cta_contact'), indexable: p.indexable !== false, versions,
      });
    }
  }

  for (const a of ARTICLES) {
    const locales = LOCALES.filter((l) => a.content[l]);
    const versions = Object.fromEntries(locales.map((l) => [l, pageUrl(l, `blog/${a.slug}`)]));
    for (const l of locales) {
      const c = a.content[l]!;
      out.push({
        kind: 'article', locale: l, path: `blog/${a.slug}`, url: pageUrl(l, `blog/${a.slug}`), department: a.department,
        title: `${c.title} | ${SITE_NAME}`, description: c.description, lastmod: a.updated, priority: 0.6,
        cta: msg(l, 'cta_contact'), indexable: true, versions,
      });
    }
  }

  if (ARTICLES.length) {
    for (const l of LOCALES) {
      if (!ARTICLES.some((a) => a.content[l])) continue;
      const versions = Object.fromEntries(LOCALES.filter((x) => ARTICLES.some((a) => a.content[x])).map((x) => [x, pageUrl(x, 'blog')]));
      out.push({
        kind: 'page', locale: l, path: 'blog', url: pageUrl(l, 'blog'), department: 'company',
        title: `Blog | ${SITE_NAME}`, description: 'Articles about music distribution, labels, booking, PR and legal protection for artists in Kazakhstan.',
        lastmod: ARTICLES.map((a) => a.updated).sort().at(-1)!, priority: 0.5, cta: msg(l, 'cta_contact'), indexable: true, versions,
      });
    }
  }

  for (const lp of LANDINGS) {
    for (const l of LOCALES) {
      const c = lp.content[l];
      out.push({
        kind: 'landing', locale: l, path: `lp/${lp.slug}`, url: pageUrl(l, `lp/${lp.slug}`), department: lp.department,
        title: c.title, description: c.description, lastmod: '2026-11-23', priority: 0,
        cta: c.cta, indexable: false, versions: {},
      });
    }
  }
  return out;
}
