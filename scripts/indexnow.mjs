#!/usr/bin/env node
/**
 * IndexNow: уведомляет Яндекс и Bing (и др.) о новых/изменённых URL.
 *   node scripts/indexnow.mjs            — все URL из https://keyent.kz/sitemap.xml
 *   node scripts/indexnow.mjs URL URL…   — только указанные
 * Ключ-файл лежит в public/<ключ>.txt и отдаётся как https://keyent.kz/<ключ>.txt (ключ публичный по дизайну протокола).
 */
const HOST = 'keyent.kz';
const KEY = process.env.INDEXNOW_KEY || '65a96fd81258757aba9159d2c1b87d8c';
const SITE = process.env.SITE_URL || `https://${HOST}`;

async function sitemapUrls() {
  const r = await fetch(`${SITE}/sitemap.xml`);
  if (!r.ok) throw new Error(`sitemap: ${r.status}`);
  return [...(await r.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const urls = process.argv.slice(2).length ? process.argv.slice(2) : await sitemapUrls();
const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls });

// api.indexnow.org рассылает дальше всем участникам; yandex.com — напрямую в Яндекс.
for (const endpoint of ['https://api.indexnow.org/indexnow', 'https://yandex.com/indexnow']) {
  const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body });
  console.log(`IndexNow ${endpoint} → ${r.status} (${urls.length} URL)`);
  if (![200, 202].includes(r.status)) { console.error(await r.text()); process.exitCode = 1; }
}
