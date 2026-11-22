import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t('page_title_offer'), alternates: { canonical: `https://www.keyent.kz/${locale}/offer` } };
}

export default async function OfferPage() {
  const t = await getTranslations();
  return (
    <>
      <section style={{ padding: '160px 10% 60px', background: 'var(--oxford)' }}>
        <h1
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#fff', maxWidth: '860px' }}
          dangerouslySetInnerHTML={{ __html: t('offer_title') }}
        />
      </section>
      <section style={{ padding: '60px 10% 100px', background: '#fff', maxWidth: '860px' }}>
        <p style={{ color: 'var(--gray)', lineHeight: 1.8 }}>ТОО «KEY ENTERTAINMENT» (БИН 231240023174)</p>
      </section>
    </>
  );
}
