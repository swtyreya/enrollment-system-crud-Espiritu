<?php 
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

try {
    $stmt = $pdo->query("
        SELECT s.stud_id AS id, s.firstName, s.middleName, s.lastName, p.program_name AS program, s.allowance 
        FROM student_tbl s
        LEFT JOIN program_tbl p ON s.program_id = p.program_id
    ");
    $students = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $students]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
