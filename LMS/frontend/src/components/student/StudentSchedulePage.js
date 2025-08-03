import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import '../../styles/ClassSchedulePage.css';
import { 
  X,
  
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
  
  // Get first day of month
  const firstDay = new Date(year, month, 1);
  // Get last day of month
  const lastDay = new Date(year, month + 1, 0);
  
  // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDay.getDay();
  // Adjust for Monday start (0 = Monday, 6 = Sunday)
  const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  
  // Calculate start date (previous month days to fill first week)
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - adjustedFirstDay);
  
  // Calculate end date (next month days to fill last week)
  const endDate = new Date(lastDay);
  const daysToAdd = 42 - (lastDay.getDate() + adjustedFirstDay); // 6 weeks * 7 days
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

const WEEKLY_SCHEDULE = {
  '14-7': [
    {
      className: '1234Absdth',
      room: 'CNTT Lab',
      attendance: '0/2',
      type: 'Offline',
      startTime: '7:00',
      teacher: 'Nguyễn Văn A'
    }
  ],
  '15-7': [
    {
      className: '1234Absdth',
      room: 'CNTT Lab',
      attendance: '2/2',
      type: 'Offline',
      startTime: '9:00',
      teacher: 'Phạm Thị D'
    }
  ],
  '16-7': [
    {
      className: '1234Absdth',
      room: 'Phòng thực hành Lab',
      attendance: '2/2',
      type: 'Offline',
      startTime: '7:00',
      teacher: 'Lê Văn C'
    }
  ], 
  '17-7': [
    {
      className: '1234Absdth',
      room: 'Zoom Meeting',
      attendance: '0/2',
      type: 'Zoom',
      startTime: '7:00',
      teacher: 'Lê Văn C'
    }
  ],
  '18-7': [
    {
      className: '1234Absdth',
      room: 'Microsoft Teams',
      attendance: '1/2',
      type: 'Teams',
      startTime: '7:00',
      teacher: 'Hoàng Văn E'
    }
  ],
  '19-7': [
    {
      className: '1234Absdth',
      room: 'Google Meet Room',
      attendance: '1/2',
      type: 'Google Meet',
      startTime: '7:00',
      teacher: 'Trần Thị B'
    }
  ],
  '20-7': [
    {
      className: '1234Absdth',
      room: 'CNTT',
      attendance: '0/2',
      type: 'Offline',
      startTime: '7:00',
      teacher: 'Lý Thị F'
    }
  ]
};



