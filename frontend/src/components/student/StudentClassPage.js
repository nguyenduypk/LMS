import React, { useState, useRef, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import '../../styles/StudentDashboard.css';
import '../../styles/ClassPage.css';
import { useNavigate } from 'react-router-dom';

const SAMPLE_CLASSES = [
  {
    avatar: 'https://i.imgur.com/1Q9Z1Zm.png',
    name: '1234Absdth',
    code: 'OURLC',
    students: 3,
    lectures: 0,
    assignments: 0,
    docs: 0,
  },
  {
    avatar: 'https://i.imgur.com/1Q9Z1Zm.png',
    name: 'Toán 10A1',
    code: 'MATH10A1',
    students: 30,
    lectures: 5,
    assignments: 2,
    docs: 1,
  },
];

// Tabs
const TABS = [
  { key: 'my', label: 'Lớp của bạn' },
  { key: 'pending', label: 'Lớp đang chờ' },
  { key: 'hidden', label: 'Lớp đã ẩn' },
];
function ClassTabs({ tabSelected, onTabChange }) {
  return (
    <div className="class-tabs">
      {TABS.map(tab => (
        <button
          key={tab.key}
          className={`class-tab${tabSelected === tab.key ? ' active' : ''}`}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// SearchBar
function ClassSearchBar({ search, onSearch, sort, onSort, onFindClass }) {
  return (
    <div className="class-searchbar">
      <input
        className="class-search-input"
        type="text"
        placeholder="Tìm kiếm lớp học..."
        value={search}
        onChange={e => onSearch(e.target.value)}
      />
      <select
        className="class-search-sort"
        value={sort}
        onChange={e => onSort(e.target.value)}
      >
        <option value="time">Sắp xếp theo thời gian</option>
        <option value="name">Sắp xếp theo tên</option>
      </select>
      <button className="class-search-find-btn" onClick={onFindClass}>
        + Tìm lớp học
      </button>
    </div>
  );
}

// ListItem
function ClassListItem({ classItem, menuOpen, onMenuClick, onMenuClose, onAction }) {
  const menuRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onMenuClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen, onMenuClose]);

  // Xử lý click vào item (trừ nút menu)
  const handleItemClick = (e) => {
    // Nếu click vào nút menu thì không điều hướng
    if (e.target.closest('.class-list-menu')) return;
    if (classItem.name === '1234Absdth') {
      navigate(`/class/${classItem.code}/announcement`);
    }
  };

  return (
    <div className="class-list-item" style={{ position: 'relative' }} onClick={handleItemClick}>
      <img className="class-avatar" src={classItem.avatar} alt={classItem.name} />
      <div className="class-list-info">
        <div className="class-list-title">{classItem.name}</div>
        <div className="class-list-code">Mã lớp: <b>{classItem.code}</b></div>
        <div className="class-list-stats">
          <span>👥 {classItem.students} học sinh</span>
          <span>📖 {classItem.lectures} bài giảng</span>
          <span>📝 {classItem.assignments} bài tập</span>
          <span>📚 {classItem.docs} tài liệu</span>
        </div>
      </div>
      <button className="class-list-menu" onClick={onMenuClick} title="Tùy chọn">
        <span>⋮</span>
      </button>
      {menuOpen && (
        <div className="class-list-menu-popup" ref={menuRef}>
          <button className="class-list-menu-action" onClick={() => { onAction('join', classItem); onMenuClose(); }}>
            <span className="class-list-menu-icon" style={{marginRight: 8}}>
              {/* icon vào lớp */}
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M7 10h7m0 0l-2.5-2.5M14 10l-2.5 2.5M3.5 5.5v9a1 1 0 0 0 1 1h5" stroke="#1976d2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            Vào lớp
          </button>
          <button className="class-list-menu-action" onClick={() => { onAction('hide', classItem); onMenuClose(); }}>
            <span className="class-list-menu-icon" style={{marginRight: 8}}>
              {/* icon mắt đóng */}
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M1.5 10C2.833 5.667 6.333 3.5 10 3.5c1.5 0 2.917.417 4.167 1.167M18.5 10c-.667 2-2.167 4.5-5.5 6.5-1.5.833-3.5.833-5 0C3.667 14.5 2.167 12 1.5 10m3.5-3.5l10 10" stroke="#607d8b" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </span>
            Ẩn lớp
          </button>
          <button className="class-list-menu-action" onClick={() => { onAction('leave', classItem); onMenuClose(); }}>
            <span className="class-list-menu-icon" style={{marginRight: 8}}>
              {/* icon thoát */}
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M7 10h7m0 0l-2.5-2.5M14 10l-2.5 2.5M10 1.5A8.5 8.5 0 1 1 1.5 10 8.5 8.5 0 0 1 10 1.5z" stroke="#e53935" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            Rời lớp
          </button>
        </div>
      )}
    </div>
  );
}

// List
function ClassList({ classList, menuOpenCode, onMenuClick, onMenuClose, onAction }) {
  return (
    <div className="class-list">
      {classList.length === 0 ? (
        <div className="class-list-empty">Không có lớp học nào.</div>
      ) : (
        classList.map(item => (
          <ClassListItem
            key={item.code}
            classItem={item}
            menuOpen={menuOpenCode === item.code}
            onMenuClick={() => onMenuClick(item.code)}
            onMenuClose={onMenuClose}
            onAction={onAction}
          />
        ))
      )}
    </div>
  );
}

function StudentClassPage() {
  const [tab, setTab] = useState('my');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('time');
  const [classList, setClassList] = useState(SAMPLE_CLASSES);
  const [menuOpenCode, setMenuOpenCode] = useState(null);

  // Lọc và sắp xếp mẫu
  const filtered = classList.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const handleAction = (action, classItem) => {
    // Xử lý action: join, hide, leave
    // Ví dụ: alert(`${action} - ${classItem.name}`);
  };

  return (
    <>
      <DashboardHeader />
      <div className="sd-dashboard-layout">
        <div className="sd-dashboard-main full-width-class-page">
          <div className="class-page">
            <ClassTabs tabSelected={tab} onTabChange={setTab} />
            <ClassSearchBar
              search={search}
              onSearch={setSearch}
              sort={sort}
              onSort={setSort}
              onFindClass={() => {}}
            />
            <ClassList
              classList={sorted}
              menuOpenCode={menuOpenCode}
              onMenuClick={code => setMenuOpenCode(code)}
              onMenuClose={() => setMenuOpenCode(null)}
              onAction={handleAction}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentClassPage; 