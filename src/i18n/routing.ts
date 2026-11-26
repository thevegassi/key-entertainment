import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ru', 'kz', 'en'],
  defaultLocale: 'ru',
  localePrefix: 'always',
  // Заголовок Link next-intl отдавал hreflang="kz" (невалидный код). Корректные ru/kk/en — в metadata (lib/seo).
  alternateLinks: false,
});
