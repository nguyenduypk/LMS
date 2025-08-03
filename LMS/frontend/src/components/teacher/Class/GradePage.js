import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import TeacherSidebar from './TeacherSidebar';
import './GradePage.css';

// Mock data - Updated to have 6 assignments per student
const STUDENTS = [
  {
    id: 1,
    name: 'Nguyễn Khánh Dương Duy',
    avatar: null,
    averageScore: 0.5,
    assignments: [
      { id: 1, name: 'Bài tập 1', score: 0, maxScore: 10, date: '15/03/2024', type: 'assignment' },
      { id: 2, name: 'Bài kiểm tra 1', score: 1, maxScore: 10, date: '20/03/2024', type: 'test' },
      { id: 3, name: 'Bài tập 2', score: 2, maxScore: 10, date: '22/03/2024', type: 'assignment' },
      { id: 4, name: 'Bài tập 3', score: 3, maxScore: 10, date: '25/03/2024', type: 'assignment' },
      { id: 5, name: 'Bài kiểm tra 2', score: 4, maxScore: 10, date: '27/03/2024', type: 'test' },
      { id: 6, name: 'Bài tập 4', score: 5, maxScore: 10, date: '29/03/2024', type: 'assignment' },
      { id: 7, name: 'Bài tập 5', score: 6, maxScore: 10, date: '30/03/2024', type: 'assignment' }
    ]
  },
  {
    id: 2,
    name: 'Nguyễn Duy',
    avatar: null,
    averageScore: 2.5,
    assignments: [
      { id: 1, name: 'Bài tập 1', score: 4, maxScore: 10, date: '15/03/2024', type: 'assignment' },
      { id: 2, name: 'Bài kiểm tra 1', score: 1, maxScore: 10, date: '20/03/2024', type: 'test' },
      { id: 3, name: 'Bài tập 2', score: 5, maxScore: 10, date: '22/03/2024', type: 'assignment' },
      { id: 4, name: 'Bài tập 3', score: 2, maxScore: 10, date: '25/03/2024', type: 'assignment' },
      { id: 5, name: 'Bài kiểm tra 2', score: 6, maxScore: 10, date: '27/03/2024', type: 'test' },
      { id: 6, name: 'Bài tập 4', score: 3, maxScore: 10, date: '29/03/2024', type: 'assignment' },
      { id: 7, name: 'Bài tập 5', score: 4, maxScore: 10, date: '30/03/2024', type: 'assignment' }
    ]
  },
  {
    id: 3,
    name: 'Trần Thị B',
    avatar: null,
    averageScore: 8.8,
    assignments: [
      { id: 1, name: 'Bài tập 1', score: 8, maxScore: 10, date: '15/03/2024', type: 'assignment' },
      { id: 2, name: 'Bài kiểm tra 1', score: 9, maxScore: 10, date: '20/03/2024', type: 'test' },
      { id: 3, name: 'Bài tập 2', score: 7, maxScore: 10, date: '22/03/2024', type: 'assignment' },
      { id: 4, name: 'Bài tập 3', score: 8, maxScore: 10, date: '25/03/2024', type: 'assignment' },
      { id: 5, name: 'Bài kiểm tra 2', score: 9, maxScore: 10, date: '27/03/2024', type: 'test' },
      { id: 6, name: 'Bài tập 4', score: 8, maxScore: 10, date: '29/03/2024', type: 'assignment' },
      { id: 7, name: 'Bài tập 5', score: 9, maxScore: 10, date: '30/03/2024', type: 'assignment' }
    ]
  },
  {
    id: 4,
    name: 'Lê Văn C',
    avatar: null,
    averageScore: 8.2,
    assignments: [
      { id: 1, name: 'Bài tập 1', score: 8, maxScore: 10, date: '15/03/2024', type: 'assignment' },
      { id: 2, name: 'Bài kiểm tra 1', score: 8, maxScore: 10, date: '20/03/2024', type: 'test' },
      { id: 3, name: 'Bài tập 2', score: 8, maxScore: 10, date: '22/03/2024', type: 'assignment' },
      { id: 4, name: 'Bài tập 3', score: 7, maxScore: 10, date: '25/03/2024', type: 'assignment' },
      { id: 5, name: 'Bài kiểm tra 2', score: 8, maxScore: 10, date: '27/03/2024', type: 'test' },
      { id: 6, name: 'Bài tập 4', score: 7, maxScore: 10, date: '29/03/2024', type: 'assignment' },
      { id: 7, name: 'Bài tập 5', score: 8, maxScore: 10, date: '30/03/2024', type: 'assignment' }
    ]
  },
  {
    id: 5,
    name: 'Phạm Thị D',
    avatar: null,
    averageScore: 7.9,
    assignments: [
      { id: 1, name: 'Bài tập 1', score: 7, maxScore: 10, date: '15/03/2024', type: 'assignment' },
      { id: 2, name: 'Bài kiểm tra 1', score: 8, maxScore: 10, date: '20/03/2024', type: 'test' },
      { id: 3, name: 'Bài tập 2', score: 7, maxScore: 10, date: '22/03/2024', type: 'assignment' },
      { id: 4, name: 'Bài tập 3', score: 6, maxScore: 10, date: '25/03/2024', type: 'assignment' },
      { id: 5, name: 'Bài kiểm tra 2', score: 7, maxScore: 10, date: '27/03/2024', type: 'test' },
      { id: 6, name: 'Bài tập 4', score: 6, maxScore: 10, date: '29/03/2024', type: 'assignment' },
      { id: 7, name: 'Bài tập 5', score: 7, maxScore: 10, date: '30/03/2024', type: 'assignment' }
    ]
  },
  // Thêm 20 học sinh mẫu
  ...Array.from({ length: 20 }, (_, i) => ({
    id: 100 + i,
    name: `Học sinh ${i + 1}`,
    avatar: null,
    averageScore: Math.round(Math.random() * 10 * 10) / 10,
    assignments: [
      { id: 1, name: 'Bài tập 1', score: Math.floor(Math.random() * 10), maxScore: 10, date: '15/03/2024', type: 'assignment' },
      { id: 2, name: 'Bài kiểm tra 1', score: Math.floor(Math.random() * 10), maxScore: 10, date: '20/03/2024', type: 'test' },
      { id: 3, name: 'Bài tập 2', score: Math.floor(Math.random() * 10), maxScore: 10, date: '22/03/2024', type: 'assignment' },
      { id: 4, name: 'Bài tập 3', score: Math.floor(Math.random() * 10), maxScore: 10, date: '25/03/2024', type: 'assignment' },
      { id: 5, name: 'Bài kiểm tra 2', score: Math.floor(Math.random() * 10), maxScore: 10, date: '27/03/2024', type: 'test' },
      { id: 6, name: 'Bài tập 4', score: Math.floor(Math.random() * 10), maxScore: 10, date: '29/03/2024', type: 'assignment' },
      { id: 7, name: 'Bài tập 5', score: Math.floor(Math.random() * 10), maxScore: 10, date: '30/03/2024', type: 'assignment' }
    ]
  }))
];

