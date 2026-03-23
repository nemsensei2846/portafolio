<?php
header('Content-Type: application/json');

$notes_dir = 'Apuntes/';
$notes = [];

if (file_exists($notes_dir) && is_dir($notes_dir)) {
    $files = scandir($notes_dir);
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $notes[] = [
                "name" => $file,
                "url" => $notes_dir . $file,
                "size" => round(filesize($notes_dir . $file) / 1024, 2) . " KB"
            ];
        }
    }
}

echo json_encode([
    "status" => "success",
    "notes" => $notes
]);
?>