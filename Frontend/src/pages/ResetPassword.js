import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Auth.css';

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.resetPassword(email);
      setMessage('New password sent to your email!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.Error || 'Reset failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Reset Password</h2>
        {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
        </form>
        <p><a href="/login">Back to Login</a></p>
      </div>
    </div>
  );
}

export default ResetPassword;
