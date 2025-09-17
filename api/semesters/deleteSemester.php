<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$sem_id = $data['sem_id'] ?? null;

if (!$sem_id) {
    echo json_encode(['success' => false, 'message' => 'Semester ID is required']);
    exit;
}

try {
    // later pwede kang maglagay ng check kung may enrollment
    $stmt = $pdo->prepare("DELETE FROM semester_tbl WHERE sem_id = ?");
    $stmt->execute([$sem_id]);

    echo json_encode(['success' => true, 'message' => 'Semester deleted successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
