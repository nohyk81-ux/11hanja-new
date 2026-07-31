import React, { useEffect, useRef } from 'react';
import HanziWriter from 'hanzi-writer';

/**
 * HanziStrokeGuide – Cell 1 한자 획순 가이드 컴포넌트
 * hanzi-writer 라이브러리를 사용하여 실제 획순 경로를 정확하게 표시합니다.
 * 글자 음영(outline) + 획순 화살표 번호가 글자 안에 정확히 표시됩니다.
 */
export default function HanziStrokeGuide({ character, size = 80 }) {
  const containerRef = useRef(null);
  const writerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !character) return;

    // 기존 내용 초기화
    containerRef.current.innerHTML = '';

    try {
      writerRef.current = HanziWriter.create(containerRef.current, character, {
        width: size,
        height: size,
        padding: 4,
        showOutline: true,
        strokeColor: '#cbd5e1',        // 획 음영 색 (연회색)
        outlineColor: '#e2e8f0',       // 외곽선 색
        drawingColor: '#e11d48',       // 쓰기 색
        showCharacter: false,          // 완성 글자 숨김 (음영만 표시)
        showHintAfterMisses: false,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 200,
        charDataLoader: (char, onComplete) => {
          // jsdelivr CDN에서 hanzi-writer-data 로드
          fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${encodeURIComponent(char)}.json`)
            .then(res => {
              if (!res.ok) throw new Error('Not found');
              return res.json();
            })
            .then(data => onComplete(data))
            .catch(() => {
              // 데이터 없을 경우 빈 처리
              onComplete(null);
            });
        }
      });
    } catch (e) {
      console.warn('HanziWriter error for', character, e);
    }

    return () => {
      if (writerRef.current) {
        try { writerRef.current.cancelAnimation(); } catch {}
      }
    };
  }, [character, size]);

  return (
    <div
      ref={containerRef}
      className="hanzi-stroke-guide-inner"
      style={{ width: size, height: size }}
    />
  );
}
