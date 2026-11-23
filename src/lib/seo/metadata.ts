import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPage, type PageEntry } from '@/content/pages';
import { HREFLANG, LOCALES, OG_LOCALE, SITE_NAME, SITE_URL, alternates, isLocale, pageUrl, type Locale } from './site';

export const OG_IMAGE = { url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: SITE_NAME };

export const MAX_TITLE = 60;
export const MAX_DESC = 160;

type Input = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  /** языки, на которых страница существует (по умолчанию все) */
  locales?: readonly Locale[];
  image?: string;
  published?: string;
  modified?: string;
};

/** Единая точка сборки metadata: title, description, canonical, hreflang ru/kk/en, OG, Twitter, robots. */
export function buildMetadata(i: Input): Metadata {
  const locales = i.locales ?? LOCALES;
  const languages = alternates(i.path);
  for (const l of LOCALES) if (!locales.includes(l)) delete languages[HREFLANG[l]];
  if (!locales.includes('ru')) delete languages['x-default'];
  const url = pageUrl(i.locale, i.path);
  const image = i.image ? { ...OG_IMAGE, url: `${SITE_URL}${i.image}` } : OG_IMAGE;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: i.title },
    description: i.description,
    alternates: { canonical: url, languages },
    robots: i.noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: i.type ?? 'website',
      siteName: SITE_NAME,
      title: i.title,
      description: i.description,
      url,
      locale: OG_LOCALE[i.locale],
      alternateLocale: locales.filter((l) => l !== i.locale).map((l) => OG_LOCALE[l]),
      images: [image],
      ...(i.type === 'article' ? { publishedTime: i.published, modifiedTime: i.modified } : {}),
    },
    twitter: { card: 'summary_large_image', title: i.title, description: i.description, images: [image.url] },
  };
}

/** Использование на странице: export const generateMetadata = pageMetadata('legal'); */
export function pageMetadata(path: string) {
  return async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
    const { locale } = await params;
    const loc = isLocale(locale) ? locale : 'ru';
    const entry: PageEntry = getPage(path);
    const t = await getTranslations({ locale: loc });
    return buildMetadata({
      locale: loc,
      path,
      title: t(entry.titleKey),
      description: t(entry.descKey),
      noindex: entry.indexable === false,
    });
  };
}
