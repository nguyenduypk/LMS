import React, { useState } from 'react';
import '../../../styles/StudentDashboard.css';
import '../../../styles/StudentQuizPage.css';
import '../../../styles/DocumentViewerPage.css';
import { MdVisibility, MdFullscreen } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import DocumentViewer from './DocumentViewer';

function StudentQuizPage() {
  // State cho đáp án từng câu (ví dụ 20 câu)
  const [answers, setAnswers] = useState(Array(20).fill(""));
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [timer, setTimer] = useState(0); // Thêm state cho timer
  const [showMuiModal, setShowMuiModal] = useState(false);
  const navigate = useNavigate();

  // useEffect để tăng timer mỗi giây
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Hàm format thời gian linh hoạt
  function formatTime(sec) {
    if (sec < 60) return `${sec} giây`;
    if (sec < 3600) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${m} phút${s > 0 ? ` ${s} giây` : ''}`;
    }
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return `${h} giờ${m > 0 ? ` ${m} phút` : ''}`;
  }

  // Mock dữ liệu nội dung Word
  const wordContent = `...`;

  // Khi chuyển câu, cập nhật selectedOption theo đáp án đã chọn
  React.useEffect(() => {
    setSelectedOption(answers[selectedQuestion - 1] || "");
  }, [selectedQuestion, answers]);

  // Xử lý chọn đáp án
  const handleOptionClick = (option) => {
    const newAnswers = [...answers];
    newAnswers[selectedQuestion - 1] = option;
    setAnswers(newAnswers);
    setSelectedOption(option);
  };

  // Xử lý nhập đáp án thủ công
  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-D]/g, '');
    const newAnswers = [...answers];
    newAnswers[selectedQuestion - 1] = value;
    setAnswers(newAnswers);
    setSelectedOption(value);
  };

  // Chuyển câu hỏi
  const handleQuestionSelect = (idx) => {
    setSelectedQuestion(idx + 1);
  };

  return (
    <div>
      <div className="student-quiz-layout" style={{ gap: 0 }}>
        {/* Bên trái: Viewer tài liệu */}
        <div className="student-quiz-left" style={{ height: '100vh', width: '100%', padding: 0, margin: 0, display: 'flex', alignItems: 'stretch', justifyContent: 'stretch' }}>
          <DocumentViewer
            src="https://view.officeapps.live.com/op/embed.aspx?src=https%3A%2F%2Fshub-storage.shub.edu.vn%2Ftests%2F3301349%2Ffile_url%2F1752139174477_qpan.docx"
            title="Word Viewer"
          />
        </div>
        <div className="student-quiz-right-placeholder student-quiz-right">
          {/* Header thời gian + tên học sinh */}
          <div className="quiz-header-time" style={{ textAlign: 'center' }}>
            Thời gian làm bài<br />
            <span className="quiz-timer-value">{formatTime(timer)}</span>
          </div>
          <div className="quiz-student-box">
            <span className="quiz-student-avatar">W</span>
            <span className="quiz-student-name">Máuonaldo</span>
          </div>
          <div className="quiz-question-title">Câu {selectedQuestion} (2 điểm):</div>
          <div className="quiz-question-desc">Nhập đáp án để trả lời</div>
          <div className="quiz-answer-sheet-label">Phiếu trả lời</div>
          <div className="quiz-answer-sheet">
            {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`quiz-answer-cell${selectedQuestion === num ? ' selected' : ''}${answers[num-1] ? ' answered' : ''}`}
                onClick={() => setSelectedQuestion(num)}
              >
                {num}{answers[num - 1] ? `:${answers[num - 1]}` : ''}
              </button>
            ))}
          </div>
          <div className="quiz-sticky-footer">
            <input
              className="quiz-answer-box"
              placeholder={`Đáp án câu ${selectedQuestion}: A, B, C, D...`}
              value={answers[selectedQuestion - 1] || ""}
              onChange={handleInputChange}
            />
            <div className="quiz-options-row">
              <button className="quiz-option-btn" onClick={() => handleOptionClick('A')}>A</button>
              <button className="quiz-option-btn" onClick={() => handleOptionClick('B')}>B</button>
              <button className="quiz-option-btn" onClick={() => handleOptionClick('C')}>C</button>
              <button className="quiz-option-btn" onClick={() => handleOptionClick('D')}>D</button>
            </div>
            <div className="quiz-actions">
              <button className="quiz-btn leave" onClick={() => setShowMuiModal(true)}>Rời khỏi</button>
              <button className="quiz-btn submit" onClick={() => navigate('/class/OURLC/homework/result')}>Nộp bài</button>
            </div>
          </div>
        </div>
      </div>
      {showMuiModal && (
        <div className="mui-modal-overlay">
          <div className="mui-modal-content">
            <div className="mui-modal-title">Lưu ý</div>
            <hr className="mui-modal-divider" style={{ marginBottom: 8 }} />
            <div className="mui-modal-body">
              Rời khỏi sẽ tính vào số lần rời màn hình làm bài. Bạn có muốn thoát khỏi trang làm bài hiện tại ?
            </div>
            <hr className="mui-modal-divider" style={{ margin: '8px 0' }} />
            <div className="mui-modal-actions">
              <button className="mui-btn mui-btn-cancel" onClick={() => setShowMuiModal(false)}>Thoát</button>
              <button className="mui-btn mui-btn-confirm" onClick={() => { setShowMuiModal(false); navigate('/class/OURLC/homework'); }}>Đồng ý</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentQuizPage;
