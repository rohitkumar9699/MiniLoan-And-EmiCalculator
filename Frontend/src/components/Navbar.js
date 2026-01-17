import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const role = localStorage.getItem('user_role');
    setIsLoggedIn(!!token);
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2 onClick={() => navigate('/')}>Mini Loan & EMI Calculator</h2>
      </div>
      <div className="navbar-links">
        <button onClick={() => navigate('/')}>Home</button>
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            {userRole === 'ROLE_USER' && (
              <>
                <button onClick={() => navigate('/apply')}>Apply Loan</button>
                <button onClick={() => navigate('/history')}>History</button>
                <button onClick={() => navigate('/profile')}>Profile</button>
              </>
            )}
            {userRole === 'ROLE_ADMIN' && (
              <button onClick={() => navigate('/admin')}>Admin Panel</button>
            )}
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
