// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import AdminRegister from './pages/AdminRegister';
import Dashboard from './pages/Dashboard';
import ApplyLoan from './pages/ApplyLoan';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import LoanHistory from './pages/LoanHistory';
import Admin from './pages/Admin';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('jwt_token');
      setIsLoggedIn(!!updatedToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar onAuthChange={(loggedIn) => setIsLoggedIn(loggedIn)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/calculate" element={<Calculator />} />

            {/* 🔥 pass onAuthChange */}
            <Route path="/login" element={<Login onAuthChange={setIsLoggedIn} />} />

            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin-register" element={<AdminRegister />} />

            <Route path="/dashboard" element={
              <ProtectedRoute requiredRole="ROLE_USER"><Dashboard /></ProtectedRoute>
            } />
            <Route path="/apply" element={
              <ProtectedRoute requiredRole="ROLE_USER"><ApplyLoan /></ProtectedRoute>
            } />
            <Route path="/payment" element={
              <ProtectedRoute requiredRole="ROLE_USER"><Payment /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute requiredRole="ROLE_USER"><Profile /></ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute requiredRole="ROLE_USER"><LoanHistory /></ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="ROLE_ADMIN"><Admin /></ProtectedRoute>
            } />
          </Routes>
        </main>
        {!isLoggedIn && <Footer />}
      </div>
    </Router>
  );
}

export default App;
