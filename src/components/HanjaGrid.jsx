import React from 'react';
import { Search, Printer, CheckSquare, Square, FileText, Shuffle, X } from 'lucide-react';
import GradeSelector from './GradeSelector';
import HanjaCard from './HanjaCard';

export default function HanjaGrid({
  selectedGrade,
  setSelectedGrade,
  searchQuery,
  setSearchQuery,
  filteredHanjaList,
  selectedHanjaIds,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  onGenerateWorksheet,
  onRandom5Generate,
  getCountByGrade
}) {
  return (
    <div>
      {/* Control Bar: Grade selection & Top Right Search Box */}
      <div className="control-bar no-print">
        <div className="control-bar-header">
          <div className="section-title">
            <FileText className="text-primary" size={22} />
            급수별 한자 선택
          </div>

          {/* Top Right Search Box */}
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="글자, 뜻(훈), 음(소리) 검색 (예: 水, 불, 수)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                title="검색어 초기화"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Grade Tabs */}
        <GradeSelector
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          getCountByGrade={getCountByGrade}
        />
      </div>

      {/* Main Hanja Grid Box */}
      <div className="hanja-grid-container no-print">
        <div className="grid-status">
          <div className="status-text">
            <strong>{selectedGrade}</strong> 한자 목록 (총 <strong>{filteredHanjaList.length}</strong>자 /{' '}
            선택: <strong>{selectedHanjaIds.length}</strong>자)
          </div>

          <div className="action-buttons">
            <button className="btn-secondary" onClick={onSelectAll}>
              <CheckSquare size={16} />
              전체 선택
            </button>
            <button className="btn-secondary" onClick={onDeselectAll}>
              <Square size={16} />
              선택 해제
            </button>
            <button
              className="btn-primary"
              disabled={filteredHanjaList.length === 0}
              onClick={onGenerateWorksheet}
            >
              <Printer size={16} />
              선택 한자 학습지 생성하기
            </button>
            <button
              className="btn-random"
              disabled={filteredHanjaList.length === 0}
              onClick={onRandom5Generate}
              title={`${selectedGrade} 한자 중 5자를 랜덤으로 선택하여 학습지를 생성합니다`}
            >
              <Shuffle size={16} />
              랜덤 5자 출력하기
            </button>
          </div>
        </div>

        {/* 5 Cards Per Row Grid */}
        {filteredHanjaList.length > 0 ? (
          <div className="hanja-cards-row">
            {filteredHanjaList.map((item) => (
              <HanjaCard
                key={item.id}
                hanja={item}
                isSelected={selectedHanjaIds.includes(item.id)}
                onToggleSelect={onToggleSelect}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
            검색 결과가 없거나 해당 급수의 한자 데이터 준비 중입니다.
          </div>
        )}
      </div>
    </div>
  );
}
