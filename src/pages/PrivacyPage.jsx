import React, { useEffect } from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSeo } from '../utils/useSeo';

export default function PrivacyPage() {
  useSeo(
    '개인정보처리방침 - 일일한자 | 11HANJA.COM',
    '일일한자(11HANJA.COM)의 개인정보처리방침입니다. 이용자의 개인정보 보호 및 쿠키, 구글 애드센스 관련 처리 방침을 안내합니다.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <ShieldCheck size={28} style={{ color: 'var(--primary)' }} />
            <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: 0 }}>개인정보처리방침</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>시행일자: 2026년 7월 31일 (최종 개정: 2026년 9월 3일)</p>
        </header>

        <section style={{ lineHeight: '1.8', color: '#334155', fontSize: '1rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong>일일한자 (11HANJA.COM)</strong>(이하 "서비스")는 이용자의 개인정보를 매우 중요하게 생각하며, 「개인정보 보호법」 및 관련 법령을 엄격히 준수하고 있습니다. 본 개인정보처리방침은 서비스가 이용자의 정보를 어떻게 다루고 안전하게 보호하는지 명확히 설명합니다.
          </p>

          <h2 style={{ fontSize: '1.25rem', color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem', borderLeft: '4px solid var(--primary)', paddingLeft: '0.75rem' }}>
            1. 개인정보 수집 항목 및 방법
          </h2>
          <p>
            본 서비스는 <strong>회원가입 및 로그인이 필요 없는 무료 공공 교육 서비스</strong>입니다.
          </p>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
            <li><strong>기본 이용 시:</strong> 이름, 주민등록번호, 연락처, 이메일 등 어떠한 개인식별정보도 일체 요구하거나 데이터베이스에 수집·저장하지 않습니다.</li>
            <li><strong>이용자 문의 시:</strong> [문의하기] 양식을 통해 이용자가 직접 입력하는 이름, 이메일 주소, 문의 내용은 오직 고객 문의 처리 및 답변 발송 목적으로만 사용되며, 문의 처리가 완료된 후 지체 없이 안전하게 파기됩니다.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem', borderLeft: '4px solid var(--primary)', paddingLeft: '0.75rem' }}>
            2. 쿠키(Cookie) 및 서드파티 분석/광고 기술 운용 고지
          </h2>
          <p>
            서비스는 사이트 이용 행태 분석 및 무료 서비스 운영비 조달을 위해 제3자 서비스(Google AdSense, Microsoft Clarity)를 활용하고 있으며, 이 과정에서 브라우저 쿠키(Cookie)가 사용될 수 있습니다.
          </p>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
            <li>
              <strong>구글 애드센스 (Google AdSense):</strong>
              <br />
              - 구글을 포함한 제3자 광고 공급업체는 이용자가 본 웹사이트 또는 다른 웹사이트를 과거에 방문한 기록을 기반으로 맞춤형 광고를 게재하기 위해 쿠키를 사용합니다.
              <br />
              - 이용자는 <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" style={{ color: '#0284c7', textDecoration: 'underline' }}>구글 광고 설정 페이지</a>를 방문하여 개인 맞춤형 광고 수신을 언제든지 차단 및 관리할 수 있습니다.
              <br />
              - 또한 <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer" style={{ color: '#0284c7', textDecoration: 'underline' }}>www.aboutads.info</a>를 통해 제3자 공급업체의 쿠키 사용을 선택 해제할 수 있습니다.
            </li>
            <li style={{ marginTop: '0.75rem' }}>
              <strong>마이크로소프트 클레리티 (Microsoft Clarity):</strong>
              <br />
              - 웹사이트 사용성 개선(클릭 수, 스크롤 반응, 페이지 머문 시간 등)을 위해 사용되며, 모든 행동 정보는 익명 처리되어 통계 목적으로만 집계됩니다. 세부 내용은 <a href="https://privacy.microsoft.com/ko-kr/privacystatement" target="_blank" rel="noreferrer" style={{ color: '#0284c7', textDecoration: 'underline' }}>마이크로소프트 개인정보처리방침</a>에서 확인하실 수 있습니다.
            </li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem', borderLeft: '4px solid var(--primary)', paddingLeft: '0.75rem' }}>
            3. 쿠키의 설치/운영 및 거부 방법
          </h2>
          <p>
            이용자는 웹 브라우저의 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있는 선택권을 가지고 있습니다.
          </p>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: '1rem', color: '#475569', fontSize: '0.95rem' }}>
            <li><strong>Chrome:</strong> 웹브라우저 우측 상단 설정 → 개인정보 보호 및 보안 → 서드 파티 쿠키 차단</li>
            <li><strong>Edge:</strong> 설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터 관리 및 삭제</li>
            <li><strong>Safari:</strong> 환경설정 → 개인정보 보호 → 모든 쿠키 차단</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem', borderLeft: '4px solid var(--primary)', paddingLeft: '0.75rem' }}>
            4. 개인정보의 보유 및 파기 절차
          </h2>
          <p>
            일일한자는 이용자의 계정이나 개인정보를 서버에 영구 보관하지 않습니다. 브라우저 내에서 선택하신 한자 목록이나 급수 설정 등은 사용자의 로컬 기기(LocalStorage/Session)에만 일시 보관되며, 언제든지 브라우저 캐시 삭제를 통해 제거할 수 있습니다.
          </p>

          <h2 style={{ fontSize: '1.25rem', color: '#0f172a', marginTop: '2rem', marginBottom: '0.75rem', borderLeft: '4px solid var(--primary)', paddingLeft: '0.75rem' }}>
            5. 개인정보 보호책임자 및 의견 수렴
          </h2>
          <p>
            서비스 이용 중 발생하는 개인정보 보호와 관련된 모든 문의, 건의사항은 아래의 소통 창구를 통해 신속하게 답변받으실 수 있습니다.
          </p>
          <div style={{ background: '#f8fafc', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '0.75rem' }}>
            <p style={{ margin: 0, fontWeight: 600, color: '#0f172a' }}>일일한자 (11HANJA.COM) 운영팀</p>
            <p style={{ margin: '6px 0 0 0', color: '#475569' }}>• 서비스 운영 및 개인정보 관리 책임: 일일한자 고객지원팀</p>
            <p style={{ margin: '4px 0 0 0', color: '#475569' }}>• 온라인 문의: <Link to="/contact" style={{ color: 'var(--primary)', fontWeight: 600 }}>[문의하기 페이지로 바로가기]</Link></p>
            <p style={{ margin: '4px 0 0 0', color: '#475569' }}>• 공식 웹사이트: https://11hanja.com</p>
          </div>
        </section>
      </article>
    </div>
  );
}
