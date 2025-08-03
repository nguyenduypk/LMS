import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack, MdClose, MdRefresh, MdFullscreen, MdViewModule, MdEdit, MdOutlineHelpOutline } from 'react-icons/md';
import { MdOutlineLightbulb } from 'react-icons/md';
import { FaYoutube } from 'react-icons/fa';
import { FiHeadphones, FiUpload, FiLink } from 'react-icons/fi';
import Header from '../Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './UploadAssignmentPage.css';
import TeacherSidebar from './TeacherSidebar';

const UploadAssignmentPage = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('answer');
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(94);
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [totalScore, setTotalScore] = useState(10);
  const [questionScores, setQuestionScores] = useState([10]);
  const [questionAnswers, setQuestionAnswers] = useState(['']);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showQuickInputModal, setShowQuickInputModal] = useState(false);
  const [quickInputText, setQuickInputText] = useState('');
  const [quickInputActiveTab, setQuickInputActiveTab] = useState('answer');
  const [quickInputScoreText, setQuickInputScoreText] = useState('');
  const [uploadedFile, setUploadedFile] = useState({
    name: 'ĐỀ TRẮC NGHIỆM TOÁN LỚP 1.pdf',
    type: 'pdf',
    size: '2.5 MB'
  });
  const [warning, setWarning] = useState('');

  // States for assignment info toggles
  const [assignmentInfo, setAssignmentInfo] = useState({
    name: '', // Thêm tên bài tập vào state
    hasPassword: true,
    duration: '30', // Default duration as a string
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 60 * 60 * 1000), // Default to 1 hour later
    isTest: false,
    blockReview: false,
    studentPermission: 'only_view_mark',
    attempts: 1,
    gradingMethod: 'first'
  });

  const handleToggleChange = (field) => {
    setAssignmentInfo(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInfoChange = (field, value) => {
    setAssignmentInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        type: file.type,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
      });
    }
  };

  const handleBack = () => {
    if (activeTab === 'info') {
      setActiveTab('expand');
    } else if (activeTab === 'expand') {
      setActiveTab('answer');
    } else {
      if (classId) {
        navigate(`/teacher/class/${classId}/assignments`);
    } else {
      navigate('/teacher/assignments');
      }
    }
  };

  const handleContinue = () => {
    setWarning(''); // Xóa cảnh báo cũ
    if (activeTab === 'answer') {
      if (numberOfQuestions === 0) {
        setWarning('Vui lòng tạo ít nhất 1 câu hỏi.');
        return;
      }
      // Kiểm tra xem tất cả các đáp án và điểm đã được điền chưa
      const allFilled = questionAnswers.every(ans => ans.trim() !== '') && questionScores.every(score => score > 0);
      if (!allFilled) {
        setWarning('Vui lòng điền đầy đủ đáp án và điểm cho các câu hỏi.');
        return;
      }
      setActiveTab('expand');
    } else if (activeTab === 'expand') {
      setActiveTab('info');
    } else if (activeTab === 'info') {
      // Kiểm tra tên bài tập
      if (!assignmentInfo.name.trim()) {
        setWarning('Vui lòng nhập tên bài tập.');
        return;
      }
      // Logic hoàn tất
      console.log('Hoàn tất tạo bài tập', assignmentInfo);
      // navigate('/teacher/assignments'); // Ví dụ: chuyển về trang danh sách
    }
    // Logic để tiếp tục
    console.log('Tiếp tục tạo bài tập');
  };

  const tabOrder = ['answer', 'expand', 'info'];
  const currentTabIndex = tabOrder.indexOf(activeTab);

  const getTabClassName = (tabName, tabIndex) => {
    let className = 'tab-btn';
    if (tabName === activeTab) {
      className += ' active';
    } else if (tabIndex < currentTabIndex) {
      className += ' completed';
    }

    if (tabIndex !== currentTabIndex) {
      className += ' disabled';
    }
    return className;
  };

  // Tính toán điểm cho từng câu
  const calculateQuestionScore = (index) => {
    if (numberOfQuestions <= 0) return 0;
    
    const baseScore = totalScore / numberOfQuestions;
    return parseFloat(baseScore.toFixed(3));
  };

  // Cập nhật điểm khi thay đổi số câu hoặc tổng điểm
  const updateQuestionScores = () => {
    const newScores = Array.from({ length: numberOfQuestions }, (_, index) => 
      parseFloat(calculateQuestionScore(index))
    );
    setQuestionScores(newScores);
  };

  // 1. Khi tạo số câu hoặc đổi tổng điểm: chia đều điểm cho các câu
  const handleNumberOfQuestionsChange = (value) => {
    const newValue = parseInt(value) || 0;
    setNumberOfQuestions(newValue);

    // Cập nhật mảng đáp án khi thay đổi số câu
    const newAnswers = Array.from({ length: newValue }, (_, index) =>
      questionAnswers[index] || ''
    );
    setQuestionAnswers(newAnswers);

    if (newValue === 1) {
      setTotalScore(10);
      setQuestionScores([10]);
    } else if (newValue > 1) {
      setTotalScore(totalScore); // giữ nguyên tổng điểm hiện tại
      setQuestionScores(Array.from({ length: newValue }, () => parseFloat((totalScore / newValue).toFixed(3))));
    }
  };

  // 2. Khi đổi tổng điểm: chia đều lại điểm cho các câu
  const handleTotalScoreChange = (value) => {
    setTotalScore(value);
    setTimeout(() => {
      updateQuestionScores();
    }, 0);
  };

  // Effect để cập nhật điểm khi có thay đổi
  // useEffect(() => {
  //   updateQuestionScores();
  // }, [numberOfQuestions, totalScore]);

  useEffect(() => {
    if (numberOfQuestions === 0) {
      setTotalScore(0);
    }
  }, [numberOfQuestions]);

  // Xử lý nhập nhanh đáp án
  const handleQuickInputApply = () => {
    if (quickInputActiveTab === 'answer') {
      if (!quickInputText.trim()) return;
      
      const answers = quickInputText.trim().toUpperCase().split('');
      
      if (questionAnswers.length === 0) {
        // Nếu chưa có câu hỏi nào, tạo mới số câu hỏi tương ứng đáp án
        setNumberOfQuestions(answers.length);
        setQuestionAnswers(answers);
      } else {
        // Nếu đã có câu hỏi, chỉ cập nhật đáp án cho các câu đầu, các câu còn lại giữ nguyên
        const newAnswers = questionAnswers.map((oldAnswer, idx) =>
          idx < answers.length ? answers[idx] : oldAnswer
        );
        setQuestionAnswers(newAnswers);
      }
      setQuickInputText('');
    } else if (quickInputActiveTab === 'score') {
      if (numberOfQuestions === 0) return;
      if (!quickInputScoreText.trim()) return;
      
      // Xử lý nhập điểm chỉ cho số câu hiện có, không tự tạo thêm câu
      const scorePattern = quickInputScoreText.trim();
      const newScores = [...questionScores];
      let currentIndex = 0;
      
      // Tách theo dấu ;
      const parts = scorePattern.split(';').filter(part => part.trim());
      
      parts.forEach(part => {
        const trimmedPart = part.trim();
        if (trimmedPart.includes('*')) {
          // Format: 2.5*10 (2.5 điểm cho 10 câu)
          const [score, count] = trimmedPart.split('*');
          const scoreValue = parseFloat(score) || 0;
          const questionCount = parseInt(count) || 0;
          
          for (let i = 0; i < questionCount && currentIndex < numberOfQuestions; i++) {
            newScores[currentIndex] = scoreValue;
            currentIndex++;
          }
        } else {
          // Format: 4 (4 điểm cho 1 câu)
          const scoreValue = parseFloat(trimmedPart) || 0;
          if (currentIndex < numberOfQuestions) {
            newScores[currentIndex] = scoreValue;
            currentIndex++;
          }
        }
      });
      
      setQuestionScores(newScores);
      
      // Tính tổng điểm mới
      const newTotalScore = newScores.reduce((sum, score) => sum + score, 0);
      setTotalScore(newTotalScore);
      
      setQuickInputScoreText('');
    }
    
    setShowQuickInputModal(false);
  };

  // Tính số đáp án sẽ tạo ra
  const getAnswerCount = () => {
    return quickInputText.trim().length;
  };

  return (
    <div className="upload-assignment-layout">
      <Header />
      <div className="upload-assignment-content">
        <TeacherSidebar />
        <div className="upload-assignment-page">
          {/* Header */}
          <div className="upload-assignment-header">
            {/* Top dark bar */}
            <div className="upload-assignment-header-top"></div>
            
            {/* Content bar */}
            <div className="upload-assignment-header-content">
              <div className="upload-assignment-breadcrumb">
                <Link to={classId ? `/teacher/class/${classId}/assignments` : "/teacher/assignments"} className="upload-assignment-breadcrumb-link">Bài tập</Link>
                <span className="upload-assignment-breadcrumb-separator">▸</span>
                <span>Tạo bài tập</span>
                <span className="upload-assignment-breadcrumb-separator">▸</span>
                <span className="upload-assignment-breadcrumb-current">Tải lên</span>
              </div>
              <div className="upload-assignment-actions">
                {warning && <span className="upload-assignment-warning">{warning}</span>}
                <button className="upload-assignment-btn-back" onClick={handleBack}>
                  Quay lại
                </button>
                <button className="upload-assignment-btn-continue" onClick={handleContinue}>
                  {activeTab === 'info' ? 'Hoàn tất' : 'Tiếp tục'}
                </button>
              </div>
            </div>
          </div>

      {/* Main Content */}
      <div className="upload-assignment-main-content">
        {/* Left Section - Document Preview */}
        <div className="upload-assignment-document-preview-section">
          <div className="upload-assignment-document-preview-header">
            <h3>Xem trước tài liệu</h3>
            <button className="upload-assignment-close-preview-btn">
              <MdClose size={20} />
            </button>
          </div>
          
          <div className="upload-assignment-document-preview-content">
            {uploadedFile ? (
              <div className="upload-assignment-upload-document-content">
                <h2 className="upload-assignment-upload-document-title">ĐỀ TRẮC NGHIỆM TOÁN LỚP 1</h2>
                
                <div className="upload-assignment-upload-document-questions">
                  <div className="upload-assignment-upload-question">
                    <p><strong>1.</strong> 1.2 + 3 bằng bao nhiêu?</p>
                    <div className="upload-assignment-options">
                      <span>A. 4</span>
                      <span>B. 5</span>
                      <span>C. 6</span>
                      <span>D. 3</span>
                    </div>
                  </div>
                  
                  <div className="upload-assignment-upload-question">
                    <p><strong>2.</strong> Số nào lớn hơn: 7 hay 5?</p>
                    <div className="upload-assignment-options">
                      <span>A. 5</span>
                      <span>B. 6</span>
                      <span>C. 7</span>
                      <span>D. 4</span>
                    </div>
                  </div>
                  
                  <div className="upload-assignment-upload-question">
                    <p><strong>3.</strong> 3.10 - 4 bằng bao nhiêu?</p>
                    <div className="upload-assignment-options">
                      <span>A. 6</span>
                      <span>B. 5</span>
                      <span>C. 4</span>
                      <span>D. 3</span>
                    </div>
                  </div>
                  
                  <div className="upload-assignment-upload-question">
                    <p><strong>4.</strong> Số nào nhỏ hơn: 2 hay 9?</p>
                    <div className="upload-assignment-options">
                      <span>A. 9</span>
                      <span>B. 3</span>
                      <span>C. 2</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="upload-assignment-no-file-uploaded">
                <p>Chưa có tài liệu nào được tải lên</p>
                <input
                  type="file"
                  id="file-upload"
                  accept=".doc,.docx,.pdf,.txt"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <button 
                  className="upload-assignment-upload-file-btn"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  Tải lên tài liệu
                </button>
              </div>
            )}
          </div>
          
          <div className="upload-assignment-upload-document-preview-footer">
            <button className="upload-assignment-reload-document-btn">
              <MdRefresh size={16} />
              Tải lại đề
            </button>
            <div className="upload-assignment-upload-document-status">
              <span>TRANG {currentPage}/3</span>
              <span>{zoomLevel}%</span>
              <button className="upload-assignment-view-mode-btn">
                <MdViewModule size={16} />
              </button>
              <button className="upload-assignment-fullscreen-btn">
                <MdFullscreen size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Input Panel */}
        <div className="upload-assignment-input-panel-section">
          <div className="upload-assignment-input-panel-tabs">
            <button 
              className={getTabClassName('answer', 0)}
              onClick={() => { /* Không làm gì vì đã bị vô hiệu hóa */ }}
            >
              1. Đáp án
            </button>
            <button 
              className={getTabClassName('expand', 1)}
              onClick={() => { /* Không làm gì vì đã bị vô hiệu hóa */ }}
            >
              2. Mở rộng
            </button>
            <button 
              className={getTabClassName('info', 2)}
              onClick={() => { /* Không làm gì vì đã bị vô hiệu hóa */ }}
            >
              3. Thông tin bài tập
            </button>
          </div>

          <div className="upload-assignment-input-panel-content">
            {activeTab === 'answer' && (
              <div className="upload-assignment-answer-tab-container">
                <div className="upload-assignment-answer-tab-content">
                  <div className="upload-assignment-summary-inputs">
                    <div className="upload-assignment-upload-input-group">
                      <label>Số câu</label>
                      <input 
                        type="number" 
                        value={numberOfQuestions} 
                        onChange={(e) => handleNumberOfQuestionsChange(e.target.value)}
                        min="0" 
                      />
                    </div>
                    <div className="upload-assignment-upload-input-group">
                      <label>Tổng điểm</label>
                      <input 
                        type="number" 
                        value={totalScore} 
                        onChange={(e) => handleTotalScoreChange(parseInt(e.target.value) || 0)}
                        min="0" 
                      />
                    </div>
                    <div className="upload-assignment-control-buttons">
                      <button className="upload-assignment-quick-input-btn" onClick={() => setShowQuickInputModal(true)}>Nhập nhanh</button>
                      <button className="upload-assignment-note-btn" onClick={() => setShowNoteModal(true)}>Lưu ý</button>
                    </div>
                  </div>
                </div>
                
                {numberOfQuestions > 0 && (
                  <div className="upload-assignment-questions-grid">
                    {Array.from({ length: numberOfQuestions }, (_, index) => (
                      <div key={index} className="upload-assignment-question-config-panel">
                        <div className="upload-assignment-question-indicator">
                          <span>Câu {index + 1}</span>
                          <button className="upload-assignment-edit-question-btn">
                            <MdEdit size={16} />
                          </button>
                        </div>
                        <div className="upload-assignment-question-config-content">
                          <div className="upload-assignment-upload-question-header">
                            <h4></h4>
                          </div>
                          <div className="upload-assignment-upload-question-fields">
                            <div className="upload-assignment-field-group">
                              <label>Loại</label>
                              <select defaultValue="multiple-choice">
                                <option value="multiple-choice">Trắc nghiệm</option>
                                <option value="essay">Tự luận</option>
                                <option value="true-false">Đúng/Sai</option>
                              </select>
                            </div>
                            <div className="upload-assignment-field-group">
                              <label>Đáp án</label>
                              <input 
                                type="text" 
                                placeholder="" 
                                value={questionAnswers[index] || ''}
                                onChange={(e) => {
                                  const newAnswers = [...questionAnswers];
                                  newAnswers[index] = e.target.value.toUpperCase();
                                  setQuestionAnswers(newAnswers);
                                }}
                              />
                            </div>
                            <div className="upload-assignment-field-group">
                              <label>Điểm</label>
                              <input 
                                type="number" 
                                value={(questionScores[index] || 0).toFixed(3)}
                                onChange={(e) => {
                                  const newScores = [...questionScores];
                                  newScores[index] = parseFloat(e.target.value) || 0;
                                  setQuestionScores(newScores);
                                }}
                                min="0" 
                                step="0.001" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'expand' && (
              <div className="upload-assignment-extension-tab-content">
                <div className="upload-assignment-extension-feature-list">
                  <div className="upload-assignment-extension-feature-item">
                    <span className="upload-assignment-extension-feature-icon"><MdOutlineLightbulb /></span>
                    <div className="upload-assignment-extension-feature-info">
                      <div className="upload-assignment-extension-feature-title">Lời giải toàn bài</div>
                      <div className="upload-assignment-extension-feature-desc">Học sinh có thể xem lời giải sau khi làm bài.</div>
                    </div>
                    <span className="upload-assignment-extension-feature-action"><FiUpload /></span>
                  </div>
                  <div className="upload-assignment-extension-feature-item">
                    <span className="upload-assignment-extension-feature-icon"><FaYoutube /></span>
                    <div className="upload-assignment-extension-feature-info">
                      <div className="upload-assignment-extension-feature-title">Video lời giải toàn bài</div>
                      <div className="upload-assignment-extension-feature-desc">Học sinh có thể xem video lời giải sau khi làm bài.</div>
                    </div>
                    <span className="upload-assignment-extension-feature-action"><FiLink /></span>
                  </div>
                  <div className="upload-assignment-extension-feature-item">
                    <span className="upload-assignment-extension-feature-icon"><FiHeadphones /></span>
                    <div className="upload-assignment-extension-feature-info">
                      <div className="upload-assignment-extension-feature-title">Thêm file nghe cho toàn bài</div>
                      <div className="upload-assignment-extension-feature-desc">Giáo viên có thể tải lên một hoặc nhiều file nghe.</div>
                    </div>
                    <span className="upload-assignment-extension-feature-action"><FiUpload /></span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="upload-assignment-assignment-info-tab-content">
                <div className="upload-assignment-assignment-info-form">
                  {/* Tên bài tập */}
                  <div className="upload-assignment-assignment-info-form-group stacked">
                    <label className="upload-assignment-assignment-info-form-label">
                      Tên bài tập (*)
                    </label>
                    <div className="upload-assignment-assignment-info-input-wrapper">
                      <input 
                        className="upload-assignment-assignment-info-form-input" 
                        type="text" 
                        placeholder="" 
                        value={assignmentInfo.name}
                        onChange={(e) => handleInfoChange('name', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Mật khẩu */}
                  <div className="upload-assignment-assignment-info-form-group stacked">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <label className="upload-assignment-assignment-info-form-label">
                        <MdOutlineHelpOutline style={{ marginRight: 4 }} title="Để học sinh vào làm bài được cần nhập đúng mật khẩu" />
                        Mật khẩu bài tập
                      </label>
                      <label className="upload-assignment-assignment-info-switch">
                        <input type="checkbox" checked={assignmentInfo.hasPassword} onChange={() => handleToggleChange('hasPassword')} />
                        <span className="upload-assignment-assignment-info-slider round"></span>
                      </label>
                    </div>
                    {assignmentInfo.hasPassword && (
                      <div className="upload-assignment-assignment-info-input-wrapper">
                        <input className="upload-assignment-assignment-info-form-input" type="text" placeholder="Nhập mật khẩu" />
                      </div>
                    )}
                  </div>

                  {/* Thời lượng */}
                  <div className="upload-assignment-assignment-info-form-group stacked">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <label className="upload-assignment-assignment-info-form-label">
                        <MdOutlineHelpOutline style={{ marginRight: 4 }} title="Thời gian làm bài của học sinh" />
                        Thời lượng làm bài và nộp bài (phút)
                      </label>
                      <label className="upload-assignment-assignment-info-switch">
                        <input type="checkbox" checked={assignmentInfo.hasDuration} onChange={() => handleToggleChange('hasDuration')} />
                        <span className="upload-assignment-assignment-info-slider round"></span>
                      </label>
                    </div>
                    {assignmentInfo.hasDuration && (
                      <div className="upload-assignment-assignment-info-input-wrapper">
                        <input 
                          className="upload-assignment-assignment-info-form-input" 
                          type="number" 
                          value={assignmentInfo.duration}
                          onChange={(e) => handleInfoChange('duration', e.target.value)}
                        />
                        <div className="upload-assignment-quick-duration-buttons">
                          <button className="upload-assignment-quick-duration-btn" onClick={() => handleInfoChange('duration', '30')}>30 phút</button>
                          <button className="upload-assignment-quick-duration-btn" onClick={() => handleInfoChange('duration', '45')}>45 phút</button>
                          <button className="upload-assignment-quick-duration-btn" onClick={() => handleInfoChange('duration', '60')}>60 phút</button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Thời gian bắt đầu */}
                  <div className="upload-assignment-assignment-info-form-group stacked">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <label className="upload-assignment-assignment-info-form-label">
                        <MdOutlineHelpOutline style={{ marginRight: 4 }} title="Học sinh chỉ có thể làm bài sau thời gian này" />
                        Thời gian bắt đầu
                      </label>
                      <label className="upload-assignment-assignment-info-switch">
                        <input type="checkbox" checked={assignmentInfo.hasStartTime} onChange={() => handleToggleChange('hasStartTime')} />
                        <span className="upload-assignment-assignment-info-slider round"></span>
                      </label>
                    </div>
                    {assignmentInfo.hasStartTime && (
                      <div className="upload-assignment-assignment-info-input-wrapper">
                        <DatePicker
                          selected={assignmentInfo.startTime}
                          onChange={(date) => handleInfoChange('startTime', date)}
                          showTimeSelect
                          dateFormat="Pp"
                          className="upload-assignment-assignment-info-form-input"
                        />
                      </div>
                    )}
                  </div>

                  {/* Hạn chót */}
                  <div className="upload-assignment-assignment-info-form-group stacked">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <label className="upload-assignment-assignment-info-form-label">
                        <MdOutlineHelpOutline style={{ marginRight: 4 }} title="Học sinh sẽ không thể nộp bài sau thời gian này" />
                        Hạn chót nộp bài
                      </label>
                      <label className="upload-assignment-assignment-info-switch">
                        <input type="checkbox" checked={assignmentInfo.hasEndTime} onChange={() => handleToggleChange('hasEndTime')} />
                        <span className="upload-assignment-assignment-info-slider round"></span>
                      </label>
                    </div>
                    {assignmentInfo.hasEndTime && (
                      <div className="upload-assignment-assignment-info-input-wrapper">
                         <DatePicker
                          selected={assignmentInfo.endTime}
                          onChange={(date) => handleInfoChange('endTime', date)}
                          showTimeSelect
                          dateFormat="Pp"
                          className="upload-assignment-assignment-info-form-input"
                        />
                        <span className="upload-assignment-assignment-info-form-desc">Học sinh không thể nộp bài sau thời gian này</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Gán nhãn kiểm tra */}
                  <div className="upload-assignment-assignment-info-form-group">
                    <label className="upload-assignment-assignment-info-form-label">
                      <MdOutlineHelpOutline style={{ marginRight: 4 }} title="Bài tập sẽ được hiển thị là kiểm tra trong danh sách bài tập" />
                      Gán nhãn bài tập là kiểm tra
                    </label>
                    <label className="upload-assignment-assignment-info-switch">
                      <input type="checkbox" />
                      <span className="upload-assignment-assignment-info-slider round"></span>
                    </label>
                  </div>

                  {/* Chặn xem lại đề */}
                  <div className="upload-assignment-assignment-info-form-group">
                    <label className="upload-assignment-assignment-info-form-label">
                      <MdOutlineHelpOutline style={{ marginRight: 4 }} title="Học sinh sẽ không xem lại được đề" />
                      Chặn học sinh xem lại đề sau khi làm bài xong
                    </label>
                    <label className="upload-assignment-assignment-info-switch">
                      <input type="checkbox" />
                      <span className="upload-assignment-assignment-info-slider round"></span>
                    </label>
                  </div>

                  {/* Quyền của học sinh */}
                  <div className="upload-assignment-assignment-info-form-group stacked">
                    <label className="upload-assignment-assignment-info-form-label">
                      <MdOutlineHelpOutline style={{ marginRight: 4 }} title="Chế độ xem điểm và đáp án của học sinh" />
                      Quyền của học sinh
                    </label>
                    <div className="upload-assignment-assignment-info-input-wrapper">
                      <select className="upload-assignment-assignment-info-form-select">
                        <option>Chỉ xem điểm</option>
                        <option>Xem đáp án</option>
                        <option>Xem lời giải</option>
                      </select>
                    </div>
                  </div>

                  {/* Số lần làm bài */}
                  <div className="upload-assignment-assignment-info-form-group stacked">
                    <label className="upload-assignment-assignment-info-form-label">
                      <MdOutlineHelpOutline style={{ marginRight: 4 }} title="Tổng số lần học sinh được làm bài tập này" />
                      Số lần làm bài
                    </label>
                    <div className="upload-assignment-assignment-info-input-wrapper">
                      <input className="upload-assignment-assignment-info-form-input" type="number" min="1" defaultValue="1" />
                    </div>
                  </div>

                  {/* Thiết lập bảng điểm */}
                  <div className="upload-assignment-assignment-info-form-group stacked">
                    <label className="upload-assignment-assignment-info-form-label">
                      <MdOutlineHelpOutline style={{ marginRight: 4 }} title="Chọn lần làm bài để lấy điểm cho học sinh" />
                      Thiết lập bảng điểm
                    </label>
                    <div className="upload-assignment-assignment-info-input-wrapper">
                      <select className="upload-assignment-assignment-info-form-select">
                        <option>Lấy điểm lần làm bài đầu tiên</option>
                        <option>Lấy điểm cao nhất</option>
                        <option>Lấy điểm trung bình</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>


        </div>
      </div>
        </div>
      </div>

      {/* Modal Lưu ý */}
      {showNoteModal && (
        <div className="upload-assignment-note-modal-overlay" onClick={() => setShowNoteModal(false)}>
          <div className="upload-assignment-note-modal" onClick={(e) => e.stopPropagation()}>
            <div className="upload-assignment-note-modal-header">
              <h3>Lưu ý</h3>
              <button 
                className="upload-assignment-note-modal-close" 
                onClick={() => setShowNoteModal(false)}
              >
                ×
              </button>
            </div>
            <div className="upload-assignment-note-modal-content">
              <ul>
                <li>Đáp án không phân biệt chữ HOA/thường.</li>
                <li>Trong trường hợp có nhiều đáp án các đáp án được ngăn cách bởi dấu "/". Ví dụ: HS/học sinh</li>
                <li>Bấm Enter sau khi nhập đáp án để qua câu hỏi khác nhanh hơn</li>
                <li>Bấm phím mũi tên để di chuyển giữa các câu hỏi</li>
              </ul>
            </div>
            <div className="upload-assignment-note-modal-footer">
              <button 
                className="upload-assignment-note-modal-confirm" 
                onClick={() => setShowNoteModal(false)}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nhập nhanh */}
      {showQuickInputModal && (
        <div className="upload-assignment-note-modal-overlay" onClick={() => setShowQuickInputModal(false)}>
          <div className="upload-assignment-upload-quick-input-modal" onClick={(e) => e.stopPropagation()}>
            <div className="upload-assignment-upload-quick-input-header">
              <h3>Nhập nhanh</h3>
            </div>
            <div className="upload-assignment-upload-quick-input-tabs">
              <button 
                className={`upload-assignment-upload-quick-tab-btn ${quickInputActiveTab === 'answer' ? 'active' : ''}`}
                onClick={() => setQuickInputActiveTab('answer')}
              >
                Đáp án
              </button>
              <button 
                className={`upload-assignment-upload-quick-tab-btn ${quickInputActiveTab === 'score' ? 'active' : ''}`}
                onClick={() => setQuickInputActiveTab('score')}
              >
                Điểm
              </button>
            </div>
            <div className="upload-assignment-upload-quick-input-content">
              {quickInputActiveTab === 'answer' ? (
                <>
                  <p className="upload-assignment-upload-quick-input-instruction">
                    Chuỗi đáp án viết liền không dấu (vd: ACDABCAD). Mỗi ký tự là 1 đáp án!
                  </p>
                  <textarea 
                    className="upload-assignment-upload-quick-input-textarea"
                    placeholder="Nhập chuỗi đáp án..."
                    rows="4"
                    value={quickInputText}
                    onChange={(e) => setQuickInputText(e.target.value)}
                  />
                  <p className="upload-assignment-upload-quick-input-counter">
                    Bạn sẽ tạo ra {getAnswerCount()} đáp án
                  </p>
                </>
              ) : (
                <>
                  {numberOfQuestions === 0 ? (
                    <p className="upload-assignment-upload-quick-input-error">
                      Hãy nhập số câu cho bài tập trước
                    </p>
                  ) : (
                    <>
                      <p className="upload-assignment-upload-quick-input-instruction">
                        Điểm từng câu ngăn cách bởi dấu ;
                      </p>
                      <p className="upload-assignment-upload-quick-input-instruction">
                        Bạn có thể dùng dấu * để nhập cho nhiều câu
                      </p>
                      <p className="upload-assignment-upload-quick-input-instruction">
                        VD: 4;6;2.5*10; (4 điểm ; 6 điểm ; 10 câu 2,5 điểm)
                      </p>
                      <textarea 
                        className="upload-assignment-upload-quick-input-textarea"
                        placeholder="Nhập điểm..."
                        rows="4"
                        value={quickInputScoreText}
                        onChange={(e) => setQuickInputScoreText(e.target.value)}
                      />
                    </>
                  )}
                </>
              )}
            </div>
            <div className="upload-assignment-upload-quick-input-footer">
              <button 
                className="upload-assignment-upload-quick-input-cancel" 
                onClick={() => setShowQuickInputModal(false)}
              >
                Hủy
              </button>
              <button 
                className="upload-assignment-upload-quick-input-confirm" 
                onClick={handleQuickInputApply}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadAssignmentPage; 