import React, { useState, useEffect } from 'react';

const TOC_ITEMS = [
  { id: 'overview', title: 'Overview' },
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use-it', title: 'How We Use It' },
  { id: 'donation-payment-data', title: 'Donation & Payment Data' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'sharing', title: 'Sharing & Disclosure' },
  { id: 'data-retention', title: 'Data Retention' },
  { id: 'your-rights', title: 'Your Rights & Choices' },
  { id: 'childrens-privacy', title: "Children's Privacy" },
  { id: 'security', title: 'Security' },
  { id: 'international', title: 'International Transfers' },
  { id: 'changes', title: 'Changes to This Policy' },
  { id: 'contact-us', title: 'Contact Us' }
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('overview');

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
            <i className="bi bi-shield-lock-fill"></i> Legal
          </span>
          <h1 className="hero-title mt-3" style={{ fontSize: 'clamp(2rem,4vw,2.9rem)' }}>
            Privacy Policy
          </h1>
          <p className="hero-lead mt-3">
            How Hopewell collects, uses, and protects the information you share with us as a donor, volunteer, or visitor.
          </p>
          <div className="policy-updated mt-3">
            <i className="bi bi-clock-history me-1"></i> Last updated: August 5, 2026
          </div>
        </div>
      </header>

      {/* ============================================
           POLICY CONTENT
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
              <h2 id="overview"><span className="num">1</span>Overview</h2>
              <p>
                Hopewell Foundation ("Hopewell," "we," "us," or "our") is a registered 501(c)(3) nonprofit organization. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, make a donation, sign up to volunteer, or otherwise interact with us.
              </p>
              <p>
                By using our site or services, you agree to the practices described in this policy. If you do not agree, please discontinue use of the site.
              </p>

              <h2 id="information-we-collect"><span className="num">2</span>Information We Collect</h2>
              <p>We collect information in the following ways:</p>
              <ul>
                <li><strong>Information you provide directly</strong> &mdash; name, email address, mailing address, phone number, and any message content when you fill out a form, donate, or contact us.</li>
                <li><strong>Donation details</strong> &mdash; amount, frequency, and the cause you support (payment card details are handled by our PCI-compliant payment processor and are never stored on our servers).</li>
                <li><strong>Automatically collected data</strong> &mdash; IP address, browser type, device information, and pages visited, gathered via cookies and similar technologies.</li>
                <li><strong>Volunteer &amp; partner information</strong> &mdash; skills, availability, and background information submitted during volunteer or NGO-partner onboarding.</li>
              </ul>

              <h2 id="how-we-use-it"><span className="num">3</span>How We Use It</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process donations and issue tax receipts</li>
                <li>Send impact updates, newsletters, and campaign communications (you can opt out at any time)</li>
                <li>Respond to inquiries and volunteer applications</li>
                <li>Improve our website, programs, and donor experience</li>
                <li>Comply with legal, tax, and regulatory obligations</li>
              </ul>
              <div className="policy-callout">
                <i className="bi bi-info-circle-fill"></i> We never sell your personal information to third parties for marketing purposes.
              </div>

              <h2 id="donation-payment-data"><span className="num">4</span>Donation &amp; Payment Data</h2>
              <p>
                All online donations are processed through encrypted, PCI-DSS-compliant payment gateways. Hopewell does not store full card numbers on its own servers. We retain donation history (amount, date, cause) for receipting, reporting, and tax-compliance purposes.
              </p>

              <h2 id="cookies"><span className="num">5</span>Cookies &amp; Tracking</h2>
              <p>
                Our website uses cookies and similar technologies to remember your preferences, understand site usage, and improve performance. You can disable cookies through your browser settings, though some site features may not function properly as a result.
              </p>

              <h2 id="sharing"><span className="num">6</span>Sharing &amp; Disclosure</h2>
              <p>We may share information with:</p>
              <ul>
                <li>Verified NGO partners delivering the programs you've supported, limited to what's necessary to fulfill your donation intent</li>
                <li>Service providers who help us operate the site, process payments, or send communications, under confidentiality agreements</li>
                <li>Authorities, where required by law, regulation, or legal process</li>
              </ul>

              <h2 id="data-retention"><span className="num">7</span>Data Retention</h2>
              <p>
                We retain personal and donation information for as long as necessary to fulfill the purposes outlined in this policy, satisfy tax and legal record-keeping requirements, and resolve disputes. You may request earlier deletion, subject to legal retention obligations.
              </p>

              <h2 id="your-rights"><span className="num">8</span>Your Rights &amp; Choices</h2>
              <p>
                Depending on your location, you may have the right to access, correct, export, or delete your personal information, and to opt out of marketing communications at any time via the unsubscribe link in our emails or by contacting us directly.
              </p>

              <h2 id="childrens-privacy"><span className="num">9</span>Children's Privacy</h2>
              <p>
                Our services are not directed to children under 13, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can remove it.
              </p>

              <h2 id="security"><span className="num">10</span>Security</h2>
              <p>
                We use industry-standard technical and organizational safeguards, including encryption in transit and access controls, to protect your information. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.
              </p>

              <h2 id="international"><span className="num">11</span>International Transfers</h2>
              <p>
                As Hopewell operates programs across 40 countries, your information may be processed in countries other than your own. We take steps to ensure appropriate safeguards are in place wherever your data is handled.
              </p>

              <h2 id="changes"><span className="num">12</span>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The "Last updated" date at the top of this page indicates when the policy was last revised. Continued use of our site after changes constitutes acceptance of the updated policy.
              </p>

              <h2 id="contact-us"><span className="num">13</span>Contact Us</h2>
              <p>If you have questions about this Privacy Policy or how your information is handled, please reach out:</p>
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
