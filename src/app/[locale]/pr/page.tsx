import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/SectionHeading';
import PrInquiryForm from '@/components/PrInquiryForm';
import ServiceCard from '@/components/ServiceCard';
import SectionDivider from '@/components/SectionDivider';

const SERVICE_ICONS: Record<string, string> = {
  s1: 'TablerIconNews',
  s2: 'TablerIconMailForward',
  s3: 'TablerIconFlame',
  s4: 'TablerIconUsers',
  s5: 'TablerIconPlayerTrackNext',
  s6: 'TablerIconUser',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t('page_title_pr'), description: t('page_desc_pr'), alternates: { canonical: `https://www.keyent.kz/${locale}/pr` } };
}

const CASES = [
  { name: 'DODO PIZZA', key: 'pr_case1' as const },
  { name: 'COCA-COLA', key: 'pr_case2' as const },
  { name: 'BURGER KING', key: 'pr_case3' as const },
  { name: 'XIAOMI', key: 'pr_case4' as const },
  { name: 'STAR OF ASIA', key: 'pr_case5' as const },
  { name: 'PARTY AYUL', key: 'pr_case6' as const },
  { name: 'ZERDELI SCHOOL', key: 'pr_case7' as const },
  { name: 'KALIFARNIYA', key: null },
  { name: 'QANAY', key: null },
  { name: "ALMA'LE", key: null },
  { name: 'ALMATY FILM FESTIVAL', key: 'pr_case8' as const },
];

export default async function PrPage() {
  const t = await getTranslations();
  return (
    <>
      <section style={{ minHeight: '70dvh', display: 'flex', alignItems: 'flex-end', padding: '160px 10% 80px', background: 'var(--oxford)', position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark-lime.svg" alt="" style={{ position: 'absolute', left: '-12%', top: '50%', transform: 'translateY(-50%)', width: '820px', maxWidth: 'none', opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="slide-num">04 / STRATEGY</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05, color: '#fff' }}>KEY <span style={{ color: 'var(--accent)' }}>PR</span> &<br />MARKETING</h1>
          <p style={{ letterSpacing: '10px', textTransform: 'uppercase', marginTop: '28px', opacity: 0.8, fontSize: '0.75rem', color: '#fff' }}>IMAGE • REPUTATION • GROWTH</p>
        </div>
      </section>
      <SectionDivider from="var(--oxford)" to="#fff" />

      {/* Mission */}
      <section style={{ padding: 'var(--space-16) 10%', background: '#fff' }}>
        <SectionHeading eyebrow={t('pr_mission_label')} on="light">{t('pr_mission_title')}</SectionHeading>
        <p style={{ color: 'var(--gray)', fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.8, maxWidth: '760px' }}>{t('pr_mission_text')}</p>
      </section>
      <SectionDivider from="#fff" to="var(--periwinkle)" flip />

      {/* Services */}
      <section style={{ padding: 'var(--space-16) 10%', background: 'var(--periwinkle)' }}>
        <SectionHeading eyebrow={t('pr_services_label')} on="periwinkle">{t('pr_services_title')}</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {['s1','s2','s3','s4','s5','s6'].map((s) => (
            <ServiceCard key={s} icon={SERVICE_ICONS[s]} label={t(`pr_${s}_title`)} on="periwinkle">
              {t(`pr_${s}_desc`)}
            </ServiceCard>
          ))}
        </div>
      </section>
      <SectionDivider from="var(--periwinkle)" to="#fff" />

      {/* Cases / brands */}
      <section style={{ padding: 'var(--space-16) 10%', background: '#fff' }}>
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <SectionHeading eyebrow={t('pr_cases_label')} on="light" center>{t('pr_cases_title')}</SectionHeading>
          <p style={{ color: 'var(--gray)', maxWidth: '680px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.6 }}>{t('pr_cases_sub')}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {CASES.map((c, i) => {
            const inverted = i % 4 === 0;
            return (
            <div
              key={c.name}
              style={{
                background: inverted ? 'var(--oxford)' : 'var(--off-white)',
                borderRadius: 'var(--radius-card)',
                textAlign: 'center',
                padding: '36px 24px',
              }}
            >
              <h4 style={{ fontSize: '0.78rem', letterSpacing: '1px', fontWeight: 800, color: inverted ? 'var(--accent)' : 'var(--navy-deep)', marginBottom: '10px' }}>{c.name}</h4>
              {c.key ? (
                <p style={{ fontSize: '0.82rem', color: inverted ? 'rgba(255,255,255,0.7)' : 'var(--gray)', lineHeight: 1.5 }}>{t(c.key)}</p>
              ) : (
                <p style={{ fontSize: '0.82rem', color: inverted ? 'rgba(255,255,255,0.7)' : 'var(--gray)', lineHeight: 1.5 }}>Branding.</p>
              )}
            </div>
            );
          })}
          <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '36px 24px' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--gray)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700 }}>{t('pr_and_more')}</p>
          </div>
        </div>
      </section>
      <SectionDivider from="#fff" to="var(--oxford)" flip />

      {/* CTA — inquiry form */}
      <section style={{ padding: 'var(--space-16) 10%', background: 'var(--oxford)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/pattern-4-navy.svg)', backgroundSize: '420px', opacity: 0.3, mixBlendMode: 'overlay', pointerEvents: 'none' }}
        />
        <div style={{ position: 'relative' }}>
        <SectionHeading eyebrow={t('pr_form_label')} on="dark" center>{t('pr_form_title')}</SectionHeading>
        <PrInquiryForm />
        </div>
      </section>
    </>
  );
}
