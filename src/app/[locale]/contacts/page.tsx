import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import SectionDivider from '@/components/SectionDivider';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { title: t('page_title_contacts'), description: t('page_desc_contacts'), alternates: { canonical: `https://www.keyent.kz/${locale}/contacts` } };
}

const DEPARTMENTS = [
  { label: null, labelKey: 'contacts_general_title' as const, subKey: 'contacts_general_sub' as const, email: 'info@keyent.kz' },
  { label: 'Label', subKey: 'contacts_label_sub' as const, email: 'music-label@keyent.kz' },
  { label: 'Distribution', subKey: 'contacts_dist_sub' as const, email: 'distribution@keyent.kz' },
  { label: 'Booking', subKey: 'contacts_book_sub' as const, email: 'booking@keyent.kz' },
  { label: 'Legal', subKey: 'contacts_legal_sub' as const, email: 'legal@keyent.kz' },
  { label: 'PR & Marketing', subKey: 'contacts_pr_sub' as const, email: 'pr@keyent.kz' },
];

const SOCIALS = [
  { href: 'https://wa.me/77010520606', label: 'WhatsApp' },
  { href: 'https://t.me/keyentkz', label: 'Telegram' },
  { href: 'https://vk.com/keyentertainment', label: 'VK' },
  { href: 'https://instagram.com/keyentertainment.kz', label: 'Instagram' },
  { href: 'https://www.youtube.com/@keyentkz', label: 'YouTube' },
  { href: 'https://music.yandex.kz/label/632686', label: 'Яндекс Музыка' },
];

export default async function ContactsPage() {
  const t = await getTranslations();
  return (
    <>
      {/* Hero */}
      <section className="on-dark" style={{ padding: '160px 10% 80px', background: 'var(--oxford)' }}>
        <p className="slide-num">{t('contacts_label')}</p>
        <h1
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.05, color: '#fff' }}
          dangerouslySetInnerHTML={{ __html: t('contacts_title') }}
        />
      </section>
      <SectionDivider from="var(--oxford)" to="#fff" />

      {/* Departments + socials + form */}
      <section style={{ padding: 'var(--space-16) 10%', background: '#fff' }}>
        <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'var(--space-14)', alignItems: 'start' }}>
          <div>
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8) var(--space-6)' }}>
              {DEPARTMENTS.map((d) => (
                <div key={d.email}>
                  <p style={{ color: 'var(--navy-deep)', letterSpacing: '2px', fontSize: '0.62rem', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 900 }}>
                    {d.labelKey ? t(d.labelKey) : d.label}
                  </p>
                  <p style={{ color: 'var(--gray)', fontSize: '0.72rem', fontWeight: 700, marginBottom: '6px', lineHeight: 1.5, letterSpacing: '0.3px' }}>
                    {t(d.subKey)}
                  </p>
                  <a href={`mailto:${d.email}`} style={{ color: 'var(--ink)', textDecoration: 'none', fontWeight: 300, fontSize: '0.92rem' }}>
                    {d.email}
                  </a>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 'var(--space-10)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--hairline)' }}>
              <p style={{ color: 'var(--navy-deep)', letterSpacing: '3px', fontSize: '0.65rem', textTransform: 'uppercase', marginBottom: 'var(--space-6)', fontWeight: 800 }}>
                {t('contacts_socials')}
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                {SOCIALS.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--gray)', textDecoration: 'none', fontSize: '0.8rem', border: '1px solid var(--hairline)', padding: '8px 16px', borderRadius: 'var(--radius-pill)' }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-card)', padding: 'clamp(28px, 4vw, 40px)' }}>
            <h4 style={{ marginBottom: 'var(--space-6)', fontWeight: 900, letterSpacing: '1px', color: 'var(--navy-deep)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              {t('contacts_form_title')}
            </h4>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
