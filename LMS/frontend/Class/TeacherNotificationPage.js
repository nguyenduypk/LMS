import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import TeacherSidebar from './TeacherSidebar';
import './TeacherNotificationPage.css';

function TeacherNotificationPage() {
  const { classId } = useParams();
  const [input, setInput] = useState('');
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      name: 'Nguyễn Duy',
      time: 'Vừa xong',
      content: 'Ngày mai 19/07/2025 Kiểm tra giữa kì'
    },
    {
      id: 2,
      name: 'Nguyễn Duy',
      time: 'Vừa xong',
      content: 'siu'
    },
    {
      id: 3,
      name: 'Trần Minh',
      time: '1 phút trước',
      content: 'Lớp mình nhớ nộp bài tập Toán trước thứ 6 nhé!'
    }
  ]);

  const handlePost = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setAnnouncements([
      {
        id: Date.now(),
        name: 'Nguyễn Duy',
        time: 'Bây giờ',
        content: input.trim()
      },
      ...announcements
    ]);
    setInput('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle image upload logic here
      console.log('Image uploaded:', file);
    }
  };

  return (
    <div className="teacher-notify-page">
      <Header />
      <div className="teacher-notify-content">
        <TeacherSidebar />
        <div className="teacher-notify-header">
          <h1 className="teacher-notify-title">Bảng tin</h1>
        </div>
        <div className="teacher-notify-list">
          <form className="teacher-notify-form" onSubmit={handlePost}>
            <div className="teacher-notify-input-container">
              <div className="teacher-notify-avatar">
                <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                </svg>
              </div>
              <div className="teacher-notify-textarea-container">
                <textarea
                  className="teacher-notify-textarea"
                  placeholder="Nhập nội dung thảo luận với lớp học..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={1}
                />
              </div>
            </div>
            <div className="teacher-notify-actions">
              <label className="teacher-notify-image-upload">
                <div className="teacher-notify-image-btn">
                  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
                  </svg>
                  <span>Thêm hình ảnh</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
              <button
                type="submit"
                className={`teacher-notify-post-btn ${!input.trim() ? 'disabled' : ''}`}
                disabled={!input.trim()}
              >
                Đăng tin
              </button>
            </div>
          </form>
          {announcements.map(a => (
            <div className="teacher-notify-card" key={a.id}>
              <div className="teacher-notify-card-header">
                <div className="teacher-notify-card-user-info">
                  <div className="teacher-notify-card-avatar">
                    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                  </div>
                  <div className="teacher-notify-card-user-details">
                    <p className="teacher-notify-card-name">{a.name}</p>
                    <span className="teacher-notify-card-time">{a.time}</span>
                  </div>
                </div>
                <svg className="teacher-notify-card-more" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                </svg>
              </div>
              <p className="teacher-notify-card-content">{a.content}</p>
              <div className="teacher-notify-card-stats">
                <div className="teacher-notify-card-comments">
                  <img src="/images/icons/comments-number.svg" alt="comment" />
                  <p>0 bình luận</p>
                </div>
              </div>
              <form className="teacher-notify-card-comment-form">
                <div className="teacher-notify-card-comment-input-container">
                  <div className="teacher-notify-card-comment-avatar">
                    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                  </div>
                  <div className="teacher-notify-card-comment-input-wrapper">
                    <input
                      type="text"
                      placeholder="Viết bình luận ..."
                      className="teacher-notify-card-comment-input"
                    />
                  </div>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherNotificationPage; 