import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FAQ_DATA } from '../data/faqData';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredGroups = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return FAQ_DATA.map((group) => {
      if (selectedCat !== 'all' && group.category !== selectedCat) {
        return null;
      }

      const matchingItems = group.items.filter((item) => {
        if (!term) return true;
        return (
          item.question.toLowerCase().includes(term) ||
          item.answer.toLowerCase().includes(term)
        );
      });

      if (matchingItems.length === 0) return null;

      return {
        ...group,
        items: matchingItems
      };
    }).filter(Boolean);
  }, [searchTerm, selectedCat]);

  const hasResults = filteredGroups.length > 0;

  return (
    <>
      {/* ============================================
           PAGE HEADER
      ============================================ */}
      <header className="policy-hero" id="home">
        <div className="hero-glow"></div>
        <div className="container position-relative text-center" data-aos="fade-up">
          <span className="eyebrow">
            <i className="bi bi-question-circle-fill"></i> Help Center &amp; FAQs
          </span>
          <h1
            className="hero-title mt-3 mx-auto"
            style={{ fontSize: 'clamp(2rem,4vw,2.9rem)', maxWidth: '750px' }}
          >
            Frequently Asked Questions
          </h1>
          <p className="hero-lead mt-3 mx-auto text-center" style={{ maxWidth: '680px' }}>
            Find answers to commonly asked questions about IT training programs, course syllabus, live projects, certifications, placement support, and admissions at Ti-Fact Academy.
          </p>

          <div className="faq-search mt-4" data-aos="fade-up" data-aos-delay="100">
            <i className="bi bi-search"></i>
            <input
              type="text"
              id="faqSearch"
              placeholder="Search questions, e.g. 'Full Stack', 'affordable price', 'certificate', 'placement'..."
              aria-label="Search FAQs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-btn show"
                id="faqClear"
                type="button"
                aria-label="Clear search"
                onClick={() => setSearchTerm('')}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ============================================
           CATEGORY FILTER
      ============================================ */}
      <section className="pb-0" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="faq-cats" data-aos="fade-up">
            <button
              className={`faq-cat-btn ${selectedCat === 'all' ? 'active' : ''}`}
              type="button"
              onClick={() => setSelectedCat('all')}
            >
              <i className="bi bi-grid-fill"></i>All Questions
            </button>
            {FAQ_DATA.map((group) => (
              <button
                key={group.category}
                className={`faq-cat-btn ${selectedCat === group.category ? 'active' : ''}`}
                type="button"
                onClick={() => setSelectedCat(group.category)}
              >
                <i className={`bi ${group.categoryIcon}`}></i>{group.categoryTitle}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
           FAQ CONTENT
      ============================================ */}
      <section className="section-pad">
        <div className="container">
          {filteredGroups.map((group) => (
            <div className="faq-group" key={group.category} data-group={group.category}>
              <div className="faq-group-title">
                <span className="gi"><i className={`bi ${group.categoryIcon}`}></i></span>
                {group.categoryTitle}
              </div>
              <div className="accordion faq-accordion">
                {group.items.map((item) => (
                  <div className="faq-item" key={item.id} data-cat={group.category}>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${!openItems[item.id] ? 'collapsed' : ''}`}
                          type="button"
                          onClick={() => toggleItem(item.id)}
                          aria-expanded={openItems[item.id] ? 'true' : 'false'}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${openItems[item.id] ? 'show' : ''}`}
                      >
                        <div className="accordion-body">{item.answer}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {!hasResults && (
            <div className="faq-empty show" id="faqEmpty">
              <i className="bi bi-search"></i>
              <div className="fw-bold font-display">No matching questions</div>
              <div className="small">Try a different search term, or browse all categories above.</div>
            </div>
          )}
        </div>
      </section>

      {/* ============================================
           SUPPORT CTA
      ============================================ */}
      <section className="section-pad pt-0">
        <div className="container">
          <div className="faq-cta" data-aos="zoom-in">
            <div className="content">
              <i className="bi bi-headset" style={{ fontSize: '2.2rem' }}></i>
              <h3 className="font-display fw-bold mt-3 mb-2" style={{ fontSize: '1.5rem' }}>
                Still have questions?
              </h3>
              <p className="mb-4" style={{ opacity: '.92' }}>
                Our academic counselors and mentorship team are here to help you choose the right IT course.
              </p>
              <Link
                to="/#contact"
                className="btn-cta"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <i className="bi bi-envelope-fill"></i> Enquire About Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
