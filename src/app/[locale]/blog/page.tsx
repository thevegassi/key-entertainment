import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/content/articles';
import { buildMetadata } from '@/lib/seo/metadata';
import { SITE_NAME, isLocale } from '@/lib/seo/site';

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({
    locale, path: 'blog', title: `Blog | ${SITE_NAME}`,
    description: 'Articles about music distribution, labels, booking, PR and legal protection for artists in Kazakhstan.',
  });
}

export default async function BlogIndex({ params }: P) {
  const { locale } = await params;
  const items = ARTICLES.filter((a) => isLocale(locale) && a.content[locale]);
  if (!items.length) notFound(); // пока статей нет — раздел не публикуется
  return (
    <section style={{ padding: '140px 10% 80px', color: '#fff' }}>
      <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '32px' }}>Blog</h1>
      <ul style={{ display: 'grid', gap: '20px' }}>
        {items.map((a) => (
          <li key={a.slug}><Link href={`/${locale}/blog/${a.slug}`}>{a.content[locale as 'ru']!.title}</Link></li>
        ))}
      </ul>
    </section>
  );
}
