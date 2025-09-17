<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$sem_name = $data['sem_name'] ?? null;
$year_id  = $data['year_id'] ?? null;

if (!$sem_name || !$year_id) {
    echo json_encode(['success' => false, 'message' => 'Semester name and Year are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO semester_tbl (sem_name, year_id) VALUES (?, ?)");
    $stmt->execute([$sem_name, $year_id]);

    echo json_encode(['success' => true, 'message' => 'Semester added successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
