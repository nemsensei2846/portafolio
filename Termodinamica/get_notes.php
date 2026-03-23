<?php
header('Content-Type: application/json');

$notes_dir = 'Apuntes/';
$notes = [];

if (file_exists($notes_dir) && is_dir($notes_dir)) {
    $files = scandir($notes_dir);
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $file_path = $notes_dir . $file;
            $notes[] = [
                "name" => $file,
                "url" => $file_path,
                "size" => file_exists($file_path) ? round(filesize($file_path) / 1024, 2) . " KB" : "Unknown"
            ];
        }
    }
    echo json_encode([
        "status" => "success",
        "notes" => $notes,
        "count" => count($notes)
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "La carpeta 'Apuntes/' no existe en el servidor. Ruta buscada: " . realpath($notes_dir)
    ]);
}
?>