// Get unique assignments from all students
const getUniqueAssignments = () => {
  const allAssignments = STUDENTS.flatMap(student => student.assignments);
  const uniqueAssignments = [];
  const seen = new Set();
  
  allAssignments.forEach(assignment => {
    if (!seen.has(assignment.id)) {
      seen.add(assignment.id);
      uniqueAssignments.push(assignment);
    }
  });
  
  return uniqueAssignments.sort((a, b) => a.id - b.id);
};

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function GradePage() {
  const navigate = useNavigate();
  const { classId } = useParams();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setQuery(search);
    }
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
    if (sortBy !== field) return '';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const getScoreColor = (score, maxScore) => {
    return '#222'; // Màu đen giống text họ và tên
  };

  const getGradeText = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'Xuất sắc';
    if (percentage >= 80) return 'Tốt';
    if (percentage >= 70) return 'Khá';
    if (percentage >= 50) return 'Trung bình';
    return 'Yếu';
  };

  const classStats = {
    totalStudents: STUDENTS.length,
    averageScore: (STUDENTS.reduce((sum, s) => sum + s.averageScore, 0) / STUDENTS.length).toFixed(1),
    highestScore: Math.max(...STUDENTS.map(s => s.averageScore)),
    lowestScore: Math.min(...STUDENTS.map(s => s.averageScore))
  };

  // Get unique assignments for dynamic columns
  const allAssignments = getUniqueAssignments();
  const uniqueAssignments = filter === 'tests' 
    ? allAssignments.filter(assignment => assignment.type === 'test')
    : allAssignments;

  // Filter and sort students
  let sorted = [...STUDENTS];
  
  if (query) {
    sorted = sorted.filter(student => 
      student.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (filter !== 'all') {
    sorted = sorted.filter(student => {
      switch (filter) {
        case 'tests': return true; // Hiển thị tất cả học sinh khi chọn bài kiểm tra
        default: return true;
      }
    });
  }

  sorted.sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'average':
        aValue = a.averageScore;
        bValue = b.averageScore;
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="teacher-grade-page">
      <Header />
      <div className="teacher-grade-page__content">
        <TeacherSidebar />
        
        {/* Header "Bảng điểm lớp học" */}
        <div className="teacher-grade-page__header">
          <h1 className="teacher-grade-page__title">Bảng điểm lớp học</h1>
        </div>

        {/* Main Content Area */}
        <div className="teacher-grade-page__main">
          {/* Toolbar */}
          <div className="teacher-grade-page__toolbar">
            <div className="teacher-grade-toolbar__search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
              </svg>
              <input 
                type="text" 
                placeholder="Tìm kiếm học sinh..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
              
            <div className="teacher-grade-toolbar__sort-container">
              <div 
                className="teacher-grade-toolbar__sort-button"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              >
                <span>{filter === 'all' ? 'Tất cả bài tập' : 'Bài kiểm tra'}</span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={`teacher-grade-toolbar__sort-arrow ${isSortDropdownOpen ? 'rotated' : ''}`}
                >
                  <path d="m7 10 5 5 5-5z" fill="currentColor"/>
                </svg>
              </div>
              {isSortDropdownOpen && (
                <div className="teacher-grade-toolbar__sort-menu">
                  <div 
                    className={`teacher-grade-toolbar__sort-item ${filter === 'all' ? 'selected' : ''}`}
                    onClick={() => {
                      setFilter('all');
                      setIsSortDropdownOpen(false);
                    }}
                  >
                    Tất cả bài tập
                  </div>
                  <div 
                    className={`teacher-grade-toolbar__sort-item ${filter === 'tests' ? 'selected' : ''}`}
                    onClick={() => {
                      setFilter('tests');
                      setIsSortDropdownOpen(false);
                    }}
                  >
                    Bài kiểm tra
                  </div>

                </div>
              )}
            </div>
              
            <button className="teacher-grade-toolbar__export-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
              </svg>
              Xuất Excel
            </button>
          </div>

          {/* Thống kê tổng quan */}
          <div className="teacher-grade-stats">
            <div className="teacher-grade-stat-card">
              <div className="teacher-grade-stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 9.5V4c0-.55-.45-1-1-1s-1 .45-1 1v5.5l-.99-1.51C10.54 8.37 9.8 8 9 8H7.46c-.8 0-1.54.37-2.01.99L3 14.5V22h2v-6h2.5l2.54-7.63A1.5 1.5 0 0 1 11.54 10H13c.8 0 1.54-.37 2.01-.99L16 7.5V22h2v-6h2z" fill="currentColor"/>
                </svg>
              </div>
              <div className="teacher-grade-stat-content">
                <div className="teacher-grade-stat-value">{classStats.totalStudents}</div>
                <div className="teacher-grade-stat-label">Tổng học sinh</div>
              </div>
            </div>
            <div className="teacher-grade-stat-card">
              <div className="teacher-grade-stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 17H5V21H9V17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 3H9V21H13V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 7H15V21H19V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="teacher-grade-stat-content">
                <div className="teacher-grade-stat-value">{classStats.averageScore}</div>
                <div className="teacher-grade-stat-label">Điểm trung bình</div>
              </div>
            </div>
            <div className="teacher-grade-stat-card">
              <div className="teacher-grade-stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 14l5-5 5 5z" fill="currentColor"/>
                </svg>
              </div>
              <div className="teacher-grade-stat-content">
                <div className="teacher-grade-stat-value">{classStats.highestScore}</div>
                <div className="teacher-grade-stat-label">Điểm cao nhất</div>
              </div>
            </div>
            <div className="teacher-grade-stat-card">
              <div className="teacher-grade-stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                </svg>
              </div>
              <div className="teacher-grade-stat-content">
                <div className="teacher-grade-stat-value">{classStats.lowestScore}</div>
                <div className="teacher-grade-stat-label">Điểm thấp nhất</div>
              </div>
            </div>
          </div>

          {/* Grade Table */}
          <div className="teacher-grade-page__list-container">
            <table className="teacher-grade-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')} style={{cursor: 'pointer'}}>
                    Họ và tên {getSortIcon('name')}
                  </th>
                  <th onClick={() => handleSort('average')} style={{cursor: 'pointer'}}>
                    Trung bình {getSortIcon('average')}
                  </th>
                  {uniqueAssignments.map((assignment) => (
                    <th key={assignment.id} style={{cursor: 'pointer'}}>
                      {assignment.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sorted.map((student, idx) => (
                  <tr key={student.id}>
                    <td>
                      {/* Chỉ hiển thị tên học sinh, không có avatar */}
                      <span className="teacher-grade-student-name">{student.name}</span>
                    </td>
                    <td>
                      <div className="teacher-grade-average-score">
                        <span className="teacher-grade-average-value">{student.averageScore}</span>
                      </div>
                    </td>
                    {uniqueAssignments.map((assignment) => {
                      const studentAssignment = student.assignments.find(a => a.id === assignment.id);
                      return (
                        <td key={assignment.id}>
                          <div className="teacher-grade-score-cell">
                            <span 
                              className="teacher-grade-score-value"
                              style={{color: getScoreColor(studentAssignment?.score || 0, studentAssignment?.maxScore || 10)}}
                            >
                              {studentAssignment?.score || 0}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradePage; 