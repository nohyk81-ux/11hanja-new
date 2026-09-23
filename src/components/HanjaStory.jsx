import React, { useState } from 'react';
import { Calendar, FileText, ArrowRight, BookOpen, ArrowUpDown, ArrowDownUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STORY_DATABASE } from '../data/storyData';
import { useSeo } from '../utils/useSeo';
import '../styles/main.css';

export default function HanjaStory() {
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = 최신순 (기본값), 'asc' = 1편부터 순서대로

  useSeo(
    '한자 이야기 & 급수 시험 칼럼 - 일일한자 | 11HANJA.COM',
    '급수 한자 시험 대비 비법, 사자성어의 숨은 유래, 획순의 과학적 원리, 초등 한자 교육 가이드 등 일일한자가 들려주는 유익하고 흥미진진한 한자 칼럼 모음입니다.'
  );

  const sortedStories = [...STORY_DATABASE].sort((a, b) => {
    return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
  });

  return (
    <div className="story-container" style={{ maxWidth: '840px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#e0f2fe', color: '#0369a1', padding: '6px 14px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          <BookOpen size={16} />
          <span>일일한자 교육 칼럼</span>
        </div>
        <h1 style={{ fontSize: '2rem', color: 'var(--dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <FileText size={32} color="var(--primary)" />
          한자 이야기
        </h1>
        <p style={{ color: 'var(--gray-500)', lineHeight: '1.6', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
          한자 공부의 핵심 비법부터 재미있는 역사와 어원까지, 일일한자가 정성껏 전해드리는 유익한 이야기입니다.
        </p>
      </header>

      {/* Sorting & Filter Control Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 600 }}>
          총 <strong style={{ color: 'var(--primary)' }}>{STORY_DATABASE.length}편</strong>의 교육 칼럼
        </span>

        <div style={{ display: 'inline-flex', background: '#f1f5f9', padding: '3px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <button
            onClick={() => setSortOrder('desc')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: sortOrder === 'desc' ? '#ffffff' : 'transparent',
              color: sortOrder === 'desc' ? '#0f172a' : '#64748b',
              fontWeight: sortOrder === 'desc' ? 700 : 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: sortOrder === 'desc' ? '0 2px 5px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s'
            }}
          >
            <ArrowDownUp size={14} />
            <span>최신순</span>
          </button>
          <button
            onClick={() => setSortOrder('asc')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: sortOrder === 'asc' ? '#ffffff' : 'transparent',
              color: sortOrder === 'asc' ? '#0f172a' : '#64748b',
              fontWeight: sortOrder === 'asc' ? 700 : 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: sortOrder === 'asc' ? '0 2px 5px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.15s'
            }}
          >
            <ArrowUpDown size={14} />
            <span>1편부터 순서대로</span>
          </button>
        </div>
      </div>

      <div className="story-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {sortedStories.map((story) => (
          <article 
            key={story.id} 
            className="story-card" 
            style={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              border: '1px solid #f1f5f9',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            <div style={{ padding: '1.75rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-500)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <Calendar size={14} />
                <span>{story.date}</span>
                <span>•</span>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>교육 칼럼 #{story.id}</span>
              </div>
              
              <h2 style={{ fontSize: '1.35rem', color: 'var(--dark)', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                <Link 
                  to={`/story/${story.id}`} 
                  style={{ color: 'inherit', textDecoration: 'none' }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'inherit'}
                >
                  {story.title}
                </Link>
              </h2>
              
              <p style={{ color: 'var(--gray-600)', fontSize: '1rem', lineHeight: '1.65', marginBottom: '1.25rem' }}>
                {story.summary}
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link 
                  to={`/story/${story.id}`} 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    color: 'var(--primary)', 
                    fontWeight: 600, 
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: '#f0fdf4'
                  }}
                >
                  전체 글 읽기 <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
