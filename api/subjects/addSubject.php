<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$sub_code = $data['sub_code'] ?? null;
$subject_name = $data['subject_name'] ?? null;
$units    = $data['units'] ?? null;
$sem_id   = $data['sem_id'] ?? null;

if (!$sub_code || !$subject_name || !$units || !$sem_id) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO subject_tbl (sub_code, subject_name, units, sem_id) VALUES (?, ?, ?, ?)");
    $stmt->execute([$sub_code, $subject_name, $units, $sem_id]);

    echo json_encode(['success' => true, 'message' => 'Subject added successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
