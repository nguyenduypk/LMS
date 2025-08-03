import React from 'react';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import RegisterRoleSelect from './components/registerlogin/RegisterRoleSelect';
import LoginRoleSelect from './components/registerlogin/LoginRoleSelect';
import TeacherSignup from './components/registerlogin/TeacherSignup';
import StudentSignup from './components/registerlogin/StudentSignup';
import TeacherLogin from './components/registerlogin/TeacherLogin';
import StudentLogin from './components/registerlogin/StudentLogin';
import StudentDashboard from './components/student/StudentDashboard';
import StudentClassPage from './components/student/StudentClassPage';
import StudentSchedulePage from './components/student/StudentSchedulePage';
import ClassAnnouncementPage from './components/student/ClassAnnouncementPage';
import ClassSchedulePage from './components/student/ClassSchedulePage';
import ClassMembersPage from './components/student/ClassMembersPage';
import ClassHomeworkPage from './components/student/ClassHomeworkPage';
import ClassHwQuizPage from './components/student/ClassHwQuizPage';
import ClassHwResultPage from './components/student/ClassHwResultPage';
import ClassMaterialsPage from './components/student/ClassMaterialsPage';
import ClassMaterialViewerPage from './components/student/ClassMaterialViewerPage';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function AppLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  return (
    <div className="App">
      {isLanding && <Header />}
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/register" element={<RegisterRoleSelect />} />
        <Route path="/login" element={<LoginRoleSelect />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/signup/teacher" element={<TeacherSignup />} />
        <Route path="/signup/student" element={<StudentSignup />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/classes" element={<StudentClassPage />} />
        <Route path="/student/schedule" element={<StudentSchedulePage />} />
        <Route path="/class/:classCode/announcement" element={<ClassAnnouncementPage />} />
        <Route path="/class/:classCode/schedule" element={<ClassSchedulePage />} />
        <Route path="/class/:classCode/members" element={<ClassMembersPage />} />
        <Route path="/class/:classCode/homework" element={<ClassHomeworkPage />} />
        <Route path="/class/:classCode/homework/:homeworkId/quiz" element={<ClassHwQuizPage />} />
        <Route path="/class/:classCode/homework/:homeworkId/result" element={<ClassHwResultPage />} />
        <Route path="/class/:classCode/materials" element={<ClassMaterialsPage />} />
        <Route path="/class/:classCode/materials/:materialId/view" element={<ClassMaterialViewerPage />} />
        {/* Các route đăng ký học sinh/giáo viên sẽ thêm sau */}
      </Routes>
      {isLanding && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
