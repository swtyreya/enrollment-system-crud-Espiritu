<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

try {
    $stmt = $pdo->query("
        SELECT s.sem_id, s.sem_name, y.year_from, y.year_to, y.year_id
        FROM semester_tbl s
        JOIN year_tbl y ON s.year_id = y.year_id
        ORDER BY y.year_from DESC, s.sem_name ASC
    ");
    $semesters = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $semesters]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
