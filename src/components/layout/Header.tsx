'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const langBtnRef = useRef<HTMLButtonElement>(null);

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

  // Escape закрывает меню / список языков и возвращает фокус на кнопку, которая их открыла
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      if (langOpen) { setLangOpen(false); langBtnRef.current?.focus(); }
      else if (open) { setOpen(false); burgerRef.current?.focus(); }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, langOpen]);

  // Открытое мобильное меню перекрывает страницу — не даём ей прокручиваться под ним
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Та же страница на другом языке — обычная ссылка (Cmd/Ctrl+клик, индексируется)
  function localeHref(lang: string) {
    const segments = pathname.split('/');
    segments[1] = lang;
    return segments.join('/');
  }

  function isActive(href: string) {
    const withLocale = `/${locale}${href === '/' ? '' : href}`;
    return pathname === withLocale || (href !== '/' && pathname.startsWith(`/${locale}${href}`));
  }

  return (
    <header className="top-nav">
      <Link href={`/${locale}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-mark-navy.svg" className="nav-logo" alt="Key Entertainment" width={43} height={44} />
      </Link>
      <button
        ref={burgerRef}
        className={`burger${open ? ' open' : ''}`}
        id="burger"
        aria-label={open ? t('menu_close') : t('menu_open')}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen(!open)}
      >
        <span /><span /><span />
      </button>
      <nav className={`nav-links${open ? ' open' : ''}`} id="nav-links" aria-label={t('nav_main')}>
        {PAGES.map(({ href, label, labelKey }) => (
          <Link
            key={href}
            href={`/${locale}${href === '/' ? '' : href}`}
            className={isActive(href) ? 'active' : ''}
            aria-current={isActive(href) ? 'page' : undefined}
          >
            {labelKey ? t(labelKey) : label}
          </Link>
        ))}
      </nav>
      <div className="lang-switcher" ref={langRef}>
        <button
          ref={langBtnRef}
          className="lang-trigger"
          aria-label={`${t('lang_label')}: ${locale.toUpperCase()}`}
          aria-expanded={langOpen}
          aria-controls="lang-dropdown"
          onClick={() => setLangOpen(!langOpen)}
        >
          {locale.toUpperCase()}
          <span className="lang-chevron" aria-hidden="true" />
        </button>
        <div id="lang-dropdown" className={`lang-dropdown${langOpen ? ' open' : ''}`}>
          {LOCALES.filter((lang) => lang !== locale).map((lang) => (
            <Link
              key={lang}
              href={localeHref(lang)}
              className="lang-option"
              lang={lang === 'kz' ? 'kk' : lang}
              hrefLang={lang === 'kz' ? 'kk' : lang}
              onClick={() => setLangOpen(false)}
            >
              {lang.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
