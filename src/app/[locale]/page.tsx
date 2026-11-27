import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import SectionDivider from '@/components/SectionDivider';
import { pageMetadata } from '@/lib/seo/metadata';
import PageJsonLd from '@/components/seo/JsonLd';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import { Fade } from '@/components/animate-ui/primitives/effects/fade';

export const generateMetadata = pageMetadata('');

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <>
      <PageJsonLd path="" />
      {/* Hero — asymmetric, bottom-left anchored (matches every interior page's hero convention) */}
      <section
        className="hero-section on-dark"
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '160px 8% 120px',
          backgroundImage: 'url(/concert-crowd.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,35,80,0.55)' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <p style={{ display: 'inline-block', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 800, border: '2px solid var(--accent)', borderRadius: 'var(--radius-pill)', padding: '6px 20px', margin: 0 }}>
              ESTABLISHED 2015
            </p>
            <p style={{ fontSize: '0.7rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 800, margin: 0 }}>
              {t('index_hero_sub')}
            </p>
          </div>
          <h1 translate="no" className="deck-display" style={{ fontSize: 'clamp(3rem, 11vw, 9rem)', lineHeight: 0.9, marginBottom: '40px', color: '#fff' }}>
            <span style={{ display: 'block' }}>KEY</span>
            <span style={{ color: 'var(--accent)', display: 'block' }}>ENTERTAINMENT</span>
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
      <SectionDivider from="var(--oxford)" to="#fff" />

      {/* Statement — the tagline gets its own full-bleed typographic moment */}
      <section style={{ padding: 'var(--space-14) 6% var(--space-10)', background: '#fff' }}>
        <p
          className="deck-display" style={{ fontSize: 'clamp(2.2rem, 7vw, 5.5rem)', lineHeight: 0.98, color: 'var(--oxford)', margin: 0, textTransform: 'none' }}
          dangerouslySetInnerHTML={{ __html: t('index_tagline') }}
        />
      </section>

      {/* Who we are — Figma slide 02: intro + Mission / Goal / History blocks */}
      <section style={{ padding: '0 6% var(--space-16)', background: '#fff' }}>
        <div className="deck-who">
          <div className="deck-who__intro">
            <p
              className="deck-lead"
              style={{ color: 'var(--ink)', margin: '0 0 20px' }}
              dangerouslySetInnerHTML={{ __html: t('index_who_left') }}
            />
            <p
              style={{ color: 'var(--gray)', lineHeight: 1.6, letterSpacing: '-0.01em', margin: 0 }}
              dangerouslySetInnerHTML={{ __html: t('index_who_right') }}
            />
          </div>
          <Reveal className="deck-navy deck-navy--mission">
            <h2 className="deck-navy__title">{t('who_mission_title')}</h2>
            <p className="deck-navy__text">{t('who_mission_text')}</p>
            <Fade inView asChild>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="deck-navy__icon" src="/deck/globe.svg" alt="" width={200} height={200} loading="lazy" />
            </Fade>
          </Reveal>
          <Reveal className="deck-navy deck-navy--goal" delay={80}>
            <h2 className="deck-navy__title">{t('who_goal_title')}</h2>
            <p className="deck-navy__text">{t('who_goal_text')}</p>
            <Fade inView asChild>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="deck-navy__icon" src="/deck/target.svg" alt="" width={208} height={208} loading="lazy" />
            </Fade>
          </Reveal>
          <Reveal className="deck-navy deck-navy--history" delay={160}>
            <h2 className="deck-navy__title">{t('who_history_title')}</h2>
            <div className="deck-history__cols">
              <p className="deck-navy__text" style={{ maxWidth: 'none', flex: '0 0 36%' }} dangerouslySetInnerHTML={{ __html: t('who_history_left') }} />
              <p className="deck-navy__text" style={{ maxWidth: '36ch' }}>{t('who_history_right')}</p>
            </div>
            <div className="deck-timeline" aria-hidden="true"><span className="deck-timeline__year">2015</span></div>
          </Reveal>
        </div>
      </section>

      {/* Departments — Figma slide 03: navy rows, lime e-mail, solid icon */}
      <section style={{ padding: 'var(--space-14) 6% var(--space-16)', background: '#fff' }}>
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '4px', color: 'var(--navy-deep)', fontWeight: 700, marginBottom: '12px' }}>
            {t('index_eco_label')}
          </p>
          <h2 className="deck-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 0 }}>
            {t('index_eco_title')}
          </h2>
          <p style={{ color: 'var(--ink)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '560px', marginTop: '16px' }}>
            {t('index_eco_sub')}
          </p>
        </div>
        <div className="deck-rows">
          {[
            { href: '/distribution', title: 'Key Distribution Services', mail: 'distribution@keyent.kz', icon: 'distribution', w: 72, h: 58 },
            { href: '/legal', title: 'Key Legal Department', mail: 'legal@keyent.kz', icon: 'legal', w: 60, h: 67 },
            { href: '/label', title: 'Key Music Label', mail: 'music-label@keyent.kz', icon: 'label', w: 67, h: 67 },
            { href: '/pr', title: 'Key PR & Marketing Department', mail: 'pr@keyent.kz', icon: 'pr', w: 80, h: 80 },
            { href: '/booking', title: 'Key Booking Agency', mail: 'booking@keyent.kz', icon: 'booking', w: 80, h: 80 },
          ].map(({ href, title, mail, icon, w, h }, i) => (
            <Reveal key={href} delay={i * 60}>
              <Link href={`/${locale}${href}`} className="deck-row">
                <span>
                  <h3 className="deck-row__title" translate="no">{title}</h3>
                  <p className="deck-row__mail">{mail}</p>
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="deck-row__icon" src={`/deck/dept-${icon}.svg`} alt="" width={w} height={h} loading="lazy" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: 'var(--space-16) 6%', background: '#fff' }}>
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
              <CountUp value={num} className="stat-num" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 900, color: 'var(--oxford)', lineHeight: 1 }} />
              <p
                style={{ color: 'var(--gray)', fontSize: '0.85rem', marginTop: '8px', lineHeight: 1.5 }}
                dangerouslySetInnerHTML={{ __html: label }}
              />
            </div>
          ))}
        </div>
      </section>
      <SectionDivider from="#fff" to="var(--oxford)" flip />

      {/* Mission — lime highlight-on-dark, per brandbook ("section titles on dark") */}
      <section className="on-dark" style={{ padding: 'var(--space-16) 10%', textAlign: 'center', background: 'var(--oxford)', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/pattern-4-navy.svg)',
            backgroundSize: '420px',
            opacity: 0.3,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />
        <div aria-hidden="true" className="mission-glow" />
        <Reveal style={{ position: 'relative', zIndex: 1 }}>
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
        </Reveal>
      </section>
    </>
  );
}
