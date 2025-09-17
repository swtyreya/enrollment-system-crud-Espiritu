<?php
header('Content-Type: application/json');
require __DIR__ . '/../db.php';

$data = json_decode(file_get_contents('php://input'), true);

$firstName = trim($data['firstName'] ?? '');
$lastName = trim($data['lastName'] ??'');
$middleName = trim($data['middleName'] ??'');
$program_id = $data['program_id'] ?? null;
$allowance = $data['allowance'] ?? 0;


if (!$firstName || !$middleName || !$lastName || !$program_id) {
    echo json_encode(['success' => false, 'message' => 'Name and Program are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO student_tbl (firstName, middleName, lastName, program_id, allowance) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$firstName, $middleName, $lastName, $program_id, $allowance]);

    echo json_encode(['success' => true, 'message' => 'Student added successfully']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
