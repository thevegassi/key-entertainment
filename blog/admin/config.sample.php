<?php
/**
 * Образец конфига админки блога — НЕ используется напрямую.
 *
 * Реальный config.php создаётся автоматически скриптом setup.php прямо
 * на сервере при первом заходе в /blog/admin/setup.php — там вы сами
 * придумываете логин и пароль. Этот файл — только для справки о том,
 * что внутри, и в .gitignore (реальный config.php никогда не попадает
 * в git, чтобы пароль не утёк в репозиторий).
 */

defined('BLOG_ADMIN_BOOT') or die('Direct access not permitted');

// Логин редактора.
const ADMIN_USERNAME = 'editor';

// Хэш пароля — НИКОГДА не храните пароль открытым текстом.
// Получить хэш для своего пароля можно так (одноразово, из терминала):
//   php -r "echo password_hash('ваш-пароль', PASSWORD_DEFAULT), \"\n\";"
// Но проще всего — просто открыть /blog/admin/setup.php в браузере,
// он сгенерирует хэш и создаст этот файл сам.
const ADMIN_PASSWORD_HASH = '$2y$10$REPLACE_WITH_REAL_HASH_FROM_SETUP_PHP';
