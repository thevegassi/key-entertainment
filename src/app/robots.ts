import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/site';

// Закрыто только служебное. Googlebot, AdsBot-Google, YandexBot, YandexDirect и др. не блокируются.
// JS/CSS (/_next/static/) НЕ закрываем: иначе Google и Яндекс не смогут отрисовать страницу.
const DISALLOW = ['/api/', '/preview/', '/admin/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      // Рекламные боты явно разрешены: AdsBot игнорирует User-agent: *, поэтому правило нужно отдельно.
      { userAgent: ['Googlebot', 'AdsBot-Google', 'AdsBot-Google-Mobile', 'Mediapartners-Google'], allow: '/' },
      { userAgent: ['Yandex', 'YandexBot', 'YandexDirect', 'YandexDirectDyn', 'YandexMetrika'], allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
