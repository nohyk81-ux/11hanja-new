import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function PrivacyModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '600px', maxHeight: '85vh' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={22} style={{ color: 'var(--primary)' }} />
            <h2>개인정보처리방침</h2>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body" style={{ lineHeight: '1.7', fontSize: '0.95rem', color: 'var(--gray-700)' }}>
          <p style={{ marginBottom: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
            시행일자: 2026년 7월 31일
          </p>

          <p style={{ marginBottom: '1.2rem' }}>
            <strong>일일한자 (11HANJA.COM)</strong>(이하 "서비스")는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 및 관련 법령을 준수하고 있습니다. 본 개인정보처리방침은 서비스가 이용자의 정보를 어떻게 처리하고 보호하는지 알려드립니다.
          </p>

          <h4 style={{ fontSize: '1rem', color: '#0f172a', marginTop: '1.2rem', marginBottom: '0.4rem' }}>
            1. 수집하는 개인정보 항목 및 수집 방법
          </h4>
          <p>
            본 서비스는 별도의 회원가입 없이 누구나 무료로 한자 쓰기 연습지를 이용하고 인쇄할 수 있는 웹 서비스로서, **어떠한 개인식별정보(이름, 연락처, 이메일 등)도 서버에 저장하거나 수집하지 않습니다.**
          </p>

          <h4 style={{ fontSize: '1rem', color: '#0f172a', marginTop: '1.2rem', marginBottom: '0.4rem' }}>
            2. 쿠키(Cookie) 및 서드파티 광고 기술 사용 (구글 애드센스)
          </h4>
          <p>
            본 서비스는 서비스 개선 및 운영비 마련을 위하여 구글 애드센스(Google AdSense) 등 제3자 광고 서비스를 이용할 수 있습니다.
          </p>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', marginBottom: '0.8rem' }}>
            <li>구글(Google)을 포함한 제3자 제공업체는 이용자의 이전 웹사이트 방문 기록을 바탕으로 맞춤형 광고를 제공하기 위해 쿠키(Cookie)를 사용합니다.</li>
            <li>구글의 광고 쿠키 사용을 통해 구글 및 파트너사는 이용자의 본 사이트 및 다른 웹사이트 방문 정보를 바탕으로 적절한 광고를 게재합니다.</li>
            <li>이용자는 구글 광고 설정(<a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" style={{ color: '#0284c7', textDecoration: 'underline' }}>google.com/settings/ads</a>)을 방문하여 맞춤형 광고 수신을 거부할 수 있습니다.</li>
          </ul>

          <h4 style={{ fontSize: '1rem', color: '#0f172a', marginTop: '1.2rem', marginBottom: '0.4rem' }}>
            3. 개인정보의 보유 및 파기
          </h4>
          <p>
            본 서비스는 이용자의 개인정보를 저장하지 않으므로 별도의 보유 및 파기 절차가 존재하지 않습니다. 이용자가 웹 브라우저에 저장한 일시적인 설정 정보(선택한 급수 등)는 이용자의 기기에만 존재하며 브라우저 삭제 시 함께 삭제됩니다.
          </p>

          <h4 style={{ fontSize: '1rem', color: '#0f172a', marginTop: '1.2rem', marginBottom: '0.4rem' }}>
            4. 개인정보 보호책임자 및 문의처
          </h4>
          <p>
            서비스 이용 중 개인정보보호 관련 문의사항이 있으신 경우 아래 연락처로 문의해 주시기 바랍니다.
          </p>
          <div style={{ background: '#f8fafc', padding: '0.8rem 1rem', borderRadius: '8px', marginTop: '0.5rem', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: 0 }}>• <strong>서비스명</strong>: 일일한자 (11HANJA.COM)</p>
            <p style={{ margin: '4px 0 0 0' }}>• <strong>문의</strong>: 사이트 상단/하단 [문의하기] 메뉴 이용</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
}
