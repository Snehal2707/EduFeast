<?php


$servername = "localhost";
$username = "id21615000_root";
$password = "12345@Qwerty";
$dbname = "id21615000_ss";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
