import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BookingInquiryForm from '@/components/BookingInquiryForm';
import SectionHeading from '@/components/SectionHeading';
import ServiceCard from '@/components/ServiceCard';
import SectionDivider from '@/components/SectionDivider';

const SERVICE_ICONS: Record<string, string> = {
  s1: 'TablerIconUsers',
  s2: 'TablerIconFlame',
  s3: 'TablerIconPlayerTrackNext',
  s4: 'TablerIconAddressBook',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t('page_title_booking'), description: t('page_desc_booking'), alternates: { canonical: `https://www.keyent.kz/${locale}/booking` } };
}

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
      <section style={{ padding: 'var(--space-16) 10%', background: 'var(--periwinkle)' }}>
        <SectionHeading eyebrow={t('book_services_label')} on="periwinkle">{t('book_services_title')}</SectionHeading>
        <div className="services-grid">
          {['s1', 's2', 's3', 's4'].map((s) => (
            <ServiceCard key={s} icon={SERVICE_ICONS[s]} label={t(`book_${s}_title`)} on="periwinkle">
              {t(`book_${s}_desc`)}
            </ServiceCard>
          ))}
        </div>
      </section>
      <SectionDivider from="var(--periwinkle)" to="#fff" />

      {/* For artists / for organizers */}
      <section style={{ padding: 'var(--space-16) 10%', background: '#fff' }}>
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
          <div style={{ padding: '36px', borderLeft: '3px solid var(--accent)', background: 'var(--off-white)', borderRadius: 'var(--radius-card)' }}>
            <p className="slide-num">FOR TALENTS</p>
            <h3 style={{ marginBottom: '22px' }}>{t('book_for_artists_title')}</h3>
            <ul
              style={{ listStyle: 'none', padding: 0, color: 'var(--gray)', lineHeight: 1.9, fontSize: '0.92rem' }}
              dangerouslySetInnerHTML={{ __html: t('book_artists_list') }}
            />
            <p style={{ marginTop: '22px', color: 'var(--navy-deep)', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.6 }}>
              {t('book_artists_result')}
            </p>
          </div>
          <div style={{ padding: '36px', borderLeft: '3px solid var(--accent)', background: 'var(--off-white)', borderRadius: 'var(--radius-card)' }}>
            <p className="slide-num">FOR PARTNERS</p>
            <h3 style={{ marginBottom: '22px' }}>{t('book_for_org_title')}</h3>
            <ul
              style={{ listStyle: 'none', padding: 0, color: 'var(--gray)', lineHeight: 1.9, fontSize: '0.92rem' }}
              dangerouslySetInnerHTML={{ __html: t('book_org_list') }}
            />
            <p style={{ marginTop: '22px', color: 'var(--navy-deep)', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.6 }}>
              {t('book_org_result')}
            </p>
          </div>
        </div>
      </section>
      <SectionDivider from="#fff" to="var(--periwinkle)" flip />

      {/* Cases */}
      <section style={{ padding: 'var(--space-16) 10%', background: 'var(--periwinkle)' }}>
        <SectionHeading eyebrow={t('book_cases_label')} on="periwinkle">{t('book_cases_title')}</SectionHeading>
        <div className="cases-grid">
          {CASES.map((c, i) => (
            <div key={c.key} style={{ background: i === 0 ? 'var(--oxford)' : 'var(--off-white)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
              <div style={{ height: '6px', background: 'var(--accent)' }} />
              <div style={{ padding: i === 0 ? '32px' : '26px' }}>
                <h4 style={{ color: i === 0 ? '#fff' : 'var(--navy-deep)', marginBottom: '8px', fontSize: i === 0 ? '1.15rem' : '0.95rem', textTransform: 'uppercase', fontWeight: 800 }}>{c.title}</h4>
                <p style={{ fontSize: i === 0 ? '0.92rem' : '0.85rem', color: i === 0 ? 'rgba(255,255,255,0.7)' : 'var(--gray)', lineHeight: 1.6, maxWidth: i === 0 ? '480px' : undefined }}>{t(c.key)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <SectionDivider from="var(--periwinkle)" to="var(--oxford)" />

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
