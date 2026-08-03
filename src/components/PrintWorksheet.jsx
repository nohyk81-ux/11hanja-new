import React, { useState, useEffect } from 'react';

export default function PrintWorksheet({ selectedHanjaList, printMode, currentPage = 0 }) {
  if (!selectedHanjaList || selectedHanjaList.length === 0) return null;

  if (printMode === 'summary') {
    return <A4SummaryHanjaSheet selectedHanjaList={selectedHanjaList} />;
  }

  return (
    <>
      {selectedHanjaList.map((hanja, index) => (
        <A4SingleHanjaSheet 
          key={hanja.id} 
          hanja={hanja} 
          isActive={index === currentPage}
        />
      ))}
    </>
  );
}

function StrokeOrderSVG({ hanja }) {
  const [strokeData, setStrokeData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(`/data/strokes/${encodeURIComponent(hanja.character)}.json`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) setStrokeData(data);
      })
      .catch(err => {
        console.error('Failed to load stroke data for', hanja.character, err);
        if (isMounted) setStrokeData([]);
      });
    return () => { isMounted = false; };
  }, [hanja.character]);

  if (!strokeData) {
    return (
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '10px', color: '#cbd5e1'
      }}>
        ...
      </div>
    );
  }

  if (strokeData.length === 0) return null;

  const markerId = `arrow-${hanja.id}`;

  return (
    <svg
      viewBox="0 0 100 100"
      style={{
        position: 'absolute',
        top: '13%', left: '13%',
        width: '74%', height: '74%',
        zIndex: 6,
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <defs>
        {/* 클리핑: 글자 영역 내부만 표시 */}
        <clipPath id={`clip-${hanja.id}`}>
          <rect x="8" y="8" width="84" height="84" />
        </clipPath>
        {/* 빨간 화살표 마커 */}
        <marker
          id={markerId}
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="3"
          markerHeight="3"
          orient="auto"
        >
          <path d="M 0 0 L 8 4 L 0 8 z" fill="#dc2626" />
        </marker>
      </defs>

      {/* 모든 획과 번호 배지: 클리핑 적용 */}
      <g clipPath={`url(#clip-${hanja.id})`}>
        {/* 1) 획 경로 (연한 배경선) */}
        {strokeData.map((s, i) => (
          s.path ? (
            <path
              key={`bg-${i}`}
              d={s.path}
              fill="none"
              stroke="#fecaca"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null
        ))}

        {/* 2) 획 경로 (진한 얇은 선 + 화살표) */}
        {strokeData.map((s, i) => (
          s.path ? (
            <path
              key={`stroke-${i}`}
              d={s.path}
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              markerEnd={`url(#${markerId})`}
            />
          ) : null
        ))}

        {/* 3) 획순 번호 원형 배지 */}
        {strokeData.map((s, i) => {
          if (!s.start) return null;
          const cx = Math.max(14, Math.min(86, s.start.x));
          const cy = Math.max(14, Math.min(86, s.start.y));
          const isComplex = strokeData.length > 10;
          return (
            <g key={`badge-${i}`}>
              <circle
                cx={cx} cy={cy} r={isComplex ? "3.5" : "4.5"}
                fill="white"
                stroke="#ef4444"
                strokeWidth="0.8"
              />
              <text
                x={cx} y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                  fontSize: isComplex ? (s.order > 9 ? '3px' : '3.5px') : (s.order > 9 ? '4px' : '4.5px'),
                  fontWeight: '800',
                  fill: '#ef4444',
                  fontFamily: 'sans-serif',
                }}
              >
                {s.order}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}

// Single A4 Sheet Component for a Hanja (6x6 = 36 Practice Boxes)
function A4SingleHanjaSheet({ hanja, isActive = true }) {
  const cells = Array.from({ length: 36 });

  return (
    <div className={`a4-page ${isActive ? 'active-page' : 'hidden-page'}`}>
      {/* Printable Header */}
      <div className="a4-header">
        <div className="a4-title-group">
          <h2>일일한자 쓰기 연습지 ({hanja.grade})</h2>
          <p>매일 10분! 스스로 익히는 급수 한자 교재 • 11HANJA.COM</p>
        </div>
        <div className="a4-user-info">
          <div className="info-field">날짜: <span className="info-line"></span></div>
          <div className="info-field">이름: <span className="info-line"></span></div>
          <div className="info-field">확인: <span className="info-line" style={{ width: '35px' }}></span></div>
        </div>
      </div>

      {/* 6x6 Grid Container (36 cells) */}
      <div className="worksheet-grid-6x6">
        {cells.map((_, index) => {
          const row = Math.floor(index / 6);
          const isCell1 = index === 0;
          const isTracing = row === 0 || row === 1;
          const isBlank = !isCell1 && !isTracing;

          return (
            <div
              key={index}
              className={`practice-box ${isCell1 ? 'stroke-guide' : ''} ${
                isTracing ? 'tracing-cell' : ''
              } ${isBlank ? 'blank-cell' : ''}`}
            >
              <div className="practice-square">
                <div className="crosshair-h"></div>
                <div className="crosshair-v"></div>

                {/* 한자 음영 글자 */}
                {!isBlank && (
                  <div className="char-content">{hanja.character}</div>
                )}

                {/* Cell 1 전용: 실제 획순 화살표 SVG 오버레이 */}
                {isCell1 && <StrokeOrderSVG hanja={hanja} />}
              </div>

              {/* 훈음 필드 */}
              <div className={`huneum-field ${isBlank ? 'blank-huneum' : ''}`}>
                {isCell1 ? (
                  <span>{hanja.hunEum}</span>
                ) : isTracing ? (
                  <span>{hanja.hunEum}</span>
                ) : (
                  <span style={{ fontSize: '7.5pt', color: '#cbd5e1' }}>훈 / 음</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Printable Footer */}
      <div className="a4-footer">
        <span>한자: [{hanja.character}] | 훈음: {hanja.hunEum} | 총 {hanja.totalStrokes}획</span>
        <span>출처: 일일한자 (11hanja.com) - 무단 전재 및 재배포 금지</span>
      </div>
    </div>
  );
}

// Combined A4 Sheet Component
function A4SummaryHanjaSheet({ selectedHanjaList }) {
  const cells = Array.from({ length: 36 });
  const gradeLabel = selectedHanjaList[0]?.grade || '8급';

  return (
    <div className="a4-page">
      <div className="a4-header">
        <div className="a4-title-group">
          <h2>일일한자 종합 쓰기 연습지 ({gradeLabel} 총 {selectedHanjaList.length}자)</h2>
          <p>매일 10분! 스스로 익히는 급수 한자 교재 • 11HANJA.COM</p>
        </div>
        <div className="a4-user-info">
          <div className="info-field">날짜: <span className="info-line"></span></div>
          <div className="info-field">이름: <span className="info-line"></span></div>
          <div className="info-field">점수: <span className="info-line" style={{ width: '35px' }}></span></div>
        </div>
      </div>

      <div className="worksheet-grid-6x6">
        {cells.map((_, index) => {
          const hanja = selectedHanjaList[index % selectedHanjaList.length];
          return (
            <div key={index} className="practice-box">
              <div className="practice-square">
                <div className="crosshair-h"></div>
                <div className="crosshair-v"></div>
                <div className="char-content">{hanja?.character || ''}</div>
              </div>
              <div className="huneum-field">
                <span>{hanja?.hunEum || ''}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="a4-footer">
        <span>일일한자 {gradeLabel} 전체 한자 종합 쓰기 노트 ({selectedHanjaList.length}자)</span>
        <span>출처: 일일한자 (11hanja.com) - 무단 전재 및 재배포 금지</span>
      </div>
    </div>
  );
}
