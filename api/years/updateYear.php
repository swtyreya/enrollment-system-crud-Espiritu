<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$year_id   = $data['year_id'] ?? null;
$year_from = $data['year_from'] ?? null;
$year_to   = $data['year_to'] ?? null;

if (!$year_id || !$year_from || !$year_to) {
    echo json_encode(['success' => false, 'message' => 'Year ID, From and To are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE year_tbl SET year_from = ?, year_to = ? WHERE year_id = ?");
    $stmt->execute([$year_from, $year_to, $year_id]);

    echo json_encode(['success' => true, 'message' => 'Year updated successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
