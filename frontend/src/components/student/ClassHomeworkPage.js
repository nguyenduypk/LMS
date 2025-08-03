import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import ClassSidebar from './ClassSidebar';
import '../../styles/ClassHomeworkPage.css';
import { useNavigate } from 'react-router-dom';

const MOCK_CLASS = {
  name: 'Toán 10A1',
  code: 'MATH10A1',
  teacher: 'Nguyễn Văn B',
};

const HOMEWORKS = [
  {
    id: 1,
    title: 'Toán lớp 1',
    desc: 'Trắc nghiệm tách câu',
    status: 'Chưa làm',
    type: 'Trắc nghiệm',
    created: '2024-07-01',
    attempts: 0,
    total: 1,
    allowView: true,
    deadline: '2024-07-10',
    duration: '30 phút',
  },
  {
    id: 2,
    title: 'Văn lớp 1',
    desc: 'Tập làm văn',
    status: 'Chưa làm',
    type: 'Tự luận',
    created: '2024-07-02',
    attempts: 0,
    total: 1,
    allowView: false,
    deadline: '2024-07-12',
    duration: '45 phút',
  },
];

function ClassHomeworkPage() {
  const [selected, setSelected] = useState(HOMEWORKS[0]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const navigate = useNavigate();

  const filtered = HOMEWORKS.filter(h =>
    h.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e) => {
    if (e.key === 'Enter') setQuery(search);
  };

  const handleSelect = (hw) => setSelected(hw);

  return (
    <>
      <DashboardHeader />
      <div className="class-homework-layout">
        <ClassSidebar classInfo={MOCK_CLASS} selected="homework" />
        <main className="class-homework-main">
          <div className="class-homework-list-area">
            <div className="class-homework-list-bar">
              <div className="class-homework-search-wrap">
                <span className="class-homework-search-icon">🔍</span>
                <input
                  className="class-homework-search"
                  type="text"
                  placeholder="Tìm kiếm bài tập"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
              <select className="class-homework-sort" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
              </select>
            </div>
            <div className="class-homework-list">
              {filtered.map(hw => (
                <div
                  className={`class-homework-item${selected.id === hw.id ? ' selected' : ''}`}
                  key={hw.id}
                  onClick={() => handleSelect(hw)}
                >
                  <span className="class-homework-file-icon">📄</span>
                  <div className="class-homework-info">
                    <div className="class-homework-title">{hw.title}</div>
                    <div className="class-homework-desc">{hw.desc}</div>
                  </div>
                  <span className="class-homework-status">{hw.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="class-homework-detail-area">
            <div className="class-homework-detail-status">
              <span className="class-homework-detail-status-icon">🐵</span> {selected.status}
            </div>
            <div className="class-homework-detail-title">{selected.title}</div>
            <div className="class-homework-detail-row"><b>Mô tả:</b> {selected.desc}</div>
            <div className="class-homework-detail-row"><b>Số lần làm:</b> {selected.attempts}</div>
            <div className="class-homework-detail-row"><b>Đã làm / Tổng:</b> {selected.attempts} / {selected.total}</div>
            <div className="class-homework-detail-row"><b>Loại bài tập:</b> {selected.type}</div>
            <div className="class-homework-detail-row"><b>Ngày tạo:</b> {selected.created}</div>
            <div className="class-homework-detail-row"><b>Thời gian làm bài:</b> {selected.duration}</div>
            <div className="class-homework-detail-row"><b>Cho phép:</b> {selected.allowView ? 'Xem điểm và lời giải' : 'Không xem được điểm/lời giải'}</div>
            <div className="class-homework-detail-row"><b>Hạn chót:</b> {selected.deadline}</div>
            <button className="class-homework-start-btn" onClick={() => navigate(`/class/${MOCK_CLASS.code}/homework/${selected.id}/quiz`)}>Bắt đầu</button>
          </div>
        </main>
      </div>
    </>
  );
}

export default ClassHomeworkPage; 