import React, { useState } from 'react';
import '../styles/LandingPage.css';

function Banner() {
  return (
    <section className="banner">
      <div className="banner__content">
        <h1 className="banner__title">SHub Classroom – Nền tảng học trực tuyến</h1>
        <p className="banner__desc">Kết nối giáo viên – học sinh, giao bài tập, chấm điểm tự động</p>
        <button className="btn btn-primary banner__cta">Dùng thử miễn phí</button>
      </div>
      <div className="banner__image">
        <img src="https://via.placeholder.com/400x300?text=SHub+Classroom" alt="SHub Classroom" />
      </div>
    </section>
  );
}

const features = [
  { icon: '📝', title: 'Giao bài – chấm điểm' },
  { icon: '📊', title: 'Báo cáo tiến độ học tập' },
  { icon: '💬', title: 'Chat lớp học' },
  { icon: '🔗', title: 'Tích hợp Google/Zalo' },
];
function Features() {
  return (
    <section className="features" id="features">
      <h2 className="features__title">Tính năng nổi bật</h2>
      <div className="features__grid">
        {features.map((f, idx) => (
          <div className="feature" key={idx}>
            <div className="feature__icon">{f.icon}</div>
            <div className="feature__title">{f.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const partners = [
  { name: 'ĐH Bách Khoa HN', logo: 'https://upload.wikimedia.org/wikipedia/vi/9/9f/Logo_DHBKHN.png' },
  { name: 'ĐH Quốc Gia TP.HCM', logo: 'https://upload.wikimedia.org/wikipedia/vi/9/9e/Logo_VNUHCM.png' },
  { name: 'ĐH Sư Phạm TP.HCM', logo: 'https://upload.wikimedia.org/wikipedia/vi/2/2e/Logo_DHSP_TPHCM.png' },
  { name: 'Trường Marie Curie', logo: 'https://upload.wikimedia.org/wikipedia/vi/2/2c/Logo_Marie_Curie_HCM.png' },
  { name: 'Trung tâm Anh ngữ ILA', logo: 'https://ila.edu.vn/wp-content/uploads/2022/07/ila-logo.svg' },
  { name: 'Trung tâm VUS', logo: 'https://vus.edu.vn/assets/images/logo.png' },
];
function Partners() {
  return (
    <section className="partners" id="partners">
      <h2 className="partners__title">Đối tác đồng hành</h2>
      <div className="partners__list">
        {partners.map((p, idx) => (
          <div className="partner" key={idx}>
            <img src={p.logo} alt={p.name} />
          </div>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  { q: 'SHub Classroom phù hợp với ai?', a: 'SHub Classroom phù hợp cho giáo viên, học sinh, trường học và trung tâm giáo dục muốn quản lý lớp học, giao bài, chấm điểm tự động.' },
  { q: 'Có thể dùng thử miễn phí không?', a: 'Bạn có thể dùng thử miễn phí tất cả tính năng cơ bản của SHub Classroom.' },
  { q: 'SHub Classroom có hỗ trợ tích hợp Google/Zalo không?', a: 'Có, bạn có thể đăng nhập và đồng bộ dữ liệu với Google hoặc Zalo.' },
  { q: 'Dữ liệu có được bảo mật không?', a: 'SHub Classroom cam kết bảo mật tuyệt đối thông tin và dữ liệu người dùng.' },
];
function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="faq-section">
      <h2 className="faq-title">Câu hỏi thường gặp</h2>
      <div className="faq-list">
        {faqs.map((item, idx) => (
          <div className={`faq-item${open === idx ? ' open' : ''}`} key={idx}>
            <button className="faq-question" onClick={() => setOpen(open === idx ? null : idx)}>
              {item.q}
              <span className="faq-toggle">{open === idx ? '-' : '+'}</span>
            </button>
            <div className="faq-answer" style={{ display: open === idx ? 'block' : 'none' }}>{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const reviews = [
  { name: 'Nguyễn Văn A', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', content: 'SHub giúp lớp tôi quản lý bài tập và điểm số rất tiện lợi!' },
  { name: 'Trần Thị B', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', content: 'Tôi thích tính năng báo cáo tiến độ học tập, rất trực quan.' },
  { name: 'Lê Văn C', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', content: 'Giao diện đẹp, dễ dùng, hỗ trợ nhanh chóng.' },
];
function Review() {
  return (
    <section className="review-section">
      <h2 className="review-title">Người dùng nói gì về SHub Classroom?</h2>
      <div className="review-list">
        {reviews.map((r, idx) => (
          <div className="review-item" key={idx}>
            <img className="review-avatar" src={r.avatar} alt={r.name} />
            <div className="review-content">“{r.content}”</div>
            <div className="review-name">{r.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MainContent() {
  return (
    <main>
      <div className="landing-container">
        <Banner />
        <Features />
        <FAQ />
        <Review />
        <Partners />
      </div>
    </main>
  );
}

export default MainContent; 