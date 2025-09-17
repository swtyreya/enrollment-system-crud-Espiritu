<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$year_from = $data['year_from'] ?? null;
$year_to   = $data['year_to'] ?? null;

if (!$year_from || !$year_to) {
    echo json_encode(['success' => false, 'message' => 'Both Year From and Year To are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO year_tbl (year_from, year_to) VALUES (?, ?)");
    $stmt->execute([$year_from, $year_to]);

    echo json_encode(['success' => true, 'message' => 'Year added successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
