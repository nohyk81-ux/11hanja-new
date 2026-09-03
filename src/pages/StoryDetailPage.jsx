import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, ArrowLeft, BookOpen, Share2, Printer, ChevronRight, ChevronLeft } from 'lucide-react';
import { STORY_DATABASE } from '../data/storyData';
import { useSeo } from '../utils/useSeo';

export default function StoryDetailPage() {
  const { id } = useParams();
  const storyId = parseInt(id, 10);
  const story = STORY_DATABASE.find(s => s.id === storyId);

  useSeo(
    story ? `${story.title} - 한자이야기 | 일일한자` : '한자이야기 - 일일한자',
    story ? story.summary : '일일한자(11HANJA.COM)가 전하는 유익한 한자 학습법과 교양 이야기'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!story) {
    return <Navigate to="/story" replace />;
  }

  // Find previous and next stories
  const currentIndex = STORY_DATABASE.findIndex(s => s.id === storyId);
  const prevStory = currentIndex > 0 ? STORY_DATABASE[currentIndex - 1] : null;
  const nextStory = currentIndex < STORY_DATABASE.length - 1 ? STORY_DATABASE[currentIndex + 1] : null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '820px', margin: '2rem auto', padding: '0 1rem' }}>
      <nav style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/story" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={18} />
          한자 이야기 목록으로
        </Link>
        <button
          onClick={handleShare}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', color: '#475569', fontSize: '0.875rem' }}
        >
          <Share2 size={16} />
          공유하기
        </button>
      </nav>

      <article style={{ background: 'white', borderRadius: '16px', padding: '2.5rem 2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', textAlign: 'left' }}>
        <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', background: '#e0f2fe', color: '#0369a1', fontSize: '0.85rem', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', marginBottom: '0.75rem' }}>
            한자 교육 & 칼럼
          </div>
          <h1 style={{ fontSize: '1.85rem', color: '#0f172a', margin: '0 0 1rem 0', lineHeight: 1.4, wordBreak: 'keep-all' }}>
            {story.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={15} />
              {story.date}
            </span>
            <span>•</span>
            <span>작성: 일일한자 편집부</span>
          </div>
        </header>

        {/* 요약 박스 */}
        <div style={{ background: '#f8fafc', borderLeft: '4px solid var(--primary)', padding: '1.25rem 1.5rem', borderRadius: '0 8px 8px 0', marginBottom: '2rem', color: '#334155', fontSize: '1.05rem', lineHeight: 1.7 }}>
          <strong>요약:</strong> {story.summary}
        </div>

        {/* 본문 */}
        <section className="story-body" style={{ color: '#1e293b', fontSize: '1.1rem', lineHeight: 1.9, wordBreak: 'keep-all' }}>
          {story.content.split('\n\n').map((paragraph, index) => {
            // Handle headings
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} style={{ fontSize: '1.35rem', color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem', fontWeight: 700 }}>
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} style={{ fontSize: '1.5rem', color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 700 }}>
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }

            // Handle bold text in markdown style (**text**)
            const formattedParagraph = paragraph.split('**').map((part, i) => 
              i % 2 === 1 ? <strong key={i} style={{ color: '#0f172a', fontWeight: 700 }}>{part}</strong> : part
            );
            
            return (
              <p key={index} style={{ marginBottom: '1.5rem' }}>
                {formattedParagraph}
              </p>
            );
          })}
        </section>

        {/* 하단 학습지 홍보 배너 */}
        <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bbf7d0', marginTop: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0', color: '#166534', fontSize: '1.1rem' }}>직접 손으로 써보며 익혀보세요!</h4>
            <p style={{ margin: 0, color: '#4b5563', fontSize: '0.95rem' }}>한국어문회, 대한검정회, 상공회의소 급수한자 무료 A4 학습지</p>
          </div>
          <Link to="/grade/8GR" className="btn-primary" style={{ textDecoration: 'none', padding: '0.65rem 1.25rem', fontSize: '0.95rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Printer size={16} />
            무료 학습지 인쇄하기
          </Link>
        </div>

        {/* 이전 글 / 다음 글 네비게이션 */}
        <nav style={{ borderTop: '1px solid #e2e8f0', marginTop: '2.5rem', paddingTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            {prevStory && (
              <Link to={`/story/${prevStory.id}`} style={{ textDecoration: 'none', display: 'block', padding: '0.75rem', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>
                  <ChevronLeft size={14} /> 이전 글
                </span>
                <span style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {prevStory.title}
                </span>
              </Link>
            )}
          </div>
          <div>
            {nextStory && (
              <Link to={`/story/${nextStory.id}`} style={{ textDecoration: 'none', display: 'block', padding: '0.75rem', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'right' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>
                  다음 글 <ChevronRight size={14} />
                </span>
                <span style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {nextStory.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </div>
  );
}
