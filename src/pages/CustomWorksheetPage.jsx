import React, { useState, useMemo } from 'react';
import { Printer, Sparkles, X, Plus, Search, Trash2, BookOpen } from 'lucide-react';
import { HANJA_DATABASE } from '../data/hanjaData';
import { useSeo } from '../utils/useSeo';

const CJK_REGEX = /[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]/g;

const PRESETS = [
  { label: '🌟 요일 한자', text: '日月火水木金土' },
  { label: '🔢 기초 숫자 (1~10)', text: '一二三四五六七八九十' },
  { label: '📜 천자문 첫 구절', text: '天地玄黃宇宙洪荒' },
  { label: '👨‍👩‍👧‍👦 우리 가족', text: '父母兄弟姉妹' },
  { label: '💡 대표 사자성어', text: '大器晩成 轉禍爲福 易地思之' },
  { label: '🏫 학교 생활', text: '學校 學生 敎育 先生' }
];

const isValidRadical = (rad) => {
  if (!rad || typeof rad !== 'string') return false;
  const trimmed = rad.trim();
  return trimmed !== '' && trimmed !== '?' && !trimmed.includes('?') && trimmed !== '부수' && trimmed !== '—';
};

export default function CustomWorksheetPage({ onGenerateCustomWorksheet }) {
  useSeo(
    '내마음대로 학습지 만들기 - 원하는 한자 직접 입력 A4 쓰기 인쇄 | 일일한자',
    '원하는 한자를 직접 입력하거나 붙여넣어 나만의 맞춤형 A4 한자 학습지를 생성하고 인쇄하세요. 6,111자 한자 데이터베이스 자동 연동 및 획순 가이드 제공.'
  );

  const [inputText, setInputText] = useState('大器晩成 轉禍爲福');
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [isWordMode, setIsWordMode] = useState(false);
  const [helperQuery, setHelperQuery] = useState('');

  // Pre-index 6,111 hanjaMeta by character for O(1) instant lookup
  const hanjaMap = useMemo(() => {
    const map = new Map();
    for (const item of HANJA_DATABASE) {
      if (!map.has(item.character)) {
        map.set(item.character, item);
      }
      const norm = item.character.normalize('NFKC');
      if (!map.has(norm)) {
        map.set(norm, item);
      }
    }
    return map;
  }, []);

  // Extract unique or sequential CJK characters from input (Single Hanja Mode)
  const extractedHanjaList = useMemo(() => {
    const rawMatches = inputText.match(CJK_REGEX) || [];
    const characters = removeDuplicates ? Array.from(new Set(rawMatches)) : rawMatches;

    return characters.map((char, index) => {
      const existing = hanjaMap.get(char) || hanjaMap.get(char.normalize('NFKC'));
      if (existing) {
        return {
          ...existing,
          id: `custom-${char.charCodeAt(0)}-${index}`
        };
      }
      // Fallback for rare hanja not in standard database
      return {
        id: `custom-${char.charCodeAt(0)}-${index}`,
        character: char,
        hunEum: `한자 ${char}`,
        hun: '한자',
        eum: char,
        radical: '',
        totalStrokes: '—',
        uhmoon: '사용자지정'
      };
    });
  }, [inputText, removeDuplicates, hanjaMap]);

  // Extract word bundles from input (Word Mode)
  const extractedWordList = useMemo(() => {
    if (!inputText) return [];
    const tokens = inputText.split(/[\s,\n\r\t/·ㆍ]+/);
    const rawWords = [];
    for (const token of tokens) {
      const matches = token.match(CJK_REGEX);
      if (matches && matches.length > 0) {
        rawWords.push(matches.join(''));
      }
    }

    const words = removeDuplicates ? Array.from(new Set(rawWords)) : rawWords;

    return words.map((wordStr, index) => {
      const chars = Array.from(wordStr).map((char) => {
        const existing = hanjaMap.get(char) || hanjaMap.get(char.normalize('NFKC'));
        if (existing) {
          return {
            char,
            eum: existing.eum || char,
            hun: existing.hun || '',
            hunEum: existing.hunEum || `한자 ${char}`,
            radical: existing.radical || '',
            totalStrokes: existing.totalStrokes || '—'
          };
        }
        return {
          char,
          eum: char,
          hun: '한자',
          hunEum: `한자 ${char}`,
          radical: '',
          totalStrokes: '—'
        };
      });

      const reading = chars.map((c) => c.eum).join('');
      const fullHunEum = chars.map((c) => c.hunEum).join(', ');

      return {
        id: `word-${wordStr}-${index}`,
        word: wordStr,
        reading,
        fullHunEum,
        chars
      };
    });
  }, [inputText, removeDuplicates, hanjaMap]);

  // Helper search candidates (matching Korean sound or meaning)
  const searchCandidates = useMemo(() => {
    const q = helperQuery.trim().toLowerCase();
    if (!q) return [];
    
    const results = [];
    for (const item of HANJA_DATABASE) {
      if (
        item.eum === q || 
        (item.hun && item.hun.toLowerCase().includes(q)) || 
        (item.hunEum && item.hunEum.toLowerCase().includes(q))
      ) {
        results.push(item);
        if (results.length >= 12) break;
      }
    }
    return results;
  }, [helperQuery]);

  const handleAddCandidate = (char) => {
    setInputText((prev) => (prev ? `${prev} ${char}` : char));
  };

  const handleRemoveChar = (charToRemove, indexToRemove) => {
    if (removeDuplicates) {
      const regex = new RegExp(charToRemove, 'g');
      setInputText((prev) => prev.replace(regex, '').trim());
    } else {
      const updated = extractedHanjaList
        .filter((_, idx) => idx !== indexToRemove)
        .map((h) => h.character)
        .join('');
      setInputText(updated);
    }
  };

  const handleRemoveWord = (wordToRemove, indexToRemove) => {
    if (removeDuplicates) {
      const escaped = wordToRemove.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'g');
      setInputText((prev) => prev.replace(regex, '').replace(/\s{2,}/g, ' ').trim());
    } else {
      const updated = extractedWordList
        .filter((_, idx) => idx !== indexToRemove)
        .map((w) => w.word)
        .join(' ');
      setInputText(updated);
    }
  };

  const handleApplyPreset = (presetText) => {
    setInputText(presetText);
  };

  const handleClear = () => {
    setInputText('');
  };

  const handleSubmit = () => {
    if (isWordMode) {
      if (extractedWordList.length === 0) {
        alert('학습지를 생성할 단어가 입력되지 않았습니다. 단어를 입력하거나 추천 프리셋을 클릭해 주세요.');
        return;
      }
      if (extractedWordList.length > 30) {
        alert('단어 학습지는 한 번에 최대 30단어까지만 생성할 수 있습니다. 30단어 이하로 조절해 주세요.');
        return;
      }
      onGenerateCustomWorksheet({
        items: extractedWordList,
        isWordMode: true
      });
    } else {
      if (extractedHanjaList.length === 0) {
        alert('학습지를 생성할 한자가 입력되지 않았습니다. 한자를 입력하거나 추천 프리셋을 클릭해 주세요.');
        return;
      }
      if (extractedHanjaList.length > 30) {
        alert('학습지는 한 번에 최대 30자까지만 생성할 수 있습니다. 30자 이하로 조절해 주세요.');
        return;
      }
      onGenerateCustomWorksheet({
        items: extractedHanjaList,
        isWordMode: false
      });
    }
  };

  const count = isWordMode ? extractedWordList.length : extractedHanjaList.length;

  return (
    <div className="custom-worksheet-page" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem 4rem 1rem' }}>
      {/* Top Header */}
      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ecfdf5', color: '#059669', padding: '6px 14px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          <Sparkles size={16} />
          <span>나만의 맞춤형 A4 한자 쓰기 노트</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', color: '#0f172a', fontWeight: 800, margin: '0 0 0.75rem 0', letterSpacing: '-0.02em' }}>
          내마음대로 학습지 만들기
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
          배우고 싶은 한자나 단어, 사자성어를 직접 입력하세요.<br />
          바른 획순 화살표와 격자 쓰기 칸이 포함된 A4 학습지를 즉시 무료로 만들어 드립니다.
        </p>
      </header>

      {/* Main Input Control Box */}
      <div
        className="custom-input-card"
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          border: '1.5px solid #e2e8f0',
          padding: 'clamp(1.25rem, 3vw, 2rem)',
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.06)',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <label style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={18} color={isWordMode ? '#7c3aed' : '#059669'} />
            <span>{isWordMode ? '공부할 단어 입력' : '공부할 한자 입력'}</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: count > 30 ? '#ef4444' : isWordMode ? '#7c3aed' : '#059669', marginLeft: '6px' }}>
              ({count} / 30{isWordMode ? '단어' : '자'})
            </span>
          </label>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: '#475569', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={removeDuplicates}
                onChange={(e) => setRemoveDuplicates(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#059669' }}
              />
              <span>중복 {isWordMode ? '단어' : '한자'} 자동 제거</span>
            </label>

            {/* Word Mode Toggle Option */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.875rem',
                color: isWordMode ? '#7c3aed' : '#475569',
                fontWeight: isWordMode ? 700 : 500,
                cursor: 'pointer',
                background: isWordMode ? '#f5f3ff' : '#f8fafc',
                padding: '3px 10px',
                borderRadius: '8px',
                border: isWordMode ? '1.5px solid #a78bfa' : '1px solid #cbd5e1',
                transition: 'all 0.15s'
              }}
            >
              <input
                type="checkbox"
                checked={isWordMode}
                onChange={(e) => setIsWordMode(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#7c3aed' }}
              />
              <span>단어별 학습지 만들기 (단어 묶음 쓰기)</span>
            </label>

            {inputText && (
              <button
                onClick={handleClear}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  padding: '2px 6px'
                }}
              >
                <Trash2 size={14} />
                <span>지우기</span>
              </button>
            )}
          </div>
        </div>

        {/* Text Input Area */}
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            isWordMode
              ? '예: 大器晩成, 轉禍爲福, 學校, 敎育, 父母 등 단어나 사자성어를 띄어쓰기 또는 쉼표로 구분하여 입력하세요.'
              : '예: 大器晩成, 日月火水木金土, 學校, 父母 등 학습지를 만들고 싶은 한자를 자유롭게 입력하거나 붙여넣으세요. (문장 속 한자만 자동으로 추출됩니다)'
          }
          rows={3}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '12px',
            border: `2px solid ${isWordMode ? '#c4b5fd' : '#cbd5e1'}`,
            fontSize: '1.2rem',
            fontFamily: 'var(--font-serif)',
            outline: 'none',
            transition: 'border-color 0.2s',
            resize: 'vertical',
            boxSizing: 'border-box',
            lineHeight: 1.6
          }}
          onFocus={(e) => (e.target.style.borderColor = isWordMode ? '#7c3aed' : '#059669')}
          onBlur={(e) => (e.target.style.borderColor = isWordMode ? '#c4b5fd' : '#cbd5e1')}
        />

        {/* Recommendation Presets */}
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', marginBottom: '0.6rem' }}>
            💡 추천 프리셋으로 바로 시작하기
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset.text)}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '6px 13px',
                  fontSize: '0.85rem',
                  color: '#334155',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isWordMode ? '#f5f3ff' : '#ecfdf5';
                  e.currentTarget.style.color = isWordMode ? '#7c3aed' : '#059669';
                  e.currentTarget.style.borderColor = isWordMode ? '#ddd6fe' : '#a7f3d0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.color = '#334155';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Korean-to-Hanja Input Helper */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem' }}>
            <Search size={16} color={isWordMode ? '#7c3aed' : '#059669'} />
            <span>한자 자판이 어려우신가요? 한글로 한자 찾기 도우미</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px', marginBottom: '0.75rem' }}>
            <input
              type="text"
              value={helperQuery}
              onChange={(e) => setHelperQuery(e.target.value)}
              placeholder="한글 음이나 뜻 입력 (예: 학, 교, 바다, 날 일)"
              style={{
                flex: 1,
                padding: '0.5rem 0.85rem',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            {helperQuery && (
              <button
                onClick={() => setHelperQuery('')}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 0.85rem',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                지우기
              </button>
            )}
          </div>

          {searchCandidates.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              {searchCandidates.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAddCandidate(item.character)}
                  title={`${item.hunEum} (클릭하여 입력창에 추가)`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem', color: isWordMode ? '#7c3aed' : '#059669' }}>
                    {item.character}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.hunEum}</span>
                  <Plus size={12} color={isWordMode ? '#7c3aed' : '#059669'} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live Preview Action Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          background: '#ffffff',
          borderRadius: '16px',
          padding: '1rem 1.5rem',
          border: '1.5px solid #e2e8f0',
          marginBottom: '1.5rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}
      >
        <div>
          <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            {isWordMode ? '인식된 단어:' : '인식된 한자:'}{' '}
            <strong style={{ color: isWordMode ? '#7c3aed' : '#059669' }}>
              {count}개
            </strong>
          </span>
          <span style={{ fontSize: '0.9rem', color: '#64748b', marginLeft: '8px' }}>
            {isWordMode
              ? `(A4 모아쓰기 ${Math.ceil(count / 4)}장 또는 개별 ${count}장 생성)`
              : `(A4 쓰기 노트 ${count}장 생성 예정)`}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={count === 0 || count > 30}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: count === 0 || count > 30 ? '#94a3b8' : isWordMode ? '#7c3aed' : '#059669',
            color: '#ffffff',
            padding: '0.85rem 1.85rem',
            borderRadius: '12px',
            border: 'none',
            fontSize: '1.05rem',
            fontWeight: 700,
            cursor: count === 0 || count > 30 ? 'not-allowed' : 'pointer',
            boxShadow:
              count > 0 && count <= 30
                ? isWordMode
                  ? '0 4px 14px rgba(124, 58, 237, 0.35)'
                  : '0 4px 14px rgba(5, 150, 105, 0.35)'
                : 'none',
            transition: 'all 0.2s'
          }}
        >
          <Printer size={20} />
          <span>
            {isWordMode ? '내마음대로 단어 학습지 만들기 (인쇄)' : '내마음대로 학습지 만들기 (인쇄)'}
          </span>
        </button>
      </div>

      {/* Extracted Cards Grid */}
      {count > 0 ? (
        isWordMode ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}
          >
            {extractedWordList.map((item, index) => (
              <div
                key={item.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1.5px solid #ddd6fe',
                  padding: '1.25rem',
                  position: 'relative',
                  boxShadow: '0 2px 8px rgba(124, 58, 237, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.15s, box-shadow 0.15s'
                }}
              >
                <button
                  onClick={() => handleRemoveWord(item.word, index)}
                  title="이 단어 삭제"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fee2e2';
                    e.currentTarget.style.color = '#ef4444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f1f5f9';
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  <X size={14} />
                </button>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span
                      style={{
                        background: '#f3e8ff',
                        color: '#7c3aed',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '12px'
                      }}
                    >
                      단어 • {item.chars.length}자
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: '1.8rem',
                      fontFamily: 'var(--font-serif)',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '4px',
                      letterSpacing: '2px'
                    }}
                  >
                    {item.word}
                  </div>

                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#7c3aed', marginBottom: '8px' }}>
                    독음: [{item.reading}]
                  </div>

                  <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.4 }}>
                    {item.fullHunEum}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '12px',
                    paddingTop: '8px',
                    borderTop: '1px solid #f1f5f9',
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'wrap'
                  }}
                >
                  {item.chars.map((c, cIdx) => (
                    <span
                      key={cIdx}
                      style={{
                        fontSize: '0.8rem',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '2px 6px',
                        color: '#334155'
                      }}
                    >
                      <strong>{c.char}</strong> ({c.hunEum})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="hanja-cards-row">
            {extractedHanjaList.map((item, index) => (
              <div
                key={item.id}
                className="hanja-card"
                style={{ position: 'relative', cursor: 'default' }}
              >
                <button
                  onClick={() => handleRemoveChar(item.character, index)}
                  title="이 한자 삭제"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748b',
                    transition: 'background 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fee2e2';
                    e.currentTarget.style.color = '#ef4444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f1f5f9';
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  <X size={14} />
                </button>

                <div className="hanja-char-display">{item.character}</div>

                <div className="hanja-huneum" style={{ minHeight: '2.4rem' }}>
                  {item.hunEum}
                </div>

                <div className="hanja-meta">
                  <span>총 {item.totalStrokes}획</span>
                  {isValidRadical(item.radical) && <span> • {item.radical}</span>}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '3.5rem 1rem',
            background: '#ffffff',
            borderRadius: '16px',
            border: '2px dashed #e2e8f0',
            color: '#64748b'
          }}
        >
          <BookOpen size={40} color="#cbd5e1" style={{ margin: '0 auto 1rem auto' }} />
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#334155', margin: '0 0 0.5rem 0' }}>
            {isWordMode ? '입력된 단어가 없습니다.' : '입력된 한자가 없습니다.'}
          </p>
          <p style={{ fontSize: '0.95rem', margin: 0 }}>
            {isWordMode
              ? '위 텍스트 박스에 원하는 단어나 사자성어를 입력하거나, 추천 프리셋 버튼을 클릭해 보세요!'
              : '위 텍스트 박스에 원하는 한자를 직접 입력하거나, 추천 프리셋 버튼을 클릭해 보세요!'}
          </p>
        </div>
      )}
    </div>
  );
}
