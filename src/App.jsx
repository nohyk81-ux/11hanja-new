import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Printer } from 'lucide-react';
import Header from './components/Header';
import HanjaGrid from './components/HanjaGrid';
import WorksheetViewer from './components/WorksheetViewer';
import StrokePractice from './components/StrokePractice';
import HanjaStory from './components/HanjaStory';
import NoticeModal from './components/NoticeModal';
import ContactModal from './components/ContactModal';
import PrivacyModal from './components/PrivacyModal';
import FaqModal from './components/FaqModal';
import GuideModal from './components/GuideModal';
import { HANJA_DATABASE } from './data/hanjaData';
import './styles/main.css';
import './styles/print.css';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // URL에서 급수 파싱 (기본값 8급)
  const match = location.pathname.match(/\/(?:grade|stroke)\/([^/]+)/);
  const currentGradeFromUrl = match ? decodeURIComponent(match[1]) : '8급';
  const selectedGrade = currentGradeFromUrl;

  const [activeMenu, setActiveMenu] = useState('practice');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHanjaIds, setSelectedHanjaIds] = useState([]);
  const [isWorksheetOpen, setIsWorksheetOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isPreparingPrint, setIsPreparingPrint] = useState(false);

  const filteredHanjaList = useMemo(() => {
    return HANJA_DATABASE.filter((item) => {
      const matchesGrade = item.grade === selectedGrade;

      if (!searchQuery.trim()) return matchesGrade;

      const q = searchQuery.trim().toLowerCase();
      return (
        matchesGrade &&
        (item.character.includes(q) ||
          item.hun.toLowerCase().includes(q) ||
          item.eum.toLowerCase().includes(q) ||
          item.hunEum.toLowerCase().includes(q))
      );
    });
  }, [selectedGrade, searchQuery]);

  const getCountByGrade = (grade) => {
    return HANJA_DATABASE.filter((h) => h.grade === grade).length;
  };

  const handleToggleSelect = (id) => {
    setSelectedHanjaIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const visibleIds = filteredHanjaList.map((h) => h.id);
    setSelectedHanjaIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
  };

  const handleDeselectAll = () => {
    setSelectedHanjaIds([]);
  };

  const selectedHanjaList = useMemo(() => {
    return HANJA_DATABASE.filter((h) => selectedHanjaIds.includes(h.id));
  }, [selectedHanjaIds]);

  const handleGenerateWorksheet = () => {
    if (selectedHanjaIds.length === 0) {
      alert('학습지를 생성할 한자를 카드에서 직접 선택하거나 [전체 선택] 버튼을 눌러주세요.');
      return;
    }
    
    if (selectedHanjaIds.length > 30) {
      alert('학습지는 한 번에 최대 30자까지만 생성할 수 있습니다. 30자 이하로 선택해 주세요.');
      return;
    }
    
    setIsPreparingPrint(true);
    setTimeout(() => {
      setIsPreparingPrint(false);
      setIsWorksheetOpen(true);
    }, 3000);
  };

  const handleRandom5Generate = () => {
    const gradeHanjaList = HANJA_DATABASE.filter((h) => h.grade === selectedGrade);
    if (gradeHanjaList.length === 0) {
      alert('해당 급수의 한자 데이터가 없습니다.');
      return;
    }

    const shuffled = [...gradeHanjaList].sort(() => 0.5 - Math.random());
    const selected5 = shuffled.slice(0, 5);
    const selected5Ids = selected5.map((h) => h.id);

    setSelectedHanjaIds(selected5Ids);
    
    setIsPreparingPrint(true);
    setTimeout(() => {
      setIsPreparingPrint(false);
      setIsWorksheetOpen(true);
    }, 3000);
  };

  const handleQuickPrint = () => {
    let targetIds = selectedHanjaIds;
    if (selectedHanjaIds.length === 0 && filteredHanjaList.length > 0) {
      targetIds = filteredHanjaList.map((h) => h.id);
      setSelectedHanjaIds(targetIds);
    }

    if (targetIds.length > 30) {
      alert('학습지는 한 번에 최대 30자까지만 생성할 수 있습니다. 30자 이하로 선택해 주세요.');
      return;
    }

    setActiveMenu('practice');
    
    setIsPreparingPrint(true);
    setTimeout(() => {
      setIsPreparingPrint(false);
      setIsWorksheetOpen(true);
    }, 3000);
  };

  return (
    <div className="app-container">
      <Header
        onOpenNotice={() => setShowNotice(true)}
        onOpenContact={() => setShowContact(true)}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/grade/8급" replace />} />
          <Route path="/stroke" element={<Navigate to="/stroke/8급" replace />} />
          
          <Route 
            path="/grade/:gradeId" 
            element={
              !isWorksheetOpen && (
                <HanjaGrid
                  selectedGrade={selectedGrade}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filteredHanjaList={filteredHanjaList}
                  selectedHanjaIds={selectedHanjaIds}
                  onToggleSelect={handleToggleSelect}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                  onGenerateWorksheet={handleGenerateWorksheet}
                  onRandom5Generate={handleRandom5Generate}
                  getCountByGrade={getCountByGrade}
                />
              )
            } 
          />
          <Route 
            path="/stroke/:gradeId" 
            element={
              <StrokePractice
                selectedGrade={selectedGrade}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filteredHanjaList={filteredHanjaList}
                getCountByGrade={getCountByGrade}
              />
            } 
          />
          <Route path="/story" element={<HanjaStory />} />
          <Route path="*" element={<Navigate to="/grade/8급" replace />} />
        </Routes>
        
        {isWorksheetOpen && (
          <WorksheetViewer
            selectedHanjaList={selectedHanjaList}
            onClose={() => {
              setIsWorksheetOpen(false);
              setSelectedHanjaIds([]);
            }}
          />
        )}
      </main>

      <footer className="site-footer no-print">
        <div className="footer-links">
          <button className="footer-btn text-bold" onClick={() => setShowPrivacy(true)}>
            개인정보처리방침
          </button>
          <span className="footer-sep">•</span>
          <button className="footer-btn text-bold" style={{ color: 'var(--primary)' }} onClick={() => setShowGuide(true)}>
            일일한자 활용가이드
          </button>
          <span className="footer-sep">•</span>
          <button className="footer-btn" onClick={() => setShowNotice(true)}>
            공지사항
          </button>
          <span className="footer-sep">•</span>
          <button className="footer-btn" onClick={() => setShowFaq(true)}>
            자주 묻는 질문
          </button>
          <span className="footer-sep">•</span>
          <button className="footer-btn" onClick={() => setShowContact(true)}>
            문의하기
          </button>
        </div>
        <p style={{ marginTop: '8px' }}>© 2026 일일한자 (11HANJA.COM) - 무료한자 일일 학습지</p>
        <p style={{ marginTop: '4px' }}>
          누구나 자유롭게 접속하여 한자 쓰기 학습지를 무료로 인쇄하고 학습할 수 있습니다.
        </p>
      </footer>

      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}
      {showNotice && <NoticeModal onClose={() => setShowNotice(false)} />}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
      {showFaq && <FaqModal onClose={() => setShowFaq(false)} />}
      
      {isPreparingPrint && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '350px', textAlign: 'center', padding: '3rem 2rem' }}>
            <div style={{ marginBottom: '1.5rem', color: 'var(--primary)', display: 'flex', justifyContent: 'center' }}>
              <Printer size={56} style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            </div>
            <h2 style={{ marginBottom: '1rem', color: 'var(--dark)' }}>인쇄 준비중입니다...</h2>
            <p style={{ color: 'var(--gray-500)', fontSize: '1rem', lineHeight: '1.5' }}>
              잠시만 기다려주세요.<br />학습지를 생성하고 있습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}
