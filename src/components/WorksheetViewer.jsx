import React, { useState, useEffect, useMemo } from 'react';
import { Printer, X, FileCheck, Grid, AlignLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import PrintWorksheet, { groupWordsIntoGridPages } from './PrintWorksheet';

export default function WorksheetViewer({
  selectedHanjaList = [],
  selectedWordList = [],
  isWordMode = false,
  onClose
}) {
  const [printMode, setPrintMode] = useState(isWordMode ? 'word-summary' : 'single'); // 'word-summary' | 'word-row' | 'single' | 'summary'
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

  const wordCount = selectedWordList.length;
  const hanjaCount = selectedHanjaList.length;

  const allChars = useMemo(() => {
    return isWordMode ? selectedWordList.flatMap((w) => w.chars || []) : [];
  }, [isWordMode, selectedWordList]);

  const wordGridPages = useMemo(() => {
    return isWordMode ? groupWordsIntoGridPages(selectedWordList, 6) : [];
  }, [isWordMode, selectedWordList]);

  // Compute total pages based on current mode
  let totalPages = 1;
  if (isWordMode) {
    totalPages = Math.max(1, wordGridPages.length);
  } else {
    totalPages = printMode === 'single' ? Math.max(1, hanjaCount) : 1;
  }

  const maxPage = totalPages - 1;

  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(maxPage, p + 1));

  return (
    <div className="worksheet-preview-container">
      {/* Top Toolbar (Hidden when printing) */}
      <div className="preview-toolbar no-print">
        {/* Row 1: Title & Primary Actions */}
        <div className="preview-toolbar-top">
          <div className="toolbar-title">
            <FileCheck size={20} style={{ color: isWordMode ? '#a78bfa' : '#10b981' }} />
            <span>{isWordMode ? '단어 학습지 인쇄 미리보기' : '학습지 인쇄 미리보기'}</span>
            <span className="toolbar-badge">
              {isWordMode ? (
                <>단어 <strong>{wordCount}개</strong> (총 {allChars.length}자) · <strong>{totalPages}장</strong></>
              ) : (
                <>한자 <strong>{hanjaCount}개</strong> · <strong>{totalPages}장</strong></>
              )}
            </span>
          </div>

          <div className="toolbar-actions-primary">
            {!isWordMode && totalPages > 1 && (
              <div className="toolbar-pagination">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 0}
                  className="pagination-btn"
                  title="이전 페이지"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="pagination-text">{currentPage + 1} / {totalPages}</span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === maxPage}
                  className="pagination-btn"
                  title="다음 페이지"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            <button
              className="btn-primary btn-print"
              onClick={handlePrint}
              style={{
                background: isWordMode ? '#7c3aed' : undefined,
                borderColor: isWordMode ? '#6d28d9' : undefined
              }}
            >
              <Printer size={17} />
              <span>{isWordMode ? `단어 학습지 ${totalPages}장 인쇄하기` : `선택한 ${hanjaCount}개 인쇄하기`}</span>
            </button>

            <button
              className="btn-secondary btn-close"
              onClick={onClose}
              title="미리보기 닫기"
            >
              <X size={17} />
              <span>닫기</span>
            </button>
          </div>
        </div>

        {/* Row 2: Word Mode Tabs & Page Controls (when in Word Mode) */}
        {isWordMode && (
          <div className="preview-toolbar-sub">
            <div className="word-mode-tabs">
              <span className="mode-tabs-label">학습지 형태:</span>
              <div className="mode-tabs-group">
                <button
                  className={`mode-tab-btn ${printMode === 'word-summary' ? 'active' : ''}`}
                  onClick={() => setPrintMode('word-summary')}
                  title="1행에 단어 6글자가 나열되고 아래 5행에 걸쳐 36칸 전체를 채우는 가로 쓰기"
                >
                  <Grid size={15} />
                  <span>단어 가로쓰기 (36칸 채움)</span>
                </button>

                <button
                  className={`mode-tab-btn ${printMode === 'word-row' ? 'active' : ''}`}
                  onClick={() => setPrintMode('word-row')}
                  title="한 줄(6칸)에 1글자씩 보기 1칸 + 쓰기 5칸으로 구성되어 A4 전체 6글자를 채우는 방식"
                >
                  <AlignLeft size={15} />
                  <span>글자별 한 줄 쓰기</span>
                </button>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="toolbar-pagination">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 0}
                  className="pagination-btn"
                  title="이전 페이지"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="pagination-text">{currentPage + 1} / {totalPages} 페이지</span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === maxPage}
                  className="pagination-btn"
                  title="다음 페이지"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Printable Sheet Body */}
      <div className="preview-body">
        <PrintWorksheet
          selectedHanjaList={selectedHanjaList}
          selectedWordList={selectedWordList}
          isWordMode={isWordMode}
          printMode={printMode}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
