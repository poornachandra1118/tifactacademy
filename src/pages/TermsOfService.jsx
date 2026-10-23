import React, { useState, useEffect } from 'react';

const TOC_ITEMS = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'eligibility', title: 'Eligibility' },
  { id: 'donations', title: 'Donations' },
  { id: 'refunds', title: 'Refunds & Cancellations' },
  { id: 'tax-receipts', title: 'Tax Receipts' },
  { id: 'volunteering', title: 'Volunteering' },
  { id: 'account-conduct', title: 'Account & Conduct' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'third-party-links', title: 'Third-Party Links' },
  { id: 'disclaimers', title: 'Disclaimers' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'indemnification', title: 'Indemnification' },
  { id: 'termination', title: 'Termination' },
  { id: 'governing-law', title: 'Governing Law' },
  { id: 'changes-terms', title: 'Changes to These Terms' },
  { id: 'contact-terms', title: 'Contact Us' }
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('acceptance');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      let current = TOC_ITEMS[0].id;

      for (const item of TOC_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 96,
        behavior: 'smooth'
      });
    }
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
            <i className="bi bi-file-earmark-text-fill"></i> Legal
          </span>
          <h1 className="hero-title mt-3" style={{ fontSize: 'clamp(2rem,4vw,2.9rem)' }}>
            Terms of Service
          </h1>
          <p className="hero-lead mt-3">
            The terms and conditions that govern your use of the Hopewell website, donations, and volunteer programs.
          </p>
          <div className="policy-updated mt-3">
            <i className="bi bi-clock-history me-1"></i> Last updated: August 5, 2026
          </div>
        </div>
      </header>

      {/* ============================================
           TERMS CONTENT
      ============================================ */}
      <section className="section-pad pt-4">
        <div className="container">
          <div className="policy-layout">
            {/* TOC */}
            <aside className="policy-toc d-none d-lg-block" data-aos="fade-right">
              <h6>On this page</h6>
              <ul id="policyToc">
                {TOC_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={activeSection === item.id ? 'active' : ''}
                      onClick={(e) => scrollToSection(e, item.id)}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>

            {/* CONTENT */}
            <div className="policy-content" data-aos="fade-up">
              <h2 id="acceptance"><span className="num">1</span>Acceptance of Terms</h2>
              <p>
                These Terms of Service ("Terms") govern your access to and use of the Hopewell Foundation ("Hopewell," "we," "us," or "our") website, donation platform, and volunteer programs. By accessing our site or making a donation, you agree to be bound by these Terms. If you do not agree, please do not use our services.
              </p>

              <h2 id="eligibility"><span className="num">2</span>Eligibility</h2>
              <p>
                You must be at least 18 years old, or have the permission of a parent or legal guardian, to make a donation or register as a volunteer through our website. By using our services, you represent that you meet this requirement.
              </p>

              <h2 id="donations"><span className="num">3</span>Donations</h2>
              <p>All donations made through Hopewell are voluntary contributions to support our charitable programs. By donating, you confirm that:</p>
              <ul>
                <li>You are the authorized holder of the payment method used, or have permission to use it</li>
                <li>The information you provide (name, email, billing details) is accurate and current</li>
                <li>Your donation is made freely and is non-refundable except as described below</li>
              </ul>
              <p>
                Recurring donations will be charged automatically on the schedule you select until you cancel. You may cancel or modify a recurring donation at any time from your donor account or by contacting us.
              </p>

              <h2 id="refunds"><span className="num">4</span>Refunds &amp; Cancellations</h2>
              <p>
                Because donations directly fund active programs, they are generally non-refundable. If you believe a donation was made in error &mdash; for example, a duplicate charge or an incorrect amount &mdash; please contact us within 14 days and we will review your request in good faith.
              </p>
              <div className="policy-callout">
                <i className="bi bi-info-circle-fill"></i> Approved refunds may take 5&ndash;10 business days to appear on your statement, depending on your payment provider.
              </div>

              <h2 id="tax-receipts"><span className="num">5</span>Tax Receipts</h2>
              <p>
                Hopewell is a registered 501(c)(3) nonprofit organization. Eligible donations are tax-deductible to the extent allowed by law. An electronic receipt is issued automatically to the email address provided at the time of donation; please consult a tax professional regarding your specific eligibility.
              </p>

              <h2 id="volunteering"><span className="num">6</span>Volunteering</h2>
              <p>
                Volunteer applications are subject to review and, where applicable, background screening. Participation in Hopewell programs is voluntary, and volunteers agree to follow all applicable safety guidelines, codes of conduct, and instructions provided by Hopewell staff or partner organizations.
              </p>

              <h2 id="account-conduct"><span className="num">7</span>Account &amp; Conduct</h2>
              <p>
                If you create an account with us, you are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. You agree not to use our site to:
              </p>
              <ul>
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Interfere with the security or normal operation of the site</li>
                <li>Impersonate any person or entity, or misrepresent your affiliation with Hopewell</li>
                <li>Violate any applicable law or regulation</li>
              </ul>

              <h2 id="intellectual-property"><span className="num">8</span>Intellectual Property</h2>
              <p>
                All content on this website &mdash; including text, graphics, logos, photographs, and the Hopewell name and mark &mdash; is owned by or licensed to Hopewell and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without prior written permission.
              </p>

              <h2 id="third-party-links"><span className="num">9</span>Third-Party Links</h2>
              <p>
                Our website may contain links to third-party sites, including payment processors and partner NGOs. We do not control and are not responsible for the content, privacy practices, or terms of those third-party sites.
              </p>

              <h2 id="disclaimers"><span className="num">10</span>Disclaimers</h2>
              <p>
                Our website and services are provided "as is" and "as available," without warranties of any kind, express or implied. While we strive for accuracy, we do not guarantee that the site will be uninterrupted, error-free, or free of harmful components.
              </p>

              <h2 id="liability"><span className="num">11</span>Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, Hopewell shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, our website or services.
              </p>

              <h2 id="indemnification"><span className="num">12</span>Indemnification</h2>
              <p>
                You agree to indemnify and hold Hopewell, its staff, volunteers, and partner organizations harmless from any claims, damages, or expenses arising from your violation of these Terms or misuse of our services.
              </p>

              <div className="policy-callout warn">
                <i className="bi bi-exclamation-triangle-fill"></i> These Terms describe a general framework for informational purposes and do not constitute formal legal advice. Consult a qualified attorney to tailor these Terms to your organization's specific legal and jurisdictional requirements.
              </div>

              <h2 id="termination"><span className="num">13</span>Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access to our website or volunteer programs at our discretion, with or without notice, if we believe you have violated these Terms or engaged in conduct harmful to Hopewell or its beneficiaries.
              </p>

              <h2 id="governing-law"><span className="num">14</span>Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of Texas, USA, without regard to conflict-of-law principles. Any disputes arising under these Terms shall be resolved in the state or federal courts located in Travis County, Texas.
              </p>

              <h2 id="changes-terms"><span className="num">15</span>Changes to These Terms</h2>
              <p>
                We may revise these Terms from time to time. The "Last updated" date at the top of this page reflects the most recent revision. Continued use of our website or services after changes take effect constitutes acceptance of the updated Terms.
              </p>

              <h2 id="contact-terms"><span className="num">16</span>Contact Us</h2>
              <p>If you have questions about these Terms of Service, please reach out:</p>
              <ul>
                <li><i className="bi bi-envelope-fill me-2"></i>hello@hopewell.org</li>
                <li><i className="bi bi-telephone-fill me-2"></i>+1 (555) 204-8890</li>
                <li><i className="bi bi-geo-alt-fill me-2"></i>221 Riverside Lane, Austin, TX 78701</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
