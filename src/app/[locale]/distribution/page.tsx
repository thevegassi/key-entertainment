import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import DistributionInquiryForm from '@/components/DistributionInquiryForm';
import ServiceCard from '@/components/ServiceCard';
import SectionDivider from '@/components/SectionDivider';
import Icon from '@/components/icons/Icon';
import { pageMetadata } from '@/lib/seo/metadata';
import PageJsonLd from '@/components/seo/JsonLd';

export const generateMetadata = pageMetadata('distribution');

const ytChannels = [
  { name: 'Qanay', handle: '@qanay.913', url: 'https://www.youtube.com/@qanay.913' },
  { name: 'Beibit Kushkaliyev', handle: '@beibitkushkaliev', url: 'https://www.youtube.com/@beibitkushkaliev' },
  { name: 'Anara Batyrkhan', handle: '@AnaraBatyrkhan', url: 'https://www.youtube.com/@AnaraBatyrkhan' },
  { name: 'Aigerim Altynbek', handle: '@aigerim_altynbek', url: 'https://www.youtube.com/@aigerim_altynbek' },
  { name: 'The Kitchen Songs', handle: '@thekitchensongs', url: 'https://www.youtube.com/@thekitchensongs' },
  { name: 'KOBA', handle: '@kobylandy_bolat', url: 'https://youtube.com/@kobylandy_bolat' },
  { name: 'Jordan Arakelyan', handle: '@JordanArakelyan', url: 'https://www.youtube.com/@JordanArakelyan' },
  { name: 'R-ONE', handle: '@ronemusic1', url: 'https://www.youtube.com/@ronemusic1' },
  { name: 'Azamat Torekhan', handle: '@Torekhan_azamat', url: 'https://www.youtube.com/@Torekhan_azamat' },
  { name: 'MATIN', handle: '@MATINMUZ', url: 'https://www.youtube.com/@MATINMUZ' },
];

const ttProfiles = [
  { name: 'Kalifarniya', handle: '@kalifarniyaga', url: 'https://www.tiktok.com/@kalifarniyaga' },
  { name: 'Ренат Гайсин', handle: '@gaissin', url: 'https://www.tiktok.com/@gaissin' },
  { name: 'Qanay', handle: '@qanay.913', url: 'https://www.tiktok.com/@qanay.913' },
  { name: 'Diana Ismail', handle: '@diana_ismail__', url: 'https://www.tiktok.com/@diana_ismail__' },
  { name: 'ESKO', handle: '@q1eskoo', url: 'https://www.tiktok.com/@q1eskoo' },
  { name: 'DAKELOT', handle: '@dakelot1', url: 'https://www.tiktok.com/@dakelot1' },
];

