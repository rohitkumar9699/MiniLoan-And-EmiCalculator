import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

function AdminRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fixed default values
  const DEFAULT_ADMIN_DATA = {
    name: 'Admin',
    occupation: 'Administrator',
    monthlyIncome: 1,
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (!aadhaarNumber) newErrors.aadhaarNumber = 'Aadhaar number is required';
    else if (!/^\d{12}$/.test(aadhaarNumber))
      newErrors.aadhaarNumber = 'Aadhaar must be exactly 12 digits';

    if (!panNumber) newErrors.panNumber = 'PAN number is required';
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panNumber))
      newErrors.panNumber = 'PAN format should be ABCDE1234F';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await authAPI.registerAdmin({
        email,
        password,
        aadhaarNumber,
        panNumber,
        ...DEFAULT_ADMIN_DATA,
      });

      setSuccessMessage('Admin registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/admin-login'), 2000);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data ||
        'Registration failed. Try again.';
      setErrors({ submit: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <h2>Admin Registration</h2>
        <p className="auth-subtitle">Email, Password, Aadhaar & PAN only</p>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'error' : ''}
              placeholder="admin@example.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'error' : ''}
              placeholder="Enter password"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Confirm password"
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="form-group">
            <label>Aadhaar Number (12 digits)</label>
            <input
              type="text"
              value={aadhaarNumber}
              onChange={(e) =>
                setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))
              }
              className={errors.aadhaarNumber ? 'error' : ''}
              placeholder="123456789012"
              maxLength="12"
            />
            {errors.aadhaarNumber && (
              <span className="error-text">{errors.aadhaarNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label>PAN Number</label>
            <input
              type="text"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
              className={errors.panNumber ? 'error' : ''}
              placeholder="ABCDE1234F"
              maxLength="10"
            />
            {errors.panNumber && (
              <span className="error-text">{errors.panNumber}</span>
            )}
          </div>

          <button type="submit" className="auth-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register Admin'}
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
