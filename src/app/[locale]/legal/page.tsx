import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t('page_title_legal'), description: t('page_desc_legal'), alternates: { canonical: `https://www.keyent.kz/${locale}/legal` } };
}

export default async function LegalPage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const services = ['s1','s2','s3','s4'];
  return (
    <>
      <section style={{ minHeight: '70dvh', display: 'flex', alignItems: 'flex-end', padding: '160px 10% 80px', backgroundImage: 'url(/legal_hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.85))' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '4px', color: 'var(--accent)', fontWeight: 800, marginBottom: '16px' }}>LEGAL</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05 }}>KEY <span style={{ color: 'var(--accent)' }}>LEGAL</span><br />SERVICES</h1>
        </div>
      </section>

      <section style={{ padding: '100px 10%', background: '#000' }}>
        <p style={{ fontSize: '0.65rem', letterSpacing: '4px', color: 'var(--accent)', fontWeight: 800, marginBottom: '12px' }}>{t('legal_areas_label')}</p>
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '60px' }}>{t('legal_areas_title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {services.map((s) => (
            <div key={s} style={{ background: 'var(--dark-card)', borderRadius: 'var(--radius-card)', padding: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '12px' }}>{t(`legal_${s}_title`)}</h3>
              <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.7 }}>{t(`legal_${s}_desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 10%', background: '#020202', textAlign: 'center' }}>
        <Link href={`/${locale}/contacts`} style={{ display: 'inline-block', background: 'var(--accent)', color: '#000', padding: '16px 40px', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '2px' }}>
          {t('legal_custom_cta')}
        </Link>
      </section>
    </>
  );
}
