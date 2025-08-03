import React from 'react';
import '../../styles/StudentDashboard.css';

function Sidebar({ homeworkCount = 0, unreadDocs = 0, unseenLectures = 0 }) {
  return (
    <aside className="sd-sidebar">
      {/* Đã bỏ logo ở đây */}
      <ul className="sd-sidebar-menu">
        <li className="sd-sidebar-item"><span>Phòng học hôm nay</span></li>
        <li className="sd-sidebar-item">
          <span>Bài tập chưa làm</span>
          {homeworkCount > 0 && <span className="sd-sidebar-badge">{homeworkCount}</span>}
        </li>
        <li className="sd-sidebar-item">
          <span>Tài liệu chưa đọc</span>
          {unreadDocs > 0 && <span className="sd-sidebar-badge">{unreadDocs}</span>}
        </li>
        <li className="sd-sidebar-item">
          <span>Bài giảng chưa xem</span>
          {unseenLectures > 0 && <span className="sd-sidebar-badge">{unseenLectures}</span>}
        </li>
        <li className="sd-sidebar-item"><span>Thành tích</span></li>
      </ul>
    </aside>
  );
}

export default Sidebar; 