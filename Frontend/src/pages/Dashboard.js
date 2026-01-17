import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Calculator.css';

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
          const data = await response.json();
          setLoan(data);
        } else if (response.status === 404) {
          setLoan(null);
        } else {
          throw new Error('Failed to fetch loan');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentLoan();
  }, []);

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h2>Dashboard</h2>
      
      {error && <div className="error">{error}</div>}

      {loan ? (
        <div className="loan-details">
          <h3>Current Loan Status</h3>
          <div className="details-grid">
            <div className="detail">
              <label>Loan Amount:</label>
              <p>₹{loan.loanAmount?.toLocaleString()}</p>
            </div>
            <div className="detail">
              <label>EMI:</label>
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
              <p>₹{loan.totalPayable?.toFixed(2)}</p>
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
              <p className={`status ${loan.status?.toLowerCase()}`}>{loan.status}</p>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={() => navigate('/history')} className="btn-secondary">View History</button>
            {loan.status === 'APPROVED' && (
              <button onClick={() => navigate('/loan/pay')} className="btn-primary">Pay EMI</button>
            )}
          </div>
        </div>
      ) : (
        <div className="no-loan">
          <p>You have no active loans.</p>
          <button onClick={() => navigate('/apply')} className="btn-primary">Apply for Loan</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
