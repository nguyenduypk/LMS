import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Find = ({ onClose }) => {
  const [code, setCode] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Xử lý nhập ký tự
  const handleChange = (e) => {
    let val = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (val.length > 5) val = val.slice(0, 5);
    setCode(val);
  };

  // Xử lý backspace
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && code.length > 0) {
      setCode(code.slice(0, -1));
      e.preventDefault();
    }
  };

  // Khi click vào khung, focus input ẩn
  const handleBoxClick = () => {
    inputRef.current?.focus();
  };

  // Xử lý quay lại danh sách lớp
  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/student/classes');
    }
  };

  return (
    <div style={{
      background: '#f4f6f8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 4px 32px rgba(25, 118, 210, 0.13)',
        padding: '40px 48px 32px 48px',
        minWidth: 420,
        maxWidth: '90vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <img src="/logo192.png" alt="SHub Classroom" style={{ width: 48, height: 48 }} />
          <span style={{ fontWeight: 700, fontSize: 28, color: '#2196f3', letterSpacing: 1 }}>SHub Classroom</span>
        </div>
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8, textAlign: 'center' }}>
          Tham gia lớp bằng mã lớp
        </div>
        <div style={{ color: '#666', fontSize: 16, marginBottom: 32, textAlign: 'center' }}>
          Mã lớp gồm 5 ký tự, được giáo viên lớp đó cung cấp
        </div>
        <div
          style={{ display: 'flex', gap: 16, marginBottom: 32, position: 'relative', justifyContent: 'center', cursor: 'pointer' }}
          onClick={handleBoxClick}
        >
          <input
            ref={inputRef}
            type="text"
            value={code}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            maxLength={5}
            autoFocus
            style={{
              position: 'absolute',
              opacity: 0,
              zIndex: 10,
              width: 220,
              height: 54,
              left: 0,
              top: 0,
              caretColor: 'transparent',
            }}
            autoComplete="one-time-code"
          />
          {[0,1,2,3,4].map(i => (
            <div
              key={i}
              style={{
                borderBottom: '2px solid #1e88e5',
                padding: '7.5px 8px',
                height: 52,
                width: 40,
                margin: '0 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                borderRadius: 0,
              }}
            >
              <h4 style={{
                color: '#1e88e5',
                fontWeight: 700,
                fontSize: 32,
                margin: 0,
                letterSpacing: 2,
                textAlign: 'center',
                width: 32,
                height: 40,
                lineHeight: '40px',
              }}>{code[i] || ''}</h4>
            </div>
          ))}
        </div>
        <button style={{
          width: '100%',
          background: '#1e88e5',
          color: '#fff',
          border: 'none',
          borderRadius: 10,
          padding: '16px 0',
          fontSize: 18,
          fontWeight: 700,
          marginBottom: 24,
          boxShadow: '0 2px 8px rgba(30, 136, 229, 0.10)',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseOver={e => e.currentTarget.style.background = '#1565c0'}
        onMouseOut={e => e.currentTarget.style.background = '#1e88e5'}
        >
          Tìm lớp
        </button>
        <button
          onClick={handleBack}
          style={{
            width: '100%',
            background: '#fff',
            border: 'none',
            color: '#222',
            fontSize: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
            marginTop: 8,
            padding: 16,
            borderRadius: 10,
            boxShadow: 'none',
            transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = '#f4f6f8';
            e.currentTarget.style.color = '#1e88e5';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(30, 136, 229, 0.10)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = '#222';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span style={{ fontSize: 20 }}>←</span> Quay lại danh sách lớp
        </button>
      </div>
    </div>
  );
};

export default Find; 