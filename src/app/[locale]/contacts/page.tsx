import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t('page_title_contacts'), description: t('page_desc_contacts'), alternates: { canonical: `https://www.keyent.kz/${locale}/contacts` } };
}

export default async function ContactsPage() {
  const t = await getTranslations();
  return (
    <>
      <section style={{ padding: '160px 10% 80px', background: '#000' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, marginBottom: '60px' }}>
          {t('contacts_title')}
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '32px', color: '#888', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {t('contacts_general_title')}
            </h2>
            <p style={{ marginBottom: '16px' }}>
              <a href="mailto:info@keyent.kz" style={{ color: 'var(--accent)', textDecoration: 'none' }}>info@keyent.kz</a>
            </p>
            <p style={{ marginBottom: '16px' }}>
              <a href="https://wa.me/77783520000" style={{ color: '#fff', textDecoration: 'none' }} rel="noopener noreferrer">+7 778 352 00 00</a>
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
              {[
                { href: 'https://instagram.com/keyentertainment.kz', label: 'Instagram' },
                { href: 'https://t.me/keymusickz', label: 'Telegram' },
                { href: 'https://youtube.com/@keyentkz', label: 'YouTube' },
              ].map(({ href, label }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#888', textDecoration: 'none', fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: '2px' }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
