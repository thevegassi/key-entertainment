import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import Icon from '@/components/icons/Icon';
import Reveal from '@/components/Reveal';

const SOCIALS = [
  { href: 'https://wa.me/77010520606', label: 'WhatsApp', icon: 'TablerIconPhoneCall' },
  { href: 'https://t.me/keyentkz', label: 'Telegram', icon: 'TablerIconBrandTelegram' },
  { href: 'https://vk.com/keyentertainment', label: 'VK', icon: 'TablerIconBrandVk' },
  { href: 'https://instagram.com/keyentertainment.kz', label: 'Instagram', icon: 'TablerIconBrandInstagram' },
  { href: 'https://www.youtube.com/@keyentkz', label: 'YouTube', icon: 'TablerIconBrandYoutube' },
  { href: 'https://music.yandex.kz/label/632686', label: 'Яндекс Музыка', icon: 'TablerIconMusic' },
];

const BRAND_LINKS = [
  { href: '/distribution', label: 'Distribution' },
  { href: '/label', label: 'Label' },
  { href: '/booking', label: 'Booking' },
  { href: '/pr', label: 'PR & Marketing' },
  { href: '/legal', label: 'Legal' },
];

export default async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <footer style={{ background: 'var(--oxford)', position: 'relative', overflow: 'hidden', padding: 'var(--space-12) 5% var(--space-10)', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/pattern-4-navy.svg)', backgroundSize: '420px', opacity: 0.3, mixBlendMode: 'overlay', pointerEvents: 'none' }}
      />
      <div style={{ position: 'relative' }}>
        <div className="footer-marquee" aria-hidden="true">
          <div className="footer-marquee-track">
            {[0, 1, 2, 3].map((n) => (
              <span key={n} className="footer-marquee-item" translate="no">KEY ENTERTAINMENT <i /></span>
            ))}
          </div>
        </div>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr 0.8fr', gap: 'var(--space-14)', marginBottom: 'var(--space-14)' }}>
          <Reveal delay={0}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.svg" alt="Key Entertainment" width={121} height={32} style={{ height: '32px', width: 'auto', marginBottom: 'var(--space-8)' }} />
            <p style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 300, lineHeight: 1.3, maxWidth: '360px', marginBottom: 'var(--space-8)' }}>
              {t('index_hero_sub')}
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {SOCIALS.map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.75)',
                    transition: 'background var(--dur-base, 180ms) var(--ease-standard, ease), color var(--dur-base, 180ms) var(--ease-standard, ease)',
                  }}
                  className="footer-social-icon"
                >
                  <Icon name={icon} size={16} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p style={{ color: 'var(--accent)', fontWeight: 800, marginBottom: 'var(--space-6)', fontSize: '0.68rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {t('nav_contacts_upper')}
            </p>
            <p style={{ marginBottom: '10px' }}><a href="mailto:info@keyent.kz" style={{ color: '#fff', textDecoration: 'none' }}>info@keyent.kz</a></p>
            <p><a href="tel:+77783520000" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>+7 778 352 00 00</a></p>
            <p style={{ marginTop: 'var(--space-8)', lineHeight: 1.7, fontSize: '0.72rem' }}>
              ТОО «KEY ENTERTAINMENT»<br />БИН 231240023174
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p style={{ color: 'var(--accent)', fontWeight: 800, marginBottom: 'var(--space-6)', fontSize: '0.68rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {t('footer_services')}
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {BRAND_LINKS.map(({ href, label }) => (
                <Link key={href} href={`/${locale}${href}`} className="footer-nav-link" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                  {label}
                </Link>
              ))}
              <Link href={`/${locale}/brand`} className="footer-nav-link" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                {t('nav_brand')}
              </Link>
            </nav>
          </Reveal>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '0.72rem' }}>
          <span>© {new Date().getFullYear()} Key Entertainment. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href={`/${locale}/privacy`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Privacy</Link>
            <Link href={`/${locale}/offer`} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Оферта</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