export default async function DistributionPage() {
  const t = await getTranslations();
  const locale = await getLocale();

  const platformListStyle: React.CSSProperties = {
    listStyle: 'decimal',
    paddingLeft: '20px',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    color: 'var(--gray)',
    fontSize: '0.92rem',
    lineHeight: 1.7,
  };

  const PlatformDetails = ({
    whatHtml,
    resultLabel,
    resultNode,
  }: {
    whatHtml: string;
    resultLabel: string;
    resultNode: React.ReactNode;
  }) => (
    <div
      style={{
        marginTop: '36px',
        padding: '32px',
        background: 'var(--off-white)',
        borderRadius: 'var(--radius-card)',
      }}
    >
      <p style={{ fontSize: '0.68rem', fontWeight: 900, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--navy-deep)', margin: '0 0 20px' }}>
        {t('platform_what_title')}
      </p>
      <ol style={platformListStyle} dangerouslySetInnerHTML={{ __html: whatHtml }} />
      <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: '24px', marginTop: '28px' }}>
        <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 900, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--navy-deep)', marginBottom: '12px' }}>
          {resultLabel}
        </span>
        {resultNode}
      </div>
    </div>
  );

  const ArtistStrip = ({
    items,
    visitLabel,
    icon,
  }: {
    items: { name: string; handle: string; url: string }[];
    visitLabel: string;
    icon: string;
  }) => (
    <div style={{ marginTop: '48px' }}>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: '8px',
        }}
      >
        {items.map((a) => (
          <a
            key={a.handle}
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="artist-card"
            aria-label={`${a.name} — ${visitLabel.replace(/\s*→\s*$/, '')}`}
            style={{
              flex: '0 0 200px',
              scrollSnapAlign: 'start',
              background: 'var(--off-white)',
              borderRadius: 'var(--radius-card)',
              padding: '20px',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontWeight: 800, color: 'var(--navy-deep)', fontSize: '0.95rem' }}>{a.name}</span>
            <span style={{ color: 'var(--gray)', fontSize: '0.78rem' }}>{a.handle}</span>
            <span className="artist-card-icon" aria-hidden="true">
              <Icon name={icon} size={22} />
            </span>
          </a>
        ))}
        <Link
          href={`/${locale}/contacts`}
          style={{
            flex: '0 0 200px',
            scrollSnapAlign: 'start',
            background: 'var(--periwinkle)',
            borderRadius: 'var(--radius-card)',
            padding: '20px',
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <span style={{ fontWeight: 800, color: 'var(--indigo-ink)', fontSize: '0.95rem' }}>{t('channel_and_others')}</span>
          <span style={{ color: 'var(--indigo-ink)', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
            {t('channel_contact_us')}
          </span>
        </Link>
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.65rem', letterSpacing: '2px', color: 'var(--gray)', marginTop: '16px', textTransform: 'uppercase' }}>
        {t('carousel_hint')}
      </p>
    </div>
  );

  return (
    <>
      <PageJsonLd path="distribution" />
      {/* Hero */}
      <section
        className="on-dark"
        style={{
          minHeight: '70dvh',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '160px 10% 80px',
          background: 'var(--oxford)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark-lime.svg" alt="" style={{ position: 'absolute', left: '-12%', top: '50%', transform: 'translateY(-50%)', width: '820px', maxWidth: 'none', opacity: 0.2, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="slide-num">01 / DISTRIBUTION</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05, color: '#fff' }}>
            KEY <span style={{ color: 'var(--accent)' }}>DISTRIBUTION</span><br />SERVICES
          </h1>
          <p style={{ letterSpacing: '10px', textTransform: 'uppercase', marginTop: '28px', opacity: 0.8, fontSize: '0.75rem', color: '#fff' }}>MUSIC • STRATEGY • GROWTH</p>
        </div>
      </section>
      <SectionDivider from="var(--oxford)" to="#fff" />

      {/* S1 — Full Cycle */}
      <section style={{ padding: 'var(--space-16) 10%', background: '#fff' }}>
        <SectionHeading eyebrow={t('dist_s1_label')} on="light">{t('dist_s1_title')}</SectionHeading>
        <p style={{ color: 'var(--gray)', maxWidth: '720px', lineHeight: 1.8, marginBottom: '60px', fontSize: '1.05rem' }}>
          {t('dist_s1_sub')}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {[
            { n: '1', icon: 'TablerIconPlaylist' },
            { n: '2', icon: 'TablerIconPlayerTrackNext' },
            { n: '3', icon: 'TablerIconAddressBook' },
            { n: '4', icon: 'TablerIconFlame' },
          ].map(({ n, icon }) => (
            <ServiceCard key={n} icon={icon} label={t(`dist_card${n}_title`)}>
              {t(`dist_card${n}_desc`)}
            </ServiceCard>
          ))}
        </div>
      </section>
      <SectionDivider from="#fff" to="var(--periwinkle)" flip />

      {/* Who we work with */}
      <section style={{ padding: 'var(--space-16) 10%', background: 'var(--periwinkle)' }}>
        <SectionHeading eyebrow={t('dist_partner_label')} on="periwinkle">{t('dist_partner_title')}</SectionHeading>
        <p style={{ color: 'var(--indigo-ink)', marginBottom: '48px', maxWidth: '600px', lineHeight: 1.7 }}>
          {t('dist_partner_sub')}
        </p>
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '600px' }}>
          <div style={{ borderLeft: '2px solid var(--oxford)', paddingLeft: '18px' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '8px' }}>{t('dist_artists_title')}</h3>
            <p style={{ color: 'var(--indigo-ink)', fontSize: '0.9rem', lineHeight: 1.6 }}>{t('dist_artists_desc')}</p>
          </div>
          <div style={{ borderLeft: '2px solid var(--oxford)', paddingLeft: '18px' }}>
            <h3 style={{ fontWeight: 800, marginBottom: '8px' }}>{t('dist_companies_title')}</h3>
            <p style={{ color: 'var(--indigo-ink)', fontSize: '0.9rem', lineHeight: 1.6 }}>{t('dist_companies_desc')}</p>
          </div>
        </div>
      </section>
      <SectionDivider from="var(--periwinkle)" to="#fff" />

      {/* YouTube Management */}
      <section style={{ padding: 'var(--space-16) 10%', background: '#fff' }}>
        <SectionHeading eyebrow={t('dist_yt_label')} on="light">{t('dist_yt_title')}</SectionHeading>
        <p style={{ color: 'var(--gray)', maxWidth: '680px', lineHeight: 1.7, fontSize: '1.05rem' }}>
          {t('dist_yt_sub')}
        </p>

        <PlatformDetails
          whatHtml={t('dist_yt_list')}
          resultLabel={t('platform_result_label')}
          resultNode={<p style={{ color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>{t('dist_yt_result')}</p>}
        />

        <ArtistStrip items={ytChannels} visitLabel={t('yt_visit_channel')} icon="TablerIconBrandYoutube" />
      </section>
      <SectionDivider from="#fff" to="var(--periwinkle)" flip />

      {/* TikTok for Artists */}
      <section style={{ padding: 'var(--space-16) 10%', background: 'var(--periwinkle)' }}>
        <SectionHeading eyebrow={t('dist_tt_label')} on="periwinkle">{t('dist_tt_title')}</SectionHeading>
        <p style={{ color: 'var(--indigo-ink)', maxWidth: '680px', lineHeight: 1.7, fontSize: '1.05rem' }}>
          {t('dist_tt_sub')}
        </p>

        <PlatformDetails
          whatHtml={t('dist_tt_list')}
          resultLabel={t('platform_result_label')}
          resultNode={<ol style={platformListStyle} dangerouslySetInnerHTML={{ __html: t('dist_tt_result') }} />}
        />

        <ArtistStrip items={ttProfiles} visitLabel={t('tt_visit_profile')} icon="TablerIconBrandTiktok" />
      </section>
      <SectionDivider from="var(--periwinkle)" to="var(--oxford)" />

      {/* CTA Form */}
      <section className="on-dark" style={{ padding: 'var(--space-16) 10%', background: 'var(--oxford)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/pattern-4-navy.svg)', backgroundSize: '420px', opacity: 0.3, mixBlendMode: 'overlay', pointerEvents: 'none' }}
        />
        <div style={{ position: 'relative' }}>
        <SectionHeading eyebrow={t('contacts_label')} on="dark" center>{t('contacts_form_title')}</SectionHeading>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '40px', maxWidth: '560px', margin: '0 auto 40px' }}>
          {t('dist_form_intro')}
        </p>
        <DistributionInquiryForm />
        </div>
      </section>
    </>
  );
}
