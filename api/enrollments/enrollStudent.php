<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);
$stud_id = $data['stud_id'] ?? null;
$subject_id = $data['subject_id'] ?? null;

if (!$stud_id || !$subject_id) {
    echo json_encode(['success' => false, 'message' => 'Student and Subject are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO student_load (stud_id, subject_id) VALUES (?, ?)");
    $stmt->execute([$stud_id, $subject_id]);

    echo json_encode(['success' => true, 'message' => 'Student enrolled successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
