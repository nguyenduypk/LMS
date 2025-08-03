import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHeader from '../DashboardHeader';
import ClassSidebar from './ClassSidebar';
import '../../../styles/ClassAnnouncementPage.css';

function ClassAnnouncementPage() {
  const { classCode } = useParams();
  const classInfo = {
    name: '1234Absdth',
    code: classCode || 'OURLC',
    teacher: 'Nguyễn Duy'
  };

  return (
    <div className="class-announcement-page">
      <DashboardHeader />
      <div className="class-announcement-page__header">
        <h1 className="class-announcement-page__title">Thông báo</h1>
      </div>

      <div className="class-announcement-page__content" style={{ paddingTop: 88, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ClassSidebar classInfo={classInfo} />
        {/* Danh sách thông báo */}
        <div className="announcement-list">
          {[{
            id: 1,
            name: 'Nguyễn Duy',
            time: 'Vừa xong',
            content: 'Ngày mai 19/07/2025 Kiểm tra giữa kì'
          }, {
            id: 2,
            name: 'Nguyễn Duy',
            time: 'Vừa xong',
            content: 'siuuu'
          }, {
            id: 3,
            name: 'Trần Minh',
            time: '1 phút trước',
            content: 'Lớp mình nhớ nộp bài tập Toán trước thứ 6 nhé!'
          }].map(a => (
            <div className="announcement-card" key={a.id}>
              <div className="announcement-header">
                <div className="announcement-avatar" />
                <div>
                  <div className="announcement-name">{a.name}</div>
                  <div className="announcement-time">{a.time}</div>
                </div>
              </div>
              <div className="announcement-content">{a.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClassAnnouncementPage; 