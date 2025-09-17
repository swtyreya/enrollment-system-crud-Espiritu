<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$subject_id   = $data['subject_id'] ?? null;
$sub_code = $data['sub_code'] ?? null;
$subject_name = $data['subject_name'] ?? null;
$units    = $data['units'] ?? null;
$sem_id   = $data['sem_id'] ?? null;

if (!$subject_id || !$sub_code || !$subject_name || !$units || !$sem_id) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE subject_tbl SET sub_code = ?, subject_name = ?, units = ?, sem_id = ? WHERE subject_id = ?");
    $stmt->execute([$sub_code, $subject_name, $units, $sem_id, $subject_id]);


    echo json_encode(['success' => true, 'message' => 'Subject updated successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
