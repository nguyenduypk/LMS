import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ClassSidebar.css';

function ClassSidebar({ classInfo, selected }) {
  const navigate = useNavigate();
  return (
    <aside className="class-sidebar">
      <div className="class-sidebar-header">
        <div className="class-sidebar-title">{classInfo.name}</div>
        <div className="class-sidebar-code">Mã lớp: <b>{classInfo.code}</b></div>
        <div className="class-sidebar-teacher">GV: {classInfo.teacher}</div>
      </div>
      <nav className="class-sidebar-nav">
        <button className={selected === 'announcement' ? 'active' : ''} onClick={() => navigate(`/class/${classInfo.code}/announcement`)}>
          <span className="class-sidebar-icon">📢</span> Thông báo
        </button>
        <button className={selected === 'schedule' ? 'active' : ''} onClick={() => navigate(`/class/${classInfo.code}/schedule`)}>
          <span className="class-sidebar-icon">📅</span> Lịch học
        </button>
        <button className={selected === 'members' ? 'active' : ''} onClick={() => navigate(`/class/${classInfo.code}/members`)}>
          <span className="class-sidebar-icon">👥</span> Thành viên
        </button>
        <button className={selected === 'homework' ? 'active' : ''} onClick={() => navigate(`/class/${classInfo.code}/homework`)}>
          <span className="class-sidebar-icon">📝</span> Bài tập
        </button>
        <button className={selected === 'materials' ? 'active' : ''} onClick={() => navigate(`/class/${classInfo.code}/materials`)}>
          <span className="class-sidebar-icon">📚</span> Tài liệu & bài giảng
        </button>
      </nav>
      <button className="class-sidebar-leave">Rời khỏi lớp này</button>
    </aside>
  );
}

export default ClassSidebar; 