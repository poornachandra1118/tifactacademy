import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import MobileDonateBar from './components/MobileDonateBar';
import MentorApplyModal from './components/MentorApplyModal';

import Home from './pages/Home';
import FAQ from './pages/FAQ';
import FinancialReports from './pages/FinancialReports';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

export default function App() {
  const location = useLocation();
  const [mentorModalOpen, setMentorModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <>
      <Preloader />
      <Navbar onOpenMentorModal={() => setMentorModalOpen(true)} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/financial-reports" element={<FinancialReports />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      <MobileDonateBar onOpenMentorModal={() => setMentorModalOpen(true)} />
      <ScrollToTop />

      {/* Mentor Application Modal */}
      <MentorApplyModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
      />
    </>
  );
}
