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
            <h3 style={{ color: 'var(--dark)' }}>[신규 기능] '내마음대로 학습지 만들기' & '단어별 쓰기' 기능 전격 오픈!</h3>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>2026.09.23</p>
            <p>
              안녕하세요, 일일한자(11HANJA.COM)입니다.<br />
              학습자 여러분께서 원하는 한자와 사자성어를 직접 입력하여 나만의 맞춤형 교재를 만들 수 있는 <strong>'내마음대로 학습지 만들기'</strong> 기능이 새롭게 오픈되었습니다!
            </p>
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.75rem' }}>
              <li><strong>원하는 한자 직접 입력 & 자동 추출</strong>: 문장이 섞인 긴 글을 그대로 붙여넣어도 한자만 자동으로 인식하여 깔끔하게 추출합니다. (최대 30자)</li>
              <li><strong>단어별 학습지 만들기 (단어 묶음 쓰기) 옵션</strong>: 띄어쓰기나 쉼표로 단어/사자성어를 입력하면 한글 독음(예: [대기만성])과 전체 훈음이 실시간 자동 합성됩니다.</li>
              <li><strong>2가지 전문 단어 인쇄 양식 제공</strong>:
                <ul style={{ paddingLeft: '1rem', marginTop: '0.25rem' }}>
                  <li><strong>단어 모아쓰기</strong>: 한 장에 4개 단어를 배치하며, 모범 글자 + 흐린 글자 따라쓰기 + 빈칸 연습 + 단어 뜻 적기 필기선 제공</li>
                  <li><strong>단어별 1장씩 집중쓰기</strong>: 단어 1개를 A4 1장에 걸쳐 본보기부터 암기 쓰기까지 5단계 집중 마스터</li>
                </ul>
              </li>
              <li><strong>정확한 214 강희자전 부수 & 획순 가이드</strong>: 6,111자 정밀 데이터베이스 연동으로 올바른 부수와 바른 획순 화살표 지원</li>
              <li><strong>원클릭 추천 프리셋 & 한글 검색 도우미</strong>: 대표 사자성어, 학교 생활 등 추천 세트 및 한자 자판이 익숙하지 않은 분들을 위한 한글 음/뜻 검색 지원</li>
            </ul>
          </div>

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
