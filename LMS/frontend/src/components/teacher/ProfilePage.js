import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdPerson, 
  MdPhone, 
  MdEmail, 
  MdLock, 
  MdFacebook, 
  MdLocationOn, 
  MdSchool, 
  MdCalendarToday,
  MdSecurity,
  MdContentCopy,
  MdEdit,
  MdCameraAlt,
  MdClose,
  MdSave
} from "react-icons/md";
import Header from './Header';
import './ProfilePage.css';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Có thể thêm toast notification ở đây
    alert('Đã sao chép vào clipboard!');
  };

  const handleEdit = (field) => {
    setEditingField(field);
    // Lấy giá trị hiện tại để hiển thị trong modal
    const currentValue = userData[field] || '';
    setEditValue(currentValue);
  };

  const handleSaveEdit = async () => {
    if (!editValue.trim()) {
      alert('Vui lòng nhập giá trị!');
      return;
    }

    setIsLoading(true);
    try {
      // Validate dữ liệu
      if (editingField === 'email' && !isValidEmail(editValue)) {
        alert('Email không hợp lệ!');
        return;
      }
      if (editingField === 'phone' && !isValidPhone(editValue)) {
        alert('Số điện thoại không hợp lệ!');
        return;
      }

      // Gửi request cập nhật đến server
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          [editingField]: editValue
        })
      });

      if (response.ok) {
        // Cập nhật state local
        const updatedUser = { ...user, [editingField]: editValue };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        alert('Cập nhật thành công!');
        setEditingField(null);
        setEditValue('');
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('Có lỗi xảy ra khi cập nhật. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
  };

  const getFieldLabel = (field) => {
    const labels = {
      username: 'Tên đăng nhập',
      phone: 'Số điện thoại',
      email: 'Email',
      password: 'Mật khẩu',
      facebook: 'Liên kết Facebook',
      name: 'Tên',
      birthDate: 'Ngày sinh',
      province: 'Tỉnh',
      school: 'Trường'
    };
    return labels[field] || field;
  };

  const getFieldType = (field) => {
    if (field === 'email') return 'email';
    if (field === 'phone') return 'tel';
    if (field === 'password') return 'password';
    if (field === 'birthDate') return 'date';
    return 'text';
  };

  const getFieldPlaceholder = (field) => {
    const placeholders = {
      username: 'Nhập tên đăng nhập',
      phone: 'Nhập số điện thoại',
      email: 'Nhập email',
      password: 'Nhập mật khẩu mới',
      facebook: 'Nhập link Facebook',
      name: 'Nhập họ và tên',
      birthDate: 'Chọn ngày sinh',
      province: 'Nhập tỉnh/thành phố',
      school: 'Nhập tên trường'
    };
    return placeholders[field] || 'Nhập thông tin';
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Hàm tạo initials từ tên
  const getInitials = (name) => {
    if (!name) return '';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[words.length - 2][0] + words[words.length - 1][0]).toUpperCase();
  };

  const handleUploadAvatar = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Kiểm tra loại file
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file ảnh!');
        return;
      }

      // Kiểm tra kích thước file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File ảnh quá lớn! Vui lòng chọn file nhỏ hơn 5MB.');
        return;
      }

      setAvatar(file);
      
      // Tạo preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = async () => {
    if (!avatar) return;

    try {
      // Tạo FormData để gửi file
      const formData = new FormData();
      formData.append('avatar', avatar);

      // Gửi request đến server
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Avatar uploaded successfully:', result);
        // Có thể lưu URL avatar vào localStorage hoặc state
        alert('Cập nhật avatar thành công!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Có lỗi xảy ra khi upload avatar. Vui lòng thử lại!');
    }
  };

  // Fallback data nếu không có thông tin người dùng
  const userData = user || {
    username: '0353111322',
    phone: '0353111322',
    email: 'nguyenkhanhduongduy@gmail.com',
    name: 'Nguyễn Duy',
    birthDate: '23 tháng 7 năm 1994',
    province: 'TP Hồ Chí Minh',
    school: 'CNTT'
  };

  return (
    <>
      <Header />
      <div className="teacher-profile-page">
        <div className="teacher-profile-header">
          <button className="teacher-back-button" onClick={handleBack}>
            ← Quay lại
          </button>
          <h1 className="teacher-profile-title">Hồ sơ của tôi</h1>
          <div className="teacher-security-status">
            <MdSecurity className="teacher-security-icon" />
            <span>Tài khoản an toàn</span>
          </div>
        </div>

        {/* Content Container - Có thể cuộn */}
        <div className="teacher-profile-content-wrapper">
          {/* Avatar Section */}
          <div className="teacher-avatar-section">
            <div className="teacher-main-avatar">
              <div className="teacher-avatar-placeholder">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Avatar" 
                    className="teacher-avatar-image"
                  />
                ) : (
                  getInitials(userData.name)
                )}
              </div>
              <button className="teacher-camera-button" onClick={handleUploadAvatar}>
                <MdCameraAlt />
              </button>
              {avatar && (
                <button className="teacher-save-avatar-button" onClick={handleSaveAvatar}>
                  Lưu
                </button>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>

          <div className="teacher-profile-content">
            {/* Thông tin tài khoản */}
            <div className="teacher-profile-section">
              <h2 className="teacher-section-title">Thông tin tài khoản</h2>
              
              <div className="teacher-info-item">
                <div className="teacher-info-icon">
                  <MdPerson />
                </div>
                <div className="teacher-info-content">
                  <div className="teacher-info-label">Tên đăng nhập</div>
                  <div className="teacher-info-value">{userData.username}</div>
                </div>
                <button 
                  className="teacher-copy-button"
                  onClick={() => handleCopy(userData.username)}
                  title="Sao chép"
                >
                  <MdContentCopy />
                </button>
              </div>

              <div className="teacher-info-item">
                <div className="teacher-info-icon teacher-phone-icon">
                  <MdPhone />
                </div>
                <div className="teacher-info-content">
                  <div className="teacher-info-label">Số điện thoại</div>
                  <div className="teacher-info-value">{userData.phone}</div>
                </div>
                <div className="teacher-info-actions">
                  <span className="teacher-verify-badge">Xác minh</span>
                  <button 
                    className="teacher-edit-button"
                    onClick={() => handleEdit('phone')}
                  >
                    <MdEdit />
                    Chỉnh sửa
                  </button>
                </div>
              </div>

              <div className="teacher-info-item">
                <div className="teacher-info-icon teacher-email-icon">
                  <MdEmail />
                </div>
                <div className="teacher-info-content">
                  <div className="teacher-info-label">Email</div>
                  <div className="teacher-info-value">{userData.email}</div>
                </div>
                <div className="teacher-info-actions">
                  <span className="teacher-verify-badge">Xác minh</span>
                  <button 
                    className="teacher-edit-button"
                    onClick={() => handleEdit('email')}
                  >
                    <MdEdit />
                    Chỉnh sửa
                  </button>
                </div>
              </div>

              <div className="teacher-info-item">
                <div className="teacher-info-icon teacher-password-icon">
                  <MdLock />
                </div>
                <div className="teacher-info-content">
                  <div className="teacher-info-label">Mật khẩu</div>
                  <div className="teacher-info-value">********</div>
                </div>
                <button 
                  className="teacher-edit-button"
                  onClick={() => handleEdit('password')}
                >
                  <MdEdit />
                  Chỉnh sửa
                </button>
              </div>

              <div className="teacher-info-item">
                <div className="teacher-info-icon teacher-facebook-icon">
                  <MdFacebook />
                </div>
                <div className="teacher-info-content">
                  <div className="teacher-info-label">Liên kết Facebook</div>
                  <div className="teacher-info-value">Chưa liên kết</div>
                </div>
                <button 
                  className="teacher-edit-button"
                  onClick={() => handleEdit('facebook')}
                >
                  <MdEdit />
                  Chỉnh sửa
                </button>
              </div>

              <div className="teacher-info-tip">
                (*) Mẹo: Nếu bạn là một người kĩ tính hãy cập nhật đúng số điện thoại hoặc email để thuận tiện cho việc đăng nhập và lấy lại mật khẩu.
              </div>
            </div>

            {/* Thông tin cá nhân */}
            <div className="teacher-profile-section">
              <h2 className="teacher-section-title">Thông tin cá nhân</h2>
              <div className="teacher-section-intro">
                Cung cấp đúng thông tin cá nhân của bạn để không bị nhầm lẫn khi tham gia lớp học hoặc bài kiểm tra.
              </div>
              
              <div className="teacher-info-item">
                <div className="teacher-info-icon teacher-name-icon">
                  <MdPerson />
                </div>
                <div className="teacher-info-content">
                  <div className="teacher-info-label">Tên</div>
                  <div className="teacher-info-value">{userData.name}</div>
                </div>
                <button 
                  className="teacher-edit-button"
                  onClick={() => handleEdit('name')}
                >
                  <MdEdit />
                  Chỉnh sửa
                </button>
              </div>

              <div className="teacher-info-item">
                <div className="teacher-info-icon teacher-birth-icon">
                  <MdCalendarToday />
                </div>
                <div className="teacher-info-content">
                  <div className="teacher-info-label">Ngày sinh</div>
                  <div className="teacher-info-value">{userData.birthDate}</div>
                </div>
                <button 
                  className="teacher-edit-button"
                  onClick={() => handleEdit('birthDate')}
                >
                  <MdEdit />
                  Chỉnh sửa
                </button>
              </div>

              <div className="teacher-info-item">
                <div className="teacher-info-icon teacher-location-icon">
                  <MdLocationOn />
                </div>
                <div className="teacher-info-content">
                  <div className="teacher-info-label">Tỉnh</div>
                  <div className="teacher-info-value">{userData.province}</div>
                </div>
                <button 
                  className="teacher-edit-button"
                  onClick={() => handleEdit('province')}
                >
                  <MdEdit />
                  Chỉnh sửa
                </button>
              </div>

              <div className="teacher-info-item">
                <div className="teacher-info-icon teacher-school-icon">
                  <MdSchool />
                </div>
                <div className="teacher-info-content">
                  <div className="teacher-info-label">Trường</div>
                  <div className="teacher-info-value">{userData.school}</div>
                </div>
                <button 
                  className="teacher-edit-button"
                  onClick={() => handleEdit('school')}
                >
                  <MdEdit />
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editingField && (
          <div className="teacher-profile-edit-modal-overlay">
            <div className="teacher-profile-edit-modal">
              <div className="teacher-profile-edit-modal-header">
                <h3>Chỉnh sửa {getFieldLabel(editingField)}</h3>
                <button className="teacher-profile-close-button" onClick={handleCancelEdit}>
                  <MdClose />
                </button>
              </div>
              <div className="teacher-profile-edit-modal-body">
                <label className="teacher-profile-edit-label">
                  {getFieldLabel(editingField)}:
                </label>
                <input
                  type={getFieldType(editingField)}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder={getFieldPlaceholder(editingField)}
                  className="teacher-profile-edit-input"
                  autoFocus
                />
              </div>
              <div className="teacher-profile-edit-modal-footer">
                <button 
                  className="teacher-profile-cancel-button" 
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                >
                  Hủy
                </button>
                <button 
                  className="teacher-profile-save-button" 
                  onClick={handleSaveEdit}
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang lưu...' : 'Lưu'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfilePage; 