import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Award, HelpCircle, FileText, Sparkles } from 'lucide-react';
import { useSeo } from '../utils/useSeo';

export default function LandingPage() {
  useSeo(
    '일일한자 - 검정기관별 무료 급수 한자 학습지 만들기 & 획순 연습',
    '회원가입 없이 누구나 무료로 인쇄하고 연습하는 일일한자! 공인 급수별 맞춤 학습지 A4 인쇄 및 살아 움직이는 획순 애니메이션을 제공합니다.'
  );

  return (
    <div className="landing-page-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '3.5rem 1rem 4.5rem 1rem', textAlign: 'center' }}>
      {/* Hero Title */}
      <section style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          오늘 어떤 한자 공부를 해볼까요?
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#64748b', margin: 0, lineHeight: 1.6, wordBreak: 'keep-all' }}>
          회원가입 없이 누구나 무료로 인쇄하고 연습하는 일일한자
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
          {/* Badge */}
          <div style={{ position: 'absolute', top: '-13px', right: '20px', background: '#7c3aed', color: '#fff', fontSize: '0.78rem', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', boxShadow: '0 2px 6px rgba(124, 58, 237, 0.3)' }}>
            NEW 신규 기능
          </div>

          <div>
            {/* Mockup Illustration: Custom Sheet + Pen + Sparkles */}
            <div style={{ margin: '0 auto 1.5rem auto', width: '100px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="96" height="90" viewBox="0 0 100 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background Sheet */}
                <rect x="20" y="10" width="50" height="72" rx="6" fill="#ffffff" stroke="#7c3aed" strokeWidth="2.5" />
                {/* Header banner */}
                <rect x="27" y="18" width="36" height="7" rx="2" fill="#ede9fe" />
                {/* Grid / dotted lines */}
                <line x1="27" y1="33" x2="63" y2="33" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
                <line x1="27" y1="43" x2="56" y2="43" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="27" y1="53" x2="63" y2="53" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
                <line x1="27" y1="63" x2="50" y2="63" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
                {/* Pen Writing */}
                <g transform="rotate(22 66 45)">
                  <rect x="62" y="12" width="10" height="48" rx="3" fill="#7c3aed" stroke="#1e293b" strokeWidth="2" />
                  <polygon points="62,60 72,60 67,74" fill="#f59e0b" stroke="#1e293b" strokeWidth="2" />
                </g>
                {/* Sparkle Stars */}
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

            <h2 style={{ fontSize: '1.5rem', color: '#0f172a', fontWeight: 800, margin: '0 0 0.85rem 0', letterSpacing: '-0.02em' }}>
              ✍️ 획순 연습하기
            </h2>
            <p style={{ color: '#334155', fontSize: '1.02rem', lineHeight: 1.6, margin: '0 0 2rem 0', wordBreak: 'keep-all', fontWeight: 500 }}>
              살아 움직이는 애니메이션으로<br />
              바른 획순 완벽 마스터
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

      {/* Educational Guide & SEO Editorial Section for Google Quality & AdSense Review */}
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
          lineHeight: 1.75
        }}
      >
        <header style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', color: '#059669', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>무료 급수 한자 학습 플랫폼</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#0f172a', fontWeight: 800, margin: '0 0 0.75rem 0', letterSpacing: '-0.02em' }}>
            일일한자 완벽 가이드: 급수 한자 공부법과 무료 학습지 활용 노하우
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', margin: 0 }}>
            유아·초등학생의 기초 문해력 향상부터 취업·승진을 위한 국가공인 자격증 취득까지, 하루 10분 일일한자와 함께 완성해 보세요.
          </p>
        </header>

        {/* Section 1: 일일한자 소개 */}
        <section style={{ marginBottom: '2.75rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', color: '#0f172a', fontWeight: 700, marginBottom: '1rem' }}>
            <BookOpen size={22} color="#059669" />
            <span>1. 일일한자는 어떤 서비스인가요?</span>
          </h3>
          <p style={{ marginBottom: '1rem', color: '#334155' }}>
            <strong>일일한자(11HANJA.COM)</strong>는 회원가입이나 유료 결제 없이 누구나 자유롭게 이용할 수 있는 <strong>100% 무료 한자 교육 포털</strong>입니다.
            우리나라 대표 3대 공인 검정기관인 <strong>한국어문회(5,978자), 대한검정회, 대한상공회의소</strong>의 급수 체계를 완벽하게 분류 지원하며,
            공부하고 싶은 한자만 쏙쏙 골라 클릭 한 번으로 나만의 <strong>A4 맞춤 쓰기 학습지</strong>를 인쇄할 수 있습니다.
          </p>
          <p style={{ marginBottom: '1rem', color: '#334155' }}>
            또한, 내가 공부하고 싶은 한자나 단어, 사자성어, 가족 이름을 직접 입력하여 맞춤형 쓰기 노트를 만드는 <strong>'내마음대로 학습지 만들기'</strong> 기능도 제공하여, 정형화된 급수 한자를 넘어 개별 학습 목적에 최적화된 공부가 가능합니다.
          </p>
          <p style={{ color: '#334155' }}>
            아울러, 글자를 쓸 때 헷갈리기 쉬운 획순을 인터랙티브 <strong>벡터 획순 애니메이션</strong>으로 실시간 제공하여,
            눈으로 순서를 확인하고 손으로 직접 따라 써보며 뇌에 한자의 구조를 입체적으로 각인할 수 있도록 설계되었습니다.
          </p>
        </section>

        {/* Section 2: 3대 검정기관 비교 */}
        <section style={{ marginBottom: '2.75rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', color: '#0f172a', fontWeight: 700, marginBottom: '1rem' }}>
            <Award size={22} color="#059669" />
            <span>2. 국내 3대 한자 공인검정기관 비교 분석</span>
          </h3>
          <p style={{ marginBottom: '1.25rem', color: '#334155' }}>
            한자 자격증을 준비할 때 가장 중요한 것은 응시 목적에 맞는 검정기관을 올바르게 선택하는 것입니다.
            일일한자에서는 상단 기관 선택 탭을 통해 언제든 목표 기관 기준의 배정 한자를 전환하여 학습할 수 있습니다.
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 700 }}>검정기관</th>
                  <th style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 700 }}>출제 방식</th>
                  <th style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 700 }}>난이도</th>
                  <th style={{ padding: '10px 14px', color: '#0f172a', fontWeight: 700 }}>추천 대상</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#059669' }}>한국어문회</td>
                  <td style={{ padding: '10px 14px' }}>주관식 쓰기 중심 (70~80%)</td>
                  <td style={{ padding: '10px 14px' }}>최상 (전통적 권위)</td>
                  <td style={{ padding: '10px 14px' }}>정통 한문 실력파, 대입·사학과 수험생</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#059669' }}>대한검정회</td>
                  <td style={{ padding: '10px 14px' }}>객관식 + 주관식 균형</td>
                  <td style={{ padding: '10px 14px' }}>중간 (실용적 조화)</td>
                  <td style={{ padding: '10px 14px' }}>유아, 초·중등생, 방과후 한자 학습</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#059669' }}>대한상공회의소</td>
                  <td style={{ padding: '10px 14px' }}>100% 객관식 CBT (읽기 중심)</td>
                  <td style={{ padding: '10px 14px' }}>중하 (단기 합격)</td>
                  <td style={{ padding: '10px 14px' }}>취업 준비생, 공기업·대기업 직장인</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: 한자 공부 4단계 루틴 */}
        <section style={{ marginBottom: '2.75rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', color: '#0f172a', fontWeight: 700, marginBottom: '1rem' }}>
            <CheckCircle2 size={22} color="#059669" />
            <span>3. 일일한자로 완성하는 4단계 한자 암기 공식</span>
          </h3>
          <ol style={{ paddingLeft: '1.25rem', margin: 0, color: '#334155' }}>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>1단계: 훈음(뜻과 소리) 소리 내어 읽기</strong> - 눈으로 글자 모양을 보고 입으로 "하늘 천, 따 지, 평평할 평"처럼 소리 내어 리듬감 있게 읽습니다.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>2단계: 부수(部首)를 통한 의미 파악</strong> - 한자의 80% 이상은 부수가 뜻을 나타냅니다. 물 수(氵)가 들어가면 물과 관련되고, 나무 목(木)이 들어가면 식물과 관련된다는 원리를 이해합니다.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>3단계: 바른 획순(필순)으로 손글씨 쓰기</strong> - 일일한자의 맞춤 A4 노트를 인쇄하여 격자 칸 안에서 균형을 잡으며 또박또박 씁니다. 손을 움직일 때 뇌의 기억 중추가 강력하게 자극됩니다.
            </li>
            <li>
              <strong>4단계: 교과서 및 일상 단어로 확장하기</strong> - 오늘 배운 한자가 들어간 단어(예: 平 ➔ 平和 평화, 水平線 수평선)를 찾아보며 실전 어휘력으로 연결합니다.
            </li>
          </ol>
        </section>

        {/* Section 4: 문해력과 한자 어휘력 */}
        <section style={{ marginBottom: '2.75rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', color: '#0f172a', fontWeight: 700, marginBottom: '1rem' }}>
            <FileText size={22} color="#059669" />
            <span>4. 초등 문해력을 결정짓는 교과서 한자어의 힘</span>
          </h3>
          <p style={{ marginBottom: '1rem', color: '#334155' }}>
            우리말 어휘의 70% 이상, 그리고 <strong>초·중·고 교과서 학습 도구어의 90% 이상은 한자어</strong>로 이루어져 있습니다.
            초등학교 3학년 이후 수학(분수, 직사각형), 과학(광합성, 증발), 사회(민주주의, 수출/수입)에서 갑자기 학업 격차가 벌어지는 원인은 개념을 구성하는 한자 어휘를 이해하지 못하기 때문입니다.
          </p>
          <p style={{ color: '#334155' }}>
            한자를 아는 아이는 낯선 단어를 보더라도 글자의 뜻을 조합해 스스로 개념을 유추해 낼 수 있는 <strong>'자기주도 어휘력'</strong>을 갖추게 됩니다.
            하루 10분, 일일한자의 '랜덤 5자' 학습지로 자녀의 평생 문해력 기본기를 다져주세요.
          </p>
        </section>

        {/* Section 5: 자주 묻는 질문 FAQ */}
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', color: '#0f172a', fontWeight: 700, marginBottom: '1.25rem' }}>
            <HelpCircle size={22} color="#059669" />
            <span>5. 자주 묻는 질문 (FAQ)</span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem 1.25rem', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>Q. 학습지 생성과 인쇄는 정말 완전 무료인가요?</div>
              <div style={{ color: '#475569', fontSize: '0.95rem' }}>네, 일일한자의 모든 한자 데이터 조회, 획순 연습, 그리고 A4 학습지 인쇄 기능은 회원가입이나 결제 없이 100% 무료로 이용하실 수 있습니다.</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem 1.25rem', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>Q. 스마트폰이나 태블릿에서도 인쇄가 가능한가요?</div>
              <div style={{ color: '#475569', fontSize: '0.95rem' }}>네, 모바일 브라우저에서도 '학습지 만들기' 후 [인쇄하기] 버튼을 누르시면 PDF 저장 또는 무선 프린터(Wi-Fi AirPrint 등)로 즉시 출력이 가능합니다.</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem 1.25rem', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>Q. 초보자는 몇 급부터 시작하는 것이 좋은가요?</div>
              <div style={{ color: '#475569', fontSize: '0.95rem' }}>처음 시작하는 유아 및 초등학생은 가장 기초적인 50자로 구성된 <strong>8급</strong>부터 시작하는 것을 강력히 추천합니다. 성취감을 느끼며 자연스럽게 7급, 6급으로 올라갈 수 있습니다.</div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem 1.25rem', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>Q. 급수표에 없는 한자나 사자성어도 학습지로 만들 수 있나요?</div>
              <div style={{ color: '#475569', fontSize: '0.95rem' }}>네! 상단 메뉴의 <strong>[내마음대로 학습지 만들기]</strong>를 이용하시면 원하는 한자를 직접 입력하거나 복사하여 붙여넣기만 하면 6,111자 DB와 자동 연동되어 나만의 맞춤 A4 학습지를 즉시 제작하실 수 있습니다.</div>
            </div>
          </div>
        </section>

        {/* Story Link Footer */}
        <footer style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ color: '#64748b', fontSize: '0.95rem' }}>더 깊이 있는 한자 공부법과 유래가 궁금하신가요?</span>
          <Link to="/story" style={{ color: '#059669', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span>한자 이야기 칼럼 전체 보기</span>
            <ArrowRight size={16} />
          </Link>
        </footer>
      </article>
    </div>
  );
}
