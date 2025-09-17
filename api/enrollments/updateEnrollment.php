<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);
$load_id = $data['load_id'] ?? null;
$subject_id = $data['subject_id'] ?? null;

if (!$load_id || !$subject_id) {
    echo json_encode(['success' => false, 'message' => 'Load ID and Subject are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE student_load SET subject_id = ? WHERE load_id = ?");
    $stmt->execute([$subject_id, $load_id]);

    echo json_encode(['success' => true, 'message' => 'Enrollment updated successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
