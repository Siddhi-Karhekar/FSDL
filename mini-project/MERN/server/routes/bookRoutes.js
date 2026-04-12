const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Create a new book
router.post("/", async (req, res) => {
  try {
    const { bookName, isbn, bookTitle, author, publisher } = req.body;

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: "A book with this ISBN already exists" });
    }

    const newBook = new Book({
      bookName,
      isbn,
      bookTitle,
      author,
      publisher,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error: error.message });
  }
});

// Read all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// Read one book by isbn
router.get("/:isbn", async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error: error.message });
  }
});

// Update book by isbn (full CRUD functionality)
router.put("/:isbn", async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { isbn: req.params.isbn },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error: error.message });
  }
});

// Delete book by isbn
router.delete("/:isbn", async (req, res) => {
  try {
    const deletedBook = await Book.findOneAndDelete({ isbn: req.params.isbn });
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error: error.message });
  }
});

module.exports = router;
