import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SectionDivider from '@/components/SectionDivider';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t('page_title_privacy'), alternates: { canonical: `https://www.keyent.kz/${locale}/privacy` } };
}

export default async function PrivacyPage() {
  const t = await getTranslations();
  return (
    <>
      <section className="on-dark" style={{ padding: '160px 10% 60px', background: 'var(--oxford)' }}>
        <p className="slide-num">LEGAL DOCUMENT</p>
        <h1
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', maxWidth: '860px' }}
          dangerouslySetInnerHTML={{ __html: t('privacy_title') }}
        />
      </section>
      <SectionDivider from="var(--oxford)" to="#fff" />

      <div className="legal-doc">
        <p className="doc-meta">{t('privacy_meta')}</p>

        <h2>{t('privacy_h1')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('privacy_p1') }} />
        <p dangerouslySetInnerHTML={{ __html: t('privacy_p2') }} />
        <p>{t('privacy_p3')}</p>

        <div className="highlight">
          <p>{t('privacy_highlight')}</p>
        </div>

        <h2>{t('privacy_h2')}</h2>
        <p>{t('privacy_p_collect')}</p>
        <ul dangerouslySetInnerHTML={{ __html: t('privacy_list2') }} />

        <h2>{t('privacy_h3')}</h2>
        <p>{t('privacy_p4')}</p>
        <ul dangerouslySetInnerHTML={{ __html: t('privacy_list3') }} />

        <h2>{t('privacy_h4')}</h2>
        <p>{t('privacy_p_basis')}</p>
        <ul dangerouslySetInnerHTML={{ __html: t('privacy_list4') }} />

        <h2>{t('privacy_h5')}</h2>
        <p>{t('privacy_p5')}</p>

        <h2>{t('privacy_h6')}</h2>
        <p>{t('privacy_p6')}</p>
        <ul dangerouslySetInnerHTML={{ __html: t('privacy_list6') }} />

        <h2>{t('privacy_h7')}</h2>
        <p>{t('privacy_p7')}</p>
        <ul dangerouslySetInnerHTML={{ __html: t('privacy_list7') }} />

        <h2>{t('privacy_h8')}</h2>
        <p>{t('privacy_p8')}</p>
        <ul dangerouslySetInnerHTML={{ __html: t('privacy_list8') }} />
        <p dangerouslySetInnerHTML={{ __html: t('privacy_p9') }} />

        <h2>{t('privacy_h9')}</h2>
        <p>{t('privacy_p10')}</p>

        <h2>{t('privacy_h10')}</h2>
        <p>{t('privacy_p11')}</p>

        <h2>{t('privacy_h11')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('privacy_contacts_block') }} />
        <p>
          Email: <a href="mailto:info@keyent.kz">info@keyent.kz</a><br />
          Telegram: <a href="https://t.me/keyentkz" target="_blank" rel="noopener noreferrer">@keyentkz</a>
        </p>
      </div>
    </>
  );
}
