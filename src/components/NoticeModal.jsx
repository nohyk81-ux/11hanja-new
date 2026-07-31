import React from 'react';
import { X } from 'lucide-react';

export default function NoticeModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>공지사항</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body" style={{ lineHeight: '1.8' }}>
          <h3>[업데이트] 1급~8급 전체 급수 추가!</h3>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>2026.07.31</p>
          <p>
            안녕하세요, 일일한자입니다.<br/>
            이제 8급부터 1급까지 모든 급수의 신출 한자를 연습하실 수 있습니다!
          </p>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '1rem' }}>
            <li>준급수(준1급, 준2급, 준3급) 포함 전체 급수 지원</li>
            <li>정확한 획순과 부수 정보 제공</li>
            <li>학습지 인쇄 기능 최적화</li>
          </ul>
          <p style={{ marginTop: '1.5rem', fontWeight: '500' }}>
            앞으로도 더 좋은 서비스를 위해 노력하겠습니다.<br/>
            감사합니다.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
}
