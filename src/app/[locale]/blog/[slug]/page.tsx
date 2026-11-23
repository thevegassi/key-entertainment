import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ARTICLES } from '@/content/articles';
import { JsonLdScript } from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { articleSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { LOCALES, SITE_NAME, isLocale, pageUrl } from '@/lib/seo/site';

type P = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ARTICLES.flatMap((a) => LOCALES.filter((l) => a.content[l]).map((locale) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a || !isLocale(locale) || !a.content[locale]) return {};
  const c = a.content[locale]!;
  return buildMetadata({
    locale, path: `blog/${slug}`, title: `${c.title} | ${SITE_NAME}`, description: c.description,
    type: 'article', locales: LOCALES.filter((l) => a.content[l]), image: a.image, published: a.published, modified: a.updated,
  });
}

export default async function ArticlePage({ params }: P) {
  const { locale, slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a || !isLocale(locale) || !a.content[locale]) notFound();
  setRequestLocale(locale);
  const c = a.content[locale]!;
  const url = pageUrl(locale, `blog/${slug}`);
  return (
    <article style={{ padding: '140px 10% 80px', maxWidth: '900px', color: '#fff' }}>
      <JsonLdScript data={articleSchema({ title: c.title, description: c.description, url, locale, published: a.published, updated: a.updated, image: a.image })} />
      <JsonLdScript data={breadcrumbSchema([{ name: SITE_NAME, url: pageUrl(locale, '') }, { name: 'Blog', url: pageUrl(locale, 'blog') }, { name: c.title, url }])} />
      <nav aria-label="breadcrumb" style={{ fontSize: '0.8rem', marginBottom: '24px', opacity: 0.7 }}>
        <Link href={`/${locale}`}>{SITE_NAME}</Link> / <Link href={`/${locale}/blog`}>Blog</Link>
      </nav>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '28px' }}>{c.title}</h1>
      {c.body.map((p, i) => p.startsWith('## ')
        ? <h2 key={i} style={{ fontSize: '1.6rem', margin: '36px 0 12px' }}>{p.slice(3)}</h2>
        : <p key={i} style={{ lineHeight: 1.8, marginBottom: '16px', color: 'rgba(255,255,255,0.85)' }}>{p}</p>)}
    </article>
  );
}
