import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import ClassSidebar from './ClassSidebar';
import '../../styles/ClassMaterialsPage.css';
import { useNavigate, useParams } from 'react-router-dom';

const MOCK_CLASS = {
  name: 'Toán 10A1',
  code: 'MATH10A1',
  teacher: 'Nguyễn Văn B',
};

const MATERIALS = [
  {
    id: 1,
    name: 'qpan.docx',
    type: 'word',
    views: 0,
    date: '09 tháng 7 lúc 22:36',
  },
  {
    id: 2,
    name: 'bai_giang.pdf',
    type: 'pdf',
    views: 5,
    date: '08 tháng 7 lúc 10:12',
  },
];

const FILE_ICONS = {
  word: <span className="mat-file-icon word">W</span>,
  pdf: <span className="mat-file-icon pdf">PDF</span>,
  ppt: <span className="mat-file-icon ppt">PPT</span>,
  xls: <span className="mat-file-icon xls">XLS</span>,
  default: <span className="mat-file-icon">📄</span>,
};

function ClassMaterialsPage() {
  const [menuOpen, setMenuOpen] = useState(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const navigate = useNavigate();
  const { classCode } = useParams();

  const filtered = MATERIALS.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <DashboardHeader />
      <div className="mat-layout">
        <ClassSidebar classInfo={MOCK_CLASS} selected="materials" />
        <main className="mat-main">
          <div className="mat-title">Tài liệu</div>
          <div className="mat-content">
            <aside className="mat-folder-bar">
              <div className="mat-folder-title">Thư mục</div>
              <div className="mat-folder-item active">
                <span className="mat-folder-icon">📁</span> Tất cả tài liệu
              </div>
            </aside>
            <section className="mat-list-area">
              <div className="mat-list-bar">
                <input
                  className="mat-search"
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <button className="mat-search-btn">🔍</button>
                <select className="mat-sort" value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="newest">Sắp xếp...</option>
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                </select>
              </div>
              <div className="mat-list">
                {filtered.map((m) => (
                  <div className="mat-file-row" key={m.id}>
                    {FILE_ICONS[m.type] || FILE_ICONS.default}
                    <span className="mat-file-name">{m.name}</span>
                    <span className="mat-file-meta">{m.views} đã xem • {m.date}</span>
                    <button className="mat-file-menu-btn" onClick={() => setMenuOpen(menuOpen === m.id ? null : m.id)}>
                      ⋮
                    </button>
                    {menuOpen === m.id && (
                      <div className="mat-file-menu">
                        <button className="mat-file-menu-item" onClick={() => navigate(`/class/${classCode}/materials/${m.id}/view`)}>
                          <span className="mat-file-menu-icon">👁️</span> Xem
                        </button>
                        <button className="mat-file-menu-item">
                          <span className="mat-file-menu-icon">⬇️</span> Tải xuống
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default ClassMaterialsPage; 