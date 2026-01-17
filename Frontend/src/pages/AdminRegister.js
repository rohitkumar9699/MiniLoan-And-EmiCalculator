import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    aadhaarNumber: '',
    panNumber: '',
    occupation: '',
    monthlyIncome: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.aadhaarNumber) newErrors.aadhaarNumber = 'Aadhaar is required';
    else if (formData.aadhaarNumber.length !== 12) newErrors.aadhaarNumber = 'Aadhaar must be 12 digits';
    else if (!/^\d{12}$/.test(formData.aadhaarNumber)) newErrors.aadhaarNumber = 'Aadhaar must contain only numbers';

    if (!formData.panNumber) newErrors.panNumber = 'PAN is required';
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = 'PAN format: ABCDE1234F';
    }

    if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    if (!formData.monthlyIncome) newErrors.monthlyIncome = 'Monthly income is required';
    else if (isNaN(formData.monthlyIncome) || formData.monthlyIncome <= 0) {
      newErrors.monthlyIncome = 'Monthly income must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await authAPI.registerAdmin({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          aadhaarNumber: formData.aadhaarNumber,
          panNumber: formData.panNumber,
          occupation: formData.occupation,
          monthlyIncome: parseFloat(formData.monthlyIncome),
        });

        setSuccessMessage('Admin registered successfully! Redirecting to admin login...');
        setTimeout(() => {
          navigate('/admin-login');
        }, 2000);
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.response?.data || 'Registration failed. Please try again.';
        setErrors({ submit: errorMsg });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <h2>Admin Registration</h2>
        <p className="auth-subtitle">Create an admin account to manage the system</p>
        
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="John Doe"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="admin@example.com"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter strong password"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="aadhaarNumber">Aadhaar Number (12 digits)</label>
              <input
                type="text"
                id="aadhaarNumber"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleChange}
                className={errors.aadhaarNumber ? 'error' : ''}
                placeholder="123456789012"
                maxLength="12"
              />
              {errors.aadhaarNumber && <span className="error-text">{errors.aadhaarNumber}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="panNumber">PAN Number</label>
              <input
                type="text"
                id="panNumber"
                name="panNumber"
                value={formData.panNumber}
                onChange={(e) => handleChange({ ...e, target: { ...e.target, value: e.target.value.toUpperCase() } })}
                className={errors.panNumber ? 'error' : ''}
                placeholder="ABCDE1234F"
                maxLength="10"
              />
              {errors.panNumber && <span className="error-text">{errors.panNumber}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className={errors.occupation ? 'error' : ''}
                placeholder="e.g., Manager, Engineer"
              />
              {errors.occupation && <span className="error-text">{errors.occupation}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="monthlyIncome">Monthly Income (₹)</label>
              <input
                type="number"
                id="monthlyIncome"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className={errors.monthlyIncome ? 'error' : ''}
                placeholder="50000"
                min="0"
              />
              {errors.monthlyIncome && <span className="error-text">{errors.monthlyIncome}</span>}
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register as Admin'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have admin credentials?</p>
          <a href="/admin-login">Login here</a>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
