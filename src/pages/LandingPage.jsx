import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '../utils/useSeo';

export default function LandingPage() {
  useSeo(
    '일일한자 - 검정기관별 무료 급수 한자 학습지 만들기 & 획순 연습',
    '회원가입 없이 누구나 무료로 인쇄하고 연습하는 일일한자! 공인 급수별 맞춤 학습지 A4 인쇄 및 살아 움직이는 획순 애니메이션을 제공합니다.'
  );

  return (
    <div className="landing-page-container" style={{ maxWidth: '860px', margin: '0 auto', padding: '3.5rem 1rem 4.5rem 1rem', textAlign: 'center' }}>
      {/* Hero Title */}
      <section style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          오늘 어떤 한자 공부를 해볼까요?
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#64748b', margin: 0, lineHeight: 1.6, wordBreak: 'keep-all' }}>
          회원가입 없이 누구나 무료로 인쇄하고 연습하는 일일한자
        </p>
      </section>

      {/* 2 Main Gateway Cards (Mockup Design) */}
      <section className="landing-grid">
        {/* Card 1: 학습지 만들기 */}
        <div
          className="gateway-card"
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '2.5px solid #059669',
            boxShadow: '0 12px 30px -6px rgba(5, 150, 105, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
            padding: '2.75rem 2rem 2.25rem 2rem'
          }}
        >
          <div>
            {/* Mockup Illustration: Open Book + Grid Worksheet */}
            <div style={{ margin: '0 auto 1.5rem auto', width: '100px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="96" height="90" viewBox="0 0 100 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Worksheet with Grid */}
                <rect x="44" y="10" width="46" height="62" rx="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
                {/* Folded paper corner */}
                <path d="M76 10 L90 24 L76 24 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
                {/* Grid cells on worksheet */}
                <line x1="50" y1="32" x2="84" y2="32" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="50" y1="42" x2="84" y2="42" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="50" y1="52" x2="84" y2="52" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="50" y1="62" x2="84" y2="62" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="67" y1="24" x2="67" y2="68" stroke="#94a3b8" strokeWidth="1.5" />

                {/* Foreground Book: Left Page */}
                <path d="M10 32 C 22 28, 34 28, 44 32 L 44 74 C 34 70, 22 70, 10 74 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M8 74 L 8 32 C 20 27, 32 27, 44 31" fill="none" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" />
                {/* Foreground Book: Right Page */}
                <path d="M44 32 C 54 28, 66 28, 78 32 L 78 74 C 66 70, 54 70, 44 74 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M80 74 L 80 32 C 68 27, 56 27, 44 31" fill="none" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" />
                {/* Center bookmark ribbon */}
                <rect x="22" y="20" width="8" height="22" rx="1" fill="#059669" stroke="#1e293b" strokeWidth="2" />
                {/* Ruled lines in book */}
                <line x1="16" y1="42" x2="38" y2="42" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                <line x1="16" y1="50" x2="38" y2="50" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                <line x1="16" y1="58" x2="32" y2="58" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                <line x1="50" y1="42" x2="72" y2="42" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                <line x1="50" y1="50" x2="72" y2="50" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                <line x1="50" y1="58" x2="66" y2="58" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <h2 style={{ fontSize: '1.65rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.85rem 0', letterSpacing: '-0.02em' }}>
              📖 학습지 만들기
            </h2>
            <p style={{ color: '#334155', fontSize: '1.08rem', lineHeight: 1.65, margin: '0 0 2.25rem 0', wordBreak: 'keep-all', fontWeight: 500 }}>
              공인 급수별 맞춤 학습지 A4<br />
              무료 인쇄 및 오늘의 5자 즉시 출력
            </p>
          </div>

          <Link
            to="/grade/8GR"
            className="gateway-card-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#059669',
              color: '#ffffff',
              padding: '0.95rem 1.5rem',
              borderRadius: '14px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.28)',
              transition: 'background 0.2s'
            }}
          >
            <span>학습지 만들러 가기</span>
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Card 2: 획순 연습하기 */}
        <div
          className="gateway-card"
          style={{
            background: '#eff6ff',
            borderRadius: '24px',
            border: '2.5px solid #3b82f6',
            boxShadow: '0 12px 30px -6px rgba(59, 130, 246, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
            padding: '2.75rem 2rem 2.25rem 2rem'
          }}
        >
          <div>
            {/* Mockup Illustration: Calligraphy Stylus / Brush with dynamic swoosh stroke */}
            <div style={{ margin: '0 auto 1.5rem auto', width: '100px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="96" height="90" viewBox="0 0 100 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Dynamic Calligraphy Stroke on Paper */}
                <path d="M 32 26 C 42 16, 46 36, 38 48 C 30 60, 24 66, 34 76" fill="none" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Stylus / Ink Pen drawing stroke */}
                <g transform="rotate(-18 64 54)">
                  {/* Pen Body */}
                  <rect x="54" y="10" width="16" height="46" rx="5" fill="#3b82f6" stroke="#1e293b" strokeWidth="2.5" />
                  {/* Pen Clip */}
                  <path d="M 70 18 L 77 18 L 77 36 L 70 36" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Metallic Grip Ring */}
                  <line x1="54" y1="46" x2="70" y2="46" stroke="#1d4ed8" strokeWidth="2.5" />
                  {/* Nib base */}
                  <polygon points="55,56 69,56 66,68 58,68" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2.5" />
                  {/* Nib / Brush Tip with Ink */}
                  <path d="M 58 68 C 58 76, 62 84, 62 84 C 62 84, 66 76, 66 68 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
                </g>
              </svg>
            </div>

            <h2 style={{ fontSize: '1.65rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.85rem 0', letterSpacing: '-0.02em' }}>
              ✍️ 획순 연습하기
            </h2>
            <p style={{ color: '#334155', fontSize: '1.08rem', lineHeight: 1.65, margin: '0 0 2.25rem 0', wordBreak: 'keep-all', fontWeight: 500 }}>
              살아 움직이는 애니메이션으로<br />
              바른 획순과 필순 완벽 마스터
            </p>
          </div>

          <Link
            to="/stroke/8GR"
            className="gateway-card-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#2563eb',
              color: '#ffffff',
              padding: '0.95rem 1.5rem',
              borderRadius: '14px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.1rem',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)',
              transition: 'background 0.2s'
            }}
          >
            <span>획순 연습하러 가기</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
