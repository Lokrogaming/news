<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$jsonFile = __DIR__ . "/news.json";
if (file_exists($jsonFile)) {
    echo file_get_contents($jsonFile);
} else {
    echo json_encode(["error" => "news.json not found"]);
}
