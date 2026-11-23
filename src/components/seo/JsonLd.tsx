import { getLocale, getTranslations } from 'next-intl/server';
import { getPage } from '@/content/pages';
import {
  breadcrumbSchema, organizationSchema, serviceSchema, webPageSchema, websiteSchema,
} from '@/lib/seo/schema';
import { SITE_NAME, isLocale, pageUrl } from '@/lib/seo/site';

export function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // < экранируем, чтобы строка не могла закрыть тег
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

/** Одна строка на странице: <PageJsonLd path="legal" /> */
export default async function PageJsonLd({ path }: { path: string }) {
  const locale = await getLocale();
  const loc = isLocale(locale) ? locale : 'ru';
  const entry = getPage(path);
  const t = await getTranslations({ locale: loc });
  const fullTitle = t(entry.titleKey);
  const name = fullTitle.replace(` | ${SITE_NAME}`, '');
  const description = t(entry.descKey);

  const graph: unknown[] = [];
  if (path === '') {
    graph.push(organizationSchema(), websiteSchema(loc));
  } else {
    graph.push(
      entry.schema === 'Service' ? serviceSchema(entry, loc, name, description) : webPageSchema(entry, loc, name, description),
      breadcrumbSchema([
        { name: SITE_NAME, url: pageUrl(loc, '') },
        { name, url: pageUrl(loc, path) },
      ]),
    );
  }
  return <>{graph.map((g, i) => <JsonLdScript key={i} data={g} />)}</>;
}
