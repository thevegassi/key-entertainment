/**
 * РЕЕСТР СТРАНИЦ — единый источник для metadata, sitemap, ads-feed, JSON-LD и CI-проверок.
 * Новая страница = новая запись здесь + файл src/app/[locale]/<path>/page.tsx
 * (scripts/seo-check.mjs блокирует публикацию, если одно без другого).
 */
export type Department =
  | 'company' | 'distribution' | 'label' | 'booking' | 'pr' | 'legal' | 'brand' | 'docs';

export type PageEntry = {
  /** '' = главная */
  path: string;
  department: Department;
  /** ключи в messages/*.json */
  titleKey: string;
  descKey: string;
  /** Тип schema.org для страницы */
  schema: 'Organization' | 'Service' | 'AboutPage' | 'ContactPage' | 'WebPage';
  /** Для Service: ключ с названием услуги и тип */
  serviceType?: string;
  /** ISO-дата последнего значимого изменения контента (идёт в sitemap lastmod) */
  updated: string;
  priority: number;
  /** CTA для рекламного фида (ключ в messages) */
  ctaKey?: string;
  /** false — не в sitemap и с noindex */
  indexable?: boolean;
};

export const PAGES: PageEntry[] = [
  { path: '', department: 'company', titleKey: 'page_title_index', descKey: 'page_desc_index', schema: 'Organization', updated: '2026-11-23', priority: 1.0, ctaKey: 'cta_contact' },
  { path: 'about', department: 'company', titleKey: 'page_title_about', descKey: 'page_desc_about', schema: 'AboutPage', updated: '2026-11-23', priority: 0.7 },
  { path: 'distribution', department: 'distribution', titleKey: 'page_title_dist', descKey: 'page_desc_distribution', schema: 'Service', serviceType: 'Music distribution', updated: '2026-11-23', priority: 0.9, ctaKey: 'cta_distribution' },
  { path: 'label', department: 'label', titleKey: 'page_title_label', descKey: 'page_desc_label', schema: 'Service', serviceType: 'Record label services', updated: '2026-11-23', priority: 0.9, ctaKey: 'cta_label' },
  { path: 'booking', department: 'booking', titleKey: 'page_title_booking', descKey: 'page_desc_booking', schema: 'Service', serviceType: 'Artist booking', updated: '2026-11-23', priority: 0.9, ctaKey: 'cta_booking' },
  { path: 'pr', department: 'pr', titleKey: 'page_title_pr', descKey: 'page_desc_pr', schema: 'Service', serviceType: 'PR and marketing', updated: '2026-11-23', priority: 0.9, ctaKey: 'cta_pr' },
  { path: 'legal', department: 'legal', titleKey: 'page_title_legal', descKey: 'page_desc_legal', schema: 'Service', serviceType: 'Legal services for artists', updated: '2026-11-23', priority: 0.9, ctaKey: 'cta_legal' },
  { path: 'contacts', department: 'company', titleKey: 'page_title_contacts', descKey: 'page_desc_contacts', schema: 'ContactPage', updated: '2026-11-23', priority: 0.7, ctaKey: 'cta_contact' },
  { path: 'brand', department: 'brand', titleKey: 'page_title_brand', descKey: 'page_desc_brand', schema: 'WebPage', updated: '2026-11-23', priority: 0.4 },
  { path: 'privacy', department: 'docs', titleKey: 'page_title_privacy', descKey: 'page_desc_privacy', schema: 'WebPage', updated: '2026-11-23', priority: 0.2 },
  { path: 'offer', department: 'docs', titleKey: 'page_title_offer', descKey: 'page_desc_offer', schema: 'WebPage', updated: '2026-11-23', priority: 0.2 },
];

export const DEPARTMENT_LABEL: Record<Department, string> = {
  company: 'Компания', distribution: 'Дистрибуция', label: 'Label', booking: 'Booking',
  pr: 'PR & Marketing', legal: 'Legal', brand: 'Брендбук', docs: 'Документы',
};

export function getPage(path: string): PageEntry {
  const p = PAGES.find((x) => x.path === path);
  if (!p) throw new Error(`[seo] page "${path}" is not registered in src/content/pages.ts`);
  return p;
}
