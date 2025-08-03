import React, { useState } from 'react';
import Header from '../Header';
import './MembersPage.css';
import { MdSearch, MdPrint, MdShare, MdDeleteOutline } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';

const MEMBERS = [
  { name: 'Nguyễn Duy', school: 'CNTT', className: '--', phone: '--', assignments: '1/2', avatar: '' },
  { name: 'Nguyễn Khánh Dương Duy', school: 'Đại học Nguyễn Tất Thành', className: '22DTH2C', phone: '--', assignments: '2/2', avatar: '' },
  { name: 'Trần Thị Nguyễn Hoàng Minh Khánh Dương', school: 'Đại học Bách Khoa Thành phố Hồ Chí Minh - Trường Đại học Công nghệ Thông tin', className: '22DTH2C-Advanced-Programming', phone: '01234567890123456789', assignments: '15/20', avatar: '' },
  { name: 'Lê Văn A', school: 'Đại học Kinh tế Quốc dân Hà Nội - Khoa Công nghệ Thông tin và Truyền thông', className: '22DTH2C', phone: '09876543210987654321', assignments: '8/10', avatar: '' },
  { name: 'Phạm Thị B', school: 'Đại học FPT - Cơ sở Hồ Chí Minh', className: '22DTH2C-Web-Development', phone: '--', assignments: '3/5', avatar: '' },
  { name: 'Hoàng Văn C', school: 'Đại học Công nghệ Thông tin - Đại học Quốc gia Hà Nội', className: '22DTH2C-Mobile-App-Development', phone: '0123456789', assignments: '12/15', avatar: '' },
];

// Dữ liệu mẫu cho học sinh chờ duyệt
const PENDING_REQUESTS = [
  { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com" },
  { id: 2, name: "Trần Thị B", email: "b@gmail.com" },
  { id: 3, name: "Lê Văn C", email: "c@gmail.com" }
];

function getInitials(name) {
  if (!name) return '';
  const words = name.trim().split(' ');
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[words.length - 2][0] + words[words.length - 1][0]).toUpperCase();
}

