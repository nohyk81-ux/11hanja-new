import React from 'react';
import { X, BookOpen, Printer, Edit3 } from 'lucide-react';
import '../styles/main.css';

export default function GuideModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>일일한자 활용 가이드</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-body" style={{ lineHeight: '1.8' }}>
          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen size={20} />
              일일한자란 무엇인가요?
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              <strong>일일한자(11HANJA.COM)</strong>는 누구나 한자를 쉽고 체계적으로 학습할 수 있도록 돕기 위해 만들어진 무료 한자 학습 도구입니다. 
              8급부터 1급까지 급수별로 정리된 한자를 제공하며, 회원가입이나 로그인 없이 웹사이트에 접속하는 것만으로 모든 기능을 즉시 이용하실 수 있습니다. 
              한자 능력 검정시험을 준비하는 학생들부터 한자 교양이 필요한 성인까지 모두에게 유용한 학습 자료를 제공하는 것을 목표로 합니다.
            </p>
            <p>
              저희 서비스는 한자를 눈으로만 익히는 것에 그치지 않고, 직접 써보고 획순을 익힐 수 있는 실전적인 학습 환경을 추구합니다.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Printer size={20} />
              무료 한자 학습지(PDF) 출력 기능
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              가장 강력한 기능 중 하나는 사용자가 원하는 한자만 쏙쏙 골라서 <strong>자신만의 맞춤형 한자 학습지</strong>를 인쇄할 수 있다는 점입니다.
              메인 화면의 '한자 연습하기' 탭에서 학습하고 싶은 한자를 클릭하여 선택한 뒤, 화면 상단이나 하단의 <strong>[학습지 인쇄]</strong> 버튼을 누르면 A4 크기에 최적화된 고품질 한자 쓰기 연습장이 생성됩니다.
            </p>
            <p>
              생성된 학습지에는 각 한자의 뜻과 음(훈음), 그리고 올바르게 쓰는 순서를 보여주는 획순 가이드가 함께 인쇄되어 집이나 학교, 학원에서 바로 프린트하여 교재로 활용하기에 손색이 없습니다.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Edit3 size={20} />
              스마트한 획순 연습하기
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              한자를 처음 배울 때 가장 중요한 것은 올바른 순서(획순)로 글자를 쓰는 것입니다. 
              상단 메뉴의 <strong>[획순 연습하기]</strong> 탭으로 이동하시면, 화면에 나타나는 애니메이션을 통해 한자가 써지는 과정을 생생하게 지켜볼 수 있습니다.
            </p>
            <p>
              또한 '연습 하기'를 통해 눈으로 본 획순을 마우스나 스마트폰 터치스크린에 직접 따라 써보며 자신의 암기 상태를 테스트할 수 있습니다. 
              틀리면 힌트가 제공되므로 남녀노소 누구나 스트레스 없이 한자 쓰기를 마스터할 수 있습니다.
            </p>
          </section>

          <section>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>💡 100% 활용 꿀팁</h3>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: 'var(--gray-700)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>랜덤 추출:</strong> 어떤 한자를 공부할지 고민된다면 [무작위 5자 추출] 버튼을 활용해 매일 새로운 한자를 학습해 보세요.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>다크 모드:</strong> 야간에 학습할 때 눈이 부시지 않도록 우측 상단의 테마 버튼을 눌러 화면을 어둡게 변경할 수 있습니다.</li>
              <li><strong>검색 기능:</strong> 기억나지 않는 한자가 있다면 상단 검색창에 한글(음/뜻)이나 한자를 직접 입력하여 빠르게 찾아보세요.</li>
            </ul>
          </section>
        </div>
        <div className="modal-footer">
          <button className="primary-btn" onClick={onClose} style={{ width: '100%', padding: '0.8rem' }}>
            확인했습니다
          </button>
        </div>
      </div>
    </div>
  );
}
