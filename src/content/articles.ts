import type { Department } from './pages';
import type { Locale } from '@/lib/seo/site';

/**
 * СТАТЬИ. Добавили объект сюда — статья появляется на /<locale>/blog/<slug>,
 * в sitemap, в ads-feed и получает Article + BreadcrumbList JSON-LD автоматически.
 * Пока массив пуст, раздел /blog не публикуется (нет тонких страниц).
 */
export type ArticleLocaleContent = {
  title: string;        // ≤ 60 символов вместе с брендом (бренд добавляется автоматически)
  description: string;  // ≤ 160
  /** Абзацы; строка, начинающаяся с "## ", — подзаголовок H2 */
  body: string[];
};

export type Article = {
  slug: string;
  department: Department;
  published: string; // ISO
  updated: string;   // ISO
  image?: string;    // путь в /public, 1200x630
  /** Языки, на которых статья существует (hreflang строится только по ним) */
  content: Partial<Record<Locale, ArticleLocaleContent>>;
};

export const ARTICLES: Article[] = [];
