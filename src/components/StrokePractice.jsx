import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, Layers, X, Shuffle } from 'lucide-react';
import * as HanziWriterModule from 'hanzi-writer';
import GradeSelector from './GradeSelector';
import { Helmet } from 'react-helmet-async';
import { seoData } from '../data/seoData';

const HanziWriter = HanziWriterModule.default || HanziWriterModule;
import { loadHanziData } from '../utils/hanziLoader';

// UI 텍스트 상수를 분리하여 추후 다국어(i18n) 확장에 대비
const UI_TEXT = {
  ko: {
    selectHanja: '목록에서 한자를 선택하세요.',
    autoPlay: '자동 재생',
    rePlay: '다시 재생',
    quizMode: '연습하기',
    reset: '초기화',
    gradeFilter: '급수',
    searchPlaceholder: '글자, 뜻(훈), 음(소리) 검색 (예: 水, 불, 수)',
    noData: '검색 결과가 없습니다.'
  }
};
// 현재 언어 (추후 전역 상태로 확장 가능)
const currentLang = 'ko';
const t = UI_TEXT[currentLang];

// 추후 업데이트 및 디자인 변경을 대비한 HanziWriter 전역 설정 객체
// 글자색 통일 요청에 따라 strokeColor와 radicalColor를 동일한 색상으로 설정함
const WRITER_CONFIG = {
  width: 320,
  height: 320,
  padding: 15,
  showOutline: true,
  strokeAnimationSpeed: 1,
  delayBetweenStrokes: 150,
  strokeColor: '#0f172a', // 기본 획 색상 (var(--dark)와 통일)
  radicalColor: '#0f172a', // 부수 색상 (var(--dark)와 통일)
  outlineColor: '#e2e8f0', // 외곽선 가이드 색상
  drawingColor: '#e11d48', // 퀴즈 모드에서 사용자가 그릴 때의 펜 색상
  showHintAfterMisses: 2, // 퀴즈 모드에서 2번 틀리면 힌트 표시
};

