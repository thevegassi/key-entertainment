# CLAUDE.md — Key Entertainment Website
> Этот файл читается Claude Code автоматически при каждой сессии.

---

## Проект

**Компания:** ТОО «KEY ENTERTAINMENT» (БИН 231240023174)  
**Сайт:** [keyent.kz](https://keyent.kz)  
**Хостинг:** Plesk (Apache + Nginx), IP: 185.98.5.162  
**Репозиторий:** GitHub → деплой вручную через Plesk File Manager или FTP

---

## Полная структура файлов на сервере

### HTML страницы
```
index.html          ← Главная
about.html          ← О нас
distribution.html   ← Дистрибуция
label.html          ← Label
legal.html          ← Legal (модальная оплата Kaspi)
pr.html             ← PR & Marketing
booking.html        ← Booking
brand.html          ← Брендбук
contacts.html       ← Контакты
privacy.html        ← Политика конфиденциальности
offer.html          ← Публичная оферта
404.html            ← Страница ошибки
thank-you.html      ← После отправки формы
```

### Код
```
style.css           ← Единый CSS для всех страниц
translations.js     ← Переводы RU/KZ/EN + applyLanguage()
.htaccess           ← Clean URLs, security, caching, gzip
robots.txt          ← SEO: правила для краулеров
sitemap.xml         ← SEO: карта сайта
```

### Логотипы и бренд
```
logo.png                  ← Основной логотип (белый)
logo.webp                 ← WebP версия логотипа (если есть)
minimal logo.png          ← Минимальный логотип (белый на тёмном)
minimal logo-1.png        ← Вариант 1: #9F96FF на #000
minimal logo-2.png        ← Вариант 2: белый на #1a1a1a
minimal logo-3.png        ← Вариант 3: #0C2350 на #f0f0f2
minimal logo-4.png        ← Вариант 4: чёрный на #ffffff
Vector.png                ← Векторный логотип
Vector-1.png              ← Вариант 1
Vector-2.png              ← Вариант 2
Vector-3.png              ← Вариант 3
Vector (1).png            ← Доп. вариант
key_brand_guideline.pdf   ← Брендбук PDF (для скачивания)
key_logo_pack.zip         ← Архив логотипов (для скачивания)
og-image.jpg              ← Open Graph изображение
```

### Hero-изображения (по страницам)
```
main.png              ← Hero главной страницы
hero_dist.jpg         ← Hero distribution.html
label_hero.jpg        ← Hero label.html
legal_hero.jpg        ← Hero legal.html
legal_finance.jpg     ← Доп. изображение legal.html
booking_hero.jpg      ← Hero booking.html
pr_hero.jpg           ← Hero pr.html
pr_event.jpg          ← PR события
pr_work.jpg           ← PR работа
about_vision.png      ← about.html — визия
founder.png           ← about.html — основатель
mission_bg.jpg        ← Фон секции миссии
studio_session.jpg    ← Студийная сессия
studio_work.jpg       ← Студийная работа
video_prod.jpg        ← Видеопродакшн
```

### Логотипы клиентов (для сетки клиентов)
```
logo_almale.png         ← Almale
logo_almatyfilm.png     ← Алматыфильм
logo_ayul.png           ← Ayul
logo_bk.png             ← Burger King
logo_coca_cola.png      ← Coca-Cola
logo_dodo.png           ← Dodo Pizza
logo_festival.png       ← Фестиваль
logo_kalifarniya.png    ← Kalifarniya
logo_qanay.png          ← Qanay
logo_xiaomi.png         ← Xiaomi
logo_zerdeli.png        ← Zerdeli
image 37.png            ← Доп. логотип клиента
```

### Фото артистов / кейсы
```
anarabatyrkhan.jpg    ← Анар Абатыркхан
beibitkushkaliyev.jpg ← Бейбит Кушкалиев
diana_ismail.jpg      ← Диана Исмаил
kalifarniya.jpg       ← Kalifarniya
koba.jpg              ← КOBA
qanay.jpg             ← Qanay
qq.png                ← QQ
renatgaissin.jpg      ← Ренат Гайсин
```

### Кейсы (карусель)
```
case_basqosu.jpg      ← Кейс: Басқосу
case_ik_tour.jpg      ← Кейс: IK тур
case_kali_tour.jpg    ← Кейс: Kali тур
case_limba_tour.jpg   ← Кейс: Limba тур
case_raim_tour.jpg    ← Кейс: Raim тур
case_yakutsk.jpg      ← Кейс: Якутск
```

### Декоративные паттерны (фоновые SVG)
```
pattern1.svg   ← Паттерн 1
pattern2.svg   ← Паттерн 2
pattern3.svg   ← Паттерн 3
pattern4.svg   ← Паттерн 4
```

### Соцсети / партнёры
```
yandex-music.png   ← Яндекс Музыка
```

### Системные папки
```
cgi-bin/   ← Системная папка хостинга, не трогать
```

---

## Бренд

| Элемент | Значение |
|---|---|
| Акцентный цвет (лайм) | `#D3FF33` / `var(--accent)` |
| Oxford Blue | `#0C2350` |
| Фон страниц | `#020202` / `#000` |
| Шрифт | Nunito Sans (Google Fonts) |

**Правило:** акцент `#D3FF33` — для выделений, кнопок CTA, активных элементов. Никаких других цветов без явного указания.

---

## Система переводов

```javascript
window.KEY_TRANSLATIONS = { ru: {...}, kz: {...}, en: {...} }
window.currentLang = localStorage.getItem('key_lang') || 'ru';
window.applyLanguage = function(lang) { ... }
window.initLanguage = function() { ... }
```

### Правила
1. Новый ключ — добавить во **все три** секции (`ru`, `kz`, `en`)
2. Атрибут на элементе: `data-i18n="ключ"`
3. Для placeholder: `data-i18n-placeholder="ключ"`
4. Обязательно проверять запятые — пропущенная запятая ломает весь JS

### Ключевые ключи
- `nav_brand_upper` — "БРЕНДБУК" в навигации и футере (заглавные)
- `nav_contacts_upper` — "КОНТАКТЫ" в футере
- `val_email`, `val_phone`, `val_min2`, `val_required`, `val_sending`, `val_error` — валидация форм

---

## Формы

- Endpoint: `https://formsubmit.co/ajax/info@keyent.kz`
- После успеха: `window.location.href = '/thank-you'`
- Форма **обязательно** имеет класс `contact-form`
- `paymentForm` в `legal.html` исключён: `querySelectorAll('form:not(#paymentForm)')`
- `type="tel"` — автоматически получает маску `+7XXXXXXXXXX`

---

## Навигация (шаблон хедера)

```html
<header class="top-nav">
    <a href="/"><img src="logo.png" class="nav-logo" alt="Key Entertainment"></a>
    <button class="burger" id="burger" aria-label="Открыть меню" aria-expanded="false">
        <span></span><span></span><span></span>
    </button>
    <nav class="nav-links" id="nav-links">
        <a href="/" data-i18n="nav_about">О нас</a>
        <a href="/distribution">Distribution</a>
        <a href="/legal">Legal</a>
        <a href="/label">Label</a>
        <a href="/pr">PR & Marketing</a>
        <a href="/booking">Booking</a>
        <a href="/brand" data-i18n="nav_brand_upper">БРЕНДБУК</a>
        <a href="/contacts" data-i18n="nav_contacts">Контакты</a>
    </nav>
    <div class="lang-switcher">
        <button class="lang-btn" data-lang="ru" onclick="applyLanguage('ru')">RU</button>
        <button class="lang-btn" data-lang="kz" onclick="applyLanguage('kz')">KZ</button>
        <button class="lang-btn" data-lang="en" onclick="applyLanguage('en')">EN</button>
    </div>
</header>
```

### Правила
- Ссылки **без `.html`**: `/distribution`, не `distribution.html`
- `index.html` → `href="/"`
- Активная страница: `class="active"` на ссылке
- Никогда не добавлять inline-стили на `.lang-btn`

---

## Адаптив

| Брейкпоинт | Описание |
|---|---|
| `860px` | Планшет, бургер появляется |
| `640px` | Мобильный |
| `480px` | Малый мобильный |
| `360px` | Очень маленький |

**iOS Safari:** `100dvh` вместо `100vh`

---

## Безопасность и аналитика

- Внешние ссылки: `rel="noopener noreferrer"`
- Security meta на каждой странице
- Google Analytics `G-KFJEKS7VYZ` — перед `</head>`

---

## Антипаттерны — НИКОГДА

```html
<a href="distribution.html">❌ — ссылки без .html</a>
<a href="/brand">БРЕНДБУК</a> ❌ — нужен data-i18n="nav_brand_upper"
<button class="lang-btn" style="...">RU</button> ❌ — inline-стили на lang-btn
height: calc(100vh - 64px) ❌ — использовать 100dvh
```

---

## Субдомены (отдельные проекты, не трогать)

| Субдомен | Описание |
|---|---|
| `records.keyent.kz` | Key Records — студия |
| `koba.keyent.kz` | Сайт артиста КOBA |
| `academy.keyent.kz` | Key Academy |

---

## Контакты

| | |
|---|---|
| Email | `info@keyent.kz` / `music-label@keyent.kz` |
| WhatsApp | `+77783520000` |
| Instagram | `@keyentertainment.kz` |
| Telegram | `@keymusickz` |
| VK | `key_info` |
| YouTube | `@keyentkz` |
