import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Award, FileText, Sparkles, BookMarked, Brain, Compass } from 'lucide-react';
import { useSeo } from '../utils/useSeo';
import { STORY_DATABASE } from '../data/storyData';

export default function LandingPage() {
  useSeo(
    '일일한자 - 검정기관별 무료 급수 한자 학습지 & 교육 칼럼',
    '한국어문회·대한검정회·상공회의소 검정기관별 급수 한자학습, 쓰기, 획순 가이드 및 38편의 한자 이야기 교육 칼럼을 회원가입 없이 만나보세요.'
  );

  // 최신 추천 칼럼 6편 추출
  const recentStories = [...STORY_DATABASE].sort((a, b) => b.id - a.id).slice(0, 6);

  return (
    <div className="landing-page-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3.5rem 1rem 4.5rem 1rem', textAlign: 'center' }}>
      {/* Hero Title */}
      <section style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          오늘 어떤 한자 공부를 해볼까요?
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#64748b', margin: 0, lineHeight: 1.6, wordBreak: 'keep-all' }}>
          회원가입 없이 누구나 스스로 익히고 연습하는 일일한자 교육 플랫폼
        </p>
      </section>

      {/* 3 Main Gateway Cards */}
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
            padding: '2.5rem 1.75rem 2.25rem 1.75rem'
          }}
        >
          <div>
            <div style={{ margin: '0 auto 1.5rem auto', width: '100px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="96" height="90" viewBox="0 0 100 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="44" y="10" width="46" height="62" rx="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
                <path d="M76 10 L90 24 L76 24 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
                <line x1="50" y1="32" x2="84" y2="32" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="50" y1="42" x2="84" y2="42" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="50" y1="52" x2="84" y2="52" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="50" y1="62" x2="84" y2="62" stroke="#94a3b8" strokeWidth="1.5" />
                <line x1="67" y1="24" x2="67" y2="68" stroke="#94a3b8" strokeWidth="1.5" />
                <path d="M10 32 C 22 28, 34 28, 44 32 L 44 74 C 34 70, 22 70, 10 74 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M8 74 L 8 32 C 20 27, 32 27, 44 31" fill="none" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M44 32 C 54 28, 66 28, 78 32 L 78 74 C 66 70, 54 70, 44 74 Z" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M80 74 L 80 32 C 68 27, 56 27, 44 31" fill="none" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" />
                <rect x="22" y="20" width="8" height="22" rx="1" fill="#059669" stroke="#1e293b" strokeWidth="2" />
                <line x1="16" y1="42" x2="38" y2="42" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                <line x1="16" y1="50" x2="38" y2="50" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                <line x1="16" y1="58" x2="32" y2="58" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
                <line x1="50" y1="42" x2="72" y2="42" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                <line x1="50" y1="50" x2="72" y2="50" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                <line x1="50" y1="58" x2="66" y2="58" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <h2 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.85rem 0', letterSpacing: '-0.02em' }}>
              📖 학습지 만들기
            </h2>
            <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: 1.6, margin: '0 0 2rem 0', wordBreak: 'keep-all', fontWeight: 500 }}>
              공인 급수별 맞춤 학습지 A4<br />
              무료 인쇄 및 랜덤 5자 즉시 출력
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
              padding: '0.9rem 1.25rem',
              borderRadius: '14px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.05rem',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.28)',
              transition: 'background 0.2s'
            }}
          >
            <span>급수별 만들기</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Card 2: 내마음대로 학습지 만들기 */}
        <div
          className="gateway-card"
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '2.5px solid #7c3aed',
            boxShadow: '0 12px 30px -6px rgba(124, 58, 237, 0.14)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'center',
            padding: '2.5rem 1.75rem 2.25rem 1.75rem',
            position: 'relative'
          }}
        >
          <div style={{ position: 'absolute', top: '-13px', right: '20px', background: '#7c3aed', color: '#fff', fontSize: '0.78rem', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', boxShadow: '0 2px 6px rgba(124, 58, 237, 0.3)' }}>
            NEW 신규 기능
          </div>

          <div>
            <div style={{ margin: '0 auto 1.5rem auto', width: '100px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="96" height="90" viewBox="0 0 100 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="10" width="50" height="72" rx="6" fill="#ffffff" stroke="#7c3aed" strokeWidth="2.5" />
                <rect x="27" y="18" width="36" height="7" rx="2" fill="#ede9fe" />
                <line x1="27" y1="33" x2="63" y2="33" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
                <line x1="27" y1="43" x2="56" y2="43" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="27" y1="53" x2="63" y2="53" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
                <line x1="27" y1="63" x2="50" y2="63" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
                <g transform="rotate(22 66 45)">
                  <rect x="62" y="12" width="10" height="48" rx="3" fill="#7c3aed" stroke="#1e293b" strokeWidth="2" />
                  <polygon points="62,60 72,60 67,74" fill="#f59e0b" stroke="#1e293b" strokeWidth="2" />
                </g>
                <circle cx="16" cy="24" r="3" fill="#f59e0b" />
                <circle cx="82" cy="74" r="3" fill="#f59e0b" />
              </svg>
            </div>

            <h2 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.85rem 0', letterSpacing: '-0.02em' }}>
              ✏️ 내마음대로 학습지
            </h2>
            <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: 1.6, margin: '0 0 2rem 0', wordBreak: 'keep-all', fontWeight: 500 }}>
              원하는 한자 직접 입력·사자성어<br />
              6,111자 DB 자동 연동 맞춤 인쇄
            </p>
          </div>

          <Link
            to="/custom"
            className="gateway-card-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#7c3aed',
              color: '#ffffff',
              padding: '0.9rem 1.25rem',
              borderRadius: '14px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.05rem',
              boxShadow: '0 4px 14px rgba(124, 58, 237, 0.28)',
              transition: 'background 0.2s'
            }}
          >
            <span>내마음대로 만들기</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Card 3: 획순 연습하기 */}
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
            padding: '2.5rem 1.75rem 2.25rem 1.75rem'
          }}
        >
          <div>
            <div style={{ margin: '0 auto 1.5rem auto', width: '100px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="96" height="90" viewBox="0 0 100 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 32 26 C 42 16, 46 36, 38 48 C 30 60, 24 66, 34 76" fill="none" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <g transform="rotate(-18 64 54)">
                  <rect x="54" y="10" width="16" height="46" rx="5" fill="#3b82f6" stroke="#1e293b" strokeWidth="2.5" />
                  <path d="M 70 18 L 77 18 L 77 36 L 70 36" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="54" y1="46" x2="70" y2="46" stroke="#1d4ed8" strokeWidth="2.5" />
                  <polygon points="55,56 69,56 66,68 58,68" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2.5" />
                  <path d="M 58 68 C 58 76, 62 84, 62 84 C 62 84, 66 76, 66 68 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
                </g>
              </svg>
            </div>

            <h2 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.85rem 0', letterSpacing: '-0.02em' }}>
              ✍️ 획순 연습하기
            </h2>
            <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: 1.6, margin: '0 0 2rem 0', wordBreak: 'keep-all', fontWeight: 500 }}>
              살아 움직이는 애니메이션으로<br />
              바른 획순 단계별 연습
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
              padding: '0.9rem 1.25rem',
              borderRadius: '14px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '1.05rem',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)',
              transition: 'background 0.2s'
            }}
          >
            <span>획순 연습하기</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Featured Educational Story Columns Section (Direct Link Flow for Crawlers & Visitors) */}
      <section style={{ marginTop: '4.5rem', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              <BookMarked size={14} />
              <span>일일한자 교육 칼럼 (총 {STORY_DATABASE.length}편)</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.85rem)', color: '#0f172a', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
              선조들의 지혜와 올바른 한자 학습법을 전하는 교육 칼럼
            </h2>
          </div>
          <Link
            to="/story"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#059669',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.95rem'
            }}
          >
            <span>칼럼 전체 목록 보기 (총 {STORY_DATABASE.length}편)</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {recentStories.map((story) => (
            <article
              key={story.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                transition: 'transform 0.15s, box-shadow 0.15s'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, background: '#ecfdf5', padding: '2px 8px', borderRadius: '6px' }}>
                    제{story.id}편
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                    {story.date}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.65rem 0', lineHeight: 1.45, fontWeight: 700 }}>
                  <Link to={`/story/${story.id}`} style={{ color: '#0f172a', textDecoration: 'none' }}>
                    {story.title}
                  </Link>
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  {story.summary}
                </p>
              </div>

              <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                <Link
                  to={`/story/${story.id}`}
                  style={{
                    color: '#0284c7',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>칼럼 전문 읽기</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Comprehensive Academic Pedagogical Guide (High-Value Scholarship for Google Quality Review) */}
      <article
        className="landing-editorial-guide"
        style={{
          marginTop: '4.5rem',
          textAlign: 'left',
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
          color: '#1e293b',
          lineHeight: 1.8
        }}
      >
        <header style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>한자 교육학술 연구 &amp; 인지 발달 가이드</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#0f172a', fontWeight: 800, margin: '0 0 0.75rem 0', letterSpacing: '-0.02em' }}>
            한자 학습의 교육학적 원리와 문해력 발달 가이드
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>
            언어학 및 인지신경학 연구에 기초한 표의문자 학습 메커니즘, 획순의 기억 효과, 초·중등 교과서 개념어 분석
          </p>
        </header>

        {/* Section 1: 표의문자의 인지 처리 메커니즘 */}
        <section style={{ marginBottom: '2.75rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', color: '#0f172a', fontWeight: 700, marginBottom: '1rem' }}>
            <Brain size={22} color="#059669" />
            <span>1. 표의문자(表意文字)의 인지 처리 메커니즘과 장기 기억 형성 원리</span>
          </h3>
          <p style={{ marginBottom: '1rem', color: '#334155' }}>
            한자는 알파벳이나 한글과 같은 음소문자(Phonogram)와 달리, 사물의 형태와 본질적 의미가 글자 구조 안에 압축된 <strong>표의문자(Ideogram)</strong>입니다.
            인지언어학과 뇌영상 연구에 따르면, 표의문자를 읽고 쓸 때 인간의 뇌는 좌뇌의 언어 분석 중추뿐 아니라 우뇌의 시각·공간 인지 중추를 동시에 활성화하여 복합적인 신경망을 작동시킵니다.
          </p>
          <p style={{ marginBottom: '1rem', color: '#334155' }}>
            문자의 세 가지 구성 요소인 <strong>형태(자형 形), 소리(독음 聲), 뜻(훈 意)</strong>이 입체적으로 결합하는 이 과정은 정보를 단순한 단기 기억에 머무르게 하지 않고, 깊은 인지적 가공을 거친 <strong>'의미 기억(Semantic Memory)'</strong>으로 전환하도록 돕습니다.
          </p>
          <p style={{ color: '#334155' }}>
            특히 상형(象形), 지사(指事), 회의(會意), 형성(形聲) 등 한자의 근본적인 조자 원리를 이해하고 학습하면, 낯선 어휘를 접했을 때도 이미 습득한 글자의 뜻을 결합하여 새로운 낱말의 속뜻을 스스로 추론해 내는 고차원적 인지 어휘망(Semantic Network)이 형성됩니다.
          </p>
        </section>

        {/* Section 2: 3대 검정기관 비교 분석 */}
        <section style={{ marginBottom: '2.75rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', color: '#0f172a', fontWeight: 700, marginBottom: '1rem' }}>
            <Award size={22} color="#059669" />
            <span>2. 국내 3대 한자 공인검정기관 출제 체계와 학술적 평가 기준</span>
          </h3>
          <p style={{ marginBottom: '1.25rem', color: '#334155' }}>
            대한민국 공인 한자능력 검정시험은 주관 기관에 따라 평가 철학과 출제 방식에 뚜렷한 특징이 있습니다.
            각 기관의 배정한자 범위와 출제 성향을 올바르게 이해하면 학습 목적에 부합하는 체계적인 시험 대비가 가능합니다.
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 700 }}>검정기관</th>
                  <th style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 700 }}>출제 방식 및 특징</th>
                  <th style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 700 }}>학술적 평가 중점</th>
                  <th style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 700 }}>추천 학습 대상</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#059669' }}>한국어문회</td>
                  <td style={{ padding: '10px 14px' }}>주관식 쓰기 비중 70~80% (정자 중심)</td>
                  <td style={{ padding: '10px 14px' }}>정확한 자형 쓰기와 고전 독해 능력</td>
                  <td style={{ padding: '10px 14px' }}>정통 한문 실력 향상, 사학·국문학 수험생</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#059669' }}>대한검정회</td>
                  <td style={{ padding: '10px 14px' }}>객관식과 주관식의 균형적 안배</td>
                  <td style={{ padding: '10px 14px' }}>실생활 한자어 활용 및 어휘 유추력</td>
                  <td style={{ padding: '10px 14px' }}>유아, 초·중등생, 교과 연계 어휘 학습</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#059669' }}>대한상공회의소</td>
                  <td style={{ padding: '10px 14px' }}>전 문항 객관식 CBT (읽기 및 상용어 중심)</td>
                  <td style={{ padding: '10px 14px' }}>실무 경제·비즈니스 문서 이해도</td>
                  <td style={{ padding: '10px 14px' }}>취업 준비생, 공기업·대기업 직장인</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: 손글씨 쓰기와 획순의 기억 효과 */}
        <section style={{ marginBottom: '2.75rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', color: '#0f172a', fontWeight: 700, marginBottom: '1rem' }}>
            <CheckCircle2 size={22} color="#059669" />
            <span>3. 인지신경학으로 입증된 손글씨 필기와 바른 획순(필순)의 기억 강화 원리</span>
          </h3>
          <p style={{ marginBottom: '1rem', color: '#334155' }}>
            디지털 타이핑 환경이 보편화된 오늘날에도 종이에 직접 연필로 글씨를 쓰는 필기 행위는 대체할 수 없는 강력한 인지 훈련으로 평가받습니다.
            신경해부학의 **'펜필드 호문쿨루스(Penfield's Homunculus)'** 모델에 따르면, 대뇌 운동 피질에서 손가락과 손바닥을 관장하는 영역은 신체 부위 중 가장 넓은 면적을 차지합니다.
          </p>
          <p style={{ marginBottom: '1rem', color: '#334155' }}>
            키보드 자판을 누르는 동작은 모든 문자에 동일한 압력 자극을 가하지만, 한자를 손글씨로 쓰는 과정은 획의 시작과 끝에서의 필압 조절, 가로획과 세로획의 방향성 감각, 삐침과 파임에서의 속도 제어 등 정밀한 미세 운동 피드백을 수반합니다.
            이 운동 감각은 시각 정보와 결합하여 **'신체적 운동 기억(Muscle Memory)'**을 형성합니다.
          </p>
          <p style={{ color: '#334155' }}>
            또한 한자의 획순은 수천 년 동안 인류가 찾아낸 '가장 조화롭고 효율적인 동선'입니다.
            올바른 획순에 맞추어 사각형 격자 칸 안에서 글씨를 쓰면 글자의 시각적 비례와 공간 균형 감각이 안정되며, 뇌가 복잡한 글자를 하나의 논리적인 덩어리로 묶어 처리(청킹, Chunking)하게 되므로 암기 속도와 지속 기간이 크게 향상됩니다.
          </p>
        </section>

        {/* Section 4: 초등 교과서 한자어와 문해력 */}
        <section style={{ marginBottom: '2.75rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', color: '#0f172a', fontWeight: 700, marginBottom: '1rem' }}>
            <FileText size={22} color="#059669" />
            <span>4. 초등 교과서 개념어의 80%를 지배하는 학습 도구어(Academic Vocabulary)의 중요성</span>
          </h3>
          <p style={{ marginBottom: '1rem', color: '#334155' }}>
            국립국어원의 어휘 조사 연구에 따르면 한국어 어휘 체계에서 한자어의 비중은 과반 이상이며, 특히 <strong>초·중·고 교과서에 수록된 학습 도구어의 80% 이상</strong>이 한자어로 구성되어 있습니다.
            초등학교 3~4학년 시기에 과목별 학업 성취도의 격차가 본격적으로 벌어지는 핵심 원인은 일상 구어체가 아닌 교과서 속 개념어를 해석하는 문해력의 차이에서 비롯됩니다.
          </p>
          <p style={{ marginBottom: '1rem', color: '#334155' }}>
            예를 들어 수학의 **'분수(分數: 나눌 분, 셈 수)'**, 과학의 **'광합성(光合成: 빛 광, 합할 합, 이룰 성)'**, 사회의 **'민주주의(民主主義: 백성 민, 주인 주)'**처럼, 개념어를 구성하는 개별 한자의 훈음을 알고 있는 학생은 긴 설명을 외우지 않고도 글자 자체에서 정의를 직관적으로 파악해 냅니다.
          </p>
          <p style={{ color: '#334155' }}>
            한자 어휘 지식은 형태와 소리가 같지만 뜻이 다른 동음이의어(同音異義語)를 문맥에 맞게 구별하는 데에도 핵심적인 역할을 합니다.
            매일 꾸준히 기초 한자를 익히는 습관은 모든 교과 학습의 기초 체력이 되는 독해력과 논리적 사고력을 단단하게 다지는 지름길입니다.
          </p>
        </section>

        {/* Section 5: 사자성어와 철학적 사고력 */}
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', color: '#0f172a', fontWeight: 700, marginBottom: '1rem' }}>
            <Compass size={22} color="#059669" />
            <span>5. 사자성어(四字成語)를 통한 철학적 사고력과 인성 함양</span>
          </h3>
          <p style={{ marginBottom: '1rem', color: '#334155' }}>
            사자성어는 4개의 글자 속에 수천 년 역사 속 선현들의 삶의 굴곡, 결단, 도덕적 성찰을 정교하게 응축해 놓은 동양 인문학의 정수입니다.
            《논어》, 《서경》, 《채근담》 등의 고전에서 유래한 사자성어는 단순한 수험용 어휘를 넘어 삶의 복잡한 문제를 마주했을 때 균형 있는 시각을 제공합니다.
          </p>
          <p style={{ marginBottom: '1rem', color: '#334155' }}>
            고난 끝에 찾아오는 참된 결실을 일깨우는 <strong>고진감래(苦盡甘來)</strong>, 철저한 사전 준비의 평온함을 강조하는 <strong>유비무환(有備無患)</strong>, 극단을 경계하고 조화를 권면하는 <strong>과유불급(過猶不及)</strong>, 실패 앞에서도 굴하지 않고 다시 일어서는 회복탄력성을 주는 <strong>칠전팔기(七顚八起)</strong>는 시대를 초월하여 우리의 인격을 다듬는 훌륭한 길잡이가 됩니다.
          </p>
          <p style={{ color: '#334155' }}>
            사자성어에 얽힌 풍부한 역사적 고사와 자형의 유래를 음미하는 과정은 어린이에게는 올바른 인성 교육의 기회가 되며, 성인에게는 삶의 통찰을 넓히고 언어적 품격을 높여주는 유익한 인문학 수양의 여정이 될 것입니다.
          </p>
        </section>

        {/* Story Link Footer */}
        <footer style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ color: '#64748b', fontSize: '0.95rem' }}>더 많은 한자 이야기와 고사성어 유래를 확인해 보세요.</span>
          <Link to="/story" style={{ color: '#059669', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span>한자 이야기 교육 칼럼 전체 38편 읽기</span>
            <ArrowRight size={16} />
          </Link>
        </footer>
      </article>
    </div>
  );
}
