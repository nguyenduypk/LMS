import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

function getInitials(name) {
  if (!name) return '';
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[words.length - 2][0] + words[words.length - 1][0]).toUpperCase();
}

const TABS = [
  { label: 'Lớp học', path: '/teacher/dashboard' },
  { label: 'Học liệu', path: '/teacher/resources' },
  { label: 'Lịch học', path: '/teacher/schedule' },
];

export default function Header({
  teacherName = 'Nguyễn Duy',
  teacherEmail = 'nguyenkhanhduongduy@gmail.com',
  teacherPhone = '0353111322',
  onLogout,
  onProfile,
  onSwitchRole
}) {
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setDropdown(false);
    if (onLogout) {
      onLogout();
    } else {
      navigate('/login');
    }
  };

  const handleProfile = () => {
    setDropdown(false);
    if (onProfile) {
      onProfile();
    } else {
      navigate('/teacher/profile');
    }
  };

  const handleSwitchRole = () => {
    setDropdown(false);
    if (onSwitchRole) {
      onSwitchRole();
    } else {
      navigate('/switch-role');
    }
  };

  return (
    <header className="teacher-header">
      <div className="header-left">
        <div className="logo">SHub Classroom</div>
        <nav className="nav-tabs">
          {TABS.map(tab => {
            const isActive = location.pathname.startsWith(tab.path);
            return (
              <button
                key={tab.path}
                className={`nav-tab${isActive ? ' active' : ''}`}
                type="button"
                tabIndex={0}
                onClick={() => navigate(tab.path)}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="header-right">
        <div className="user-info">
          <div className="user-avatar">{getInitials(teacherName)}</div>
          <div className="user-details">
            <div className="user-name">{teacherName}</div>
            <div className="user-role">Giáo viên</div>
          </div>
        </div>
        <div className="dropdown-container">
          <button
            className="dropdown-trigger"
            onClick={() => setDropdown(!dropdown)}
            tabIndex={0}
            aria-label="Mở menu tài khoản"
          >
            ▼
          </button>
          {dropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="student-count">Học sinh 2/100</div>
                <div className="teacher-name">{teacherName}</div>
                <div className="teacher-role">Giáo viên</div>
                <div className="teacher-contact">
                  <div>{teacherEmail}</div>
                  <div>{teacherPhone}</div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="student-limit">Giới hạn học sinh: 2/100</div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-link">Tạo liên kết facebook</button>
              <div className="dropdown-desc">Đăng nhập thuận tiện hơn</div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleProfile}>
                Thông tin cá nhân
              </button>
              <button className="dropdown-item" onClick={handleSwitchRole}>
                Đổi vai trò
              </button>
              <button className="dropdown-item" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}