import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ARTICLES } from '@/content/articles';
import { JsonLdScript } from '@/components/seo/JsonLd';
import SectionDivider from '@/components/SectionDivider';
import { buildMetadata } from '@/lib/seo/metadata';
import { articleSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { LOCALES, SITE_NAME, isLocale, pageUrl, type Locale } from '@/lib/seo/site';

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

/** Блок тела статьи: "## " → H2, "> " → цитата, "- " → пункт списка (группируются), иначе — абзац. */
function renderBody(body: string[]) {
  const nodes: ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (!listBuffer.length) return;
    nodes.push(
      <ul key={key}>
        {listBuffer.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
      </ul>,
    );
    listBuffer = [];
  };

  body.forEach((block, i) => {
    if (block.startsWith('- ')) {
      listBuffer.push(block.slice(2));
      return;
    }
    flushList(`list-${i}`);
    if (block.startsWith('## ')) {
      nodes.push(<h2 key={i}>{block.slice(3)}</h2>);
    } else if (block.startsWith('> ')) {
      nodes.push(<blockquote key={i}><p>{block.slice(2)}</p></blockquote>);
    } else {
      nodes.push(<p key={i} dangerouslySetInnerHTML={{ __html: block }} />);
    }
  });
  flushList('list-end');
  return nodes;
}

export default async function ArticlePage({ params }: P) {
  const { locale: rawLocale, slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a || !isLocale(rawLocale) || !a.content[rawLocale]) notFound();
  const locale = rawLocale as Locale;
  const c = a.content[locale]!;
  const t = await getTranslations();
  const url = pageUrl(locale, `blog/${slug}`);

  const dateFmt = new Date(a.published).toLocaleDateString(locale === 'en' ? 'en-GB' : locale === 'kz' ? 'kk-KZ' : 'ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const related = ARTICLES.filter((x) => x.slug !== slug && x.content[locale]);

  return (
    <>
      <JsonLdScript data={articleSchema({ title: c.title, description: c.description, url, locale, published: a.published, updated: a.updated, image: a.image })} />
      <JsonLdScript data={breadcrumbSchema([{ name: SITE_NAME, url: pageUrl(locale, '') }, { name: 'Blog', url: pageUrl(locale, 'blog') }, { name: c.title, url }])} />

      <section className="on-dark" style={{ padding: '160px 10% 60px', background: 'var(--oxford)' }}>
        <Link href={`/${locale}/blog`} style={{ display: 'inline-block', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textDecoration: 'none', marginBottom: 'var(--space-6)' }}>
          {t('blog_back')}
        </Link>
        <p className="slide-num">{a.department.toUpperCase()}</p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, color: '#fff', maxWidth: '860px', marginBottom: 'var(--space-6)' }}>
          {c.title}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', letterSpacing: '0.5px' }}>
          {dateFmt} · {c.readTime}
        </p>
      </section>
      <SectionDivider from="var(--oxford)" to="#fff" />

      <article className="article-body">
        {renderBody(c.body)}
      </article>

      {related.length > 0 && (
        <>
          <SectionDivider from="#fff" to="var(--off-white)" />
          <section style={{ padding: '60px 10% 100px', background: 'var(--off-white)' }}>
            <p className="slide-num">{t('blog_related_label')}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {related.map((r) => {
                const rc = r.content[locale]!;
                return (
                  <Link key={r.slug} href={`/${locale}/blog/${r.slug}`} className="post-card" style={{ background: '#fff' }}>
                    <span className="post-tag">{r.department.toUpperCase()}</span>
                    <h2 className="post-title">{rc.title}</h2>
                    <p className="post-excerpt">{rc.description}</p>
                    <div className="post-meta">
                      <span>{rc.readTime}</span>
                      <span className="post-more">{t('blog_read_more')}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}
    </>
  );
}
