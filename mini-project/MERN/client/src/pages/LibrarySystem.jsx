import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from '../components/BookForm';
import BookTable from '../components/BookTable';

const API_URL = 'http://localhost:5000/api/books';

const LibrarySystem = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSave = async (bookData) => {
    try {
      if (editingBook) {
        // Update
        await axios.put(`${API_URL}/${editingBook.isbn}`, bookData);
      } else {
        // Create
        await axios.post(API_URL, bookData);
      }
      fetchBooks();
      setEditingBook(null);
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred during save');
    }
  };

  const handleDelete = async (isbn) => {
    if (window.confirm('Are you sure you want to remove this book from the library?')) {
      try {
        await axios.delete(`${API_URL}/${isbn}`);
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const cancelEdit = () => {
    setEditingBook(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Library Management System</h2>
        <p className="text-slate-500 mt-1">Manage library catalog, update book details, and track inventory.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              {editingBook ? 'Edit Book Details' : 'Add New Book'}
            </h3>
            <BookForm
              initialData={editingBook}
              onSave={handleSave}
              onCancel={cancelEdit}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
             <BookTable
               books={books}
               onEdit={handleEdit}
               onDelete={handleDelete}
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarySystem;
