<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$sem_id   = $data['sem_id'] ?? null;
$sem_name = $data['sem_name'] ?? null;
$year_id  = $data['year_id'] ?? null;

if (!$sem_id || !$sem_name || !$year_id) {
    echo json_encode(['success' => false, 'message' => 'Semester ID, name, and Year are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE semester_tbl SET sem_name = ?, year_id = ? WHERE sem_id = ?");
    $stmt->execute([$sem_name, $year_id, $sem_id]);

    echo json_encode(['success' => true, 'message' => 'Semester updated successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
