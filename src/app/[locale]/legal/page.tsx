import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import LegalShop from '@/components/LegalShop';
import LegalInquiryForm from '@/components/LegalInquiryForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t('page_title_legal'), description: t('page_desc_legal'), alternates: { canonical: `https://www.keyent.kz/${locale}/legal` } };
}

export default async function LegalPage() {
  const t = await getTranslations();
  const services = ['s1', 's2', 's3', 's4'];

  return (
    <>
      {/* Hero */}
      <section style={{ minHeight: '70dvh', display: 'flex', alignItems: 'flex-end', padding: '160px 10% 80px', background: 'var(--oxford)', position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark-lime.svg" alt="" style={{ position: 'absolute', left: '-12%', top: '50%', transform: 'translateY(-50%)', width: '820px', maxWidth: 'none', opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="slide-num">LEGAL</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05, color: '#fff' }}>KEY <span style={{ color: 'var(--accent)' }}>LEGAL</span><br />SERVICES</h1>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ padding: '60px 10% 40px', background: '#fff' }}>
        <div style={{ background: 'var(--off-white)', border: '1px solid var(--hairline)', borderLeft: '4px solid var(--accent)', borderRadius: 'var(--radius-card)', padding: '24px 32px', maxWidth: '900px' }}>
          <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{t('legal_disclaimer')}</p>
        </div>
      </section>

      {/* Document solutions / shop */}
      <section style={{ padding: '80px 10% 100px', background: 'var(--periwinkle)' }}>
        <p className="slide-num">{t('legal_docs_label')}</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '16px' }}>{t('legal_docs_title')}</h2>
        <p style={{ color: 'var(--indigo-ink)', maxWidth: '600px', marginBottom: '8px', lineHeight: 1.7 }}>{t('legal_docs_sub')}</p>
        <LegalShop />
      </section>

      {/* Custom request banner */}
      <section style={{ padding: '80px 10%', background: '#fff' }}>
        <div style={{ background: 'var(--off-white)', border: '1px solid var(--hairline)', borderRadius: 'var(--radius-card)', padding: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ maxWidth: '500px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: '10px' }}>{t('legal_custom_title')}</h3>
            <p style={{ color: 'var(--gray)', fontSize: '0.9rem', lineHeight: 1.7 }}>{t('legal_custom_desc')}</p>
          </div>
          <a href="#contact-section" className="submit-btn" style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
            {t('legal_custom_cta')}
          </a>
        </div>
      </section>

      {/* Areas of protection */}
      <section style={{ padding: '100px 10%', background: 'var(--periwinkle)' }}>
        <p className="slide-num">{t('legal_areas_label')}</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '60px' }}>{t('legal_areas_title')}</h2>
        <div className="services-grid">
          {services.map((s) => (
            <div key={s} className="info-card" style={{ background: 'var(--off-white)', border: '1px solid var(--hairline)' }}>
              <h4>{t(`legal_${s}_title`)}</h4>
              <p>{t(`legal_${s}_desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brands & Finance */}
      <section style={{ padding: '100px 10%', background: '#fff' }}>
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <p className="slide-num">{t('legal_finance_label')}</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '24px' }}>{t('legal_finance_title')}</h2>
            <h4 style={{ color: 'var(--navy-deep)', fontSize: '0.95rem', fontWeight: 800, marginBottom: '10px', textTransform: 'uppercase' }}>{t('legal_tm_title')}</h4>
            <p style={{ color: 'var(--gray)', marginBottom: '28px', lineHeight: 1.7 }}>{t('legal_tm_desc')}</p>
            <h4 style={{ color: 'var(--navy-deep)', fontSize: '0.95rem', fontWeight: 800, marginBottom: '10px', textTransform: 'uppercase' }}>{t('legal_fin_title')}</h4>
            <p style={{ color: 'var(--gray)', lineHeight: 1.7 }}>{t('legal_fin_desc')}</p>
          </div>
          <div style={{ height: 'clamp(260px, 32vw, 380px)', borderRadius: 'var(--radius-card)', background: 'linear-gradient(135deg, var(--oxford), var(--navy-deep))', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-mark-lime.svg" alt="" style={{ width: '45%', opacity: 0.55 }} />
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section id="contact-section" style={{ padding: '100px 10%', background: 'var(--oxford)' }}>
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          <div>
            <p className="slide-num">{t('legal_form_label')}</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, color: '#fff' }}>{t('legal_form_title')}</h2>
          </div>
          <LegalInquiryForm />
        </div>
      </section>
    </>
  );
}
