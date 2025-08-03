import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import ClassSidebar from './ClassSidebar';
import '../../styles/ClassAnnouncementPage.css';

const MOCK_CLASS = {
  name: 'Toán 10A1',
  code: 'MATH10A1',
  teacher: 'Nguyễn Văn B',
};

function ClassAnnouncementPage() {
  // State cho thông báo (mock, chưa có thông báo)
  const [announcements] = useState([]);

  return (
    <>
      <DashboardHeader />
      <div className="class-announcement-layout">
        <ClassSidebar classInfo={MOCK_CLASS} selected="announcement" />
        <main className="class-announcement-main">
          {announcements.length === 0 ? (
            <div className="class-announcement-empty">
              <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="No announcement" className="class-announcement-illustration" />
              <div className="class-announcement-empty-title">Lớp học chưa có thông báo</div>
              <div className="class-announcement-empty-desc">
                Nội dung thông báo của giáo viên sẽ xuất hiện ở đây
              </div>
            </div>
          ) : (
            <div> {/* Danh sách thông báo sẽ render ở đây */} </div>
          )}
        </main>
      </div>
    </>
  );
}

export default ClassAnnouncementPage; 