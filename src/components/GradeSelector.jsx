import React from 'react';
import { GRADES } from '../data/hanjaData';

export default function GradeSelector({ selectedGrade, setSelectedGrade, getCountByGrade }) {
  return (
    <div className="grade-tabs">
      {GRADES.map((grade) => {
        const count = getCountByGrade(grade);
        return (
          <button
            key={grade}
            className={`grade-tab ${selectedGrade === grade ? 'active' : ''}`}
            onClick={() => setSelectedGrade(grade)}
          >
            {grade} ({count > 0 ? `${count}자` : '준비중'})
          </button>
        );
      })}
    </div>
  );
}