export default function StrokePractice({
  selectedGrade,
  searchQuery,
  setSearchQuery,
  filteredHanjaList,
  getCountByGrade,
}) {
  const [selectedHanja, setSelectedHanja] = useState(null);
  const [charData, setCharData] = useState(null);
  const [mode, setMode] = useState('animate'); // 'animate' | 'quiz'
  const [isAnimateDone, setIsAnimateDone] = useState(false);
  const [isQuizDone, setIsQuizDone] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const writerRef = useRef(null);
  const containerRef = useRef(null);
  const viewerContainerRef = useRef(null);

  useEffect(() => {
    if (selectedHanja && viewerContainerRef.current) {
      setTimeout(() => {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          viewerContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          viewerContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  }, [selectedHanja]);

  const handleRandomPractice = () => {
    if (filteredHanjaList.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredHanjaList.length);
      setSelectedHanja(filteredHanjaList[randomIndex]);
    }
  };

  // 급수가 변경되거나 검색어가 변경될 때 첫 번째 한자 자동 선택 방지 (사용자가 직접 선택하도록 유도)
  useEffect(() => {
    // If the currently selected Hanja is no longer in the filtered list, deselect it
    if (selectedHanja && !filteredHanjaList.find((h) => h.id === selectedHanja.id)) {
      setSelectedHanja(null);
    }
  }, [filteredHanjaList, selectedHanja]);

  const [activeStrokeIndex, setActiveStrokeIndex] = useState(-1);
  const cancelAnimRef = useRef(false);

  useEffect(() => {
    if (!writerRef.current || !charData || mode !== 'animate') return;
    
    let isCancelled = false;
    cancelAnimRef.current = false;
    setActiveStrokeIndex(-1);
    setIsAnimateDone(false);
    
    const animateAll = async () => {
      writerRef.current.hideCharacter();
      const numStrokes = charData.data.strokes.length;
      
      // 약간의 시작 딜레이
      await new Promise(r => setTimeout(r, 1000));
      
      for (let i = 0; i < numStrokes; i++) {
        if (isCancelled || cancelAnimRef.current) return;
        setActiveStrokeIndex(i); // 현재 그리기 시작한 획 번호
        await new Promise(resolve => writerRef.current.animateStroke(i, { onComplete: resolve }));
        if (isCancelled || cancelAnimRef.current) return;
        
        // 획 간 딜레이
        await new Promise(r => setTimeout(r, 200));
      }
      
      if (!isCancelled && !cancelAnimRef.current) {
        setIsAnimateDone(true);
      }
    };
    
    animateAll();
    
    return () => {
      isCancelled = true;
      cancelAnimRef.current = true;
      try {
        if (writerRef.current) writerRef.current.cancelAnimation();
      } catch (e) {}
    };
  }, [charData, mode, replayKey]);

  useEffect(() => {
    if (!containerRef.current || !selectedHanja) return;

    containerRef.current.innerHTML = ''; // 이전 인스턴스 초기화
    setIsAnimateDone(false);
    setIsQuizDone(false);
    setCharData(null); // 초기화
    setActiveStrokeIndex(-1);

    // 한자 문자를 NFKC 정규화하여 일부 한자(예: 륙) 재생 오류 방지
    const normalizedChar = selectedHanja.character.normalize('NFKC');

    // 화면 크기에 따라 한자 캔버스 크기 동적 조절
    const isMobile = window.innerWidth <= 768;
    const canvasSize = isMobile ? 250 : 320;

    const writer = HanziWriter.create(containerRef.current, normalizedChar, {
      ...WRITER_CONFIG,
      width: canvasSize,
      height: canvasSize,
      charDataLoader: (char, onComplete) => {
        loadHanziData(char, (data) => {
          setCharData({ data, canvasSize });
          onComplete(data);
        });
      }
    });
    
    writerRef.current = writer;

    // 퀴즈 모드일 때만 자동 실행 (animate 모드는 위의 useEffect에서 제어)
    if (mode === 'quiz') {
      writer.quiz({
        onComplete: () => {
          setIsQuizDone(true);
        }
      });
    }

    return () => {
      try {
        if (writer) {
          writer.cancelAnimation();
          writer.cancelQuiz();
        }
      } catch (e) {}
    };
  }, [selectedHanja, mode, replayKey]);

  const handleNextHanja = () => {
    if (!filteredHanjaList || filteredHanjaList.length === 0 || !selectedHanja) return;
    const currentIndex = filteredHanjaList.findIndex(h => h.id === selectedHanja.id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % filteredHanjaList.length;
      setSelectedHanja(filteredHanjaList[nextIndex]);
      // 다음 글자로 넘어가면 연습 모드 유지 및 초기화
      setMode('quiz');
      setIsQuizDone(false);
    }
  };

  const handleReplay = () => {
    if (mode === 'animate') {
      setIsAnimateDone(false);
      setReplayKey(prev => prev + 1);
    } else {
      if (!writerRef.current) return;
      setIsQuizDone(false);
      writerRef.current.cancelQuiz();
      writerRef.current.quiz({
        onComplete: () => setIsQuizDone(true)
      });
    }
  };

  const getStrokeStartPoints = () => {
    if (!charData || !charData.data || !charData.data.medians) return [];
    const size = charData.canvasSize;
    const padding = WRITER_CONFIG.padding;
    const innerSize = size - padding * 2;
    return charData.data.medians.map(median => {
      const startPoint = median[0];
      return {
        x: padding + (startPoint[0] / 1024) * innerSize,
        y: padding + ((1024 - startPoint[1]) / 1024) * innerSize,
      };
    });
  };

  const currentSeo = seoData[selectedGrade] || {
    title: `${selectedGrade} 한자 쓰기 연습`,
    description: `${selectedGrade} 무료 한자 쓰기 연습지 프린트`
  };

  return (
    <div>
      <Helmet>
        <title>{currentSeo.title} - 일일한자</title>
        <meta name="description" content={currentSeo.description} />
      </Helmet>

      {/* 한자 연습하기와 동일한 control-bar 구조 */}
      <div className="control-bar no-print">
        <div className="control-bar-header">
          <div className="section-title">
            <FileText className="text-primary" size={22} />
            급수별 한자 선택
          </div>
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder={t.searchPlaceholder}
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
        <GradeSelector selectedGrade={selectedGrade} getCountByGrade={getCountByGrade} />
        
        {/* SEO Description for users & search engines */}
        <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--gray-600)', lineHeight: '1.5', wordBreak: 'keep-all', textAlign: 'left' }}>
          {currentSeo.description}
        </p>
      </div>

      <div className="stroke-practice-container no-print">
        <div className="stroke-sidebar">

        <div className="stroke-random-btn-wrap">
          <button
            className="stroke-random-btn"
            onClick={handleRandomPractice}
            title="목록에서 무작위로 한자를 선택합니다"
          >
            <Shuffle size={16} /> 랜덤 연습하기
          </button>
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
            <div className="empty-state" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem 0', color: 'var(--gray-500)' }}>
              {t.noData}
            </div>
          )}
        </div>
      </div>

      <div ref={viewerContainerRef} className="stroke-viewer-area">
        {selectedHanja ? (
          <div className="stroke-viewer-card">
            <div className="viewer-header">
              <h2>{selectedHanja.character}</h2>
              <div className="viewer-meta-row" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                <span className="viewer-huneum">{selectedHanja.hun} {selectedHanja.eum}</span>
                <span className="viewer-grade badge" style={{ marginTop: 0 }}>{selectedHanja.grade}</span>
                {selectedHanja.totalStrokes && (
                  <span className="viewer-grade badge" style={{ marginTop: 0 }}>총 {selectedHanja.totalStrokes}획</span>
                )}
              </div>
            </div>
            
            <div className="viewer-canvas-wrap" style={{ position: 'relative' }}>
              <div ref={containerRef} className="hanzi-canvas"></div>
              {mode === 'animate' && getStrokeStartPoints().map((pt, i) => {
                if (i > activeStrokeIndex) return null;
                return (
                  <div key={i} style={{
                    position: 'absolute',
                    left: pt.x,
                    top: pt.y,
                    transform: 'translate(-50%, -50%)',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(5, 150, 105, 0.85)', // primary color
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                    zIndex: 10
                  }}>
                    {i + 1}
                  </div>
                );
              })}
            </div>

            <div className="viewer-actions">
              {mode === 'quiz' && isQuizDone ? (
                <div className="mode-tabs">
                  <button 
                    className="mode-btn"
                    onClick={() => setMode('animate')}
                  >
                    자동 재생
                  </button>
                  <button 
                    className="mode-btn"
                    onClick={handleReplay}
                  >
                    다시 연습하기
                  </button>
                  <button 
                    className="mode-btn active"
                    onClick={handleNextHanja}
                  >
                    다음 글자
                  </button>
                </div>
              ) : (
                <div className="mode-tabs">
                  <button 
                    className={`mode-btn ${mode === 'animate' ? 'active' : ''}`}
                    onClick={() => {
                      if (mode === 'animate') {
                        handleReplay();
                      } else {
                        setMode('animate');
                      }
                    }}
                  >
                    {isAnimateDone ? '다시 재생' : '자동 재생'}
                  </button>
                  <button 
                    className={`mode-btn ${mode === 'quiz' ? 'active' : ''}`}
                    onClick={() => {
                      if (mode === 'quiz') {
                        handleReplay();
                      } else {
                        setMode('quiz');
                      }
                    }}
                  >
                    {isQuizDone ? '다시 연습하기' : t.quizMode}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="viewer-empty-state">
            <p>{t.selectHanja}</p>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}
