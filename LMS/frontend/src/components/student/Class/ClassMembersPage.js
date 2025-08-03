import React from 'react';
import DashboardHeader from '../DashboardHeader';
import ClassSidebar from './ClassSidebar';
import '../../../styles/ClassMembersPage.css';

function ClassMembersPage() {
  // Giả sử số lượng thành viên là 2, có thể thay bằng props hoặc state nếu cần
  const memberCount = 2;

  // Mock class info giống bên ClassMaterialsPage
  const classInfo = {
    name: '1234Absdth',
    code: 'OURLC',
    teacher: 'Nguyễn Duy'
  };

  // Danh sách thành viên mẫu
  const members = [
    {
      name: 'Nguyễn Duy',
      school: 'CNTT',
      class: '--'
    },
    {
      name: 'Nguyễn Khánh Dương Duy',
      school: 'Đại học Nguyễn Tất Thành',
      class: '22DTH2C'
    }
  ];

  // Hàm lấy avatar text
  const getAvatarText = (name) => {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="class-document-page">
      <DashboardHeader />
      <div className="class-document-page__content">
        <ClassSidebar classInfo={classInfo} />

        <div className="class-document-page__header">
          <h1 className="class-document-page__title">
            Thành viên lớp học ({memberCount})
          </h1>
        </div>

        <div className="members-search-bar">
          <input
            type="text"
            placeholder="Nhập và ấn enter để tìm kiếm"
            className="members-search-input"
          />
        </div>
        <div className="members-search-divider" />

        <div className="members-table-wrapper">
          <table className="members-table">
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th>Trường</th>
                <th>Lớp</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, idx) => (
                <tr key={idx}>
                  <td>
                    <span className="member-avatar">{getAvatarText(m.name)}</span>
                    <span className="member-name">{m.name}</span>
                  </td>
                  <td>{m.school}</td>
                  <td>{m.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClassMembersPage;
