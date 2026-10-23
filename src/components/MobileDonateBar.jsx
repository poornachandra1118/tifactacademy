import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { burstConfetti } from '../utils/confetti';

export default function MobileDonateBar({ onOpenMentorModal }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEnquiryClick = (e) => {
    burstConfetti(e.currentTarget);
    if (location.pathname === '/') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#contact');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="mobile-donate-bar">
      <div className="d-flex gap-2 w-100">
        <button
          type="button"
          className="btn-mentor-apply flex-fill justify-content-center py-2"
          onClick={() => onOpenMentorModal && onOpenMentorModal()}
        >
          <i className="bi bi-mortarboard-fill me-1"></i> Mentor Apply
        </button>
        <button
          type="button"
          className="btn-hw-primary flex-fill justify-content-center py-2"
          onClick={handleEnquiryClick}
        >
          Enquiry <i className="bi bi-arrow-right ms-1"></i>
        </button>
      </div>
    </div>
  );
}
