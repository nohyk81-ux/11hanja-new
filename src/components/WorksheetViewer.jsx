import React, { useState, useEffect } from 'react';
import { Printer, X, FileCheck, Layers, Grid, ChevronLeft, ChevronRight } from 'lucide-react';
import PrintWorksheet from './PrintWorksheet';

export default function WorksheetViewer({ selectedHanjaList, onClose }) {
  const [printMode, setPrintMode] = useState('single'); // 'single' | 'summary'
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // When mode changes, reset page
  useEffect(() => {
    setCurrentPage(0);
  }, [printMode]);

  const handlePrint = () => {
    window.print();
  };

  const count = selectedHanjaList.length;
  const maxPage = printMode === 'single' ? count - 1 : 0;

  const handlePrev = () => setCurrentPage(p => Math.max(0, p - 1));
  const handleNext = () => setCurrentPage(p => Math.min(maxPage, p + 1));

  return (
    <div className="worksheet-preview-container">
      {/* Top Toolbar (Hidden when printing) */}
      <div className="preview-toolbar no-print">
        <div className="toolbar-title">
          <FileCheck size={20} className="text-primary" />
          <span>
            학습지 인쇄 미리보기 (선택한 한자: <strong style={{ color: '#10b981' }}>{count}개</strong> 생성됨)
          </span>
        </div>

        <div className="preview-toolbar-actions" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>


          {/* Pagination Controls */}
          {printMode === 'single' && count > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', marginRight: '0.5rem' }}>
              <button 
                onClick={handlePrev} 
                disabled={currentPage === 0} 
                style={{ background: 'transparent', border: 'none', color: currentPage === 0 ? '#475569' : '#fff', cursor: currentPage === 0 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronLeft size={20} />
              </button>
              <span style={{ fontSize: '0.9rem', minWidth: '40px', textAlign: 'center' }}>{currentPage + 1} / {count}</span>
              <button 
                onClick={handleNext} 
                disabled={currentPage === maxPage} 
                style={{ background: 'transparent', border: 'none', color: currentPage === maxPage ? '#475569' : '#fff', cursor: currentPage === maxPage ? 'not-allowed' : 'pointer' }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          <button className="btn-primary" onClick={handlePrint}>
            <Printer size={18} />
            선택한 {count}개 인쇄하기
          </button>

          <button
            className="btn-secondary"
            style={{ background: '#334155', color: '#fff', border: 'none' }}
            onClick={onClose}
          >
            <X size={18} />
            닫기
          </button>
        </div>
      </div>

      {/* Printable Sheet Body */}
      <div className="preview-body" >
        <PrintWorksheet selectedHanjaList={selectedHanjaList} printMode={printMode} currentPage={currentPage} />
      </div>
    </div>
  );
}
