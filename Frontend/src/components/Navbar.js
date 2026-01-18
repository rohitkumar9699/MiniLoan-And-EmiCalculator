import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onAuthChange }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem('jwt_token');
      const role = localStorage.getItem('user_role');
      const name = localStorage.getItem('user_name');

      setIsLoggedIn(!!token);
      setUserRole(role);
      setUserName(name || '');
    };

    syncAuth();

    // for other tabs
    window.addEventListener('storage', syncAuth);

    // 🔥 for same tab login
    window.addEventListener('auth-change', syncAuth);

    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('auth-change', syncAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');

    setIsLoggedIn(false);
    onAuthChange(false);

    // notify navbar
    window.dispatchEvent(new Event('auth-change'));

    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2 onClick={() => navigate('/')}>Mini Loan & EMI Calculator</h2>
      </div>

      <div className="navbar-links">
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
          </>
        ) : userRole === 'ROLE_ADMIN' ? (
          <>
            <button onClick={() => navigate('/admin?status=pending')}>Pending</button>
            <button onClick={() => navigate('/admin?status=approved')}>Approved</button>
            <button onClick={() => navigate('/admin?status=rejected')}>Rejected</button>
            <span className="user-badge">👤 {userName}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/apply')}>Apply Loan</button>
            <button onClick={() => navigate('/payment')}>Pay Loan</button>
            <button onClick={() => navigate('/history')}>History</button>
            <button onClick={() => navigate('/profile')}>Profile</button>
            <span className="user-badge">👤 {userName}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
