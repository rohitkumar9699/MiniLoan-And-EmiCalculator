import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../pages/Calculator.css';

const Admin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || 'pending';
  
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  // Fetch ALL loans (all statuses)
  const fetchAllLoans = async () => {
    try {
      const token = localStorage.getItem('jwt_token');
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
      
      let endpoint = `/admin/loans/pending`;
      
      if (status === 'approved') {
        endpoint = `/admin/loans/approved`;
      } else if (status === 'rejected') {
        endpoint = `/admin/loans/rejected`;
      }
      
      const response = await fetch(`${apiUrl}${endpoint}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        const allLoans = Array.isArray(data) ? data : (data ? [data] : []);
        setLoans(allLoans);
        filterLoansByStatus(allLoans, status);
      } else {
        throw new Error('Failed to fetch loans');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter loans by status
  const filterLoansByStatus = (allLoans, statusFilter) => {
    let filtered = allLoans;
    
    if (statusFilter === 'pending') {
      filtered = allLoans.filter(loan => loan.status === 'PENDING');
    } else if (statusFilter === 'approved') {
      filtered = allLoans.filter(loan => loan.status === 'APPROVED');
    } else if (statusFilter === 'rejected') {
      filtered = allLoans.filter(loan => loan.status === 'REJECTED');
    }
    
    setFilteredLoans(filtered);
  };

  // Fetch user profile
  const fetchUserProfile = async (userId) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
      
      const response = await fetch(`${apiUrl}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const users = await response.json();
        const user = users.find(u => u.id === userId);
        setUserProfile(user);
        setShowProfile(true);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  const handleRowClick = (loan) => {
    setSelectedLoan(loan);
    fetchUserProfile(loan.userId);
  };

  const handleApprove = async (loanId, userId) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
      
      const response = await fetch(`${apiUrl}/admin/loan/approve/${loanId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Loan approved successfully!');
        setShowProfile(false);
        setSelectedLoan(null);
        fetchAllLoans();
      } else {
        throw new Error('Failed to approve loan');
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleReject = async (loanId, userId) => {
    try {
      const token = localStorage.getItem('jwt_token');
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';
      
      const response = await fetch(`${apiUrl}/admin/loan/reject/${loanId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        alert('Loan rejected successfully!');
        setShowProfile(false);
        setSelectedLoan(null);
        fetchAllLoans();
      } else {
        throw new Error('Failed to reject loan');
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchAllLoans();
  }, [status]);

  if (loading) return <div className="container"><p>Loading...</p></div>;

  const statusTitles = {
    pending: 'Pending Loans',
    approved: 'Approved Loans',
    rejected: 'Rejected Loans'
  };

  return (
    <div className="container">
      <h2>Admin Dashboard - {statusTitles[status]}</h2>
      
      {error && <div className="error">{error}</div>}

      {filteredLoans.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '40px', color: '#6b7280' }}>
          No {status} loans found
        </p>
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
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map(loan => (
                <tr key={loan.id} style={{ cursor: 'pointer' }} onClick={() => handleRowClick(loan)}>
                  <td>{loan.userId}</td>
                  <td>{loan.loanAmount?.toLocaleString()}</td>
                  <td>{loan.tenure}</td>
                  <td>{loan.interestRate}</td>
                  <td>{loan.emi?.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${loan.status?.toLowerCase()}`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="actions" onClick={(e) => e.stopPropagation()}>
                    {loan.status === 'PENDING' && (
                      <>
                        <button 
                          className="btn-success"
                          onClick={() => handleApprove(loan.id, loan.userId)}
                        >
                          Approve
                        </button>
                        <button 
                          className="btn-danger"
                          onClick={() => handleReject(loan.id, loan.userId)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {loan.status !== 'PENDING' && (
                      <span style={{ color: '#6b7280', fontSize: '12px' }}>No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* User Profile Modal */}
      {showProfile && userProfile && selectedLoan && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowProfile(false)}>✕</button>
            
            <h3>User Profile & Loan Details</h3>
            
            <div className="profile-section">
              <h4>Personal Information</h4>
              <div className="profile-grid">
                <div className="profile-item">
                  <label>Name:</label>
                  <p>{userProfile.name}</p>
                </div>
                <div className="profile-item">
                  <label>Email:</label>
                  <p>{userProfile.email}</p>
                </div>
                <div className="profile-item">
                  <label>Occupation:</label>
                  <p>{userProfile.occupation}</p>
                </div>
                <div className="profile-item">
                  <label>Monthly Income:</label>
                  <p>₹{userProfile.monthlyIncome?.toLocaleString()}</p>
                </div>
                <div className="profile-item">
                  <label>Aadhaar:</label>
                  <p>{userProfile.aadhaarNumber}</p>
                </div>
                <div className="profile-item">
                  <label>PAN:</label>
                  <p>{userProfile.panNumber}</p>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h4>Loan Details</h4>
              <div className="profile-grid">
                <div className="profile-item">
                  <label>Loan Amount:</label>
                  <p>₹{selectedLoan.loanAmount?.toLocaleString()}</p>
                </div>
                <div className="profile-item">
                  <label>Tenure:</label>
                  <p>{selectedLoan.tenure} months</p>
                </div>
                <div className="profile-item">
                  <label>Interest Rate:</label>
                  <p>{selectedLoan.interestRate}% p.a.</p>
                </div>
                <div className="profile-item">
                  <label>Monthly EMI:</label>
                  <p>₹{selectedLoan.emi?.toFixed(2)}</p>
                </div>
                <div className="profile-item">
                  <label>Total Payable:</label>
                  <p>₹{selectedLoan.totalPayable?.toLocaleString()}</p>
                </div>
                <div className="profile-item">
                  <label>Status:</label>
                  <p>
                    <span className={`status-badge ${selectedLoan.status?.toLowerCase()}`}>
                      {selectedLoan.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {selectedLoan.status === 'PENDING' && (
              <div className="modal-actions">
                <button 
                  className="btn-success"
                  onClick={() => handleApprove(selectedLoan.id, selectedLoan.userId)}
                >
                  ✓ Approve Loan
                </button>
                <button 
                  className="btn-danger"
                  onClick={() => handleReject(selectedLoan.id, selectedLoan.userId)}
                >
                  ✕ Reject Loan
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
