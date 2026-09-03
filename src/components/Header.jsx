import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BookOpen, HelpCircle, Layers, Bell, Mail } from 'lucide-react';

export default function Header({ onOpenNotice, onOpenContact }) {
  return (
    <header className="site-header no-print">
      <div className="header-inner">
        <Link to="/" className="brand-logo">
          <div className="logo-badge">日</div>
          <div className="brand-text">
            <h1>일일한자</h1>
            <span>11HANJA.COM</span>
          </div>
        </Link>

        <nav className="main-nav">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
            end
          >
            <BookOpen size={18} />
            학습지 생성하기
          </NavLink>
          <NavLink
            to="/stroke"
            className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
          >
            <Layers size={18} />
            획순 연습하기
          </NavLink>
          <NavLink
            to="/story"
            className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
          >
            <BookOpen size={18} />
            한자 이야기
          </NavLink>
        </nav>

        <div className="header-actions">
          <button className="action-btn" onClick={onOpenNotice}>
            <Bell size={18} />
            <span>공지사항</span>
          </button>
          <Link to="/contact" className="action-btn" style={{ textDecoration: 'none' }}>
            <Mail size={18} />
            <span>문의하기</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
