import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateClass.css';

export default function CreateClass() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    className: '',
    subject: '',
    grade: '',
    allowGradeView: true,
    coverImage: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra kích thước file (tối đa 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Ảnh không được vượt quá 2MB');
        return;
      }
      
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData(prev => ({
        ...prev,
        coverImage: file
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.className || !formData.subject || !formData.grade) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    
    console.log('Dữ liệu lớp học:', formData);
    alert('Tạo lớp học thành công!');
    navigate('/teacher');
  };

  // Danh sách môn học và khối lớp
  const subjects = ['Toán', 'Ngữ Văn', 'Tiếng Anh', 'Vật Lý', 'Hóa Học', 'Sinh Học', 'Lịch Sử', 'Địa Lý'];
  const grades = ['6', '7', '8', '9', '10', '11', '12'];

  return (
    <div className="create-class-container">
      <h1>Tạo lớp học mới</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Phần tải ảnh bìa */}
        <div className="form-group">
          <label>Ảnh bìa lớp học</label>
          <div className="image-upload-container">
            <div 
              className="image-preview" 
              onClick={triggerFileInput}
              style={previewImage ? { 
                backgroundImage: `url(${previewImage})`,
                backgroundSize: 'cover'
              } : null}
            >
              {!previewImage && (
                <div className="upload-placeholder">
                  <span>+ Tải ảnh lên</span>
                  <p>Khuyến nghị ảnh tỉ lệ 3:1 (VD: 1200x400px)</p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Tên lớp */}
        <div className="form-group">
          <label>Tên lớp học *</label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
            placeholder="Ví dụ: Lớp Toán 10A1"
            required
          />
        </div>

        {/* Môn học */}
        <div className="form-group">
          <label>Môn học *</label>
          <select 
            name="subject" 
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Chọn môn học</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* Khối lớp */}
        <div className="form-group">
          <label>Khối lớp *</label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
          >
            <option value="">Chọn khối lớp</option>
            {grades.map(grade => (
              <option key={grade} value={grade}>Lớp {grade}</option>
            ))}
          </select>
        </div>

        {/* Cài đặt */}
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="allowGradeView"
              checked={formData.allowGradeView}
              onChange={handleChange}
            />
            Cho phép học sinh xem bảng điểm
          </label>
        </div>

        {/* Nút submit */}
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/teacher/dashboard')} className="cancel-btn">
            Hủy
          </button>
          <button type="submit" className="submit-btn">
            Tạo lớp học
          </button>
        </div>
      </form>
    </div>
  );
}