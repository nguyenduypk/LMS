import React, { useState } from 'react';
import '../../styles/ClassHwResultPage.css';
import { useNavigate } from 'react-router-dom';

const MOCK_QUESTIONS = [
  {
    id: 1,
    text: 'Số nào liền sau số 9?',
    options: ['10', '9', '11', '8'],
    correct: 0,
    user: 1,
  },
  {
    id: 2,
    text: 'Số nào lớn hơn: 7 hay 5?',
    options: ['5', '6', '7', '4'],
    correct: 2,
    user: 1,
  },
  {
    id: 3,
    text: '10 - 4 bằng bao nhiêu?',
    options: ['6', '5', '4', '3'],
    correct: 0,
    user: null,
  },
];

const MOCK_RESULT = {
  total: 3,
  correct: 1,
  wrong: 1,
  unanswer: 1,
  score: 1,
  maxScore: 3,
  time: '38 phút 9 giây',
  submitAt: '10 tháng 7 lúc 17:03',
};

function ConfirmModal({ open, onClose, onConfirm, message }) {
  if (!open) return null;
  return (
    <div className="hwquiz-modal-backdrop">
      <div className="hwquiz-modal">
        <div className="hwquiz-modal-message">{message}</div>
        <div className="hwquiz-modal-actions">
          <button className="hwquiz-modal-cancel" onClick={onClose}>Quay lại</button>
          <button className="hwquiz-modal-confirm blue" onClick={onConfirm}>Đồng ý</button>
        </div>
      </div>
    </div>
  );
}

function ClassHwResultPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState({ open: false, type: null });
  const handleLeave = () => setModal({ open: true, type: 'leave' });
  const handleRetry = () => setModal({ open: true, type: 'retry' });
  const handleConfirm = () => {
    if (modal.type === 'leave') {
      navigate('/class/toan10a1/homework');
    } else if (modal.type === 'retry') {
      navigate('/class/toan10a1/homework/1/quiz');
    }
  };
  return (
    <div className="hwres-layout">
      <ConfirmModal
        open={modal.open}
        onClose={() => setModal({ open: false, type: null })}
        onConfirm={handleConfirm}
        message={modal.type === 'retry' ? 'Bạn có muốn làm lại bài này?' : 'Bạn có muốn thoát khỏi trang kết quả này?'}
      />
      <div className="hwres-main">
        <div className="hwres-title">Bài tập &gt; Toán lớp 1</div>
        {MOCK_QUESTIONS.map((q, i) => (
          <div className="hwres-question-block" key={q.id}>
            <div className="hwres-question-title">Câu {i + 1}</div>
            <div className="hwres-question-text">{q.text}</div>
            <div className="hwres-options">
              {q.options.map((opt, idx) => {
                let status = '';
                if (q.user === idx && idx === q.correct) status = 'correct';
                else if (q.user === idx && idx !== q.correct) status = 'wrong';
                else if (idx === q.correct) status = 'answer';
                return (
                  <div
                    key={idx}
                    className={`hwres-option${status ? ' ' + status : ''}`}
                  >
                    <span className="hwres-option-label">{String.fromCharCode(65 + idx)}</span>
                    <span>{opt}</span>
                    {status === 'correct' && <span className="hwres-option-icon">✔</span>}
                    {status === 'wrong' && <span className="hwres-option-icon wrong">✗</span>}
                    {status === 'answer' && <span className="hwres-option-icon answer">Đáp án</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="hwres-side">
        <div className="hwres-score-card">
          <div className="hwres-score-title">Kết quả</div>
          <div className="hwres-score-main">{MOCK_RESULT.score} / {MOCK_RESULT.maxScore}</div>
          <div className="hwres-score-info">
            <div>Thời gian: <b>{MOCK_RESULT.time}</b></div>
            <div>Nộp lúc: <b>{MOCK_RESULT.submitAt}</b></div>
            <div style={{marginTop:8}}>
              <span className="hwres-dot correct"></span> Số câu đúng: {MOCK_RESULT.correct}<br/>
              <span className="hwres-dot wrong"></span> Số câu sai: {MOCK_RESULT.wrong}<br/>
              <span className="hwres-dot unanswer"></span> Chưa làm: {MOCK_RESULT.unanswer}
            </div>
          </div>
        </div>
        <div className="hwres-answer-sheet">
          <div className="hwres-answer-sheet-title">Phiếu bài làm</div>
          <table className="hwres-answer-table">
            <thead>
              <tr>
                <th>Câu</th>
                <th>Chọn</th>
                <th>Đáp án đúng</th>
                <th>Điểm</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_QUESTIONS.map((q, i) => (
                <tr key={q.id}>
                  <td>{i + 1}</td>
                  <td>{q.user !== null ? String.fromCharCode(65 + q.user) : '-'}</td>
                  <td>{String.fromCharCode(65 + q.correct)}</td>
                  <td>(1)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="hwres-actions">
          <button className="hwres-leave-btn" onClick={handleLeave}>Thoát</button>
          <button className="hwres-retry-btn" onClick={handleRetry}>Làm lại</button>
        </div>
      </div>
    </div>
  );
}

export default ClassHwResultPage; 