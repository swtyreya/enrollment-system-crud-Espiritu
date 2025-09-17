<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

try {
    $stmt = $pdo->query("
        SELECT p.program_id, p.program_name, p.ins_id, i.ins_name 
        FROM program_tbl p
        LEFT JOIN institute_tbl i ON p.ins_id = i.ins_id
    ");
    $programs = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $programs]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
