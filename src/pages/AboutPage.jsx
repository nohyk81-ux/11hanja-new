import React, { useEffect } from 'react';
import { BookOpen, Printer, Sparkles, Award, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSeo } from '../utils/useSeo';

export default function AboutPage() {
  useSeo(
    '서비스 소개 및 활용 가이드 - 일일한자 | 11HANJA.COM',
    '누구나 회원가입 없이 무료로 급수별 한자 학습지를 인쇄하고 획순을 인터랙티브하게 익힐 수 있는 일일한자(11HANJA.COM)의 서비스 소개와 제작 배경, 활용 가이드입니다.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container" style={{ maxWidth: '850px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={18} />
          메인으로 돌아가기
        </Link>
      </div>

      <article className="content-page-card">
        <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <BookOpen size={28} style={{ color: 'var(--primary)' }} />
            <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: 0 }}>일일한자 서비스 소개</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '1.05rem', margin: '0.5rem 0 0 0', lineHeight: 1.6 }}>
            "매일 10분, 부담 없는 한자 공부로 문해력의 기초를 세웁니다."
          </p>
        </header>

        <section style={{ lineHeight: '1.85', color: '#334155', fontSize: '1.02rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: '#0f172a', marginTop: '1.5rem', marginBottom: '0.75rem', borderLeft: '4px solid var(--primary)', paddingLeft: '0.75rem' }}>
            1. 일일한자(11HANJA.COM)의 탄생 배경
          </h2>
          <p>
            우리말 어휘의 70% 이상, 교과서 주요 학습 개념의 90% 이상은 <strong>한자어(漢字語)</strong>로 이루어져 있습니다. 
            하지만 많은 학생들이 비싼 학습지 구독료나 학원비, 복잡한 회원가입 절차 때문에 한자 학습의 진입 장벽을 느끼고 있습니다.
          </p>
          <p>
            <strong>일일한자</strong>는 유아부터 초·중·고 학생, 국가공인 한자 자격증을 준비하는 성인 및 취업 준비생까지 누구나 아무런 조건 없이 
            <strong>회원가입 없이 100% 무료</strong>로 최고의 한자 학습 환경을 누릴 수 있도록 개발된 개방형 교육 웹 플랫폼입니다.
          </p>

          <h2 style={{ fontSize: '1.3rem', color: '#0f172a', marginTop: '2.5rem', marginBottom: '1rem', borderLeft: '4px solid var(--primary)', paddingLeft: '0.75rem' }}>
            2. 일일한자만의 4대 핵심 기능
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>
                <Award size={20} />
                <span>국내 3대 한자 검정기관 전면 호환</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569', lineHeight: 1.6 }}>
                가장 널리 응시하는 <strong>한국어문회(5,978자)</strong>, <strong>대한검정회</strong>, <strong>대한상공회의소</strong>의 급수 체계를 완벽 지원하여 원하는 시험 기관에 맞춰 학습할 수 있습니다.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>
                <Printer size={20} />
                <span>맞춤형 A4 쓰기 학습지 즉시 인쇄</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569', lineHeight: 1.6 }}>
                원하는 한자 카드를 클릭하여 담거나, <strong>[랜덤 5자 학습지]</strong> 버튼 하나로 매일매일 새로운 일일 학습지를 단 1초 만에 깔끔한 A4 규격으로 생성·출력합니다.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>
                <Sparkles size={20} />
                <span>인터랙티브 획순 쓰기 애니메이션</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569', lineHeight: 1.6 }}>
                한 획 한 획 올바른 필순(획순)을 보여주는 실시간 애니메이션 가이드와 직접 마우스/터치로 화면에 글자를 따라 써볼 수 있는 연습 캔버스를 제공합니다.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.5rem' }}>
                <CheckCircle2 size={20} />
                <span>가입 및 결제 없는 완전한 자유</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569', lineHeight: 1.6 }}>
                개인정보 수집이나 회원가입 절차 없이 PC, 태블릿, 스마트폰 등 브라우저만 있으면 언제 어디서든 바로 무료로 이용할 수 있습니다.
              </p>
            </div>
          </div>

          <h2 style={{ fontSize: '1.3rem', color: '#0f172a', marginTop: '2.5rem', marginBottom: '0.75rem', borderLeft: '4px solid var(--primary)', paddingLeft: '0.75rem' }}>
            3. 효과적인 한자 학습법 추천
          </h2>
          <ol style={{ paddingLeft: '1.3rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>하루 5자씩 꾸준히:</strong> 처음부터 무리하게 20~30자씩 외우기보다, 매일 아침 '랜덤 5자 학습지' 1장을 출력하여 10분간 손글씨로 써보는 습관이 뇌의 장기기억 형성에 가장 효과적입니다.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>획순 눈으로 익히기:</strong> 글씨를 손으로 쓰기 전 [획순 연습하기] 메뉴에서 획순 애니메이션을 2~3회 관찰하세요. 바른 획순은 글씨의 균형을 잡고 암기 속도를 2배 이상 높여줍니다.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>한자 이야기 칼럼 읽기:</strong> 한자의 유래, 사자성어의 숨은 고사, 어휘력 확장 비결을 다룬 <Link to="/story" style={{ color: 'var(--primary)', fontWeight: 600 }}>[한자 이야기]</Link> 칼럼을 자녀와 함께 읽어보시면 한자에 대한 호기심이 한층 깊어집니다.
            </li>
          </ol>

          <div style={{ background: '#f1f5f9', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', marginTop: '2.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '0.5rem' }}>지금 바로 한자 공부를 시작해보세요!</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.25rem' }}>원하는 급수를 선택하고 나만의 맞춤형 학습지를 인쇄할 수 있습니다.</p>
            <Link to="/grade/8GR" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '0.75rem 2rem', fontWeight: 600 }}>
              기초 8급 한자 연습하러 가기
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
