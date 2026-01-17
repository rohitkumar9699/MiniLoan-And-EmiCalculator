import React, { useEffect, useState } from 'react';
import '../pages/Calculator.css';

const Admin = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPendingLoans = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
      
      const response = await fetch(`${apiUrl}/admin/loans/pending`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setLoans(Array.isArray(data) ? data : [data]);
      } else {
        throw new Error('Failed to fetch loans');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingLoans();
  }, []);

  const handleApprove = async (loanId) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
      
      const response = await fetch(`${apiUrl}/admin/loan/approve/${loanId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Loan approved successfully!');
        fetchPendingLoans();
      } else {
        throw new Error('Failed to approve loan');
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleReject = async (loanId) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
      
      const response = await fetch(`${apiUrl}/admin/loan/reject/${loanId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Loan rejected successfully!');
        fetchPendingLoans();
      } else {
        throw new Error('Failed to reject loan');
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h2>Admin Dashboard - Pending Loans</h2>
      
      {error && <div className="error">{error}</div>}

      {loans.length === 0 ? (
        <p>No pending loans</p>
      ) : (
        <div className="loans-table">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Amount (₹)</th>
                <th>Tenure (months)</th>
                <th>Interest Rate (%)</th>
                <th>EMI (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.map(loan => (
                <tr key={loan.id}>
                  <td>{loan.userId}</td>
                  <td>{loan.loanAmount?.toLocaleString()}</td>
                  <td>{loan.tenure}</td>
                  <td>{loan.interestRate}</td>
                  <td>{loan.emi?.toFixed(2)}</td>
                  <td className="actions">
                    <button 
                      className="btn-success"
                      onClick={() => handleApprove(loan.id)}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn-danger"
                      onClick={() => handleReject(loan.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
