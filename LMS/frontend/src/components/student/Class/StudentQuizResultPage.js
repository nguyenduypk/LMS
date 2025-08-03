import React, { useState } from 'react';
import DocumentViewer from './DocumentViewer';
import '../../../styles/StudentQuizResultPage.css';
function StudentQuizResultPage() {
  // Dữ liệu mẫu
  const [showSolution, setShowSolution] = useState(false);
  const [attempt, setAttempt] = useState(7);
  const [tab, setTab] = useState('result');
  const [isAttemptDropdownOpen, setIsAttemptDropdownOpen] = useState(false);
  const totalQuestions = 10;
  const correct = 0;
  const wrong = 0;
  const notDone = 5;
  const time = 40 * 60 + 46; // 40 phút 46 giây
  const submitTime = '22 tháng 7 lúc 17:24';
  const answers = [
    { num: 1, chosen: '-', correct: 'a', score: 2 },
    { num: 2, chosen: '-', correct: 'b', score: 2 },
    { num: 3, chosen: '-', correct: 'c', score: 2 },
    { num: 4, chosen: '-', correct: 'd', score: 2 },
    { num: 5, chosen: '-', correct: 'a', score: 2 },
    { num: 6, chosen: '-', correct: 'b', score: 2 },
    { num: 7, chosen: '-', correct: 'c', score: 2 },
    { num: 8, chosen: '-', correct: 'd', score: 2 },
    { num: 9, chosen: '-', correct: 'a', score: 2 },
    { num: 10, chosen: '-', correct: 'b', score: 2 },
  ];

  // Dữ liệu mẫu lịch sử cho từng lần làm bài
  const historyEventsByAttempt = {
    1: [
      { type: 'leave', time: '22/07/2024 16:10:12' },
      { type: 'return', time: '22/07/2024 16:12:05' },
    ],
    2: [
      { type: 'leave', time: '22/07/2024 16:20:00' },
      { type: 'return', time: '22/07/2024 16:21:30' },
      { type: 'leave', time: '22/07/2024 16:25:00' },
      { type: 'return', time: '22/07/2024 16:26:10' },
    ],
    3: [],
    4: [
      { type: 'leave', time: '22/07/2024 17:10:12' },
      { type: 'return', time: '22/07/2024 17:12:05' },
      { type: 'leave', time: '22/07/2024 17:20:00' },
      { type: 'return', time: '22/07/2024 17:21:30' },
    ],
    5: [],
    6: [],
    7: [
      { type: 'leave', time: '22/07/2024 18:00:00' },
      { type: 'return', time: '22/07/2024 18:01:00' },
    ],
    8: [],
    9: [],
    10: [],
  };
  const historyEvents = historyEventsByAttempt[attempt] || [];
  const leaveCount = historyEvents.filter(e => e.type === 'leave').length;

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

  return (
    <div className="student-quiz-layout" style={{ gap: 0 }}>
      {/* Bên trái: Viewer tài liệu */}
      <div className="student-quiz-left" style={{ height: '100vh', width: '100%', padding: 0, margin: 0, display: 'flex', alignItems: 'stretch', justifyContent: 'stretch' }}>
        <DocumentViewer
          src="https://view.officeapps.live.com/op/embed.aspx?src=https%3A%2F%2Fshub-storage.shub.edu.vn%2Ftests%2F3301349%2Ffile_url%2F1752139174477_qpan.docx"
          title="Word Viewer"
        />
      </div>
      {/* Bên phải: Kết quả */}
      <div className="student-quiz-right-placeholder student-quiz-right">
       
      
        <div style={{ marginTop: 16, marginBottom: 8 }}>
          <select
            className={`quiz-result-attempt-select${isAttemptDropdownOpen ? ' select--open' : ''}`}
            value={attempt}
            onChange={e => setAttempt(Number(e.target.value))}
            onClick={() => setIsAttemptDropdownOpen(open => !open)}
            onBlur={() => setIsAttemptDropdownOpen(false)}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i+1} value={i+1}>{`Lần làm bài ${i+1}`}</option>
            ))}
          </select>
        </div>
        <div className="quiz-result-tabs">
          <button
            className={`quiz-result-tab${tab === 'result' ? ' active' : ''}`}
            onClick={() => setTab('result')}
          >
            Kết quả
          </button>
          <button
            className={`quiz-result-tab${tab === 'history' ? ' active' : ''}`}
            onClick={() => setTab('history')}
          >
            Lịch sử
          </button>
        </div>
        {tab === 'result' && (
          <>
            <div className="quiz-result-score-box">0 / 10</div>
            <div className="quiz-result-info-block">
              <div className="quiz-result-info-row">
                <span className="quiz-result-info-label">Thời gian</span>
                <span className="quiz-result-info-value">{formatTime(time)}</span>
              </div>
              <div className="quiz-result-info-row">
                <span className="quiz-result-info-label">Nộp lúc</span>
                <span className="quiz-result-info-value">{submitTime}</span>
              </div>
              <div className="quiz-result-info-row">
                <span className="quiz-result-info-label-group">
                  <span className="quiz-result-dot green"></span>
                  <span className="quiz-result-info-label">Số câu đúng</span>
                </span>
                <span className="quiz-result-info-value">{correct}</span>
              </div>
              <div className="quiz-result-info-row">
                <span className="quiz-result-info-label-group">
                  <span className="quiz-result-dot red"></span>
                  <span className="quiz-result-info-label">Số câu sai</span>
                </span>
                <span className="quiz-result-info-value">{wrong}</span>
              </div>
              <div className="quiz-result-info-row not-done">
                <span className="quiz-result-info-label-group">
                  <span className="quiz-result-dot gray"></span>
                  <span className="quiz-result-info-label">Chưa làm</span>
                </span>
                <span className="quiz-result-info-value">{notDone}</span>
              </div>
            </div>
            <div className="quiz-result-table-container">
              <div className="quiz-result-table-title">Phiếu bài làm</div>
              <table className="quiz-result-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Câu</th>
                    <th>Chọn</th>
                    <th>Đáp án đúng</th>
                    <th>Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {answers.map(a => (
                    <tr key={a.num}>
                      <td>
                        <span className="quiz-result-dot gray"></span>
                      </td>
                      <td>{a.num}</td>
                      <td style={{ color: '#898ea0' }}>{a.chosen}</td>
                      <td>{a.correct}</td>
                      <td>({a.score})</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {tab === 'history' && (
          <>
            <div className="history-summary-box" style={{border: '1px solid #e3eafc', borderRadius: 12, padding: 16, marginBottom: 16}}>
              <div style={{fontWeight: 600, marginBottom: 8}}>Tổng quan quá trình làm bài</div>
              <div>Số lần rời khỏi làm bài: {leaveCount}</div>
              <div>Số lần chỉnh sửa: 0</div>
            </div>
            <div className="history-detail-box">
              <div style={{fontWeight: 600, color: '#d32f2f', marginBottom: 8}}>
                <span style={{display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#d32f2f', marginRight: 8}}></span>
                Lịch sử làm bài
              </div>
              {historyEvents.length === 0 ? (
                <div style={{color: '#757575'}}>Không có dữ liệu để hiển thị. Học sinh có thể đã hoàn thành bài tập trước khi tính năng ra mắt.</div>
              ) : (
                <ul style={{paddingLeft: 0, listStyle: 'none'}}>
                  {historyEvents.map((event, idx) => (
                    <li key={idx} style={{marginBottom: 8, display: 'flex', alignItems: 'center'}}>
                      <span style={{
                        display: 'inline-block',
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: event.type === 'leave' ? '#d32f2f' : '#388e3c',
                        marginRight: 8
                      }}></span>
                      <span>
                        {event.type === 'leave' ? 'Rời khỏi trang' : 'Quay lại trang'}: <b>{event.time}</b>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StudentQuizResultPage; 