import type { Department } from './pages';
import type { Locale } from '@/lib/seo/site';

/**
 * СТАТЬИ. Добавили объект сюда — статья появляется на /<locale>/blog/<slug>,
 * в sitemap, в ads-feed и получает Article + BreadcrumbList JSON-LD автоматически.
 * Пока массив пуст, раздел /blog не публикуется (нет тонких страниц).
 */
export type ArticleLocaleContent = {
  title: string;        // ≤ 60 символов вместе с брендом (бренд добавляется автоматически)
  description: string;  // ≤ 160
  readTime: string;
  /**
   * Блоки тела статьи:
   *  "## "  → подзаголовок H2
   *  "> "   → цитата-выделение
   *  "- "   → пункт списка (идущие подряд "- " группируются в один <ul>)
   *  иначе  → абзац (поддерживает инлайн-HTML, например <a href="...">)
   */
  body: string[];
};

export type Article = {
  slug: string;
  department: Department;
  published: string; // ISO
  updated: string;   // ISO
  image?: string;    // путь в /public, 1200x630
  /** Языки, на которых статья существует (hreflang строится только по ним) */
  content: Partial<Record<Locale, ArticleLocaleContent>>;
};

export const ARTICLES: Article[] = [
  {
    slug: 'obnovili-sayt',
    department: 'company',
    published: '2026-11-24',
    updated: '2026-11-24',
    content: {
      ru: {
        title: 'Обновили сайт: новая дизайн-система',
        description: 'Переехали на единую дизайн-систему бренда: типографика, карточки, hero-секции и текстура фирменного знака на каждой странице.',
        readTime: '3 мин',
        body: [
          'Мы обновили визуальную композицию сайта keyent.kz, перейдя на единую дизайн-систему бренда — ту же, что используется в брендбуке. Структура сайта и переводы на трёх языках остались прежними, изменилась подача.',
          '## Типографика и цвет',
          'Nunito Sans держит заголовки и лейблы, Manrope — основной текст. К акцентному лайму и oxford blue добавили tropical indigo как третий фирменный цвет для акцентных секций брендбука.',
          '> Радиусы карточек, кнопки и структура секций теперь единообразны на каждой странице — как зафиксировано в брендбуке, а не на глаз в каждом файле отдельно.',
          '## Новая композиция',
          'На каждой странице появились:',
          '- диагональные переходы между цветными секциями вместо прямых линий;',
          '- текстура фирменного знака как ненавязчивый фон тёмных секций;',
          '- единая карточная система для услуг, кейсов и направлений.',
          '## Что дальше',
          'Это база — дальше донастраиваем детали и постепенно обновляем контент по разделам. Если что-то выглядит не так, как должно, — напишите нам через <a href="/contacts">контакты</a>.',
        ],
      },
      kz: {
        title: 'Сайтты жаңа дизайн-жүйеге көшірдік',
        description: 'keyent.kz сайтын брендтің бірыңғай дизайн-жүйесіне көшірдік: типографика, карточкалар, hero-бөлімдер және әр беттегі белгі текстурасы.',
        readTime: '3 мин',
        body: [
          'keyent.kz сайтының визуалды композициясын жаңарттық — брендбукте қолданылатын бірыңғай дизайн-жүйеге көштік. Сайттың құрылымы және үш тілдегі аудармалар өзгерген жоқ, тек көрінісі жаңарды.',
          '## Типографика және түс',
          'Nunito Sans тақырыптар мен лейблдерге, Manrope негізгі мәтінге қолданылады. Акцентті лайм мен oxford blue-ге брендбукте бекітілген үшінші фирмалық түс — tropical indigo қосылды.',
          '> Карточка радиустары, батырмалар және бөлім құрылымы енді әр бетте бірдей — брендбукте бекітілгендей, әр файлда көзбен бағаланбай.',
          '## Жаңа композиция',
          'Әр бетте енді мыналар бар:',
          '- түсті бөлімдер арасында тік сызықтың орнына диагональды өтпелер;',
          '- қараңғы бөлімдердегі фирмалық белгінің байқалмайтын текстурасы;',
          '- қызметтер, кейстер мен бағыттарға арналған бірыңғай карточка жүйесі.',
          '## Ары қарай не болады',
          'Бұл — негіз. Ары қарай бөлшектерді дәлдеп, контентті бөлім-бөлім жаңартамыз. Бірдеңе дұрыс көрінбесе — <a href="/contacts">байланыс</a> арқылы жазыңыз.',
        ],
      },
      en: {
        title: 'Site redesign: a unified design system',
        description: 'We moved keyent.kz onto the brand’s own design system — typography, cards, hero sections and the mark’s texture on every page.',
        readTime: '3 min',
        body: [
          'We’ve updated the visual composition of keyent.kz, moving it onto the brand’s own design system — the same one used in the brandbook. The site’s structure and three-language translations stayed the same; the presentation changed.',
          '## Typography and colour',
          'Nunito Sans carries headings and labels, Manrope carries body copy. Alongside the lime accent and oxford blue, we added tropical indigo as a third brand colour for accent sections, as defined in the brandbook.',
          '> Card radii, buttons and section structure are now consistent on every page — as set out in the brandbook, not eyeballed file by file.',
          '## A new composition',
          'Every page now has:',
          '- diagonal transitions between coloured sections instead of straight lines;',
          '- the brand mark as a subtle texture on dark sections;',
          '- one shared card system for services, case studies and divisions.',
          '## What’s next',
          'This is the foundation — we’ll keep tuning the details and updating content section by section. If anything looks off, let us know via <a href="/contacts">contacts</a>.',
        ],
      },
    },
  },
  {
    slug: 'distribution-0-komissii',
    department: 'distribution',
    published: '2026-11-24',
    updated: '2026-11-24',
    content: {
      ru: {
        title: 'Дистрибуция без комиссии: как устроена',
        description: 'Разбираем модель 0%-дистрибуции Key Entertainment: куда уходят деньги с прослушиваний и почему артист получает всё.',
        readTime: '5 мин',
        body: [
          'Самый частый вопрос от артистов: «Если вы не берёте комиссию с прослушиваний, то на чём вы зарабатываете?» Отвечаем честно.',
          '## Что входит в дистрибуцию',
          'Key Entertainment доставляет релизы на 150+ платформ — Spotify, Apple Music, YouTube Music, TikTok, Яндекс Музыку и другие. Сюда входит оформление метаданных (ISRC, UPC, авторские права), питчинг в редакционные плейлисты, финансовая отчётность и выплата роялти.',
          '> Артист получает 100% выплат от площадок. Комиссия с прослушиваний — не наша модель заработка.',
          '## Откуда доход у лейбла',
          'Дистрибуция — входная точка в экосистему Key Entertainment, а не отдельный источник дохода. Дальше артисты и компании пользуются другими направлениями по отдельным договорам:',
          '- Label — совместные релизы и A&R-сопровождение;',
          '- Booking — организация туров и выступлений;',
          '- PR & Marketing — продвижение и коллаборации с брендами;',
          '- Legal — юридическое сопровождение контрактов и авторских прав.',
          'Компании и лейблы получают доступ к личному кабинету — B2B-инструменту для управления каталогом: загрузка релизов, аналитика прослушиваний и мониторинг выплат в одном месте.',
          '## Как подключиться',
          'Если хотите обсудить дистрибуцию для своего артиста или каталога — напишите через <a href="/contacts">контакты</a> или загляните в раздел <a href="/distribution">Distribution</a>.',
        ],
      },
      kz: {
        title: '0% комиссиясыз дистрибуция қалай істейді',
        description: 'Key Entertainment-тің 0% комиссиялы дистрибуция моделін талдаймыз: тыңдаудан түскен ақша қайда кетеді және артист неге бәрін алады.',
        readTime: '5 мин',
        body: [
          'Артистер жиі қоятын сұрақ: «Егер сіздер тыңдаудан комиссия алмасаңыздар, неден табыс табасыздар?» Ашық жауап береміз.',
          '## Дистрибуцияға не кіреді',
          'Key Entertainment релиздерді 150+ платформаға жеткізеді — Spotify, Apple Music, YouTube Music, TikTok, Яндекс Музыка және басқалар. Бұған метадеректерді (ISRC, UPC, авторлық құқық) рәсімдеу, редакциялық плейлисттерге питчинг, қаржылық есеп беру және роялти төлемдері кіреді.',
          '> Артист алаңдардан төленетін сомманың 100%-ын алады. Тыңдаудан комиссия алу — біздің табыс моделіміз емес.',
          '## Лейблдің табысы қайдан келеді',
          'Дистрибуция — Key Entertainment экожүйесіне кіру нүктесі, жеке табыс көзі емес. Ары қарай артистер мен компаниялар жеке келісімшарттар бойынша басқа бағыттарды пайдаланады:',
          '- Label — бірлескен релиздер және A&R қолдауы;',
          '- Booking — турлар мен шығармашылық кештерді ұйымдастыру;',
          '- PR & Marketing — жылжыту және брендтермен коллаборация;',
          '- Legal — келісімшарттар мен авторлық құқықты заңды қолдау.',
          'Компаниялар мен лейблдер жеке кабинетке қолжетімділік алады — каталогты басқаруға арналған B2B құрал: релиздерді жүктеу, тыңдау аналитикасы және төлемдерді бақылау бір жерде.',
          '## Қалай қосылуға болады',
          'Егер өз артистіңіз немесе каталогыңыз үшін дистрибуцияны талқылағыңыз келсе — <a href="/contacts">байланыс</a> арқылы жазыңыз немесе <a href="/distribution">Distribution</a> бөліміне қараңыз.',
        ],
      },
      en: {
        title: 'How 0%-commission distribution works',
        description: 'We break down Key Entertainment’s 0%-commission distribution model: where the streaming money goes, and why the artist keeps all of it.',
        readTime: '5 min',
        body: [
          'The question artists ask us most: "If you don’t take a cut of streams, how do you make money?" Here’s the honest answer.',
          '## What’s included in distribution',
          'Key Entertainment delivers releases to 150+ platforms — Spotify, Apple Music, YouTube Music, TikTok, Yandex Music and more. That includes metadata (ISRC, UPC, copyright) handling, editorial playlist pitching, financial reporting and royalty payouts.',
          '> The artist gets 100% of what platforms pay out. Taking a cut of streams isn’t how we make money.',
          '## Where the label’s revenue comes from',
          'Distribution is the entry point into the Key Entertainment ecosystem, not a standalone revenue source. From there, artists and companies work with our other divisions under separate agreements:',
          '- Label — joint releases and A&R support;',
          '- Booking — tour and show organisation;',
          '- PR & Marketing — promotion and brand collaborations;',
          '- Legal — contract and copyright support.',
          'Companies and labels also get a dashboard — a B2B tool for catalogue management: uploading releases, streaming analytics and payout tracking in one place.',
          '## How to get started',
          'If you’d like to talk distribution for your artist or catalogue, reach us via <a href="/contacts">contacts</a> or check out <a href="/distribution">Distribution</a>.',
        ],
      },
    },
  },
];
