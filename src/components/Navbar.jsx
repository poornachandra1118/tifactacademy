import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { burstConfetti } from '../utils/confetti';
import MentorApplyModal from './MentorApplyModal';
import tifactLogo from '../assets/logo.png';

export default function Navbar({ onOpenMentorModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setNavOpen(false);
    const getEl = () =>
      document.getElementById(sectionId) ||
      (sectionId === 'courses' ? document.getElementById('causes') : null) ||
      (sectionId === 'instructors' ? document.getElementById('volunteers') : null);

    if (location.pathname === '/') {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = getEl();
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#' + sectionId);
      setTimeout(() => {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = getEl();
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const [localMentorOpen, setLocalMentorOpen] = useState(false);

  const handleOpenMentor = () => {
    setNavOpen(false);
    if (onOpenMentorModal) {
      onOpenMentorModal();
    } else {
      setLocalMentorOpen(true);
    }
  };

  const handleEnquiry = (e) => {
    burstConfetti(e.currentTarget);
    setNavOpen(false);
    handleNavClick('contact');
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-hw ${scrolled ? 'scrolled' : ''}`} id="mainNav">
        <div className="container-xl">
          <Link className="hw-logo tifact-logo-link" to="/" onClick={() => handleNavClick('home')}>
            <img
              src={tifactLogo}
              alt="Ti-Fact Academy"
              className="tifact-navbar-logo"
            />
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setNavOpen(!navOpen)}
          >
            <i className="bi bi-list fs-2"></i>
          </button>
          <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`} id="navMenu">
            <ul className="navbar-nav nav-hw mx-auto mt-3 mt-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#home"
                  onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#about"
                  onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
                >
                  About
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#courses"
                  onClick={(e) => { e.preventDefault(); handleNavClick('courses'); }}
                >
                  Courses
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#instructors"
                  onClick={(e) => { e.preventDefault(); handleNavClick('instructors'); }}
                >
                  Instructors
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#testimonials"
                  onClick={(e) => { e.preventDefault(); handleNavClick('testimonials'); }}
                >
                  Testimonials
                </a>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/faq' ? 'active' : ''}`}
                  to="/faq"
                  onClick={() => setNavOpen(false)}
                >
                  FAQ
                </Link>
              </li>
            </ul>
            <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2 mt-3 mt-lg-0">
              <button
                type="button"
                className="btn-mentor-apply"
                onClick={handleOpenMentor}
              >
                <i className="bi bi-mortarboard-fill me-1"></i> Mentor Apply
              </button>
              <button
                type="button"
                className="btn-hw-primary"
                onClick={handleEnquiry}
              >
                Enquiry <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {!onOpenMentorModal && (
        <MentorApplyModal
          isOpen={localMentorOpen}
          onClose={() => setLocalMentorOpen(false)}
        />
      )}
    </>
  );
}
