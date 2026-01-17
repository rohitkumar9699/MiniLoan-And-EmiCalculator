// pages/Calculator.js
import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const MIN_AMOUNT = 1000;
  const MAX_AMOUNT = 50000;
  const MIN_MONTHS = 1;
  const MAX_MONTHS = 24;
  const backend_url = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

  const [loanAmount, setLoanAmount] = useState(25000);
  const [durationMonths, setDurationMonths] = useState(12);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [interestRate, setinterestRate] = useState(0);
  

  // Format currency in Indian Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate EMI
const calculateEMI = async () => {
  try {
    setIsCalculating(true);
    const response = await fetch(`${backend_url}/emi/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: loanAmount,
        months: durationMonths,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setEmi(data.monthlyEmi);
      setTotalInterest(data.totalInterest);
      setTotalAmount(data.totalPayment);
      setinterestRate(data.monthlyRates);
    } else {
      console.error('Error calculating EMI:', response.statusText);
    }
  } catch (err) {
    console.error('Error calculating EMI:', err);
  } finally {
    setIsCalculating(false);
  }
};


  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};

    if (loanAmount < MIN_AMOUNT) {
      newErrors.amount = `Minimum loan amount is ${formatCurrency(MIN_AMOUNT)}`;
    } else if (loanAmount > MAX_AMOUNT) {
      newErrors.amount = `Maximum loan amount is ${formatCurrency(MAX_AMOUNT)}`;
    }

    if (durationMonths < MIN_MONTHS) {
      newErrors.duration = `Minimum duration is ${MIN_MONTHS} month`;
    } else if (durationMonths > MAX_MONTHS) {
      newErrors.duration = `Maximum duration is ${MAX_MONTHS} months`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes with validation
  const handleAmountChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setLoanAmount(value);
  };

  const handleDurationChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setDurationMonths(value);
  };

  // Recalculate on input changes
  useEffect(() => {
    if (validateInputs()) {
      calculateEMI();
    }
  }, [loanAmount, durationMonths]);

  return (
    <div className="calculator">
      <div className="calculator-header">
        <h1 className="page-title">EMI Calculator</h1>
        <p className="page-subtitle">
          Calculate your monthly EMI with our variable 8% monthly interest rate
        </p>
      </div>

      <div className="calculator-grid">
        {/* Input Section */}
        <div className="input-section card">
          <div className="input-group">
            <label className="input-label">
              Loan Amount (₹)
              <span className="input-range">
                {formatCurrency(MIN_AMOUNT)} - {formatCurrency(MAX_AMOUNT)}
              </span>
            </label>
            <div className="amount-input-container">
              <span className="amount-prefix">₹</span>
              <input
                type="number"
                value={loanAmount}
                onChange={handleAmountChange}
                className="input-field amount-input"
                min={MIN_AMOUNT}
                max={MAX_AMOUNT}
                step="1000"
              />
            </div>
            <div className="slider-container">
              <input
                type="range"
                value={loanAmount}
                onChange={handleAmountChange}
                min={MIN_AMOUNT}
                max={MAX_AMOUNT}
                step="1000"
                className="amount-slider"
              />
              <div className="slider-labels">
                <span>{formatCurrency(MIN_AMOUNT)}</span>
                <span>{formatCurrency(MAX_AMOUNT)}</span>
              </div>
            </div>
            {errors.amount && (
              <div className="error-message">⚠️ {errors.amount}</div>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">
              Loan Duration (Months)
              <span className="input-range">
                {MIN_MONTHS} - {MAX_MONTHS} months
              </span>
            </label>
            <div className="duration-input-container">
              <input
                type="number"
                value={durationMonths}
                onChange={handleDurationChange}
                className="input-field duration-input"
                min={MIN_MONTHS}
                max={MAX_MONTHS}
              />
              <span className="duration-suffix">months</span>
            </div>
            <div className="slider-container">
              <input
                type="range"
                value={durationMonths}
                onChange={handleDurationChange}
                min={MIN_MONTHS}
                max={MAX_MONTHS}
                className="duration-slider"
              />
              <div className="slider-labels">
                <span>{MIN_MONTHS} month</span>
                <span>{MAX_MONTHS} months</span>
              </div>
            </div>
            {errors.duration && (
              <div className="error-message">⚠️ {errors.duration}</div>
            )}
          </div>

          <div className="interest-info">
            <div className="interest-badge">
              Variable Interest Rate: {interestRate}% per annum
            </div>
            <p className="interest-note">
              This rate is variable and not editable. All calculations are based on this rate.
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section card fade-in">
          <h2 className="results-title">EMI Breakdown</h2>
          
          {isCalculating ? (
            <div className="calculating">
              <div className="spinner"></div>
              <p>Calculating your EMI...</p>
            </div>
          ) : Object.keys(errors).length === 0 ? (
            <>
              <div className="result-card primary">
                <div className="result-icon">💰</div>
                <div className="result-content">
                  <h3 className="result-label">Monthly EMI</h3>
                  <p className="result-value">{formatCurrency(Math.round(emi))}</p>
                </div>
              </div>

              <div className="result-grid">
                <div className="result-card">
                  <div className="result-icon">📈</div>
                  <div className="result-content">
                    <h3 className="result-label">Total Interest</h3>
                    <p className="result-value">{formatCurrency(Math.round(totalInterest))}</p>
                  </div>
                </div>

                <div className="result-card">
                  <div className="result-icon">🎯</div>
                  <div className="result-content">
                    <h3 className="result-label">Total Amount</h3>
                    <p className="result-value">{formatCurrency(Math.round(totalAmount))}</p>
                  </div>
                </div>
              </div>

              <div className="summary-card">
                <h3 className="summary-title">Loan Summary</h3>
                <div className="summary-details">
                  <div className="summary-item">
                    <span>Principal Amount</span>
                    <span>{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="summary-item">
                    <span>Interest Rate (Per Month)</span>
                    <span>{interestRate}%</span>
                  </div>
                  <div className="summary-item">
                    <span>Loan Duration</span>
                    <span>{durationMonths} months</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-item total">
                    <span>Total Payable</span>
                    <span>{formatCurrency(Math.round(totalAmount))}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="error-state">
              <div className="error-icon">⚠️</div>
              <p>Please fix the input errors to calculate EMI</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="info-section card">
        <h3>Important Information</h3>
        <ul className="info-list">
          <li>All calculations are based on a variable interest rate per monthly</li>
          <li>Loan amount must be between ₹1,000 and ₹50,000</li>
          <li>Loan duration must be between 1 and 24 months</li>
          <li>EMI is calculated using the reducing balance method</li>
          <li>No processing fees or hidden charges are included in this calculation</li>
        </ul>
      </div>
    </div>
  );
};

export default Calculator;