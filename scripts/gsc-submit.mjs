#!/usr/bin/env node
/**
 * Отправка sitemap в Google Search Console (Search Console API, без внешних зависимостей).
 * Нужен env GSC_SERVICE_ACCOUNT_JSON — JSON ключа сервис-аккаунта, который добавлен
 * владельцем/полным пользователем в ресурс Search Console. Без него скрипт пропускает шаг (exit 0).
 *
 * ВАЖНО: Google не принимает «отправку отдельных URL» для обычных страниц (Indexing API — только
 * для вакансий и трансляций). Поэтому отправляем sitemap — Google сам перечитает новые URL с lastmod.
 */
import { createSign } from 'node:crypto';

const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
if (!raw) { console.log('GSC: GSC_SERVICE_ACCOUNT_JSON не задан — шаг пропущен'); process.exit(0); }

const sa = JSON.parse(raw);
const property = process.env.GSC_PROPERTY || 'sc-domain:keyent.kz'; // или https://keyent.kz/
const sitemap = process.env.GSC_SITEMAP || 'https://keyent.kz/sitemap.xml';
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');

const now = Math.floor(Date.now() / 1000);
const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
  iss: sa.client_email, scope: 'https://www.googleapis.com/auth/webmasters', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600,
})}`;
const jwt = `${unsigned}.${createSign('RSA-SHA256').update(unsigned).sign(sa.private_key, 'base64url')}`;

const tok = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
});
if (!tok.ok) { console.error('GSC auth:', tok.status, await tok.text()); process.exit(1); }
const { access_token } = await tok.json();

const r = await fetch(
  `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/sitemaps/${encodeURIComponent(sitemap)}`,
  { method: 'PUT', headers: { Authorization: `Bearer ${access_token}` } },
);
console.log(`GSC sitemap submit → ${r.status}`);
if (!r.ok) { console.error(await r.text()); process.exit(1); }
