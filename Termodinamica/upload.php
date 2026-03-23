<?php
header('Content-Type: application/json');

// Configuración de subida
$upload_dir = 'uploads/';
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

// Lógica de subida
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['documento']) && $_FILES['documento']['error'] === UPLOAD_ERR_OK) {
        $file_name = $_FILES['documento']['name'];
        $tmp_name = $_FILES['documento']['tmp_name'];
        $file_size = $_FILES['documento']['size'];
        $target_file = $upload_dir . basename($file_name);

        // Seguridad básica (opcional: limitar tipos de archivo)
        // $allowed_types = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        // $file_type = mime_content_type($tmp_name);
        
        if (move_uploaded_file($tmp_name, $target_file)) {
            echo json_encode([
                "status" => "success",
                "message" => "Archivo inyectado correctamente en el servidor",
                "path" => "Termodinamica/" . $target_file,
                "size" => round($file_size / 1024, 2) . " KB"
            ]);
            exit;
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Fallo en la transferencia física del archivo"
            ]);
            exit;
        }
    } else {
        $error_code = $_FILES['documento']['error'] ?? 'No se recibió ningún archivo';
        echo json_encode([
            "status" => "error",
            "message" => "Error en la carga: " . $error_code
        ]);
        exit;
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Acceso no autorizado al nodo de subida"
    ]);
    exit;
}
?>