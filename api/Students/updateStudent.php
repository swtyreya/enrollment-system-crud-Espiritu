<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'] ?? null;
$firstName = trim($data['firstName'] ?? '');
$lastName = trim($data['lastName'] ??'');
$middleName = trim($data['middleName'] ??'');
$program_id = $data['program_id'] ?? null;
$allowance = $data['allowance'] ?? 0;

if (!$id || !$firstName || !$middleName || !$lastName || !$program_id) {
    echo json_encode(['success' => false, 'message' => 'ID, Name, and Program are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE student_tbl SET firstName = ?, middleName = ?, lastName = ?, program_id = ?, allowance = ? WHERE stud_id = ?");
    $stmt->execute([$firstName, $middleName, $lastName, $program_id, $allowance, $id]);

    echo json_encode(['success' => true, 'message' => 'Student updated successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
