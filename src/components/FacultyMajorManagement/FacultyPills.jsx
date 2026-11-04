'use client';

export default function FacultyPills({ faculties, majors, selectedFaculty, onSelectFaculty }) {
  return (
    <div className="faculties-pills-bar">
      <button
        type="button"
        className={`faculty-pill-btn ${selectedFaculty === 'ALL' ? 'active' : ''}`}
        onClick={() => onSelectFaculty('ALL')}
      >
        Tất Cả Khoa ({majors.length} ngành)
      </button>

      {faculties.map((fac, idx) => {
        const fCode = fac.shortCode || fac.code || fac.maKhoa || fac.id;
        const majorCount = majors.filter((m) => (m.facultyCode || m.maKhoa) === fCode).length;
        const isActive = selectedFaculty === fCode;
        return (
          <button
            key={fCode || `fac-pill-${idx}`}
            type="button"
            className={`faculty-pill-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelectFaculty(fCode)}
          >
            <strong>{fac.shortCode || fac.code || fCode}</strong> · {fac.name || fac.tenKhoa} ({majorCount})
          </button>
        );
      })}
    </div>
  );
}
