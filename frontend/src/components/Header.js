import React from 'react';
import '../styles/LandingPage.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">SHub Classroom</Link>
      <nav className="header__nav">
        <a href="#about">Giới thiệu</a>
        <a href="#features">Tính năng</a>
        <a href="#partners">Đối tác</a>
        <a href="#contact">Liên hệ</a>
      </nav>
      <div className="header__actions">
        <Link to="/login" className="btn btn-outline">Đăng nhập</Link>
        <Link to="/register" className="btn btn-primary">Đăng ký</Link>
      </div>
    </header>
  );
}

export default Header; 