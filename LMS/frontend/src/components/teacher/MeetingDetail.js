import React, { useState } from "react";
import Header from "./Header";
import "./MeetingDetail.css";
import { useNavigate } from "react-router-dom";

const MeetingDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("checked"); // "checked" hoặc "notchecked"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  
  // Dữ liệu mẫu
  const meeting = {
    title: "siuu",
    start: "16 tháng 7 lúc 7:00",
    end: "--",
  };

  // Dữ liệu mẫu học sinh
  const students = [
    { id: 1, name: "Nguyễn Khánh Dương Duy", class: "22DTH2C", checked: true, time: "1 tháng 8 lúc 12:42" },
    { id: 2, name: "Trần Thị B", class: "22DTH2C", checked: true, time: "1 tháng 8 lúc 12:45" },
    { id: 3, name: "Lê Văn C", class: "22DTH2C", checked: false },
    { id: 4, name: "Phạm Thị D", class: "22DTH2C", checked: true, time: "1 tháng 8 lúc 12:50" },
    { id: 5, name: "Hoàng Văn E", class: "22DTH2C", checked: false },
    { id: 6, name: "Vũ Thị F", class: "22DTH2C", checked: true, time: "1 tháng 8 lúc 12:55" },
    { id: 7, name: "Đặng Văn G", class: "22DTH2C", checked: false },
    { id: 8, name: "Bùi Thị H", class: "22DTH2C", checked: true, time: "1 tháng 8 lúc 13:00" },
    { id: 9, name: "Ngô Văn I", class: "22DTH2C", checked: false },
    { id: 10, name: "Lý Thị K", class: "22DTH2C", checked: true, time: "1 tháng 8 lúc 13:05" },
    { id: 11, name: "Hồ Văn L", class: "22DTH2C", checked: false },
    { id: 12, name: "Dương Thị M", class: "22DTH2C", checked: true, time: "1 tháng 8 lúc 13:10" },
    { id: 13, name: "Tạ Văn N", class: "22DTH2C", checked: false },
    { id: 14, name: "Lưu Thị O", class: "22DTH2C", checked: true, time: "1 tháng 8 lúc 13:15" },
    { id: 15, name: "Trịnh Văn P", class: "22DTH2C", checked: false },
    { id: 16, name: "Đinh Thị Q", class: "22DTH2C", checked: true, time: "1 tháng 8 lúc 13:20" },
    { id: 17, name: "Tô Văn R", class: "22DTH2C", checked: false },
    { id: 18, name: "Hà Thị S", class: "22DTH2C", checked: true, time: "1 tháng 8 lúc 13:25" },
    { id: 19, name: "Mai Văn T", class: "22DTH2C", checked: false },
    { id: 20, name: "Châu Thị U", class: "22DTH2C", checked: true, time: "1 tháng 8 lúc 13:30" },
  ];

  // Lọc học sinh theo tab và search
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.class.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "checked") {
      return student.checked && matchesSearch;
    } else {
      return !student.checked && matchesSearch;
    }
  });

  const checkedCount = students.filter(s => s.checked).length;
  const notCheckedCount = students.filter(s => !s.checked).length;

  // Xử lý chọn/bỏ chọn học sinh
  const handleSelectStudent = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  // Xử lý chọn tất cả
  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  // Xử lý điểm danh/hủy điểm danh
  const handleAttendanceAction = () => {
    if (activeTab === "checked") {
      // Hủy điểm danh
      console.log(`Hủy điểm danh ${selectedStudents.length} học sinh:`, selectedStudents);
      // TODO: Gọi API để hủy điểm danh
    } else {
      // Điểm danh
      console.log(`Điểm danh ${selectedStudents.length} học sinh:`, selectedStudents);
      // TODO: Gọi API để điểm danh
    }
    setSelectedStudents([]); // Reset selection sau khi thực hiện
  };

  return (
    <div className="meeting-detail-bg">
      <Header teacherName="Nguyễn Duy" />
      {/* Breadcrumb */}
      <div className="meeting-detail-breadcrumb-header">
        <div className="meeting-detail-breadcrumb-row">
          <span
            className="breadcrumb-link"
            onClick={() => navigate("/teacher/manageschedule")}
          >
            Danh sách lịch học
          </span>
          <span className="breadcrumb-sep"></span>
          <span className="breadcrumb-current">{meeting.title}</span>
        </div>
      </div>
      <div className="meeting-detail-main">
        {/* Bên trái: Thông tin phòng học */}
        <div className="meeting-detail-info-card-mui">
          <div className="meeting-detail-info-label-mui">Tên phòng học</div>
          <div className="meeting-detail-info-title-mui">{meeting.title}</div>
          <div className="meeting-detail-info-row-mui">
            <span className="meeting-detail-info-row-label-mui">Thời gian bắt đầu</span>
            <span className="meeting-detail-info-row-value-mui">{meeting.start}</span>
          </div>
          <div className="meeting-detail-info-row-mui">
            <span className="meeting-detail-info-row-label-mui">Thời gian kết thúc</span>
            <span className="meeting-detail-info-row-value-mui">{meeting.end}</span>
          </div>
          <button className="meeting-detail-end-btn-mui">Kết thúc phòng học</button>
        </div>
        {/* Bên phải: Quản lý điểm danh */}
        <div className="meeting-detail-content-mui">
          <div className="meeting-detail-toolbar-mui">
            <div className="meeting-detail-search-mui" style={{flex: 1}}>
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="meeting-detail-search-icon-mui" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </div>
            {selectedStudents.length > 0 && (
              <button className="meeting-detail-checkin-btn-mui" onClick={handleAttendanceAction}>
                {activeTab === "checked" ? (
                  <>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 6 6 18"/>
                      <path d="m6 6 12 12"/>
                    </svg>
                    Hủy điểm danh {selectedStudents.length} học sinh
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                    Điểm danh {selectedStudents.length} học sinh
                  </>
                )}
              </button>
            )}
          </div>
          <div className="meeting-detail-tabs-mui">
            <button
              className={`tab${activeTab === "checked" ? " active" : ""}`}
              onClick={() => setActiveTab("checked")}
            >
              Học sinh đã điểm danh <span>{checkedCount}</span>
            </button>
            <button
              className={`tab${activeTab === "notchecked" ? " active" : ""}`}
              onClick={() => setActiveTab("notchecked")}
            >
              Học sinh chưa điểm danh <span>{notCheckedCount}</span>
            </button>
          </div>
          
          {filteredStudents.length > 0 ? (
            <div className="meeting-detail-table-container-mui">
              <div className="meeting-detail-table-header-mui">
                <div className="meeting-detail-table-cell-mui header-cell">
                  <input 
                    type="checkbox" 
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={handleSelectAll}
                  />
                </div>
                <div className="meeting-detail-table-cell-mui header-cell">
                  Họ và tên
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
                <div className="meeting-detail-table-cell-mui header-cell">
                  Lớp
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
                <div className="meeting-detail-table-cell-mui header-cell">
                  Thời gian vào lớp
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </div>
              
              <div className="meeting-detail-table-body-mui">
                {filteredStudents.map(student => (
                  <div key={student.id} className="meeting-detail-table-row-mui">
                    <div className="meeting-detail-table-cell-mui">
                      <input 
                        type="checkbox" 
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                      />
                    </div>
                    <div className="meeting-detail-table-cell-mui">
                      <div className="meeting-detail-student-avatar-mui">
                        {student.name.split(' ').slice(-2).map(n => n[0]).join('')}
                      </div>
                      <span className="meeting-detail-student-name-mui">{student.name}</span>
                    </div>
                    <div className="meeting-detail-table-cell-mui">
                      {student.class}
                    </div>
                    <div className="meeting-detail-table-cell-mui">
                      {student.checked ? student.time : "--"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="meeting-detail-empty-mui">
              <img src="/img/hero-illustration.png" alt="Empty" />
              <p className="meeting-detail-empty-title-mui">Không tìm thấy học sinh trong danh sách</p>
              <p className="meeting-detail-empty-desc-mui">Danh sách học sinh sẽ hiển thị ở đây</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetail;
