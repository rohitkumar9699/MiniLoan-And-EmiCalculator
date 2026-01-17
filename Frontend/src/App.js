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
import Dashboard from './pages/Dashboard';
import ApplyLoan from './pages/ApplyLoan';
import Profile from './pages/Profile';
import LoanHistory from './pages/LoanHistory';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/calculate" element={<Calculator />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected User Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute requiredRole="ROLE_USER"><Dashboard /></ProtectedRoute>
            } />
            <Route path="/apply" element={
              <ProtectedRoute requiredRole="ROLE_USER"><ApplyLoan /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute requiredRole="ROLE_USER"><Profile /></ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute requiredRole="ROLE_USER"><LoanHistory /></ProtectedRoute>
            } />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="ROLE_ADMIN"><Admin /></ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;