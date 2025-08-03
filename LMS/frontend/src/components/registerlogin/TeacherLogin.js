import React, { useState } from 'react';
import LoginHeader from './LoginHeader';
import '../../styles/RoleSelect.css';
import { Link } from 'react-router-dom';

function TeacherLogin() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email không hợp lệ';
    if (!form.password) newErrors.password = 'Vui lòng nhập mật khẩu';
    else if (form.password.length < 6) newErrors.password = 'Mật khẩu phải từ 6 ký tự';
    return newErrors;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Gửi dữ liệu hoặc xử lý tiếp
      console.log('Đăng nhập giáo viên:', form);
    }
  };

  return (
    <>
      <LoginHeader />
      <div className="role-select-container">
        <form className="teacher-signup-form" onSubmit={handleSubmit} autoComplete="off">
          <h2 className="role-select-title">Đăng nhập giáo viên</h2>
          <div className="signup-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              autoFocus
            />
            {errors.email && <div className="signup-error">{errors.email}</div>}
          </div>
          <div className="signup-field">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <div className="signup-error">{errors.password}</div>}
          </div>
          <button className="btn btn-primary signup-btn" type="submit">Đăng Nhập</button>
          <div className="role-switch-link" style={{ marginTop: 20 }}>
            Bạn là học sinh? <Link to="/login/student">Đăng nhập tại đây</Link><br />
            Chưa có tài khoản? <Link to="/signup/teacher">Đăng ký ngay</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default TeacherLogin; 