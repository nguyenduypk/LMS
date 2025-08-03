import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/RoleSelect.css';
import LoginHeader from './LoginHeader';

function LoginRoleSelect() {
  const navigate = useNavigate();
  return (
    <>
      <LoginHeader />
      <div className="role-select-container">
        <h1 className="role-select-title">Bạn muốn đăng nhập với vai trò nào?</h1>
        <div className="role-select-options">
          <div
            className="role-card student"
            tabIndex={0}
            onClick={() => navigate('/login/student')}
            onKeyPress={e => (e.key === 'Enter' ? navigate('/login/student') : null)}
          >
            <div className="role-icon" role="img" aria-label="Học sinh">👩‍🎓</div>
            <div className="role-label">Học sinh</div>
            <div className="role-desc">Đăng nhập để làm bài tập, nhận thông báo từ giáo viên</div>
          </div>
          <div
            className="role-card teacher"
            tabIndex={0}
            onClick={() => navigate('/login/teacher')}
            onKeyPress={e => (e.key === 'Enter' ? navigate('/login/teacher') : null)}
          >
            <div className="role-icon" role="img" aria-label="Giáo viên">👨‍🏫</div>
            <div className="role-label">Giáo viên</div>
            <div className="role-desc">Đăng nhập để tạo lớp học, giao bài tập, theo dõi học sinh</div>
          </div>
        </div>
        <div className="role-switch-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </div>
      </div>
    </>
  );
}

export default LoginRoleSelect; 