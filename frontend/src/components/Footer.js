import React from 'react';
import '../styles/LandingPage.css';

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__main">
        <div className="footer__info">
          <div className="footer__logo">SHub Classroom</div>
          <div>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</div>
          <div>Email: support@shub.edu.vn</div>
          <div>Hotline: 0123 456 789</div>
        </div>
        <div className="footer__links">
          <a href="/privacy">Chính sách bảo mật</a>
          <a href="/terms">Điều khoản sử dụng</a>
        </div>
        <div className="footer__social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__icon">
            <svg width="28" height="28" fill="#1976d2" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
          </a>
          <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" aria-label="Zalo" className="footer__icon">
            <svg width="28" height="28" fill="#1976d2" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#e3f0fd"/><text x="50%" y="55%" textAnchor="middle" fontSize="16" fill="#1976d2" fontWeight="bold">Z</text></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer__icon">
            <svg width="28" height="28" fill="#1976d2" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.163 3.5 12 3.5 12 3.5s-7.163 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.414 0 12 0 12s0 3.586.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.837 20.5 12 20.5 12 20.5s7.163 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.586 24 12 24 12s0-3.586-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
      <div className="footer__copyright">
        © {new Date().getFullYear()} SHub Classroom. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer; 