function MembersPage() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' hoặc 'select'
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState(PENDING_REQUESTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addStudentData, setAddStudentData] = useState({
    name: '',
    email: '',
    school: '',
    className: '',
    phone: ''
  });
  const filtered = MEMBERS.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase())
  );
  const navigate = useNavigate();
  const { classId } = useParams();

  const handleSearch = (e) => {
    if (e.key === 'Enter') setQuery(search);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    if (mode === 'list') {
      setSelectedMembers([]);
    }
  };

  const handleSelectMember = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === filtered.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filtered.map((_, index) => index + 1));
    }
  };

  const handleDeleteSelected = () => {
    // Xử lý xóa các thành viên đã chọn
    console.log('Xóa thành viên:', selectedMembers);
    setSelectedMembers([]);
    setViewMode('list');
  };

  // Hàm duyệt học sinh
  function approveStudent(id) {
    // Gọi API duyệt học sinh
    console.log('Duyệt học sinh:', id);
    // Sau khi API thành công, cập nhật lại danh sách
    setPendingRequests(prev => prev.filter(s => s.id !== id));
  }

  // Hàm từ chối học sinh
  function rejectStudent(id) {
    // Gọi API từ chối học sinh
    console.log('Từ chối học sinh:', id);
    // Sau khi API thành công, cập nhật lại danh sách
    setPendingRequests(prev => prev.filter(s => s.id !== id));
  }

  const handleAddStudent = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setAddStudentData({
      name: '',
      email: '',
      school: '',
      className: '',
      phone: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddStudentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitAddStudent = (e) => {
    e.preventDefault();
    if (!addStudentData.name.trim() || !addStudentData.email.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }
    
    // Thêm học sinh mới vào danh sách
    const newStudent = {
      name: addStudentData.name,
      school: addStudentData.school || '--',
      className: addStudentData.className || '--',
      phone: addStudentData.phone || '--',
      assignments: '0/0',
      avatar: ''
    };
    
    // Thêm vào đầu danh sách MEMBERS (trong thực tế sẽ gọi API)
    console.log('Thêm học sinh:', newStudent);
    
    handleCloseModal();
  };

  return (
    <div className="teacher-members-root">
      <Header />
      <div className="teacher-members-layout">
        <TeacherSidebar />
        <div className="teacher-members-content">
          <div className="teacher-members-header">
            <div className="teacher-members-title">Thành viên lớp học ({filtered.length})</div>
            <div className="teacher-members-toolbar">
              <div className="teacher-members-toolbar-left">
                <div className="teacher-members-view-buttons">
                  <button 
                    className={`teacher-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => handleViewModeChange('list')}
                  >
                    ☰
                  </button>
                  <button 
                    className={`teacher-view-btn ${viewMode === 'select' ? 'active' : ''}`}
                    onClick={() => handleViewModeChange('select')}
                  >
                    ☰✓
                  </button>
                </div>
                <div className="teacher-members-search-container">
                  <div className="teacher-search-input-wrapper">
                    <MdSearch size={20} className="teacher-search-icon" />
                    <input
                      className="teacher-members-search"
                      type="text"
                      placeholder="Nhập và ấn enter để tìm kiếm"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      onKeyDown={handleSearch}
                    />
                  </div>
                </div>
                <button className="teacher-members-print-btn">
                  <MdPrint size={20} />
                </button>
              </div>
              <button className="teacher-members-add-btn" onClick={handleAddStudent}>Thêm học sinh</button>
            </div>
          </div>
          

          
          <div className="teacher-members-table-container">
            {viewMode === 'select' && (
              <div className="teacher-members-selection-header">
                <div className="teacher-selection-left">
                  <input 
                    type="checkbox" 
                    checked={selectedMembers.length === filtered.length && filtered.length > 0}
                    onChange={handleSelectAll}
                  />
                  <span className="teacher-selection-text">
                    Đang chọn <span className="teacher-selection-count">{selectedMembers.length}</span> học sinh
                  </span>
                </div>
                <div className="teacher-selection-right">
                  <button 
                    className="teacher-delete-selected-btn"
                    onClick={handleDeleteSelected}
                    disabled={selectedMembers.length === 0}
                  >
                    <MdDeleteOutline size={16} />
                    Xóa
                  </button>
                </div>
              </div>
            )}
            <table className={`teacher-members-table ${viewMode === 'select' ? 'select-mode' : ''}`}>
              <thead>
                {viewMode === 'select' && (
                  <tr>
                    <th>
                      <input 
                        type="checkbox" 
                        checked={selectedMembers.length === filtered.length && filtered.length > 0}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Họ và tên
                      <button className="teacher-sort-btn" aria-label="Sắp xếp">↑</button>
                    </th>
                    <th>Trường</th>
                    <th>Lớp</th>
                    <th>SĐT</th>
                    <th>Bài đã làm</th>
                    <th></th>
                  </tr>
                )}
                {viewMode === 'list' && (
                  <tr>
                    <th>Họ và tên
                      <button className="teacher-sort-btn" aria-label="Sắp xếp">↑</button>
                    </th>
                    <th>Trường</th>
                    <th>Lớp</th>
                    <th>SĐT</th>
                    <th>Bài đã làm</th>
                    <th></th>
                  </tr>
                )}
              </thead>
              <tbody>
                {filtered.map((m, idx) => (
                  <tr key={idx} style={{cursor: viewMode === 'select' ? 'default' : 'pointer'}} onClick={viewMode === 'select' ? undefined : () => navigate(`/teacher/class/${classId}/members/${idx+1}`)}>
                    {viewMode === 'select' && (
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedMembers.includes(idx + 1)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectMember(idx + 1);
                          }}
                        />
                      </td>
                    )}
                    <td>
                      <div className="teacher-member-info">
                        <div className="teacher-member-main">
                          <span className="teacher-member-avatar">
                            {m.avatar ? (
                              <img src={m.avatar} alt={m.name} />
                            ) : (
                              getInitials(m.name)
                            )}
                          </span>
                          <span className="teacher-member-name">{m.name}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="teacher-school-info">
                        <span>{m.school}</span>
                      </div>
                    </td>
                    <td>{m.className}</td>
                    <td>{m.phone}</td>
                    <td>{m.assignments}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button className="teacher-share-btn" onClick={(e) => e.stopPropagation()}>
                          <MdShare size={16} />
                          Chia sẻ
                        </button>
                        <button className="teacher-delete-btn" onClick={(e) => e.stopPropagation()}>
                          <MdDeleteOutline size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Right sidebar for pending requests */}
        <div className="teacher-members-sidebar">
          <div className="teacher-pending-requests">
            <div className="teacher-pending-title">Chờ duyệt • {pendingRequests.length}</div>
            {pendingRequests.length === 0 ? (
              <div className="teacher-pending-info">
                Yêu cầu vào lớp sẽ được hiển thị khi có học sinh tìm kiếm lớp bạn với mã lớp <b>WYFEP</b>
              </div>
            ) : (
              <ul className="teacher-pending-list">
                {pendingRequests.map(student => (
                  <li key={student.id} className="teacher-pending-item">
                    <div className="teacher-pending-student-info">
                      <span className="teacher-pending-student-name">{student.name}</span>
                      <span className="teacher-pending-student-email">{student.email}</span>
                    </div>
                    <div className="teacher-pending-actions">
                      <button 
                        className="teacher-approve-btn" 
                        onClick={() => approveStudent(student.id)}
                      >
                        Duyệt
                      </button>
                      <button 
                        className="teacher-reject-btn" 
                        onClick={() => rejectStudent(student.id)}
                      >
                        Từ chối
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="teacher-modal-overlay" onClick={handleCloseModal}>
          <div className="teacher-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="teacher-modal-header">
              <h2 className="teacher-modal-title">Thêm học sinh</h2>
              <button className="teacher-modal-close" onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitAddStudent} className="teacher-modal-form">
              <div className="teacher-modal-form-group">
                <label className="teacher-modal-label">
                  Họ và tên <span className="teacher-modal-required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={addStudentData.name}
                  onChange={handleInputChange}
                  className="teacher-modal-input"
                  placeholder="Nhập họ và tên học sinh"
                  required
                />
              </div>
              
              <div className="teacher-modal-form-group">
                <label className="teacher-modal-label">
                  Email <span className="teacher-modal-required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={addStudentData.email}
                  onChange={handleInputChange}
                  className="teacher-modal-input"
                  placeholder="Nhập email học sinh"
                  required
                />
              </div>
              
              <div className="teacher-modal-form-group">
                <label className="teacher-modal-label">Trường</label>
                <input
                  type="text"
                  name="school"
                  value={addStudentData.school}
                  onChange={handleInputChange}
                  className="teacher-modal-input"
                  placeholder="Nhập tên trường"
                />
              </div>
              
              <div className="teacher-modal-form-group">
                <label className="teacher-modal-label">Lớp</label>
                <input
                  type="text"
                  name="className"
                  value={addStudentData.className}
                  onChange={handleInputChange}
                  className="teacher-modal-input"
                  placeholder="Nhập tên lớp"
                />
              </div>
              
              <div className="teacher-modal-form-group">
                <label className="teacher-modal-label">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={addStudentData.phone}
                  onChange={handleInputChange}
                  className="teacher-modal-input"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              
              <div className="teacher-modal-actions">
                <button type="button" className="teacher-modal-cancel" onClick={handleCloseModal}>
                  Hủy
                </button>
                <button type="submit" className="teacher-modal-submit">
                  Thêm học sinh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MembersPage; 