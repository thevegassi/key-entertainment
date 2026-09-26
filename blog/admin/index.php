<?php
/**
 * Мини-админка блога Key Entertainment.
 *
 * Логин/пароль задаются один раз через setup.php (см. рядом). Здесь —
 * дашборд со списком статей, форма создания/редактирования (пишет
 * markdown-облегчённый текст в blog/posts.json и генерирует статичный
 * blog/<slug>.html), и удаление. Никакой базы данных — то же самое
 * posts.json, которое уже читает публичный blog.html.
 */

define('BLOG_ADMIN_BOOT', true);
session_start();

$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    header('Location: /blog/admin/setup.php');
    exit;
}
require $configPath;

$postsPath = dirname(__DIR__) . '/posts.json';
$blogDir = dirname(__DIR__);

/* ---------- helpers ---------- */

function load_posts(): array {
    global $postsPath;
    if (!file_exists($postsPath)) return [];
    $fh = fopen($postsPath, 'r');
    if (!$fh) return [];
    flock($fh, LOCK_SH);
    $raw = stream_get_contents($fh);
    flock($fh, LOCK_UN);
    fclose($fh);
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function save_posts(array $posts): bool {
    global $postsPath;
    $fh = fopen($postsPath, 'c+');
    if (!$fh) return false;
    flock($fh, LOCK_EX);
    ftruncate($fh, 0);
    rewind($fh);
    $ok = fwrite($fh, json_encode(array_values($posts), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false;
    fflush($fh);
    flock($fh, LOCK_UN);
    fclose($fh);
    return $ok;
}

function csrf_token(): string {
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
    return $_SESSION['csrf'];
}

function csrf_check(string $token): bool {
    return isset($_SESSION['csrf']) && hash_equals($_SESSION['csrf'], $token);
}

function flash(string $type, string $msg): void {
    $_SESSION['flash'] = ['type' => $type, 'msg' => $msg];
}

function take_flash(): ?array {
    if (empty($_SESSION['flash'])) return null;
    $f = $_SESSION['flash'];
    unset($_SESSION['flash']);
    return $f;
}

function is_logged_in(): bool {
    return !empty($_SESSION['blog_admin']);
}

function redirect(string $to): void {
    header('Location: ' . $to);
    exit;
}

/** Очень лёгкий markdown → HTML под структуру наших статей.
 *  Поддержка: абзацы, "## Заголовок", "- пункт списка", "> цитата",
 *  **жирный**, [текст](ссылка). Всё остальное экранируется. */
function md_to_html(string $text): string {
    $text = str_replace("\r\n", "\n", $text);
    $blocks = preg_split('/\n{2,}/', trim($text));
    $html = [];
    foreach ($blocks as $block) {
        $block = trim($block);
        if ($block === '') continue;
        $lines = explode("\n", $block);

        if (strpos($block, '## ') === 0) {
            $html[] = '<h2>' . inline_md(substr($lines[0], 3)) . '</h2>';
            continue;
        }

        if (strpos($block, '> ') === 0) {
            $quoteLines = array_map(fn($l) => inline_md(preg_replace('/^>\s?/', '', $l)), $lines);
            $html[] = '<div class="pull-quote"><p>' . implode(' ', $quoteLines) . '</p></div>';
            continue;
        }

        $isList = true;
        foreach ($lines as $l) {
            if (strpos(trim($l), '- ') !== 0) { $isList = false; break; }
        }
        if ($isList) {
            $items = array_map(fn($l) => '<li>' . inline_md(preg_replace('/^-\s?/', '', trim($l))) . '</li>', $lines);
            $html[] = '<ul>' . implode('', $items) . '</ul>';
            continue;
        }

        $html[] = '<p>' . inline_md(implode(' ', $lines)) . '</p>';
    }
    return implode("\n            ", $html);
}

function inline_md(string $line): string {
    $safe = htmlspecialchars($line, ENT_QUOTES, 'UTF-8');
    $safe = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $safe);
    $safe = preg_replace('/\[(.+?)\]\((.+?)\)/', '<a href="$2" style="color:var(--accent);">$1</a>', $safe);
    return $safe;
}

function slugify_check(string $slug): bool {
    return (bool) preg_match('/^[a-z0-9]+(-[a-z0-9]+)*$/', $slug);
}

function render_article_page(array $post): string {
    $title = htmlspecialchars($post['title'], ENT_QUOTES, 'UTF-8');
    $excerpt = htmlspecialchars($post['excerpt'], ENT_QUOTES, 'UTF-8');
    $tag = htmlspecialchars($post['tag'], ENT_QUOTES, 'UTF-8');
    $slug = htmlspecialchars($post['slug'], ENT_QUOTES, 'UTF-8');
    $readTime = htmlspecialchars($post['readTime'], ENT_QUOTES, 'UTF-8');
    $dateObj = DateTime::createFromFormat('Y-m-d', $post['date']) ?: new DateTime();
    $dateHuman = ru_date($dateObj);
    $bodyHtml = md_to_html($post['body']);
    $url = 'https://www.keyent.kz/blog/' . $slug;

    return <<<HTML
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$title} | Key Entertainment</title>
    <meta name="description" content="{$excerpt}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{$url}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="{$url}">
    <meta property="og:title" content="{$title} | Key Entertainment">
    <meta property="og:description" content="{$excerpt}">
    <link rel="icon" type="image/svg+xml" href="../logo.svg">
    <link rel="apple-touch-icon" href="../logo.svg">
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;900&family=Manrope:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="../style.css">
    <style>
        #scroll-top {
            position: fixed; bottom: 32px; right: 32px; width: 46px; height: 46px;
            background: var(--accent); color: #000; border: none; cursor: pointer;
            font-size: 1.1rem; font-weight: 900; display: flex; align-items: center; justify-content: center;
            z-index: 9000; opacity: 0; transform: translateY(16px);
            transition: opacity 0.3s, transform 0.3s; pointer-events: none;
        }
        #scroll-top.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
        #scroll-top:hover { background: #fff; }
        @media (max-width: 640px) {
            #scroll-top { bottom: 20px; right: 20px; width: 40px; height: 40px; font-size: 1rem; }
        }
    </style>
    <script src="../translations.js?v=3"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-KFJEKS7VYZ"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-KFJEKS7VYZ');
    </script>
</head>
<body style="background: #020202; color: #fff;">
    <button id="scroll-top" aria-label="Наверх">↑</button>
    <div id="pl1" class="pattern-layer"></div>
    <div id="pl2" class="pattern-layer"></div>
    <div id="pl3" class="pattern-layer"></div>
    <div id="pl4" class="pattern-layer"></div>
    <div id="ambient-bg" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span>
    </div>

    <header class="top-nav">
        <a href="/"><img src="../logo.svg" class="nav-logo" alt="Key Entertainment"></a>
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
            <a href="/blog" class="active" data-i18n="nav_blog">Блог</a>
            <a href="/contacts" data-i18n="nav_contacts">Контакты</a>
        </nav>
        <div class="lang-switcher">
            <button class="lang-btn" data-lang="ru" onclick="applyLanguage('ru')">RU</button>
            <button class="lang-btn" data-lang="kz" onclick="applyLanguage('kz')">KZ</button>
            <button class="lang-btn" data-lang="en" onclick="applyLanguage('en')">EN</button>
        </div>
    </header>

    <main>
        <div class="article-hero reveal">
            <a href="/blog" class="article-back" data-i18n="blog_back">← ВСЕ СТАТЬИ</a>
            <span class="post-tag">{$tag}</span>
            <h1>{$title}</h1>
        </div>
        <p class="article-meta" style="max-width:760px;margin:0 auto;padding:0 10% 44px;border-bottom:1px solid rgba(255,255,255,0.06);">{$dateHuman} · {$readTime}</p>

        <article class="article-body reveal">
            {$bodyHtml}
        </article>

        <section class="article-related">
            <span class="section-label" data-i18n="blog_related_label">ЧИТАЙТЕ ТАКЖЕ</span>
            <div id="related-grid" class="post-grid"></div>
        </section>
    </main>

    <footer style="padding: 60px 10% 40px; text-align: center; position: relative; z-index: 1;">
        <img src="../logo.svg" style="width: 160px; margin-bottom: 28px;" alt="Key Entertainment">
        <div style="display: flex; justify-content: center; align-items: center; gap: 20px; margin-bottom: 28px; flex-wrap: wrap;">
            <a href="https://wa.me/77010520606" target="_blank" rel="noopener" title="WhatsApp" style="color:#fff;font-size:1.3rem;text-decoration:none;opacity:0.5;transition:all 0.3s;" onmouseover="this.style.opacity=1;this.style.color='#25D366'" onmouseout="this.style.opacity=0.5;this.style.color='#fff'"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="https://t.me/keyentkz" target="_blank" rel="noopener" title="Telegram" style="color:#fff;font-size:1.3rem;text-decoration:none;opacity:0.5;transition:all 0.3s;" onmouseover="this.style.opacity=1;this.style.color='#0088cc'" onmouseout="this.style.opacity=0.5;this.style.color='#fff'"><i class="fa-brands fa-telegram"></i></a>
            <a href="https://instagram.com/keyentertainment.kz" target="_blank" rel="noopener" title="Instagram" style="color:#fff;font-size:1.3rem;text-decoration:none;opacity:0.5;transition:all 0.3s;" onmouseover="this.style.opacity=1;this.style.color='#E4405F'" onmouseout="this.style.opacity=0.5;this.style.color='#fff'"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://www.youtube.com/@keyentkz" target="_blank" rel="noopener" title="YouTube" style="color:#fff;font-size:1.3rem;text-decoration:none;opacity:0.5;transition:all 0.3s;" onmouseover="this.style.opacity=1;this.style.color='#FF0000'" onmouseout="this.style.opacity=0.5;this.style.color='#fff'"><i class="fa-brands fa-youtube"></i></a>
            <a href="https://vk.com/keyentertainment" target="_blank" rel="noopener" title="VK" style="color:#fff;font-size:1.3rem;text-decoration:none;opacity:0.5;transition:all 0.3s;" onmouseover="this.style.opacity=1;this.style.color='#4C75A3'" onmouseout="this.style.opacity=0.5;this.style.color='#fff'"><i class="fa-brands fa-vk"></i></a>
            <a href="https://music.yandex.kz/label/632686" target="_blank" rel="noopener" title="Яндекс Музыка" style="color:#fff;font-size:1.3rem;text-decoration:none;opacity:0.5;transition:all 0.3s;display:inline-flex;align-items:center;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.5"><img src="../yandex-music.png" alt="Яндекс Музыка" style="width:24px;height:24px;object-fit:contain;filter:brightness(0) invert(1);transition:0.3s;" onmouseover="this.style.filter='none'" onmouseout="this.style.filter='brightness(0) invert(1)'" loading="lazy"></a>
        </div>
        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 16px; font-size: 0.7rem; letter-spacing: 1.5px; color: rgba(211,255,51,0.9); flex-wrap: wrap; font-weight: 700;">
            <a href="/distribution" style="color:inherit;text-decoration:none;">DISTRIBUTION</a>
            <a href="/legal" style="color:inherit;text-decoration:none;">LEGAL</a>
            <a href="/label" style="color:inherit;text-decoration:none;">LABEL</a>
            <a href="/pr" style="color:inherit;text-decoration:none;">PR & MARKETING</a>
            <a href="/booking" style="color:inherit;text-decoration:none;">BOOKING</a>
            <a href="/contacts" style="color:inherit;text-decoration:none;" data-i18n="nav_contacts_upper">КОНТАКТЫ</a>
        </div>
        <div style="display:flex;justify-content:center;gap:24px;margin-bottom:16px;font-size:0.58rem;letter-spacing:1px;flex-wrap:wrap;">
            <a href="/privacy" style="color:rgba(255,255,255,0.55);text-decoration:none;transition:color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.55)'" data-i18n="footer_privacy">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
            <a href="/offer" style="color:rgba(255,255,255,0.55);text-decoration:none;transition:color 0.3s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.55)'" data-i18n="footer_offer">ПУБЛИЧНАЯ ОФЕРТА</a>
        </div>
        <p style="font-size:0.58rem;opacity:0.45;letter-spacing:2px;margin:0;" data-i18n="footer_copy">ТОО «KEY ENTERTAINMENT» · БИН 231240023174 · © 2015–2026 ALL RIGHTS RESERVED.</p>
    </footer>

    <script>
        const burger = document.getElementById('burger');
        const navLinks = document.getElementById('nav-links');
        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            navLinks.classList.toggle('open');
            burger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => { burger.classList.remove('open'); navLinks.classList.remove('open'); document.body.style.overflow = ''; });
        });
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && ['s','u','a','p'].includes(e.key.toLowerCase())) e.preventDefault();
            if (e.key === 'F12') e.preventDefault();
        });
        (function() {
            var layers = [document.getElementById('pl1'),document.getElementById('pl2'),document.getElementById('pl3'),document.getElementById('pl4')];
            var current = 0;
            layers[0].classList.add('visible');
            function update() {
                var pageH = document.body.scrollHeight - window.innerHeight;
                if (pageH <= 0) return;
                var active = Math.min(Math.floor((window.scrollY || window.pageYOffset) / (pageH / layers.length)), layers.length - 1);
                if (active !== current) { layers[current].classList.remove('visible'); layers[active].classList.add('visible'); current = active; }
            }
            window.addEventListener('scroll', update, {passive: true});
        })();
    </script>

    <script>
        (function() {
            var btn = document.getElementById('scroll-top');
            if (!btn) return;
            window.addEventListener('scroll', function() {
                if (window.scrollY > 400) { btn.classList.add('visible'); } else { btn.classList.remove('visible'); }
            }, { passive: true });
            btn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
        })();
    </script>

    <script>
        (function () {
            var CURRENT_SLUG = '{$slug}';
            var grid = document.getElementById('related-grid');
            var lang = window.currentLang || localStorage.getItem('key_lang') || 'ru';
            var readMoreLabel = (window.KEY_TRANSLATIONS && window.KEY_TRANSLATIONS[lang] && window.KEY_TRANSLATIONS[lang].blog_read_more) || 'ЧИТАТЬ —>';
            fetch('/blog/posts.json')
                .then(function (r) { return r.json(); })
                .then(function (posts) {
                    posts = posts.filter(function (p) { return p.slug !== CURRENT_SLUG; });
                    posts.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
                    grid.innerHTML = posts.map(function (post) {
                        var date = new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-GB' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
                        return '<a href="/blog/' + post.slug + '" class="post-card reveal" data-cursor="view">' +
                            '<span class="post-tag">' + post.tag + '</span>' +
                            '<h2 class="post-title">' + post.title + '</h2>' +
                            '<p class="post-excerpt">' + post.excerpt + '</p>' +
                            '<div class="post-meta"><span>' + date + '</span><span class="post-more">' + readMoreLabel + '</span></div>' +
                            '</a>';
                    }).join('');
                });
        })();
    </script>
    <script src="../motion.js" defer></script>
