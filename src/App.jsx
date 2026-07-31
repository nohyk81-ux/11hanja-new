import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import HanjaGrid from './components/HanjaGrid';
import WorksheetViewer from './components/WorksheetViewer';
import NoticeModal from './components/NoticeModal';
import ContactModal from './components/ContactModal';
import PrivacyModal from './components/PrivacyModal';
import { HANJA_DATABASE } from './data/hanjaData';
import './styles/main.css';
import './styles/print.css';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('practice');
  const [selectedGrade, setSelectedGrade] = useState('8급');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHanjaIds, setSelectedHanjaIds] = useState([]);
  const [isWorksheetOpen, setIsWorksheetOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Filter Hanja by Grade and Top Right Search Query
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

  // Helper count of Hanja per grade
  const getCountByGrade = (grade) => {
    return HANJA_DATABASE.filter((h) => h.grade === grade).length;
  };

  // Toggle selection for a single Hanja
  const handleToggleSelect = (id) => {
    setSelectedHanjaIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Select all visible Hanja in current view
  const handleSelectAll = () => {
    const visibleIds = filteredHanjaList.map((h) => h.id);
    setSelectedHanjaIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
  };

  // Deselect all
  const handleDeselectAll = () => {
    setSelectedHanjaIds([]);
  };

  // Strict list of ONLY the selected Hanja objects
  const selectedHanjaList = useMemo(() => {
    return HANJA_DATABASE.filter((h) => selectedHanjaIds.includes(h.id));
  }, [selectedHanjaIds]);

  // Generate worksheet preview (Strictly for selected Hanja)
  const handleGenerateWorksheet = () => {
    if (selectedHanjaIds.length === 0) {
      alert('학습지를 생성할 한자를 카드에서 직접 선택하거나 [전체 선택] 버튼을 눌러주세요.');
      return;
    }
    setIsWorksheetOpen(true);
  };

  // Select 5 random Hanja from currently selected grade and open worksheet preview
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
    setIsWorksheetOpen(true);
  };

  // Quick print handler from header
  const handleQuickPrint = () => {
    if (selectedHanjaIds.length === 0 && filteredHanjaList.length > 0) {
      // If none selected, default to selecting all in current grade for convenience
      setSelectedHanjaIds(filteredHanjaList.map((h) => h.id));
    }
    setActiveMenu('practice');
    setIsWorksheetOpen(true);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        onOpenNotice={() => setShowNotice(true)}
        onOpenContact={() => setShowContact(true)}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* Menu: 한자 연습하기 */}
        {!isWorksheetOpen ? (
          <HanjaGrid
            selectedGrade={selectedGrade}
            setSelectedGrade={setSelectedGrade}
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
        ) : (
          <WorksheetViewer
            selectedHanjaList={selectedHanjaList}
            onClose={() => {
              setIsWorksheetOpen(false);
              setSelectedHanjaIds([]);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="site-footer no-print">
        <div className="footer-links">
          <button className="footer-btn text-bold" onClick={() => setShowPrivacy(true)}>
            개인정보처리방침
          </button>
          <span className="footer-sep">•</span>
          <button className="footer-btn" onClick={() => setShowNotice(true)}>
            공지사항
          </button>
          <span className="footer-sep">•</span>
          <button className="footer-btn" onClick={() => setShowContact(true)}>
            문의하기
          </button>
        </div>
        <p style={{ marginTop: '8px' }}>© 2026 일일한자 (11HANJA.COM) - 급수별 무료 한자 쓰기 학습지</p>
        <p style={{ marginTop: '4px' }}>
          누구나 자유롭게 접속하여 A4 한자 쓰기 연습지를 무료로 인쇄하고 학습할 수 있습니다.
        </p>
      </footer>

      {/* Modals */}
      {showNotice && <NoticeModal onClose={() => setShowNotice(false)} />}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </div>
  );
}
