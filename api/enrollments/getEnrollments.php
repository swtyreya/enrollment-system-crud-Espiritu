<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

try {
    $stmt = $pdo->query("
    SELECT sl.load_id, 
           s.stud_id, s.firstName, s.middleName, s.lastName,
           sub.subject_id, sub.subject_name, sub.sub_code
    FROM student_load sl
    JOIN student_tbl s ON sl.stud_id = s.stud_id
    JOIN subject_tbl sub ON sl.subject_id = sub.subject_id
");
    $enrollments = $stmt->fetchAll();

    echo json_encode(['success' => true, 'data' => $enrollments]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
