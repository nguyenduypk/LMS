import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [step, setStep] = useState(1); // 1: Chọn vai trò, 2: Đăng nhập
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    setIsLoading(true);
    
    // Mock login - simulate API call
    setTimeout(() => {
      console.log('Đăng nhập thành công:', { email, password, role });
      
      // Mock user data
      const mockUser = {
        id: 1,
        email: email,
        role: role,
        name: role === 'teacher' ? 'Giáo viên mẫu' : 'Học sinh mẫu'
      };
      
      // Lưu mock data vào localStorage
      localStorage.setItem('token', 'mock-token-123');
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Chuyển hướng theo vai trò
      if (role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/student/dashboard');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="global-logo-row">
        <span className="logo-icon">🎓</span>
        <div className="brand-text">
          <span className="brand-name">SHub</span>
          <span className="brand-sub">Classroom</span>
        </div>
      </div>
      <div className="global-header-buttons">
        <Link to="/" className="home-link">Trang chủ</Link>
        <Link to="/register" className="register-link">Đăng ký</Link>
      </div>
      <div className="login-split-layout">
        {/* Left: Form */}
        <div className="login-left">
          
          <h1 className="login-title">CHÀO MỪNG BẠN ĐẾN VỚI SHUB CLASSROOM</h1>
          <p className="role-prompt">Chọn vai trò của bạn</p>
          
          <div className="role-dropdown">
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="role-select"
            >
              <option value="">Chọn vai trò</option>
              <option value="teacher">Tôi là giáo viên</option>
              <option value="student">Tôi là học sinh</option>
            </select>
          </div>
          
          {role && (
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Số điện thoại hoặc email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? 'Đang đăng nhập...' : 'Tiếp tục'}
              </button>
            </form>
          )}
        </div>
        
        {/* Right: Illustration */}
        <div className="login-right">
          <img src="/img/teacher.svg" alt="Login Illustration" className="login-illustration" />
        </div>
      </div>
    </>
  );
}

export default Login;