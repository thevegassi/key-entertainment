import { getTranslations } from 'next-intl/server';
import BookingInquiryForm from '@/components/BookingInquiryForm';
import SectionHeading from '@/components/SectionHeading';
import ServiceCard from '@/components/ServiceCard';
import SectionDivider from '@/components/SectionDivider';
import { pageMetadata } from '@/lib/seo/metadata';
import PageJsonLd from '@/components/seo/JsonLd';

const SERVICE_ICONS: Record<string, string> = {
  s1: 'TablerIconUsers',
  s2: 'TablerIconFlame',
  s3: 'TablerIconPlayerTrackNext',
  s4: 'TablerIconAddressBook',
};

export const generateMetadata = pageMetadata('booking');

const CASES = [
  { key: 'book_case1', title: 'BASQOSU FEST' },
  { key: 'book_case2', title: 'ЯКУТСК BIG SHOW' },
  { key: 'book_case3', title: 'KALI[ZONE] TOUR 2024' },
  { key: 'book_case4', title: 'ИК USA TOUR' },
  { key: 'book_case5', title: 'THE LIMBA USA TOUR' },
  { key: 'book_case6', title: 'RAiM & ERKE USA TOUR' },
] as const;

export default async function BookingPage() {
  const t = await getTranslations();

  return (
    <>
      <PageJsonLd path="booking" />
      {/* Hero */}
      <section className="on-dark" style={{ minHeight: '70dvh', display: 'flex', alignItems: 'flex-end', padding: '160px 10% 80px', background: 'var(--oxford)', position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark-lime.svg" alt="" style={{ position: 'absolute', left: '-12%', top: '50%', transform: 'translateY(-50%)', width: '820px', maxWidth: 'none', opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="slide-num">05 / GLOBAL EVENTS</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05, color: '#fff' }}>KEY <span style={{ color: 'var(--accent)' }}>BOOKING</span><br />AGENCY</h1>
          <p style={{ letterSpacing: '10px', textTransform: 'uppercase', marginTop: '28px', opacity: 0.8, fontSize: '0.75rem', color: '#fff' }}>TOURS • MANAGEMENT • STRATEGY</p>
        </div>
      </section>
      <SectionDivider from="var(--oxford)" to="#fff" />

      {/* Intro */}
      <section style={{ padding: '100px 10% 80px', background: '#fff' }}>
        <SectionHeading eyebrow={t('book_intro_label')} on="light">{t('book_intro_title')}</SectionHeading>
        <p className="lead-text">{t('book_intro_text')}</p>
      </section>
      <SectionDivider from="#fff" to="var(--periwinkle)" flip />

      {/* Services */}
      <section className="on-dark deck-navy-section" style={{ padding: 'var(--space-16) 6%' }}>
        <SectionHeading eyebrow={t('book_services_label')} on="dark">{t('book_services_title')}</SectionHeading>
        <div className="services-grid">
          {['s1', 's2', 's3', 's4'].map((s) => (
            <ServiceCard key={s} icon={SERVICE_ICONS[s]} label={t(`book_${s}_title`)} on="navy">
              {t(`book_${s}_desc`)}
            </ServiceCard>
          ))}
        </div>
      </section>
      <SectionDivider from="var(--periwinkle)" to="#fff" />

      {/* For artists / for organizers */}
      <section style={{ padding: 'var(--space-16) 10%', background: '#fff' }}>
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
          <div className="deck-card" style={{ padding: 'clamp(24px, 3vw, 36px)' }}>
            <p className="slide-num">FOR TALENTS</p>
            <h3 style={{ marginBottom: '22px', color: 'var(--oxford)', fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', letterSpacing: '-0.04em' }}>{t('book_for_artists_title')}</h3>
            <ul
              className="deck-chips-list"
              dangerouslySetInnerHTML={{ __html: t('book_artists_list') }}
            />
            <p style={{ marginTop: '22px', color: 'var(--navy-deep)', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.6 }}>
              {t('book_artists_result')}
            </p>
          </div>
          <div className="deck-card" style={{ padding: 'clamp(24px, 3vw, 36px)' }}>
            <p className="slide-num">FOR PARTNERS</p>
            <h3 style={{ marginBottom: '22px', color: 'var(--oxford)', fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', letterSpacing: '-0.04em' }}>{t('book_for_org_title')}</h3>
            <ul
              className="deck-chips-list"
              dangerouslySetInnerHTML={{ __html: t('book_org_list') }}
            />
            <p style={{ marginTop: '22px', color: 'var(--navy-deep)', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.6 }}>
              {t('book_org_result')}
            </p>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section style={{ padding: 'var(--space-16) 6% var(--space-16)', background: '#fff' }}>
        <SectionHeading eyebrow={t('book_cases_label')} on="light">{t('book_cases_title')}</SectionHeading>
        <div className="cases-grid">
          {CASES.map((c, i) => (
            <div key={c.key} className={i === 0 ? 'deck-navy' : 'deck-card'} style={i === 0 ? { borderRadius: 'var(--radius-deck)' } : undefined}>
              <h4 style={{ color: i === 0 ? 'var(--accent)' : 'var(--oxford)', margin: '0 0 10px', fontSize: i === 0 ? '1.5rem' : '1.05rem', textTransform: 'none', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.15 }}>{c.title}</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5, letterSpacing: '-0.01em', color: i === 0 ? 'rgba(255,255,255,0.85)' : '#3F4A5A', maxWidth: i === 0 ? '480px' : undefined }}>{t(c.key)}</p>
              <span className="deck-chip" style={{ alignSelf: 'flex-start', marginTop: 'auto', ...(i === 0 ? { background: 'var(--accent)', color: 'var(--accent-ink)' } : {}) }}>KEY BOOKING AGENCY</span>
            </div>
          ))}
        </div>
      </section>
      <SectionDivider from="#fff" to="var(--oxford)" flip />

      {/* Contact */}
      <section id="contact-section" className="on-dark" style={{ padding: 'var(--space-16) 10%', background: 'var(--oxford)', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/pattern-4-navy.svg)', backgroundSize: '420px', opacity: 0.3, mixBlendMode: 'overlay', pointerEvents: 'none' }}
        />
        <div className="mobile-stack" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          <div>
            <SectionHeading eyebrow={t('book_form_label')} on="dark">{t('book_form_title')}</SectionHeading>
          </div>
          <BookingInquiryForm />
        </div>
      </section>
    </>
  );
}
