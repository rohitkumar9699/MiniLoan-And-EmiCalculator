import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCurrentLoan = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
        
        const response = await fetch(`${apiUrl}/loan/current`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const text = await response.text();
          if (text) {
            try {
              const data = JSON.parse(text);
              setLoan(data);
            } catch (parseError) {
              console.error('JSON parse error:', parseError);
              setLoan(null);
            }
          } else {
            setLoan(null);
          }
        } else if (response.status === 404 || response.status === 400) {
          setLoan(null);
        } else {
          throw new Error('Failed to fetch loan');
        }
      } catch (err) {
        console.error('Error fetching loan:', err);
        setLoan(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentLoan();
  }, []);

  if (loading) return <div className="dashboard-container"><p className="loading">Loading...</p></div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Manage your loans and track payment progress</p>
      </div>
      
      {error && <div className="error">{error}</div>}

      {loan ? (
        <div className="loan-status-card">
          <h2>Current Loan Status</h2>
          <div className="details-grid">
            <div className="detail">
              <label>Loan Amount:</label>
              <p>₹{loan.loanAmount?.toLocaleString('en-IN')}</p>
            </div>
            <div className="detail">
              <label>EMI (Monthly):</label>
              <p>₹{loan.emi?.toFixed(2)}</p>
            </div>
            <div className="detail">
              <label>Tenure:</label>
              <p>{loan.tenure} months</p>
            </div>
            <div className="detail">
              <label>Interest Rate:</label>
              <p>{loan.interestRate}% p.a.</p>
            </div>
            <div className="detail">
              <label>Total Payable:</label>
              <p>₹{loan.totalPayable?.toLocaleString('en-IN')}</p>
            </div>
            <div className="detail">
              <label>Paid Amount:</label>
              <p>₹{loan.paidAmount?.toFixed(2)}</p>
            </div>
            <div className="detail">
              <label>Remaining:</label>
              <p>₹{loan.remainingAmount?.toFixed(2)}</p>
            </div>
            <div className="detail">
              <label>Status:</label>
              <p><span className={`status ${loan.status?.toLowerCase()}`}>{loan.status}</span></p>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={() => navigate('/history')} className="btn-secondary">📜 View History</button>
            {loan.status === 'APPROVED' && (
              <button onClick={() => navigate('/payment')} className="btn-primary">💳 Pay EMI</button>
            )}
          </div>
        </div>
      ) : (
        <div className="no-loan-container">
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No Active Loans</h3>
            <p>You currently don't have any active loans. Start your loan application now!</p>
            <button onClick={() => navigate('/apply')} className="btn-primary">Apply for Loan</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
