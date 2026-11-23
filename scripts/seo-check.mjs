#!/usr/bin/env node
/**
 * Авто-проверка SEO перед публикацией. Падает (exit 1) при любой ошибке.
 *   BASE_URL=http://localhost:3000 node scripts/seo-check.mjs
 * Проверяет по КАЖДОМУ URL из sitemap.xml: код 200 без редиректов, title ≤60, description ≤160,
 * один H1, уникальность title/description/H1 внутри языка, canonical = сам URL, нет noindex,
 * hreflang (взаимный, x-default), alt у <img>, ≥3 внутренних ссылок, валидный JSON-LD,
 * og:image доступен. Плюс: все страницы на диске есть в sitemap, robots.txt, цепочки редиректов
 * для старых URL, рекламные лендинги (noindex, 200).
 */
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import * as cheerio from 'cheerio';

const BASE = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const SITE = 'https://keyent.kz';
const MAX_TITLE = 60, MAX_DESC = 160, MIN_LINKS = 3;
const errors = [], warns = [];
const err = (url, msg) => errors.push({ url, msg });
const warn = (url, msg) => warns.push({ url, msg });

/** Для сверки с каноническим доменом: локальный BASE подменяем на прод-хост. */
const toProd = (u) => u.replace(BASE, SITE);
const toLocal = (u) => u.replace(SITE, BASE);

async function get(url, init = {}) {
  return fetch(url, { redirect: 'manual', headers: { 'user-agent': 'KeySeoCheck/1.0' }, ...init });
}

/** Идём по редиректам вручную и считаем цепочку. */
async function chain(url) {
  const hops = [];
  let cur = url;
  for (let i = 0; i < 8; i++) {
    const r = await get(cur);
    if (r.status >= 300 && r.status < 400) {
      const loc = r.headers.get('location');
      hops.push({ from: cur, status: r.status, to: loc });
      cur = new URL(loc, cur).toString();
    } else return { hops, final: cur, status: r.status, res: r };
  }
  return { hops, final: cur, status: 0 };
}

function routesOnDisk() {
  const root = join(process.cwd(), 'src', 'app', '[locale]');
  const out = [];
  (function walk(dir) {
    for (const n of readdirSync(dir)) {
      const p = join(dir, n);
      if (statSync(p).isDirectory()) walk(p);
      else if (n === 'page.tsx') {
        const rel = relative(root, dir).split(sep).filter(Boolean);
        if (rel.some((s) => s.startsWith('[') || s === 'lp')) continue; // динамические и рекламные — отдельно
        out.push(rel.join('/'));
      }
    }
  })(root);
  return out;
}

