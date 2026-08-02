import React from 'react';
import { BookOpen, HelpCircle, Layers, Bell, Mail } from 'lucide-react';

export default function Header({ activeMenu, setActiveMenu, onOpenNotice, onOpenContact }) {
  return (
    <header className="site-header no-print">
      <div className="header-inner">
        <a href="#" className="brand-logo" onClick={() => setActiveMenu('practice')}>
          <div className="logo-badge">日</div>
          <div className="brand-text">
            <h1>일일한자</h1>
            <span>11HANJA.COM</span>
          </div>
        </a>

        <nav className="main-nav">
          <button
            className={`nav-btn ${activeMenu === 'practice' ? 'active' : ''}`}
            onClick={() => setActiveMenu('practice')}
          >
            <BookOpen size={18} />
            한자 연습하기
          </button>
          <button
            className={`nav-btn ${activeMenu === 'stroke' ? 'active' : ''}`}
            onClick={() => setActiveMenu('stroke')}
          >
            <Layers size={18} />
            획순 연습하기
          </button>
        </nav>

        <div className="header-actions">
          <button className="action-btn" onClick={onOpenNotice}>
            <Bell size={18} />
            공지사항
          </button>
          <button className="action-btn" onClick={onOpenContact}>
            <Mail size={18} />
            문의하기
          </button>
        </div>
      </div>
    </header>
  );
}
