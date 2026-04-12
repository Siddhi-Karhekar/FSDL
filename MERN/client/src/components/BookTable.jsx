import React, { useState } from 'react';
import { Pencil, Trash2, Search } from 'lucide-react';

const BookTable = ({ books, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book =>
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h4 className="font-semibold text-slate-800">Library Catalog</h4>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search ISBN, title or author..."
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all w-72"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4 font-medium">ISBN</th>
              <th className="px-6 py-4 font-medium">Details</th>
              <th className="px-6 py-4 font-medium">Publisher</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-600">{book.isbn}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">{book.bookTitle}</p>
                    <p className="text-xs text-slate-500">by {book.author}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{book.publisher}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => onEdit(book)}
                      className="text-slate-400 hover:text-brand-600 transition-colors inline-block"
                      title="Edit Book Details"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(book.isbn)}
                      className="text-slate-400 hover:text-red-500 transition-colors inline-block"
                      title="Remove Book"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                  {books.length === 0 ? "Library catalog is empty." : "No matching books found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookTable;
