import React, { useState, useRef } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import '../../styles/StudentDashboard.css';

const sampleTodayClasses = [
  { time: '7:00', name: 'siuuuuuuucr7', status: 'Đang diễn ra • 4 giờ 47 phút' },
  { time: '9:00', name: 'Toán nâng cao', status: 'Sắp diễn ra • 2 giờ' },
  { time: '13:00', name: 'Văn học', status: 'Đã kết thúc' },
  { time: '15:00', name: 'Lịch sử', status: 'Sắp diễn ra • 5 giờ' },
  { time: '17:00', name: 'Tiếng Anh', status: 'Đã kết thúc' },
];

const sampleHomework = [
  { name: 'Mẫuonaldo', class: '1234Absdth', deadline: 'Không có', status: 'Chưa làm' },
  { name: 'Bài tập Toán', class: '12A1', deadline: '10/07/2024', status: 'Chưa làm' },
  { name: 'Bài tập Văn', class: '12A2', deadline: '12/07/2024', status: 'Chưa làm' },
  { name: 'Bài tập Sử', class: '12A3', deadline: '15/07/2024', status: 'Chưa làm' },
  { name: 'Bài tập Anh', class: '12A4', deadline: '20/07/2024', status: 'Chưa làm' },
];

const sampleDocs = [
  { name: 'qpan.docx', class: '1234Absdth', date: '9 tháng 7 lúc 22:36' },
  { name: 'toan.pdf', class: '12A1', date: '8 tháng 7 lúc 10:00' },
  { name: 'van.docx', class: '12A2', date: '7 tháng 7 lúc 14:20' },
  { name: 'lichsu.pdf', class: '12A3', date: '6 tháng 7 lúc 09:15' },
  { name: 'anhvan.docx', class: '12A4', date: '5 tháng 7 lúc 16:45' },
];

const sampleLectures = [
  { name: 'Bài giảng Toán', class: '12A1', date: '10 tháng 7 lúc 08:00' },
  { name: 'Bài giảng Văn', class: '12A2', date: '11 tháng 7 lúc 09:00' },
  { name: 'Bài giảng Sử', class: '12A3', date: '12 tháng 7 lúc 10:00' },
  { name: 'Bài giảng Anh', class: '12A4', date: '13 tháng 7 lúc 11:00' },
  { name: 'Bài giảng Sinh', class: '12A5', date: '14 tháng 7 lúc 12:00' },
];

const sampleAchievements = [
  { class: '1234Absdth', teacher: 'Nguyễn Duy', score: '1.00' },
  { class: '12A1', teacher: 'Trần Văn A', score: '9.00' },
  { class: '12A2', teacher: 'Lê Thị B', score: '8.50' },
  { class: '12A3', teacher: 'Phạm Văn C', score: '7.75' },
  { class: '12A4', teacher: 'Ngô Thị D', score: '8.00' },
];

