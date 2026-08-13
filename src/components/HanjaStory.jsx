import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, FileText } from 'lucide-react';
import { STORY_DATABASE } from '../data/storyData';
import '../styles/main.css';

export default function HanjaStory() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="story-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--dark)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <FileText size={28} color="var(--primary)" />
          한자 이야기
        </h2>
        <p style={{ color: 'var(--gray-500)', lineHeight: '1.6' }}>
          한자 공부의 비법부터 재미있는 어원 이야기까지, 일일한자가 들려주는 유익한 한자 스토리입니다.
        </p>
      </header>

      <div className="story-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {STORY_DATABASE.map((story) => (
          <article 
            key={story.id} 
            className="story-card" 
            style={{ 
              backgroundColor: 'white', 
              borderRadius: '12px', 
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              overflow: 'hidden',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <div 
              className="story-header" 
              onClick={() => toggleExpand(story.id)}
              style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
            >
              <div style={{ flex: 1, paddingRight: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--dark)', marginBottom: '0.5rem', lineHeight: '1.4' }}>
                  {story.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-500)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  <Calendar size={14} />
                  <span>{story.date}</span>
                </div>
                {expandedId !== story.id && (
                  <p style={{ color: 'var(--gray-600)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {story.summary}
                  </p>
                )}
              </div>
              <div style={{ color: 'var(--gray-400)', marginTop: '0.25rem' }}>
                {expandedId === story.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </div>

            {expandedId === story.id && (
              <div 
                className="story-content" 
                style={{ 
                  padding: '0 1.5rem 1.5rem 1.5rem', 
                  borderTop: '1px solid var(--gray-200)',
                  marginTop: '0.5rem',
                  paddingTop: '1.5rem'
                }}
              >
                {story.content.split('\n\n').map((paragraph, index) => {
                  // Handle bold text in markdown style (**text**)
                  const formattedParagraph = paragraph.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i} style={{ color: 'var(--dark)' }}>{part}</strong> : part
                  );
                  
                  return (
                    <p key={index} style={{ marginBottom: '1rem', color: 'var(--gray-700)', lineHeight: '1.8', fontSize: '1.05rem', wordBreak: 'keep-all' }}>
                      {formattedParagraph}
                    </p>
                  );
                })}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
