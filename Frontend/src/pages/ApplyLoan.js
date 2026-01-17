import React, { useState } from 'react';
import { loanAPI, calculateEMI, getInterestRate } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Calculator.css';

function ApplyLoan() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ loanAmount: 10000, tenure: 12 });
  const [emi, setEmi] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Get monthly income from profile or estimate
  const monthlyIncome = parseInt(localStorage.getItem('user_monthly_income') || '30000');

  const calculateEMIOnChange = (amount, months, income) => {
    const rate = getInterestRate(income);
    const calculated = calculateEMI(amount, rate, months);
    setEmi(calculated);
    setInterestRate(rate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    const newFormData = { ...formData, [name]: numValue };
    setFormData(newFormData);
    calculateEMIOnChange(
      newFormData.loanAmount,
      newFormData.tenure,
      monthlyIncome
    );
  };

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

  React.useEffect(() => {
    calculateEMIOnChange(formData.loanAmount, formData.tenure, monthlyIncome);
  }, []);

  return (
    <div className="calculator-container">
      <h2>Apply for Loan</h2>
      {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
      
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
          <div className="result">
            <div className="result-item">
              <span>Interest Rate:</span>
              <strong>{interestRate.toFixed(2)}%</strong>
            </div>
            <div className="result-item">
              <span>Monthly EMI:</span>
              <strong>₹{emi.toFixed(2)}</strong>
            </div>
            <div className="result-item">
              <span>Total Payable:</span>
              <strong>₹{(emi * formData.tenure).toFixed(2)}</strong>
            </div>
            <div className="result-item">
              <span>Total Interest:</span>
              <strong>₹{((emi * formData.tenure) - formData.loanAmount).toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Submitting...' : 'Apply for Loan'}
        </button>
      </form>
    </div>
  );
}

export default ApplyLoan;
