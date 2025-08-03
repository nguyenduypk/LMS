import React, { useState } from 'react';
import '../../styles/ClassHwQuizPage.css';
import { useNavigate } from 'react-router-dom';

const MOCK_QUESTIONS = [
  {
    id: 1,
    text: 'Số nào liền sau số 9?',
    options: ['10', '9', '11', '8'],
  },
  {
    id: 2,
    text: '5 - 2 bằng bao nhiêu?',
    options: ['3', '2', '5', '4'],
  },
];

const MOCK_HOMEWORK = {
  title: 'Toán lớp 1',
  type: 'Trắc nghiệm',
  duration: 1200, // giây
};

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m} phút ${s < 10 ? '0' : ''}${s} giây`;
}

function ConfirmModal({ open, onClose, onConfirm, message, confirmColor = 'blue' }) {
  if (!open) return null;
  return (
    <div className="hwquiz-modal-backdrop">
      <div className="hwquiz-modal">
        <div className="hwquiz-modal-message">{message}</div>
        <div className="hwquiz-modal-actions">
          <button className="hwquiz-modal-cancel" onClick={onClose}>Thoát</button>
          <button
            className={`hwquiz-modal-confirm ${confirmColor === 'red' ? 'red' : 'blue'}`}
            onClick={() => { onConfirm(); onClose(); }}
          >
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
}

function ClassHwQuizPage() {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(MOCK_HOMEWORK.duration);
  const [modal, setModal] = useState({ open: false, type: null });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSelect = (qid, idx) => {
    setAnswers({ ...answers, [qid]: idx });
  };
  const handleClear = (qid) => {
    const newAns = { ...answers };
    delete newAns[qid];
    setAnswers(newAns);
  };

  const handleSubmit = () => setModal({ open: true, type: 'submit' });
  const handleLeave = () => setModal({ open: true, type: 'leave' });
  const handleConfirm = () => {
    if (modal.type === 'submit') {
      // Xử lý nộp bài ở đây
      navigate(`/class/toan10a1/homework/1/result`);
    } else if (modal.type === 'leave') {
      navigate('/class/toan10a1/homework');
    }
  };

  return (
    <div className="hwquiz-layout">
      <ConfirmModal
        open={modal.open}
        onClose={() => setModal({ open: false, type: null })}
        onConfirm={handleConfirm}
        message={modal.type === 'submit' ? 'Bạn có chắc chắn muốn nộp bài?' : 'Bạn có muốn thoát khỏi trang làm bài hiện tại ?'}
        confirmColor={modal.type === 'leave' ? 'red' : 'blue'}
      />
      <div className="hwquiz-main">
        <div className="hwquiz-title">Bài tập trắc nghiệm {MOCK_HOMEWORK.title}</div>
        {MOCK_QUESTIONS.map((q, i) => (
          <div className="hwquiz-question-block" key={q.id}>
            <div className="hwquiz-question-title">Câu {i + 1}</div>
            <div className="hwquiz-question-text">{q.text}</div>
            <div className="hwquiz-options">
              {q.options.map((opt, idx) => (
                <div
                  key={idx}
                  className={`hwquiz-option${answers[q.id] === idx ? ' selected' : ''}`}
                  onClick={() => handleSelect(q.id, idx)}
                >
                  <span className="hwquiz-option-label">{String.fromCharCode(65 + idx)}</span>
                  <span>{opt}</span>
                  {answers[q.id] === idx && (
                    <span className="hwquiz-option-clear" onClick={e => { e.stopPropagation(); handleClear(q.id); }}>✕</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="hwquiz-side">
        <div className="hwquiz-timer">
          Thời gian làm bài<br />
          <span className="hwquiz-timer-count">{formatTime(timeLeft)}</span>
        </div>
        <div className="hwquiz-info-card">
          <div className="hwquiz-info-title"><span className="hwquiz-info-icon">📝</span> {MOCK_HOMEWORK.title}</div>
        </div>
        <div className="hwquiz-instruct">
          <b>Câu 1 (1 điểm):</b><br />Chọn vào đáp án trong đề đáp án để trả lời
        </div>
        <div className="hwquiz-answer-sheet">
          <div className="hwquiz-answer-sheet-title">Phiếu trả lời</div>
          <div className="hwquiz-answer-list">
            {MOCK_QUESTIONS.map((q, i) => (
              <button
                key={q.id}
                className={`hwquiz-answer-btn${answers[q.id] !== undefined ? ' answered' : ''}`}
                onClick={() => {
                  const el = document.getElementById(`hwquiz-q${q.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                {i + 1}{answers[q.id] !== undefined ? `:${String.fromCharCode(65 + answers[q.id])}` : ''}
              </button>
            ))}
          </div>
        </div>
        <div className="hwquiz-actions">
          <button className="hwquiz-leave-btn" onClick={handleLeave}>Rời khỏi</button>
          <button className="hwquiz-submit-btn" onClick={handleSubmit}>Nộp bài</button>
        </div>
      </div>
    </div>
  );
}

export default ClassHwQuizPage; 