async function main() {
  console.log(`SEO-check: ${BASE}\n`);

  // ── robots.txt
  const rob = await get(`${BASE}/robots.txt`);
  const robTxt = rob.status === 200 ? await rob.text() : '';
  if (rob.status !== 200) err('/robots.txt', `код ${rob.status}`);
  if (!/^Sitemap:\s*https:\/\/keyent\.kz\/sitemap\.xml/im.test(robTxt)) err('/robots.txt', 'нет ссылки на https://keyent.kz/sitemap.xml');
  for (const bot of ['Googlebot', 'AdsBot-Google', 'YandexBot', 'YandexDirect']) {
    const re = new RegExp(`user-agent:\\s*${bot}[^]*?(?=user-agent:|$)`, 'i');
    const block = robTxt.match(re)?.[0] ?? '';
    if (/^disallow:\s*\/\s*$/im.test(block)) err('/robots.txt', `${bot} заблокирован`);
  }
  if (/^user-agent:\s*\*[^]*?^disallow:\s*\/\s*$/im.test(robTxt)) err('/robots.txt', 'для * закрыт весь сайт');

  // ── sitemap
  const sm = await get(`${BASE}/sitemap.xml`);
  if (sm.status !== 200) { err('/sitemap.xml', `код ${sm.status}`); return report(); }
  const $sm = cheerio.load(await sm.text(), { xmlMode: true });
  const urls = $sm('url > loc').map((_, e) => $sm(e).text().trim()).get();
  if (!urls.length) err('/sitemap.xml', 'пуст');
  $sm('url').each((_, u) => {
    const loc = $sm(u).children('loc').text();
    if (!$sm(u).children('lastmod').text()) err(loc, 'в sitemap нет lastmod');
    if (!loc.startsWith(SITE + '/')) err(loc, `домен в sitemap не ${SITE}`);
  });

  // ── страницы на диске ⊂ sitemap
  const inMap = new Set(urls.map((u) => u.replace(`${SITE}/`, '')));
  const hasBlog = urls.some((u) => u.includes('/blog'));
  for (const r of routesOnDisk()) {
    if (r === 'blog' && !hasBlog) continue; // раздел публикуется только когда есть статьи
    for (const l of ['ru', 'kz', 'en']) {
      const k = r ? `${l}/${r}` : l;
      if (!inMap.has(k)) err(`/${k}`, 'страница есть в src/app, но её нет в sitemap — добавьте запись в src/content/pages.ts');
    }
  }

  // ── каждая страница
  const seen = { title: new Map(), description: new Map(), h1: new Map() };
  const pages = new Map();
  for (const prodUrl of urls) {
    const url = toLocal(prodUrl);
    const c = await chain(url);
    if (c.hops.length) { err(prodUrl, `редирект ${c.hops.map((h) => h.status).join('→')} вместо 200 (в sitemap должны быть конечные URL)`); continue; }
    if (c.status !== 200) { err(prodUrl, `код ${c.status}`); continue; }
    const html = await c.res.text();
    const $ = cheerio.load(html);
    pages.set(prodUrl, $);
    const lang = prodUrl.split('/')[3];

    const title = $('head > title').text().trim();
    const desc = $('meta[name="description"]').attr('content')?.trim() ?? '';
    const h1s = $('h1');
    const h1 = h1s.first().text().replace(/\s+/g, ' ').trim();

    if (!title) err(prodUrl, 'нет <title>'); else if (title.length > MAX_TITLE) err(prodUrl, `title ${title.length} > ${MAX_TITLE}: «${title}»`);
    if (!desc) err(prodUrl, 'нет meta description'); else {
      if (desc.length > MAX_DESC) err(prodUrl, `description ${desc.length} > ${MAX_DESC}`);
      else if (desc.length < 70) warn(prodUrl, `description короткий (${desc.length}), лучше 70–160`);
    }
    if (h1s.length !== 1) err(prodUrl, `H1: ${h1s.length} шт., нужен ровно один`);
    for (const [k, v] of Object.entries({ title, description: desc, h1 })) {
      if (!v) continue;
      const key = `${lang}|${v}`;
      if (seen[k].has(key)) err(prodUrl, `${k} не уникален (совпадает с ${seen[k].get(key)})`);
      else seen[k].set(key, prodUrl);
    }

    const robots = $('meta[name="robots"]').attr('content') || '';
    if (/noindex/i.test(robots)) err(prodUrl, `noindex в sitemap-странице (${robots})`);
    if (/noindex/i.test(c.res.headers.get('x-robots-tag') || '')) err(prodUrl, 'X-Robots-Tag: noindex');

    const canon = $('link[rel="canonical"]').attr('href');
    if (canon !== prodUrl) err(prodUrl, `canonical «${canon}» ≠ URL страницы`);

    const alts = {};
    $('link[rel="alternate"][hreflang]').each((_, e) => { alts[$(e).attr('hreflang')] = $(e).attr('href'); });
    for (const need of ['ru', 'kk', 'en', 'x-default']) if (!alts[need]) err(prodUrl, `нет hreflang="${need}"`);
    if ($('html').attr('lang') !== (lang === 'kz' ? 'kk' : lang)) err(prodUrl, `html lang="${$('html').attr('lang')}" не соответствует языку страницы`);

    let noAlt = 0;
    $('img').each((_, e) => { if ($(e).attr('alt') === undefined) noAlt++; });
    if (noAlt) err(prodUrl, `${noAlt} <img> без атрибута alt`);

    const links = new Set();
    $('a[href]').each((_, e) => {
      const h = $(e).attr('href');
      if (h.startsWith('/') && !h.startsWith('//') || h.startsWith(SITE)) links.add(h.split('#')[0].replace(SITE, ''));
    });
    links.delete(new URL(prodUrl).pathname);
    if (links.size < MIN_LINKS) err(prodUrl, `внутренних ссылок ${links.size} < ${MIN_LINKS}`);

    const ld = [];
    $('script[type="application/ld+json"]').each((_, e) => { try { ld.push(JSON.parse($(e).text())); } catch { err(prodUrl, 'невалидный JSON-LD'); } });
    const types = ld.map((x) => x['@type']);
    if (!types.length) err(prodUrl, 'нет JSON-LD');
    const isHome = new URL(prodUrl).pathname.split('/').filter(Boolean).length === 1;
    if (isHome && !types.includes('Organization')) err(prodUrl, 'на главной нет Organization');
    if (!isHome && !types.includes('BreadcrumbList')) err(prodUrl, 'нет BreadcrumbList');

    const og = $('meta[property="og:image"]').attr('content');
    if (!og) err(prodUrl, 'нет og:image');
    else {
      const r = await get(toLocal(og));
      if (r.status !== 200) err(prodUrl, `og:image ${og} → ${r.status}`);
    }
    if (!$('meta[property="og:title"]').attr('content')) err(prodUrl, 'нет og:title');
  }

  // ── hreflang взаимный
  for (const [u, $] of pages) {
    $('link[rel="alternate"][hreflang]').each((_, e) => {
      const hl = $(e).attr('hreflang'), href = $(e).attr('href');
      if (hl === 'x-default') return;
      const t = pages.get(href);
      if (!t) return err(u, `hreflang ${hl} ведёт на URL, которого нет в sitemap: ${href}`);
      const back = t('link[rel="alternate"][hreflang]').map((_, x) => t(x).attr('href')).get();
      if (!back.includes(u)) err(u, `hreflang не взаимный: ${href} не ссылается обратно`);
    });
  }

  // ── редиректы старого сайта: не более одного шага
  for (const old of ['/', '/index.html', '/about.html', '/distribution', '/legal.html', '/contacts']) {
    const c = await chain(BASE + old);
    if (c.hops.length > 1) err(old, `цепочка редиректов из ${c.hops.length} шагов`);
    if (c.status !== 200) err(old, `финальный код ${c.status}`);
  }

  // ── рекламные лендинги: 200 + noindex, не в sitemap
  const feed = await get(`${BASE}/ads-feed.csv`);
  if (feed.status !== 200) err('/ads-feed.csv', `код ${feed.status}`);
  else {
    const rows = (await feed.text()).replace(/^﻿/, '').trim().split(/\r?\n/).slice(1);
    if (!rows.length) err('/ads-feed.csv', 'пуст');
    for (const row of rows) {
      const cells = [...row.matchAll(/"((?:[^"]|"")*)"/g)].map((m) => m[1].replace(/""/g, '"'));
      const [u, title, description, section, cta, , type] = cells;
      if (!u || !title || !description || !section || !cta) err('/ads-feed.csv', `неполная строка: ${row.slice(0, 80)}`);
      if (type === 'landing') {
        const c = await chain(toLocal(u));
        if (c.status !== 200) { err(u, `лендинг: код ${c.status}`); continue; }
        const $ = cheerio.load(await c.res.text());
        if (!/noindex/i.test($('meta[name="robots"]').attr('content') || '')) err(u, 'лендинг должен быть noindex');
        if (urls.includes(u)) err(u, 'лендинг не должен быть в sitemap');
        if ($('form').length !== 1) err(u, 'на лендинге должна быть ровно одна форма');
        if ($('h1').length !== 1) err(u, 'на лендинге должен быть один H1');
      }
    }
  }

  report();
}

function report() {
  const group = (arr) => arr.reduce((m, e) => ((m[e.url] ??= []).push(e.msg), m), {});
  if (warns.length) { console.log('Предупреждения:'); for (const [u, m] of Object.entries(group(warns))) m.forEach((x) => console.log(`  ⚠ ${u}\n      ${x}`)); console.log(); }
  if (errors.length) {
    console.log(`ОШИБКИ (${errors.length}) — публикация заблокирована:`);
    for (const [u, m] of Object.entries(group(errors))) { console.log(`  ✖ ${u}`); m.forEach((x) => console.log(`      ${x}`)); }
    process.exit(1);
  }
  console.log('✔ SEO-проверка пройдена');
}

main().catch((e) => { console.error('Сбой проверки:', e); process.exit(2); });
