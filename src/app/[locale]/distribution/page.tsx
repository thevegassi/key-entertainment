import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t('page_title_dist'),
    description: t('page_desc_distribution'),
    alternates: { canonical: `https://www.keyent.kz/${locale}/distribution` },
    openGraph: { title: t('page_title_dist'), description: t('page_desc_distribution') },
  };
}

export default async function DistributionPage() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <>
      {/* Hero */}
      <section
        style={{
          minHeight: '70dvh',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '160px 10% 80px',
          backgroundImage: 'url(/hero_dist.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85))' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '4px', color: 'var(--accent)', fontWeight: 800, marginBottom: '16px' }}>DISTRIBUTION</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05 }}>
            KEY <span style={{ color: 'var(--accent)' }}>DISTRIBUTION</span><br />SERVICES
          </h1>
        </div>
      </section>

      {/* S1 — Full Cycle */}
      <section style={{ padding: '100px 10%', background: '#000' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '24px' }}>
          {t('dist_s1_title')}
        </h2>
        <p style={{ color: '#888', maxWidth: '720px', lineHeight: 1.8, marginBottom: '60px', fontSize: '1.05rem' }}>
          {t('dist_s1_sub')}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {['1','2','3','4'].map((n) => (
            <div key={n} style={{ background: 'var(--dark-card)', borderRadius: 'var(--radius-card)', padding: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>{t(`dist_card${n}_title`)}</h3>
              <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.7 }}>{t(`dist_card${n}_desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who we work with */}
      <section style={{ padding: '100px 10%', background: '#020202' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '16px' }}>
          {t('dist_partner_title')}
        </h2>
        <p style={{ color: '#888', marginBottom: '48px', maxWidth: '600px', lineHeight: 1.7 }}>
          {t('dist_partner_sub')}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '600px' }}>
          <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '18px' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '8px' }}>{t('dist_artists_title')}</h3>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>{t('dist_artists_desc')}</p>
          </div>
          <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '18px' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '8px' }}>{t('dist_companies_title')}</h3>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>{t('dist_companies_desc')}</p>
          </div>
        </div>
      </section>

      {/* YouTube & TikTok */}
      <section style={{ padding: '100px 10%', background: '#000' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '16px' }}>
          {t('dist_s2_title')}
        </h2>
        <p style={{ color: '#888', maxWidth: '600px', lineHeight: 1.7, marginBottom: '48px' }}>
          {t('dist_s2_sub')}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: 'var(--radius-card)', padding: '28px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '12px' }}>{t('dist_yt_title')}</h3>
            <p style={{ color: '#fff', fontSize: '0.95rem', lineHeight: 1.6 }}>{t('dist_yt_desc')}</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: 'var(--radius-card)', padding: '28px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '12px' }}>{t('dist_tt_title')}</h3>
            <p style={{ color: '#fff', fontSize: '0.95rem', lineHeight: 1.6 }}>{t('dist_tt_desc')}</p>
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section style={{ padding: '100px 10%', background: '#020202', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '32px' }}>
          {t('dist_form_title')}
        </h2>
        <p style={{ color: '#888', marginBottom: '40px', maxWidth: '560px', margin: '0 auto 40px' }}>
          {t('dist_form_intro')}
        </p>
        <Link
          href={`/${locale}/contacts`}
          style={{
            display: 'inline-block',
            background: 'var(--accent)',
            color: '#000',
            padding: '16px 40px',
            fontWeight: 800,
            fontSize: '0.8rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '2px',
          }}
        >
          {t('more')}
        </Link>
      </section>
    </>
  );
}
