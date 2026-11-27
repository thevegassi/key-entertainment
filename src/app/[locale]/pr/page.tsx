import { getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/SectionHeading';
import PrInquiryForm from '@/components/PrInquiryForm';
import ServiceCard from '@/components/ServiceCard';
import SectionDivider from '@/components/SectionDivider';
import { pageMetadata } from '@/lib/seo/metadata';
import PageJsonLd from '@/components/seo/JsonLd';

const SERVICE_ICONS: Record<string, string> = {
  s1: 'TablerIconNews',
  s2: 'TablerIconMailForward',
  s3: 'TablerIconFlame',
  s4: 'TablerIconUsers',
  s5: 'TablerIconPlayerTrackNext',
  s6: 'TablerIconUser',
};

export const generateMetadata = pageMetadata('pr');

const CASES = [
  { name: 'DODO PIZZA', logo: 'l01', key: 'pr_case1' as const },
  { name: 'COCA-COLA', logo: 'l05', key: 'pr_case2' as const },
  { name: 'BURGER KING', logo: 'l06', key: 'pr_case3' as const },
  { name: 'XIAOMI', logo: 'l07', key: 'pr_case4' as const },
  { name: 'STAR OF ASIA', logo: 'l10', key: 'pr_case5' as const },
  { name: 'PARTY AYUL', logo: 'l09', key: 'pr_case6' as const },
  { name: 'ZERDELI SCHOOL', logo: 'l08', key: 'pr_case7' as const },
  { name: 'KALIFARNIYA', logo: 'l02', key: null },
  { name: 'QANAY', logo: 'l03', key: null },
  { name: "ALMA'LE", logo: 'l04', key: null },
  { name: 'ALMATY FILM FESTIVAL', logo: 'l11', key: 'pr_case8' as const },
];

export default async function PrPage() {
  const t = await getTranslations();
  return (
    <>
      <PageJsonLd path="pr" />
      <section className="on-dark" style={{ minHeight: '70dvh', display: 'flex', alignItems: 'flex-end', padding: '160px 10% 80px', background: 'var(--oxford)', position: 'relative', overflow: 'hidden' }}>
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
      <section className="on-dark deck-navy-section" style={{ padding: 'var(--space-16) 6%' }}>
        <SectionHeading eyebrow={t('pr_services_label')} on="dark">{t('pr_services_title')}</SectionHeading>
        <div className="deck-grid-3">
          {['s1','s2','s3','s4','s5','s6'].map((s) => (
            <ServiceCard key={s} icon={SERVICE_ICONS[s]} label={t(`pr_${s}_title`)} on="navy">
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
        <div className="deck-logo-grid">
          {CASES.map((c) => (
            <div key={c.name} className="deck-card deck-logo-card">
              <div className="deck-logo-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/deck/img/logo-${c.logo}.webp`} alt={c.name} loading="lazy" style={c.logo === 'l01' ? { mixBlendMode: 'darken' } : undefined} />
              </div>
              <h3 translate="no">{c.name}</h3>
              <p>{c.key ? t(c.key) : 'Branding.'}</p>
            </div>
          ))}
          <div className="deck-card deck-logo-card deck-logo-more">
            <p>{t('pr_and_more')}</p>
          </div>
        </div>
      </section>
      <SectionDivider from="#fff" to="var(--oxford)" flip />

      {/* CTA — inquiry form */}
      <section className="on-dark" style={{ padding: 'var(--space-16) 10%', background: 'var(--oxford)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
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
