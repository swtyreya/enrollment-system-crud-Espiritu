<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$subject_id = $data['subject_id'] ?? null;

if (!$subject_id) {
    echo json_encode(['success' => false, 'message' => 'Subject ID is required']);
    exit;
}

try {
    //  later check if subject has enrollments
   $stmt = $pdo->prepare("DELETE FROM subject_tbl WHERE subject_id = ?");
$stmt->execute([$subject_id]);


    echo json_encode(['success' => true, 'message' => 'Subject deleted successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
