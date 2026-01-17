// pages/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    occupation: '',
    monthlyIncome: '',
    aadhaarNumber: '',
    panNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Occupation validation
    if (!formData.occupation.trim()) {
      newErrors.occupation = 'Occupation is required';
    }

    // Monthly Income validation
    if (!formData.monthlyIncome) {
      newErrors.monthlyIncome = 'Monthly income is required';
    } else if (isNaN(formData.monthlyIncome) || formData.monthlyIncome <= 0) {
      newErrors.monthlyIncome = 'Please enter a valid monthly income';
    }

    // Aadhaar validation (12 digits)
    if (!formData.aadhaarNumber) {
      newErrors.aadhaarNumber = 'Aadhaar number is required';
    } else if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = 'Aadhaar must be exactly 12 digits';
    }

    // PAN validation (Format: ABCDE1234F)
    if (!formData.panNumber) {
      newErrors.panNumber = 'PAN number is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = 'PAN format invalid (e.g., ABCDE1234F)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Prepare data for backend
        const registerData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          occupation: formData.occupation,
          monthlyIncome: parseFloat(formData.monthlyIncome),
          aadhaarNumber: formData.aadhaarNumber,
          panNumber: formData.panNumber
        };

        const response = await authAPI.register(registerData);
        
        setSuccessMessage('Registration successful! Your temporary password has been sent to your email. Redirecting to login...');
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          occupation: '',
          monthlyIncome: '',
          aadhaarNumber: '',
          panNumber: ''
        });

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.response?.data || 'Registration failed. Please try again.';
        setErrors({ submit: errorMsg });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Sign up to apply for a loan</p>
        </div>

        {successMessage && <div className="success-message">✓ {successMessage}</div>}
        {errors.submit && <div className="error-message">⚠️ {errors.submit}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Name */}
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

          {/* Email */}
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

          {/* Password */}
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'error' : ''}`}
              placeholder="Enter password (min 6 chars)"
            />
            {errors.password && <div className="error-message">⚠️ {errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <div className="error-message">⚠️ {errors.confirmPassword}</div>}
          </div>

          {/* Occupation */}
          <div className="input-group">
            <label className="input-label">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className={`input-field ${errors.occupation ? 'error' : ''}`}
              placeholder="e.g., Software Engineer, Teacher"
            />
            {errors.occupation && <div className="error-message">⚠️ {errors.occupation}</div>}
          </div>

          {/* Monthly Income */}
          <div className="input-group">
            <label className="input-label">Monthly Income (₹)</label>
            <input
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              className={`input-field ${errors.monthlyIncome ? 'error' : ''}`}
              placeholder="e.g., 30000"
            />
            {errors.monthlyIncome && <div className="error-message">⚠️ {errors.monthlyIncome}</div>}
          </div>

          {/* Aadhaar Number */}
          <div className="input-group">
            <label className="input-label">Aadhaar Number</label>
            <input
              type="text"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              className={`input-field ${errors.aadhaarNumber ? 'error' : ''}`}
              placeholder="12-digit number (no spaces)"
              maxLength="12"
            />
            {errors.aadhaarNumber && <div className="error-message">⚠️ {errors.aadhaarNumber}</div>}
          </div>

          {/* PAN Number */}
          <div className="input-group">
            <label className="input-label">PAN Number</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber.toUpperCase()}
              onChange={handleChange}
              className={`input-field ${errors.panNumber ? 'error' : ''}`}
              placeholder="e.g., ABCDE1234F"
              maxLength="10"
            />
            {errors.panNumber && <div className="error-message">⚠️ {errors.panNumber}</div>}
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
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
            <label className="input-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`input-field ${errors.phone ? 'error' : ''}`}
              placeholder="Enter your 10-digit phone number"
            />
            {errors.phone && <div className="error-message">⚠️ {errors.phone}</div>}
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'error' : ''}`}
              placeholder="Create a strong password"
            />
            {errors.password && <div className="error-message">⚠️ {errors.password}</div>}
          </div>

          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <div className="error-message">⚠️ {errors.confirmPassword}</div>}
          </div>

          <div className="input-group">
            <label className={`checkbox-label ${errors.acceptTerms ? 'error' : ''}`}>
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <span>I agree to the <Link to="/terms">Terms and Conditions</Link> and <Link to="/privacy">Privacy Policy</Link></span>
            </label>
            {errors.acceptTerms && <div className="error-message">⚠️ {errors.acceptTerms}</div>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner-small"></div>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;