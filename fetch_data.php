<?php

header('Content-Type: application/json');

$servername = "localhost";
$username = "id21615000_root";
$password = "12345@Qwerty";
$dbname = "id21615000_ss";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$month = isset($_GET['month']) ? intval($_GET['month']) : date('m');

$sql = "SELECT Date, Amount FROM donations WHERE MONTH(Date) = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $month);
$stmt->execute();
$result = $stmt->get_result();

$data = [];
while($row = $result->fetch_assoc()) {
    $row['Amount'] = ltrim($row['Amount'], '$'); 
    $data[] = $row;
}

echo json_encode($data);

$conn->close();
?>
