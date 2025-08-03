import React, { useState } from "react";
import Header from "../Header";
import TeacherSidebar from './TeacherSidebar';
import { useNavigate, useParams } from "react-router-dom";
import "./TeacherMemberDetailPage.css";
import { MdOutlineScore, MdOutlineAssignment, MdOutlineVisibilityOff, MdDeleteOutline, MdSearch, MdFolder, MdKeyboardArrowDown } from "react-icons/md";

const MEMBERS = [
  { id: 1, name: "Nguyễn Duy" },
  { id: 2, name: "Nguyễn Khánh Dương Duy" },
];

function getInitials(name) {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[words.length - 2][0] + words[words.length - 1][0]).toUpperCase();
}

const memberData = {
  1: {
    name: "Nguyễn Duy",
    initials: "ND",
    averageScore: 1,
    assignments: [
      { name: "Màuonaldo", createdAt: "10 tháng 7 lúc 16:19", score: null, status: "Chưa làm" },
      { name: "Toán lớp 1", createdAt: "10 tháng 7 lúc 16:14", score: 1, status: "Đã làm" },
      { name: "Tiếng Việt cơ bản", createdAt: "9 tháng 7 lúc 14:30", score: 0.8, status: "Đã làm" },
      { name: "Khoa học tự nhiên", createdAt: "8 tháng 7 lúc 10:15", score: null, status: "Chưa làm" },
      { name: "Lịch sử Việt Nam", createdAt: "7 tháng 7 lúc 09:45", score: 0.9, status: "Đã làm" },
      { name: "Địa lý thế giới", createdAt: "6 tháng 7 lúc 16:20", score: 0.7, status: "Đã làm" },
      { name: "Văn học dân gian", createdAt: "5 tháng 7 lúc 11:30", score: null, status: "Chưa làm" },
      { name: "Toán nâng cao", createdAt: "4 tháng 7 lúc 15:10", score: 0.6, status: "Đã làm" },
      { name: "Tiếng Anh giao tiếp", createdAt: "3 tháng 7 lúc 13:25", score: 0.85, status: "Đã làm" },
      { name: "Vật lý cơ bản", createdAt: "2 tháng 7 lúc 08:40", score: null, status: "Chưa làm" },
      { name: "Hóa học phân tử", createdAt: "1 tháng 7 lúc 14:50", score: 0.75, status: "Đã làm" },
      { name: "Sinh học tế bào", createdAt: "30 tháng 6 lúc 12:15", score: 0.9, status: "Đã làm" },
      { name: "Công nghệ thông tin", createdAt: "29 tháng 6 lúc 16:30", score: null, status: "Chưa làm" },
      { name: "Mỹ thuật sáng tạo", createdAt: "28 tháng 6 lúc 10:20", score: 0.8, status: "Đã làm" },
      { name: "Âm nhạc truyền thống", createdAt: "27 tháng 6 lúc 15:45", score: 0.7, status: "Đã làm" },
      { name: "Thể dục thể thao", createdAt: "26 tháng 6 lúc 09:30", score: null, status: "Chưa làm" },
      { name: "Kỹ năng sống", createdAt: "25 tháng 6 lúc 11:00", score: 0.95, status: "Đã làm" },
      { name: "Giáo dục công dân", createdAt: "24 tháng 6 lúc 13:20", score: 0.8, status: "Đã làm" },
      { name: "Lập trình Python", createdAt: "23 tháng 6 lúc 14:35", score: null, status: "Chưa làm" },
      { name: "Thiết kế web", createdAt: "22 tháng 6 lúc 16:50", score: 0.7, status: "Đã làm" }
    ],
    done: 12,
    total: 20
  },
  2: {
    name: "Nguyễn Khánh Dương Duy",
    initials: "DD",
    averageScore: 2,
    assignments: [
      { name: "Màuonaldo", createdAt: "10 tháng 7 lúc 16:19", score: 2, status: "Đã làm" },
      { name: "Toán lớp 1", createdAt: "10 tháng 7 lúc 16:14", score: 2, status: "Đã làm" },
      { name: "Tiếng Việt cơ bản", createdAt: "9 tháng 7 lúc 14:30", score: 1.8, status: "Đã làm" },
      { name: "Khoa học tự nhiên", createdAt: "8 tháng 7 lúc 10:15", score: 1.9, status: "Đã làm" },
      { name: "Lịch sử Việt Nam", createdAt: "7 tháng 7 lúc 09:45", score: 1.7, status: "Đã làm" },
      { name: "Địa lý thế giới", createdAt: "6 tháng 7 lúc 16:20", score: 1.6, status: "Đã làm" },
      { name: "Văn học dân gian", createdAt: "5 tháng 7 lúc 11:30", score: 1.8, status: "Đã làm" },
      { name: "Toán nâng cao", createdAt: "4 tháng 7 lúc 15:10", score: 1.5, status: "Đã làm" },
      { name: "Tiếng Anh giao tiếp", createdAt: "3 tháng 7 lúc 13:25", score: 1.9, status: "Đã làm" },
      { name: "Vật lý cơ bản", createdAt: "2 tháng 7 lúc 08:40", score: 1.7, status: "Đã làm" },
      { name: "Hóa học phân tử", createdAt: "1 tháng 7 lúc 14:50", score: 1.6, status: "Đã làm" },
      { name: "Sinh học tế bào", createdAt: "30 tháng 6 lúc 12:15", score: 1.8, status: "Đã làm" },
      { name: "Công nghệ thông tin", createdAt: "29 tháng 6 lúc 16:30", score: 1.9, status: "Đã làm" },
      { name: "Mỹ thuật sáng tạo", createdAt: "28 tháng 6 lúc 10:20", score: 1.7, status: "Đã làm" },
      { name: "Âm nhạc truyền thống", createdAt: "27 tháng 6 lúc 15:45", score: 1.6, status: "Đã làm" },
      { name: "Thể dục thể thao", createdAt: "26 tháng 6 lúc 09:30", score: 1.8, status: "Đã làm" },
      { name: "Kỹ năng sống", createdAt: "25 tháng 6 lúc 11:00", score: 1.9, status: "Đã làm" },
      { name: "Giáo dục công dân", createdAt: "24 tháng 6 lúc 13:20", score: 1.7, status: "Đã làm" },
      { name: "Lập trình Python", createdAt: "23 tháng 6 lúc 14:35", score: 1.8, status: "Đã làm" },
      { name: "Thiết kế web", createdAt: "22 tháng 6 lúc 16:50", score: 1.6, status: "Đã làm" }
    ],
    done: 20,
    total: 20
  }
};

