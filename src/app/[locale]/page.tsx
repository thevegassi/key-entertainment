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
    title: t('page_title_index'),
    description: t('page_desc_index'),
    alternates: { canonical: `https://www.keyent.kz/${locale}` },
  };
}

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <>
      {/* Hero */}
      <section
        className="hero-section"
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '160px 10% 100px',
          backgroundImage: 'url(/main.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '24px', fontWeight: 800 }}>
            {t('index_hero_sub')}
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '32px' }}>
            KEY<br /><span style={{ color: 'var(--accent)' }}>ENTERTAINMENT</span>
          </h1>
          <Link
            href={`/${locale}/distribution`}
            style={{
              display: 'inline-block',
              background: 'var(--accent)',
              color: '#000',
              padding: '14px 32px',
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            {t('more')}
          </Link>
        </div>
      </section>

      {/* Ecosystem */}
      <section style={{ padding: '120px 10%', background: '#000' }}>
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '4px', color: 'var(--accent)', fontWeight: 800, marginBottom: '12px' }}>
            {t('index_eco_label')}
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}>
            {t('index_eco_title')}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            { href: '/distribution', label: 'Distribution', desc: t('eco_dist_desc') },
            { href: '/label', label: 'Label', desc: t('eco_label_desc') },
            { href: '/booking', label: 'Booking', desc: t('eco_book_desc') },
            { href: '/pr', label: 'PR & Marketing', desc: t('eco_pr_desc') },
            { href: '/legal', label: 'Legal', desc: t('eco_legal_desc') },
          ].map(({ href, label, desc }) => (
            <Link
              key={href}
              href={`/${locale}${href}`}
              style={{
                display: 'block',
                background: 'var(--dark-card)',
                border: '1px solid rgba(211,255,51,0.1)',
                borderRadius: 'var(--radius-card)',
                padding: '32px',
                textDecoration: 'none',
                color: '#fff',
                transition: 'border-color 0.3s',
              }}
            >
              <h3 style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 800, marginBottom: '12px' }}>
                {label}
              </h3>
              <p style={{ color: '#888', lineHeight: 1.7, fontSize: '0.9rem' }}>{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '120px 10%', background: '#020202' }}>
        <div style={{ marginBottom: '64px' }}>
          <h2
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}
            dangerouslySetInnerHTML={{ __html: t('index_stats_title') }}
          />
          <p style={{ color: '#888', marginTop: '16px', maxWidth: '560px' }}>{t('index_stats_sub')}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          {[
            { num: '10+', label: t('index_stat1_label') },
            { num: '500M+', label: t('index_stat2_label') },
            { num: '50+', label: t('index_stat3_label') },
            { num: '150+', label: t('index_stat4_label') },
          ].map(({ num, label }) => (
            <div key={num}>
              <p style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>{num}</p>
              <p
                style={{ color: '#888', fontSize: '0.85rem', marginTop: '8px', lineHeight: 1.5 }}
                dangerouslySetInnerHTML={{ __html: label }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Goal */}
      <section style={{ padding: '120px 10%', background: '#000' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '4px', color: 'var(--accent)', fontWeight: 800, marginBottom: '12px' }}>
              {t('index_goal_label')}
            </p>
            <h2
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.1 }}
              dangerouslySetInnerHTML={{ __html: t('index_goal_title') }}
            />
          </div>
          <div>
            <p style={{ color: '#888', lineHeight: 1.8, marginBottom: '20px' }}>{t('index_goal_p1')}</p>
            <p style={{ color: '#888', lineHeight: 1.8 }}>{t('index_goal_p2')}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '120px 10%', textAlign: 'center', background: '#020202' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '32px' }}>
          {t('contacts_title')}
        </h2>
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
          {t('nav_contacts')}
        </Link>
      </section>
    </>
  );
}
