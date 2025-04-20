<?php
// Configuración de CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');

// API externa con token
$apiUrl = 'https://ciisa.coningenio.cl/v1/about-us/';
$opts = [
    "http" => [
        "method" => "GET",
        "header" => "Authorization: Bearer ciisa\r\n"
    ]
];

$context = stream_context_create($opts);
$response = @file_get_contents($apiUrl, false, $context);

// Manejo de error
if ($response === FALSE) {
    http_response_code(500);
    echo json_encode(["error" => "No se pudo obtener la respuesta de la API externa."]);
    exit;
}

echo $response;
