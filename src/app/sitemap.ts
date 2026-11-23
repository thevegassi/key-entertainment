import type { MetadataRoute } from 'next';
import { HREFLANG, LOCALES, DEFAULT_LOCALE } from '@/lib/seo/site';
import { getUrlEntries } from '@/lib/seo/urls';

/**
 * sitemap.xml строится из реестра страниц + статей (src/content/*).
 * Каждая запись содержит lastmod и hreflang-альтернативы. Рекламные лендинги (noindex) не включаются.
 * Порядок — по разделам (отделам), чтобы файл читался по отделам.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getUrlEntries().filter((e) => e.indexable);
  entries.sort((a, b) => a.department.localeCompare(b.department) || a.path.localeCompare(b.path) || LOCALES.indexOf(a.locale) - LOCALES.indexOf(b.locale));
  return entries.map((e) => {
    const languages: Record<string, string> = {};
    for (const [l, url] of Object.entries(e.versions)) languages[HREFLANG[l as keyof typeof HREFLANG]] = url!;
    if (e.versions[DEFAULT_LOCALE]) languages['x-default'] = e.versions[DEFAULT_LOCALE]!;
    return {
      url: e.url,
      lastModified: e.lastmod,
      changeFrequency: e.kind === 'article' ? 'monthly' : 'weekly',
      priority: e.priority,
      alternates: { languages },
    };
  });
}
