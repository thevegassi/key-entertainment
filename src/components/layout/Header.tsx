'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

type NavItem = { href: string; label?: string; labelKey?: string };
const PAGES: NavItem[] = [
  { href: '/', labelKey: 'nav_about' },
  { href: '/distribution', label: 'Distribution' },
  { href: '/legal', label: 'Legal' },
  { href: '/label', label: 'Label' },
  { href: '/pr', label: 'PR & Marketing' },
  { href: '/booking', label: 'Booking' },
  { href: '/brand', labelKey: 'nav_brand_upper' },
  { href: '/contacts', labelKey: 'nav_contacts' },
];

const LOCALES = ['ru', 'kz', 'en'] as const;

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  function switchLocale(lang: string) {
    // Replace current locale prefix with new one
    const segments = pathname.split('/');
    segments[1] = lang;
    router.push(segments.join('/'));
  }

  function isActive(href: string) {
    const withLocale = `/${locale}${href === '/' ? '' : href}`;
    return pathname === withLocale || (href !== '/' && pathname.startsWith(`/${locale}${href}`));
  }

  return (
    <header className="top-nav">
      <Link href={`/${locale}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" className="nav-logo" alt="Key Entertainment" />
      </Link>
      <button
        className={`burger${open ? ' open' : ''}`}
        id="burger"
        aria-label="Открыть меню"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span /><span /><span />
      </button>
      <nav className={`nav-links${open ? ' open' : ''}`} id="nav-links">
        {PAGES.map(({ href, label, labelKey }) => (
          <Link
            key={href}
            href={`/${locale}${href === '/' ? '' : href}`}
            className={isActive(href) ? 'active' : ''}
          >
            {labelKey ? t(labelKey) : label}
          </Link>
        ))}
      </nav>
      <div className="lang-switcher">
        {LOCALES.map((lang) => (
          <button
            key={lang}
            className={`lang-btn${locale === lang ? ' active' : ''}`}
            onClick={() => switchLocale(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}
