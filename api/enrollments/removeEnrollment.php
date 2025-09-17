<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);
$load_id = $data['load_id'] ?? null;

if (!$load_id) {
    echo json_encode(['success' => false, 'message' => 'Load ID is required']);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM student_load WHERE load_id = ?");
    $stmt->execute([$load_id]);

    echo json_encode(['success' => true, 'message' => 'Enrollment removed successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
