import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/StudentDashboard.css';

function getInitials(name) {
  if (!name) return '';
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[words.length - 2][0] + words[words.length - 1][0]).toUpperCase();
}

const TABS = [
  { label: 'Tổng quan', path: '/student/dashboard' },
  { label: 'Lớp học', path: '/student/classes' },
  { label: 'Lịch học', path: '/student/schedule' },
];

function DashboardHeader({ user = { name: 'Nguyễn Văn A', email: 'sv001@shub.edu.vn', code: 'SV001' } }) {
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <header className="sd-dashboard-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="sd-dashboard-logo">SHub Classroom</div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div className="sd-dashboard-tabs">
          {TABS.map(tab => {
            let isActive = false;
            if (tab.path === '/student/dashboard') {
              isActive = location.pathname.startsWith('/student/dashboard');
            } else if (tab.path === '/student/classes') {
              isActive = location.pathname.startsWith('/student/classes') || location.pathname.startsWith('/class/');
            } else if (tab.path === '/student/schedule') {
              isActive = location.pathname.startsWith('/student/schedule');
            }
            return (
              <button
                key={tab.path}
                className={`sd-dashboard-tab${isActive ? ' active' : ''}`}
                onClick={() => navigate(tab.path)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="sd-dashboard-header-right">
        <button className="sd-dashboard-support">❓ Hỏi đáp</button>
        <div className="sd-dashboard-user" onClick={() => setDropdown(!dropdown)} tabIndex={0} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <div className="sd-dashboard-avatar sd-dashboard-avatar-initials">{getInitials(user.name)}</div>
          <span className="sd-dashboard-username">{user.name}</span>
          <span className="sd-dashboard-caret">▼</span>
          {dropdown && (
            <div className="sd-dashboard-dropdown">
              <div className="sd-dashboard-dropdown-caret" />
              <div className="sd-dropdown-item"><b>{user.name}</b></div>
              <div className="sd-dropdown-item">{user.email}</div>
              <div className="sd-dropdown-item">Mã học sinh: {user.code}</div>
              <div className="sd-dropdown-divider" />
              <div className="sd-dropdown-item">Thông tin cá nhân</div>
              <div className="sd-dropdown-item">Đăng xuất</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader; 