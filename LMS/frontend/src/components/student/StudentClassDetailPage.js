import React from 'react';
import { useParams, Routes, Route, Navigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import ClassSidebar from './ClassSidebar';
import ClassAnnouncementPage from './ClassAnnouncementPage';
import ClassSchedulePage from './ClassSchedulePage';
import ClassMembersPage from './ClassMembersPage';
import ClassHomeworkPage from './ClassHomeworkPage';
import ClassMaterialsPage from './ClassMaterialsPage';
import '../../styles/ClassDetailPage.css';

// Mock data - trong thực tế sẽ lấy từ API
const MOCK_CLASSES = [
  {
    id: 1,
    name: '1234Absdt',
    code: 'OURLC',
    teacher: 'Nguyễn Văn A',
    image: 'https://i.imgur.com/0y8Ftya.jpg',
    students: 2,
    lectures: 0,
    homeworks: 2,
    materials: 1,
  },
  {
    id: 2,
    name: 'Lớp Toán 12A1',
    code: 'MATH12A1',
    teacher: 'Trần Thị B',
    image: 'https://i.imgur.com/1bX5QH6.jpg',
    students: 35,
    lectures: 10,
    homeworks: 5,
    materials: 8,
  },
];

function StudentClassDetailPage() {
  const { classId } = useParams();
  
  // Tìm thông tin lớp từ mock data
  const classInfo = MOCK_CLASSES.find(cls => cls.id === parseInt(classId));
  
  if (!classInfo) {
    return <div>Không tìm thấy lớp học</div>;
  }

  return (
    <>
      <DashboardHeader />
      <div className="class-detail-layout" style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        <ClassSidebar classInfo={classInfo} />
        <main className="class-detail-main" style={{ flex: 1, overflow: 'auto' }}>
          <Routes>
            <Route path="announcements" element={<ClassAnnouncementPage classInfo={classInfo} />} />
            <Route path="schedule" element={<ClassSchedulePage classInfo={classInfo} />} />
            <Route path="members" element={<ClassMembersPage classInfo={classInfo} />} />
            <Route path="homework" element={<ClassHomeworkPage classInfo={classInfo} />} />
            <Route path="materials" element={<ClassMaterialsPage classInfo={classInfo} />} />
            <Route path="*" element={<Navigate to="announcements" replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default StudentClassDetailPage; 