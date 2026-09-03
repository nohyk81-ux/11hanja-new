import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSeo } from '../utils/useSeo';

export default function LandingPage() {
  useSeo(
    '일일한자 - 무료 급수 한자 학습지 생성 및 인터랙티브 획순 연습',
    '회원가입 없이 100% 무료! 한국어문회, 대한검정회, 상공회의소 급수별 맞춤 A4 학습지 인쇄 및 움직이는 획순 애니메이션으로 매일 10분 한자를 마스터하세요.'
  );

  return (
    <div className="landing-page-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1rem 4rem 1rem', textAlign: 'center' }}>
      {/* Hero Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#0f172a', fontWeight: 800, margin: '0 0 1rem 0', letterSpacing: '-0.02em', lineHeight: 1.3 }}>
          오늘 어떤 한자 공부를 해볼까요?
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#64748b', margin: 0, lineHeight: 1.6, wordBreak: 'keep-all' }}>
          회원가입 없이 누구나 무료로 인쇄하고 연습하는 일일한자
        </p>
      </section>

      {/* 2 Main Gateway Cards */}
      <section className="landing-grid">
        {/* Card 1: 학습지 생성하기 */}
        <div
          className="gateway-card"
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '2px solid #10b981',
            boxShadow: '0 12px 30px -6px rgba(16, 185, 129, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.25s, box-shadow 0.25s'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                <BookOpen size={30} />
              </div>
              <span style={{ background: '#ecfdf5', color: '#059669', fontSize: '0.85rem', fontWeight: 700, padding: '4px 12px', borderRadius: '12px' }}>
                인기 1위
              </span>
            </div>

            <h2 style={{ fontSize: '1.65rem', color: '#0f172a', fontWeight: 700, margin: '0 0 0.75rem 0' }}>
              📖 학습지 생성하기
            </h2>
            <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.6, margin: '0 0 1.5rem 0', wordBreak: 'keep-all' }}>
              공인 급수별 맞춤 학습지 A4 무료 인쇄! 오늘의 랜덤 5자 즉시 출력부터 원하는 글자만 골라 담는 나만의 학습지까지 지원합니다.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>한국어문회 · 대한검정회 · 상공회의소 전 급수</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>A4 인쇄 맞춤 획순 가이드 및 따라쓰기 칸</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>버튼 1번으로 오늘의 5자 즉시 출력</span>
              </li>
            </ul>
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
              borderRadius: '14px',
              textDecoration: 'none',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
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
            background: '#ffffff',
            borderRadius: '24px',
            border: '2px solid #0284c7',
            boxShadow: '0 12px 30px -6px rgba(2, 132, 199, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.25s, box-shadow 0.25s'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7' }}>
                <Layers size={30} />
              </div>
              <span style={{ background: '#f0f9ff', color: '#0284c7', fontSize: '0.85rem', fontWeight: 700, padding: '4px 12px', borderRadius: '12px' }}>
                인터랙티브
              </span>
            </div>

            <h2 style={{ fontSize: '1.65rem', color: '#0f172a', fontWeight: 700, margin: '0 0 0.75rem 0' }}>
              ✍️ 획순 연습하기
            </h2>
            <p style={{ color: '#475569', fontSize: '1.02rem', lineHeight: 1.6, margin: '0 0 1.5rem 0', wordBreak: 'keep-all' }}>
              살아 움직이는 획순 애니메이션으로 올바른 필순을 한눈에! 부수와 총획수 정보와 함께 바른 글씨 쓰기를 완벽 마스터하세요.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} color="#0284c7" />
                <span>한 획씩 순서대로 그려지는 시각 획순 뷰어</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} color="#0284c7" />
                <span>공식 부수, 총획수, 훈음(뜻과 소리) 완벽 표기</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} color="#0284c7" />
                <span>글자 재생, 일시정지, 반복 재생 인터랙션</span>
              </li>
            </ul>
          </div>

          <Link
            to="/stroke/8GR"
            className="gateway-card-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#0284c7',
              color: '#ffffff',
              borderRadius: '14px',
              textDecoration: 'none',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)',
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
