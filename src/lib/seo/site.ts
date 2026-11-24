import { routing } from '@/i18n/routing';

/** Единственный источник правды о домене и языках. Хост — без www. */
export const SITE_URL = 'https://keyent.kz';
export const SITE_NAME = 'Key Entertainment';

export type Locale = (typeof routing.locales)[number];
export const LOCALES = routing.locales;
export const DEFAULT_LOCALE: Locale = routing.defaultLocale;

/** Код языка в URL остаётся `kz`, а в hreflang / html lang / og:locale — ISO 639-1 `kk`. */
export const HREFLANG: Record<Locale, string> = { ru: 'ru', kz: 'kk', en: 'en' };
export const OG_LOCALE: Record<Locale, string> = { ru: 'ru_RU', kz: 'kk_KZ', en: 'en_US' };

export const CONTACTS = {
  email: 'info@keyent.kz',
  phone: '+77783520000',
  sameAs: [
    'https://t.me/keyentkz',
    'https://vk.com/keyentertainment',
    'https://instagram.com/keyentertainment.kz',
    'https://www.youtube.com/@keyentkz',
    'https://music.yandex.kz/label/632686',
  ],
};

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

/** Абсолютный URL страницы. path: '' = главная, 'legal' = /ru/legal */
export function pageUrl(locale: Locale, path: string): string {
  return `${SITE_URL}/${locale}${path ? `/${path}` : ''}`;
}

export function alternates(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of LOCALES) langs[HREFLANG[l]] = pageUrl(l, path);
  langs['x-default'] = pageUrl(DEFAULT_LOCALE, path);
  return langs;
}
