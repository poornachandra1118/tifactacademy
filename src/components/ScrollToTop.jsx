import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const circleRef = useRef(null);
  const location = useLocation();

  const radius = 23;
  const circumference = 2 * Math.PI * radius;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;

      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = (circumference - pct * circumference).toString();
      }

      if (scrollTop > 400) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [circumference]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="scrollTop"
      className={show ? 'show' : ''}
      role="button"
      aria-label="Scroll to top"
      tabIndex={0}
      onClick={handleScrollTop}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleScrollTop();
        }
      }}
    >
      <svg viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="23"></circle>
        <circle
          ref={circleRef}
          className="progress"
          cx="26"
          cy="26"
          r="23"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: circumference
          }}
        ></circle>
      </svg>
      <i className="bi bi-arrow-up"></i>
    </div>
  );
}
