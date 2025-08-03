import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header';
import TeacherSidebar from './TeacherSidebar';
import './AssignmentDetailPage.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { 
  MdSearch, 
  MdPrint,
  MdRefresh,
  MdExpandMore,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdArrowForward
} from 'react-icons/md';

function AssignmentDetailPage() {
  const { classId, assignmentId } = useParams();
  const navigate = useNavigate();
  
  // States
  const [filter, setFilter] = useState('submitted'); // 'all', 'notDone', 'submitted'
  const [sortBy, setSortBy] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('grades'); // 'grades', 'overview', 'questionStats', 'assignment', 'solution'

  // Mock data
  const assignmentData = {
    id: assignmentId,
    title: 'Mẫuonaldo',
    type: 'Trắc nghiệm',
    totalQuestions: 16,
    maxScore: 10
  };

  const students = [
    {
      id: 1,
      name: 'Nguyễn Duy',
      initials: 'ND',
      completed: 8,
      total: 16,
      score: 4.00,
      duration: '4m',
      submissionDate: '21 tháng 7 lúc 14:13',
      leaveCount: '--',
      status: 'submitted'
    },
    {
      id: 2,
      name: 'Nguyễn Khánh Dương Duy',
      initials: 'DD',
      completed: 2,
      total: 16,
      score: 0.00,
      duration: '19m',
      submissionDate: '10 tháng 7 lúc 16:56',
      leaveCount: '--',
      status: 'submitted'
    },
    {
      id: 3,
      name: 'Trần Thị Mai',
      initials: 'TM',
      completed: 12,
      total: 16,
      score: 7.50,
      duration: '12m',
      submissionDate: '20 tháng 7 lúc 10:30',
      leaveCount: '1',
      status: 'submitted'
    },
    {
      id: 4,
      name: 'Lê Văn An',
      initials: 'LA',
      completed: 0,
      total: 16,
      score: 0.00,
      duration: '0m',
      submissionDate: '--',
      leaveCount: '--',
      status: 'notDone'
    },
    {
      id: 5,
      name: 'Phạm Thị Hoa',
      initials: 'PH',
      completed: 6,
      total: 16,
      score: 3.20,
      duration: '25m',
      submissionDate: '19 tháng 7 lúc 15:45',
      leaveCount: '3',
      status: 'inProgress'
    }
  ];

  // Filter and search logic
  const filteredStudents = students.filter(student => {
    const matchesFilter = filter === 'all' || student.status === filter;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sorting logic
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'score':
        comparison = a.score - b.score;
        break;
      case 'duration':
        comparison = parseInt(a.duration) - parseInt(b.duration);
        break;
      case 'submissionDate':
        comparison = new Date(a.submissionDate) - new Date(b.submissionDate);
        break;
      default:
        comparison = 0;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Handlers
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === sortedStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(sortedStudents.map(s => s.id));
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleViewDetails = (studentId) => {
    navigate(`/teacher/class/${classId}/assignment/${assignmentId}/student/${studentId}`);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[words.length - 2][0] + words[words.length - 1][0]).toUpperCase();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'grades':
        return (
          <>
            {/* Toolbar */}
            <div className="teacher-assignment-detail-page__toolbar">
              <div className="teacher-assignment-detail-page__filters">
                <button 
                  className={`teacher-assignment-detail-page__filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  Tất cả
                </button>
                <button 
                  className={`teacher-assignment-detail-page__filter-btn ${filter === 'notDone' ? 'active' : ''}`}
                  onClick={() => setFilter('notDone')}
                >
                  Chưa làm
                </button>

                <button 
                  className={`teacher-assignment-detail-page__filter-btn ${filter === 'submitted' ? 'active' : ''}`}
                  onClick={() => setFilter('submitted')}
                >
                  Đã nộp
                </button>
              </div>

              <div className="teacher-assignment-detail-page__search">
                <MdSearch className="teacher-assignment-detail-page__search-icon" />
                <input
                  type="text"
                  placeholder="Nhập để tìm kiếm"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="teacher-assignment-detail-page__search-input"
                />
              </div>

              <button className="teacher-assignment-detail-page__print-btn">
                <MdPrint />
              </button>
            </div>

            {/* Table */}
            <div className="teacher-assignment-detail-page__table-container">
              <table className="teacher-assignment-detail-page__table">
                <thead>
                  <tr>
                    <th>
                      <MdCheckBoxOutlineBlank 
                        className="teacher-assignment-detail-page__select-all"
                        onClick={handleSelectAll}
                      />
                    </th>
                    <th>#</th>
                    <th onClick={() => handleSort('name')} className="teacher-assignment-detail-page__sortable">
                      Họ và tên {getSortIcon('name')}
                    </th>
                    <th>Đã làm</th>
                    <th onClick={() => handleSort('score')} className="teacher-assignment-detail-page__sortable">
                      Điểm {getSortIcon('score')}
                    </th>
                    <th onClick={() => handleSort('duration')} className="teacher-assignment-detail-page__sortable">
                      Thời lượng {getSortIcon('duration')}
                    </th>
                    <th onClick={() => handleSort('submissionDate')} className="teacher-assignment-detail-page__sortable">
                      Ngày nộp {getSortIcon('submissionDate')}
                    </th>
                    <th>Rời khỏi</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td>
                        <MdCheckBoxOutlineBlank 
                          className="teacher-assignment-detail-page__select-checkbox"
                          onClick={() => handleSelectStudent(student.id)}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>
                        <div className="teacher-assignment-detail-page__student-info">
                          <div className="teacher-assignment-detail-page__student-avatar">
                            {student.initials}
                          </div>
                          <span className="teacher-assignment-detail-page__student-name">
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td>{student.completed}/{student.total}</td>
                      <td className="teacher-assignment-detail-page__score">{student.score.toFixed(2)}</td>
                      <td>{student.duration}</td>
                      <td>{student.submissionDate}</td>
                      <td>{student.leaveCount}</td>
                      <td>
                        <div className="teacher-assignment-detail-page__actions">
                          <button 
                            className="teacher-assignment-detail-page__refresh-btn"
                            title="Đặt lại kết quả"
                          >
                            <MdRefresh />
                          </button>
                          <button 
                            className="teacher-assignment-detail-page__details-btn"
                            onClick={() => handleViewDetails(student.id)}
                          >
                            Chi tiết
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );
      case 'overview':
        // Dữ liệu mẫu cho bảng phân bố điểm
        const scoreDistribution = [
          { label: '<=1', count: 1, percent: 50 },
          { label: '<=2', count: 0, percent: 0 },
          { label: '<=3', count: 0, percent: 0 },
          { label: '<=4', count: 1, percent: 50 },
          { label: '<=5', count: 0, percent: 0 },
          { label: '<=6', count: 0, percent: 0 },
          { label: '<=7', count: 0, percent: 0 },
          { label: '<=8', count: 0, percent: 0 },
          { label: '<=9', count: 0, percent: 0 },
          { label: '<=10', count: 0, percent: 0 },
        ];
        const totalStudents = 2;
        const doneStudents = 2;
        return (
          <div className="teacher-assignment-detail-page__overview">
            <h3>Bảng phân bố điểm</h3>
            <div className="score-distribution-table-container">
              <table className="score-distribution-table">
                <thead>
                  <tr>
                    <th rowSpan="2">Số học sinh</th>
                    <th rowSpan="2">Đã làm</th>
                    {scoreDistribution.map((item, idx) => (
                      <th key={item.label} colSpan="2">{item.label}</th>
                    ))}
                  </tr>
                  <tr>
                    {scoreDistribution.map((item, idx) => (
                      <>
                        <th key={`sl-${item.label}`}>SL</th>
                        <th key={`pct-${item.label}`}>%</th>
                      </>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{totalStudents}</td>
                    <td>{doneStudents}</td>
                    {scoreDistribution.map((item, idx) => (
                      <>
                        <td key={`val-${item.label}`}>{item.count}</td>
                        <td key={`valpct-${item.label}`}>{item.percent}</td>
                      </>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="score-distribution-chart-container">
              <h4 className="score-distribution-chart-title">Biểu đồ phân bố điểm</h4>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={scoreDistribution} margin={{ top: 16, right: 24, left: 8, bottom: 24 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" tick={{ fontSize: 13 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 13 }} />
                  <Tooltip formatter={(value) => `${value} học sinh`} />
                  <Legend />
                  <Bar dataKey="count" name="Số lượng học sinh" fill="#2196f3" radius={[6, 6, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case 'assignment':
        return (
                    <div className="teacher-assignment-detail-page__assignment" style={{ 
            position: 'relative', 
            boxShadow: '0 2px 16px rgba(30,136,229,0.10)', 
            background: '#fff', 
            padding: 0, 
            width: '100%', 
            height: '100%', 
            maxWidth: '100%', 
            minHeight: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            margin: 0, 
            borderRadius: 0 
          }}>


            <div style={{ 
              position: 'relative', 
              flex: '1 1 0%',
              height: 'calc(100vh - 180px)',
              overflow: 'hidden',
              padding: '4px'
            }}>
              <div style={{ 
                height: '100%', 
                width: '100%', 
                overflow: 'hidden' 
              }}>
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  justifyContent: 'center', 
                  flexDirection: 'column', 
                  position: 'relative' 
                }}>
                  <iframe 
                    src="https://view.officeapps.live.com/op/embed.aspx?src=https%3A%2F%2Fshub-storage.shub.edu.vn%2Ftests%2F3303522%2Ffile_url%2F1752742804570_De_trac_nghiem_Toan_Lop_1.docx"
                    style={{ 
                      display: 'block', 
                      height: '100%', 
                      width: '100%',
                      border: 'none',
                      maxHeight: 'calc(100vh - 200px)'
                    }}
                    title="Đề bài"
                  />

                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="teacher-assignment-detail-page">
      <Header />
      <div className="teacher-assignment-detail-page__content">
        <TeacherSidebar />
        
        {/* Main Content Area */}
        <div className="teacher-assignment-detail-page__main">
          {/* Header Content */}
          <div className="teacher-assignment-detail-page__header">
            <div className="teacher-assignment-detail-page__header-content">
              {/* Breadcrumb */}
              <div className="teacher-assignment-detail-page__breadcrumb">
                <span 
                  className="teacher-assignment-detail-page__breadcrumb-item"
                  onClick={() => navigate(`/teacher/class/${classId}/assignments`)}
                  style={{ cursor: 'pointer' }}
                >
                  Bài tập
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="score-detail-breadcrumb-separator"
                >
                  <path d="M10 7l5 5-5 5z" fill="currentColor"/>
                </svg>
                <span className="teacher-assignment-detail-page__breadcrumb-item active">{assignmentData.title}</span>
              </div>

              {/* Tabs Navigation */}
              <div className="teacher-assignment-detail-page__tabs">
                <button 
                  className={`teacher-assignment-page__filter-btn${activeTab === 'grades' ? ' active' : ''}`}
                  onClick={() => setActiveTab('grades')}
                >
                  Bảng điểm
                </button>
                <button 
                  className={`teacher-assignment-page__filter-btn${activeTab === 'overview' ? ' active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Tổng quan
                </button>
                <button 
                  className={`teacher-assignment-page__filter-btn${activeTab === 'assignment' ? ' active' : ''}`}
                  onClick={() => setActiveTab('assignment')}
                >
                  Đề bài
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default AssignmentDetailPage; 