import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const REPORTS = [
  {
    title: '2025 Annual Report & Audited Financials',
    sub: 'Full-year impact summary and independently audited statements',
    size: '2.4 MB \u00b7 PDF',
    name: '2025 Annual Report'
  },
  {
    title: '2025 IRS Form 990',
    sub: 'Public disclosure of revenue, expenses, and governance',
    size: '1.1 MB \u00b7 PDF',
    name: '2025 Form 990'
  },
  {
    title: '2024 Annual Report & Audited Financials',
    sub: 'Full-year impact summary and independently audited statements',
    size: '2.2 MB \u00b7 PDF',
    name: '2024 Annual Report'
  },
  {
    title: '2024 IRS Form 990',
    sub: 'Public disclosure of revenue, expenses, and governance',
    size: '1.0 MB \u00b7 PDF',
    name: '2024 Form 990'
  },
  {
    title: '2023 Annual Report & Audited Financials',
    sub: 'Full-year impact summary and independently audited statements',
    size: '2.1 MB \u00b7 PDF',
    name: '2023 Annual Report'
  },
  {
    title: '2022 Annual Report & Audited Financials',
    sub: 'Full-year impact summary and independently audited statements',
    size: '1.9 MB \u00b7 PDF',
    name: '2022 Annual Report'
  }
];

