// pages/Contact.js
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      detail: 'support@miniloanpro.com',
      description: "We'll reply within 24 hours"
    },
    {
      icon: '📞',
      title: 'Phone',
      detail: '+91 98765 43210',
      description: 'Mon-Fri, 9AM-6PM'
    },
    {
      icon: '🏢',
      title: 'Office',
      detail: '123 Finance Street, Mumbai',
      description: 'Visit us anytime'
    }
  ];

  return (
    <div className="contact">
      <div className="contact-header">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-subtitle">
          Have questions? Get in touch with our support team
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-form-section card">
          <h2 className="section-title">Send us a Message</h2>

          {submitSuccess && (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input-field ${errors.name ? 'error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && <div className="error-message">⚠️ {errors.name}</div>}
            </div>

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <div className="error-message">⚠️ {errors.email}</div>}
            </div>

            <div className="input-group">
              <label className="input-label">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`input-field ${errors.subject ? 'error' : ''}`}
                placeholder="What is this regarding?"
              />
              {errors.subject && <div className="error-message">⚠️ {errors.subject}</div>}
            </div>

            <div className="input-group">
              <label className="input-label">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`input-field textarea ${errors.message ? 'error' : ''}`}
                placeholder="Type your message here..."
                rows="5"
              />
              {errors.message && <div className="error-message">⚠️ {errors.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="contact-info-section">
          <div className="info-card card">
            <h2 className="section-title">Get in Touch</h2>

            <div className="contact-info-list">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-info-item">
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-content">
                    <h3 className="info-title">{info.title}</h3>
                    <p className="info-detail">{info.detail}</p>
                    <p className="info-description">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-links">
              <h3 className="social-title">Follow Us</h3>
              <div className="social-icons">
                <a href="https://www.facebook.com/" className="social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><span>f</span></a>
                <a href="https://twitter.com/" className="social-icon" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><span>𝕏</span></a>
                <a href="https://www.linkedin.com/" className="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><span>in</span></a>
                <a href="https://www.instagram.com/" className="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><span>ig</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
