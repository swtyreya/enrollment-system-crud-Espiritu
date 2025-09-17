<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['program_id'] ?? null;
$name = trim($data['program_name'] ?? '');
$ins_id = $data['ins_id'] ?? null;

if (!$id || !$name || !$ins_id) {
    echo json_encode(['success' => false, 'message' => 'Program ID, Name, and Institute are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE program_tbl SET program_name = ?, ins_id = ? WHERE program_id = ?");
    $stmt->execute([$name, $ins_id, $id]);

    echo json_encode(['success' => true, 'message' => 'Program updated successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
