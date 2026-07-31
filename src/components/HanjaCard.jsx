import React from 'react';
import { Check } from 'lucide-react';

export default function HanjaCard({ hanja, isSelected, onToggleSelect, onPreviewWorksheet }) {
  return (
    <div
      className={`hanja-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onToggleSelect(hanja.id)}
    >
      <div className="card-check">
        <Check size={14} />
      </div>

      <div className="hanja-char-display">{hanja.character}</div>

      <div className="hanja-huneum">{hanja.hunEum}</div>

      <div className="hanja-meta">
        <span>총 {hanja.totalStrokes}획</span>
      </div>

      {hanja.exampleWords && hanja.exampleWords.length > 0 && (
        <div style={{ marginTop: '6px', fontSize: '0.75rem', color: '#64748b' }}>
          예: {hanja.exampleWords[0]}
        </div>
      )}
    </div>
  );
}
