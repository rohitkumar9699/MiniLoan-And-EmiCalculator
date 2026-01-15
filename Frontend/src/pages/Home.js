// pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: '📈',
      title: 'Variable Interest Rate',
      description: 'No surprises with our variable monthly interest rates. Know exactly what you pay.'
    },
    {
      icon: '⚡',
      title: 'Instant Calculation',
      description: 'Get your EMI breakdown instantly with our advanced calculator. No waiting, no hidden fees.'
    },
    {
      icon: '🔒',
      title: 'Secure & Transparent',
      description: 'Your data is secure with us. All calculations happen locally in your browser.'
    },
    {
      icon: '🎯',
      title: 'Clear Limits',
      description: 'Loan amounts from ₹1,000 to ₹50,000 with flexible tenure of 1-24 months.'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Mini Loan & EMI Calculator</span>
          </h1>
          <p className="hero-subtitle">
            Get instant EMI calculations for your mini loan needs. Transparent, fast, and completely free.
          </p>
          <div className="hero-actions">
            <Link to="/calculate" className="btn btn-primary">
              Calculate EMI Now
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Apply for Loan
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card">
            <div className="visual-amount">₹25,000</div>
            <div className="visual-tenure">12 months</div>
            <div className="visual-emi">EMI: ₹3,736</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose Our Calculator?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rules Section */}
      <section className="rules">
        <div className="rules-card card">
          <h2 className="section-title">Loan Eligibility Rules</h2>
          <div className="rules-grid">
            <div className="rule-item">
              <div className="rule-icon">💰</div>
              <div>
                <h3 className="rule-title">Loan Amount</h3>
                <p className="rule-range">₹1,000 – ₹50,000</p>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-icon">📅</div>
              <div>
                <h3 className="rule-title">Loan Duration</h3>
                <p className="rule-range">1 – 24 months</p>
              </div>
            </div>
            <div className="rule-item">
              <div className="rule-icon">📊</div>
              <div>
                <h3 className="rule-title">Interest Rate</h3>
                <p className="rule-range">Per months (Variable)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-card card">
          <h2 className="cta-title">Ready to Calculate Your EMI?</h2>
          <p className="cta-description">
            Get instant results with our easy-to-use calculator. No registration required!
          </p>
          <Link to="/calculate" className="btn btn-primary btn-large">
            Start Calculation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;