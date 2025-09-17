<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$year_id = $data['year_id'] ?? null;

if (!$year_id) {
    echo json_encode(['success' => false, 'message' => 'Year ID is required']);
    exit;
}

try {
    // prevent delete if semesters exist
    $check = $pdo->prepare("SELECT COUNT(*) FROM semester_tbl WHERE year_id = ?");
    $check->execute([$year_id]);
    if ($check->fetchColumn() > 0) {
        echo json_encode(['success' => false, 'message' => 'Cannot delete year with existing semesters']);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM year_tbl WHERE year_id = ?");
    $stmt->execute([$year_id]);

    echo json_encode(['success' => true, 'message' => 'Year deleted successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
