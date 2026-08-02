import React, { useState, useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';
import GradeSelector from './GradeSelector';

// UI 텍스트 상수를 분리하여 추후 다국어(i18n) 확장에 대비
const UI_TEXT = {
  ko: {
    selectHanja: '왼쪽 목록에서 한자를 선택하세요.',
    autoPlay: '자동 재생',
    quizMode: '직접 쓰기 (퀴즈)',
    reset: '초기화',
    gradeFilter: '급수',
    searchPlaceholder: '한자, 음, 뜻 검색...',
    noData: '검색 결과가 없습니다.'
  }
};
// 현재 언어 (추후 전역 상태로 확장 가능)
const currentLang = 'ko';
const t = UI_TEXT[currentLang];

export default function StrokePractice({
  selectedGrade,
  setSelectedGrade,
  searchQuery,
  setSearchQuery,
  filteredHanjaList,
}) {
  const [selectedHanja, setSelectedHanja] = useState(null);
  const [mode, setMode] = useState('animate'); // 'animate' | 'quiz'
  const writerRef = useRef(null);
  const containerRef = useRef(null);

  // 급수가 변경되거나 검색어가 변경될 때 첫 번째 한자 자동 선택 방지 (사용자가 직접 선택하도록 유도)
  useEffect(() => {
    // If the currently selected Hanja is no longer in the filtered list, deselect it
    if (selectedHanja && !filteredHanjaList.find((h) => h.id === selectedHanja.id)) {
      setSelectedHanja(null);
    }
  }, [filteredHanjaList, selectedHanja]);

  useEffect(() => {
    if (!containerRef.current || !selectedHanja) return;

    containerRef.current.innerHTML = ''; // 이전 인스턴스 초기화

    const writer = HanziWriter.create(containerRef.current, selectedHanja.character, {
      width: 320,
      height: 320,
      padding: 15,
      showOutline: true,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 150,
      strokeColor: '#334155', // 진한 회색 (획)
      radicalColor: '#16a34a', // 부수 색상 (선택적)
      outlineColor: '#e2e8f0', // 외곽선 연회색
      drawingColor: '#e11d48', // 퀴즈 모드 펜 색상
      showHintAfterMisses: 2, // 2번 틀리면 힌트 표시
      charDataLoader: (char, onComplete) => {
        fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${encodeURIComponent(char)}.json`)
          .then(res => {
            if (!res.ok) throw new Error('Not found');
            return res.json();
          })
          .then(data => onComplete(data))
          .catch(() => {
            onComplete(null);
          });
      }
    });
    
    writerRef.current = writer;

    // 모드에 따라 실행
    if (mode === 'animate') {
      writer.animateCharacter();
    } else if (mode === 'quiz') {
      writer.quiz();
    }

    return () => {
      try {
        writer.cancelAnimation();
        writer.cancelQuiz();
      } catch (e) {}
    };
  }, [selectedHanja, mode]);

  const handleReplay = () => {
    if (writerRef.current) {
      if (mode === 'animate') {
        writerRef.current.cancelAnimation();
        writerRef.current.animateCharacter();
      } else {
        writerRef.current.cancelQuiz();
        writerRef.current.quiz();
      }
    }
  };

  return (
    <div className="stroke-practice-container no-print">
      <div className="stroke-sidebar">
        <div className="stroke-controls-top">
          <GradeSelector selectedGrade={selectedGrade} setSelectedGrade={setSelectedGrade} />
          <div className="search-box stroke-search">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="stroke-hanja-list">
          {filteredHanjaList.length > 0 ? (
            filteredHanjaList.map((hanja) => (
              <button
                key={hanja.id}
                className={`stroke-hanja-btn ${selectedHanja?.id === hanja.id ? 'active' : ''}`}
                onClick={() => setSelectedHanja(hanja)}
              >
                <div className="s-char">{hanja.character}</div>
                <div className="s-huneum">{hanja.hun} {hanja.eum}</div>
              </button>
            ))
          ) : (
            <div className="empty-state">{t.noData}</div>
          )}
        </div>
      </div>

      <div className="stroke-viewer-area">
        {selectedHanja ? (
          <div className="stroke-viewer-card">
            <div className="viewer-header">
              <h2>{selectedHanja.character}</h2>
              <span className="viewer-huneum">{selectedHanja.hun} {selectedHanja.eum}</span>
              <span className="viewer-grade badge">{selectedHanja.grade}</span>
            </div>
            
            <div className="viewer-canvas-wrap">
              <div ref={containerRef} className="hanzi-canvas"></div>
            </div>

            <div className="viewer-actions">
              <div className="mode-tabs">
                <button 
                  className={`mode-btn ${mode === 'animate' ? 'active' : ''}`}
                  onClick={() => setMode('animate')}
                >
                  {t.autoPlay}
                </button>
                <button 
                  className={`mode-btn ${mode === 'quiz' ? 'active' : ''}`}
                  onClick={() => setMode('quiz')}
                >
                  {t.quizMode}
                </button>
              </div>
              <button className="replay-btn" onClick={handleReplay}>
                {t.reset}
              </button>
            </div>
          </div>
        ) : (
          <div className="viewer-empty-state">
            <p>{t.selectHanja}</p>
          </div>
        )}
      </div>
    </div>
  );
}
