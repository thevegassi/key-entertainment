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
      <section style={{ minHeight: '70dvh', display: 'flex', alignItems: 'flex-end', padding: '160px 10% 80px', background: 'var(--oxford)', position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark-lime.svg" alt="" style={{ position: 'absolute', left: '-12%', top: '50%', transform: 'translateY(-50%)', width: '820px', maxWidth: 'none', opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="slide-num">LABEL</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05, color: '#fff' }}>KEY MUSIC<br /><span style={{ color: 'var(--accent)' }}>LABEL</span></h1>
        </div>
      </section>

      <section style={{ padding: '100px 10%', background: '#fff' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '24px' }}>{t('label_phil_title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '48px' }}>
          {['s1','s2'].map((s) => (
            <div key={s} style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-card)', padding: '32px', border: '1px solid var(--hairline)' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '12px', color: 'var(--navy-deep)' }}>{t(`label_${s}_title`)}</h3>
              <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.7 }}>{t(`label_${s}_desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 10%', background: 'var(--periwinkle)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {['video','design'].map((s) => (
            <div key={s} style={{ background: '#fff', borderRadius: 'var(--radius-card)', padding: '32px', border: '1px solid var(--hairline)' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '12px', color: 'var(--navy-deep)' }}>{t(`label_${s}_title`)}</h3>
              <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.7 }}>{t(`label_${s}_desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 10%', background: 'var(--oxford)', textAlign: 'center' }}>
        <Link href={`/${locale}/contacts`} style={{ display: 'inline-block', background: 'var(--accent)', color: 'var(--accent-ink)', padding: '16px 40px', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-pill)' }}>
          {t('label_form_title')}
        </Link>
      </section>
    </>
  );
}
