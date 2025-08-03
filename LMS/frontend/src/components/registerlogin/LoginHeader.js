import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/LandingPage.css';

function LoginHeader() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">SHub Classroom</Link>
      <div className="header__actions">
        <Link to="/register" className="btn btn-primary">Đăng ký</Link>
      </div>
    </header>
  );
}

export default LoginHeader; 