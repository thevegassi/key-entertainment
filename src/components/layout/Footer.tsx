import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';

export default async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <footer style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '60px 10% 40px', color: '#888', fontSize: '0.75rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Key Entertainment" style={{ height: '32px', marginBottom: '16px' }} />
          <p style={{ lineHeight: 1.7 }}>ТОО «KEY ENTERTAINMENT»<br />БИН 231240023174</p>
        </div>
        <div>
          <p style={{ color: '#fff', fontWeight: 700, marginBottom: '16px', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            {t('nav_contacts')}
          </p>
          <p><a href="mailto:info@keyent.kz" style={{ color: '#888', textDecoration: 'none' }}>info@keyent.kz</a></p>
          <p style={{ marginTop: '6px' }}><a href="https://wa.me/77783520000" style={{ color: '#888', textDecoration: 'none' }} rel="noopener noreferrer">+7 778 352 00 00</a></p>
        </div>
        <div>
          <p style={{ color: '#fff', fontWeight: 700, marginBottom: '16px', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            {t('nav_brand_upper')}
          </p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { href: '/distribution', label: 'Distribution' },
              { href: '/legal', label: 'Legal' },
              { href: '/label', label: 'Label' },
              { href: '/pr', label: 'PR & Marketing' },
              { href: '/booking', label: 'Booking' },
            ].map(({ href, label }) => (
              <Link key={href} href={`/${locale}${href}`} style={{ color: '#888', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <span>© {new Date().getFullYear()} Key Entertainment. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href={`/${locale}/privacy`} style={{ color: '#888', textDecoration: 'none' }}>Privacy</Link>
          <Link href={`/${locale}/offer`} style={{ color: '#888', textDecoration: 'none' }}>Оферта</Link>
        </div>
      </div>
    </footer>
  );
}
