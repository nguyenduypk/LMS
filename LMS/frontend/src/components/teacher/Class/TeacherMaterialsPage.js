import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import TeacherSidebar from './TeacherSidebar';
import '../../../styles/TeacherMaterialsPage.css';
import { 
  MdFolder, 
  MdAdd, 
  MdSearch, 
  MdShare,
  MdMoreVert,
  MdDelete,
  MdContentCopy,
  MdVisibility,
  MdDownload,
  MdUpload
} from 'react-icons/md';

function TeacherMaterialsPage() {
  const navigate = useNavigate();
  const { classCode } = useParams();
  const [selectedDocument, setSelectedDocument] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [sortBy, setSortBy] = useState('newest');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Mock class info data
  const classInfo = {
    name: '1234Absdth',
    code: classCode || 'OURLC',
    teacher: 'Nguyễn Duy'
  };

  const documents = [
    {
      id: 1,
      title: 'qpan.docx',
      type: 'DOCX',
      size: '2.5 MB',
      progress: '0 đã xem',
      completed: 0,
      total: 0,
      icon: 'W',
      date: '09 tháng 7 lúc 22:36'
    },
    {
      id: 2,
      title: 'bai_giang.pdf',
      type: 'PDF',
      size: '1.8 MB',
      progress: '5 đã xem',
      completed: 5,
      total: 0,
      icon: 'P',
      date: '08 tháng 7 lúc 15:20'
    }
  ];

  const handleMenuToggle = (documentId, event) => {
    event.stopPropagation();
    setOpenMenuId(openMenuId === documentId ? null : documentId);
  };

  const handleMenuAction = (action, document) => {
    console.log(`${action} document:`, document.title);
    setOpenMenuId(null);
    
    if (action === 'view') {
      navigate(`/teacher/class/${classCode}/documents/${document.id}`);
    } else if (action === 'move') {
      // Handle move action
      console.log('Move document:', document.title);
    } else if (action === 'download') {
      // Handle download action
      console.log('Download document:', document.title);
    } else if (action === 'delete') {
      // Handle delete action
      console.log('Delete document:', document.title);
    }
  };

  const handleDocumentClick = (document) => {
    if (!isSelectionMode) {
      navigate(`/teacher/class/${classCode}/documents/${document.id}`);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setIsSortDropdownOpen(false);
  };

  const handleSortClick = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  // File upload functions
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      // TODO: Replace with actual API call
      // const formData = new FormData();
      // formData.append('file', files[0]);
      // formData.append('classId', classCode);
      
      // const response = await fetch('/api/documents/upload', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // Mock upload simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add new document to list
      const newDocument = {
        id: Date.now(),
        title: files[0].name,
        type: files[0].name.split('.').pop().toUpperCase(),
        size: `${(files[0].size / (1024 * 1024)).toFixed(1)} MB`,
        progress: '0 đã xem',
        completed: 0,
        total: 0,
        icon: files[0].name.split('.').pop().toUpperCase() === 'PDF' ? 'P' : 'W',
        date: new Date().toLocaleString('vi-VN', {
          day: '2-digit',
          month: 'long',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      
      // In real app, this would come from API response
      console.log('File uploaded successfully:', newDocument);
      alert('Tải lên tài liệu thành công!');
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Có lỗi xảy ra khi tải lên tài liệu');
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  return (
    <div className="teacher-document-page">
      <Header />
      <div className="teacher-document-page__content">
        <TeacherSidebar classInfo={classInfo} />
        
        {/* Header "Tài liệu lớp học" */}
        <div className="teacher-document-page__header">
          <h1 className="teacher-document-page__title">Tài liệu lớp học</h1>
        </div>

        {/* Main Content Area */}
        <div className="teacher-document-page__main">
          {/* Left Sidebar - Folder Navigation */}
          <div className="teacher-document-page__folder-sidebar">
            <div className="teacher-document-folder-sidebar__header">
              <div className="teacher-document-folder-sidebar__title">
                <span>Thư mục</span>
                <button 
                  className="teacher-document-folder-sidebar__add-icon"
                  onClick={() => {
                    const folderName = prompt('Nhập tên thư mục mới:');
                    if (folderName) {
                      alert(`Đã tạo thư mục: ${folderName}`);
                    }
                  }}
                  title="Tạo thư mục mới"
                >
                  <MdFolder size={20} />
                  <MdAdd size={12} style={{ position: 'absolute', bottom: '-2px', right: '-2px' }} />
                </button>
              </div>
            </div>
            
            <div className="teacher-document-folder-sidebar__content">
              <div className="teacher-document-folder-item teacher-document-folder-item--active">
                <div className="teacher-document-folder-item__icon">
                  <MdFolder size={20} />
                </div>
                <span className="teacher-document-folder-item__text">Tất cả tài liệu</span>
              </div>
            </div>
          </div>

          {/* Main Content - Toolbar + Document List */}
          <div className="teacher-document-page__main-content">
            {/* Toolbar */}
            <div className="teacher-document-page__toolbar">
              <div className="teacher-document-toolbar__view-toggle">
                <button 
                  className={`teacher-document-view-toggle__btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('list');
                    setIsSelectionMode(false);
                    setSelectedItems([]);
                  }}
                >
                  ☰
                </button>
                <button 
                  className={`teacher-document-view-toggle__btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('grid');
                    setIsSelectionMode(true);
                  }}
                >
                  ☰✓
                </button>
              </div>

              <div className="teacher-document-toolbar__search">
                <MdSearch size={20} />
                <input type="text" placeholder="Tìm kiếm tài liệu..." />
              </div>
              
              <div className="teacher-document-toolbar__sort-container">
                <div 
                  className="teacher-document-toolbar__sort-button"
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                >
                  <span>{sortBy === 'newest' ? 'Mới nhất' : sortBy === 'oldest' ? 'Cũ nhất' : 'Tên'}</span>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`teacher-document-toolbar__sort-arrow ${isSortDropdownOpen ? 'rotated' : ''}`}
                  >
                    <path d="m7 10 5 5 5-5z" fill="currentColor"/>
                  </svg>
                </div>
                {isSortDropdownOpen && (
                  <div className="teacher-document-toolbar__sort-menu">
                    <div 
                      className={`teacher-document-toolbar__sort-item ${sortBy === 'newest' ? 'selected' : ''}`}
                      onClick={() => {
                        setSortBy('newest');
                        setIsSortDropdownOpen(false);
                      }}
                    >
                      Mới nhất
                    </div>
                    <div 
                      className={`teacher-document-toolbar__sort-item ${sortBy === 'oldest' ? 'selected' : ''}`}
                      onClick={() => {
                        setSortBy('oldest');
                        setIsSortDropdownOpen(false);
                      }}
                    >
                      Cũ nhất
                    </div>
                    <div 
                      className={`teacher-document-toolbar__sort-item ${sortBy === 'name' ? 'selected' : ''}`}
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

              {/* Upload Button */}
              <button 
                className="teacher-document-toolbar__upload-btn"
                onClick={handleUploadClick}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <div className="upload-spinner"></div>
                    Đang tải lên...
                  </>
                ) : (
                  <>
                    <MdUpload size={16} />
                    Tải lên tài liệu
                  </>
                )}
              </button>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                style={{ display: 'none' }}
                multiple={false}
              />
            </div>

            {/* Selection Bar */}
            {isSelectionMode && (
              <div className="teacher-document-page__selection-bar">
                <div className="teacher-document-selection-bar__left">
                  <input 
                    type="checkbox" 
                    checked={selectedItems.length === documents.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(documents.map(d => d.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                  />
                  <span>
                    Đang chọn <span className="teacher-document-selection-count">{selectedItems.length} tài liệu</span>
                  </span>
                </div>
                <div className="teacher-document-selection-bar__right">
                  <button className="teacher-document-selection-action-btn">
                    <MdFolder size={16} />
                    Di chuyển
                  </button>
                  <button className="teacher-document-selection-action-btn">
                    <MdDelete size={16} />
                    Xoá
                  </button>
                </div>
              </div>
            )}

            {/* Document List */}
            <div className="teacher-document-page__list-container">
              <div className="teacher-document-list">
                {documents.map((document) => (
                  <div 
                    key={document.id}
                    className={`teacher-document-item ${isSelectionMode ? 'selection-mode' : ''}`}
                    onClick={() => {
                      if (isSelectionMode) {
                        if (selectedItems.includes(document.id)) {
                          setSelectedItems(selectedItems.filter(id => id !== document.id));
                        } else {
                          setSelectedItems([...selectedItems, document.id]);
                        }
                      } else {
                        handleDocumentClick(document);
                      }
                    }}
                  >
                    {isSelectionMode && (
                      <input 
                        type="checkbox" 
                        checked={selectedItems.includes(document.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, document.id]);
                          } else {
                            setSelectedItems(selectedItems.filter(id => id !== document.id));
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="teacher-document-checkbox"
                      />
                    )}
                    <div className={`teacher-document-item__icon ${document.type === 'PDF' ? 'teacher-document-item__icon--pdf' : ''}`}>
                      {document.icon}
                    </div>
                    <div className="teacher-document-item__content">
                      <div className="teacher-document-item__title">{document.title}</div>
                      <div className="teacher-document-item__info">
                        <span className="teacher-document-item__progress">{document.progress}</span>
                        <span className="teacher-document-item__separator">•</span>
                        <span className="teacher-document-item__size">{document.size}</span>
                        <span className="teacher-document-item__separator">•</span>
                        <span className="teacher-document-item__date">{document.date}</span>
                      </div>
                    </div>
                    <div className="teacher-document-item__actions">
                      <div className="teacher-document-item__menu-container">
                        <button 
                          className="teacher-document-item__more-btn"
                          onClick={(e) => handleMenuToggle(document.id, e)}
                        >
                          <MdMoreVert size={20} />
                        </button>
                        {openMenuId === document.id && (
                          <div className="teacher-document-item__dropdown-menu">
                            <button 
                              className="teacher-dropdown-menu__item"
                              onClick={() => handleMenuAction('view', document)}
                            >
                              <MdVisibility size={16} />
                              <span>Xem</span>
                            </button>
                            <button 
                              className="teacher-dropdown-menu__item"
                              onClick={() => handleMenuAction('move', document)}
                            >
                              <MdFolder size={16} />
                              <span>Di chuyển</span>
                            </button>
                            <button 
                              className="teacher-dropdown-menu__item"
                              onClick={() => handleMenuAction('download', document)}
                            >
                              <MdDownload size={16} />
                              <span>Tải về</span>
                            </button>
                            <button 
                              className="teacher-dropdown-menu__item"
                              onClick={() => handleMenuAction('delete', document)}
                            >
                              <MdDelete size={16} />
                              <span>Xóa tài liệu</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherMaterialsPage; 