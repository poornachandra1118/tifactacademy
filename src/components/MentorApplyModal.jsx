import React, { useState, useEffect } from 'react';
import { burstConfetti } from '../utils/confetti';
import { submitToGoogle } from '../utils/googleSubmission';

export default function MentorApplyModal({ isOpen, onClose }) {
  const initialFormData = {
    name: '',
    email: '',
    mobile: '',
    address: '',
    locationLink: '',
    mentorType: 'hour', // 'hour' | 'month' | 'batch'
    expertise: '',
    notes: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [detectingLocation, setDetectingLocation] = useState(false);

  const handleClose = React.useCallback(() => {
    onClose();
    // Reset state after animation completes
    setTimeout(() => {
      setIsSubmitted(false);
      setSubmitError('');
      setErrors({});
      setLocationStatus('');
    }, 200);
  }, [onClose]);

  // Close on Escape key & manage body scroll
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };
  const handleTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, mentorType: type }));
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser.');
      return;
    }

    setDetectingLocation(true);
    setLocationStatus('Detecting coordinates...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://www.google.com/maps?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        setFormData((prev) => ({ ...prev, locationLink: mapsUrl }));
        setLocationStatus('Location detected & linked successfully!');
        setDetectingLocation(false);
        if (errors.locationLink) {
          setErrors((prev) => ({ ...prev, locationLink: '' }));
        }
      },
      (error) => {
        let msg = 'Could not access location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission denied. Please paste your Google Maps link manually.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information unavailable. Please paste link manually.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out. Please paste link manually.';
        }
        setLocationStatus(msg);
        setDetectingLocation(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter a valid name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9+\s\-()]{7,16}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid mobile number (at least 7 digits)';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Present address is required';
    }

    if (!formData.locationLink.trim()) {
      newErrors.locationLink = 'Present location link is required';
    } else {
      const urlPattern = /^(https?:\/\/)?([\w.-]+)+([/?#].*)?$/i;
      if (!urlPattern.test(formData.locationLink.trim())) {
        newErrors.locationLink = 'Please enter a valid URL or Google Maps link';
      }
    }

    if (!formData.mentorType) {
      newErrors.mentorType = 'Please select a mentor type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Submit to Google Apps Script (appends to Google Sheet & sends email)
      const res = await submitToGoogle({
        formType: 'mentor',
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        locationLink: formData.locationLink,
        mentorType: getMentorTypeLabel(formData.mentorType),
        expertise: formData.expertise || '',
        notes: formData.notes || ''
      });

      // 2. Persist to localStorage for client-side history & reliability
      try {
        const existing = JSON.parse(localStorage.getItem('hopewell_mentor_applications') || '[]');
        const recordId = res.submissionId || 'MENTOR_APP';
        const newApplication = {
          ...formData,
          id: recordId,
        };
        existing.unshift(newApplication);
        localStorage.setItem('hopewell_mentor_applications', JSON.stringify(existing));
      } catch {
        // Ignore localStorage errors
      }

      if (res.success) {
        setIsSubmitted(true);
        if (e.target) {
          burstConfetti(e.target);
        }
      } else {
        setSubmitError(res.error || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error('Mentor application error:', err);
      setSubmitError('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForAnother = () => {
    setFormData(initialFormData);
    setIsSubmitted(false);
    setSubmitError('');
    setErrors({});
    setLocationStatus('');
  };

  const getMentorTypeLabel = (type) => {
    switch (type) {
      case 'hour':
        return 'Hour Base (Hourly)';
      case 'month':
        return 'Month-wise (Monthly)';
      case 'batch':
        return 'Batch Wise (Cohort)';
      default:
        return type;
    }
  };

  return (
    <div
      className="mentor-modal-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mentorModalTitle"
    >
      <div
        className="mentor-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mentor-modal-header">
          <div className="d-flex align-items-center gap-3">
            <span className="mentor-modal-icon">
              <i className="bi bi-mortarboard-fill"></i>
            </span>
            <div>
              <span className="mentor-badge-eyebrow">
                <i className="bi bi-stars me-1"></i> Mentorship Program
              </span>
              <h4 className="mentor-modal-title mb-0" id="mentorModalTitle">
                Mentor Application
              </h4>
            </div>
          </div>
          <button
            type="button"
            className="mentor-modal-close-btn"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="mentor-modal-body">
          {isSubmitted ? (
            <div className="mentor-success-card text-center py-4">
              <div className="mentor-success-icon mb-3">
                <i className="bi bi-check-circle-fill"></i>
              </div>
              <h3 className="fw-bold mb-2">Application Submitted!</h3>
              <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '480px' }}>
                Thank you for applying to be a Hopewell Mentor,{' '}
                <strong className="text-dark">{formData.name}</strong>! Our mentorship coordinator will review your profile and contact you shortly.
              </p>

              <div className="mentor-summary-box text-start mb-4">
                <h6 className="fw-bold border-bottom pb-2 mb-3">
                  <i className="bi bi-card-checklist me-2 text-success"></i>Application Summary
                </h6>
                <div className="row g-2 small">
                  <div className="col-sm-6">
                    <span className="text-muted d-block">Full Name:</span>
                    <strong className="text-dark">{formData.name}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted d-block">Email:</span>
                    <strong className="text-dark">{formData.email}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted d-block">Mobile:</span>
                    <strong className="text-dark">{formData.mobile}</strong>
                  </div>
                  <div className="col-sm-6">
                    <span className="text-muted d-block">Mentor Type:</span>
                    <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                      {getMentorTypeLabel(formData.mentorType)}
                    </span>
                  </div>
                  <div className="col-12">
                    <span className="text-muted d-block">Address:</span>
                    <span className="text-dark">{formData.address}</span>
                  </div>
                  <div className="col-12">
                    <span className="text-muted d-block">Present Location Link:</span>
                    <a
                      href={formData.locationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-break"
                    >
                      <i className="bi bi-box-arrow-up-right me-1"></i>
                      {formData.locationLink}
                    </a>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className="btn-hw-primary"
                  onClick={handleClose}
                >
                  <i className="bi bi-check2 me-1"></i> Done
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={handleResetForAnother}
                >
                  Submit Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="text-muted small mb-4">
                Inspire the next generation. Fill in your details below to join our mentor network across flexible engagements.
              </p>

              <div className="row g-3">
                {/* Name */}
                <div className="col-md-6">
                  <label className="form-label mentor-form-label" htmlFor="mentor-name">
                    Full Name <span className="text-danger">*</span>
                  </label>
                  <div className="mentor-input-group">
                    <span className="mentor-input-icon">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      id="mentor-name"
                      name="name"
                      className={`form-control mentor-input ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="e.g. Dr. Alex Mercer"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && <div className="mentor-error-text">{errors.name}</div>}
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <label className="form-label mentor-form-label" htmlFor="mentor-email">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <div className="mentor-input-group">
                    <span className="mentor-input-icon">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      id="mentor-email"
                      name="email"
                      className={`form-control mentor-input ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="e.g. alex.mercer@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && <div className="mentor-error-text">{errors.email}</div>}
                </div>

                {/* Mobile */}
                <div className="col-md-6">
                  <label className="form-label mentor-form-label" htmlFor="mentor-mobile">
                    Mobile Number <span className="text-danger">*</span>
                  </label>
                  <div className="mentor-input-group">
                    <span className="mentor-input-icon">
                      <i className="bi bi-telephone"></i>
                    </span>
                    <input
                      type="tel"
                      id="mentor-mobile"
                      name="mobile"
                      className={`form-control mentor-input ${errors.mobile ? 'is-invalid' : ''}`}
                      placeholder="e.g. +91 98765 43210"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.mobile && <div className="mentor-error-text">{errors.mobile}</div>}
                </div>

                {/* Area of Expertise (Optional bonus) */}
                <div className="col-md-6">
                  <label className="form-label mentor-form-label" htmlFor="mentor-expertise">
                    Field of Expertise <span className="text-muted">(Optional)</span>
                  </label>
                  <div className="mentor-input-group">
                    <span className="mentor-input-icon">
                      <i className="bi bi-briefcase"></i>
                    </span>
                    <input
                      type="text"
                      id="mentor-expertise"
                      name="expertise"
                      className="form-control mentor-input"
                      placeholder="e.g. Education, Tech, Healthcare"
                      value={formData.expertise}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="col-12">
                  <label className="form-label mentor-form-label" htmlFor="mentor-address">
                    Address <span className="text-danger">*</span>
                  </label>
                  <div className="mentor-input-group align-items-start">
                    <span className="mentor-input-icon pt-2">
                      <i className="bi bi-geo-alt"></i>
                    </span>
                    <textarea
                      id="mentor-address"
                      name="address"
                      rows="2"
                      className={`form-control mentor-input ${errors.address ? 'is-invalid' : ''}`}
                      placeholder="e.g. Flat 302, Green Valley Apts, MG Road, Bengaluru"
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  {errors.address && <div className="mentor-error-text">{errors.address}</div>}
                </div>

                {/* Present Location Link */}
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label className="form-label mentor-form-label mb-0" htmlFor="mentor-location">
                      Present Location Link <span className="text-danger">*</span>
                    </label>
                    <button
                      type="button"
                      className="btn btn-sm mentor-detect-btn"
                      onClick={handleDetectLocation}
                      disabled={detectingLocation}
                      title="Auto-detect current GPS coordinates"
                    >
                      {detectingLocation ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                          Locating...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-geo-fill me-1 text-danger"></i>
                          Detect My Location
                        </>
                      )}
                    </button>
                  </div>
                  <div className="mentor-input-group">
                    <span className="mentor-input-icon">
                      <i className="bi bi-pin-map"></i>
                    </span>
                    <input
                      type="url"
                      id="mentor-location"
                      name="locationLink"
                      className={`form-control mentor-input ${errors.locationLink ? 'is-invalid' : ''}`}
                      placeholder="e.g. https://maps.google.com/?q=12.9716,77.5946"
                      value={formData.locationLink}
                      onChange={handleChange}
                    />
                  </div>
                  {locationStatus && (
                    <div className="small mt-1 text-muted">
                      <i className="bi bi-info-circle me-1"></i>
                      {locationStatus}
                    </div>
                  )}
                  {errors.locationLink && (
                    <div className="mentor-error-text">{errors.locationLink}</div>
                  )}
                  <span className="form-text small text-muted">
                    Paste your Google Maps link or click "Detect My Location" to automatically fill your current GPS coordinates.
                  </span>
                </div>

                {/* Mentor Type (Hour base, Month or Batch wise) */}
                <div className="col-12">
                  <label className="form-label mentor-form-label d-block">
                    Mentor Type <span className="text-danger">*</span>
                  </label>
                  <div className="mentor-type-grid">
                    {/* Hour Base */}
                    <div
                      className={`mentor-type-card ${formData.mentorType === 'hour' ? 'active' : ''}`}
                      onClick={() => handleTypeSelect('hour')}
                      role="button"
                      tabIndex="0"
                      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') handleTypeSelect('hour'); }}
                    >
                      <div className="mentor-type-card-header">
                        <span className="mentor-type-icon hour-icon">
                          <i className="bi bi-clock-history"></i>
                        </span>
                        <input
                          type="radio"
                          name="mentorType"
                          value="hour"
                          checked={formData.mentorType === 'hour'}
                          onChange={() => handleTypeSelect('hour')}
                          className="mentor-type-radio"
                        />
                      </div>
                      <div className="mentor-type-card-body">
                        <h6 className="mentor-type-title">Hour Base</h6>
                        <p className="mentor-type-desc">
                          Flexible 1-on-1 hourly sessions based on your availability.
                        </p>
                      </div>
                      <div className="mentor-type-tag">Hourly Sessions</div>
                    </div>

                    {/* Month Wise */}
                    <div
                      className={`mentor-type-card ${formData.mentorType === 'month' ? 'active' : ''}`}
                      onClick={() => handleTypeSelect('month')}
                      role="button"
                      tabIndex="0"
                      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') handleTypeSelect('month'); }}
                    >
                      <div className="mentor-type-card-header">
                        <span className="mentor-type-icon month-icon">
                          <i className="bi bi-calendar2-check"></i>
                        </span>
                        <input
                          type="radio"
                          name="mentorType"
                          value="month"
                          checked={formData.mentorType === 'month'}
                          onChange={() => handleTypeSelect('month')}
                          className="mentor-type-radio"
                        />
                      </div>
                      <div className="mentor-type-card-body">
                        <h6 className="mentor-type-title">Month Wise</h6>
                        <p className="mentor-type-desc">
                          Continuous monthly commitment guiding selected mentees.
                        </p>
                      </div>
                      <div className="mentor-type-tag">Monthly Track</div>
                    </div>

                    {/* Batch Wise */}
                    <div
                      className={`mentor-type-card ${formData.mentorType === 'batch' ? 'active' : ''}`}
                      onClick={() => handleTypeSelect('batch')}
                      role="button"
                      tabIndex="0"
                      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') handleTypeSelect('batch'); }}
                    >
                      <div className="mentor-type-card-header">
                        <span className="mentor-type-icon batch-icon">
                          <i className="bi bi-people-fill"></i>
                        </span>
                        <input
                          type="radio"
                          name="mentorType"
                          value="batch"
                          checked={formData.mentorType === 'batch'}
                          onChange={() => handleTypeSelect('batch')}
                          className="mentor-type-radio"
                        />
                      </div>
                      <div className="mentor-type-card-body">
                        <h6 className="mentor-type-title">Batch Wise</h6>
                        <p className="mentor-type-desc">
                          Cohort or group based workshop and training cycles.
                        </p>
                      </div>
                      <div className="mentor-type-tag">Cohort Program</div>
                    </div>
                  </div>
                  {errors.mentorType && (
                    <div className="mentor-error-text mt-2">{errors.mentorType}</div>
                  )}
                </div>

                {/* Additional Notes (Optional) */}
                <div className="col-12">
                  <label className="form-label mentor-form-label" htmlFor="mentor-notes">
                    Notes or Availability Preferences <span className="text-muted">(Optional)</span>
                  </label>
                  <textarea
                    id="mentor-notes"
                    name="notes"
                    rows="2"
                    className="form-control mentor-input"
                    placeholder="Tell us about your preferred days, times, or any specific goals..."
                    value={formData.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {submitError && (
                  <div className="col-12">
                    <div className="alert alert-danger mb-0 d-flex align-items-center gap-2" style={{ borderRadius: '12px' }}>
                      <i className="bi bi-exclamation-triangle-fill"></i>
                      <span>{submitError}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="mentor-modal-footer mt-4">
                <button
                  type="button"
                  className="btn btn-light rounded-pill px-4 text-muted fw-semibold"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-mentor-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <i className="bi bi-arrow-right ms-2"></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
