import { getUrlEntries } from '@/lib/seo/urls';
import { DEPARTMENT_LABEL, type Department } from '@/content/pages';

export const dynamic = 'force-static';

const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;

/** Фид для динамических объявлений (Яндекс Директ — динамические, Google Ads — Page Feed). */
export function GET() {
  const rows = getUrlEntries().filter((e) => e.kind !== 'article' || e.indexable);
  const header = ['URL', 'Заголовок', 'Описание', 'Раздел', 'CTA', 'Язык', 'Тип'];
  const lines = [header.join(',')];
  for (const e of rows) {
    lines.push([
      e.url, e.title, e.description, DEPARTMENT_LABEL[e.department as Department] ?? e.department,
      e.cta, e.locale === 'kz' ? 'kk' : e.locale, e.kind === 'landing' ? 'landing' : 'page',
    ].map(esc).join(','));
  }
  return new Response('﻿' + lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
