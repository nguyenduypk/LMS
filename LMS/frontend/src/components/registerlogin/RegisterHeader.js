import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/LandingPage.css';

function RegisterHeader() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">SHub Classroom</Link>
      <div className="header__actions">
        <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
      </div>
    </header>
  );
}

export default RegisterHeader; 