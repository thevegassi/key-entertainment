import { getTranslations } from 'next-intl/server';
import SectionDivider from '@/components/SectionDivider';
import { pageMetadata } from '@/lib/seo/metadata';
import PageJsonLd from '@/components/seo/JsonLd';

export const generateMetadata = pageMetadata('offer');

export default async function OfferPage() {
  const t = await getTranslations();
  return (
    <>
      <PageJsonLd path="offer" />
      <section className="on-dark" style={{ padding: '160px 10% 60px', background: 'var(--oxford)' }}>
        <p className="slide-num">LEGAL DOCUMENT</p>
        <h1
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', maxWidth: '860px' }}
          dangerouslySetInnerHTML={{ __html: t('offer_title') }}
        />
      </section>
      <SectionDivider from="var(--oxford)" to="#fff" />

      <div className="legal-doc">
        <p className="doc-meta">{t('offer_meta')}</p>

        <div className="highlight">
          <p>{t('offer_highlight')}</p>
        </div>

        <h2>{t('offer_h1')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('offer_p_executor') }} />
        <p dangerouslySetInnerHTML={{ __html: t('offer_p_client') }} />
        <p dangerouslySetInnerHTML={{ __html: t('offer_p_services') }} />
        <p dangerouslySetInnerHTML={{ __html: t('offer_p_accept') }} />
        <p dangerouslySetInnerHTML={{ __html: t('offer_p_site') }} />

        <h2>{t('offer_h2')}</h2>
        <p>{t('offer_p_scope_intro')}</p>
        <ul dangerouslySetInnerHTML={{ __html: t('offer_list_services') }} />
        <p>{t('offer_p_scope')}</p>

        <h2>{t('offer_h3')}</h2>
        <ol dangerouslySetInnerHTML={{ __html: t('offer_procedure_list') }} />

        <h2>{t('offer_h4')}</h2>
        <p>{t('offer_p_price')}</p>
        <ul dangerouslySetInnerHTML={{ __html: t('offer_list_payment') }} />
        <p dangerouslySetInnerHTML={{ __html: t('offer_p_prepay') }} />

        <h2>{t('offer_h5')}</h2>
        <div dangerouslySetInnerHTML={{ __html: t('offer_executor_duties') }} />

        <h2>{t('offer_h6')}</h2>
        <div dangerouslySetInnerHTML={{ __html: t('offer_client_duties') }} />

        <h2>{t('offer_h7')}</h2>
        <p>{t('offer_p_liability')}</p>
        <div dangerouslySetInnerHTML={{ __html: t('offer_liability_extra') }} />

        <h2>{t('offer_h8')}</h2>
        <p>{t('offer_p_force')}</p>

        <h2>{t('offer_h9')}</h2>
        <p>{t('offer_p_conf')}</p>

        <h2>{t('offer_h10')}</h2>
        <p>{t('offer_p_ip')}</p>

        <h2>{t('offer_h11')}</h2>
        <p dangerouslySetInnerHTML={{ __html: t('offer_p_disputes') }} />
        <p dangerouslySetInnerHTML={{ __html: t('offer_applicable_law') }} />

        <h2>{t('offer_h12')}</h2>
        <p>{t('offer_p_validity')}</p>

        <h2>{t('offer_h13')}</h2>
        <table>
          <tbody dangerouslySetInnerHTML={{ __html: t('offer_requisites') }} />
        </table>
      </div>
    </>
  );
}
