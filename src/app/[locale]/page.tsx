import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';

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
          backgroundImage: 'url(/concert-crowd.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,35,80,0.55)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ display: 'inline-block', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 800, border: '2px solid var(--accent)', borderRadius: 'var(--radius-pill)', padding: '6px 20px', marginBottom: '28px' }}>
            ESTABLISHED 2015
          </p>
          <p style={{ fontSize: '0.7rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '24px', fontWeight: 800 }}>
            {t('index_hero_sub')}
          </p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 1.05, marginBottom: '32px', color: '#fff' }}>
            KEY<br /><span style={{ color: 'var(--accent)' }}>ENTERTAINMENT</span>
          </h1>
          <Link
            href={`/${locale}/distribution`}
            style={{
              display: 'inline-block',
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              padding: '14px 32px',
              fontWeight: 800,
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 'var(--radius-pill)',
            }}
          >
            {t('more')}
          </Link>
        </div>
      </section>

      {/* Who we are */}
      <section style={{ padding: 'var(--space-16) 10%', background: '#fff' }}>
        <p
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.75rem)', fontWeight: 300, lineHeight: 1.15, marginBottom: 'var(--space-10)', color: 'var(--oxford)' }}
          dangerouslySetInnerHTML={{ __html: t('index_tagline') }}
        />
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          <p
            style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.5 }}
            dangerouslySetInnerHTML={{ __html: t('index_who_left') }}
          />
          <p
            style={{ color: 'var(--gray)', lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: t('index_who_right') }}
          />
        </div>
      </section>

      {/* Ecosystem */}
      <section style={{ padding: 'var(--space-16) 10%', background: 'var(--periwinkle)' }}>
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '4px', color: 'var(--navy-deep)', fontWeight: 800, marginBottom: '12px' }}>
            {t('index_eco_label')}
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}>
            {t('index_eco_title')}
          </h2>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '520px', marginTop: '16px' }}>
            {t('index_eco_sub')}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            { href: '/distribution', label: 'Distribution', desc: t('eco_dist_desc'), icon: 'TablerIconPlaylist' },
            { href: '/label', label: 'Label', desc: t('eco_label_desc'), icon: 'TablerIconVinyl' },
            { href: '/booking', label: 'Booking', desc: t('eco_book_desc'), icon: 'TablerIconFlame' },
            { href: '/pr', label: 'PR & Marketing', desc: t('eco_pr_desc'), icon: 'TablerIconNews' },
            { href: '/legal', label: 'Legal', desc: t('eco_legal_desc'), icon: 'TablerIconAddressBook' },
          ].map(({ href, label, desc, icon }) => (
            <Link
              key={href}
              href={`/${locale}${href}`}
              className="eco-card-link"
              style={{
                display: 'block',
                background: '#fff',
                borderRadius: 'var(--radius-card)',
                padding: '32px',
                textDecoration: 'none',
                color: 'var(--ink)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Icon name={icon} size={26} style={{ color: 'var(--navy-deep)', flexShrink: 0 }} />
                <h3 style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--navy-deep)', fontWeight: 800, margin: 0 }}>
                  {label}
                </h3>
              </div>
              <p style={{ color: 'var(--gray)', lineHeight: 1.7, fontSize: '0.9rem' }}>{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: 'var(--space-16) 10%', background: '#fff' }}>
        <div style={{ marginBottom: '64px' }}>
          <h2
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}
            dangerouslySetInnerHTML={{ __html: t('index_stats_title') }}
          />
          <p style={{ color: 'var(--gray)', marginTop: '16px', maxWidth: '560px' }}>{t('index_stats_sub')}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px' }}>
          {[
            { num: '10+', label: t('index_stat1_label') },
            { num: '30M+', label: t('index_stat2_label') },
            { num: '1000+', label: t('index_stat3_label') },
            { num: '150+', label: t('index_stat4_label') },
            { num: '20+', label: t('index_stat5_label') },
          ].map(({ num, label }) => (
            <div key={num}>
              <p style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 900, color: 'var(--oxford)', lineHeight: 1 }}>{num}</p>
              <p
                style={{ color: 'var(--gray)', fontSize: '0.85rem', marginTop: '8px', lineHeight: 1.5 }}
                dangerouslySetInnerHTML={{ __html: label }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Mission — lime highlight-on-dark, per brandbook ("section titles on dark") */}
      <section style={{ padding: 'var(--space-16) 10%', textAlign: 'center', background: 'var(--oxford)' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 800, marginBottom: 'var(--space-6)' }}>
          {t('index_mission_label')}
        </p>
        <p
          style={{ fontSize: 'clamp(1.3rem, 3vw, 2.2rem)', fontWeight: 300, color: '#fff', lineHeight: 1.3, maxWidth: '820px', margin: '0 auto var(--space-8)' }}
          dangerouslySetInnerHTML={{ __html: t('index_mission_quote') }}
        />
        <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '640px', margin: '0 auto var(--space-9)', lineHeight: 1.7 }}>
          {t('index_mission_sub')}
        </p>
        <Link
          href={`/${locale}/contacts`}
          style={{
            display: 'inline-block',
            background: 'var(--accent)',
            color: 'var(--accent-ink)',
            padding: '16px 40px',
            fontWeight: 800,
            fontSize: '0.8rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: 'var(--radius-pill)',
          }}
        >
          {t('index_mission_cta')}
        </Link>
      </section>
    </>
  );
}
