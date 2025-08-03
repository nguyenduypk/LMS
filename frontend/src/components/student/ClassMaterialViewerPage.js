import React from 'react';
import DashboardHeader from './DashboardHeader';
import ClassSidebar from './ClassSidebar';
import '../../styles/ClassMaterialsPage.css';
import { useParams, useNavigate } from 'react-router-dom';

const MOCK_CLASS = {
  name: 'Toán 10A1',
  code: 'MATH10A1',
  teacher: 'Nguyễn Văn B',
};

function ClassMaterialViewerPage() {
  const { classCode, materialId } = useParams();
  const navigate = useNavigate();

  // Mock dữ liệu tài liệu
  const material = {
    id: materialId,
    name: 'qpan.docx',
    content: `Chiến tranh đã mang lại cho con người nhiều khổ đau, mất mát...\n\nTiếp tục : https://luathoangphi.vn/bai-thu-hoach-tang-chung-tich-chien-tranh/`,
  };

  return (
    <>
      <DashboardHeader />
      <div className="mat-layout">
        <ClassSidebar classInfo={MOCK_CLASS} selected="materials" />
        <main className="mat-main">
          <div className="mat-title">
            <span style={{ color: '#888', fontWeight: 400, cursor: 'pointer' }} onClick={() => navigate(-1)}>Tài liệu</span>
            <span style={{ margin: '0 8px' }}>{'>'}</span>
            <span>{material.name}</span>
          </div>
          <div className="mat-viewer-content">
            <div className="mat-viewer-toolbar">
              <button className="mat-download-btn">⬇️ Tải xuống</button>
            </div>
            <div className="mat-viewer-box">
              <div className="mat-viewer-doc">
                {material.content.split('\n').map((line, idx) => (
                  <div key={idx} style={{ marginBottom: 8 }}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ClassMaterialViewerPage; 