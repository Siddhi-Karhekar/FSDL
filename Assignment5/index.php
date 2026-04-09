<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Student Registration System</title>
    <style>
        :root { --bg: #FDF6F0; --pink: #E8A0BF; --blue: #B9D7EA; --text: #4A4A4A; }
        body { font-family: 'Poppins', sans-serif; background: var(--bg); color: var(--text); padding: 40px; }
        .container { max-width: 800px; margin: auto; background: white; padding: 30px; border-radius: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        input { width: 100%; padding: 12px; margin: 8px 0; border-radius: 15px; border: 1px solid #eee; box-sizing: border-box; }
        button { width: 100%; padding: 12px; background: var(--pink); color: white; border: none; border-radius: 15px; cursor: pointer; font-weight: bold; margin-top: 10px; }
        table { width: 100%; margin-top: 30px; border-collapse: collapse; border-radius: 15px; overflow: hidden; }
        th { background: var(--blue); padding: 15px; }
        td { padding: 12px; border-bottom: 1px solid #eee; text-align: center; }
        .msg { text-align: center; padding: 10px; border-radius: 10px; margin-bottom: 20px; }
    </style>
</head>
<body>

<div class="container">
    <h2>Student Registration</h2>

    <?php
    if (isset($_POST['register'])) {
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $roll = $_POST['roll'];
        $pass = $_POST['pass']; // In a real app, use password_hash()
        $contact = $_POST['contact'];

        $sql = "INSERT INTO students (first_name, last_name, roll_no, password, contact) 
                VALUES ('$fname', '$lname', '$roll', '$pass', '$contact')";

        if ($conn->query($sql) === TRUE) {
            echo "<div class='msg' style='background:#d4edda; color:#155724;'>Student Registered Successfully! ✅</div>";
        } else {
            echo "<div class='msg' style='background:#f8d7da; color:#721c24;'>Error: " . $conn->error . "</div>";
        }
    }
    ?>

    <form method="POST">
        <input type="text" name="fname" placeholder="First Name" required>
        <input type="text" name="lname" placeholder="Last Name" required>
        <input type="text" name="roll" placeholder="Roll No / ID" required>
        <input type="password" name="pass" placeholder="Password" required>
        <input type="text" name="contact" placeholder="Contact Number" required>
        <button type="submit" name="register">Register Student</button>
    </form>

    <hr style="margin: 40px 0; border: 0; border-top: 1px solid #eee;">

    <h3>Registered Students</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Contact</th>
        </tr>
        <?php
        $result = $conn->query("SELECT * FROM students");
        while($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td>".$row['first_name']." ".$row['last_name']."</td>
                    <td>".$row['roll_no']."</td>
                    <td>".$row['contact']."</td>
                  </tr>";
        }
        ?>
    </table>
</div>

</body>
</html>