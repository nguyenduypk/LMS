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
    <header className="teacher-header">
      <div className="header-left">
        <div className="logo">SHub Classroom</div>
      </div>
      <nav className="nav-tabs">
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
              className={`nav-tab${isActive ? ' active' : ''}`}
              onClick={() => navigate(tab.path)}
              type="button"
              tabIndex={0}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
      <div className="header-right">
        <div className="user-info">
          <div className="user-avatar">{getInitials(user.name)}</div>
          <div className="user-details">
            <div className="user-name">{user.name}</div>
            <div className="user-role">Học sinh</div>
          </div>
        </div>
        <div className="dropdown-container">
          <button
            className="dropdown-trigger"
            onClick={() => setDropdown(!dropdown)}
            tabIndex={0}
            aria-label="Mở menu tài khoản"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`dropdown-arrow ${dropdown ? 'rotated' : ''}`}
            >
              <path d="m7 10 5 5 5-5z" fill="currentColor"/>
            </svg>
          </button>
          {dropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="student-count">Mã học sinh: {user.code}</div>
                <div className="teacher-name">{user.name}</div>
                <div className="teacher-role">Học sinh</div>
                <div className="teacher-contact">
                  <div>{user.email}</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={() => navigate('/student/profile')}>Thông tin cá nhân</button>
              <button className="dropdown-item">Đăng xuất</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader; 