import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClassSchedule.css';
import Header from './Header';
import { 
  CalendarDays, 
  Plus, 
  X,
  Monitor,
  Video,
  Users,
  ChevronDown,
  Calendar,
  Clock,
  Link2
  
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function ClassSchedule() {
  // State management
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [activePlatform, setActivePlatform] = useState('zoom');
  const [repeatOption, setRepeatOption] = useState('none');
  const [classTime, setClassTime] = useState('07:00');
  const [className, setClassName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [checkedClasses, setCheckedClasses] = useState([]);
  const [classLink, setClassLink] = useState('');
 const navigate = useNavigate();
  // Platform options
  const platforms = [
    { id: 'zoom', icon: <Video size={20} />, name: 'Zoom' },
    { id: 'meet', icon: <Monitor size={20} />, name: 'Google Meet' },
    { id: 'teams', icon: <Users size={20} />, name: 'Teams' },
  ];

  // Repeat options
  const repeatOptions = [
    { value: 'none', label: 'Không lặp lại' },
    { value: 'daily', label: 'Hàng ngày' },
    { value: 'weekly', label: 'Hàng tuần' },
    { value: 'monthly', label: 'Hàng tháng' }
  ];

  // Sample class data
  const todayClasses = [
    { 
      id: 1, 
      name: 'S', 
      subName: 'Siuuuuuu', 
      code: 'HDKKU',
      image: 'https://example.com/path-to-image1.jpg',
      time: '07:00'
    },
    { 
      id: 2, 
      name: 'D', 
      subName: '1234Absdth', 
      code: 'OURLC',
      image: 'https://example.com/path-to-image2.jpg',
      time: '08:00'
    }
  ];

  // Handle checkbox selection
  const handleCheckClass = (classId) => {
    setCheckedClasses(prev => 
      prev.includes(classId) 
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  // Navigation between modals
  const handleNext = () => {
    setShowCreateModal(false);
    setShowOfflineModal(true);
  };

  // Form submission
  const handleConfirm = () => {
    console.log('Selected classes:', checkedClasses);
    console.log('Class details:', {
      className,
      date: selectedDate,
      time: classTime,
      repeat: repeatOption,
      platform: activePlatform
    });
    setShowOfflineModal(false);
  };

  // Format date in Vietnamese
  const formattedDate = format(selectedDate, 'd MMMM', { locale: vi });
  const isOnline = activePlatform === 'zoom' || activePlatform === 'meet' || activePlatform === 'teams';

  return (
    <div className="class-schedule">
      <Header teacherName="Nguyễn Duy" />

      {/* Main Content */}
      <div className="top-section">
        <h1 className="schedule-title">Tạo phòng dạy theo lịch nhanh chóng</h1>
        <p className="schedule-sub">Hỗ trợ tạo phòng Google Meet, Zoom Pro, Teams, Zavi,... mọi lúc mọi nơi</p>
        <div className="schedule-actions">
          <button 
            className="create-button" 
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={18} />
            Tạo phòng mới
          </button>
          <button className="manage-button"
          onClick={() => navigate('/teacher/manageschedule')}
          >
            <CalendarDays size={18} />
            Quản lý lịch
          </button>
        </div>
      </div>

      <div className="section-header">
        <span className="section-title">Phòng dạy hôm nay</span>
      </div>

      <div className="today-classes-list">
        {todayClasses.length > 0 ? (
          todayClasses.map((classItem) => (
            <div className="today-class-card" key={classItem.id}>
              <span className="class-time">{classItem.time || '07:00'}</span>
              <span className="class-name">{classItem.subName}</span>
              <span className="class-status">Đang diễn ra</span>
            </div>
          ))
        ) : (
          <div className="empty-state">Không có buổi học nào diễn ra hôm nay</div>
        )}
      </div>

      {/* Create Classroom Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="room-modal">
            <div className="modal-header">
              <h2>Tạo phòng học</h2>
              <button 
                className="close-button"
                onClick={() => setShowCreateModal(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="room-list">
              {todayClasses.map((classItem) => (
                <div key={classItem.id} className="room-item">
                  <div className="room-thumbnail">
                    {classItem.image ? (
                      <img src={classItem.image} alt={classItem.subName} />
                    ) : (
                      <div className="room-thumbnail-letter">
                        {classItem.name}
                      </div>
                    )}
                  </div>
                  <div className="room-info">
                    <div className="room-name">{classItem.subName}</div>
                    {classItem.code && (
                      <div className="room-code">Mã lớp: {classItem.code}</div>
                    )}
                  </div>
                  <div className="room-checkbox">
                    <input 
                      type="checkbox" 
                      checked={checkedClasses.includes(classItem.id)}
                      onChange={() => handleCheckClass(classItem.id)}
                      className="class-checkbox"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowCreateModal(false)}
              >
                Hủy
              </button>
              <button 
                className="next-button" 
                onClick={() => {
                  setShowCreateModal(false);
                  navigate('/teacher/schedule/create');
                }}
                disabled={checkedClasses.length === 0}
              >
                Tiếp theo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Offline Classroom Modal */}
      {showOfflineModal && (
        <div className="modal-overlay">
          <div className="room-modal offline-modal modern-modal">
            <div className="modal-header">
              <h2 className="modal-title">
                Tạo phòng học <span className="class-type">{activePlatform === 'offline' ? 'Offline' : platforms.find(p => p.id === activePlatform)?.name}</span>
              </h2>
              <button className="close-button" onClick={() => setShowOfflineModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="platform-tabs-container">
              <div className="platform-tabs modern-tabs">
                {platforms.map(platform => (
                  <button
                    key={platform.id}
                    className={`platform-tab modern-tab ${activePlatform === platform.id ? 'active' : ''}`}
                    onClick={() => setActivePlatform(platform.id)}
                  >
                    <div className="platform-icon">{platform.icon}</div>
                    <span className="platform-name">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="modern-form">
              <div className="form-group">
                <label className="form-label">Tên buổi học</label>
                <input
                  type="text"
                  className="form-input modern-input"
                  placeholder="Nhập tên buổi học"
                  value={className}
                  onChange={e => setClassName(e.target.value)}
                />
              </div>
              {isOnline && (
                <div className="form-group">
                  <label className="form-label">Link phòng học</label>
                  <div className="input-icon-group">
                    <span className="input-icon"><Link2 size={18} /></span>
                    <input
                      type="text"
                      className="form-input modern-input"
                      placeholder="Dán link phòng học..."
                      value={classLink}
                      onChange={e => setClassLink(e.target.value)}
                    />
                  </div>
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Ngày</label>
                <div className="input-icon-group">
                  <span className="input-icon"><Calendar size={18} /></span>
                  <input
                    type="date"
                    className="form-input modern-input"
                    value={format(selectedDate, 'yyyy-MM-dd')}
                    onChange={e => setSelectedDate(new Date(e.target.value))}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Giờ bắt đầu</label>
                <div className="input-icon-group">
                  <span className="input-icon"><Clock size={18} /></span>
                  <input
                    type="time"
                    className="form-input modern-input"
                    value={classTime}
                    onChange={e => setClassTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Lặp lại</label>
                <div className="select-container">
                  <select
                    className="form-select modern-input"
                    value={repeatOption}
                    onChange={e => setRepeatOption(e.target.value)}
                  >
                    {repeatOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="select-arrow" />
                </div>
              </div>
              <div className="modal-actions modern-actions">
                <button className="cancel-button outlined modern-btn" onClick={() => { setShowOfflineModal(false); setShowCreateModal(true); }}>Quay lại</button>
                <button className="next-button contained modern-btn" onClick={handleConfirm}>Xác nhận</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}