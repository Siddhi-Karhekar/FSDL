import React, { useState, useEffect } from 'react';

const BookForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    bookName: '',
    isbn: '',
    bookTitle: '',
    author: '',
    publisher: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        bookName: '',
        isbn: '',
        bookTitle: '',
        author: '',
        publisher: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">ISBN</label>
        <input
          type="text"
          name="isbn"
          disabled={!!initialData}
          required
          value={formData.isbn}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 disabled:bg-slate-50 disabled:text-slate-500 outline-none transition-all"
          placeholder="e.g. 978-3-16-148410-0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Book Name</label>
        <input
          type="text"
          name="bookName"
          required
          value={formData.bookName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
          placeholder="Internal Library Name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Book Title</label>
        <input
          type="text"
          name="bookTitle"
          required
          value={formData.bookTitle}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
          placeholder="Official Title"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Author</label>
          <input
            type="text"
            name="author"
            required
            value={formData.author}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Publisher</label>
          <input
            type="text"
            name="publisher"
            required
            value={formData.publisher}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="pt-2 flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-brand-600 text-white py-2 px-4 rounded-lg hover:bg-brand-700 focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 font-medium transition-all"
        >
          {initialData ? 'Update Book' : 'Add Book'}
        </button>
        {initialData && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white border border-slate-300 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-50 focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 font-medium transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;
