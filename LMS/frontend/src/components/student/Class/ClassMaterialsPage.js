import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHeader from '../DashboardHeader';
import ClassSidebar from './ClassSidebar';
import '../../../styles/ClassMaterialsPage.css';
import { 
  MdFolder, 
  MdAdd, 
  MdSearch, 
  MdShare,
  MdMoreVert,
  MdDelete,
  MdContentCopy,
  MdVisibility,
  MdDownload
} from 'react-icons/md';

function ClassMaterialsPage() {
  const navigate = useNavigate();
  const { classCode } = useParams();
  const [selectedDocument, setSelectedDocument] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [sortBy, setSortBy] = useState('newest');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

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
      navigate(`/class/${classCode}/documents/${document.id}`);
    }
  };

  const handleDocumentClick = (document) => {
    if (!isSelectionMode) {
      navigate(`/class/${classCode}/documents/${document.id}`);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setIsSortDropdownOpen(false);
  };

  const handleSortClick = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  return (
    <div className="class-document-page">
      <DashboardHeader />
      <div className="class-document-page__content">
        <ClassSidebar classInfo={classInfo} />
        
        {/* Header "Tài liệu lớp học" */}
        <div className="class-document-page__header">
          <h1 className="class-document-page__title">Tài liệu lớp học</h1>
        </div>

        {/* Main Content Area */}
        <div className="class-document-page__main">
          {/* Left Sidebar - Folder Navigation */}
          <div className="class-document-page__folder-sidebar">
            <div className="document-folder-sidebar__header">
              <div className="document-folder-sidebar__title">
                <span>Thư mục</span>
              </div>
            </div>
            
            <div className="document-folder-sidebar__content">
              <div className="document-folder-item document-folder-item--active">
                <div className="document-folder-item__icon">
                  <MdFolder size={20} />
                </div>
                <span className="document-folder-item__text">Tất cả tài liệu</span>
              </div>
            </div>
          </div>

          {/* Main Content - Toolbar + Document List */}
          <div className="class-document-page__main-content">
            {/* Toolbar */}
            <div className="class-document-page__toolbar">
              <div className="document-toolbar__search">
                <MdSearch size={20} />
                <input type="text" placeholder="Tìm kiếm tài liệu..." />
              </div>
              
              <select 
                className={`document-toolbar__sort ${isSortDropdownOpen ? 'document-toolbar__sort--open' : ''}`}
                value={sortBy}
                onChange={handleSortChange}
                onClick={handleSortClick}
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="name">Tên</option>
              </select>
            </div>

            {/* Selection Bar */}
            {isSelectionMode && (
              <div className="class-document-page__selection-bar">
                <div className="document-selection-bar__left">
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
                    Đang chọn <span className="document-selection-count">{selectedItems.length} tài liệu</span>
                  </span>
                </div>
                <div className="document-selection-bar__right">
                  <button className="document-selection-action-btn">
                    <MdFolder size={16} />
                    Di chuyển
                  </button>
                  <button className="document-selection-action-btn">
                    <MdDelete size={16} />
                    Xoá
                  </button>
                </div>
              </div>
            )}

            {/* Document List */}
            <div className="class-document-page__list-container">
              <div className="document-list">
                {documents.map((document) => (
                  <div 
                    key={document.id}
                    className={`document-item ${isSelectionMode ? 'selection-mode' : ''}`}
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
                        className="document-checkbox"
                      />
                    )}
                    <div className={`document-item__icon ${document.type === 'PDF' ? 'document-item__icon--pdf' : ''}`}>
                      {document.icon}
                    </div>
                    <div className="document-item__content">
                      <div className="document-item__title">{document.title}</div>
                      <div className="document-item__info">
                        <span className="document-item__progress">{document.progress}</span>
                        <span className="document-item__separator">•</span>
                        <span className="document-item__date">{document.date}</span>
                      </div>
                    </div>
                    <div className="document-item__actions">
                      <div className="document-item__menu-container">
                        <button 
                          className="document-item__more-btn"
                          onClick={(e) => handleMenuToggle(document.id, e)}
                        >
                          <MdMoreVert size={20} />
                        </button>
                        {openMenuId === document.id && (
                          <div className="document-item__dropdown-menu">
                            <button 
                              className="dropdown-menu__item"
                              onClick={() => handleMenuAction('view', document)}
                            >
                              <MdVisibility size={16} />
                              <span>Xem</span>
                            </button>
                            <button 
                              className="dropdown-menu__item"
                              onClick={() => handleMenuAction('download', document)}
                            >
                              <MdDownload size={16} />
                              <span>Tải về</span>
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

export default ClassMaterialsPage; 