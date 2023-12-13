<?php

include 'db_connect.php'; 

header('Content-Type: application/json');

$sql = "SELECT Date, SUM(Amount) AS TotalAmount FROM donations GROUP BY Date";

$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = [
            'Date' => $row['Date'],
            'TotalAmount' => $row['TotalAmount']
        ];
    }
} else {
    echo "0 results";
}

echo json_encode($data);

$conn->close();
?>
