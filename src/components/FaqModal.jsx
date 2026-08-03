import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ_DATA = [
  {
    question: '이 서비스를 이용하려면 출력을 꼭 해야 되나요?',
    answer: '한자는 가급적 손으로 쓰면서 획을 연습하도록 기획하였습니다. 다만 여의치 않을 경우 별도로 연습하셔도 무방합니다.'
  },
  {
    question: '일일한자 서비스는 무료인가요?',
    answer: '일일한자 서비스는 완전 무료입니다. 만약 유료로 변경 시 사전에 공지드릴 예정입니다.'
  },
  {
    question: '어린이집, 학교 및 학원에서 사용하여도 되나요?',
    answer: '네, 가능합니다. 자유롭게 사용 가능하나 출처에 대해서만 표기하여 주시면 됩니다.'
  },
  {
    question: '학습지가 작게 출력되거나 인쇄가 잘려요.',
    answer: '최신 버전의 엣지(Edge) 또는 크롬(Chrome) 브라우저를 이용하여 주시면 해결됩니다.\n그럼에도 불구하고 해결이 되지 않으실 경우 문의하기를 이용하여 주시기 바라며, 사용환경(인터넷 종류, 윈도우 버전) 정보를 보내주시면 답변 드리겠습니다.'
  },
  {
    question: '제휴를 원합니다.',
    answer: '문의하기를 이용하여 주시기 바랍니다.'
  }
];

export default function FaqModal({ onClose }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content faq-modal-content" style={{ maxWidth: '600px', maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={22} style={{ color: 'var(--primary)' }} />
            <h2>자주 묻는 질문</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body faq-body" style={{ lineHeight: '1.7', fontSize: '0.95rem', color: 'var(--gray-700)' }}>
          <div className="faq-list">
            {FAQ_DATA.map((item, index) => (
              <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleOpen(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="faq-q-text">
                    <span className="faq-q-mark">Q.</span> 
                    <span>{item.question}</span>
                  </span>
                  {openIndex === index ? (
                    <ChevronUp size={18} className="faq-icon" />
                  ) : (
                    <ChevronDown size={18} className="faq-icon" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="faq-answer">
                    <div className="faq-a-mark">A.</div>
                    <div className="faq-a-text">
                      {item.answer.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-primary" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
