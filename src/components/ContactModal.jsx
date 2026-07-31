import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ContactModal({ onClose }) {
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    
    setStatus('submitting');
    
    const form = e.target;
    const data = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/mqazowrw', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
        setAgreed(false);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>문의하기</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        {status === 'success' ? (
          <div className="modal-body" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>문의가 접수되었습니다!</h3>
            <p>소중한 의견 감사드립니다.<br/>입력하신 이메일로 빠른 시일 내에 답변드리겠습니다.</p>
            <button className="btn-primary" style={{ marginTop: '2rem' }} onClick={onClose}>닫기</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>성명</label>
                <input 
                  type="text" 
                  name="name"
                  required 
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  placeholder="홍길동"
                />
              </div>
              
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>이메일 주소</label>
                <input 
                  type="email" 
                  name="email"
                  required 
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  placeholder="example@email.com"
                />
              </div>
              
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>문의 내용</label>
                <textarea 
                  name="message"
                  required 
                  rows="4"
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'vertical' }}
                  placeholder="궁금한 점이나 건의사항을 남겨주세요."
                />
              </div>
              
              {/* Formspree에 이메일을 받을 주소를 지정하기 위한 숨겨진 필드(폼스프리 설정에서 nohyk@kakao.com으로 포워딩됨) */}
              <input type="hidden" name="_to" value="nohyk@kakao.com" />
              <input type="hidden" name="_subject" value="[일일한자] 새로운 문의가 접수되었습니다." />

              <div className="privacy-consent" style={{ 
                background: 'var(--gray-100)', 
                padding: '1rem', 
                borderRadius: '8px',
                fontSize: '0.85rem',
                marginTop: '0.5rem'
              }}>
                <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>개인정보 수집 및 이용 동의</p>
                <p style={{ color: 'var(--gray-500)', marginBottom: '0.8rem', lineHeight: '1.5' }}>
                  1. 수집 항목: 성명, 이메일 주소<br/>
                  2. 수집 목적: 문의 내역 확인 및 답변 처리<br/>
                  3. 보유 기간: 문의 처리 완료 후 6개월간 보관 후 파기
                </p>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" 
                    checked={agreed} 
                    onChange={(e) => setAgreed(e.target.checked)} 
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span>위 개인정보 수집 및 이용에 동의합니다. (필수)</span>
                </label>
              </div>
              
              {status === 'error' && (
                <p style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  오류가 발생했습니다. 잠시 후 다시 시도해주세요.
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="action-btn" onClick={onClose} style={{ padding: '0.5rem 1rem' }}>취소</button>
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={!agreed || status === 'submitting'}
                style={{ opacity: (!agreed || status === 'submitting') ? 0.5 : 1 }}
              >
                {status === 'submitting' ? '전송 중...' : '보내기'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