export default function FinancialReports() {
  const [downloadStatus, setDownloadStatus] = useState('');

  const handleDownload = (reportName) => {
    setDownloadStatus(reportName);
  };

  return (
    <>
      {/* ============================================
           PAGE HEADER
      ============================================ */}
      <header className="policy-hero" id="home">
        <div className="hero-glow"></div>
        <div className="container position-relative" data-aos="fade-up">
          <span className="eyebrow">
            <i className="bi bi-bar-chart-fill"></i> Transparency
          </span>
          <h1 className="hero-title mt-3" style={{ fontSize: 'clamp(2rem,4vw,2.9rem)' }}>
            Financial Reports
          </h1>
          <p className="hero-lead mt-3">
            Every dollar donated to Hopewell is tracked and independently audited. Here's exactly where your generosity goes.
          </p>
          <div className="policy-updated mt-3">
            <i className="bi bi-clock-history me-1"></i> Fiscal Year 2025 figures &middot; Last updated: August 5, 2026
          </div>
        </div>
      </header>

      {/* ============================================
           SUMMARY STATS
      ============================================ */}
      <section className="pb-0" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-6 col-lg-3" data-aos="fade-up">
              <div className="fin-stat-card">
                <div className="fin-stat-ic"><i className="bi bi-cash-coin"></i></div>
                <div className="fin-stat-val">$2.4M</div>
                <div className="fin-stat-label">Total Funds Raised</div>
                <div className="fin-stat-trend up"><i className="bi bi-arrow-up-right"></i> 18% vs last year</div>
              </div>
            </div>
            <div className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="80">
              <div className="fin-stat-card">
                <div className="fin-stat-ic"><i className="bi bi-heart-pulse-fill"></i></div>
                <div className="fin-stat-val">84%</div>
                <div className="fin-stat-label">Spent on Programs</div>
                <div className="fin-stat-trend up"><i className="bi bi-arrow-up-right"></i> Above 80% benchmark</div>
              </div>
            </div>
            <div className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="160">
              <div className="fin-stat-card">
                <div className="fin-stat-ic"><i className="bi bi-people-fill"></i></div>
                <div className="fin-stat-val">12,600+</div>
                <div className="fin-stat-label">Donors Contributing</div>
                <div className="fin-stat-trend up"><i className="bi bi-arrow-up-right"></i> 22% vs last year</div>
              </div>
            </div>
            <div className="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="240">
              <div className="fin-stat-card">
                <div className="fin-stat-ic"><i className="bi bi-patch-check-fill"></i></div>
                <div className="fin-stat-val">4/4 Stars</div>
                <div className="fin-stat-label">Charity Navigator Rating</div>
                <div className="fin-stat-trend up"><i className="bi bi-arrow-up-right"></i> 13 years running</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           ALLOCATION BREAKDOWN
      ============================================ */}
      <section className="section-pad">
        <div className="container">
          <div className="allocation-panel" data-aos="fade-up">
            <div className="row align-items-center g-5">
              <div className="col-lg-5 text-center">
                <div className="allocation-ring">
                  <div className="allocation-ring-label">
                    <span className="big">84%</span>
                    <span className="small">of every dollar goes directly to programs</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <span className="eyebrow"><i className="bi bi-pie-chart-fill"></i> Fiscal Year 2025</span>
                <h2 className="section-title mt-3 mb-4" style={{ fontSize: 'clamp(1.6rem,2.8vw,2.1rem)' }}>
                  How your donation is allocated
                </h2>
                <ul className="allocation-legend">
                  <li>
                    <span className="allocation-dot" style={{ background: 'var(--clr-primary)' }}></span>
                    Program Services &mdash; meals, water, education, healthcare <span className="pct">84%</span>
                  </li>
                  <li>
                    <span className="allocation-dot" style={{ background: 'var(--clr-secondary)' }}></span>
                    Fundraising &amp; Donor Relations <span className="pct">9%</span>
                  </li>
                  <li>
                    <span className="allocation-dot" style={{ background: 'var(--clr-accent)' }}></span>
                    Administrative &amp; Operations <span className="pct">7%</span>
                  </li>
                </ul>
                <p className="text-muted mt-3 mb-0" style={{ fontSize: '.9rem' }}>
                  Figures reflect audited results for the fiscal year ended December 31, 2025, and are consistent with Hopewell's 13-year average of 80%+ program spending.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
           ANNUAL REPORTS / DOWNLOADS
      ============================================ */}
      <section className="section-pad pt-0" id="reports">
        <div className="container">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: '640px' }} data-aos="fade-up">
            <span className="eyebrow"><i className="bi bi-file-earmark-bar-graph-fill"></i> Documents</span>
            <h2 className="section-title mt-3" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.5rem)' }}>
              Annual reports &amp; filings
            </h2>
            <p className="section-sub mx-auto mt-2">
              Download our audited financial statements, IRS Form 990 filings, and annual impact reports.
            </p>
          </div>

          <div data-aos="fade-up">
            {REPORTS.map((r, idx) => (
              <div key={idx} className={`report-row ${idx === REPORTS.length - 1 ? 'mb-0' : ''}`}>
                <span className="report-ic"><i className="bi bi-file-earmark-pdf-fill"></i></span>
                <div className="report-meta">
                  <div className="report-title">{r.title}</div>
                  <div className="report-sub">{r.sub}</div>
                </div>
                <span className="report-size">{r.size}</span>
                <button
                  className="btn-report"
                  type="button"
                  onClick={() => handleDownload(r.name)}
                >
                  <i className="bi bi-download"></i> Download
                </button>
              </div>
            ))}
          </div>

          {downloadStatus && (
            <div id="reportStatus" className="text-center mt-4" role="status" aria-live="polite">
              <div
                className="alert alert-success d-inline-flex align-items-center gap-2 mb-0"
                style={{ borderRadius: '12px' }}
              >
                <i className="bi bi-check-circle-fill"></i>
                {downloadStatus} is ready &mdash; connect a file host to enable live downloads.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================================
           AUDIT / TRUST STRIP
      ============================================ */}
      <section className="section-pad pt-0">
        <div className="container">
          <div className="audit-strip" data-aos="zoom-in">
            <div className="content row align-items-center g-4">
              <div className="col-lg-8">
                <h3 className="font-display fw-bold mb-2" style={{ fontSize: '1.5rem' }}>
                  Independently audited, every single year
                </h3>
                <p className="mb-0" style={{ opacity: '.92' }}>
                  Our financials are reviewed annually by an independent third-party accounting firm and are available for public inspection alongside our IRS Form 990 filings, in line with nonprofit transparency best practices.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <Link
                  to="/#contact"
                  className="btn-cta"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <i className="bi bi-envelope-fill"></i> Request Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
