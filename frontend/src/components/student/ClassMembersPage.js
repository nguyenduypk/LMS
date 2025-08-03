import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import ClassSidebar from './ClassSidebar';
import '../../styles/ClassMembersPage.css';

const MOCK_CLASS = {
  name: 'Toán 10A1',
  code: 'MATH10A1',
  teacher: 'Nguyễn Văn B',
};

const MEMBERS = [
  { name: 'Nguyễn Duy', school: 'CNTT', className: '--', avatar: '' },
  { name: 'Nguyễn Khánh Dương Duy', school: 'Đại học Nguyễn Tất Thành', className: '22DTH2C', avatar: '' },
  { name: 'Trần Minh Quý PIKAY', school: 'Đại học Nguyễn Tất Thành', className: '22DTH2C', avatar: '' },
  { name: 'Trần Hoài Nhân Pikay', school: 'Đại học Nguyễn Tất Thành', className: '22DTH2C', avatar: '' },
];

function getInitials(name) {
  if (!name) return '';
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[words.length - 2][0] + words[words.length - 1][0]).toUpperCase();
}

function ClassMembersPage() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const filtered = MEMBERS.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e) => {
    if (e.key === 'Enter') setQuery(search);
  };

  return (
    <>
      <DashboardHeader />
      <div className="class-members-layout">
        <ClassSidebar classInfo={MOCK_CLASS} selected="members" />
        <main className="class-members-main">
          <div className="class-members-title">
            Thành viên lớp học ({filtered.length})
          </div>
          <input
            className="class-members-search"
            type="text"
            placeholder="Nhập và ấn enter để tìm kiếm"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
          <div className="class-members-table-wrap">
            <table className="class-members-table">
              <thead>
                <tr>
                  <th>Họ và tên</th>
                  <th>Trường</th>
                  <th>Lớp</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className="class-members-avatar">
                        {m.avatar ? (
                          <img src={m.avatar} alt={m.name} />
                        ) : (
                          getInitials(m.name)
                        )}
                      </span>
                      <span className="class-members-name">{m.name}</span>
                    </td>
                    <td>{m.school}</td>
                    <td>{m.className}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default ClassMembersPage; 