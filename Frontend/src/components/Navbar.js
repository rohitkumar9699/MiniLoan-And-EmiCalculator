import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onAuthChange }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const role = localStorage.getItem('user_role');
    const name = localStorage.getItem('user_name');
    setIsLoggedIn(!!token);
    setUserRole(role);
    setUserName(name || '');

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('jwt_token');
      const updatedRole = localStorage.getItem('user_role');
      const updatedName = localStorage.getItem('user_name');
      setIsLoggedIn(!!updatedToken);
      setUserRole(updatedRole);
      setUserName(updatedName || '');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    setIsLoggedIn(false);
    onAuthChange?.(false);
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
        ) : (
          <>
            <button className="nav-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="nav-link" onClick={() => navigate('/apply')}>Apply Loan</button>
            <button className="nav-link" onClick={() => navigate('/payment')}>Pay Loan</button>
            <button className="nav-link" onClick={() => navigate('/history')}>History</button>
            <button className="nav-link" onClick={() => navigate('/profile')}>Profile</button>
            {userRole === 'ROLE_ADMIN' && (
              <button className="nav-link" onClick={() => navigate('/admin')}>Admin Panel</button>
            )}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
