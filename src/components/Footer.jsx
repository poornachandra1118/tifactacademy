import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { submitToGoogle } from '../utils/googleSubmission';
import { CONTACT_INFO } from '../data/contactData';
import tifactLogo from '../assets/logo.png';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [subError, setSubError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
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

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubError('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      return;
    }

    setSubscribing(true);

    try {
      const res = await submitToGoogle({
        formType: 'newsletter',
        email: trimmedEmail
      });

      if (res.success) {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 6000);
      } else {
        setSubError(res.error || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error('Newsletter error:', err);
      setSubError('Network error. Please try again.');
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="footer-hw">
      <svg
        className="footer-wave"
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill="#0B1220"
          d="M0,32 C240,70 480,0 720,18 C960,36 1200,70 1440,26 L1440,70 L0,70 Z"
        ></path>
      </svg>
      <span className="footer-glow"></span>
      <span className="footer-glow-2"></span>
      <div className="container footer-top">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <Link
              className="tifact-logo-link"
              to="/"
              onClick={() => handleNavClick('home')}
            >
              <div className="tifact-footer-logo-wrap">
                <img
                  src={tifactLogo}
                  alt="Ti-Fact Academy"
                  className="tifact-footer-logo"
                />
              </div>
            </Link>
            <p className="mt-3">
              A transparent, donor-first charity connecting givers directly to verified causes worldwide since 2013. Every gift is tracked from wallet to doorstep.
            </p>
            <div className="footer-social mt-3">
              <a href="#facebook" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#twitter" aria-label="Twitter / X"><i className="bi bi-twitter-x"></i></a>
              <a href="#instagram" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#linkedin" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
              <a href="#youtube" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
            </div>
            <div className="footer-badges">
              <span className="footer-badge"><i className="bi bi-patch-check-fill"></i> Registered 501(c)(3)</span>
              <span className="footer-badge"><i className="bi bi-shield-lock-fill"></i> SSL Secured</span>
            </div>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h6>Quick Links</h6>
            <ul>
              <li>
                <a
                  className="footer-link"
                  href="#about"
                  onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
                >
                  <i className="bi bi-caret-right-fill"></i>About Us
                </a>
              </li>
              {/* <li>
                <a
                  className="footer-link"
                  href="#causes"
                  onClick={(e) => { e.preventDefault(); handleNavClick('causes'); }}
                >
                  <i className="bi bi-caret-right-fill"></i>Causes
                </a>
              </li> */}
              <li>
                <a
                  className="footer-link"
                  href="#why"
                  onClick={(e) => { e.preventDefault(); handleNavClick('why'); }}
                >
                  <i className="bi bi-caret-right-fill"></i>Why Ti-Fact Academy
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  href="#instructors"
                  onClick={(e) => { e.preventDefault(); handleNavClick('instructors'); }}
                >
                  <i className="bi bi-caret-right-fill"></i>Instructors
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  href="#testimonials"
                  onClick={(e) => { e.preventDefault(); handleNavClick('testimonials'); }}
                >
                  <i className="bi bi-caret-right-fill"></i>Testimonials
                </a>
              </li>
              <li>
                <Link className="footer-link" to="/faq">
                  <i className="bi bi-caret-right-fill"></i>FAQ
                </Link>
              </li>
              <li>
                <a
                  className="footer-link"
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
                >
                  <i className="bi bi-caret-right-fill"></i>Contact
                </a>
              </li>
            </ul>
          </div>

          {/* <div className="col-6 col-md-3 col-lg-2">
            <h6>Courses</h6>
            <ul>
              <li>
                <a
                  className="footer-link"
                  href="#causes"
                  onClick={(e) => { e.preventDefault(); handleNavClick('causes'); }}
                >
                  <i className="bi bi-caret-right-fill"></i>Nutrition
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  href="#causes"
                  onClick={(e) => { e.preventDefault(); handleNavClick('causes'); }}
                >
                  <i className="bi bi-caret-right-fill"></i>Clean Water
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  href="#causes"
                  onClick={(e) => { e.preventDefault(); handleNavClick('causes'); }}
                >
                  <i className="bi bi-caret-right-fill"></i>Education
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  href="#causes"
                  onClick={(e) => { e.preventDefault(); handleNavClick('causes'); }}
                >
                  <i className="bi bi-caret-right-fill"></i>Healthcare
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  href="#causes"
                  onClick={(e) => { e.preventDefault(); handleNavClick('causes'); }}
                >
                  <i className="bi bi-caret-right-fill"></i>Emergency Relief
                </a>
              </li>
              <li>
                <a
                  className="footer-link"
                  href="#causes"
                  onClick={(e) => { e.preventDefault(); handleNavClick('causes'); }}
                >
                  <i className="bi bi-caret-right-fill"></i>Elder Care
                </a>
              </li>
            </ul>
          </div> */}

          <div className="col-md-6 col-lg-4">
            <h6>Get In Touch</h6>
            <div className="footer-contact-item">
              <span className="ic"><i className="bi bi-geo-alt-fill"></i></span>
              <a
                href={CONTACT_INFO.office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link"
              >
                {CONTACT_INFO.office.address}
              </a>
            </div>
            <div className="footer-contact-item">
              <span className="ic"><i className="bi bi-envelope-fill"></i></span>
              <a href={CONTACT_INFO.email.href} className="footer-contact-link">
                {CONTACT_INFO.email.address}
              </a>
            </div>
            <div className="footer-contact-item">
              <span className="ic"><i className="bi bi-telephone-fill"></i></span>
              <a href={CONTACT_INFO.mobile.href} className="footer-contact-link">
                {CONTACT_INFO.mobile.display}
              </a>
            </div>
            <h6 className="mt-4">Subscribe toUpdates</h6>
            <form onSubmit={handleSubscribe} className="newsletter-input">
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email for newsletter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={subscribing}
              />
              <button type="submit" aria-label="Subscribe" disabled={subscribing}>
                {subscribing ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ width: '13px', height: '13px', borderWidth: '2px' }}></span>
                ) : (
                  <i className="bi bi-arrow-right"></i>
                )}
              </button>
            </form>
            {subscribed ? (
              <div className="text-success small mt-2">
                <i className="bi bi-check-circle-fill me-1"></i> Thank you for subscribing!
              </div>
            ) : subError ? (
              <div className="text-danger small mt-2">
                <i className="bi bi-exclamation-triangle-fill me-1"></i> {subError}
              </div>
            ) : (
              <div className="newsletter-note">
                <i className="bi bi-shield-check"></i> No spam. Unsubscribe anytime.
              </div>
            )}
          </div>
        </div>

        <div className="footer-divider"></div>
        <div className="footer-bottom d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <div>
              &copy; 2024 Ti-Fact Academy. All rights reserved by{' '}
              <a
                href="https://www.templatemonster.com/authors/k29solutions/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ti-Fact Academy
              </a>
            </div>
            <div className="footer-bottom-links mt-2">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
              <Link to="/financial-reports">Financial Reports</Link>
              <Link to="/faq">FAQs</Link>
            </div>
          </div>
          <div className="text-md-end">
            {/* <div className="footer-payments justify-content-md-end mb-2">
              <i className="bi bi-credit-card-2-front" title="Cards accepted"></i>
              <i className="bi bi-paypal" title="PayPal accepted"></i>
              <i className="bi bi-google" title="Google Pay accepted"></i>
              <i className="bi bi-apple" title="Apple Pay accepted"></i>
            </div> */}
            <div>
              Made with <i className="bi bi-heart-fill text-primary-hw"></i> for a brighter future  &bull;{' '}
              <a
                href="https://www.themewagon.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tifact Academy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
