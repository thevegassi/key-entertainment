import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/SectionHeading';
import SectionDivider from '@/components/SectionDivider';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t('page_title_brand'), description: t('page_desc_brand'), alternates: { canonical: `https://www.keyent.kz/${locale}/brand` } };
}

const COLORS = [
  { name: 'Accent — Lime', hex: '#D3FF33', meta: '#D3FF33 · RGB 211 255 51 · CMYK 17 0 80 0', dark: true },
  { name: 'Brand — Purple', hex: '#9F96FF', meta: '#9F96FF · RGB 159 150 255 · CMYK 38 41 0 0', dark: true },
  { name: 'Brand — Navy', hex: '#0C2350', meta: '#0C2350 · RGB 12 35 80 · CMYK 100 33 0 80', dark: false },
  { name: 'White', hex: '#FFFFFF', meta: '#FFFFFF', dark: true },
  { name: 'Black', hex: '#000000', meta: '#000000', dark: false },
];

// Approved logo/ground combinations per the brandbook's own contrast correction:
// black on lime, white on oxford blue, oxford blue on tropical indigo.
const LOGO_VARIANTS = [
  { name: 'Oxford Blue', bg: '#0C2350', logo: '/logo-white.svg', key: 'brand_bg_navy' as const },
  { name: 'Tropical Indigo', bg: '#9F96FF', logo: '/logo-navy.svg', key: 'brand_bg_purple' as const },
  { name: 'Lime', bg: '#D3FF33', logo: '/logo-black.svg', key: 'brand_bg_lime' as const },
  { name: 'White', bg: '#FFFFFF', logo: '/logo-navy.svg', key: 'brand_bg_white' as const, hairline: true },
  { name: 'Black', bg: '#000000', logo: '/logo-white.svg', key: 'brand_bg_dark' as const },
];

export default async function BrandPage() {
  const t = await getTranslations();
  return (
    <>
      <section className="on-dark" style={{ minHeight: '70dvh', display: 'flex', alignItems: 'flex-end', padding: '160px 10% 80px', background: 'var(--oxford)', position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark-lime.svg" alt="" style={{ position: 'absolute', left: '-12%', top: '50%', transform: 'translateY(-50%)', width: '820px', maxWidth: 'none', opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="slide-num">{t('brand_hero_label')}</p>
          <h1
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05, color: '#fff' }}
            dangerouslySetInnerHTML={{ __html: t('brand_hero_title') }}
          />
        </div>
      </section>
      <SectionDivider from="var(--oxford)" to="#fff" />

      {/* Intro */}
      <section style={{ padding: 'var(--space-16) 10%', background: '#fff' }}>
        <p style={{ color: 'var(--gray)', maxWidth: '720px', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>{t('brand_intro1')}</p>
        <p style={{ color: 'var(--gray)', maxWidth: '720px', lineHeight: 1.8 }}>{t('brand_intro2')}</p>
      </section>
      <SectionDivider from="#fff" to="var(--periwinkle)" flip />

      {/* 01 / COLORS */}
      <section style={{ padding: 'var(--space-16) 10%', background: 'var(--periwinkle)' }}>
        <SectionHeading eyebrow={t('brand_colors_label')} on="periwinkle">{t('brand_colors_title')}</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2px', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
          {COLORS.map((c) => (
            <div
              key={c.hex}
              style={{
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 'var(--space-6)',
                background: c.hex,
              }}
            >
              <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase', color: c.dark ? '#000' : '#fff' }}>{c.name}</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 300, marginTop: '4px', color: c.dark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.65)' }}>{c.meta}</span>
            </div>
          ))}
        </div>
      </section>
      <SectionDivider from="var(--periwinkle)" to="#fff" />

      {/* 02 / LOGOS */}
      <section style={{ padding: 'var(--space-16) 10%', background: '#fff' }}>
        <SectionHeading eyebrow={t('brand_logos_label')} on="light">{t('brand_logos_title')}</SectionHeading>
        <p style={{ color: 'var(--gray)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '600px', marginBottom: 'var(--space-10)', marginLeft: 'calc(14px + var(--space-7))' }}>{t('brand_colors_sub')}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-6)' }}>
          {LOGO_VARIANTS.map((v) => (
            <div key={v.name} style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '140px',
                  background: v.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: v.hairline ? '1px solid var(--hairline)' : 'none',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.logo} alt={`Key Entertainment — ${v.name}`} style={{ height: '34px', width: 'auto' }} />
              </div>
              <div style={{ padding: 'var(--space-6)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px', color: 'var(--navy-deep)' }}>{v.name}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{t(v.key)}</span>
                <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.58rem', letterSpacing: '1px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--navy-deep)', background: '#fff', borderRadius: 'var(--radius-pill)', padding: '4px 10px' }}>{t('brand_full_size')}</span>
                  <span style={{ fontSize: '0.58rem', letterSpacing: '1px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--navy-deep)', background: '#fff', borderRadius: 'var(--radius-pill)', padding: '4px 10px' }}>{t('brand_minimal')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <SectionDivider from="#fff" to="var(--periwinkle)" flip />

      {/* 05 / DOWNLOAD */}
      <section style={{ padding: 'var(--space-16) 10%', background: 'var(--periwinkle)' }}>
        <SectionHeading eyebrow={t('brand_download_label')} on="periwinkle">{t('brand_download_title')}</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-6)' }}>
          <a href="/key_logo_pack.zip" download style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px', background: 'var(--accent)', borderRadius: 'var(--radius-card)', padding: 'var(--space-9)', textDecoration: 'none', color: 'var(--accent-ink)' }}>
            <div>
              <h3 style={{ fontWeight: 900, fontSize: '1.3rem', textTransform: 'uppercase', marginBottom: 'var(--space-4)' }}>{t('brand_logo_pack_title')}</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, opacity: 0.85 }}>{t('brand_zip_desc')}</p>
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '3px', textTransform: 'uppercase', marginTop: 'var(--space-6)' }}>{t('brand_logo_pack')} →</span>
          </a>
          <a href="/key_brand_guideline.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px', background: '#fff', borderRadius: 'var(--radius-card)', padding: 'var(--space-9)', textDecoration: 'none', color: 'var(--ink)' }}>
            <div>
              <h3 style={{ fontWeight: 900, fontSize: '1.3rem', textTransform: 'uppercase', marginBottom: 'var(--space-4)', color: 'var(--navy-deep)' }}>{t('brand_guidelines_title')}</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--gray)' }}>{t('brand_pdf_desc')}</p>
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 900, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--navy-deep)', marginTop: 'var(--space-6)' }}>{t('brand_guidelines')} →</span>
          </a>
        </div>
      </section>
    </>
  );
}
