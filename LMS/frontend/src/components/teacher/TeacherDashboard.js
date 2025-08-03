import React, { useState, useRef, useEffect } from 'react';
import Header from '../teacher/Header';
import '../../styles/TeacherDashboard.css';
import { useNavigate } from 'react-router-dom';


const sampleClasses = [
  {
    id: 1,
    name: '1234Absdt',
    code: 'OURLC',
    image: 'https://i.imgur.com/0y8Ftya.jpg',
    students: 2,
    lectures: 0,
    homeworks: 2,
    materials: 1,
  },
  {
    id: 2,
    name: 'Lớp Toán 12A1',
    code: 'MATH12A1',
    image: 'https://i.imgur.com/1bX5QH6.jpg',
    students: 35,
    lectures: 10,
    homeworks: 5,
    materials: 8,
  },
];

// Đã xóa toàn bộ biến, hằng số, key, hàm, comment liên quan đến teacher. Chỉ giữ lại logic và UI cho student.

function ConfirmTrashModal({ open, onClose, className, onConfirm }) {
  if (!open) return null;
  return (
    <div className="trash-modal-overlay">
      <div className="trash-modal">
        <div className="trash-modal-icon">
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none"><ellipse cx="48" cy="80" rx="32" ry="8" fill="#e3eafc"/><rect x="28" y="36" width="40" height="36" rx="8" fill="#e3eafc"/><rect x="36" y="24" width="24" height="12" rx="4" fill="#90caf9"/><rect x="40" y="12" width="16" height="12" rx="4" fill="#b0bec5"/><rect x="32" y="36" width="32" height="36" rx="8" fill="#90caf9"/><rect x="40" y="44" width="4" height="20" rx="2" fill="#e3eafc"/><rect x="52" y="44" width="4" height="20" rx="2" fill="#e3eafc"/></svg>
        </div>
        <div className="trash-modal-title">Xóa lớp học</div>
        <div className="trash-modal-desc">
          Lớp học <b>{className}</b> sẽ được chuyển vào thùng rác và lưu trữ trong 7 ngày. Sau 7 ngày, lớp sẽ tự động bị xóa vĩnh viễn. Bạn có chắc chắn muốn xóa?
        </div>
        <div className="trash-modal-actions">
          <button className="trash-modal-btn trash-modal-btn-cancel" onClick={onClose}>Hủy</button>
          <button className="trash-modal-btn trash-modal-btn-danger" onClick={onConfirm}>Xóa</button>
        </div>
      </div>
    </div>
  );
}

