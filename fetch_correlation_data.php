<?php

include 'db_connect.php'; 

header('Content-Type: application/json');

$sql = "SELECT Category, SUM(Amount) AS TotalAmount FROM donations GROUP BY Category";

$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = [
            'Category' => $row['Category'],
            'TotalAmount' => $row['Amount']
        ];
    }
} else {
    echo "0 results";
}

echo json_encode($data);

$conn->close();
?>
