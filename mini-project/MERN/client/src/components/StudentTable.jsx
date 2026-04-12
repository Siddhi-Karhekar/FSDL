import React, { useState } from 'react';
import { Pencil, Trash2, Search } from 'lucide-react';

const StudentTable = ({ students, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.rollId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h4 className="font-semibold text-slate-800">Enrolled Students</h4>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Roll ID..."
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4 font-medium">Roll ID</th>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-brand-600">{student.rollId}</td>
                  <td className="px-6 py-4 text-slate-700">{student.firstName} {student.lastName}</td>
                  <td className="px-6 py-4 text-slate-600">{student.contactNumber}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => onEdit(student)}
                      className="text-slate-400 hover:text-brand-600 transition-colors inline-block"
                      title="Update Contact"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(student.rollId)}
                      className="text-slate-400 hover:text-red-500 transition-colors inline-block"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                  {students.length === 0 ? "No students registered yet." : "No matching students found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
