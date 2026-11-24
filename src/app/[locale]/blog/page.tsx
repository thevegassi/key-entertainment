import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ARTICLES } from '@/content/articles';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { SITE_NAME, isLocale, pageUrl, type Locale } from '@/lib/seo/site';
import SectionDivider from '@/components/SectionDivider';
import { JsonLdScript } from '@/components/seo/JsonLd';

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata({
    locale,
    path: 'blog',
    title: `Blog | ${SITE_NAME}`,
    description: 'Articles about music distribution, labels, booking, PR and legal protection for artists in Kazakhstan.',
  });
}

export default async function BlogIndex({ params }: P) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const t = await getTranslations();

  const items = ARTICLES
    .filter((a) => a.content[locale])
    .map((a) => ({ ...a, c: a.content[locale]! }))
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());

  if (!items.length) notFound(); // пока статей нет — раздел не публикуется

  const dateFmt = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === 'en' ? 'en-GB' : locale === 'kz' ? 'kk-KZ' : 'ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <>
      <JsonLdScript
        data={breadcrumbSchema([
          { name: SITE_NAME, url: pageUrl(locale, '') },
          { name: 'Blog', url: pageUrl(locale, 'blog') },
        ])}
      />
      <section className="on-dark" style={{ minHeight: '50dvh', display: 'flex', alignItems: 'flex-end', padding: '160px 10% 80px', background: 'var(--oxford)', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/pattern-4-navy.svg)', backgroundSize: '420px', opacity: 0.3, mixBlendMode: 'overlay', pointerEvents: 'none' }}
        />
        <div style={{ position: 'relative' }}>
          <p className="slide-num">{t('blog_hero_label')}</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, color: '#fff', marginBottom: '20px' }}>
            {t('blog_hero_title')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '560px', fontSize: '1rem' }}>{t('blog_hero_sub')}</p>
        </div>
      </section>
      <SectionDivider from="var(--oxford)" to="#fff" />

      <section style={{ padding: '80px 10% 120px', background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {items.map((a) => (
            <Link key={a.slug} href={`/${locale}/blog/${a.slug}`} className="post-card">
              <span className="post-tag">{a.department.toUpperCase()}</span>
              <h2 className="post-title">{a.c.title}</h2>
              <p className="post-excerpt">{a.c.description}</p>
              <div className="post-meta">
                <span>{dateFmt(a.published)}</span>
                <span className="post-more">{t('blog_read_more')}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
