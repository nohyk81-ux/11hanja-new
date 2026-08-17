import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GRADES } from '../data/hanjaData';

export default function GradeSelector({ selectedGrade, getCountByGrade }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine base path ('/grade' or '/stroke')
  const basePath = location.pathname.startsWith('/stroke') ? '/stroke' : '/grade';

  return (
    <div className="grade-tabs">
      {GRADES.map((grade) => {
        const count = getCountByGrade(grade);
        return (
          <button
            key={grade}
            className={`grade-tab ${selectedGrade === grade ? 'active' : ''}`}
            onClick={() => navigate(`${basePath}/${encodeURIComponent(grade)}`)}
          >
            {grade} ({count > 0 ? `${count}자` : '준비중'})
          </button>
        );
      })}
    </div>
  );
}
