import React from 'react';
import { X, Bell } from 'lucide-react';

export default function NoticeModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '600px', maxHeight: '85vh' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={22} style={{ color: 'var(--primary)' }} />
            <h2>공지사항</h2>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body" style={{ lineHeight: '1.7', fontSize: '0.95rem', color: 'var(--gray-700)' }}>
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ color: 'var(--dark)' }}>[업데이트] 상공회의소 및 대한검정회 급수 체계 전격 추가!</h3>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>2026.08.18</p>
            <p>
              안녕하세요, 일일한자입니다.<br/>
              회원 여러분의 학습 편의를 위해 <strong>대한상공회의소</strong>와 <strong>대한검정회</strong>의 한자 급수 체계가 전격 추가되었습니다!
            </p>
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.75rem' }}>
              <li><strong>한국어문회</strong>: 8급부터 특급까지 전체 16개 급수(5,978자) 지원</li>
              <li><strong>대한상공회의소</strong>: 9급부터 1급까지 전체 급수 지원</li>
              <li><strong>대한검정회</strong>: 준급수 포함 8급부터 1급까지 전체 급수 지원</li>
              <li>상단 기관 선택 탭을 통해 언제든 원하는 시험 기준의 학습지를 맞춤 생성할 수 있습니다.</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: 'var(--dark)' }}>[업데이트] 1급~8급 전체 급수 추가!</h3>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>2026.07.31</p>
            <p>
              이제 8급부터 1급까지 모든 급수의 신출 한자를 연습하고 학습지를 무료로 인쇄하실 수 있습니다!
            </p>
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.75rem' }}>
              <li>준급수(준1급, 준2급, 준3급) 포함 전체 급수 지원</li>
              <li>정확한 획순과 부수 정보 제공</li>
              <li>학습지 인쇄 기능 최적화</li>
            </ul>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
}
