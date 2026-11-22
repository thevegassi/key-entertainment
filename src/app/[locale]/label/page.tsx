import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t('page_title_label'), description: t('page_desc_label'), alternates: { canonical: `https://www.keyent.kz/${locale}/label` } };
}

export default async function LabelPage() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <>
      {/* Hero */}
      <section style={{ minHeight: '70dvh', display: 'flex', alignItems: 'flex-end', padding: '160px 10% 80px', background: 'var(--oxford)', position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark-lime.svg" alt="" style={{ position: 'absolute', left: '-12%', top: '50%', transform: 'translateY(-50%)', width: '820px', maxWidth: 'none', opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="slide-num">LABEL</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05, color: '#fff' }}>KEY MUSIC<br /><span style={{ color: 'var(--accent)' }}>LABEL</span></h1>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ padding: '100px 10%', background: '#fff' }}>
        <p className="slide-num" style={{ marginBottom: '20px' }}>{t('label_phil_label')}</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '24px', maxWidth: '860px' }}>
          {t('label_phil_title')}
        </h2>
        <p style={{ color: 'var(--gray)', maxWidth: '720px', lineHeight: 1.8, fontSize: '1.05rem' }}>
          {t('label_phil_text')}
        </p>
      </section>

      {/* Stage 01 — Music Production */}
      <section style={{ padding: '100px 10%', background: 'var(--periwinkle)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '4px', color: 'var(--indigo-ink)', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase' }}>STAGE 01</p>
            <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 900, marginBottom: '16px' }}>{t('label_s1_title')}</h3>
            <p style={{ color: 'var(--indigo-ink)', fontSize: '1rem', lineHeight: 1.7 }}>{t('label_s1_desc')}</p>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['label_li1', 'label_li2', 'label_li3'].map((key) => (
              <li
                key={key}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  background: '#fff',
                  border: '1px solid var(--hairline)',
                  borderRadius: 'var(--radius-card)',
                  padding: '18px 20px',
                  fontSize: '0.95rem',
                  color: 'var(--ink)',
                }}
              >
                <span style={{ color: 'var(--accent-ink)', background: 'var(--accent)', borderRadius: '50%', width: '22px', height: '22px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900 }}>
                  ✓
                </span>
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stage 02 — Visual Production */}
      <section style={{ padding: '100px 10%', background: '#fff' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '4px', color: 'var(--navy-deep)', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase' }}>STAGE 02</p>
        <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 900, marginBottom: '16px' }}>{t('label_s2_title')}</h3>
        <p style={{ color: 'var(--gray)', maxWidth: '680px', lineHeight: 1.7, marginBottom: '48px', fontSize: '1rem' }}>{t('label_s2_desc')}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {['video', 'design'].map((s) => (
            <div key={s} style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-card)', padding: '32px', border: '1px solid var(--hairline)' }}>
              <h4 style={{ fontWeight: 800, marginBottom: '12px', color: 'var(--navy-deep)' }}>{t(`label_${s}_title`)}</h4>
              <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.7 }}>{t(`label_${s}_desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — Send Demo */}
      <section style={{ padding: '100px 10%', background: 'var(--oxford)', textAlign: 'center' }}>
        <p className="slide-num" style={{ margin: '0 auto 20px' }}>{t('label_form_label')}</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '20px', color: '#fff' }}>
          {t('label_form_title')}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '40px', maxWidth: '560px', margin: '0 auto 40px' }}>
          {t('label_form_sub')}
        </p>
        <Link href={`/${locale}/contacts`} style={{ display: 'inline-block', background: 'var(--accent)', color: 'var(--accent-ink)', padding: '16px 40px', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-pill)' }}>
          {t('label_form_submit')}
        </Link>
      </section>
    </>
  );
}
