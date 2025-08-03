import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './ManageSchedule.css';
import { 
  CalendarDays, 
  X,
  CircleDot,
  Plus,
  Monitor,
  Video,
  Users,
  ChevronDown,
  Pencil,
  Trash2
  
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const getWeekDates = (date = new Date()) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const startDate = new Date(date.setDate(diff));
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  return {
    startDate,
    endDate,
    weekRange: `${startDate.getDate()}/${startDate.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}, ${endDate.getFullYear()}`,
    weekDays: Array.from({ length: 7 }).map((_, i) => {
      const dayDate = new Date(startDate);
      dayDate.setDate(startDate.getDate() + i);
      const isToday = new Date().toDateString() === dayDate.toDateString();
      return {
        label: i === 6 ? 'Chủ nhật' : `Thứ ${i + 2}`,
        date: `${dayDate.getDate()}/${dayDate.getMonth() + 1}`,
        isToday,
        fullDate: dayDate
      };
    })
  };
};

const getMonthDates = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const firstDayOfWeek = firstDay.getDay();
  const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - adjustedFirstDay);
  
  const endDate = new Date(lastDay);
  const daysToAdd = 42 - (lastDay.getDate() + adjustedFirstDay);
  endDate.setDate(lastDay.getDate() + daysToAdd);
  
  const monthRange = `${format(firstDay, 'MMMM yyyy', { locale: vi })}`;
  
  const monthDays = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const isToday = new Date().toDateString() === currentDate.toDateString();
    const isCurrentMonth = currentDate.getMonth() === month;
    const isCurrentYear = currentDate.getFullYear() === year;
    
    monthDays.push({
      date: currentDate.getDate(),
      fullDate: new Date(currentDate),
      isToday,
      isCurrentMonth: isCurrentMonth && isCurrentYear,
      dayOfWeek: currentDate.getDay(),
      dayName: format(currentDate, 'EEEE', { locale: vi })
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return {
    monthRange,
    monthDays,
    firstDay,
    lastDay
  };
};

// Dữ liệu mẫu cho lịch giáo viên
const TEACHER_WEEKLY_SCHEDULE = {
  '28-7': [
    {
      id: 1,
      classId: 'CS101',
      className: 'Lập trình cơ bản',
      room: 'CNTT Lab',
      time: '08:00 - 10:00',
      status: 'Đang diễn ra',
      attendance: '25/30',
      type: 'offline',
      icon: '🏢'
    },
    {
      id: 2,
      classId: 'CS102',
      className: 'Cấu trúc dữ liệu',
      room: 'Phòng thực hành Lab',
      time: '14:00 - 16:00',
      status: 'Chưa bắt đầu',
      attendance: '0/28',
      type: 'offline',
      icon: '🏢'
    }
  ],
  '29-7': [
    {
      id: 3,
      classId: 'CS103',
      className: 'Thuật toán',
      room: 'Zoom Meeting',
      time: '09:00 - 11:00',
      status: 'Đang diễn ra',
      attendance: '22/25',
      type: 'online',
      icon: '💬'
    }
  ],
  '30-7': [
    {
      id: 4,
      classId: 'CS104',
      className: 'Cơ sở dữ liệu',
      room: 'Microsoft Teams',
      time: '13:00 - 15:00',
      status: 'Chưa bắt đầu',
      attendance: '0/30',
      type: 'online',
      icon: '💬'
    }
  ],
  '31-7': [
    {
      id: 5,
      classId: 'CS105',
      className: 'Mạng máy tính',
      room: 'Google Meet Room',
      time: '10:00 - 12:00',
      status: 'Đã kết thúc',
      attendance: '28/30',
      type: 'online',
      icon: '💬'
    }
  ],
  '1-8': [
    {
      id: 6,
      classId: 'CS106',
      className: 'Bảo mật thông tin',
      room: 'CNTT',
      time: '15:00 - 17:00',
      status: 'Chưa bắt đầu',
      attendance: '0/26',
      type: 'offline',
      icon: '🏢'
    }
  ]
};

const TEACHER_MONTHLY_SCHEDULE = [
  {
    className: 'Lập trình cơ bản',
    room: 'CNTT Lab',
    type: 'Offline',
    start: '28 tháng 7 lúc 08:00',
    status: 'Đang diễn ra',
    attendance: '25/30',
    teacher: 'Nguyễn Duy'
  },
  {
    className: 'Thuật toán',
    room: 'Zoom Meeting',
    type: 'Online',
    start: '29 tháng 7 lúc 09:00',
    status: 'Đang diễn ra',
    attendance: '22/25',
    teacher: 'Nguyễn Duy'
  },
  {
    className: 'Cơ sở dữ liệu',
    room: 'Microsoft Teams',
    type: 'Online',
    start: '30 tháng 7 lúc 13:00',
    status: 'Chưa bắt đầu',
    attendance: '0/30',
    teacher: 'Nguyễn Duy'
  }
];

export default function ManageSchedule() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const { weekRange, weekDays } = getWeekDates(currentDate);
  const { monthRange, monthDays } = getMonthDates(currentDate);
  
  // Tooltip state
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [tooltipStyle, setTooltipStyle] = useState({ display: 'none' });
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
  const [isEventHovered, setIsEventHovered] = useState(false);

  // Monthly view action menu state
  const [monthlyHoveredEvent, setMonthlyHoveredEvent] = useState(null);
  const [monthlyMenuStyle, setMonthlyMenuStyle] = useState({ display: 'none' });
  const [isMonthlyMenuHovered, setIsMonthlyMenuHovered] = useState(false);
  const [isMonthlyButtonHovered, setIsMonthlyButtonHovered] = useState(false);

  // Modal state management
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [activePlatform, setActivePlatform] = useState('zoom');
  const [repeatOption, setRepeatOption] = useState('none');
  const [classTime, setClassTime] = useState('07:00');
  const [className, setClassName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [checkedClasses, setCheckedClasses] = useState([]);

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

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventHover = (event, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const tooltipWidth = 400;
    const tooltipHeight = 200;
    const overlap = 12;
    let left, top;
    
    const spaceOnRight = window.innerWidth - rect.right;
    const spaceOnLeft = rect.left;
    
    if (spaceOnRight < tooltipWidth || spaceOnLeft > spaceOnRight) {
      left = rect.left - tooltipWidth + overlap;
    } else {
      left = rect.right - overlap;
    }
    
    if (left + tooltipWidth > window.innerWidth - 8) {
      left = window.innerWidth - tooltipWidth - 8;
    }
    if (left < 8) {
      left = 8;
    }
    
    top = rect.top;
    
    if (top + tooltipHeight > window.innerHeight - 8) {
      top = rect.bottom - tooltipHeight;
    }
    
    if (top < 8) {
      top = 8;
    }
    
    setHoveredEvent(event);
    setTooltipStyle({
      display: 'block',
      left: `${left}px`,
      top: `${top}px`
    });
  };

  const handleEventLeave = () => {
    setHoveredEvent(null);
    setTooltipStyle({ display: 'none' });
  };

  // Monthly view action menu handlers
  const handleMonthlyButtonClick = (event, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 500;
    const menuHeight = 200;
    const overlap = 8;
    let left, top;
    
    const spaceOnRight = window.innerWidth - rect.right;
    const spaceOnLeft = rect.left;
    
    if (spaceOnRight < menuWidth || spaceOnLeft > spaceOnRight) {
      left = rect.left - menuWidth + overlap;
    } else {
      left = rect.right - overlap;
    }
    
    if (left + menuWidth > window.innerWidth - 8) {
      left = window.innerWidth - menuWidth - 8;
    }
    if (left < 8) {
      left = 8;
    }
    
    top = rect.bottom + 4;
    
    if (top + menuHeight > window.innerHeight - 8) {
      top = rect.top - menuHeight - 4;
    }
    
    if (top < 8) {
      top = 8;
    }
    
    if (top + menuHeight > window.innerHeight - 8) {
      top = window.innerHeight - menuHeight - 8;
    }
    
    setMonthlyHoveredEvent(event);
    setMonthlyMenuStyle({
      display: 'block',
      left: `${left}px`,
      top: `${top}px`
    });
  };

  const handleMonthlyButtonClose = () => {
    setMonthlyHoveredEvent(null);
    setMonthlyMenuStyle({ display: 'none' });
  };

  useEffect(() => {
    if (!isEventHovered && !isTooltipHovered) {
      setHoveredEvent(null);
      setTooltipStyle({ display: 'none' });
    }
  }, [isEventHovered, isTooltipHovered]);

  useEffect(() => {
    if (!isMonthlyButtonHovered && !isMonthlyMenuHovered) {
      setMonthlyHoveredEvent(null);
      setMonthlyMenuStyle({ display: 'none' });
    }
  }, [isMonthlyButtonHovered, isMonthlyMenuHovered]);

  // Close monthly menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (monthlyHoveredEvent && !event.target.closest('.teacher-monthly-action-menu') && !event.target.closest('.teacher-action-menu-btn')) {
        setMonthlyHoveredEvent(null);
        setMonthlyMenuStyle({ display: 'none' });
        setIsMonthlyButtonHovered(false);
        setIsMonthlyMenuHovered(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [monthlyHoveredEvent]);

  const getScheduleForDate = (date) => {
    const dayKey = `${date.getDate()}-${date.getMonth() + 1}`;
    return TEACHER_WEEKLY_SCHEDULE[dayKey] || [];
  };

  const renderWeekView = () => (
    <div className="teacher-schedule-week-view">
      <div className="teacher-schedule-grid">
        {weekDays.map((day, index) => {
          const dayKey = day.date.replace(/\//g, '-');
          const daySchedule = TEACHER_WEEKLY_SCHEDULE[dayKey] || [];
          return (
            <div className={`teacher-day-column ${day.isToday ? 'teacher-today' : ''}`} key={index}>
              <div className="teacher-day-header">
                <div className="teacher-day-title">
                  <div className="teacher-day-name">
                    {day.label}{day.isToday ? ' - Hôm nay' : ''}
                  </div>
                  <div className="teacher-day-date">{day.date}</div>
                </div>
                <button 
                  className="teacher-add-button" 
                  onClick={() => navigate('/teacher/schedule')}
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="teacher-day-divider"></div>
              <div className="teacher-events-list">
                {daySchedule.length > 0 ? (
                  daySchedule.map((event, eventIndex) => {
                    const roomIcon = getRoomIcon(event.type || 'Offline', event.room);
                    return (
                      <div 
                        className="teacher-event-card"
                        key={eventIndex}
                        onMouseEnter={(e) => { handleEventHover(event, e); setIsEventHovered(true); }}
                        onMouseLeave={() => setIsEventHovered(false)}
                      >
                        <div className="teacher-event-card-header">
                          <span className="teacher-event-icon">
                            <img src={roomIcon.src} alt={roomIcon.alt} />
                          </span>
                          <span className={`teacher-event-status ${event.status.toLowerCase().replace(/\s+/g, '-')}`}>
                            {event.status}
                          </span>
                        </div>
                        <div className="teacher-event-class">{event.classId}</div>
                        <div className="teacher-event-room">{event.room}</div>
                        <div className="teacher-event-attendance">
                          <div style={{display:'flex', alignItems:'center', gap:4}}>
                            <div dangerouslySetInnerHTML={{ __html: getAttendanceIconNew('Chưa điểm danh').svg }} />
                            <span>{event.attendance}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="teacher-empty-schedule">
                    Không có lịch học
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderMonthView = () => (
    <div className="teacher-schedule-month-view">
      <div className="teacher-schedule-table-container">
        <table className="teacher-schedule-table">
          <thead>
            <tr>
              <th>Tên lớp</th>
              <th>Tên phòng</th>
              <th>Loại phòng</th>
              <th>Bắt đầu</th>
              <th>Trạng thái</th>
              <th>Điểm danh</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {TEACHER_MONTHLY_SCHEDULE.map((item, index) => {
              const roomIcon = getRoomIcon(item.type, item.room);
              return (
                <tr 
                  key={index}
                  className="teacher-schedule-row"
                  onMouseEnter={(e) => handleEventHover(item, e)}
                  onMouseLeave={handleEventLeave}
                >
                  <td className="teacher-class-name">{item.className}</td>
                  <td className="teacher-room-name">{item.room}</td>
                  <td className="teacher-room-type">
                    <div className="teacher-room-type-content">
                      <img src={roomIcon.src} alt={roomIcon.alt} />
                      <span>{item.type}</span>
                    </div>
                  </td>
                  <td className="teacher-start-time">
                    <div style={{display:'flex', alignItems:'center', gap:8}}>
                      <div dangerouslySetInnerHTML={{ __html: getTimeIconNew().svg }} />
                      <span>{item.start}</span>
                    </div>
                  </td>
                  <td className="teacher-status">
                    <span className={`teacher-status-badge ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="teacher-attendance">
                    <div style={{display:'flex', alignItems:'center', gap:8}}>
                      <div dangerouslySetInnerHTML={{ __html: getAttendanceIconNew('Chưa điểm danh').svg }} />
                      <span>{item.attendance}</span>
                    </div>
                  </td>
                  <td className="teacher-actions">
                    <button 
                      className="teacher-action-menu-btn"
                      onClick={(e) => {
                        setIsMonthlyButtonHovered(true);
                        handleMonthlyButtonClick(item, e);
                      }}
                    >
                      <span>⋮</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const getEventStatus = (event) => {
    if (event.status === 'Đang diễn ra') return 'dang-diễn-ra';
    if (event.status === 'Chưa bắt đầu') return 'chưa-bắt-đầu';
    if (event.status === 'Đã kết thúc') return 'đã-kết-thúc';
    return 'chưa-bắt-đầu';
  };

  const getAttendanceStatus = (event) => {
    if (event.attendance && event.attendance.includes('/')) {
      const [attended, total] = event.attendance.split('/');
      if (parseInt(attended) > 0) return 'Đã điểm danh';
    }
    return 'Chưa điểm danh';
  };

  const getEventStatusOverride = (dayKey, eventIndex) => {
    const statuses = ['Đang diễn ra', 'Chưa bắt đầu', 'Đã kết thúc'];
    return statuses[eventIndex % statuses.length];
  };

  const getAttendanceStatusOverride = (dayKey) => {
    const attendances = ['0/2', '1/2', '2/2'];
    return attendances[Math.floor(Math.random() * attendances.length)];
  };

  const getActualAttendanceStatus = (dayKey) => {
    const statuses = ['Chưa điểm danh', 'Đã điểm danh'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getRoomIcon = (roomType, roomName) => {
    if (roomType === 'Google Meet' || roomName.toLowerCase().includes('meet') || roomName.toLowerCase().includes('google')) {
      return {
        src: "https://img.icons8.com/color/24/000000/google-meet--v2.png",
        alt: "Google Meet"
      };
    }
    
    if (roomType === 'Zoom' || roomName.toLowerCase().includes('zoom')) {
      return {
        src: "https://img.icons8.com/color/24/000000/zoom.png",
        alt: "Zoom"
      };
    }
    
    if (roomType === 'Teams' || roomName.toLowerCase().includes('teams') || roomName.toLowerCase().includes('microsoft')) {
      return {
        src: "https://img.icons8.com/color/24/000000/microsoft-teams.png",
        alt: "Microsoft Teams"
      };
    }
    
    if (roomType === 'Skype' || roomName.toLowerCase().includes('skype')) {
      return {
        src: "https://img.icons8.com/color/24/000000/skype.png",
        alt: "Skype"
      };
    }
    
    return {
      src: "https://img.icons8.com/color/24/000000/classroom.png",
      alt: "Offline"
    };
  };

  const getRoomIconSmall = (roomType, roomName) => {
    const icon = getRoomIcon(roomType, roomName);
    return {
      ...icon,
      src: icon.src.replace('/24/', '/16/')
    };
  };

  const getAttendanceIconNew = (attendanceStatus) => {
    if (attendanceStatus === 'Đã điểm danh') {
      return {
        svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="5" r="2.5" stroke="#374151" stroke-width="1.5" fill="none"/>
          <path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#374151" stroke-width="1.5" fill="none"/>
          <path d="M11 4l2 2-2 2" stroke="#374151" stroke-width="1.5" fill="none"/>
        </svg>`,
        alt: "Đã điểm danh"
      };
    } else {
      return {
        svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="5" r="2.5" stroke="#374151" stroke-width="1.5" fill="none"/>
          <path d="M3 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="#374151" stroke-width="1.5" fill="none"/>
        </svg>`,
        alt: "Chưa điểm danh"
      };
    }
  };

  const getTimeIconNew = () => {
    return {
      svg: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7" stroke="#374151" stroke-width="1.5" fill="none"/>
        <path d="M8 3v5l3.5 3.5" stroke="#374151" stroke-width="1.5" fill="none"/>
      </svg>`,
      alt: "Thời gian"
    };
  };

  return (
    <>
      <Header teacherName="Nguyễn Duy" />
      <div className="teacher-schedule-container">
        <main className="teacher-schedule-main-content">
          <div className="teacher-schedule-toolbar">
                         <div className="tab-group">
               <button
                 className={`tab-button ${activeTab === 'week' ? 'active' : ''}`}
                 onClick={() => setActiveTab('week')}
               >
                 Tuần
               </button>
               <button
                 className={`tab-button ${activeTab === 'month' ? 'active' : ''}`}
                 onClick={() => setActiveTab('month')}
               >
                 Tháng
               </button>
             </div>

            <div className="teacher-week-navigator">
              <button 
                className="teacher-nav-button" 
                onClick={activeTab === 'week' ? handlePrevWeek : handlePrevMonth}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <span
                className="teacher-week-display"
                onClick={handleToday}
                title="Nhấn để về tuần hiện tại"
              >
                {activeTab === 'week' ? weekRange : monthRange}
              </span>
              <button 
                className="teacher-nav-button" 
                onClick={activeTab === 'week' ? handleNextWeek : handleNextMonth}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
              </button>
            </div>

            <div className="teacher-action-buttons">
              <button className="teacher-action-button teacher-copy">
                <i className="icon copy"></i>
                Sao chép lịch
              </button>
            </div>
          </div>

          {activeTab === 'week' ? renderWeekView() : renderMonthView()}

          {hoveredEvent && (isEventHovered || isTooltipHovered) && (
            <div 
              className="teacher-schedule-tooltip"
              style={tooltipStyle}
              onMouseEnter={() => setIsTooltipHovered(true)}
              onMouseLeave={() => setIsTooltipHovered(false)}
            >
              <div className="tooltip-header" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flex:1,marginLeft:'12px',gap:'8px'}}>
                  {['Google Meet', 'Zoom', 'Teams'].includes(hoveredEvent.type) && (
                    <button className="main-action-btn join-room-btn" style={{background:'#1976d2',color:'#fff',fontWeight:700,padding:'10px 20px',borderRadius:6,border:'none',fontSize:14,cursor:'pointer'}} onClick={() => alert('Vào phòng nhanh!')}>
                      Vào phòng
                    </button>
                  )}
                  <button className="main-action-btn detail-btn" style={{background:'#f3f4f6',color:'#374151',fontWeight:600,padding:'10px 20px',borderRadius:6,border:'1px solid #d1d5db',fontSize:14,cursor:'pointer'}} onClick={() => navigate(`/teacher/meeting/${hoveredEvent.id}`)}>
                    Chi tiết
                  </button>
                </div>
                <div className="tooltip-actions" style={{display:'flex',alignItems:'center',gap:8}}>
                  <button className="tooltip-action" title="Kết thúc" onClick={() => alert('Ghi hình buổi học!')} style={{background:'white',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center',justifyContent:'center',width:'32px',height:'32px',transition:'all 0.2s ease'}} onMouseEnter={(e) => e.target.style.background = '#f3f4f6'} onMouseLeave={(e) => e.target.style.background = 'white'}>
                    <CircleDot size={14} strokeWidth="2" color="#e53935" />
                  </button>
                  <button className="tooltip-action" title="Chỉnh sửa" onClick={() => alert('Chỉnh sửa buổi học!')} style={{background:'white',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center',justifyContent:'center',width:'32px',height:'32px',transition:'all 0.2s ease'}} onMouseEnter={(e) => e.target.style.background = '#f3f4f6'} onMouseLeave={(e) => e.target.style.background = 'white'}>
                    <Pencil size={14} strokeWidth="2" color="#444" />
                  </button>
                  <button className="tooltip-action" title="Xóa" onClick={() => window.confirm('Bạn có chắc muốn xóa buổi học này?') && alert('Đã xóa!')} style={{background:'white',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center',justifyContent:'center',width:'32px',height:'32px',transition:'all 0.2s ease'}} onMouseEnter={(e) => e.target.style.background = '#f3f4f6'} onMouseLeave={(e) => e.target.style.background = 'white'}>
                    <Trash2 size={14} strokeWidth="2" color="#444" />
                  </button>
                  <button className="tooltip-action" title="Đóng" onClick={handleEventLeave} style={{background:'white',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center',justifyContent:'center',width:'32px',height:'32px',transition:'all 0.2s ease'}} onMouseEnter={(e) => e.target.style.background = '#f3f4f6'} onMouseLeave={(e) => e.target.style.background = 'white'}>
                    <X size={14} strokeWidth="2" color="#6b7280" />
                  </button>
                </div>
              </div>
              <div className="tooltip-content" style={{marginLeft:'12px'}}>
                <div style={{fontWeight:'bold',fontSize:15,marginBottom:10,color:'#111827'}}>Lớp {hoveredEvent.className}</div>
                <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
                  <span style={{width:14,height:14,background:'#1976d2',borderRadius:2,display:'inline-block',marginRight:10}}></span>
                  <span style={{fontSize:13,color:'#374151'}}>Tên phòng: {hoveredEvent.room}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
                  {(() => {
                    const roomIcon = getRoomIcon(hoveredEvent.type, hoveredEvent.room);
                    return (
                      <img src={roomIcon.src.replace('/24/', '/18/')} alt={roomIcon.alt} style={{marginRight:10}} />
                    );
                  })()}
                  <span style={{fontSize:13,color:'#374151'}}>Loại phòng: {hoveredEvent.type}</span>
                </div>
                {(hoveredEvent.time || hoveredEvent.startTime) && (
                  <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
                    <div dangerouslySetInnerHTML={{ __html: getTimeIconNew().svg }} style={{marginRight:10}} />
                    <span style={{fontSize:13,color:'#374151'}}>Thời gian: {hoveredEvent.time || hoveredEvent.startTime}</span>
                  </div>
                )}
                <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
                  <div dangerouslySetInnerHTML={{ __html: getAttendanceIconNew(getActualAttendanceStatus(hoveredEvent.dayKey)).svg }} style={{marginRight:10}} />
                  <span style={{fontSize:13,color:'#374151'}}>{getActualAttendanceStatus(hoveredEvent.dayKey)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Monthly View Action Menu */}
          {monthlyHoveredEvent && (isMonthlyButtonHovered || isMonthlyMenuHovered) && (
            <div 
              className="teacher-monthly-action-menu"
              style={monthlyMenuStyle}
              onMouseEnter={() => setIsMonthlyMenuHovered(true)}
              onMouseLeave={() => setIsMonthlyMenuHovered(false)}
            >
              <div className="tooltip-header" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flex:1,marginLeft:'12px',gap:'8px'}}>
                  {['Google Meet', 'Zoom', 'Teams'].includes(monthlyHoveredEvent.type) && (
                    <button className="main-action-btn join-room-btn" style={{background:'#1976d2',color:'#fff',fontWeight:700,padding:'10px 20px',borderRadius:6,border:'none',fontSize:14,cursor:'pointer'}} onClick={() => alert('Vào phòng nhanh!')}>
                      Vào phòng
                    </button>
                  )}
                  <button className="main-action-btn detail-btn" style={{background:'#f3f4f6',color:'#374151',fontWeight:600,padding:'10px 20px',borderRadius:6,border:'1px solid #d1d5db',fontSize:14,cursor:'pointer'}} onClick={() => navigate(`/teacher/meeting/${monthlyHoveredEvent.id}`)}>
                    Chi tiết
                  </button>
                </div>
                <div className="tooltip-actions" style={{display:'flex',alignItems:'center',gap:8}}>
                  <button className="tooltip-action" title="Kết thúc" onClick={() => alert('Ghi hình buổi học!')} style={{background:'white',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center',justifyContent:'center',width:'32px',height:'32px',transition:'all 0.2s ease'}} onMouseEnter={(e) => e.target.style.background = '#f3f4f6'} onMouseLeave={(e) => e.target.style.background = 'white'}>
                    <CircleDot size={14} strokeWidth="2" color="#e53935" />
                  </button>
                  <button className="tooltip-action" title="Chỉnh sửa" onClick={() => alert('Chỉnh sửa buổi học!')} style={{background:'white',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center',justifyContent:'center',width:'32px',height:'32px',transition:'all 0.2s ease'}} onMouseEnter={(e) => e.target.style.background = '#f3f4f6'} onMouseLeave={(e) => e.target.style.background = 'white'}>
                    <Pencil size={14} strokeWidth="2" color="#444" />
                  </button>
                  <button className="tooltip-action" title="Xóa" onClick={() => window.confirm('Bạn có chắc muốn xóa buổi học này?') && alert('Đã xóa!')} style={{background:'white',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center',justifyContent:'center',width:'32px',height:'32px',transition:'all 0.2s ease'}} onMouseEnter={(e) => e.target.style.background = '#f3f4f6'} onMouseLeave={(e) => e.target.style.background = 'white'}>
                    <Trash2 size={14} strokeWidth="2" color="#444" />
                  </button>
                  <button className="tooltip-action" title="Đóng" onClick={handleMonthlyButtonClose} style={{background:'white',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center',justifyContent:'center',width:'32px',height:'32px',transition:'all 0.2s ease'}} onMouseEnter={(e) => e.target.style.background = '#f3f4f6'} onMouseLeave={(e) => e.target.style.background = 'white'}>
                    <X size={14} strokeWidth="2" color="#6b7280" />
                  </button>
                </div>
              </div>
              <div className="tooltip-content" style={{marginLeft:'12px'}}>
                <div style={{fontWeight:'bold',fontSize:15,marginBottom:10,color:'#111827'}}>Lớp {monthlyHoveredEvent.className}</div>
                <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
                  <span style={{width:14,height:14,background:'#1976d2',borderRadius:2,display:'inline-block',marginRight:10}}></span>
                  <span style={{fontSize:13,color:'#374151'}}>Tên phòng: {monthlyHoveredEvent.room}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
                  {(() => {
                    const roomIcon = getRoomIcon(monthlyHoveredEvent.type, monthlyHoveredEvent.room);
                    return (
                      <img src={roomIcon.src.replace('/24/', '/18/')} alt={roomIcon.alt} style={{marginRight:10}} />
                    );
                  })()}
                  <span style={{fontSize:13,color:'#374151'}}>Loại phòng: {monthlyHoveredEvent.type}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
                  <div dangerouslySetInnerHTML={{ __html: getTimeIconNew().svg }} style={{marginRight:10}} />
                  <span style={{fontSize:13,color:'#374151'}}>Bắt đầu: {monthlyHoveredEvent.start}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
                  <div dangerouslySetInnerHTML={{ __html: getAttendanceIconNew(getActualAttendanceStatus(monthlyHoveredEvent.dayKey)).svg }} style={{marginRight:10}} />
                  <span style={{fontSize:13,color:'#374151'}}>{getActualAttendanceStatus(monthlyHoveredEvent.dayKey)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Create Classroom Modal */}
          {showCreateModal && (
            <div 
              className="teacher-modal-overlay"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowCreateModal(false);
                }
              }}
            >
              <div className="teacher-room-modal">
                <div className="teacher-modal-header">
                  <h2>Tạo phòng học</h2>
                  <button 
                    className="teacher-close-button"
                    onClick={() => setShowCreateModal(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="teacher-search-container">
                  <input
                    type="text"
                    className="teacher-search-input"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="teacher-room-list">
                  {todayClasses.map((classItem) => (
                    <div key={classItem.id} className="teacher-room-item">
                      <div className="teacher-room-thumbnail">
                        {classItem.image ? (
                          <img src={classItem.image} alt={classItem.subName} />
                        ) : (
                          <div className="teacher-room-thumbnail-letter">
                            {classItem.name}
                          </div>
                        )}
                      </div>
                      <div className="teacher-room-info">
                        <div className="teacher-room-name">{classItem.subName}</div>
                        {classItem.code && (
                          <div className="teacher-room-code">Mã lớp: {classItem.code}</div>
                        )}
                      </div>
                      <div className="teacher-room-checkbox">
                        <input 
                          type="checkbox" 
                          checked={checkedClasses.includes(classItem.id)}
                          onChange={() => handleCheckClass(classItem.id)}
                          className="teacher-class-checkbox"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="teacher-modal-actions">
                  <button 
                    className="teacher-cancel-button"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Hủy
                  </button>
                  <button 
                    className="teacher-next-button" 
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
            <div className="teacher-modal-overlay">
              <div className="teacher-room-modal teacher-offline-modal">
                <div className="teacher-modal-header">
                  <h2 className="teacher-modal-title">
                    Tạo phòng học <span className="teacher-class-type">Offline</span>
                  </h2>
                  <button 
                    className="teacher-close-button"
                    onClick={() => setShowOfflineModal(false)}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="teacher-platform-tabs-container">
                  <div className="teacher-platform-tabs">
                    {platforms.map(platform => (
                      <button
                        key={platform.id}
                        className={`teacher-platform-tab ${activePlatform === platform.id ? 'teacher-active' : ''}`}
                        onClick={() => setActivePlatform(platform.id)}
                      >
                        <div className="teacher-platform-icon">{platform.icon}</div>
                        <span className="teacher-platform-name">{platform.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="teacher-offline-form">
                  <div className="teacher-form-group">
                    <label className="teacher-form-label">Tên buổi học</label>
                    <input 
                      type="text" 
                      className="teacher-form-input" 
                      placeholder="Nhập tên buổi học"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                    />
                  </div>

                  <div className="teacher-form-group">
                    <label className="teacher-form-label">Ngày</label>
                    <input
                      type="date"
                      className="teacher-form-input"
                      value={format(selectedDate, 'yyyy-MM-dd')}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    />
                  </div>

                  <div className="teacher-form-group">
                    <label className="teacher-form-label">Giờ bắt đầu</label>
                    <input 
                      type="time" 
                      className="teacher-form-input teacher-time-input"
                      value={classTime}
                      onChange={(e) => setClassTime(e.target.value)}
                    />
                  </div>

                  <div className="teacher-form-group">
                    <label className="teacher-form-label">Lặp lại</label>
                    <div className="teacher-select-container">
                      <select
                        className="teacher-form-select"
                        value={repeatOption}
                        onChange={(e) => setRepeatOption(e.target.value)}
                      >
                        {repeatOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="teacher-select-arrow" />
                    </div>
                  </div>
                </div>

                <div className="teacher-modal-actions">
                  <button 
                    className="teacher-cancel-button teacher-outlined"
                    onClick={() => {
                      setShowOfflineModal(false);
                      setShowCreateModal(true);
                    }}
                  >
                    Quay lại
                  </button>
                  <button 
                    className="teacher-next-button teacher-contained"
                    onClick={handleConfirm}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
} 