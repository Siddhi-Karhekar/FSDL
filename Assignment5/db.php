<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "fsd_lab";
$port = 3306; // Add this line

// Add $port as the 5th argument
$conn = new mysqli($host, $user, $pass, $dbname, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>