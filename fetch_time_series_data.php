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


$sql = "SELECT DATE_FORMAT(Date, '%Y-%m') AS Month, SUM(Amount) AS TotalAmount FROM donations GROUP BY Month";

$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    echo "0 results";
}

echo json_encode($data);

$conn->close();
?>
