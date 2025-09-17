<?php 
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

try {
    $stmt = $pdo->query("
        SELECT s.stud_id,
               CONCAT(s.firstName, ' ', s.middleName, ' ', s.lastName) AS fullName
        FROM student_tbl s
    ");
    $students = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $students]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
