<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Edit Student</title>
    <style>
        :root { --bg: #f3f4f6; --primary: #4f46e5; --text: #1f2937; --card-bg: #ffffff; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: var(--bg); color: var(--text); padding: 20px; }
        .nav { display: flex; gap: 15px; margin-bottom: 20px; }
        .nav a { padding: 10px 20px; background: var(--card-bg); text-decoration: none; color: var(--text); border-radius: 8px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: 0.3s; }
        .container { max-width: 600px; margin: auto; background: var(--card-bg); padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        input { width: 100%; padding: 10px; margin: 8px 0; border-radius: 6px; border: 1px solid #d1d5db; box-sizing: border-box; }
        button { width: 100%; padding: 12px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px; transition: 0.3s; }
        button:hover { background: #059669; }
        .back-btn { display: inline-block; margin-top: 15px; text-align: center; color: var(--primary); text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>

<div class="container">
    <h2>Edit Student</h2>

    <?php
    if (!isset($_GET['id'])) {
        header("Location: index.php");
        exit();
    }
    $id = intval($_GET['id']);

    if (isset($_POST['update'])) {
        $fname = $conn->real_escape_string($_POST['fname']);
        $lname = $conn->real_escape_string($_POST['lname']);
        $roll = $conn->real_escape_string($_POST['roll']);
        $contact = $conn->real_escape_string($_POST['contact']);

        $sql = "UPDATE students SET first_name='$fname', last_name='$lname', roll_no='$roll', contact='$contact' WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            echo "<script>alert('Student updated successfully!'); window.location.href='index.php';</script>";
        } else {
            echo "<p style='color:red;'>Error updating record: " . $conn->error . "</p>";
        }
    }

    $result = $conn->query("SELECT * FROM students WHERE id=$id");
    if ($result->num_rows == 0) {
        die("Student not found.");
    }
    $student = $result->fetch_assoc();
    ?>

    <form method="POST">
        <label>First Name</label>
        <input type="text" name="fname" value="<?php echo htmlspecialchars($student['first_name']); ?>" required>
        
        <label>Last Name</label>
        <input type="text" name="lname" value="<?php echo htmlspecialchars($student['last_name']); ?>" required>
        
        <label>Roll No / ID</label>
        <input type="text" name="roll" value="<?php echo htmlspecialchars($student['roll_no']); ?>" required>
        
        <label>Contact Number</label>
        <input type="text" name="contact" value="<?php echo htmlspecialchars($student['contact']); ?>" required>
        
        <button type="submit" name="update">Update Student</button>
    </form>
    <a href="index.php" class="back-btn">← Back to Dashboard</a>
</div>

</body>
</html>
