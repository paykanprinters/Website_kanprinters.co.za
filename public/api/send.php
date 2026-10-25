<?php
/**
 * Kan Screenprinters form mailer. Receives POSTs from contact / quote / gift forms.
 * Config lives in config.php (same folder, NOT in git) — copy config.example.php.
 */
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $code, bool $ok, string $msg): void {
    http_response_code($code);
    echo json_encode(['ok' => $ok, 'message' => $msg]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') respond(405, false, 'Method not allowed.');

$cfgFile = __DIR__ . '/config.php';
if (!is_file($cfgFile)) respond(500, false, 'Form not configured.');
$cfg = require $cfgFile;

$to        = $cfg['to'] ?? '';
$from      = $cfg['from'] ?? '';
$maxBytes  = (int)($cfg['max_file_bytes'] ?? 10 * 1024 * 1024);
$maxFiles  = (int)($cfg['max_files'] ?? 5);
$maxTotal  = (int)($cfg['max_total_bytes'] ?? 20 * 1024 * 1024);
if (!filter_var($to, FILTER_VALIDATE_EMAIL) || !filter_var($from, FILTER_VALIDATE_EMAIL)) respond(500, false, 'Form not configured.');

// Honeypot: bots fill hidden "website" field. Pretend success.
if (!empty($_POST['website'])) respond(200, true, 'Thanks! We’ll be in touch shortly.');

// Basic rate limit per IP (30s) using temp files.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rl = sys_get_temp_dir() . '/kp_rl_' . md5($ip);
if (is_file($rl) && time() - (int)@filemtime($rl) < 30) respond(429, false, 'Please wait a moment before sending again.');
@touch($rl);

$clean = static function ($v, int $max = 2000): string {
    $v = is_string($v) ? $v : '';
    $v = str_replace(["\r", "\0"], '', trim($v));
    return mb_substr($v, 0, $max);
};
$oneLine = static fn($v, int $max = 200): string => str_replace("\n", ' ', $clean($v, $max));

$types  = ['contact' => 'Contact message', 'quote' => 'Bulk quote request', 'gift' => 'Gift order request'];
$type   = $_POST['form_type'] ?? '';
if (!isset($types[$type])) respond(400, false, 'Unknown form.');

$name  = $oneLine($_POST['name'] ?? '');
$phone = $oneLine($_POST['phone'] ?? '', 40);
$email = $oneLine($_POST['email'] ?? '', 200);
if ($name === '' || $phone === '') respond(422, false, 'Please fill in your name and phone number.');
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) respond(422, false, 'Please enter a valid email address.');
if ($type === 'quote' && $email === '') respond(422, false, 'Please enter your email address.');

$fields = [
    'contact' => ['message' => 'Message'],
    'quote'   => ['customer_type' => 'Customer type', 'method' => 'Print method', 'item' => 'Item', 'quantity' => 'Quantity', 'deadline' => 'Deadline', 'organisation' => 'Organisation', 'message' => 'Details'],
    'gift'    => ['occasion' => 'Occasion', 'product' => 'Product', 'names_dates' => 'Names & dates', 'deadline' => 'Needed by', 'message' => 'Idea'],
][$type];

$body = $types[$type] . "\n" . str_repeat('=', 40) . "\n";
$body .= "Name: $name\nPhone: $phone\nEmail: " . ($email ?: '-') . "\n";
foreach ($fields as $k => $label) $body .= "$label: " . ($clean($_POST[$k] ?? '') ?: '-') . "\n";
$body .= "\nSent " . date('Y-m-d H:i') . " from IP $ip\n";

// Files
$allowed = [
    'jpg' => ['image/jpeg'], 'jpeg' => ['image/jpeg'], 'png' => ['image/png'], 'webp' => ['image/webp'],
    'heic' => ['image/heic', 'image/heif', 'application/octet-stream'],
    'pdf' => ['application/pdf'], 'svg' => ['image/svg+xml', 'text/xml', 'text/plain', 'application/xml'],
    'ai' => ['application/pdf', 'application/postscript', 'application/illustrator'],
    'eps' => ['application/postscript', 'image/x-eps', 'application/octet-stream'],
    'psd' => ['image/vnd.adobe.photoshop', 'application/octet-stream', 'image/x-photoshop'],
    'cdr' => ['application/x-cdr', 'application/coreldraw', 'application/vnd.corel-draw', 'application/octet-stream', 'application/zip', 'application/x-riff'],
];
$attachments = [];
if ($type !== 'contact' && !empty($_FILES['files']) && is_array($_FILES['files']['name'])) {
    $n = count($_FILES['files']['name']);
    $total = 0;
    $finfo = function_exists('finfo_open') ? finfo_open(FILEINFO_MIME_TYPE) : null;
    for ($i = 0; $i < $n; $i++) {
        $err = $_FILES['files']['error'][$i];
        if ($err === UPLOAD_ERR_NO_FILE) continue;
        if (count($attachments) >= $maxFiles) respond(422, false, "Please upload no more than $maxFiles files.");
        if ($err === UPLOAD_ERR_INI_SIZE || $err === UPLOAD_ERR_FORM_SIZE) respond(422, false, 'A file is too large.');
        if ($err !== UPLOAD_ERR_OK) respond(422, false, 'A file failed to upload.');
        $tmp  = $_FILES['files']['tmp_name'][$i];
        $size = (int)$_FILES['files']['size'][$i];
        $orig = basename((string)$_FILES['files']['name'][$i]);
        $ext  = strtolower(pathinfo($orig, PATHINFO_EXTENSION));
        if (!is_uploaded_file($tmp)) respond(422, false, 'Invalid upload.');
        if ($size <= 0 || $size > $maxBytes) respond(422, false, 'Each file must be under ' . round($maxBytes / 1048576) . ' MB.');
        $total += $size;
        if ($total > $maxTotal) respond(422, false, 'Files are too large in total. Please WhatsApp or email large files.');
        if (!isset($allowed[$ext])) respond(422, false, "File type .$ext is not allowed.");
        $mime = $finfo ? (string)finfo_file($finfo, $tmp) : 'application/octet-stream';
        if (!in_array($mime, $allowed[$ext], true)) respond(422, false, "File $orig doesn't look like a valid .$ext file.");
        $safe = preg_replace('/[^A-Za-z0-9._-]/', '_', $orig) ?: "file$i.$ext";
        $attachments[] = ['name' => $safe, 'mime' => $mime, 'data' => file_get_contents($tmp)];
    }
}

// Build MIME message
$subject = '[Website] ' . $types[$type] . ' from ' . $name;
$subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$boundary = 'kp_' . bin2hex(random_bytes(12));
$headers  = "From: Kan Screenprinters Website <$from>\r\n";
if ($email !== '') $headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$msg  = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n";
$msg .= chunk_split(base64_encode($body)) . "\r\n";
foreach ($attachments as $a) {
    $msg .= "--$boundary\r\nContent-Type: {$a['mime']}; name=\"{$a['name']}\"\r\n";
    $msg .= "Content-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename=\"{$a['name']}\"\r\n\r\n";
    $msg .= chunk_split(base64_encode($a['data'])) . "\r\n";
}
$msg .= "--$boundary--\r\n";

$ok = @mail($to, $subject, $msg, $headers, '-f' . $from);
if (!$ok) respond(500, false, 'Sorry, we couldn’t send your message.');
respond(200, true, $type === 'gift' ? 'Thanks! We’ll WhatsApp or email you a proof soon.' : 'Thanks! We’ll be in touch shortly.');
