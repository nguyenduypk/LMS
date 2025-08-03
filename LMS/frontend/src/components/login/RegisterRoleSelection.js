import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterRoleSelection.css';


function RegisterRoleSelection() {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    if (role === 'student') {
      navigate('/signup/student');
    } else if (role === 'teacher') {
      navigate('/signup/teacher');
    }
  };

  return (
    <div className="register-container">
      {/* Header */}
      <header className="register-header">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <div className="brand-text">
            <span className="brand-name">SHub</span>
            <span className="brand-sub">Classroom</span>
          </div>
        </div>
        <div className="header-buttons">
          <button className="login-btn" onClick={() => navigate('/login')}>Đăng nhập</button>
        </div>
      </header>

      {/* Main content */}
      <main className="register-main">
        <h1>ĐĂNG KÝ TÀI KHOẢN MỚI</h1>
        <p className="sub-text">Chọn vai trò để tiếp tục</p>

        <div className="role-cards">
          <div className="role-card" onClick={() => handleSelectRole('student')}>
            <div className="role-image">
              <img src="/img/student.svg" alt="Student" />
            </div>
            <button>Tôi là học sinh</button>
          </div>
          <div className="role-card" onClick={() => handleSelectRole('teacher')}>
            <div className="role-image">
              <img src='/img/teacher.svg' alt="Teacher" />
            </div>
            <button>Tôi là giáo viên</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegisterRoleSelection;

