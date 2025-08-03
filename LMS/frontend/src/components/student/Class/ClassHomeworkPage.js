import React, { useState } from 'react';
import DashboardHeader from '../DashboardHeader';
import ClassSidebar from './ClassSidebar';
import '../../../styles/ClassHomeworkPage.css';
import { 
  MdFolder, 
  MdAdd, 
  MdViewList, 
  MdViewModule, 
  MdSearch, 
  MdContentCopy,
  MdVisibility,
  MdEdit,
  MdMoreVert,
  MdComputer,
  MdShare,
  MdExpandMore,
  MdDownload,
  MdDelete
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function AssignmentPage() {
  const [selectedAssignment, setSelectedAssignment] = useState('Mẫuonaldo');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [sortBy, setSortBy] = useState('newest');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Mock class info data
  const classInfo = {
    name: '1234Absdth',
    code: 'OURLC',
    teacher: 'Nguyễn Duy'
  };

  const assignments = [
    {
      id: 1,
      title: 'Mẫuonaldo',
      type: 'Trắc nghiệm',
      progress: '1/2 đã làm',
      completed: 1,
      total: 2,
      icon: 'W'
    },
    {
      id: 2,
      title: 'Toán lớp 1',
      type: 'Trắc nghiệm tách câu',
      progress: '2/2 đã làm',
      completed: 2,
      total: 2,
      icon: 'W'
    }
  ];

  const selectedAssignmentData = assignments.find(a => a.title === selectedAssignment);
  const navigate = useNavigate();

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setIsSortDropdownOpen(false);
  };

  const handleSortClick = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  return (
    <div className="assignment-page">
      <DashboardHeader />
      <div className="assignment-page__content">
        <ClassSidebar classInfo={classInfo} />
        
        {/* Header "Bài tập" */}
        <div className="assignment-page__header">
          <h1 className="assignment-page__title">Bài tập</h1>
        </div>

        {/* Main Content Area */}
        <div className="assignment-page__main">
          {/* Left Sidebar - Folder Navigation */}
          <div className="assignment-page__folder-sidebar">
            <div className="folder-sidebar__header">
              <div className="folder-sidebar__title">
                <span>Thư mục</span>
              </div>
            </div>
            
            <div className="folder-sidebar__content">
              <div className="folder-item folder-item--active">
                <div className="folder-item__icon">
                  <MdFolder size={20} />
                </div>
                <span className="folder-item__text">Tất cả bài tập</span>
              </div>
            </div>
          </div>

          {/* Main Content - Toolbar + Assignment List */}
          <div className="assignment-page__main-content">
            {/* Toolbar */}
            <div className="assignment-page__toolbar">
              <div className="toolbar__search">
                <MdSearch size={20} />
                <input type="text" placeholder="Tìm kiếm..." />
              </div>
              
              <select 
                className={`toolbar__sort ${isSortDropdownOpen ? 'toolbar__sort--open' : ''}`}
                value={sortBy}
                onChange={handleSortChange}
                onMouseDown={handleSortClick}
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="name">Tên</option>
              </select>
            </div>

            {/* Selection Bar */}
            {isSelectionMode && (
              <div className="assignment-page__selection-bar">
                <div className="selection-bar__left">
                  <input 
                    type="checkbox" 
                    checked={selectedItems.length === assignments.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(assignments.map(a => a.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                  />
                  <span>
                    Đang chọn <span className="selection-count">{selectedItems.length} bài tập</span>
                  </span>
                </div>
                <div className="selection-bar__right">
                  <button className="selection-action-btn">
                    <MdFolder size={16} />
                    Di chuyển
                  </button>
                  <button className="selection-action-btn">
                    <MdDelete size={16} />
                    Xoá
                  </button>
                </div>
              </div>
            )}

            {/* Assignment List */}
            <div className="assignment-page__list-container">
              <div className="assignment-list">
                {assignments.map((assignment) => (
                  <div 
                    key={assignment.id}
                    className={`assignment-item ${selectedAssignment === assignment.title ? 'selected' : ''} ${isSelectionMode ? 'selection-mode' : ''}`}
                    onClick={() => {
                      if (isSelectionMode) {
                        if (selectedItems.includes(assignment.id)) {
                          setSelectedItems(selectedItems.filter(id => id !== assignment.id));
                        } else {
                          setSelectedItems([...selectedItems, assignment.id]);
                        }
                      } else {
                        setSelectedAssignment(assignment.title);
                      }
                    }}
                  >
                    {isSelectionMode && (
                      <input 
                        type="checkbox" 
                        checked={selectedItems.includes(assignment.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, assignment.id]);
                          } else {
                            setSelectedItems(selectedItems.filter(id => id !== assignment.id));
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="assignment-checkbox"
                      />
                    )}
                    <div className="assignment-item__icon">
                      {assignment.icon}
                    </div>
                    <div className="assignment-item__content">
                      <div className="assignment-item__title">{assignment.title}</div>
                      <div className="assignment-item__type">{assignment.type}</div>
                      <div className="assignment-item__progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-bar__fill" 
                            style={{width: `${(assignment.completed / assignment.total) * 100}%`}}
                          ></div>
                        </div>
                        <span className="progress-text">
                          {assignment.score !== undefined ? `${assignment.score.toFixed(1)}/10 điểm` : `0.0/10 điểm`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assignment Details Section */}
          {selectedAssignmentData && (
            <div className="assignment-page__details-section">
              <div className="assignment-details">
                {/* Header with Status */}
                <div className="assignment-details__header">
                  <span className="assignment-status">0 điểm</span>
                </div>
                
                {/* Assignment Information */}
                <div className="assignment-details__section">
                  <h3 className="assignment-details__title">MẫuRonaldo</h3>
                  <div className="assignment-info">
                    <div className="info-item">
                      <span className="info-label">Số lần làm bài</span>
                      <span className="info-value">16</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Đã làm</span>
                      <span className="info-value">1 / 16</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Lấy điểm</span>
                      <span className="info-value">Cao nhất</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Loại</span>
                      <span className="info-value">Trắc nghiệm</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Ngày tạo</span>
                      <span className="info-value">10 tháng 07</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Bắt đầu</span>
                      <span className="info-value">Không</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Thời lượng</span>
                      <span className="info-value">Không</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Cho phép</span>
                      <span className="info-value">Xem điểm và đáp án, lời giải</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Hạn chót</span>
                      <span className="info-value">Không</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="assignment-details__actions-container">
                  <div className="assignment-details__actions">
                    <button className="assignment-action-btn assignment-action-btn--primary"
                      onClick={() => navigate(`/class/${classInfo.code}/homework/${selectedAssignmentData.id}/quiz2`)}
                    >
                      <span>Làm lại lần 2</span>
                      <span>→</span>
                    </button>
                    <button className="assignment-action-btn assignment-action-btn--secondary"
                      onClick={() => navigate(`/class/${classInfo.code}/homework/result`)}
                    >
                      <span>Chi tiết</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssignmentPage;
