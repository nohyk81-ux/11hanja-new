import React from 'react';
import { Hammer, Sparkles, ArrowLeft } from 'lucide-react';

export default function UnderConstruction({ title, onBackToPractice }) {
  return (
    <div className="construction-card no-print">
      <div className="construction-icon">
        <Hammer size={40} />
      </div>

      <span className="badge-coming">NEXT UPDATE</span>
      
      <h2 style={{ marginTop: '1rem' }}>[{title}] 메뉴 준비 중입니다</h2>

      <p>
        더 쉽고 재밌는 한자 학습 콘텐츠를 위해 **공사 중**입니다.<br />
        다음번 업데이트에서 더욱 알차고 유익한 기능으로 찾아뵙겠습니다!
      </p>

      <button className="btn-primary" onClick={onBackToPractice}>
        <ArrowLeft size={16} />
        한자 연습하기로 돌아가기
      </button>
    </div>
  );
}
