<?php
/**
 * Одноразовая настройка логина/пароля для админки блога.
 *
 * Открыть один раз в браузере после загрузки на сервер: /blog/admin/setup.php
 * Задать логин и пароль → скрипт создаст config.php рядом с собой.
 * После этого файл сам откажется работать повторно (см. проверку ниже) —
 * удалять его необязательно, но можно, если хочется убрать лишний файл.
 */

define('BLOG_ADMIN_BOOT', true);

$configPath = __DIR__ . '/config.php';
$alreadyConfigured = file_exists($configPath);

$error = '';
$done = false;

if (!$alreadyConfigured && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = (string) ($_POST['password'] ?? '');
    $password2 = (string) ($_POST['password2'] ?? '');

    if ($username === '' || !preg_match('/^[a-zA-Z0-9_.-]{3,40}$/', $username)) {
        $error = 'Логин: 3–40 символов, латиница/цифры/._- без пробелов.';
    } elseif (strlen($password) < 8) {
        $error = 'Пароль должен быть не короче 8 символов.';
    } elseif ($password !== $password2) {
        $error = 'Пароли не совпадают.';
    } else {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $php = "<?php\n" .
            "defined('BLOG_ADMIN_BOOT') or die('Direct access not permitted');\n\n" .
            "const ADMIN_USERNAME = " . var_export($username, true) . ";\n" .
            "const ADMIN_PASSWORD_HASH = " . var_export($hash, true) . ";\n";
        if (file_put_contents($configPath, $php) === false) {
            $error = 'Не удалось записать config.php — проверьте права на запись в папку blog/admin/.';
        } else {
            @chmod($configPath, 0600);
            $done = true;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Настройка админки блога</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@700;900&family=Manrope:wght@400;600&display=swap" rel="stylesheet">
<style>
  body{background:#020202;color:#fff;font-family:'Manrope',sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:24px;}
  .box{max-width:420px;width:100%;}
  h1{font-family:'Nunito Sans',sans-serif;font-weight:900;text-transform:uppercase;font-size:1.3rem;margin:0 0 20px;}
  p{color:#999;font-size:0.9rem;line-height:1.6;}
  label{display:block;font-size:0.8rem;color:#aaa;margin:16px 0 6px;}
  input{width:100%;box-sizing:border-box;background:#111;border:1px solid #333;color:#fff;padding:12px 14px;border-radius:8px;font-size:0.95rem;font-family:inherit;}
  input:focus{outline:none;border-color:#D3FF33;}
  button{margin-top:24px;width:100%;background:#D3FF33;color:#000;border:none;padding:14px;border-radius:999px;font-weight:900;text-transform:uppercase;letter-spacing:1px;font-size:0.85rem;cursor:pointer;}
  .error{color:#ff6b6b;font-size:0.85rem;margin-top:12px;}
  .ok{color:#D3FF33;}
  a{color:#D3FF33;}
</style>
</head>
<body>
<div class="box">
<h1>Настройка админки блога</h1>
<?php if ($alreadyConfigured): ?>
  <p class="ok">Уже настроено. Логин и пароль заданы ранее.</p>
  <p>Если нужно сменить пароль — удалите файл <code>blog/admin/config.php</code> на сервере и откройте эту страницу снова.</p>
  <p><a href="/blog/admin/">Перейти к входу →</a></p>
<?php elseif ($done): ?>
  <p class="ok">Готово! Логин и пароль сохранены.</p>
  <p>Можно (не обязательно) удалить <code>setup.php</code> с сервера — он больше не нужен.</p>
  <p><a href="/blog/admin/">Войти в админку →</a></p>
<?php else: ?>
  <p>Придумайте логин и пароль для входа в /blog/admin/. Это разовая настройка — сохранится только на этом сервере.</p>
  <form method="post">
    <label for="username">Логин</label>
    <input id="username" name="username" value="<?= htmlspecialchars($_POST['username'] ?? 'editor', ENT_QUOTES) ?>" required>
    <label for="password">Пароль (мин. 8 символов)</label>
    <input id="password" name="password" type="password" required minlength="8">
    <label for="password2">Повторите пароль</label>
    <input id="password2" name="password2" type="password" required minlength="8">
    <button type="submit">Создать доступ</button>
  </form>
  <?php if ($error): ?><p class="error"><?= htmlspecialchars($error, ENT_QUOTES) ?></p><?php endif; ?>
<?php endif; ?>
</div>
</body>
</html>
