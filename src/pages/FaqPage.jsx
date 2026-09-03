import React, { useEffect } from 'react';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSeo } from '../utils/useSeo';

export default function FaqPage() {
  useSeo(
    '자주 묻는 질문(FAQ) - 일일한자 | 11HANJA.COM',
    '일일한자 한자 학습지 무료 인쇄, 급수 체계, 획순 연습, 저작권 및 학교/학원 내 활용에 대한 자주 묻는 질문과 답변입니다.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: '일일한자의 모든 서비스는 정말 100% 무료인가요?',
      a: '네, 일일한자는 회원가입이나 결제 없이 모든 급수의 한자 데이터 조회, 인터랙티브 획순 연습, PDF A4 학습지 생성 및 인쇄 기능을 무료로 제공합니다. 학교, 학원, 유치원, 가정 등 어디서나 자유롭게 활용하실 수 있습니다.'
    },
    {
      q: '출력한 학습지를 학교 수업이나 학원 교재로 사용해도 되나요?',
      a: '네, 상업적으로 재판매하거나 출판하는 행위를 제외한 공교육, 홈스쿨링, 학원 보충 학습용 출력 및 배포는 전면 허용됩니다. 출처(11HANJA.COM)가 표기된 상태로 자유롭게 사용해 주세요.'
    },
    {
      q: '한국어문회, 대한검정회, 상공회의소 중 어떤 기관을 선택해야 하나요?',
      a: '초등학생이나 일반 한자능력검정시험을 준비하신다면 가장 대중적이고 응시자가 많은 [한국어문회]를 추천드립니다. 유아 및 기초 한자 중심의 차근차근한 급수 승급을 원하신다면 [대한검정회]를, 직장인 실무 및 공기업/취업 가산점 중심이라면 [대한상공회의소]를 선택하시면 좋습니다.'
    },
    {
      q: '학습지 인쇄 시 용지 크기나 여백 설정은 어떻게 해야 하나요?',
      a: '일일한자 인쇄 시스템은 A4 용지 세로 방향(Portrait)에 정확히 맞추어 디자인되어 있습니다. 인쇄 미리보기 창에서 [용지 크기: A4], [여백: 기본 또는 없음], [배경 그래픽 인쇄: 체크]를 선택하시면 가장 선명하고 예쁘게 출력됩니다.'
    },
    {
      q: '일부 한자의 획순 애니메이션이 나오지 않아요.',
      a: '한국 전통 정자체(강희자전체) 중 일부 극희귀 한자는 오픈소스 획순 데이터베이스에 등록되어 있지 않을 수 있습니다. 데이터가 없는 한자는 표준 폰트 렌더링으로 안전하게 전환되며, 지속적인 업데이트를 통해 자체 SVG 획순을 보강하고 있습니다.'
    },
    {
      q: '오탈자나 한자 훈음 수정 요청은 어디로 보내면 되나요?',
      a: '사이트 하단의 [문의하기] 메뉴를 통해 글자와 올바른 훈음, 급수를 남겨주시면 운영팀에서 즉시 검토 후 반영해 드립니다.'
    }
  ];

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={18} />
          메인으로 돌아가기
        </Link>
      </div>

      <article style={{ background: 'white', borderRadius: '16px', padding: '2.5rem 2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <HelpCircle size={28} style={{ color: 'var(--primary)' }} />
            <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: 0 }}>자주 묻는 질문 (FAQ)</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
            일일한자 이용에 관해 가장 많이 문의해 주시는 질문들을 모았습니다.
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '1.1rem', color: '#0f172a', margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 800 }}>Q.</span>
                <span>{faq.q}</span>
              </h2>
              <p style={{ margin: 0, color: '#475569', lineHeight: 1.7, fontSize: '0.98rem', paddingLeft: '1.5rem' }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b', marginBottom: '1rem' }}>원하시는 답변을 찾지 못하셨나요?</p>
          <Link to="/contact" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '0.75rem 1.5rem' }}>
            운영팀에 직접 문의하기
          </Link>
        </div>
      </article>
    </div>
  );
}
