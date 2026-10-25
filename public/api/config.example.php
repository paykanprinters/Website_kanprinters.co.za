<?php
// Copy to config.php on the server (public_html/api/config.php). config.php is gitignored.
return [
    'to'   => 'orders@kanprinters.co.za',      // TODO: inbox that receives form submissions
    'from' => 'no-reply@kanprinters.co.za',    // must be a mailbox/domain on this cPanel host (helps SPF/DMARC)
    'max_file_bytes'  => 10 * 1024 * 1024,     // per file
    'max_total_bytes' => 20 * 1024 * 1024,     // all files combined
    'max_files'       => 5,
];
