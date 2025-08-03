// App.js
import React from 'react';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import RegisterRoleSelect from './components/login/RegisterRoleSelection';
import LoginRoleSelect from './components/login/Login';
import TeacherSignup from './components/login/TeacherSignup';
import StudentSignup from './components/login/StudentSignup';
import TeacherLogin from './components/login/Login';
import StudentLogin from './components/login/Login';
import StudentDashboard from './components/student/StudentDashboard';
import StudentClassPage from './components/student/StudentClassPage';
import StudentSchedulePage from './components/student/StudentSchedulePage';
import ClassAnnouncementPage from './components/student/Class/ClassAnnouncementPage';
import ClassSchedulePage from './components/student/Class/ClassSchedulePage';
import ClassMembersPage from './components/student/Class/ClassMembersPage';
import Find from './components/student/Find';
import ClassHomeworkPage from './components/student/Class/ClassHomeworkPage';
import ClassMaterialsPage from './components/student/Class/ClassMaterialsPage';
import StudentDocumentViewPage from './components/student/Class/StudentDocumentViewPage';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import TeacherClass from './components/teacher/TeacherClass';
import ClassSchedule from './components/teacher/ClassSchedule';
import ManageSchedule from './components/teacher/ManageSchedule';
import TrashPage from './components/teacher/TrashPage';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CreateClass from './components/teacher/CreateClass';
import CreateRoomPage from './components/teacher/CreateRoomPage';
import MeetingDetail from './components/teacher/MeetingDetail';
import CreateLecturePage from './components/teacher/CreateLecturePage';
import ManualAnswerUploadPage from './components/teacher/ManualAnswerUploadPage';
import ManualAnswerDetailPage from './components/teacher/ManualAnswerDetailPage';
import StudentQuizPage from './components/student/Class/StudentQuizPage';
import StudentQuizResultPage from './components/student/Class/StudentQuizResultPage';
import TeacherNotificationPage from './components/teacher/Class/TeacherNotificationPage';
import MembersPage from './components/teacher/Class/MembersPage';
import TeacherMemberDetailPage from './components/teacher/Class/TeacherMemberDetailPage';
import StudentScoreDetail from './components/teacher/Class/StudentScoreDetail';
import AssignmentPage from './components/teacher/Class/AssignmentPage';
import CreateAssignmentPage from './components/teacher/Class/CreateAssignmentPage';
import UploadAssignmentPage from './components/teacher/Class/UploadAssignmentPage';
import GradePage from './components/teacher/Class/GradePage';
import CreateClassPage from './components/teacher/CreateClassPage';
import TeacherSchedulePage from './components/teacher/Class/TeacherSchedulePage';
import TeacherMaterialsPage from './components/teacher/Class/TeacherMaterialsPage';
import TeacherDocumentViewPage from './components/teacher/Class/TeacherDocumentViewPage';
import AssignmentDetailPage from './components/teacher/Class/AssignmentDetailPage';
import ProfilePage from './components/teacher/ProfilePage';
import StudentProfilePage from './components/student/ProfilePage';

function AppLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="App">
      {isLanding && <Header />}
      <Routes>
        {/* Chung */}
        <Route path="/" element={<MainContent />} />
        <Route path="/register" element={<RegisterRoleSelect />} />
        <Route path="/login" element={<LoginRoleSelect />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/signup/teacher" element={<TeacherSignup />} />
        <Route path="/signup/student" element={<StudentSignup />} />

        {/* 👨‍🏫 Teacher */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/resources" element={<TeacherClass />} />
        <Route path="/teacher/schedule" element={<ClassSchedule />} />
        <Route path="/teacher/createclass" element={<CreateClass />} />
        <Route path="/teacher/manageschedule" element={<ManageSchedule />} />
        <Route path="/teacher/schedule/create" element={<CreateRoomPage />} />
        <Route path="/teacher/manageschedule/create" element={<CreateRoomPage />} />
        <Route path="/teacher/meeting/:meetingId" element={<MeetingDetail />} />
        <Route path="/teacher/create-lecture" element={<CreateLecturePage />} />
        {/* Trang nhập đáp án thủ công */}
        <Route path="/resource/add" element={<ManualAnswerUploadPage />} />
        {/* Trang nhập đáp án chi tiết */}
        <Route path="/resource/manual-answer-detail" element={<ManualAnswerDetailPage />} />
        {/* Trang thùng rác */}
        <Route path="/teacher/trash" element={<TrashPage />} />
        {/* Teacher class subpages */}
        <Route path="/teacher/class/:classId/announcement" element={<TeacherNotificationPage />} />
        {/* <Route path="/teacher/class/:classId/schedule" element={<TeacherSchedulePage />} /> */}
        <Route path="/teacher/class/:classId/members" element={<MembersPage />} />
        <Route path="/teacher/class/:classId/members/:memberId" element={<TeacherMemberDetailPage />} />
        <Route path="/teacher/class/:classId/members/:memberId/score-detail" element={<StudentScoreDetail />} />
        <Route path="/teacher/class/:classId/assignments" element={<AssignmentPage />} />
        <Route path="/teacher/class/:classId/assignment/:assignmentId" element={<AssignmentDetailPage />} />
        <Route path="/class/:classId/assignment/:assignmentId" element={<AssignmentDetailPage />} />
        <Route path="/teacher/class/:classId/assignments/create" element={<CreateAssignmentPage />} />
        <Route path="/teacher/class/:classId/assignments/upload" element={<UploadAssignmentPage />} />
        <Route path="/teacher/class/:classId/grades" element={<GradePage />} />
        <Route path="/teacher/class/:classId/materials" element={<TeacherMaterialsPage />} />
        <Route path="/teacher/class/:classId/documents/:docId" element={<TeacherDocumentViewPage />} />
        <Route path="/teacher/create-class" element={<CreateClassPage />} />
        <Route path="/teacher/class/:classId/teacher-schedule" element={<TeacherSchedulePage />} />
        <Route path="/teacher/profile" element={<ProfilePage />} />
        
        {/* 👩‍🎓 Student */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/classes" element={<StudentClassPage />} />
        <Route path="/student/find" element={<Find />} />
        <Route path="/student/schedule" element={<StudentSchedulePage />} />
        <Route path="/student/profile" element={<StudentProfilePage />} />
        <Route path="/class/:classCode/announcement" element={<ClassAnnouncementPage />} />
        <Route path="/class/:classCode/schedule" element={<ClassSchedulePage />} />
        <Route path="/class/:classCode/members" element={<ClassMembersPage />} />
        <Route path="/class/:classCode/homework" element={<ClassHomeworkPage />} />
        <Route path="/class/:classCode/homework/:homeworkId/quiz2" element={<StudentQuizPage />} />
        <Route path="/class/:classCode/homework/result" element={<StudentQuizResultPage />} />
        <Route path="/class/:classCode/materials" element={<ClassMaterialsPage />} />
        <Route path="/class/:classCode" element={<ClassMaterialsPage />} />
        <Route path="/class/:classCode/documents/:docId" element={<StudentDocumentViewPage />} />
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