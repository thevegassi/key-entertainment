import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t('page_title_about'),
    description: t('page_desc_about'),
    alternates: { canonical: `https://www.keyent.kz/${locale}/about` },
  };
}

export default async function AboutPage() {
  const t = await getTranslations();
  const locale = await getLocale();
  return (
    <>
      <section style={{ minHeight: '70dvh', display: 'flex', alignItems: 'flex-end', padding: '160px 10% 80px', backgroundImage: 'url(/mission_bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85))' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05 }} dangerouslySetInnerHTML={{ __html: t('about_hero_title') }} />
        </div>
      </section>

      <section style={{ padding: '100px 10%', background: '#000' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
          <div>
            <p style={{ color: '#888', lineHeight: 1.8, fontSize: '1.05rem' }} dangerouslySetInnerHTML={{ __html: t('about_who_left') }} />
          </div>
          <div>
            <p style={{ color: '#888', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: t('about_who_right') }} />
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 10%', background: '#020202' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '24px' }}>
          {t('about_mission_title')}
        </h2>
        <p style={{ color: '#888', maxWidth: '720px', lineHeight: 1.8 }}>{t('about_goal_p1')}</p>
      </section>

      <section style={{ padding: '100px 10%', background: '#000', textAlign: 'center' }}>
        <Link href={`/${locale}/contacts`} style={{ display: 'inline-block', background: 'var(--accent)', color: '#000', padding: '16px 40px', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px' }}>
          {t('nav_contacts')}
        </Link>
      </section>
    </>
  );
}
