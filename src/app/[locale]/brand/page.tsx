import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t('page_title_brand'), description: t('page_desc_brand'), alternates: { canonical: `https://www.keyent.kz/${locale}/brand` } };
}

export default async function BrandPage() {
  const t = await getTranslations();
  return (
    <>
      <section style={{ minHeight: '70dvh', display: 'flex', alignItems: 'flex-end', padding: '160px 10% 80px', background: '#000', position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '4px', color: 'var(--accent)', fontWeight: 800, marginBottom: '16px' }}>BRAND IDENTITY</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05 }}>KEY<br /><span style={{ color: 'var(--accent)' }}>BRANDBOOK</span></h1>
        </div>
      </section>

      <section style={{ padding: '100px 10%', background: '#020202' }}>
        <p style={{ color: '#888', maxWidth: '720px', lineHeight: 1.8, marginBottom: '16px' }}>{t('brand_intro1')}</p>
        <p style={{ color: '#888', maxWidth: '720px', lineHeight: 1.8, marginBottom: '60px' }}>{t('brand_intro2')}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <a href="/key_brand_guideline.pdf" download style={{ display: 'block', background: 'var(--dark-card)', border: '1px solid rgba(211,255,51,0.15)', borderRadius: 'var(--radius-card)', padding: '32px', textDecoration: 'none', color: '#fff' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '12px', color: 'var(--accent)' }}>{t('brand_guidelines_title')}</h3>
            <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.6 }}>{t('brand_pdf_desc')}</p>
          </a>
          <a href="/key_logo_pack.zip" download style={{ display: 'block', background: 'var(--dark-card)', border: '1px solid rgba(211,255,51,0.15)', borderRadius: 'var(--radius-card)', padding: '32px', textDecoration: 'none', color: '#fff' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '12px', color: 'var(--accent)' }}>{t('brand_logo_pack_title')}</h3>
            <p style={{ color: '#888', fontSize: '0.85rem', lineHeight: 1.6 }}>{t('brand_zip_desc')}</p>
          </a>
        </div>
      </section>
    </>
  );
}
