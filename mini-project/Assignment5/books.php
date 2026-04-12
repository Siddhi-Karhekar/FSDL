<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Library Management System</title>
    <style>
        :root { --bg: #f3f4f6; --primary: #4f46e5; --secondary: #9333ea; --text: #1f2937; --card-bg: #ffffff; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: var(--bg); color: var(--text); padding: 20px; }
        .nav { display: flex; gap: 15px; margin-bottom: 20px; }
        .nav a { padding: 10px 20px; background: var(--card-bg); text-decoration: none; color: var(--text); border-radius: 8px; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: 0.3s; }
        .nav a:hover { transform: translateY(-2px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .nav a.active { background: var(--secondary); color: white; }
        .container { max-width: 900px; margin: auto; background: var(--card-bg); padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        input { width: 100%; padding: 10px; margin: 8px 0; border-radius: 6px; border: 1px solid #d1d5db; box-sizing: border-box; }
        button { width: 100%; padding: 12px; background: var(--secondary); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px; transition: 0.3s; }
        button:hover { background: #7e22ce; }
        table { width: 100%; margin-top: 20px; border-collapse: collapse; }
        th, td { padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: left; }
        th { background: #f9fafb; }
        .action-btn { padding: 6px 12px; border-radius: 4px; text-decoration: none; color: white; font-size: 14px; display: inline-block; transition: 0.3s; }
        .btn-edit { background: #10b981; }
        .btn-edit:hover { background: #059669; }
        .btn-delete { background: #ef4444; }
        .btn-delete:hover { background: #dc2626; }
        .msg { padding: 10px; border-radius: 6px; margin-bottom: 15px; text-align: center; }
        .msg-success { background: #d1fae5; color: #065f46; }
        .msg-error { background: #fee2e2; color: #b91c1c; }
    </style>
</head>
<body>

<div class="container">
    <div class="nav">
        <a href="index.php">Student System</a>
        <a href="books.php" class="active">Library System</a>
    </div>

    <h2>Library Management</h2>

    <?php
    if (isset($_POST['add_book'])) {
        $name = $conn->real_escape_string($_POST['name']);
        $isbn = $conn->real_escape_string($_POST['isbn']);
        $title = $conn->real_escape_string($_POST['title']);
        $author = $conn->real_escape_string($_POST['author']);
        $publisher = $conn->real_escape_string($_POST['publisher']);

        $sql = "INSERT INTO books (book_name, isbn, book_title, author, publisher) 
                VALUES ('$name', '$isbn', '$title', '$author', '$publisher')";

        if ($conn->query($sql) === TRUE) {
            echo "<div class='msg msg-success'>Book Added Successfully!</div>";
        } else {
            echo "<div class='msg msg-error'>Error: " . $conn->error . "</div>";
        }
    }
    ?>

    <form method="POST">
        <input type="text" name="name" placeholder="Book Name" required>
        <input type="text" name="isbn" placeholder="ISBN (Unique)" required>
        <input type="text" name="title" placeholder="Book Title" required>
        <input type="text" name="author" placeholder="Author Name" required>
        <input type="text" name="publisher" placeholder="Publisher" required>
        <button type="submit" name="add_book">Add Book</button>
    </form>

    <hr style="margin: 30px 0; border: 0; border-top: 1px solid #e5e7eb;">

    <h3>Available Books</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>ISBN</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Actions</th>
        </tr>
        <?php
        $result = $conn->query("SELECT * FROM books");
        while($row = $result->fetch_assoc()) {
            echo "<tr>
                    <td>".htmlspecialchars($row['book_name'])."</td>
                    <td>".htmlspecialchars($row['isbn'])."</td>
                    <td>".htmlspecialchars($row['author'])."</td>
                    <td>".htmlspecialchars($row['publisher'])."</td>
                    <td>
                        <a href='edit_book.php?id=".$row['id']."' class='action-btn btn-edit'>Edit</a>
                        <a href='delete_book.php?id=".$row['id']."' class='action-btn btn-delete' onclick='return confirm(\"Are you sure you want to delete this book?\")'>Delete</a>
                    </td>
                  </tr>";
        }
        ?>
    </table>
</div>

</body>
</html>