function TeacherDashboard() {
  const [viewMode, setViewMode] = useState('list');
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef();
  const [activeTab, setActiveTab] = useState('your-classes');
  const navigate = useNavigate();
  // Lấy dữ liệu từ localStorage hoặc sample
  const [visibleClasses, setVisibleClasses] = useState(() => {
    const data = localStorage.getItem('teacher_visible_classes');
    return data ? JSON.parse(data) : sampleClasses;
  });
  const [hiddenClasses, setHiddenClasses] = useState(() => {
    const data = localStorage.getItem('teacher_hidden_classes');
    if (data) {
      const arr = JSON.parse(data);
      if (Array.isArray(arr) && arr.length > 0) return arr;
    }
    return [
      {
        id: 5,
        name: 'Lớp Sinh 12C',
        code: 'BIO12C',
        image: 'https://i.imgur.com/1bX5QH6.jpg',
        students: 32,
        lectures: 6,
        homeworks: 2,
        materials: 3,
      },
      {
        id: 6,
        name: 'Lớp Địa 9A',
        code: 'GEO9A',
        image: 'https://i.imgur.com/0y8Ftya.jpg',
        students: 25,
        lectures: 4,
        homeworks: 1,
        materials: 2,
      },
    ];
  });
  const [trashedClasses, setTrashedClasses] = useState(() => {
    const data = localStorage.getItem('teacher_trashed_classes');
    return data ? JSON.parse(data) : [];
  });
  const [trashModalOpen, setTrashModalOpen] = useState(false);
  const [trashClassName, setTrashClassName] = useState('');
  const [trashClassId, setTrashClassId] = useState(null);
  const [trashFrom, setTrashFrom] = useState('visible');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarClass, setSnackbarClass] = useState(null);
  const snackbarTimeoutRef = useRef();
  const [sortBy, setSortBy] = useState('oldest');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);


  const handleSortClick = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
      // Close sort dropdown when clicking outside
      if (isSortDropdownOpen && !event.target.closest('.teacher-class-sort-container')) {
        setIsSortDropdownOpen(false);
      }
    }
    if (openMenuId !== null || isSortDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId, isSortDropdownOpen]);

  useEffect(() => {
    localStorage.setItem('teacher_visible_classes', JSON.stringify(visibleClasses));
  }, [visibleClasses]);
  useEffect(() => {
    localStorage.setItem('teacher_hidden_classes', JSON.stringify(hiddenClasses));
  }, [hiddenClasses]);
  useEffect(() => {
    localStorage.setItem('teacher_trashed_classes', JSON.stringify(trashedClasses));
  }, [trashedClasses]);

  const handleMenuClick = (id, e) => {
    e.stopPropagation();
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      setOpenMenuId(id);
    }
  };

  const handleMenuAction = (action, id) => {
    setOpenMenuId(null);
    if (action === 'join') {
      const cls = visibleClasses.find(cls => cls.id === id);
      if (cls) {
        navigate(`/teacher/class/${cls.id}/announcement`);
      }
      return;
    }
    if (action === 'hide') {
      const classToHide = visibleClasses.find(cls => cls.id === id);
      if (classToHide) {
        setVisibleClasses(visibleClasses.filter(cls => cls.id !== id));
        setHiddenClasses([classToHide, ...hiddenClasses]);
      }
      return;
    }
    if (action === 'unhide') {
      const classToUnhide = hiddenClasses.find(cls => cls.id === id);
      if (classToUnhide) {
        setHiddenClasses(hiddenClasses.filter(cls => cls.id !== id));
        setVisibleClasses([classToUnhide, ...visibleClasses]);
      }
      return;
    }
    if (action === 'delete') {
      let cls = visibleClasses.find(cls => cls.id === id);
      let from = 'visible';
      if (!cls) {
        cls = hiddenClasses.find(cls => cls.id === id);
        from = 'hidden';
      }
      setTrashClassName(cls ? cls.name : '');
      setTrashClassId(id);
      setTrashModalOpen(true);
      setTrashFrom(from);
      return;
    }
    if (action === 'edit') {
      const cls = visibleClasses.find(cls => cls.id === id);
      if (cls) {
        navigate(`/teacher/class/${cls.id}/announcement`);
      }
      return;
    }
    if (action === 'duplicate') {
      const classToDuplicate = visibleClasses.find(cls => cls.id === id);
      if (classToDuplicate) {
        const newClass = { ...classToDuplicate, id: Date.now() };
        setVisibleClasses([newClass, ...visibleClasses]);
      }
      return;
    }
  };

  const handleTrashConfirm = () => {
    let cls = null;
    let newVisible = visibleClasses;
    let newHidden = hiddenClasses;
    let newTrashed = trashedClasses;
    if (trashFrom === 'visible') {
      cls = visibleClasses.find(c => c.id === trashClassId);
      if (cls) {
        newVisible = visibleClasses.filter(c => c.id !== trashClassId);
      }
    } else {
      cls = hiddenClasses.find(c => c.id === trashClassId);
      if (cls) {
        newHidden = hiddenClasses.filter(c => c.id !== trashClassId);
      }
    }
    if (cls) {
      const trashedClass = { ...cls, deletedAt: Date.now() };
      newTrashed = [trashedClass, ...trashedClasses];
      localStorage.setItem('teacher_visible_classes', JSON.stringify(newVisible));
      localStorage.setItem('teacher_hidden_classes', JSON.stringify(newHidden));
      localStorage.setItem('teacher_trashed_classes', JSON.stringify(newTrashed));
      setVisibleClasses(newVisible);
      setHiddenClasses(newHidden);
      setTrashedClasses(newTrashed);
      setSnackbarClass(trashedClass);
      setSnackbarOpen(true);
      if (snackbarTimeoutRef.current) clearTimeout(snackbarTimeoutRef.current);
      snackbarTimeoutRef.current = setTimeout(() => setSnackbarOpen(false), 4000);
    }
    setTrashModalOpen(false);
  };
  const handleUndoTrash = () => {
    if (!snackbarClass) return;
    const newTrashed = trashedClasses.filter(c => c.id !== snackbarClass.id);
    const newVisible = [snackbarClass, ...visibleClasses];
    setTrashedClasses(newTrashed);
    setVisibleClasses(newVisible);
    localStorage.setItem('teacher_trashed_classes', JSON.stringify(newTrashed));
    localStorage.setItem('teacher_visible_classes', JSON.stringify(newVisible));
    setSnackbarOpen(false);
  };

  const handleClassClick = (cls) => {
    navigate(`/teacher/class/${cls.id}/announcement`);
  };

  // Tab data
  const tabData = [
    { key: 'your-classes', label: `Lớp của bạn (${visibleClasses.length})` },
    { key: 'hidden-classes', label: `Lớp đã ẩn (${hiddenClasses.length})` },
  ];

  return (
    <div className="teacher-classpage-container">
      <Header />
      <div className="teacher-classpage-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 32px 8px 32px' }}>
        <div className="teacher-classpage-tabs compact">
          {tabData.map(tab => (
            <button
              key={tab.key}
              className={`teacher-classpage-tab compact${activeTab === tab.key ? ' teacher-classpage-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="teacher-trash-btn"
            style={{
              borderRadius: 8,
              textTransform: 'none',
              marginRight: 16,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ccc',
              background: '#fff',
              padding: '0 12px',
              fontSize: 15,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/teacher/trash')}
          >
            <span style={{ display: 'flex', alignItems: 'center', marginRight: 8 }}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
              </svg>
            </span>
            <span>Thùng rác</span>
          </button>
          <button
            className="teacher-class-gridtoggle"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            aria-label={viewMode === 'grid' ? 'Chuyển sang dạng danh sách' : 'Chuyển sang dạng lưới'}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              marginLeft: 8,
              cursor: 'pointer',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 6,
              transition: 'background 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = '#f4f6f8'}
            onMouseOut={e => e.currentTarget.style.background = 'none'}
          >
            {viewMode === 'grid' ? (
              // List icon
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="6" width="16" height="2" rx="1" fill="#888" />
                <rect x="4" y="11" width="16" height="2" rx="1" fill="#888" />
                <rect x="4" y="16" width="16" height="2" rx="1" fill="#888" />
              </svg>
            ) : (
              // Grid icon
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="6" height="6" rx="1" fill="#888" />
                <rect x="14" y="4" width="6" height="6" rx="1" fill="#888" />
                <rect x="4" y="14" width="6" height="6" rx="1" fill="#888" />
                <rect x="14" y="14" width="6" height="6" rx="1" fill="#888" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="teacher-class-toolbar compact" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 32px 16px 32px' }}>
        <input className="teacher-class-search compact" type="text" placeholder="Tìm kiếm..." />
        <div className="teacher-class-sort-container">
          <div 
            className={`teacher-class-sort compact${isSortDropdownOpen ? ' teacher-class-sort--open' : ''}`}
            onClick={handleSortClick}
          >
            <span>{sortBy === 'oldest' ? 'Cũ nhất' : sortBy === 'name' ? 'Tên lớp' : 'Mã lớp'}</span>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`teacher-class-sort-arrow ${isSortDropdownOpen ? 'rotated' : ''}`}
            >
              <path d="m7 10 5 5 5-5z" fill="currentColor"/>
            </svg>
          </div>
          {isSortDropdownOpen && (
            <div className="teacher-class-sort-menu">
              <div 
                className={`teacher-class-sort-item ${sortBy === 'oldest' ? 'selected' : ''}`}
                onClick={() => {
                  setSortBy('oldest');
                  setIsSortDropdownOpen(false);
                }}
              >
                Cũ nhất
              </div>
              <div 
                className={`teacher-class-sort-item ${sortBy === 'name' ? 'selected' : ''}`}
                onClick={() => {
                  setSortBy('name');
                  setIsSortDropdownOpen(false);
                }}
              >
                Tên lớp
              </div>
              <div 
                className={`teacher-class-sort-item ${sortBy === 'code' ? 'selected' : ''}`}
                onClick={() => {
                  setSortBy('code');
                  setIsSortDropdownOpen(false);
                }}
              >
                Mã lớp
              </div>
            </div>
          )}
        </div>
        <button className="teacher-class-create primary" onClick={() => navigate('/teacher/create-class')}>+ Tạo lớp học</button>
      </div>
      <div className="teacher-class-list">
        {activeTab === 'your-classes' ? (
          visibleClasses.length === 0 ? (
            <table className="teacher-class-table compact">
              <thead>
                <tr>
                  <th className="teacher-class-table__name">Tên lớp</th>
                  <th>Học sinh</th>
                  <th>Bài giảng</th>
                  <th>Bài tập</th>
                  <th>Tài liệu</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6">
                    <div className="teacher-classpage-empty-state">
                      <img
                        src="https://cdn.dribbble.com/users/1615584/screenshots/4182141/media/2b7e1e2e2e2e2e2e2e2e2e2e2e2e2e2e.png"
                        alt="No classes"
                        className="teacher-classpage-empty-img"
                      />
                      <div className="teacher-classpage-empty-title">Không tìm thấy lớp học nào</div>
                      <div className="teacher-classpage-empty-desc">
                        Hãy kiểm tra trong danh sách lớp học khác, hoặc khởi tạo lớp học của bạn
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            viewMode === 'grid' ? (
              <div className="teacher-class-grid">
                {visibleClasses.map(cls => (
                  <div
                    className="teacher-class-card"
                    key={cls.id}
                    style={{
                      position: 'relative',
                      borderRadius: 16,
                      boxShadow: '0 2px 8px rgba(30,136,229,0.08)',
                      background: '#fff',
                      margin: 12,
                      padding: 0,
                      overflow: 'hidden',
                      minWidth: 220,
                      maxWidth: 320,
                      flex: '1 1 220px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ width: '100%', height: 140, overflow: 'hidden' }}>
                      {cls.image ? (
                        <img
                          src={cls.image}
                          alt="Class"
                          style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: '16px 16px 0 0' }}
                        />
                      ) : (
                        <div className="class-image-placeholder" style={{ width: '100%', height: 140, background: '#f4f6f8', borderRadius: '16px 16px 0 0' }}></div>
                      )}
                    </div>
                    {/* Đặt nút menu ở phía dưới, cùng hàng với tên lớp và mã lớp */}
                    <div className="teacher-class-card__info" style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                        <div className="teacher-class-card__name" style={{ fontWeight: 600, fontSize: 16, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cls.name}</div>
                        <div className="teacher-class-card__code" style={{ fontSize: 14, color: '#888', marginTop: 4 }}>{cls.code}</div>
                      </div>
                      <button
                        className="teacher-class-card-menu-btn"
                        onClick={e => { e.stopPropagation(); setOpenMenuId(cls.id); }}
                        style={{
                          background: 'none',
                          border: 'none',
                          borderRadius: '50%',
                          width: 40,
                          height: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          marginLeft: 8,
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#f4f6f8'}
                        onMouseOut={e => e.currentTarget.style.background = 'none'}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#888"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                      </button>
                    </div>
                    {openMenuId === cls.id && (
                      <div className="teacher-class-card-menu-popup" style={{
                        position: 'absolute',
                        top: 56,
                        right: 16,
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 4px 24px rgba(25, 118, 210, 0.13), 0 1.5px 8px rgba(0,0,0,0.10)',
                        minWidth: 180,
                        zIndex: 10,
                        padding: '8px 0',
                        display: 'flex',
                        flexDirection: 'column',
                      }}>
                        <button className="teacher-class-card-menu-item" onClick={() => handleMenuAction('join', cls.id)} style={{
                          display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, color: '#222', padding: '12px 20px', border: 'none', background: 'none', cursor: 'pointer', borderRadius: 8, transition: 'background 0.18s', width: '100%', textAlign: 'left',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#f3f4f8'}
                        onMouseOut={e => e.currentTarget.style.background = 'none'}
                        >
                          <span className="teacher-list-menu-icon" style={{display:'inline-flex',alignItems:'center', width:22, height:22}}>
                            <svg width="22" height="22" fill="#555" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                          </span> Vào lớp
                        </button>
                        <button className="teacher-class-card-menu-item" onClick={() => handleMenuAction('hide', cls.id)} style={{
                          display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, color: '#222', padding: '12px 20px', border: 'none', background: 'none', cursor: 'pointer', borderRadius: 8, transition: 'background 0.18s', width: '100%', textAlign: 'left',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#f3f4f8'}
                        onMouseOut={e => e.currentTarget.style.background = 'none'}
                        >
                          <span className="teacher-list-menu-icon" style={{display:'inline-flex',alignItems:'center', width:22, height:22}}>
                            <svg width="22" height="22" fill="#555" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.71 3.3-4.88 6-6.32M1 1l22 22" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="12" cy="12" r="3.5" stroke="#555" strokeWidth="2" fill="none"/></svg>
                          </span> Ẩn lớp
                        </button>
                        <button className="teacher-class-card-menu-item" onClick={() => handleMenuAction('delete', cls.id)} style={{
                          display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, color: '#222', padding: '12px 20px', border: 'none', background: 'none', cursor: 'pointer', borderRadius: 8, transition: 'background 0.18s', width: '100%', textAlign: 'left',
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#f3f4f8'}
                        onMouseOut={e => e.currentTarget.style.background = 'none'}
                        >
                          <span className="teacher-list-menu-icon" style={{display:'inline-flex',alignItems:'center', width:22, height:22}}>
                            <svg width="22" height="22" fill="#555" viewBox="0 0 24 24">
                              <path d="M3 6h18" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                              <rect x="5" y="6" width="14" height="13" rx="2" stroke="#555" strokeWidth="2" fill="none"/>
                              <line x1="10" y1="11" x2="10" y2="17" stroke="#555" strokeWidth="2"/>
                              <line x1="14" y1="11" x2="14" y2="17" stroke="#555" strokeWidth="2"/>
                            </svg>
                          </span> Xóa
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <table className="teacher-class-table compact">
                <thead>
                  <tr>
                    <th className="teacher-class-table__name">Tên lớp</th>
                    <th>Học sinh</th>
                    <th>Bài giảng</th>
                    <th>Bài tập</th>
                    <th>Tài liệu</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {visibleClasses.map(cls => (
                    <tr key={cls.id} style={{cursor:'pointer'}}>
                      <td className="teacher-class-table__name">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <img src={cls.image} alt="Class" style={{ width: 140, height: 60, objectFit: 'cover', borderRadius: 0 }} />
                          <div>
                            <div style={{ fontWeight: 'bold' }}>{cls.name}</div>
                            <div style={{ fontSize: 13, color: '#666' }}>Mã lớp • {cls.code}</div>
                          </div>
                        </div>
                      </td>
                      <td>{cls.students}</td>
                      <td>{cls.lectures}</td>
                      <td>{cls.homeworks}</td>
                      <td>{cls.materials}</td>
                      <td style={{ position: 'relative' }}>
                        <button
                          className="teacher-list-menu-btn"
                          onClick={(e) => handleMenuClick(cls.id, e)}
                        >
                          ⋮
                        </button>
                        {openMenuId === cls.id && (
                          <div className="teacher-list-menu-popup" ref={menuRef}>
                            <button className="teacher-list-menu-item" onClick={() => handleMenuAction('join', cls.id)}>
                              <span className="teacher-list-menu-icon" style={{display:'inline-flex',alignItems:'center'}}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path d="M9 6l6 6-6 6"/>
                                  <path d="M15 12H3"/>
                                </svg>
                              </span> Vào lớp
                            </button>
                            <button className="teacher-list-menu-item" onClick={() => handleMenuAction('hide', cls.id)}>
                              <span className="teacher-list-menu-icon" style={{display:'inline-flex',alignItems:'center'}}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.71 3.3-4.88 6-6.32"/>
                                  <path d="M1 1l22 22"/>
                                  <circle cx="12" cy="12" r="3.5"/>
                                </svg>
                              </span> Ẩn lớp
                            </button>
                           
                            <button className="teacher-list-menu-item" onClick={() => handleMenuAction('delete', cls.id)}>
                              <span className="teacher-list-menu-icon" style={{display:'inline-flex',alignItems:'center'}}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path d="M3 6h18"/>
                                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                  <rect x="5" y="6" width="14" height="13" rx="2"/>
                                  <line x1="10" y1="11" x2="10" y2="17"/>
                                  <line x1="14" y1="11" x2="14" y2="17"/>
                                </svg>
                              </span> Xóa
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )
        ) : (
          <table className="teacher-class-table compact">
            <thead>
              <tr>
                <th className="teacher-class-table__name">Tên lớp</th>
                <th>Học sinh</th>
                <th>Bài giảng</th>
                <th>Bài tập</th>
                <th>Tài liệu</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {hiddenClasses.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div className="teacher-classpage-empty-state">
                      <img
                        src="https://cdn.dribbble.com/users/1615584/screenshots/4182141/media/2b7e1e2e2e2e2e2e2e2e2e2e2e2e2e2e.png"
                        alt="No hidden classes"
                        className="teacher-classpage-empty-img"
                      />
                      <div className="teacher-classpage-empty-title">Không có lớp đã ẩn</div>
                      <div className="teacher-classpage-empty-desc">
                        Các lớp bạn ẩn sẽ xuất hiện ở đây.
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                hiddenClasses.map(cls => (
                  <tr key={cls.id}>
                    <td className="teacher-class-table__name">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img src={cls.image} alt="Class" style={{ width: 140, height: 60, objectFit: 'cover', borderRadius: 0 }} />
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{cls.name}</div>
                          <div style={{ fontSize: 13, color: '#666' }}>Mã lớp • {cls.code}</div>
                        </div>
                      </div>
                    </td>
                    <td>{cls.students}</td>
                    <td>{cls.lectures}</td>
                    <td>{cls.homeworks}</td>
                    <td>{cls.materials}</td>
                    <td style={{ position: 'relative' }}>
                      <button
                        className="teacher-list-menu-btn"
                        onClick={(e) => handleMenuClick(cls.id, e)}
                      >
                        ⋮
                      </button>
                      {openMenuId === cls.id && (
                        <div className="teacher-list-menu-popup" ref={menuRef}>
                          <button className="teacher-list-menu-item" onClick={() => handleMenuAction('unhide', cls.id)}>
                            <span className="teacher-list-menu-icon" style={{display:'inline-flex',alignItems:'center',width:22,height:22}}>
                              <svg width="22" height="22" fill="#555" viewBox="0 0 24 24">
                                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" stroke="#555" strokeWidth="2" fill="none"/>
                                <circle cx="12" cy="12" r="3.5" stroke="#555" strokeWidth="2" fill="none"/>
                              </svg>
                            </span> Hiện lớp
                          </button>
                          <button className="teacher-list-menu-item" onClick={() => handleMenuAction('delete', cls.id)}>
                            <span className="teacher-list-menu-icon" style={{display:'inline-flex',alignItems:'center'}}>
                              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M3 6h18"/>
                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                <rect x="5" y="6" width="14" height="13" rx="2"/>
                                <line x1="10" y1="11" x2="10" y2="17"/>
                                <line x1="14" y1="11" x2="14" y2="17"/>
                              </svg>
                            </span> Xóa
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <ConfirmTrashModal open={trashModalOpen} onClose={() => setTrashModalOpen(false)} className={trashClassName} onConfirm={handleTrashConfirm} />
      {snackbarOpen && snackbarClass && (
        <div className="teacher-snackbar">
          <div className="teacher-snackbar-content">
            <span>Đã xóa lớp {snackbarClass.name}</span>
            <button onClick={handleUndoTrash} className="teacher-snackbar-undo-btn">Hoàn tác</button>
          </div>
        </div>
      )}
      </div>
  );
}

export default TeacherDashboard; 