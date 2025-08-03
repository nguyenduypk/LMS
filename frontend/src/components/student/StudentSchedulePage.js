import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import '../../styles/SchedulePage.css';

// Mock data
const MOCK_WEEK = [
  // Mỗi ngày là 1 array các buổi học
  [
    {
      status: 'Đang diễn ra',
      className: 'Toán 10A1',
      room: 'Phòng 101',
      content: 'Ôn tập chương 1',
      attendance: 'Chưa điểm danh',
    },
  ], // T2
  [], // T3
  [
    {
      status: 'Đang diễn ra',
      className: 'Văn 10A1',
      room: 'Phòng 202',
      content: 'Soạn bài: Truyện ngắn',
      attendance: 'Chưa điểm danh',
    },
  ], // T4
  [], // T5
  [], // T6
  [], // T7
  [], // CN
];

const MOCK_MONTH = [
  {
    className: 'Toán 10A1',
    room: 'Phòng 101',
    type: 'Offline',
    start: '2024-07-01 07:30',
    status: 'Đang diễn ra',
    attendance: 'Chưa điểm danh',
  },
  {
    className: 'Văn 10A1',
    room: 'Google Meet',
    type: 'Google Meet',
    start: '2024-07-03 09:00',
    status: 'Đang diễn ra',
    attendance: 'Chưa điểm danh',
  },
];

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const WEEKDATES = ['01/07', '02/07', '03/07', '04/07', '05/07', '06/07', '07/07'];

function StudentSchedulePage() {
  const [view, setView] = useState('week');
  const [week, setWeek] = useState(0); // 0: tuần hiện tại
  const [month, setMonth] = useState(6); // 0: Jan, 6: July

  // Thanh tiêu đề thời gian
  const handlePrev = () => {
    if (view === 'week') setWeek(week - 1);
    else setMonth(month - 1);
  };
  const handleNext = () => {
    if (view === 'week') setWeek(week + 1);
    else setMonth(month + 1);
  };
  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

  return (
    <>
      <DashboardHeader />
      <div className="schedule-main">
        <div className="schedule-container">
          {/* Nút chuyển đổi chế độ xem tuần/tháng */}
          <div className="schedule-view-toggle">
            <button className={view === 'week' ? 'active' : ''} onClick={() => setView('week')}>Tuần</button>
            <button className={view === 'month' ? 'active' : ''} onClick={() => setView('month')}>Tháng</button>
          </div>
          {/* Thanh tiêu đề thời gian */}
          <div className="schedule-timebar">
            <button className="schedule-timebar-btn" onClick={handlePrev}>&lt;</button>
            <span className="schedule-timebar-title">
              {view === 'week' ? `Tuần này: 01/07 - 07/07/2024` : `${monthNames[month]} 2024`}
            </span>
            <button className="schedule-timebar-btn" onClick={handleNext}>&gt;</button>
          </div>
          {/* Lịch học */}
          {view === 'week' ? (
            <div className="schedule-week-view">
              <div className="schedule-week-cols">
                {WEEKDAYS.map((d, i) => (
                  <div className="schedule-week-col" key={d}>
                    <div className="schedule-week-day">{d}</div>
                    <div className="schedule-week-date">{WEEKDATES[i]}</div>
                    <div className="schedule-week-body">
                      {MOCK_WEEK[i].length === 0 ? (
                        <div className="schedule-week-empty">Không có lịch học</div>
                      ) : (
                        MOCK_WEEK[i].map((item, idx) => (
                          <div className="schedule-week-card" key={idx}>
                            <div className="schedule-week-status">🟢 {item.status}</div>
                            <div className="schedule-week-class">📚 {item.className}</div>
                            <div className="schedule-week-room">📄 {item.content} ({item.room})</div>
                            <div className="schedule-week-attendance">🔑 {item.attendance}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="schedule-month-view">
              <table className="schedule-month-table">
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
                  {MOCK_MONTH.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.className}</td>
                      <td>{item.room}</td>
                      <td>
                        {item.type === 'Google Meet' ? (
                          <span className="schedule-icon-meet">📹</span>
                        ) : (
                          <span className="schedule-icon-offline">🏫</span>
                        )}
                        {item.type}
                      </td>
                      <td>{item.start}</td>
                      <td><span className="schedule-status-active">{item.status}</span></td>
                      <td>{item.attendance}</td>
                      <td><button className="schedule-table-menu">⋮</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default StudentSchedulePage; 