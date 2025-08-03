import React from 'react';
import DashboardHeader from './DashboardHeader';
import '../../styles/StudentDashboard.css';

const sampleHomework = [
  { name: 'Bài tập Toán 1', class: '10A1', deadline: '2025-07-10' },
  { name: 'Bài tập Văn', class: '10A1', deadline: '2025-07-12' },
];
const sampleDocs = [
  { name: 'Tài liệu Hóa học', class: '10A1', date: '2025-07-08' },
];
const sampleLectures = [
  { name: 'Bài giảng Vật lý', class: '10A1', date: '2025-07-07' },
];
const sampleAchievements = [
  { class: '10A1', teacher: 'Cô Lan', avg: 8.7 },
  { class: '10A2', teacher: 'Thầy Nam', avg: 9.1 },
];

function StudentDashboard() {
  const menuItems = [
    { label: 'Phòng học hôm nay', id: 'today-class' },
    { label: 'Bài tập chưa làm', id: 'homework' },
    { label: 'Tài liệu & Bài giảng chưa đọc/xem', id: 'materials' },
    { label: 'Thành tích', id: 'achievements' },
  ];
  return (
    <>
      <DashboardHeader />
      <div className="sd-dashboard-layout">
        <aside className="sd-sidebar">
          <ul className="sd-sidebar-menu">
            {menuItems.map(item => (
              <li key={item.id} className="sd-sidebar-item">
                {item.label}
              </li>
            ))}
          </ul>
        </aside>
        <div className="sd-dashboard-main">
          <div className="sd-dashboard-blocks">
            {/* Phòng học hôm nay */}
            <section className="sd-dashboard-block" id="today-class">
              <h3 className="sd-block-title">Phòng học hôm nay</h3>
              <div className="sd-dashboard-block-content sd-dashboard-empty">Không có buổi học nào diễn ra hôm nay</div>
            </section>
            {/* Bài tập chưa nộp */}
            <section className="sd-dashboard-block" id="homework">
              <h3 className="sd-block-title">Bài tập chưa nộp</h3>
              <div className="sd-dashboard-block-content">
                {sampleHomework.length === 0 ? (
                  <div className="sd-dashboard-empty">Không có bài tập nào</div>
                ) : (
                  <ul className="sd-dashboard-list">
                    {sampleHomework.map((hw, idx) => (
                      <li key={idx} className="sd-dashboard-list-item">
                        <div className="sd-dashboard-list-title">{hw.name}</div>
                        <div className="sd-dashboard-list-meta">Lớp: {hw.class} | Hạn: {hw.deadline}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
            {/* Gộp Tài liệu & Bài giảng chưa đọc/xem */}
            <section className="sd-dashboard-block" id="materials">
              <h3 className="sd-block-title">Tài liệu & Bài giảng chưa đọc/xem</h3>
              <div className="sd-dashboard-block-content">
                {sampleDocs.length === 0 && sampleLectures.length === 0 ? (
                  <div className="sd-dashboard-empty">Không có tài liệu hoặc bài giảng nào</div>
                ) : (
                  <ul className="sd-dashboard-list">
                    {sampleDocs.map((doc, idx) => (
                      <li key={"doc-"+idx} className="sd-dashboard-list-item">
                        <div className="sd-dashboard-list-title">📄 {doc.name}</div>
                        <div className="sd-dashboard-list-meta">Lớp: {doc.class} | Ngày đăng: {doc.date}</div>
                      </li>
                    ))}
                    {sampleLectures.map((lec, idx) => (
                      <li key={"lec-"+idx} className="sd-dashboard-list-item">
                        <div className="sd-dashboard-list-title">🎬 {lec.name}</div>
                        <div className="sd-dashboard-list-meta">Lớp: {lec.class} | Ngày đăng: {lec.date}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
            {/* Thành tích học tập */}
            <section className="sd-dashboard-block" id="achievements">
              <h3 className="sd-block-title">Thành tích học tập</h3>
              <div className="sd-dashboard-block-content">
                {sampleAchievements.length === 0 ? (
                  <div className="sd-dashboard-empty">Chưa có dữ liệu</div>
                ) : (
                  <ul className="sd-dashboard-list">
                    {sampleAchievements.map((ach, idx) => (
                      <li key={idx} className="sd-dashboard-list-item">
                        <div className="sd-dashboard-list-title">Lớp: {ach.class}</div>
                        <div className="sd-dashboard-list-meta">GV: {ach.teacher} | ĐTB: <b>{ach.avg}</b></div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard; 