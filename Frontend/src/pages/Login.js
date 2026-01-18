// pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

const Login = ({ onAuthChange }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await authAPI.login(formData);
        
        // Store token and user info
        const { token, userId, name, role } = response.data;
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_id', userId);
        localStorage.setItem('user_name', name);
        localStorage.setItem('user_role', role);
        localStorage.setItem('user_email', formData.email);
        // 🔥 notify App + Navbar
        onAuthChange(true); 
        window.dispatchEvent(new Event('auth-change'));

        setSuccessMessage('Login successful! Redirecting to dashboard...');
        
        // Redirect based on role
        setTimeout(() => {
          if (role === 'ROLE_ADMIN') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
        }, 1500);
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.response?.data || 'Login failed. Please check your credentials.';
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
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to access your loan dashboard</p>
        </div>

        {successMessage && <div className="success-message">✓ {successMessage}</div>}
        {errors.submit && <div className="error-message">⚠️ {errors.submit}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
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
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'error' : ''}`}
              placeholder="Enter your password"
            />
            {errors.password && <div className="error-message">⚠️ {errors.password}</div>}
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/reset-password" className="auth-link">Forgot password?</Link>
          <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;