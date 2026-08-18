import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { GRADE_TO_GR, BOARD_NAMES, BOARD_GRADES } from '../utils/gradeMapping';

export default function GradeSelector({ selectedGrade, selectedBoard, getCountByGrade }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Determine base path ('/grade' or '/stroke')
  const basePath = location.pathname.startsWith('/stroke') ? '/stroke' : '/grade';

  const boards = ['uhmoon', 'daehan', 'korcham'];
  
  // Get the grades for the currently selected board
  const currentBoardGrades = BOARD_GRADES[selectedBoard] || BOARD_GRADES['uhmoon'];

  return (
    <div className="grade-selector-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Board Selector Tabs */}
      <div className="board-tabs" style={{ display: 'flex', gap: '8px', marginBottom: '12px', justifyContent: 'center' }}>
        {boards.map((board) => (
          <button
            key={board}
            className={`board-tab ${selectedBoard === board ? 'active' : ''}`}
            onClick={() => {
               // Fallback to the lowest grade of that board if the current selectedGrade is not in the new board
               const newGrades = BOARD_GRADES[board];
               let targetGrade = selectedGrade;
               if (!newGrades.includes(targetGrade)) {
                 targetGrade = newGrades[0];
               }
               const gr = GRADE_TO_GR[targetGrade] || '8GR';
               navigate(`${basePath}/${gr}?board=${board}`);
            }}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              border: 'none',
              background: selectedBoard === board ? 'var(--primary)' : '#e2e8f0',
              color: selectedBoard === board ? 'white' : '#475569',
              fontWeight: selectedBoard === board ? 'bold' : 'normal',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '0.95rem'
            }}
          >
            {BOARD_NAMES[board]}
          </button>
        ))}
      </div>

      <div className="grade-tabs">
        {currentBoardGrades.map((grade) => {
          const count = getCountByGrade(grade);
          return (
            <button
              key={grade}
              className={`grade-tab ${selectedGrade === grade ? 'active' : ''}`}
              onClick={() => {
                const gr = GRADE_TO_GR[grade] || '8GR';
                navigate(`${basePath}/${gr}?board=${selectedBoard}`);
              }}
            >
              {grade} ({count > 0 ? `${count}자` : '준비중'})
            </button>
          );
        })}
      </div>
    </div>
  );
}
