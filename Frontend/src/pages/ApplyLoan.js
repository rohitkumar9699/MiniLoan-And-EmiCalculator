import React, { useState, useEffect } from 'react';
import { loanAPI, calculateEMI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './ApplyLoan.css';

function ApplyLoan() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    loanAmount: 10000,
    tenure: 12,
  });

  const [emiData, setEmiData] = useState({
    emi: 0,
    totalAmount: 0,
    totalInterest: 0,
    interestRate: 0,
  });

  const [loading, setLoading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [message, setMessage] = useState('');

  // ✅ Call backend API
  const calculateEMIOnChange = async (amount, months) => {
    try {
      setIsCalculating(true);

      const result = await calculateEMI(amount, months);

      setEmiData({
        emi: result.emi,
        totalAmount: result.totalAmount,
        totalInterest: result.totalInterest,
        interestRate: result.interestRate,
      });
    } catch (err) {
      console.error("EMI fetch failed:", err);
    } finally {
      setIsCalculating(false);
    }
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);

    setFormData((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  };

  // ✅ Debounced API call (IMPORTANT)
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateEMIOnChange(formData.loanAmount, formData.tenure);
    }, 400);

    return () => clearTimeout(timer);
  }, [formData]);

  // ✅ Submit loan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await loanAPI.applyLoan(formData);
      setMessage('Loan application submitted successfully! Awaiting admin approval.');

      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setMessage('Error: ' + (err.response?.data || 'Failed to apply'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-container">
      <h2>Apply for Loan</h2>

      {message && (
        <p className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Loan Amount: ₹{formData.loanAmount.toLocaleString()}</label>
          <input
            type="range"
            name="loanAmount"
            min="1000"
            max="50000"
            step="1000"
            value={formData.loanAmount}
            onChange={handleChange}
          />
          <small>Min: ₹1,000 | Max: ₹50,000</small>
        </div>

        <div className="form-group">
          <label>Loan Tenure: {formData.tenure} months</label>
          <input
            type="range"
            name="tenure"
            min="1"
            max="24"
            step="1"
            value={formData.tenure}
            onChange={handleChange}
          />
          <small>Min: 1 month | Max: 24 months</small>
        </div>

        <div className="result-section">
          <h3>Loan Summary</h3>

          {isCalculating ? (
            <p>Calculating...</p>
          ) : (
            <div className="result">
              <div className="result-item">
                <span>Interest Rate:</span>
                <strong>{emiData.interestRate?.toFixed(2)}%</strong>
              </div>

              <div className="result-item">
                <span>Monthly EMI:</span>
                <strong>₹{emiData.emi?.toFixed(2)}</strong>
              </div>

              <div className="result-item">
                <span>Total Payable:</span>
                <strong>₹{emiData.totalAmount?.toFixed(2)}</strong>
              </div>

              <div className="result-item">
                <span>Total Interest:</span>
                <strong>₹{emiData.totalInterest?.toFixed(2)}</strong>
              </div>
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Submitting...' : 'Apply for Loan'}
        </button>
      </form>
    </div>
  );
}

export default ApplyLoan;