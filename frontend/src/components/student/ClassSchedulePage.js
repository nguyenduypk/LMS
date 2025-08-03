import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import ClassSidebar from './ClassSidebar';
import '../../styles/ClassSchedulePage.css';

const MOCK_WEEK = [
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

const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const WEEKDATES = ['01/07', '02/07', '03/07', '04/07', '05/07', '06/07', '07/07'];
const MOCK_CLASS = {
  name: 'Toán 10A1',
  code: 'MATH10A1',
  teacher: 'Nguyễn Văn B',
};

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

function ClassSchedulePage() {
  const [view, setView] = useState('week');
  const [week, setWeek] = useState(0); // 0: tuần hiện tại
  const [month, setMonth] = useState(6); // 0: Jan, 6: July
  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

  // Thanh tiêu đề thời gian
  const handlePrev = () => {
    if (view === 'week') setWeek(week - 1);
    else setMonth(month - 1);
  };
  const handleNext = () => {
    if (view === 'week') setWeek(week + 1);
    else setMonth(month + 1);
  };

  return (
    <>
      <DashboardHeader />
      <div className="class-schedule-layout">
        <ClassSidebar classInfo={MOCK_CLASS} selected="schedule" />
        <main className="class-schedule-main">
          {/* Bar chứa nút chuyển đổi và tiêu đề thời gian */}
          <div className="class-schedule-bar">
            <div className="class-schedule-view-toggle">
              <button className={view === 'week' ? 'active' : ''} onClick={() => setView('week')}>Tuần</button>
              <button className={view === 'month' ? 'active' : ''} onClick={() => setView('month')}>Tháng</button>
            </div>
            <div className="class-schedule-timebar">
              <button className="class-schedule-timebar-btn" onClick={handlePrev}>&lt;</button>
              <span className="class-schedule-timebar-title">
                {view === 'week' ? `Tuần này: 01/07 - 07/07/2024` : `${monthNames[month]} 2024`}
              </span>
              <button className="class-schedule-timebar-btn" onClick={handleNext}>&gt;</button>
            </div>
          </div>
          {view === 'week' ? (
            <div className="class-schedule-week-view">
              <div className="class-schedule-week-cols">
                {WEEKDAYS.map((d, i) => (
                  <div className="class-schedule-week-col" key={d}>
                    <div className="class-schedule-week-day">{d}</div>
                    <div className="class-schedule-week-date">{WEEKDATES[i]}</div>
                    <div className="class-schedule-week-body">
                      {MOCK_WEEK[i].length === 0 ? (
                        <div className="class-schedule-week-empty">Không có lịch học</div>
                      ) : (
                        MOCK_WEEK[i].map((item, idx) => (
                          <div className="class-schedule-week-card" key={idx} style={{ background: '#e3f0ff' }}>
                            <div className="class-schedule-week-status">🟢 {item.status}</div>
                            <div className="class-schedule-week-class">📚 {item.className}</div>
                            <div className="class-schedule-week-room">📄 {item.content} ({item.room})</div>
                            <div className="class-schedule-week-attendance">🔑 {item.attendance}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="class-schedule-month-view">
              <table className="class-schedule-month-table">
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
        </main>
      </div>
    </>
  );
}

export default ClassSchedulePage; 