</body>
</html>
HTML;
}

function ru_date(DateTime $d): string {
    $months = [1=>'января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    return (int)$d->format('j') . ' ' . $months[(int)$d->format('n')] . ' ' . $d->format('Y') . ' г.';
}

/* ---------- routing ---------- */

$action = $_GET['action'] ?? '';

if ($action === 'logout') {
    unset($_SESSION['blog_admin']);
    redirect('/blog/admin/');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login_username'])) {
    $u = $_POST['login_username'];
    $p = (string) ($_POST['login_password'] ?? '');
    if (hash_equals(ADMIN_USERNAME, $u) && password_verify($p, ADMIN_PASSWORD_HASH)) {
        session_regenerate_id(true);
        $_SESSION['blog_admin'] = true;
        redirect('/blog/admin/');
    }
    sleep(1); // тормозим перебор пароля
    $loginError = 'Неверный логин или пароль.';
}

if (!is_logged_in()) {
    $flash = take_flash();
    ?>
    <!DOCTYPE html>
    <html lang="ru">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Вход — Блог Key Entertainment</title>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@700;900&family=Manrope:wght@400;600&display=swap" rel="stylesheet">
    <style>
      body{background:#020202;color:#fff;font-family:'Manrope',sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:24px;}
      .box{max-width:360px;width:100%;}
      h1{font-family:'Nunito Sans',sans-serif;font-weight:900;text-transform:uppercase;font-size:1.2rem;margin:0 0 24px;}
      label{display:block;font-size:0.8rem;color:#aaa;margin:14px 0 6px;}
      input{width:100%;box-sizing:border-box;background:#111;border:1px solid #333;color:#fff;padding:12px 14px;border-radius:8px;font-size:0.95rem;font-family:inherit;}
      input:focus{outline:none;border-color:#D3FF33;}
      button{margin-top:22px;width:100%;background:#D3FF33;color:#000;border:none;padding:14px;border-radius:999px;font-weight:900;text-transform:uppercase;letter-spacing:1px;font-size:0.85rem;cursor:pointer;}
      .error{color:#ff6b6b;font-size:0.85rem;margin-top:12px;}
    </style>
    </head>
    <body>
    <div class="box">
      <h1>Вход в блог</h1>
      <form method="post">
        <label for="u">Логин</label>
        <input id="u" name="login_username" autocomplete="username" required>
        <label for="p">Пароль</label>
        <input id="p" name="login_password" type="password" autocomplete="current-password" required>
        <button type="submit">Войти</button>
      </form>
      <?php if (!empty($loginError)): ?><p class="error"><?= htmlspecialchars($loginError, ENT_QUOTES) ?></p><?php endif; ?>
    </div>
    </body>
    </html>
    <?php
    exit;
}

/* ---------- authenticated area ---------- */

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'save') {
    if (!csrf_check($_POST['csrf'] ?? '')) {
        flash('error', 'Сессия истекла, попробуйте ещё раз.');
        redirect('/blog/admin/');
    }
    $posts = load_posts();
    $originalSlug = trim($_POST['original_slug'] ?? '');
    $slug = strtolower(trim($_POST['slug'] ?? ''));
    $title = trim($_POST['title'] ?? '');
    $excerpt = trim($_POST['excerpt'] ?? '');
    $tag = trim($_POST['tag'] ?? '');
    $date = trim($_POST['date'] ?? '');
    $readTime = trim($_POST['readTime'] ?? '');
    $body = trim(str_replace("\r\n", "\n", $_POST['body'] ?? ''));

    $err = null;
    if (!slugify_check($slug)) $err = 'Slug: только латиница в нижнем регистре, цифры и дефисы (например, moy-post).';
    elseif ($title === '' || $excerpt === '' || $tag === '' || $readTime === '' || $body === '') $err = 'Заполните все поля.';
    elseif (!DateTime::createFromFormat('Y-m-d', $date)) $err = 'Дата должна быть в формате ГГГГ-ММ-ДД.';
    else {
        foreach ($posts as $p) {
            if ($p['slug'] === $slug && $slug !== $originalSlug) { $err = 'Такой slug уже занят другой статьёй.'; break; }
        }
    }

    if ($err) {
        flash('error', $err);
        $qs = $originalSlug ? ('?action=edit&slug=' . urlencode($originalSlug)) : '?action=new';
        redirect('/blog/admin/' . $qs);
    }

    $post = compact('slug', 'title', 'excerpt', 'tag', 'date', 'readTime', 'body');

    $found = false;
    foreach ($posts as &$p) {
        if ($p['slug'] === $originalSlug) { $p = $post; $found = true; break; }
    }
    unset($p);
    if (!$found) $posts[] = $post;

    if ($originalSlug && $originalSlug !== $slug) {
        @unlink($blogDir . '/' . $originalSlug . '.html');
    }

    file_put_contents($blogDir . '/' . $slug . '.html', render_article_page($post));
    save_posts($posts);

    flash('ok', 'Статья сохранена: /blog/' . $slug);
    redirect('/blog/admin/');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action === 'delete') {
    if (!csrf_check($_POST['csrf'] ?? '')) {
        flash('error', 'Сессия истекла, попробуйте ещё раз.');
        redirect('/blog/admin/');
    }
    $slug = $_POST['slug'] ?? '';
    $posts = array_values(array_filter(load_posts(), fn($p) => $p['slug'] !== $slug));
    save_posts($posts);
    @unlink($blogDir . '/' . $slug . '.html');
    flash('ok', 'Статья удалена.');
    redirect('/blog/admin/');
}

$posts = load_posts();
usort($posts, fn($a, $b) => strcmp($b['date'], $a['date']));

$editingPost = null;
if ($action === 'edit') {
    $slug = $_GET['slug'] ?? '';
    foreach ($posts as $p) { if ($p['slug'] === $slug) { $editingPost = $p; break; } }
    if (!$editingPost) { flash('error', 'Статья не найдена.'); redirect('/blog/admin/'); }
}
$showForm = $action === 'new' || $action === 'edit';
$flash = take_flash();
$csrf = csrf_token();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title><?= $showForm ? ($editingPost ? 'Редактирование статьи' : 'Новая статья') : 'Блог — админка' ?></title>
<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@700;900&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{--accent:#D3FF33;--indigo:#9F96FF;}
  *{box-sizing:border-box;}
  body{background:#020202;color:#fff;font-family:'Manrope',sans-serif;margin:0;padding:32px 24px 80px;}
  .wrap{max-width:820px;margin:0 auto;}
  h1{font-family:'Nunito Sans',sans-serif;font-weight:900;text-transform:uppercase;font-size:1.4rem;margin:0;}
  .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;flex-wrap:wrap;gap:12px;}
  .btn{display:inline-block;background:var(--accent);color:#000;border:none;padding:11px 22px;border-radius:999px;font-weight:700;text-decoration:none;font-size:0.85rem;cursor:pointer;}
  .btn.ghost{background:transparent;color:#aaa;border:1px solid #333;}
  .btn.danger{background:#3a1414;color:#ff8080;border:1px solid #5a2020;}
  .flash{padding:14px 18px;border-radius:8px;margin-bottom:24px;font-size:0.9rem;}
  .flash.ok{background:rgba(211,255,51,0.1);border:1px solid rgba(211,255,51,0.3);color:var(--accent);}
  .flash.error{background:rgba(255,80,80,0.1);border:1px solid rgba(255,80,80,0.3);color:#ff8080;}
  table{width:100%;border-collapse:collapse;font-size:0.88rem;}
  th,td{text-align:left;padding:12px 10px;border-bottom:1px solid #1a1a1a;}
  th{color:#666;font-weight:600;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.5px;}
  td.actions{white-space:nowrap;text-align:right;}
  td.actions a, td.actions button{margin-left:10px;font-size:0.82rem;background:none;border:none;color:#888;cursor:pointer;text-decoration:none;font-family:inherit;}
  td.actions a:hover{color:var(--accent);}
  td.actions button.del:hover{color:#ff6b6b;}
  label{display:block;font-size:0.8rem;color:#aaa;margin:16px 0 6px;}
  input,textarea{width:100%;box-sizing:border-box;background:#111;border:1px solid #333;color:#fff;padding:12px 14px;border-radius:8px;font-size:0.92rem;font-family:inherit;}
  input:focus,textarea:focus{outline:none;border-color:var(--accent);}
  textarea{min-height:340px;line-height:1.6;font-family:ui-monospace,monospace;font-size:0.85rem;}
  .row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .hint{color:#666;font-size:0.78rem;margin-top:6px;line-height:1.5;}
  .form-actions{margin-top:28px;display:flex;gap:12px;}
</style>
</head>
<body>
<div class="wrap">
  <div class="top">
    <h1>Блог — админка</h1>
    <div>
      <?php if ($showForm): ?>
        <a href="/blog/admin/" class="btn ghost">← К списку</a>
      <?php else: ?>
        <a href="/blog/admin/?action=new" class="btn">+ Новая статья</a>
        <a href="/blog/admin/?action=logout" class="btn ghost">Выйти</a>
      <?php endif; ?>
    </div>
  </div>

  <?php if ($flash): ?>
    <div class="flash <?= htmlspecialchars($flash['type'], ENT_QUOTES) ?>"><?= htmlspecialchars($flash['msg'], ENT_QUOTES) ?></div>
  <?php endif; ?>

  <?php if ($showForm): ?>
    <form method="post" action="/blog/admin/?action=save">
      <input type="hidden" name="csrf" value="<?= htmlspecialchars($csrf, ENT_QUOTES) ?>">
      <input type="hidden" name="original_slug" value="<?= htmlspecialchars($editingPost['slug'] ?? '', ENT_QUOTES) ?>">

      <label for="title">Заголовок</label>
      <input id="title" name="title" value="<?= htmlspecialchars($editingPost['title'] ?? '', ENT_QUOTES) ?>" required oninput="autoSlug()">

      <label for="slug">Slug (в адресе /blog/<b>slug</b>)</label>
      <input id="slug" name="slug" value="<?= htmlspecialchars($editingPost['slug'] ?? '', ENT_QUOTES) ?>" required pattern="[a-z0-9]+(-[a-z0-9]+)*">
      <p class="hint">Латиница, нижний регистр, дефисы вместо пробелов. Подставляется автоматически из заголовка — можно поправить руками.</p>

      <label for="excerpt">Краткое описание (для карточки и превью в поиске)</label>
      <textarea id="excerpt" name="excerpt" style="min-height:70px;font-family:inherit;font-size:0.92rem;" required><?= htmlspecialchars($editingPost['excerpt'] ?? '', ENT_QUOTES) ?></textarea>

      <div class="row">
        <div>
          <label for="tag">Тег</label>
          <input id="tag" name="tag" value="<?= htmlspecialchars($editingPost['tag'] ?? '', ENT_QUOTES) ?>" required>
        </div>
        <div>
          <label for="readTime">Время чтения</label>
          <input id="readTime" name="readTime" value="<?= htmlspecialchars($editingPost['readTime'] ?? '5 мин', ENT_QUOTES) ?>" required>
        </div>
      </div>

      <label for="date">Дата публикации</label>
      <input id="date" name="date" type="date" value="<?= htmlspecialchars($editingPost['date'] ?? date('Y-m-d'), ENT_QUOTES) ?>" required>
      <p class="hint">Определяет порядок на /blog — новее дата, выше в списке.</p>

      <label for="body">Текст статьи</label>
      <textarea id="body" name="body" required><?= htmlspecialchars($editingPost['body'] ?? '', ENT_QUOTES) ?></textarea>
      <p class="hint">
        Пустая строка = новый абзац · <code>## Заголовок</code> = подзаголовок ·
        <code>- пункт</code> (несколько строк подряд) = список · <code>&gt; текст</code> = цитата-врезка ·
        <code>**жирный**</code> · <code>[текст](/contacts)</code> = ссылка.
      </p>

      <div class="form-actions">
        <button type="submit" class="btn">Сохранить и опубликовать</button>
        <a href="/blog/admin/" class="btn ghost">Отмена</a>
      </div>
    </form>

    <script>
      function transliterate(s) {
        var map = {а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya'};
        return s.toLowerCase().split('').map(function(ch){ return map[ch] !== undefined ? map[ch] : ch; }).join('');
      }
      var slugTouched = <?= $editingPost ? 'true' : 'false' ?>;
      document.getElementById('slug').addEventListener('input', function () { slugTouched = true; });
      function autoSlug() {
        if (slugTouched) return;
        var t = transliterate(document.getElementById('title').value);
        document.getElementById('slug').value = t.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      }
    </script>
  <?php else: ?>
    <table>
      <tr><th>Статья</th><th>Дата</th><th>Тег</th><th></th></tr>
      <?php if (!$posts): ?>
        <tr><td colspan="4" style="color:#666;">Пока нет статей.</td></tr>
      <?php endif; ?>
      <?php foreach ($posts as $p): ?>
        <tr>
          <td><?= htmlspecialchars($p['title'], ENT_QUOTES) ?></td>
          <td><?= htmlspecialchars($p['date'], ENT_QUOTES) ?></td>
          <td><?= htmlspecialchars($p['tag'], ENT_QUOTES) ?></td>
          <td class="actions">
            <a href="/blog/<?= urlencode($p['slug']) ?>" target="_blank">Открыть</a>
            <a href="/blog/admin/?action=edit&slug=<?= urlencode($p['slug']) ?>">Править</a>
            <form method="post" action="/blog/admin/?action=delete" style="display:inline;" onsubmit="return confirm('Удалить статью «<?= htmlspecialchars(addslashes($p['title']), ENT_QUOTES) ?>»?');">
              <input type="hidden" name="csrf" value="<?= htmlspecialchars($csrf, ENT_QUOTES) ?>">
              <input type="hidden" name="slug" value="<?= htmlspecialchars($p['slug'], ENT_QUOTES) ?>">
              <button type="submit" class="del">Удалить</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
    </table>
  <?php endif; ?>
</div>
</body>
</html>