function TeacherMemberDetailPage() {
  const { classId, memberId } = useParams();
  const navigate = useNavigate();
  const member = memberData[memberId] || memberData[1];
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const filterOptions = [
    { value: 'all', label: 'Dành cho cả lớp' },
    { value: 'individual', label: 'Bài tập cá nhân' },
    { value: 'group', label: 'Bài tập nhóm' },
    { value: 'quiz', label: 'Bài kiểm tra' },
    { value: 'homework', label: 'Bài tập về nhà' }
  ];

  return (
    <div className="teacher-member-detail-layout">
      <Header />
      <div className="teacher-member-detail-main">
        <TeacherSidebar />
        <div className="teacher-member-detail-content">
          <div className="teacher-member-detail-breadcrumb-row">
            <div className="teacher-member-detail-breadcrumb">
              <span style={{cursor: 'pointer', color: '#000'}} onClick={() => navigate(`/teacher/class/${classId}/members`)}>Thành viên</span>
              <span className="teacher-member-detail-breadcrumb-sep">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 7l5 5-5 5z" fill="currentColor"/>
                </svg>
              </span>
              <b>{member.name}</b>
            </div>
            <div className="teacher-member-detail-dropdown-wrapper">
              <div 
                className="teacher-member-detail-dropdown-btn"
                onClick={() => setIsMemberDropdownOpen(!isMemberDropdownOpen)}
              >
                <div className="teacher-member-detail-dropdown-avatar">
                  {getInitials(member.name)}
                </div>
                <div className="teacher-member-detail-dropdown-name">{member.name}</div>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`teacher-member-detail-dropdown-arrow ${isMemberDropdownOpen ? 'rotated' : ''}`}
                >
                  <path d="m7 10 5 5 5-5z" fill="currentColor"/>
                </svg>
              </div>
              <div className={`teacher-member-detail-dropdown-list ${isMemberDropdownOpen ? 'open' : ''}`}>
                  <div className="teacher-member-detail-dropdown-search-row">
                    <input 
                      className="teacher-member-detail-dropdown-search-input" 
                      placeholder="Tìm thành viên..."
                    />
                    <MdSearch size={18} className="teacher-member-detail-dropdown-search-icon" />
                  </div>
                  {MEMBERS.map((memberItem) => (
                    <div
                      key={memberItem.id}
                      className="teacher-member-detail-dropdown-member-item"
                      onClick={() => {
                        navigate(`/teacher/class/${classId}/members/${memberItem.id}`);
                        setIsMemberDropdownOpen(false);
                      }}
                    >
                      <div className="teacher-member-detail-dropdown-avatar">
                        {getInitials(memberItem.name)}
                      </div>
                      <div className="teacher-member-detail-dropdown-name">{memberItem.name}</div>
                    </div>
                  ))}
                </div>
            </div>
          </div>
          <div className="teacher-member-detail-body">
            <div className="teacher-member-detail-info-col">
              <div className="teacher-member-detail-info-card teacher-member-detail-main-card">
                <div className="teacher-member-detail-student-badge">Chỉ số học sinh</div>
                <div className="teacher-member-detail-avatar-circle">{member.initials}</div>
                <div className="teacher-member-detail-name">{member.name}</div>
                <div className="teacher-member-detail-average">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:6,verticalAlign:'middle'}}>
                    <path d="M9 17H5V21H9V17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 3H9V21H13V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 7H15V21H19V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Điểm trung bình <b style={{float:'right'}}>{member.averageScore}</b>
                </div>
              </div>
              <div className="teacher-member-detail-info-card teacher-member-detail-unified-card">
                <div className="teacher-member-detail-unified-header">
                  <div className="teacher-member-detail-unified-title">Thông tin & Thống kê</div>
                </div>
                
                <div className="teacher-member-detail-unified-content">
                  <div className="teacher-member-detail-unified-section">
                    <div className="teacher-member-detail-unified-section-title">Hành động</div>
                    <div className="teacher-member-detail-unified-actions">
                      <div className="teacher-member-detail-unified-action">
                        <MdOutlineVisibilityOff size={16} className="teacher-member-detail-unified-action-icon" />
                        <div className="teacher-member-detail-unified-action-text">Chia sẻ điểm bài tập : Chỉ mình tôi</div>
                      </div>
                      <div className="teacher-member-detail-unified-action">
                        <MdDeleteOutline size={16} className="teacher-member-detail-unified-action-icon" />
                        <div className="teacher-member-detail-unified-action-text">Xoá khỏi lớp</div>
                      </div>
                    </div>
                  </div>

                  <div className="teacher-member-detail-unified-section">
                    <div className="teacher-member-detail-unified-section-title">Thống kê học tập</div>
                    <div className="teacher-member-detail-unified-stats">
                      <div className="teacher-member-detail-unified-stat">
                        <div className="teacher-member-detail-unified-stat-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="10" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="teacher-member-detail-unified-stat-content">
                          <div className="teacher-member-detail-unified-stat-label">Số lần làm bài</div>
                          <div className="teacher-member-detail-unified-stat-value">16</div>
                        </div>
                      </div>
                      <div className="teacher-member-detail-unified-stat">
                        <div className="teacher-member-detail-unified-stat-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                        <div className="teacher-member-detail-unified-stat-content">
                          <div className="teacher-member-detail-unified-stat-label">Bài đã hoàn thành</div>
                          <div className="teacher-member-detail-unified-stat-value">1/2</div>
                        </div>
                      </div>
                      <div className="teacher-member-detail-unified-stat">
                        <div className="teacher-member-detail-unified-stat-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="teacher-member-detail-unified-stat-content">
                          <div className="teacher-member-detail-unified-stat-label">Ngày tham gia</div>
                          <div className="teacher-member-detail-unified-stat-value">10/07</div>
                        </div>
                      </div>
                      <div className="teacher-member-detail-unified-stat">
                        <div className="teacher-member-detail-unified-stat-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="teacher-member-detail-unified-stat-content">
                          <div className="teacher-member-detail-unified-stat-label">Điểm cao nhất</div>
                          <div className="teacher-member-detail-unified-stat-value">1.0</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="teacher-member-detail-assignments-col">
              <div className="teacher-member-detail-assignments-header-row">
                <div className="teacher-member-detail-assignments-title">Điểm bài tập</div>
                <div className="teacher-member-detail-assignments-filter-row">
                  <div className="teacher-member-detail-dropdown-container">
                    <div 
                      className="teacher-member-detail-dropdown-button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span>{filterOptions.find(opt => opt.value === selectedFilter)?.label}</span>
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className={`teacher-member-detail-dropdown-arrow ${isDropdownOpen ? 'rotated' : ''}`}
                      >
                        <path d="m7 10 5 5 5-5z" fill="currentColor"/>
                      </svg>
                    </div>
                    {isDropdownOpen && (
                      <div className="teacher-member-detail-dropdown-menu">
                        {filterOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`teacher-member-detail-dropdown-item ${selectedFilter === option.value ? 'selected' : ''}`}
                            onClick={() => {
                              setSelectedFilter(option.value);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {option.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="teacher-member-detail-assignments-search-wrapper">
                    <input className="teacher-member-detail-assignments-search" placeholder="Tìm bài tập ..." />
                    <MdSearch size={20} className="teacher-member-detail-assignments-search-icon" />
                  </div>
                </div>
              </div>
              <div className="teacher-member-detail-assignments-table-wrapper">
                <table className="teacher-member-detail-assignments-table">
                <thead>
                  <tr>
                    <th className="teacher-member-detail-th-title">
                      Tên bài tập
                    </th>
                    <th className="teacher-member-detail-th-date">
                      Ngày tạo
                    </th>
                    <th className="teacher-member-detail-th-member-score">
                      Điểm
                    </th>
                    <th className="teacher-member-detail-th-action">
                      <span className="teacher-member-detail-action-header-text"></span>
                    </th>
                  </tr>
                </thead>
                </table>
                <div className="teacher-member-detail-table-body-scroll">
                  <table className="teacher-member-detail-assignments-table">
                  <tbody>
                    {member.assignments.map((a, idx) => (
                      <tr key={idx}>
                        <td className="teacher-member-detail-assignment-title-cell">
                          <div className="teacher-member-detail-assignment-row">
                            <span className="teacher-member-detail-assignment-type-icon">W</span>
                            <div className="teacher-member-detail-assignment-title-group">
                              <div className="teacher-member-detail-assignment-type-label">Trắc nghiệm{idx === 1 ? " tách câu" : ""}</div>
                              <div className="teacher-member-detail-assignment-title-main">{a.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="teacher-member-detail-date-cell">{a.createdAt}</td>
                        <td className="teacher-member-detail-member-score-cell">
                          <span className="teacher-member-detail-member-score-value">{a.score !== null ? a.score : "-"}</span>
                        </td>
                        <td className="teacher-member-detail-action-cell">
                          {a.status === "Chưa làm" ? (
                            <span className="teacher-member-detail-assignment-status">Chưa làm</span>
                          ) : (
                            <button className="teacher-member-detail-btn-detail" onClick={() => navigate(`/teacher/class/${classId}/members/${memberId}/score-detail`)}>Chi tiết</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherMemberDetailPage; 