export default function StudentSchedulePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('week');

  const [currentDate, setCurrentDate] = useState(new Date());
  const { weekRange, weekDays } = getWeekDates(currentDate);
  const { monthRange, monthDays } = getMonthDates(currentDate);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [tooltipStyle, setTooltipStyle] = useState({ display: 'none' });
  const [isTooltipHovered, setIsTooltipHovered] = useState(false);
  const [isEventHovered, setIsEventHovered] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popupStyle, setPopupStyle] = useState({ display: 'none' });

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
    const tooltipWidth = 400; // smaller tooltip width
    const overlap = 12; // overlap tooltip over card
    let left, top;
    // Tooltip overlaps the card by 12px
    left = rect.right - overlap;
    // If overflow right, shift left
    if (left + tooltipWidth > window.innerWidth - 8) {
      left = window.innerWidth - tooltipWidth - 8;
    }
    // If overflow left, shift right
    if (left < 8) {
      left = 8;
    }
    top = rect.top;
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

  const handleActionMenuClick = (event, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const popupWidth = 400;
    let left, top;
    
    // Position popup to the right of the button
    left = rect.right + 8;
    // If overflow right, position to the left
    if (left + popupWidth > window.innerWidth - 8) {
      left = rect.left - popupWidth - 8;
    }
    // If overflow left, position to the right
    if (left < 8) {
      left = 8;
    }
    
    top = rect.top;
    // If overflow bottom, position above
    if (top + 200 > window.innerHeight - 8) {
      top = rect.bottom - 200;
    }
    
    setSelectedEvent(event);
    setPopupStyle({
      display: 'block',
      left: `${left}px`,
      top: `${top}px`
    });
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
    setPopupStyle({ display: 'none' });
  };

  useEffect(() => {
    if (!isEventHovered && !isTooltipHovered) {
      setHoveredEvent(null);
      setTooltipStyle({ display: 'none' });
    }
  }, [isEventHovered, isTooltipHovered]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedEvent && !event.target.closest('.action-popup')) {
        handleClosePopup();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedEvent]);

  const getScheduleForDate = (date) => {
    const dayKey = `${date.getDate()}-${date.getMonth() + 1}`;
    return WEEKLY_SCHEDULE[dayKey] || [];
  };

  const renderWeekView = () => (
    <div className="student-schedule-week-view">
      <div className="student-schedule-grid">
        {weekDays.map((day, index) => {
          const dayKey = day.date.replace(/\//g, '-');
          const daySchedule = WEEKLY_SCHEDULE[dayKey] || [];
          return (
            <div className={`student-day-column ${day.isToday ? 'today' : ''}`} key={index}>
              <div className="student-day-header">
                <div className="student-day-title">
                  <div className="student-day-name">
                    {day.label}{day.isToday ? ' - Hôm nay' : ''}
                  </div>
                  <div className="student-day-date">{day.date}</div>
                </div>
              </div>

              <div className="student-day-divider"></div>

              <div className="student-events-list">
                {daySchedule.length > 0 ? (
                  daySchedule.map((event, eventIndex) => {
                    const roomIcon = getRoomIcon(event.type, event.room);
                    const eventWithDayKey = { ...event, dayKey };
                    const attendanceStatus = getActualAttendanceStatus(dayKey);
                    return (
                      <div 
                        className="student-event-card"
                        key={eventIndex}
                        onMouseEnter={(e) => { handleEventHover(eventWithDayKey, e); setIsEventHovered(true); }}
                        onMouseLeave={() => setIsEventHovered(false)}
                      >
                        <div className="student-event-card-header">
                          <span className="student-event-icon">
                            <img src={roomIcon.src} alt={roomIcon.alt} />
                          </span>
                          <span className="student-event-status">Đang diễn ra</span>
                        </div>
                        <div className="student-event-class">{event.className}</div>
                        <div className="student-event-room">{event.room}</div>
                        <div className="student-event-attendance">
                          <div dangerouslySetInnerHTML={{ __html: getAttendanceIconNew(attendanceStatus).svg }} style={{display:'inline-block', marginRight:8}} />
                          {attendanceStatus}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="student-empty-schedule">
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
    <div className="student-schedule-month-view">
      <div className="student-schedule-table-container">
        <table className="student-schedule-table">
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
            {Object.entries(WEEKLY_SCHEDULE).map(([dayKey, events]) => 
              events.map((event, eventIndex) => {
                const [day, month] = dayKey.split('-');
                const status = getEventStatusOverride(dayKey, eventIndex);
                const attendance = getAttendanceStatusOverride(dayKey, eventIndex);
                const roomIcon = getRoomIconSmall(event.type, event.room);
                const eventWithDayKey = { ...event, dayKey };
                
                return (
                  <tr key={`${dayKey}-${eventIndex}`} className="student-schedule-row">
                    <td className="student-class-name">{event.className}</td>
                    <td className="student-room-name">{event.room}</td>
                    <td className="student-room-type">
                      <div className="student-room-type-content">
                        <img src={roomIcon.src} alt={roomIcon.alt} />
                        <span>{event.type}</span>
                      </div>
                    </td>
                    <td className="student-start-time">
                      <div style={{display:'flex', alignItems:'center', gap:8}}>
                        <div dangerouslySetInnerHTML={{ __html: getTimeIconNew().svg }} />
                        <span>{day} tháng {month} lúc {event.startTime}</span>
                      </div>
                    </td>
                    <td className="student-status">
                      <span className={`student-status-badge ${status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {status}
                      </span>
                    </td>
                    <td className="student-attendance">
                      <div style={{display:'flex', alignItems:'center', gap:8}}>
                        <div dangerouslySetInnerHTML={{ __html: getAttendanceIconNew(attendance).svg }} />
                        <span>{attendance}</span>
                      </div>
                    </td>
                    <td className="student-actions">
                      <button className="student-action-menu-btn" onClick={(e) => handleActionMenuClick(eventWithDayKey, e)}>
                        <span>⋮</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const getEventStatus = (event) => {
    // Logic to determine event status based on current time and event time
    const now = new Date();
    const eventDate = new Date();
    const [day, month] = event.startTime.split(':');
    eventDate.setDate(parseInt(day));
    eventDate.setMonth(parseInt(month) - 1);
    eventDate.setHours(parseInt(day), parseInt(month), 0);
    
    const timeDiff = eventDate.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    
    if (hoursDiff < -2) return 'Đã kết thúc';
    if (hoursDiff < 0 && hoursDiff > -2) return 'Đang diễn ra';
    return 'Chưa bắt đầu';
  };

  const getAttendanceStatus = (event) => {
    // Logic to determine attendance status
    const status = getEventStatus(event);
    if (status === 'Đã kết thúc') return 'Đã điểm danh';
    if (status === 'Đang diễn ra') return 'Chưa điểm danh';
    return 'Chưa điểm danh';
  };

  // Override status and attendance for specific events to match image
  const getEventStatusOverride = (dayKey, eventIndex) => {
    const statusMap = {
      '14-7': 'Đang diễn ra',
      '15-7': 'Đang diễn ra', 
      '16-7': 'Đã kết thúc',
      '17-7': 'Đang diễn ra',
      '18-7': 'Đang diễn ra',
      '19-7': 'Chưa bắt đầu',
      '20-7': 'Chưa bắt đầu'
    };
    return statusMap[dayKey] || 'Chưa bắt đầu';
  };

  const getAttendanceStatusOverride = (dayKey, eventIndex) => {
    const attendanceMap = {
      '14-7': 'Chưa điểm danh',
      '15-7': 'Đã điểm danh',
      '16-7': 'Đã điểm danh', 
      '17-7': 'Chưa điểm danh',
      '18-7': 'Chưa điểm danh',
      '19-7': 'Chưa điểm danh',
      '20-7': 'Chưa điểm danh'
    };
    return attendanceMap[dayKey] || 'Chưa điểm danh';
  };

  const getActualAttendanceStatus = (dayKey) => {
    const attendanceMap = {
      '14-7': 'Chưa điểm danh',
      '15-7': 'Đã điểm danh',
      '16-7': 'Đã điểm danh', 
      '17-7': 'Chưa điểm danh',
      '18-7': 'Chưa điểm danh',
      '19-7': 'Chưa điểm danh',
      '20-7': 'Chưa điểm danh'
    };
    return attendanceMap[dayKey] || 'Chưa điểm danh';
  };

  const getRoomIcon = (roomType, roomName) => {
    // Check for specific room types based on name and type
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
    
    // For all offline rooms, use the same classroom icon
    return {
      src: "https://img.icons8.com/color/24/000000/classroom.png",
      alt: "Offline"
    };
  };

  const getRoomIconSmall = (roomType, roomName) => {
    const icon = getRoomIcon(roomType, roomName);
    return {
      ...icon,
      src: icon.src.replace('/24/', '/16/') // Use smaller version
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
    <div className="student-schedule-container" onClick={(e) => console.log('Container clicked:', e.target)}>
      <DashboardHeader />
      <div className="student-schedule-toolbar">
        <div className="student-tab-group">
          <button
            className={`student-tab-button ${activeTab === 'week' ? 'active' : ''}`}
            onClick={() => setActiveTab('week')}
          >
            Tuần
          </button>
          <button
            className={`student-tab-button ${activeTab === 'month' ? 'active' : ''}`}
            onClick={() => setActiveTab('month')}
          >
            Tháng
          </button>
        </div>

        <div className="student-week-navigator">
          <button 
            className="student-nav-button" 
            onClick={activeTab === 'week' ? handlePrevWeek : handlePrevMonth}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span
            className="student-week-display"
            onClick={handleToday}
            title="Nhấn để về tuần hiện tại"
          >
            {activeTab === 'week' ? weekRange : monthRange}
          </span>
          <button 
            className="student-nav-button" 
            onClick={activeTab === 'week' ? handleNextWeek : handleNextMonth}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>

      <main className="student-schedule-main-content">
        {activeTab === 'week' ? renderWeekView() : renderMonthView()}
      </main>

      {hoveredEvent && (isEventHovered || isTooltipHovered) && (
        <div 
          className="student-schedule-tooltip"
          style={tooltipStyle}
          onMouseEnter={() => setIsTooltipHovered(true)}
          onMouseLeave={() => setIsTooltipHovered(false)}
        >
          <div className="tooltip-header" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flex:1,marginLeft:'12px'}}>
              {['Google Meet', 'Zoom', 'Teams'].includes(hoveredEvent.type) && (
                <button className="main-action-btn join-room-btn" style={{background:'#1976d2',color:'#fff',fontWeight:700,padding:'10px 20px',borderRadius:6,border:'none',fontSize:14,cursor:'pointer'}} onClick={() => {
                  let roomUrl = '';
                  if (hoveredEvent.type === 'Google Meet') {
                    roomUrl = `https://meet.google.com/${hoveredEvent.room.replace(/\s+/g, '-').toLowerCase()}`;
                  } else if (hoveredEvent.type === 'Zoom') {
                    roomUrl = `https://zoom.us/j/${hoveredEvent.room.replace(/\s+/g, '-').toLowerCase()}`;
                  } else if (hoveredEvent.type === 'Teams') {
                    roomUrl = `https://teams.microsoft.com/l/meetup-join/${hoveredEvent.room.replace(/\s+/g, '-').toLowerCase()}`;
                  }
                  window.open(roomUrl, '_blank');
                }}>Vào phòng</button>
              )}
            </div>
            <div className="tooltip-actions" style={{display:'flex',alignItems:'center',gap:8}}>
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
                          {hoveredEvent.startTime && (
                <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
                  <div dangerouslySetInnerHTML={{ __html: getTimeIconNew().svg }} style={{marginRight:10}} />
                  <span style={{fontSize:13,color:'#374151'}}>Bắt đầu: {hoveredEvent.startTime}</span>
                </div>
              )}
              <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
                <div dangerouslySetInnerHTML={{ __html: getAttendanceIconNew(getActualAttendanceStatus(hoveredEvent.dayKey)).svg }} style={{marginRight:10}} />
                <span style={{fontSize:13,color:'#374151'}}>{getActualAttendanceStatus(hoveredEvent.dayKey)}</span>
              </div>
          </div>
        </div>
      )}

      {selectedEvent && (
        <div 
          className="student-action-popup" 
          style={popupStyle}
          onMouseEnter={() => setIsEventHovered(true)}
          onMouseLeave={() => setIsEventHovered(false)}
        >
          <div className="popup-header" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flex:1,marginLeft:'12px'}}>
              {['Google Meet', 'Zoom', 'Teams'].includes(selectedEvent.type) && (
                <button className="main-action-btn join-room-btn" style={{background:'#1976d2',color:'#fff',fontWeight:700,padding:'10px 20px',borderRadius:6,border:'none',fontSize:14,cursor:'pointer',marginRight:12}} onClick={() => {
                  let roomUrl = '';
                  if (selectedEvent.type === 'Google Meet') {
                    roomUrl = `https://meet.google.com/${selectedEvent.room.replace(/\s+/g, '-').toLowerCase()}`;
                  } else if (selectedEvent.type === 'Zoom') {
                    roomUrl = `https://zoom.us/j/${selectedEvent.room.replace(/\s+/g, '-').toLowerCase()}`;
                  } else if (selectedEvent.type === 'Teams') {
                    roomUrl = `https://teams.microsoft.com/l/meetup-join/${selectedEvent.room.replace(/\s+/g, '-').toLowerCase()}`;
                  }
                  window.open(roomUrl, '_blank');
                }}>Vào phòng</button>
              )}
              <span style={{width:14,height:14,background:'#1976d2',borderRadius:2,display:'inline-block',marginRight:10}}></span>
              <span style={{fontSize:15,fontWeight:700,color:'#111827'}}>Lớp {selectedEvent.className}</span>
            </div>
            <div className="popup-actions" style={{display:'flex',alignItems:'center',gap:8}}>
              <button className="popup-action" title="Đóng" onClick={handleClosePopup} style={{background:'white',border:'none',cursor:'pointer',padding:'8px',display:'flex',alignItems:'center',justifyContent:'center',width:'32px',height:'32px',transition:'all 0.2s ease'}} onMouseEnter={(e) => e.target.style.background = '#f3f4f6'} onMouseLeave={(e) => e.target.style.background = 'white'}>
                <X size={14} strokeWidth="2" color="#6b7280" />
              </button>
            </div>
          </div>
          <div className="popup-content" style={{marginLeft:'12px'}}>
            <div style={{fontWeight:'bold',fontSize:15,marginBottom:10,color:'#111827'}}>Thông tin lớp</div>
            <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
              <span style={{width:14,height:14,background:'#1976d2',borderRadius:2,display:'inline-block',marginRight:10}}></span>
              <span style={{fontSize:13,color:'#374151'}}>Tên phòng: {selectedEvent.room}</span>
            </div>
                         <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
               {(() => {
                 const roomIcon = getRoomIcon(selectedEvent.type, selectedEvent.room);
                 return (
                   <img src={roomIcon.src.replace('/24/', '/18/')} alt={roomIcon.alt} style={{marginRight:10}} />
                 );
               })()}
               <span style={{fontSize:13,color:'#374151'}}>Loại phòng: {selectedEvent.type}</span>
             </div>
                                      {selectedEvent.startTime && (
               <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
                 <div dangerouslySetInnerHTML={{ __html: getTimeIconNew().svg }} style={{marginRight:10}} />
                 <span style={{fontSize:13,color:'#374151'}}>Bắt đầu: {selectedEvent.startTime}</span>
               </div>
             )}
             <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
                <div dangerouslySetInnerHTML={{ __html: getAttendanceIconNew(getActualAttendanceStatus(selectedEvent.dayKey)).svg }} style={{marginRight:10}} />
                <span style={{fontSize:13,color:'#374151'}}>{getActualAttendanceStatus(selectedEvent.dayKey)}</span>
               </div>
          </div>
        </div>
      )}
    </div>
  );
}