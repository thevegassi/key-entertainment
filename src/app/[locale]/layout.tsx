import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HREFLANG, SITE_NAME, SITE_URL, isLocale } from '@/lib/seo/site';
import Metrika from '@/components/analytics/Metrika';
import '@/styles/tailwind.css';
import '@/styles/globals.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  // Всё страничное (title/description/canonical/hreflang/OG) — в lib/seo/metadata.ts.
  // Здесь только то, что общее для сайта. Коды верификации — из env (Vercel → Settings → Environment Variables).
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    },
  };
}

export const viewport: Viewport = { themeColor: '#ffffff' };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const messages = await getMessages();
  const t = await getTranslations({ locale });
  return (
    <html lang={HREFLANG[locale]}>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KFJEKS7VYZ"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-KFJEKS7VYZ');`,
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">{t('skip_to_content')}</a>
        <Metrika />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
