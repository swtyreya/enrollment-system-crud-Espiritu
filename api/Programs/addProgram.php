<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = trim($data['program_name'] ?? '');
$ins_id = $data['ins_id'] ?? null;

if (!$name || !$ins_id) {
    echo json_encode(['success' => false, 'message' => 'Program name and Institute are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO program_tbl (program_name, ins_id) VALUES (?, ?)");
    $stmt->execute([$name, $ins_id]);

    echo json_encode(['success' => true, 'message' => 'Program added successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
