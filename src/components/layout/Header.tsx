'use client';

import { useState, useEffect, useRef } from 'react';
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
  { href: '/blog', labelKey: 'nav_blog' },
  { href: '/contacts', labelKey: 'nav_contacts' },
];

const LOCALES = ['ru', 'kz', 'en'] as const;

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); setLangOpen(false); }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(lang: string) {
    // Replace current locale prefix with new one
    const segments = pathname.split('/');
    segments[1] = lang;
    router.push(segments.join('/'));
    setLangOpen(false);
  }

  function isActive(href: string) {
    const withLocale = `/${locale}${href === '/' ? '' : href}`;
    return pathname === withLocale || (href !== '/' && pathname.startsWith(`/${locale}${href}`));
  }

  return (
    <header className="top-nav">
      <Link href={`/${locale}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark-navy.svg" className="nav-logo" alt="Key Entertainment" />
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
      <div className="lang-switcher" ref={langRef}>
        <button
          className="lang-trigger"
          aria-label="Язык"
          aria-haspopup="listbox"
          aria-expanded={langOpen}
          onClick={() => setLangOpen(!langOpen)}
        >
          {locale.toUpperCase()}
          <span className="lang-chevron" aria-hidden="true" />
        </button>
        <div className={`lang-dropdown${langOpen ? ' open' : ''}`} role="listbox">
          {LOCALES.filter((lang) => lang !== locale).map((lang) => (
            <button
              key={lang}
              className="lang-option"
              role="option"
              aria-selected={false}
              onClick={() => switchLocale(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
