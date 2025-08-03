import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/RoleSelect.css';
import RegisterHeader from './RegisterHeader';

function RegisterRoleSelect() {
  const navigate = useNavigate();
  return (
    <>
      <RegisterHeader />
      <div className="role-select-container">
        <h1 className="role-select-title">Bạn muốn đăng ký với vai trò nào?</h1>
        <div className="role-select-options">
          <div
            className="role-card student"
            tabIndex={0}
            onClick={() => navigate('/signup/student')}
            onKeyPress={e => (e.key === 'Enter' ? navigate('/signup/student') : null)}
          >
            <div className="role-icon" role="img" aria-label="Học sinh">👩‍🎓</div>
            <div className="role-label">Học sinh</div>
            <div className="role-desc">Tạo tài khoản để làm bài tập, nhận thông báo từ giáo viên</div>
          </div>
          <div
            className="role-card teacher"
            tabIndex={0}
            onClick={() => navigate('/signup/teacher')}
            onKeyPress={e => (e.key === 'Enter' ? navigate('/signup/teacher') : null)}
          >
            <div className="role-icon" role="img" aria-label="Giáo viên">👨‍🏫</div>
            <div className="role-label">Giáo viên</div>
            <div className="role-desc">Tạo lớp học, giao bài tập, theo dõi học sinh</div>
          </div>
        </div>
        <div className="role-switch-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </>
  );
}

export default RegisterRoleSelect; 