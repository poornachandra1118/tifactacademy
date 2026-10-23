import React, { useEffect } from 'react';

export default function CourseDetailsModal({ course, onClose, onEnquire }) {
  useEffect(() => {
    if (!course) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [course, onClose]);

  if (!course) return null;

  const handleEnquireClick = () => {
    onClose();
    if (onEnquire) {
      onEnquire(course);
    }
  };

  return (
    <div
      className="mentor-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="courseModalTitle"
    >
      <div
        className="mentor-modal-dialog"
        style={{ maxWidth: '720px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mentor-modal-header">
          <div className="d-flex align-items-center gap-3">
            <span
              className="mentor-modal-icon"
              style={{
                background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                color: '#16a34a'
              }}
            >
              <i className="bi bi-journal-code"></i>
            </span>
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                  {course.id}
                </span>
                <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle px-2 py-1 text-uppercase">
                  {course.categoryId}
                </span>
                {course.featured && (
                  <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2 py-1">
                    <i className="bi bi-star-fill me-1 text-warning"></i>Featured
                  </span>
                )}
              </div>
              <h4 className="mentor-modal-title mb-0" id="courseModalTitle">
                {course.title}
              </h4>
            </div>
          </div>
          <button
            type="button"
            className="mentor-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Body */}
        <div className="mentor-modal-body">
          {/* Hero Banner inside modal */}
          <div className="position-relative rounded-4 overflow-hidden mb-4" style={{ maxHeight: '220px' }}>
            <img
              src={course.thumbnail}
              alt={course.thumbnailAlt || course.title}
              className="w-100 h-100"
              style={{ objectFit: 'cover', maxHeight: '220px' }}
            />
            <div
              className="position-absolute bottom-0 start-0 end-0 p-3"
              style={{
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.88), transparent)',
                color: '#fff'
              }}
            >
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <div>
                  <span className="fs-4 fw-bold">₹{course.price?.toLocaleString('en-IN')} {course.currency}</span>
                  <span className="ms-2 opacity-75 small">({course.duration} • {course.mode})</span>
                </div>
                <div className="d-flex align-items-center gap-2 small">
                  <span><i className="bi bi-star-fill text-warning me-1"></i>{course.rating} / 5.0</span>
                  <span>•</span>
                  <span><i className="bi bi-people-fill me-1"></i>{course.enrolledStudents}+ Enrolled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <h6 className="fw-bold mb-2">About This Course</h6>
            <p className="text-muted mb-0">{course.description}</p>
          </div>

          {/* Course Details Grid */}
          <div className="row g-3 mb-4">
            <div className="col-sm-6 col-md-3">
              <div className="p-3 rounded-3 bg-light border text-center">
                <div className="text-muted small">Level</div>
                <strong className="d-block mt-1 text-dark small">{course.level}</strong>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="p-3 rounded-3 bg-light border text-center">
                <div className="text-muted small">Duration</div>
                <strong className="d-block mt-1 text-dark small">{course.duration}</strong>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="p-3 rounded-3 bg-light border text-center">
                <div className="text-muted small">Mode</div>
                <strong className="d-block mt-1 text-dark small">{course.mode}</strong>
              </div>
            </div>
            <div className="col-sm-6 col-md-3">
              <div className="p-3 rounded-3 bg-light border text-center">
                <div className="text-muted small">Certificate</div>
                <strong className="d-block mt-1 text-success small">
                  {course.certificateAvailable ? 'Available' : 'N/A'}
                </strong>
              </div>
            </div>
          </div>

          {/* Technologies */}
          {course.technologies && course.technologies.length > 0 && (
            <div className="mb-4">
              <h6 className="fw-bold mb-2">Technologies &amp; Tools Covered</h6>
              <div className="d-flex flex-wrap gap-2">
                {course.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="badge bg-white text-dark border px-3 py-2 fw-semibold"
                    style={{ borderRadius: '8px', fontSize: '0.82rem' }}
                  >
                    <i className="bi bi-check2 text-success me-1"></i>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Modules List */}
          {course.modules && course.modules.length > 0 && (
            <div className="mb-4">
              <h6 className="fw-bold mb-2">Course Curriculum &amp; Modules</h6>
              <div className="list-group list-group-flush rounded-3 border">
                {course.modules.map((mod, idx) => (
                  <div key={idx} className="list-group-item d-flex align-items-center gap-2 py-2 small">
                    <span className="badge bg-primary-subtle text-primary rounded-circle p-2" style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {idx + 1}
                    </span>
                    <span className="fw-medium text-dark">{mod}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {course.features && course.features.length > 0 && (
            <div className="mb-4">
              <h6 className="fw-bold mb-2">Program Features</h6>
              <div className="row g-2">
                {course.features.map((feat, idx) => (
                  <div key={idx} className="col-sm-6">
                    <div className="d-flex align-items-center gap-2 small text-muted">
                      <i className="bi bi-patch-check-fill text-success"></i>
                      <span>{feat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructor Info */}
          {course.instructor && (
            <div className="p-3 rounded-3 bg-light border d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <span className="mentor-modal-icon" style={{ width: '38px', height: '38px', fontSize: '1.1rem' }}>
                  <i className="bi bi-person-workspace"></i>
                </span>
                <div>
                  <div className="fw-bold text-dark small">{course.instructor.name}</div>
                  <div className="text-muted small">Experience: {course.instructor.experience}</div>
                </div>
              </div>
              <span className="badge bg-success-subtle text-success border border-success-subtle">
                Verified Instructor
              </span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mentor-modal-footer mt-4">
            <button
              type="button"
              className="btn btn-light rounded-pill px-4 text-muted fw-semibold"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn-hw-primary"
              onClick={handleEnquireClick}
            >
              Enquire About Course <i className="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
