// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/calculate', label: 'EMI Calculator' },
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const loanRules = [
    { label: 'Loan Amount', value: '₹1,000 - ₹50,000' },
    { label: 'Loan Duration', value: '1 - 24 months' },
    { label: 'Interest Rate', value: '8% per annum (Fixed)' },
    { label: 'Processing Time', value: '24 hours' },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main Footer */}
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">💰</span>
              <span className="logo-text">
                MiniLoan<span className="logo-highlight">Pro</span>
              </span>
            </div>

            <p className="footer-description">
              Your trusted partner for transparent and easy mini loan calculations. 
              Get instant EMI breakdowns with our fixed interest rate.
            </p>

            {/* ✅ FIXED: valid hrefs */}
            <div className="footer-social">
              <a
                href="https://facebook.com"
                className="social-link"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>f</span>
              </a>

              <a
                href="https://twitter.com"
                className="social-link"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>𝕏</span>
              </a>

              <a
                href="https://linkedin.com"
                className="social-link"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>in</span>
              </a>

              <a
                href="https://instagram.com"
                className="social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>ig</span>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="links-list">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-rules">
            <h3 className="footer-heading">Loan Rules</h3>
            <ul className="rules-list">
              {loanRules.map((rule, index) => (
                <li key={index} className="rule-item">
                  <span className="rule-label">{rule.label}:</span>
                  <span className="rule-value">{rule.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h3 className="footer-heading">Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>123 Finance Street, Mumbai, India</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>support@miniloanpro.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} MiniLoanPro. All rights reserved.
          </div>

          <div className="footer-legal">
            <Link to="/privacy" className="legal-link">Privacy Policy</Link>
            <Link to="/terms" className="legal-link">Terms of Service</Link>
            <Link to="/disclaimer" className="legal-link">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
