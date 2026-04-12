import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from '../components/StudentForm';
import StudentTable from '../components/StudentTable';

const API_URL = 'http://localhost:5000/api/students';

const StudentSystem = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSave = async (studentData) => {
    try {
      if (editingStudent) {
        // Update
        await axios.put(`${API_URL}/${editingStudent.rollId}`, studentData);
      } else {
        // Create
        await axios.post(API_URL, studentData);
      }
      fetchStudents();
      setEditingStudent(null);
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred during save');
    }
  };

  const handleDelete = async (rollId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${API_URL}/${rollId}`);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const cancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Student Registration System</h2>
        <p className="text-slate-500 mt-1">Manage student records and directory information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              {editingStudent ? 'Update Contact Info' : 'New Registration'}
            </h3>
            <StudentForm
              initialData={editingStudent}
              onSave={handleSave}
              onCancel={cancelEdit}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
             <StudentTable
               students={students}
               onEdit={handleEdit}
               onDelete={handleDelete}
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSystem;
