import React, { useState } from 'react';
import RegisterHeader from './RegisterHeader';
import '../../styles/RoleSelect.css';
import { Link } from 'react-router-dom';

function TeacherSignup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Vui lòng nhập họ và tên';
    if (!form.email) newErrors.email = 'Vui lòng nhập email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email không hợp lệ';
    if (!form.password) newErrors.password = 'Vui lòng nhập mật khẩu';
    else if (form.password.length < 6) newErrors.password = 'Mật khẩu phải từ 6 ký tự';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Mật khẩu không khớp';
    if (!form.school.trim()) newErrors.school = 'Vui lòng nhập trường đang công tác';
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
      console.log('Đăng ký thành công:', form);
      // Reset form nếu muốn
      // setForm({ name: '', email: '', password: '', confirmPassword: '', school: '' });
    }
  };

  return (
    <>
      <RegisterHeader />
      <div className="role-select-container">
        <form className="teacher-signup-form" onSubmit={handleSubmit} autoComplete="off">
          <h2 className="role-select-title">Đăng ký tài khoản giáo viên</h2>
          <div className="signup-field">
            <label>Họ và tên</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              autoFocus
            />
            {errors.name && <div className="signup-error">{errors.name}</div>}
          </div>
          <div className="signup-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
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
          <div className="signup-field">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && <div className="signup-error">{errors.confirmPassword}</div>}
          </div>
          <div className="signup-field">
            <label>Trường đang công tác</label>
            <input
              type="text"
              name="school"
              value={form.school}
              onChange={handleChange}
              className={errors.school ? 'input-error' : ''}
            />
            {errors.school && <div className="signup-error">{errors.school}</div>}
          </div>
          <button className="btn btn-primary signup-btn" type="submit">Đăng ký</button>
          <div className="role-switch-link" style={{ marginTop: 20 }}>
            Bạn là học sinh? <Link to="/signup/student">Đăng ký tại đây</Link><br />
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default TeacherSignup; 