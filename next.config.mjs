import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin();

const PAGES = 'about|distribution|legal|label|pr|booking|brand|contacts|privacy|offer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  // Метаданные (title, canonical, hreflang, JSON-LD мета) всегда в <head> первого ответа для любых ботов, включая Яндекс.
  htmlLimitedBots: /.*/,
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  async redirects() {
    return [
      // www → apex (основной хост keyent.kz). Дополнительно задаётся в Vercel → Domains.
      { source: '/:path*', has: [{ type: 'host', value: 'www.keyent.kz' }], destination: 'https://keyent.kz/:path*', permanent: true },
      // Корень → язык по умолчанию (308 вместо временного 307)
      { source: '/', destination: '/ru', permanent: true },
      // Старый статический сайт: /about.html и /about → /ru/about (сохраняем вес ссылок)
      { source: '/index.html', destination: '/ru', permanent: true },
      { source: `/:slug(${PAGES})\\.html`, destination: '/ru/:slug', permanent: true },
      { source: `/:slug(${PAGES})`, destination: '/ru/:slug', permanent: true },
      { source: '/thank-you', destination: '/ru', permanent: true },
      { source: '/thank-you\\.html', destination: '/ru', permanent: true },
    ];
  },
  async headers() {
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
    ];
    return [{ source: '/:path*', headers: security }];
  },
};

export default withNextIntl(nextConfig);
