import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';

const SOCIALS = [
  { href: 'https://wa.me/77010520606', label: 'WhatsApp' },
  { href: 'https://t.me/keyentkz', label: 'Telegram' },
  { href: 'https://vk.com/keyentertainment', label: 'VK' },
  { href: 'https://instagram.com/keyentertainment.kz', label: 'Instagram' },
  { href: 'https://www.youtube.com/@keyentkz', label: 'YouTube' },
  { href: 'https://music.yandex.kz/label/632686', label: 'Яндекс Музыка' },
];

export default async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <footer style={{ background: 'var(--oxford)', borderTop: 'none', padding: '60px 10% 40px', color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-white.svg" alt="Key Entertainment" style={{ height: '28px', marginBottom: '16px' }} />
          <p style={{ lineHeight: 1.7, marginBottom: '16px' }}>ТОО «KEY ENTERTAINMENT»<br />БИН 231240023174</p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {SOCIALS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.68rem', letterSpacing: '0.5px' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <p style={{ color: '#fff', fontWeight: 700, marginBottom: '16px', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            {t('nav_contacts_upper')}
          </p>
          <p><a href="mailto:info@keyent.kz" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>info@keyent.kz</a></p>
          <p style={{ marginTop: '6px' }}><a href="tel:+77783520000" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>+7 778 352 00 00</a></p>
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
              <Link key={href} href={`/${locale}${href}`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <span>© {new Date().getFullYear()} Key Entertainment. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href={`/${locale}/privacy`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Privacy</Link>
          <Link href={`/${locale}/offer`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Оферта</Link>
        </div>
      </div>
    </footer>
  );
}