function StudentDashboard() {
  const [activeSection, setActiveSection] = useState('today-class');

  // Create refs for each section
  const sectionRefs = {
    'today-class': useRef(null),
    'homework': useRef(null),
    'documents': useRef(null),
    'lectures': useRef(null),
    'achievements': useRef(null),
  };

  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    const ref = sectionRefs[sectionId];
    if (ref && ref.current) {
      // Scroll section lên ngay dưới header (offset đúng với header thực tế, ví dụ 65px)
      const HEADER_HEIGHT = 65;
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset - HEADER_HEIGHT;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      <DashboardHeader />
      <div className="sd-dashboard-layout">
        <Sidebar 
          activeSection={activeSection}
          onSectionChange={scrollToSection}
          todayClassCount={sampleTodayClasses.length}
          homeworkCount={sampleHomework.length}
          unreadDocs={sampleDocs.length}
          unseenLectures={sampleLectures.length}
        />
        <div className="sd-dashboard-main">
          <div className="sd-dashboard-blocks">
            {/* Phòng học hôm nay */}
            <div ref={sectionRefs['today-class']}>
              <h3 className="sd-block-title-outside">
                Phòng học hôm nay • {sampleTodayClasses.length}
              </h3>
              <section className="sd-dashboard-block" id="today-class">
                <div className="sd-dashboard-block-content">
                  {sampleTodayClasses.length === 0 ? (
                    <div className="sd-dashboard-empty">Không có buổi học nào diễn ra hôm nay</div>
                  ) : (
                    <div className="sd-table-container">
                      <table className="sd-table">
                        <thead>
                          <tr>
                            <th>Thời gian</th>
                            <th>Tên phòng học</th>
                            <th>Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sampleTodayClasses.map((cls, idx) => (
                            <tr key={idx}>
                              <td style={{ fontWeight: '600', color: '#1976d2' }}>
                                {cls.time}
                              </td>
                              <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '16px' }}>🏫</span>
                                {cls.name}
                              </td>
                              <td style={{ color: '#d32f2f', fontWeight: '500' }}>
                                {cls.status}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Bài tập chưa nộp */}
            <div ref={sectionRefs['homework']}>
              <h3 className="sd-block-title-outside">
                Bài tập chưa nộp • {sampleHomework.length}
              </h3>
              <section className="sd-dashboard-block" id="homework">
                <div className="sd-dashboard-block-content">
                  {sampleHomework.length === 0 ? (
                    <div className="sd-dashboard-empty">Không có bài tập nào</div>
                  ) : (
                    <div className="sd-table-container">
                      <table className="sd-table">
                        <thead>
                          <tr>
                            <th>Tên bài tập</th>
                            <th>Lớp</th>
                            <th>Hạn chót</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sampleHomework.map((hw, idx) => (
                            <tr key={idx}>
                              <td>
                                <div className="sd-assignment-name">
                                  <span className="sd-file-icon">W</span>
                                  {hw.name}
                                  <div className="sd-assignment-status">{hw.status}</div>
                                </div>
                              </td>
                              <td>{hw.class}</td>
                              <td>{hw.deadline}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Tài liệu chưa đọc */}
            <div ref={sectionRefs['documents']}>
              <h3 className="sd-block-title-outside">
                Tài liệu chưa đọc • {sampleDocs.length}
              </h3>
              <section className="sd-dashboard-block" id="documents">
                <div className="sd-dashboard-block-content">
                  {sampleDocs.length === 0 ? (
                    <div className="sd-dashboard-empty">Không có tài liệu nào</div>
                  ) : (
                    <div className="sd-table-container">
                      <table className="sd-table">
                        <thead>
                          <tr>
                            <th>Tên tài liệu</th>
                            <th>Lớp</th>
                            <th>Ngày đăng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sampleDocs.map((doc, idx) => (
                            <tr key={idx}>
                              <td>
                                <div className="sd-assignment-name">
                                  <span className="sd-file-icon">W</span>
                                  {doc.name}
                                </div>
                              </td>
                              <td>{doc.class}</td>
                              <td>{doc.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Bài giảng chưa xem */}
            <div ref={sectionRefs['lectures']}>
              <h3 className="sd-block-title-outside">
                Bài giảng chưa xem • {sampleLectures.length}
              </h3>
              <section className="sd-dashboard-block" id="lectures">
                <div className="sd-dashboard-block-content">
                  {sampleLectures.length === 0 ? (
                    <div className="sd-dashboard-empty">Không có bài giảng nào</div>
                  ) : (
                    <div className="sd-table-container">
                      <table className="sd-table">
                        <thead>
                          <tr>
                            <th>Tên bài giảng</th>
                            <th>Lớp</th>
                            <th>Ngày đăng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sampleLectures.map((lec, idx) => (
                            <tr key={idx}>
                              <td>
                                <div className="sd-assignment-name">
                                  <span className="sd-file-icon">▶</span>
                                  {lec.name}
                                </div>
                              </td>
                              <td>{lec.class}</td>
                              <td>{lec.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Thành tích học tập */}
            <div ref={sectionRefs['achievements']}>
              <h3 className="sd-block-title-outside">
                Thành tích học tập • {sampleAchievements.length}
              </h3>
              <section className="sd-dashboard-block" id="achievements">
                <div className="sd-dashboard-block-content">
                  {sampleAchievements.length === 0 ? (
                    <div className="sd-dashboard-empty">Chưa có dữ liệu thành tích</div>
                  ) : (
                    <div className="sd-table-container">
                      <table className="sd-table">
                        <thead>
                          <tr>
                            <th>Tên lớp</th>
                            <th>Giáo viên</th>
                            <th>ĐTB</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sampleAchievements.map((ach, idx) => (
                            <tr key={idx}>
                              <td>{ach.class}</td>
                              <td>{ach.teacher}</td>
                              <td>{ach.score}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard; 