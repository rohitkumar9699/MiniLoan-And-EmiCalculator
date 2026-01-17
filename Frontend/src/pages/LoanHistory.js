import React, { useState, useEffect } from 'react';
import { loanAPI } from '../services/api';
import './LoanHistory.css';

function LoanHistory() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoanHistory();
  }, []);

  const fetchLoanHistory = async () => {
    try {
      const response = await loanAPI.getLoanHistory();
      setLoans(response.data);
    } catch (err) {
      console.error('Error fetching loan history', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="history-container">
      <h2>Loan History</h2>
      {loans.length === 0 ? (
        <p>No loans found</p>
      ) : (
        <div className="loans-list">
          {loans.map(loan => (
            <div key={loan.id} className="loan-card">
              <h3>Loan #{loan.id}</h3>
              <p><strong>Amount:</strong> ₹{loan.loanAmount}</p>
              <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
              <p><strong>EMI:</strong> ₹{loan.emi}</p>
              <p><strong>Tenure:</strong> {loan.tenure} months</p>
              <p><strong>Total Payable:</strong> ₹{loan.totalPayable}</p>
              <p><strong>Paid Amount:</strong> ₹{loan.paidAmount}</p>
              <p><strong>Remaining:</strong> ₹{loan.remainingAmount}</p>
              <p><strong>Status:</strong> {loan.status}</p>
              {loan.startDate && <p><strong>Start Date:</strong> {new Date(loan.startDate).toLocaleDateString()}</p>}
              {loan.endDate && <p><strong>End Date:</strong> {new Date(loan.endDate).toLocaleDateString()}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LoanHistory;
