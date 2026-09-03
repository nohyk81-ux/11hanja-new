import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSeo } from '../utils/useSeo';

export default function ContactPage() {
  useSeo(
    '문의하기 - 일일한자 | 11HANJA.COM',
    '일일한자 서비스 이용 관련 오류 제보, 한자 데이터 수정 요청, 제휴 및 건의사항을 남겨주시면 정성껏 답변해 드립니다.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      const response = await fetch('https://formspree.io/f/mrpzzary', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
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
    <div className="container" style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
          <ArrowLeft size={18} />
          메인으로 돌아가기
        </Link>
      </div>

      <div className="content-page-card">
        <header style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <Mail size={28} style={{ color: 'var(--primary)' }} />
            <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: 0 }}>문의하기</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
            한자 오탈자 제보, 획순 및 인쇄 오류, 기능 개선 제안 등 어떤 의견이든 편하게 보내주세요.
          </p>
        </header>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <CheckCircle2 size={56} style={{ color: 'var(--primary)', margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ color: '#0f172a', marginBottom: '0.75rem' }}>문의가 정상적으로 접수되었습니다!</h2>
            <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '2rem' }}>
              소중한 의견 감사드립니다.<br />
              보내주신 내용은 꼼꼼히 확인하여 입력하신 이메일로 회신드리겠습니다.
            </p>
            <Link to="/" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '0.75rem 2rem' }}>
              홈으로 이동
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                이름 또는 닉네임 *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="예: 홍길동"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label htmlFor="email" style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                회신받으실 이메일 주소 *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label htmlFor="category" style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                문의 유형
              </label>
              <select
                id="category"
                name="category"
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', backgroundColor: 'white', boxSizing: 'border-box' }}
              >
                <option value="한자 정보/오류 제보">한자 정보(훈음/획수/급수) 오류 제보</option>
                <option value="인쇄/학습지 기능 오류">인쇄 및 학습지 생성 오류</option>
                <option value="획순 애니메이션 오류">획순 연습 애니메이션 오류</option>
                <option value="새로운 기능 제안">새로운 기능 제안 및 건의</option>
                <option value="기타 문의">기타 제휴 및 일반 문의</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                문의 내용 *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="오류가 발생한 한자나 급수, 또는 원하시는 기능에 대해 구체적으로 적어주시면 빠른 해결에 큰 도움이 됩니다."
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }}
              />
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: '#475569' }}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ marginTop: '3px' }}
                />
                <span>
                  문의 답변 발송을 위한 이름 및 이메일 수집에 동의합니다. (답변 완료 후 즉시 파기됩니다. <Link to="/privacy" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>개인정보처리방침 보기</Link>)
                </span>
              </label>
            </div>

            {status === 'error' && (
              <p style={{ color: '#ef4444', fontSize: '0.9rem', margin: 0 }}>
                문의 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주시기 바랍니다.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary"
              style={{ padding: '0.85rem 1.5rem', fontSize: '1.05rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Send size={18} />
              {status === 'submitting' ? '전송 중...' : '문의 보내기'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
