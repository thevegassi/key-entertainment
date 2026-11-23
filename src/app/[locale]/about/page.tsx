import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import SectionDivider from '@/components/SectionDivider';

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
      {/* Hero */}
      <section className="on-dark" style={{ minHeight: '70dvh', display: 'flex', alignItems: 'flex-end', padding: '160px 10% 80px', background: 'var(--oxford)', position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark-lime.svg" alt="" style={{ position: 'absolute', left: '-12%', top: '50%', transform: 'translateY(-50%)', width: '820px', maxWidth: 'none', opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="slide-num">KEY ENTERTAINMENT</p>
          <h1
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05, color: '#fff' }}
            dangerouslySetInnerHTML={{ __html: t('about_hero_title') }}
          />
        </div>
      </section>
      <SectionDivider from="var(--oxford)" to="#fff" />

      {/* Who we are */}
      <section style={{ padding: 'var(--space-16) 10%', background: '#fff' }}>
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
          <div>
            <p style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.5 }}>
              {t('about_who_left')}
            </p>
          </div>
          <div>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8 }}>{t('about_who_right')}</p>
          </div>
        </div>
      </section>
      <SectionDivider from="#fff" to="var(--periwinkle)" flip />

      {/* Goal / capitalization */}
      <section style={{ padding: 'var(--space-16) 10%', background: 'var(--periwinkle)' }}>
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', alignItems: 'center' }}>
          <div
            style={{
              borderRadius: 'var(--radius-card)',
              overflow: 'hidden',
              height: 'clamp(280px, 36vw, 420px)',
              background: 'linear-gradient(135deg, var(--oxford), var(--navy-deep))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark-lime.svg" alt="" style={{ width: '42%', opacity: 0.6 }} />
          </div>
          <div>
            <SectionHeading eyebrow={t('index_goal_label')} on="periwinkle">
              <span dangerouslySetInnerHTML={{ __html: t('index_goal_title') }} />
            </SectionHeading>
            <p style={{ color: 'var(--indigo-ink)', fontSize: '1.02rem', marginBottom: '16px', lineHeight: 1.7 }}>{t('about_goal_p1')}</p>
            <p style={{ color: 'var(--indigo-ink)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '28px' }}>{t('about_goal_p2')}</p>
            <div style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: '28px', borderLeft: '3px solid var(--accent)' }}>
              <p style={{ fontStyle: 'italic', color: 'var(--navy-deep)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>{t('about_quote')}</p>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider from="var(--periwinkle)" to="#fff" />

      {/* Genesis */}
      <section style={{ padding: 'var(--space-16) 10%', background: '#fff' }}>
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          <div>
            <SectionHeading eyebrow={t('about_genesis_label')} on="light">{t('about_genesis_title')}</SectionHeading>
            <p
              style={{ color: 'var(--gray)', marginBottom: '20px', lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: t('about_genesis_p1') }}
            />
            <p style={{ color: 'var(--gray)', lineHeight: 1.7 }}>{t('about_genesis_p2')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-card)', padding: '28px' }}>
              <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--oxford)' }}>2015</div>
              <p style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginTop: '6px' }}>
                {t('about_founded')}
              </p>
            </div>
            <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-card)', padding: '28px' }}>
              <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--oxford)' }}>06</div>
              <p style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginTop: '6px' }}>
                {t('about_cities')}
              </p>
            </div>
            <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-card)', padding: '28px', gridColumn: 'span 2' }}>
              <div style={{ fontSize: '2.6rem', fontWeight: 900, color: 'var(--oxford)' }}>10+</div>
              <p style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'var(--gray)', textTransform: 'uppercase', marginTop: '6px' }}>
                {t('about_years')}
              </p>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider from="#fff" to="var(--periwinkle)" flip />

      {/* Mission */}
      <section style={{ padding: 'var(--space-16) 10%', background: 'var(--periwinkle)', textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <SectionHeading eyebrow={t('index_mission_label')} on="periwinkle" center style={{ marginBottom: 0 }}>{t('about_mission_title')}</SectionHeading>
          <p
            style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)', fontWeight: 300, color: 'var(--indigo-ink)', lineHeight: 1.5, marginTop: '24px' }}
            dangerouslySetInnerHTML={{ __html: t('about_mission_quote') }}
          />
          <p style={{ marginTop: '24px', color: 'var(--indigo-ink)', fontSize: '1rem', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
            {t('about_mission_sub')}
          </p>
        </div>
      </section>
      <SectionDivider from="var(--periwinkle)" to="var(--oxford)" />

      {/* CTA */}
      <section className="on-dark" style={{ padding: 'var(--space-16) 10%', background: 'var(--oxford)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/pattern-4-navy.svg)', backgroundSize: '420px', opacity: 0.3, mixBlendMode: 'overlay', pointerEvents: 'none' }}
        />
        <Link href={`/${locale}/contacts`} style={{ position: 'relative', display: 'inline-block', background: 'var(--accent)', color: 'var(--accent-ink)', padding: '16px 40px', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-pill)' }}>
          {t('nav_contacts')}
        </Link>
      </section>
    </>
  );
}
