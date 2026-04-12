import React, { useState, useEffect } from 'react';

const StudentForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollId: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        rollId: initialData.rollId,
        password: '',
        confirmPassword: '',
        contactNumber: initialData.contactNumber,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        rollId: '',
        password: '',
        confirmPassword: '',
        contactNumber: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!initialData && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            disabled={!!initialData}
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 disabled:bg-slate-50 disabled:text-slate-500 outline-none transition-all"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            disabled={!!initialData}
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 disabled:bg-slate-50 disabled:text-slate-500 outline-none transition-all"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Roll ID</label>
        <input
          type="text"
          name="rollId"
          disabled={!!initialData}
          required
          value={formData.rollId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 disabled:bg-slate-50 disabled:text-slate-500 outline-none transition-all"
          placeholder="e.g. CS101"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
        <input
          type="text"
          name="contactNumber"
          required
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
          placeholder="+1 234 567 890"
        />
      </div>

      {!initialData && (
        <>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required={!initialData}
              minLength="6"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required={!initialData}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
            />
          </div>
        </>
      )}

      <div className="pt-2 flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-brand-600 text-white py-2 px-4 rounded-lg hover:bg-brand-700 focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 font-medium transition-all"
        >
          {initialData ? 'Update Contact' : 'Register Student'}
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

export default StudentForm;
