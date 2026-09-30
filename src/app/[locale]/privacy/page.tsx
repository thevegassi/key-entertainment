import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t('page_title_privacy'), alternates: { canonical: `https://www.keyent.kz/${locale}/privacy` } };
}

export default async function PrivacyPage() {
  const t = await getTranslations();
  return (
    <section style={{ padding: '160px 10% 100px', background: '#000', maxWidth: '860px' }}>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '48px' }}>{t('privacy_title')}</h1>
      <p style={{ color: '#888', lineHeight: 1.8 }}>ТОО «KEY ENTERTAINMENT» (БИН 231240023174)</p>
    </section>
  );
}
