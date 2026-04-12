<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Edit Book</title>
    <style>
        :root { --bg: #f3f4f6; --secondary: #9333ea; --text: #1f2937; --card-bg: #ffffff; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: var(--bg); color: var(--text); padding: 20px; }
        .container { max-width: 600px; margin: auto; background: var(--card-bg); padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        input { width: 100%; padding: 10px; margin: 8px 0; border-radius: 6px; border: 1px solid #d1d5db; box-sizing: border-box; }
        button { width: 100%; padding: 12px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px; transition: 0.3s; }
        button:hover { background: #059669; }
        .back-btn { display: inline-block; margin-top: 15px; text-align: center; color: var(--secondary); text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>

<div class="container">
    <h2>Edit Book</h2>

    <?php
    if (!isset($_GET['id'])) {
        header("Location: books.php");
        exit();
    }
    $id = intval($_GET['id']);

    if (isset($_POST['update'])) {
        $name = $conn->real_escape_string($_POST['name']);
        $isbn = $conn->real_escape_string($_POST['isbn']);
        $title = $conn->real_escape_string($_POST['title']);
        $author = $conn->real_escape_string($_POST['author']);
        $publisher = $conn->real_escape_string($_POST['publisher']);

        $sql = "UPDATE books SET book_name='$name', isbn='$isbn', book_title='$title', author='$author', publisher='$publisher' WHERE id=$id";

        if ($conn->query($sql) === TRUE) {
            echo "<script>alert('Book updated successfully!'); window.location.href='books.php';</script>";
        } else {
            echo "<p style='color:red;'>Error updating record: " . $conn->error . "</p>";
        }
    }

    $result = $conn->query("SELECT * FROM books WHERE id=$id");
    if ($result->num_rows == 0) {
        die("Book not found.");
    }
    $book = $result->fetch_assoc();
    ?>

    <form method="POST">
        <label>Book Name</label>
        <input type="text" name="name" value="<?php echo htmlspecialchars($book['book_name']); ?>" required>
        
        <label>ISBN</label>
        <input type="text" name="isbn" value="<?php echo htmlspecialchars($book['isbn']); ?>" required>
        
        <label>Book Title</label>
        <input type="text" name="title" value="<?php echo htmlspecialchars($book['book_title']); ?>" required>
        
        <label>Author</label>
        <input type="text" name="author" value="<?php echo htmlspecialchars($book['author']); ?>" required>
        
        <label>Publisher</label>
        <input type="text" name="publisher" value="<?php echo htmlspecialchars($book['publisher']); ?>" required>
        
        <button type="submit" name="update">Update Book</button>
    </form>
    <a href="books.php" class="back-btn">← Back to Library</a>
</div>

</body>
</html>
