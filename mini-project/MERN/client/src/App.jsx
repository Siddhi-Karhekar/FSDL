import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';
import StudentSystem from './pages/StudentSystem';
import LibrarySystem from './pages/LibrarySystem';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-brand-600">EduManage</span>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/students"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-colors"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Student Registration
                  </Link>
                  <Link
                    to="/library"
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Library Management
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/students" element={<StudentSystem />} />
            <Route path="/library" element={<LibrarySystem />} />
            <Route path="/" element={
              <div className="text-center py-20 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  Welcome to EduManage
                </h1>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl">
                  Please select a module from the navigation menu above to manage Student Registrations or the Library.
                </p>
                <div className="flex gap-4">
                  <Link
                    to="/students"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all"
                  >
                    <Users className="w-5 h-5 mr-2" /> go to Students
                  </Link>
                  <Link
                    to="/library"
                    className="inline-flex items-center px-6 py-3 border border-slate-300 text-base font-medium rounded-full shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all"
                  >
                    <BookOpen className="w-5 h-5 mr-2" /> go to Library
                  </Link>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
