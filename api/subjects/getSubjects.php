<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

try {
    $stmt = $pdo->query("
        SELECT s.subject_id, s.sub_code, s.subject_name, s.units, 
               sem.sem_id, sem.sem_name, y.year_from, y.year_to
        FROM subject_tbl s
        JOIN semester_tbl sem ON s.sem_id = sem.sem_id
        JOIN year_tbl y ON sem.year_id = y.year_id
        ORDER BY y.year_from DESC, sem.sem_name ASC, s.subject_name ASC
    ");
    $subjects = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $subjects]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
