import type { Locale } from '@/lib/seo/site';

/**
 * РЕКЛАМНЫЕ ЛЕНДИНГИ (/<locale>/lp/<slug>) — одно целевое действие (форма), цели Метрики.
 * noindex, вне sitemap, но в /ads-feed.csv. Новый лендинг = новый объект здесь.
 */
export type Landing = {
  slug: string;
  department: 'distribution' | 'label' | 'booking' | 'pr' | 'legal';
  goal: string; // имя цели Метрики/GA4
  content: Record<Locale, {
    title: string; description: string; h1: string; lead: string;
    bullets: string[]; cta: string; submitted: string;
  }>;
};

export const LANDINGS: Landing[] = [
  {
    slug: 'music-distribution',
    department: 'distribution',
    goal: 'lp_submit',
    content: {
      ru: {
        title: 'Дистрибуция музыки в Казахстане | Key Entertainment',
        description: 'Выпустите релиз на Spotify, Apple Music, Яндекс Музыке и TikTok. Роялти, аналитика, питчинг в плейлисты. Ответ в течение 24 часов.',
        h1: 'Дистрибуция музыки на все площадки',
        lead: 'Выпускаем треки и альбомы на Spotify, Apple Music, Яндекс Музыку, YouTube и TikTok. Оставьте контакты — расскажем условия.',
        bullets: ['Все ведущие стриминги и соцсети', 'Прозрачные роялти и аналитика', 'Питчинг в плейлисты'],
        cta: 'Получить условия', submitted: 'Спасибо! Мы свяжемся с вами в течение 24 часов.',
      },
      kz: {
        title: 'Музыканы дистрибуциялау | Key Entertainment',
        description: 'Релизді Spotify, Apple Music, Яндекс Музыка және TikTok-қа шығарыңыз. Роялти, аналитика, плейлистерге питчинг. 24 сағат ішінде жауап береміз.',
        h1: 'Музыканы барлық алаңдарға дистрибуциялау',
        lead: 'Тректер мен альбомдарды Spotify, Apple Music, Яндекс Музыка, YouTube және TikTok-қа шығарамыз. Байланыс қалдырыңыз — шарттарды айтамыз.',
        bullets: ['Барлық жетекші стримингтер', 'Ашық роялти және аналитика', 'Плейлистерге питчинг'],
        cta: 'Шарттарды алу', submitted: 'Рахмет! 24 сағат ішінде хабарласамыз.',
      },
      en: {
        title: 'Music Distribution in Kazakhstan | Key Entertainment',
        description: 'Release on Spotify, Apple Music, Yandex Music and TikTok. Royalties, analytics, playlist pitching. We reply within 24 hours.',
        h1: 'Music distribution to every platform',
        lead: 'We release tracks and albums to Spotify, Apple Music, Yandex Music, YouTube and TikTok. Leave your contacts and we will send the terms.',
        bullets: ['All major streaming platforms', 'Transparent royalties and analytics', 'Playlist pitching'],
        cta: 'Get the terms', submitted: 'Thank you! We will contact you within 24 hours.',
      },
    },
  },
];
