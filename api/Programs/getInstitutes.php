<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

try {
    $stmt = $pdo->query("SELECT ins_id, ins_name FROM institute_tbl");
    $institutes = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $institutes]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
