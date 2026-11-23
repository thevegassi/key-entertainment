import Link from 'next/link';
import { getLocale } from 'next-intl/server';

export const metadata = { title: '404 | Key Entertainment', robots: { index: false, follow: false } };

export default async function NotFound() {
  const locale = await getLocale();
  return (
    <section style={{ minHeight: '70dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '140px 10% 80px', color: '#fff' }}>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', fontWeight: 900, color: 'var(--accent)' }}>404</h1>
      <p style={{ margin: '16px 0 28px' }}>Page not found / Страница не найдена</p>
      <Link href={`/${locale}`} style={{ color: 'var(--accent)' }}>Key Entertainment →</Link>
    </section>
  );
}
