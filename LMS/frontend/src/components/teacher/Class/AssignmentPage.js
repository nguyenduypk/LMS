import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header';
import CreateAssignmentModal from './CreateAssignmentModal';
import './AssignmentPage.css';
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
  MdShare,
  MdExpandMore,
  MdDelete,
  MdMouse,
  MdCreate
} from 'react-icons/md';
import TeacherSidebar from './TeacherSidebar';

function AssignmentPage() {
  const [selectedAssignment, setSelectedAssignment] = useState('Mẫuonaldo');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [sortBy, setSortBy] = useState('newest');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [activeAction, setActiveAction] = useState('details'); // 'details', 'edit', 'delete'
  const { classId } = useParams();
  const navigate = useNavigate();

  // Action handlers
  const handleViewDetails = () => {
    setActiveAction('details');
    console.log('Xem chi tiết bài tập:', selectedAssignment);
    // Navigate to assignment detail page
    navigate(`/teacher/class/${classId}/assignment/${selectedAssignmentData.id}`);
  };

  const handleEditAssignment = () => {
    setActiveAction('edit');
    console.log('Chỉnh sửa bài tập:', selectedAssignment);
    // TODO: Implement edit assignment logic
  };

  const handleDeleteAssignment = () => {
    setActiveAction('delete');
    console.log('Xóa bài tập:', selectedAssignment);
    // TODO: Implement delete assignment logic
  };

  const assignments = [
    {
      id: 1,
      title: 'Mẫuonaldo',
      type: 'Trắc nghiệm',
      progress: '1/2 đã làm',
      completed: 1,
      total: 2,
      icon: 'W',
      attempts: 16,
      scoreType: 'Cao nhất',
      creationDate: '10 tháng 07',
      startTime: 'Không',
      duration: 'Không',
      completedBy: 2,
      allowedActions: 'Xem điểm và đáp án, lời giải',
      deadline: 'Không',
      shareUrl: 'https://shub.edu.vn/shared/hom...'
    },
    {
      id: 2,
      title: 'Toán lớp 1',
      type: 'Trắc nghiệm tách câu',
      progress: '2/2 đã làm',
      completed: 2,
      total: 2,
      icon: 'W',
      attempts: 8,
      scoreType: 'Trung bình',
      creationDate: '05 tháng 07',
      startTime: 'Không',
      duration: 'Không',
      completedBy: 2,
      allowedActions: 'Xem điểm và đáp án, lời giải',
      deadline: 'Không',
      shareUrl: 'https://shub.edu.vn/shared/math...'
    }
  ];

  const selectedAssignmentData = assignments.find(a => a.title === selectedAssignment);



  return (
    <div className="teacher-assignment-page">
      <Header />
      <div className="teacher-assignment-page__content">
        <TeacherSidebar />
        
        {/* Header "Bài tập" */}
        <div className="teacher-assignment-page__header">
          <h1 className="teacher-assignment-page__title">Bài tập</h1>
        </div>

        {/* Main Content Area */}
        <div className="teacher-assignment-page__main">
          {/* Left Sidebar - Folder Navigation */}
          <div className="teacher-assignment-page__folder-sidebar">
            <div className="teacher-assignment-folder-sidebar__header">
                              <div className="teacher-assignment-folder-sidebar__title">
                  <span>Thư mục</span>
                  <div className="teacher-assignment-folder-sidebar__add-icon">
                    <MdAdd size={20} />
                    <MdFolder size={24} />
                  </div>
                </div>
            </div>
            
            <div className="teacher-assignment-folder-sidebar__content">
              <div className="teacher-assignment-folder-item teacher-assignment-folder-item--active">
                <div className="teacher-assignment-folder-item__icon">
                  <MdFolder size={20} />
                </div>
                <span className="teacher-assignment-folder-item__text">Tất cả bài tập</span>
              </div>
            </div>
          </div>

          {/* Main Content - Toolbar + Assignment List */}
          <div className="teacher-assignment-page__main-content">
            {/* Toolbar */}
            <div className="teacher-assignment-page__toolbar">
              <div className="teacher-assignment-toolbar__view-toggle">
                <button 
                  className={`teacher-assignment-view-toggle__btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('list');
                    setIsSelectionMode(false);
                    setSelectedItems([]);
                  }}
                >
                  ☰
                </button>
                <button 
                  className={`teacher-assignment-view-toggle__btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('grid');
                    setIsSelectionMode(true);
                  }}
                >
                  ☰✓
                </button>
              </div>

              <div className="teacher-assignment-toolbar__search">
                <MdSearch size={20} />
                <input type="text" placeholder="Tìm kiếm..." />
              </div>
              
              <div className="teacher-assignment-toolbar__sort-container">
                <div 
                  className="teacher-assignment-toolbar__sort-button"
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                >
                  <span>{sortBy === 'newest' ? 'Mới nhất' : sortBy === 'oldest' ? 'Cũ nhất' : 'Tên'}</span>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`teacher-assignment-toolbar__sort-arrow ${isSortDropdownOpen ? 'rotated' : ''}`}
                  >
                    <path d="m7 10 5 5 5-5z" fill="currentColor"/>
                  </svg>
                </div>
                {isSortDropdownOpen && (
                  <div className="teacher-assignment-toolbar__sort-menu">
                    <div 
                      className={`teacher-assignment-toolbar__sort-item ${sortBy === 'newest' ? 'selected' : ''}`}
                      onClick={() => {
                        setSortBy('newest');
                        setIsSortDropdownOpen(false);
                      }}
                    >
                      Mới nhất
                    </div>
                    <div 
                      className={`teacher-assignment-toolbar__sort-item ${sortBy === 'oldest' ? 'selected' : ''}`}
                      onClick={() => {
                        setSortBy('oldest');
                        setIsSortDropdownOpen(false);
                      }}
                    >
                      Cũ nhất
                    </div>
                    <div 
                      className={`teacher-assignment-toolbar__sort-item ${sortBy === 'name' ? 'selected' : ''}`}
                      onClick={() => {
                        setSortBy('name');
                        setIsSortDropdownOpen(false);
                      }}
                    >
                      Tên
                    </div>
                  </div>
                )}
              </div>
              
              <button className="teacher-assignment-toolbar__create-btn" onClick={() => setIsCreateModalOpen(true)}>
                <MdAdd size={20} />
                Tạo bài tập
              </button>
            </div>

            {/* Selection Bar */}
            {isSelectionMode && (
              <div className="teacher-assignment-page__selection-bar">
                <div className="teacher-assignment-selection-bar__left">
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
                    Đang chọn <span className="teacher-assignment-selection-count">{selectedItems.length} bài tập</span>
                  </span>
                </div>
                <div className="teacher-assignment-selection-bar__right">
                  <button className="teacher-assignment-selection-action-btn">
                    <MdFolder size={16} />
                    Di chuyển
                  </button>
                  <button className="teacher-assignment-selection-action-btn">
                    <MdDelete size={16} />
                    Xoá
                  </button>
                </div>
              </div>
            )}

            {/* Assignment List */}
            <div className="teacher-assignment-page__list-container">
              <div className="teacher-assignment-list">
                {assignments.map((assignment) => (
                  <div 
                    key={assignment.id}
                    className={`teacher-assignment-item ${selectedAssignment === assignment.title ? 'selected' : ''} ${isSelectionMode ? 'selection-mode' : ''}`}
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
                        className="teacher-assignment-checkbox"
                      />
                    )}
                    <div className="teacher-assignment-item__icon">
                      {assignment.icon}
                    </div>
                    <div className="teacher-assignment-item__content">
                      <div className="teacher-assignment-item__title">{assignment.title}</div>
                      <div className="teacher-assignment-item__type">{assignment.type}</div>
                      <div className="teacher-assignment-item__progress">
                        <div className="teacher-assignment-progress-bar">
                          <div 
                            className="teacher-assignment-progress-bar__fill" 
                            style={{width: `${(assignment.completed / assignment.total) * 100}%`}}
                          ></div>
                        </div>
                        <span className="teacher-assignment-progress-text">{assignment.progress}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Assignment Details */}
          {selectedAssignmentData && (
            <div className="teacher-assignment-page__details-sidebar">
              {/* File Name Section */}
              <div className="teacher-assignment-details__header">
                <h2 className="teacher-assignment-details__title">{selectedAssignmentData.title}</h2>
              </div>

              {/* Combined Scrollable Content */}
              <div className="teacher-assignment-details__scrollable-content">
                {/* Sharing Section */}
                <div className="teacher-assignment-details__sharing">
                  <div className="teacher-assignment-sharing__header">
                    <h3 className="teacher-assignment-sharing__title">Chia sẻ bài tập</h3>
                    <div className="teacher-assignment-sharing__badge">
                      <span className="teacher-assignment-sharing__badge-text">Mới</span>
                      <span className="teacher-assignment-sharing__badge-sparkle">✨</span>
                      <span className="teacher-assignment-sharing__badge-sparkle">✨</span>
                    </div>
                  </div>

                  <div className="teacher-assignment-sharing__platforms">
                    <span className="teacher-assignment-sharing__label">Chia sẻ lên</span>
                                          <div className="teacher-assignment-sharing__icons">
                        <button className="teacher-assignment-sharing__icon teacher-assignment-sharing__icon--facebook" title="Chia sẻ lên Facebook">
                          <img src="/img/facebook.webp" style={{width: '20px', height: '20px'}} alt="Facebook" />
                        </button>
                        <button className="teacher-assignment-sharing__icon teacher-assignment-sharing__icon--messenger" title="Chia sẻ lên Messenger">
                          <img src="/img/mes.webp" style={{width: '20px', height: '20px'}} alt="Messenger" />
                        </button>
                        <button className="teacher-assignment-sharing__icon teacher-assignment-sharing__icon--zalo" title="Chia sẻ lên Zalo">
                          <img src="/img/zalo.webp" style={{width: '20px', height: '20px'}} alt="Zalo" />
                        </button>
                      </div>
                  </div>
                </div>

                {/* Assignment Details */}
                <div className="teacher-assignment-details__info">
                  <div className="teacher-assignment-info__item">
                    <span className="teacher-assignment-info__label">Số lần làm bài</span>
                    <span className="teacher-assignment-info__value">{selectedAssignmentData.attempts}</span>
                  </div>
                  <div className="teacher-assignment-info__item">
                    <span className="teacher-assignment-info__label">Lấy điểm</span>
                    <span className="teacher-assignment-info__value">{selectedAssignmentData.scoreType}</span>
                  </div>
                  <div className="teacher-assignment-info__item">
                    <span className="teacher-assignment-info__label">Loại</span>
                    <span className="teacher-assignment-info__value">{selectedAssignmentData.type}</span>
                  </div>
                  <div className="teacher-assignment-info__item">
                    <span className="teacher-assignment-info__label">Ngày tạo</span>
                    <span className="teacher-assignment-info__value">{selectedAssignmentData.creationDate}</span>
                  </div>
                  <div className="teacher-assignment-info__item">
                    <span className="teacher-assignment-info__label">Bắt đầu</span>
                    <span className="teacher-assignment-info__value">{selectedAssignmentData.startTime}</span>
                  </div>
                  <div className="teacher-assignment-info__item">
                    <span className="teacher-assignment-info__label">Thời lượng</span>
                    <span className="teacher-assignment-info__value">{selectedAssignmentData.duration}</span>
                  </div>
                  <div className="teacher-assignment-info__item">
                    <span className="teacher-assignment-info__label">Đã làm</span>
                    <span className="teacher-assignment-info__value">{selectedAssignmentData.completedBy}</span>
                  </div>
                  <div className="teacher-assignment-info__item">
                    <span className="teacher-assignment-info__label">Cho phép</span>
                    <span className="teacher-assignment-info__value">{selectedAssignmentData.allowedActions}</span>
                  </div>
                  <div className="teacher-assignment-info__item">
                    <span className="teacher-assignment-info__label">Hạn chót</span>
                    <span className="teacher-assignment-info__value">{selectedAssignmentData.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Action Menu */}
              <div className="teacher-assignment-details__actions">
                <button 
                  className={`teacher-assignment-action__item ${activeAction === 'details' ? 'teacher-assignment-action__item--active' : ''}`}
                  onClick={handleViewDetails}
                >
                  <span>Chi tiết</span>
                  <MdVisibility size={16} />
                </button>
                <button 
                  className={`teacher-assignment-action__item teacher-assignment-action__item--edit ${activeAction === 'edit' ? 'teacher-assignment-action__item--active' : ''}`}
                  onClick={handleEditAssignment}
                >
                  <span>Chỉnh sửa</span>
                  <MdEdit size={16} />
                </button>
                <button 
                  className={`teacher-assignment-action__item teacher-assignment-action__item--delete ${activeAction === 'delete' ? 'teacher-assignment-action__item--active' : ''}`}
                  onClick={handleDeleteAssignment}
                >
                  <span>Xóa</span>
                  <MdDelete size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Create Assignment Modal */}
      <CreateAssignmentModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        classId={classId}
      />
    </div>
  );
}

export default AssignmentPage;
