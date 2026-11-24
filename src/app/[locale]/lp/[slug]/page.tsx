import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { LANDINGS } from '@/content/landings';
import LandingForm from '@/components/LandingForm';
import { buildMetadata } from '@/lib/seo/metadata';
import { LOCALES, isLocale } from '@/lib/seo/site';

type P = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LANDINGS.flatMap((l) => LOCALES.map((locale) => ({ locale, slug: l.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const lp = LANDINGS.find((l) => l.slug === slug);
  if (!lp || !isLocale(locale)) return {};
  const c = lp.content[locale];
  // Рекламный лендинг: noindex (дубль целевых страниц), но canonical сохраняем на себя.
  return buildMetadata({ locale, path: `lp/${slug}`, title: c.title, description: c.description, noindex: true });
}

export default async function LandingPage({ params }: P) {
  const { locale, slug } = await params;
  const lp = LANDINGS.find((l) => l.slug === slug);
  if (!lp || !isLocale(locale)) notFound();
  setRequestLocale(locale);
  const c = lp.content[locale];
  return (
    <section style={{ minHeight: '80dvh', display: 'flex', alignItems: 'center', padding: '120px 10% 80px', background: '#020202' }}>
      <div style={{ maxWidth: '760px' }}>
        <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1.08, color: '#fff', marginBottom: '20px' }}>{c.h1}</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '24px' }}>{c.lead}</p>
        <ul style={{ color: '#fff', lineHeight: 2, marginBottom: '32px', paddingLeft: '20px' }}>
          {c.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
        <LandingForm slug={lp.slug} goal={lp.goal} cta={c.cta} submitted={c.submitted} />
      </div>
    </section>
  );
}
